<?php

	class Assist {
		
		public $conn;
		public $mconn,$mdb,$coll;
		
		function __construct()
		{
			try {
			   $this->conn = new PDO( DSN, USER, PASS, array(PDO::SQLSRV_ATTR_DIRECT_QUERY => true)); 
			   $this->conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			}
			catch( PDOException $e ) {
			   die( "Error connecting to SQL Server" ); 
			}
			try {
			   $this->mconn = new Mongo();
			   $this->mdb = $this->mconn->fml;
			   $this->coll = $this->mdb->houses;
			}
			catch( Exception $e ) {
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
		function gen_shanghai_district()
		{
			$sql 	= "select * from s_District where name not like '%上海%' order by districtCode";
			$res 	= $this->query($sql);
			
			foreach ($res as $key => $v) {
				$str =  "{text: '{$v['Name']}',value: '{$v['DistrictCode']}'}
				,";
				echo $str;
				
			}
			
			/*
			$this->assign("data", $res);
      		$this->display();
			*/
		}
	}
	
	
	