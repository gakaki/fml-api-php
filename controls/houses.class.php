<?php
	ini_set('display_errors',1);
	set_time_limit(0);
	//关闭调试模式的输出
	$GLOBALS["debug"]=1; 
	ini_set('log_errors', 1); 
	ini_set('error_log', dirname(__FILE__) . '/error_log.txt'); 
//error_reporting(E_ALL);
			
			
	class Houses {
		
		public $conn;
		public $mconn,$mdb,$coll;
		
		
		function echo_json($callback,$data)
		{
			if ($callback) {
			    header('Content-Type: text/javascript');
			    echo $callback . '(' . json_encode($data) . ');';
			} else {
			    header('Content-Type: application/x-json');
			    echo json_encode($data);
			}
		}
		
		
		function __construct()
		{
			try {
			   $this->conn = new PDO( DSN, USER, PASS, array(PDO::SQLSRV_ATTR_DIRECT_QUERY => true)); 
			   $this->conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
				}
			catch( PDOException $e ) {
			   echo $e;
			   die( "Error connecting to SQL Server" ); 
			}
			try {
			   $this->mconn = new Mongo("localhost:27017", array("persist" => "x"));
			   $this->mdb = $this->mconn->fml;
			   $this->coll = $this->mdb->housedics;
			}
			catch( Exception $e ) {
				
				echo $e;
				die( "Error connecting to Mongodb" ); 
			}
		}
		
		function query($sql)
		{
			if (empty($sql)) {
				die('sql 语句为空了');
			}
			$stmt = $this->conn->query( $sql ); 
			$result = array();
			while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ){ 
			   $result[]=$row;
			}
			return $result;
		}
		function near_page_list()
		{
			
			$callback			= $_REQUEST['callback'];
			$query = "
SELECT * FROM 
(SELECT  ROW_NUMBER()  OVER  ( ORDER BY shi_id )AS RowNumber,  *  FROM h_houseinfor) 
AS houseinfo 
WHERE RowNumber BETWEEN  21 AND 30 ORDER BY shi_id"; 
			
				
			$data				= array("error"=>"","message"=>'',"status"=>1,"houses"=>array());
			$lat   				= (float)$_REQUEST['lat'];
			$long  				= (float)$_REQUEST['long'];	
			
			if (!$lat || !$long) {
				$data['message']   = "无地址信息";
			}
	
			$near = array($lat,$long);
			
			$cursor =  $this->coll->find(
				 array(
					"loc"=>array( '$near' => $near )
				 )
			)->limit(self::PAGESIZE);
			
			$near_houses  				= iterator_to_array($cursor);
			
			if ( count($near_houses) > 0  ) {
				
				$housediccodes 			= array();
				
				foreach ($near_houses as $key => $v) {
					
					$housediccodes[] 	=	$v['housediccode'];
				}
				
				$housediccode_in_sql	= implode(',',$housediccodes);
				
				$cond = new SearchCondition();
			
				$cond->condition('h.houseDicCode',$housediccode_in_sql,SearchCondition::OP_IN,$allow_blank = false);

				$condition_sql 		= $cond->to_sql();
				$sql  				= $this->base_sql().$condition_sql;
			
				
				if (DEBUG) {
					$data['sql']			= $sql;
					$data['condition_sql']	= $condition_sql;
				}

				$data['houses']				= $this->query($sql);
				//print_r($sql);die;
				$data['status']				= 1;
				
			}else{
				
			}
			
			$this->echo_json($callback,$data);
		}
		

		function near_map()
		{
			$lat 					= $_REQUEST['lat'];
			$long 					= $_REQUEST['long'];
			
			$near_houses_mongo		= $this->find_near_houses_by_geo($lat,$long);
			$near_houses_mongo_ids	= $this->find_near_houses_ids_by_geo($near_houses_mongo);
			
			
			$cond = new SearchCondition();
			$cond->condition('h.shi_id',$near_houses_mongo_ids,SearchCondition::OP_IN,$allow_blank = false);
			$sql  =  $this->_house_select_sql.$cond->to_sql();
			
			$houses = $this->query($sql);
	
			$res = array("houses" =>array());
			$res['houses'] = $houses;
			
			
			echo json_encode($res);
		}
		const PAGESIZE = 10;
		
		
		function base_sql()
		{
		 	$page_size = self::PAGESIZE;
		 	$sql = "

SELECT  
A.shi_id, 				--房源信息表编号
A.update_date,			--记录更新时间
A.form_bedroom, 		--室
A.form_foreroom, 		--厅
A.form_toilet, 			--卫
A.form_terrace,			--阳台

A.sum_price,			--总价
A.rent_price,			--租金

A.build_area,			-- 建筑面积
A.usable_area,			--使用面积

B.houseDicCode,			--楼盘字典id
B.Name as houseDicName,	--楼盘名
B.map_location,			--地理信息数据

A.sanjakCode,			--不知道

A.su_id,			--不知道

A.lineName,			--联系人名
B.address, 			--具体的地址好像是楼盘字典的地址
B.Name, 			--楼盘名

A.atype,			--是租还是售
A.build_floor,		--当前楼层
A.build_levels,		--总楼层	

A.remarks,			--备注信息
A.havePic,			--是否有图片
					--C.kt, 

D.name AS fitmentName, 	--装修情况

E.su_name,				--分店名
E.tel1, E.tel2, E.tel3,

pic_table.kt,
pic_table.zw,
pic_table.cf,
pic_table.wsj,
pic_table.wj,

ft.name  	as facetoName,	--朝向
G.propertycode,G.Name as propertyname 	-- 房产权

FROM  h_houseinfor AS A LEFT OUTER JOIN
(SELECT     houseDicCode, Address, name , map_location
                            FROM          s_HouseDic) AS B ON A.HouseDicCode = B.HouseDicCode LEFT OUTER JOIN
(SELECT     shi_id, MIN(kt) AS kt
                            FROM          h_picUpfile
                            GROUP BY shi_id) AS C ON A.shi_id = C.shi_id LEFT OUTER JOIN
(SELECT     Name, FitmentCode
                            FROM          h_Fitment) AS D ON A.FitmentCode = D.FitmentCode LEFT OUTER JOIN
(SELECT     su_id,su_name, tel1, tel2 , tel3
                            FROM          s_Subsection) AS E ON A.su_id = E.su_id LEFT OUTER JOIN
(select shi_id,kt,zw,cf,wsj,wj from h_picUpfile) pic_table on a.shi_id=pic_table.shi_id
left join h_Faceto ft on A.FacetoCode=ft.FacetoCode 
left join (select PropertyCode,Name from h_Property) G on A.PropertyCode = G.PropertyCode 

";
				return $sql;
		} 
		
		function wrap_paged_sql($sql_full,$page_size=self::PAGESIZE,$start=0,$orderby_column = 'havePic')
		{
			if (empty($sql_full)) {
				die("sql 语句不能为空");
			}
			if (empty($page_size) || $page_size <=0 ) {
				$page_size =  self::PAGESIZE;
			}
			if (empty($start)) {
				$start 	   =  0; 
			}
			$start 		= $start + 1;
			$end		= $start + $page_size - 1;
			
			$sql = "
SELECT  *  FROM ( SELECT  ROW_NUMBER()  OVER  ( ORDER BY {$orderby_column} desc)  AS RowNumber,  *  FROM 

( $sql_full ) 

as inner_table ) as page_table ";
			
			$cond = new SearchCondition();
			$cond->condition('RowNumber',explode(",","$start,$end", 2),SearchCondition::OP_BETWEEN,$allow_blank = false);
			$sql				= $sql.$cond->to_sql();
			return $sql;
		}
		
		function find_near_houses_ids_by_geo($near_houses)
		{
			$near_houes_ids = array();
			foreach ($near_houses as $key => $value) {
				$near_houes_ids[] = $value['sql_id'];
			}
			return $near_houes_ids;
		}
		function find_near_houses_by_geo($lat,$long)
		{
			//get data in mongodb
			$cursor = $this->coll->find(
				 array(
					"loc"=>array( '$near' => $near )
				 )
			)->limit(self::PAGESIZE);
			
			$near_houses  = iterator_to_array($cursor);
			return $near_houses;
		}
	
		function search_list()
		{	
			//关闭调试模式的输出
			$GLOBALS["debug"]=0; 
			/*
is_search_near=1&lat=31&long=121&search=remark&sum_price=1,99999&zu_or_mai=1&form_bedroom=1&form_foreroom=1&form_toilet=1&facetocode=1&build_area=1,5000&districtcode=102
*/			
			$data					= array(
				'status'	=>	0,
				'error'		=> ''
			
			);
			
			//sleep(10000000);
		
			$is_search_near 		= $_REQUEST['is_search_near'];
			$lat 					= $_REQUEST['lat'];
			$long 					= $_REQUEST['long'];
			
			//bei zhu , xiao qu 
			$search  				= $_REQUEST['search'];
			
			$districtcode			= $_REQUEST['districtcode'];
			
			$sum_price				= $_REQUEST['sum_price'];
			$rent_price				= $_REQUEST['rent_price'];
			
			$zu_or_mai				= $_REQUEST['zu_or_mai'];
			
			$form_bedroom			= (int)$_REQUEST['form_bedroom'];
			$form_foreroom			= (int)$_REQUEST['form_foreroom'];
			$form_toilet			= (int)$_REQUEST['form_toilet'];
			
			$facetocode				= $_REQUEST['facetocode'];
			
			$build_area				= $_REQUEST['build_area'];
			$callback				= $_REQUEST['callback'];
			
			$page_size				= $_REQUEST['page_size'];
			$start					= $_REQUEST['start'];
			
			
			$near_houses_ids 		= array();
			if ($is_search_near) {	//search near houses
				$near_houses_ids    = $this->find_near_houses_by_geo($lat,$long);
				
				if (!$this->is_array_blank($near_houses_ids)) {
					die('near_houses_ids has problem');
				}
			}
			if (empty($zu_or_mai)) {
				$zu_or_mai = 0;	//买
			}
			
			$cond = new SearchCondition();
			
			$cond->condition('A.shi_id',$near_houses_ids,SearchCondition::OP_IN,$allow_blank = false);
			
			if ($zu_or_mai) {
				$cond->condition('A.sum_price',explode(",", $sum_price, 2),SearchCondition::OP_BETWEEN,$allow_blank = false);
			}else{ // zu 1 为 租
				$cond->condition('A.rent_price',explode(",", $rent_price, 2),SearchCondition::OP_BETWEEN,$allow_blank = false);
			}
			
			$cond->condition('A.StateCode','002'); //002 為有效
			$cond->condition('A.DistrictCode',$districtcode);
			$cond->condition('A.form_bedroom',$form_bedroom);
			$cond->condition('A.form_foreroom',$form_foreroom);
			$cond->condition('A.form_toilet',$form_toilet);
			$cond->condition('A.facetocode',$facetocode);
			$cond->condition('A.build_area',explode(",", $build_area, 2),SearchCondition::OP_BETWEEN,$allow_blank = false);
			$cond->condition(array('A.remarks','B.name','B.address'),$search,SearchCondition::OP_LIKE,$allow_blank = false);
			//$cond->condition('A.HavePic',1);
			
			$atype				= $this->filter_blank_array( array($zu_or_mai,2));
			//var_dump($atype);die;
			$cond->condition('A.atype', $atype ,SearchCondition::OP_IN,$allow_blank = false);
			
			$condition_sql 		= $cond->to_sql();
			$sql  				= $this->base_sql().$condition_sql;
			
			
			//print_r($sql);die;
			$data['status']				= 1;
			
		
			$sql						= $this->wrap_paged_sql($sql,self::PAGESIZE,$start);
			
			if (DEBUG) {
				//preg 用来去除该死的换行符
				
				//$data['sql']			= preg_replace("/[\s]{2,}/","",$sql);		
				//$data['condition_sql']	= preg_replace("/[\s]{2,}/","",$condition_sql);
				
				
				$data['sql']			= str_replace("\r\n","",$sql);	
				$data['condition_sql']	= str_replace("\r\n","",$condition_sql);
				
				
			}
			
			$data['houses']				= $this->query($sql);
			$data['total']				= count($data['houses']);
			
			if ($callback) {
			    header('Content-Type: text/javascript');
			    echo $callback . '(' . json_encode($data) . ');';
			} else {
			    //header('Content-Type: application/x-json');
			    echo json_encode($data);
			}
		}
		function filter_blank_array($arr)
		{
			$result  = array();
			foreach ($arr as $k => $v) {
				if (!empty($v) || $v===0) {
					$result[]  = $v;
				}
			}
			if (!count($result)) {
				return null;
			}
			return $result;
		}
		function page_list()
		{
					/*
			//echo	json_encode($arrayName = array('gakak' => "withyou"));
		 	//$houses  = D('h_houseinfor');
		 	
		 	//var_dump($_POST);
		 	
		 	//step 1 find loc from mongdb near
			$lat   = (float)$_REQUEST['lat'];
			$long  = (float)$_REQUEST['long'];	
		 	
			$data = array();
			if (empty($lat) || empty($long)) {
				$data['error'] = 'lat lang can not be null';
				$data['status']= 0;
				$data['length']= 0;
				$data['houses']= array();
				echo json_encode($data);die;
			}
			
		 	$near = array($lat,$long);
			// find everything in the collection
			$cursor = $this->coll->find(
				 array(
					"loc"=>array( '$near' => $near )
				 )
			)->limit(10);
			
			$near_houses_ids = iterator_to_array($cursor);
			echo json_encode(array("houses"=>$near_houses_ids));die;
			//var_dump($near_houses_ids);
		 	
			$ids = array();
			foreach ($near_houses_ids as $key => $value) {
				$ids[] = $value["sql_id"];
			}
		 	
		 	*/
		 	
		 	$paging=array();
		 	$paging['limit'] 		= (int)$_REQUEST['limit'];
		 	$paging['page']  		= (int)$_REQUEST['page'];
		 	$paging['start'] 		= (int)$_REQUEST['start'];
		 	$paging['page_size'] 	= (int)$_REQUEST['page_size'];
		 	
			if (!$paging['page']) {
				$paging['page'] = 1;
			}
			if (!$paging['start']) {
				$paging['start'] = 0;
				$paging['end'] = $paging['start'] +  $paging['limit']  ;
			}else{
				$paging['start'] = $paging['start'] + 1;
				$paging['end'] = $paging['start'] +  $paging['limit'] - 1 ;
			}
			
			
			$query = "SELECT  *  FROM 
			( SELECT  ROW_NUMBER()  OVER  ( ORDER BY shi_id )  AS RowNumber,  *  FROM h_houseinfor ) 
			 AS  row_house_info
			 WHERE RowNumber BETWEEN  {$paging['start']} AND {$paging['end']} ORDER BY shi_id desc";
			 
			 $data = array();
			 $data['total'] 	= 29;
			 $data['success'] 	= "succes";
			 $data['houses'] 	= $this->_query($query);
			 $data['page']		= $paging['page'];
			 echo json_encode($data);
		 
		}
		
		function detail_pics(){
			
			
			ini_set('display_errors',1);
			//关闭调试模式的输出
			$GLOBALS["debug"]=0;

			$data					= array(
				'status'	=>	0,
				'error'		=> ''
			);
			
			$callback				= 		$_REQUEST['callback'];
			$shi_id 				= 	 	$_REQUEST['shi_id'];
			
			$sql  = "select * from h_picUpfile where shi_id = '{$shi_id}'";
			
			if (DEBUG) {
				$data['sql']				= $sql;
			}
			
			if (!empty($shi_id)) {
				$data['house_detail_pics']		= $this->query($sql);
			}else{
				$data['house_detail_pics']		= array();
			}
			
			$data['status']						= 1;
			if ($callback) {
			    header('Content-Type: text/javascript');
			    echo $callback . '(' . json_encode($data) . ');';
			} else {
			    header('Content-Type: application/x-json');
			    echo json_encode($data);
			}
		}
		
		
				
		function map_get_housesdic_loc()
		{
			$GLOBALS["debug"]=0;
			$data = array();
			
			$callback  = $_REQUEST['callback'];
			
			$sql  = "select housediccode,[address] from s_housedic where map_location is  null or map_location = ''";
			
			if (DEBUG) {
				$data['sql']				= $sql;
			}
			
			$data['houseDicAddresses']		= $this->query($sql);
			$data['status']					= 1;
			$data['total']					= count($data['houseDicAddresses']);
			
			if ($callback) {
			    header('Content-Type: text/javascript');
			    echo $callback . '(' . json_encode($data) . ');';
			} else {
			    header('Content-Type: application/x-json');
			    echo json_encode($data);
			}
		
		}
		function map_set_housesdic_loc()
		{
			set_time_limit(0);
			$GLOBALS["debug"]=0;
			ini_set('display_errors',0);
			
			$data = array();
			
			$housedics  					= $_REQUEST['housedics'];
			
			$housedics						= json_decode($housedics,true);
			
			//var_dump($housedics);
			
			
			if (!count($housedics)) {
				
				$data['status']				= 0;
				
			}else{
				
				try {
					$this->coll->batchInsert($housedics);
					
					$data['ids'] 					=  array();
					$data['housedics'] 				=  array();
					$data['sql_updates'] 			=  array(); // populated with instanceof MongoId
					$data['sql_update_result'] 		=  array(); 
					
					foreach ($housedics as $housedic) {
						
					  $data['ids'][] 		=  $housedic['_id']; // populated with instanceof MongoId
					  $data['housedics'][] 	=  $housedic; // populated with instanceof MongoId
					  
					  
					  $loc 					= implode(',',$housedic['point']);
					  
					  //query update the database data
					  $sql_update 							= "update s_HouseDic set map_location = '{$loc}' where housediccode = {$housedic['housediccode']} ";
					  $data['sql_updates'][] 				= $sql_update;
					  $data['sql_update_result'][] 			= $this->conn->exec( $sql_update ); 
					  
					  
					}
					
					
					$data['status']				= 1;
					$data['total']				= count($data['ids']);
					
				} catch (Exception $e) {
				    var_dump($e);
					$data['error_stmt']	 		= array();
					$data['error_stmt'][]		= $e;
				}

				
			}
			
	
			if ($callback) {
			    header('Content-Type: text/javascript');
			    echo $callback . '(' . json_encode($data) . ');';
			} else {
			    header('Content-Type: application/x-json');
			    echo json_encode($data);
			}
		}

	}
	
	
	