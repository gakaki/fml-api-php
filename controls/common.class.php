<?php


	class SearchCondition
	{
		public $el;
		public $and_arr;
		public $or_arr;
		
		function __construct()
		{
			$this->el 		= array();
			$this->stmts 	= array();
		}

		function _base_sql()
		{
		 	$page_size = self::PAGESIZE;
		 	$sql = "
select top $page_size
h.shi_id,		--房源信息表编号
h.update_date,	--记录更新时间
h.form_bedroom,	--室
h.form_foreroom,	--厅
h.form_toilet,		--卫
h.form_terrace,		--阳台
h.sum_price,		--总价
h.Rent_Price,		--租金
build_area,			-- 建筑面积
usable_area,		--使用面积
hd.Name as houseDicName,	--楼盘名
hd.map_location,	--地理信息数据
h.houseDicCode,		--楼盘字典id
h.sanjakCode,		--不知道
h.districtCode,				--小区id 什么区的，
sd.Name as districtName,	--小区名
h.su_id,			--不知道
h.shi_addr,			--产证地址
h.lineName,			--联系人名
h.landlord_name,	--房东姓名
h.landlord_tel,		--房东电话
hd.address,			--具体的地址好像是楼盘字典的地址
f.Name as fitmentName, --装修情况
y.Name as yearName,	--具体年代
h.remarks,			--备注信息
h.hPic,				--户型图
h.havePic,			--是否有图片
h.hPicURL,				--图片url 暂时不使用
h.hPic_id, 				--图片id fk
h.hasKey,			--是否有钥匙
h.build_floor,		--当前楼层
h.build_levels,		--总楼层
s.Name as stateName,	--状态名 有效咯
h.aType,			--是租还是售
h.stateCode,		--状态编号
f.Name as fitmentName,	--装修情况 
ft.name as facetoname,  -- 朝向
ss.su_name,			--门店名
ss.tel1	,			--门店电话1
ss.tel2 ,				--门店电话2
ss.tel3	,			--门店电话3
pic_thumb.kt as thumb,		-- 缩略图
pic_table.kt,pic_table.zw,pic_table.cf,pic_table.wsj,pic_table.wj	--该死的图片 
 from h_houseinfor h 
left join s_HouseDic hd on hd.HouseDicCode=h.HouseDicCode  
left join h_Fitment f on f.FitmentCode=h.FitmentCode 
left join h_Year y on y.YearCode=h.YearCode 
left join h_Faceto ft on h.FacetoCode=ft.FacetoCode 
left join s_District sd on h.DistrictCode=sd.DistrictCode 
left join h_State s on s.StateCode=h.StateCode 
left join s_Subsection ss on ss.su_id = h.su_id 
left join (select shi_id,kt,zw,cf,wsj,wj from h_picUpfile) pic_table on h.shi_id=pic_table.shi_id 
left join (select shi_id,MIN(kt) AS kt from h_picUpfile GROUP BY shi_id) pic_thumb on h.shi_id=pic_thumb.shi_id 
";

				return $sql;
		}
		function operator($operator)
		{
			
		}
		
		const OP_EQ 						= ' = ';
		const OP_LIKE 						= ' LIKE ';
		const OP_LESSTHAN 					= ' < ';
		const OP_LESSTHANOREQUAL			= '	<= ';
		const OP_MORETHAN					= '	> ';
		const OP_MORETHANOREQUAL			= '	>= ';
		const OP_NOTEQUAL					= '	<> ';
		const OP_BETWEEN					= '	BETWEEN {0} AND {1} ';
		const OP_IN							= ' IN ';
		const OP_NOT_EQUAL					= ' <> ';
		
		
		function condition($column_name,$column_value=null,$operator=self::OP_EQ,$allow_blank=false)
		{
			$this->el[] = array(
				'column_name' 	=> $column_name,
				'column_value'	=> $column_value,
				'operator'		=> $operator,
				'allow_blank' 	=> $allow_blank
			);
			return $this;
		}
	
		function is_array_blank($arr)
		{
			$res = array();
			if (is_array($arr)) {
				$res = implode("",$arr);
			}else{
				$res  = $arr;
			}
	
			return empty($res);
		}
		function deal_op($one)
		{
			$operation      = "";
			
			$op 			= $one['operator'];
        	if (empty($op)) {
        		$op			= self::OP_EQ;
        	}
        	
        	$ab 			= $one['allow_blank'];
        	$cv   			= $one['column_value'];
        	$cn				= $one['column_name'];
            
        	//如果选择 allow_blank is false ,并且该字段为空值的话,跳过
     		
       		
            if ( !$ab && ( empty($cv) || $this->is_array_blank($cv) ) )
            {
                $operation  =  "";
            }
        	else if ($op == self::OP_LIKE)
            {
				$operation  =  "  {$cn} {$op} '%{$cv}%' ";

            }
            else if ($op == self::OP_BETWEEN)
            {
            	if (is_array($cv)) {
            		
            		if ( count($cv)<=0 ) {
            			$operation =  "";
            		}else{
            			$operation =  " ( {$cn} BETWEEN  {$cv[0]} AND  {$cv[1]} ) ";
            		}
            		
            	}else{
            		die('between and in data is array need');
            	}
            }
            else if ($op == self::OP_IN)
            {
            	if (is_array($cv)) {
            		
            		if (count($cv)<=0) {
            			$operation =  " ( {$cn} IN ({$in_string})) ";
            		}else if (count($cv)==1) {
            			$operation =  " ( {$cn} IN ({$cv[0]})) ";
            		}else{
            			$in_string = implode(",", $cv);
            			$operation =  " ( {$cn} IN ({$in_string})) ";
            		}
            		
            	}else{
            		die(' in data is array need');
            	}
            }
            else{
            	
            	if ( !is_string($cv) && is_numeric($cv)) {
            		
            		$operation =  " {$cn} {$op} {$cv} ";

        		}else{
        			
	            	$operation 	=  " {$cn} {$op} '{$cv}' ";
	            	
            	}
            }
            

        	return $operation;            
		}
		function single_step($cn,$op,$cv)
		{
			
		}
		function to_sql()
		{
			$sql 		= " Where (1=1) ";
 			
            foreach ($this->el as $k => $v) {
            	
				$op 			= $v['operator'];
	        	$ab 			= $v['allow_blank'];
	        	$cv   			= $v['column_value'];
	        	$cn				= $v['column_name'];
            	
	         	if (is_array($cn) && !empty($cv)) {
	         	
	         		$res = array();
	         		foreach ($cn as $key => $single_cn) {
	         			
	         			$one_op = array(
	         				'operator' 		=> $op,
	        				'allow_blank' 	=> $ab,
	        				'column_value' 	=> $cv,
	        				'column_name' 	=> $single_cn
						);
						
						$tmp 	=  $this->deal_op($one_op);
						
						$res[] = $tmp ;
						
	         		}
	         		
	         		$arr_str		=  implode(" or ",$res);
	         		$this->stmts[]  =  "(".$arr_str.")";
	         		
	         	}else{

	         		$this->stmts[] = $this->deal_op($v);
	
	         	}
            }
          
   			
   			foreach ($this->stmts as $k => $v) {
   				if (!empty($v)) {
   					//$sql.="\n AND ".$v;
   					$sql.=" AND ".$v;
   				}
   			}
            return $sql;
		}
	}
	
	
	class Common extends Action {
		function init(){

		}
		
		public	function echo_json($callback,$data)
		{
			if ($callback) {
			    header('Content-Type: text/javascript');
			    echo $callback . '(' . json_encode($data) . ');';
			} else {
			    //header('Content-Type: application/x-json');
			    echo json_encode($data);
			}
		}
		
		
	}