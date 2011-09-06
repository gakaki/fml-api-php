<?php

	class Test {
		
		public $conn;
		public $mconn,$mdb,$coll;
	
		function test_connection()
		{
			$GLOBALS["debug"]=0;
			
			
			$callback 	= $_REQUEST['callback'];
			
			$data	= array( 'status' => '0','message'=>"", 'xdebug_message'=>array());
	
			try {
			   $this->conn = new PDO( DSN, USER, PASS, array(PDO::SQLSRV_ATTR_DIRECT_QUERY => true,PDO::SQLSRV_ATTR_QUERY_TIMEOUT=>2)); 
			   $this->conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	

			}
			catch( Exception $e ) {
				
			   $data['xdebug_message'][] = $e;
			   $data['message'].= "pdo 数据连接错误";
			 
			}
			try {
			   $this->mconn = new Mongo();
			   $this->mdb = $this->mconn->fml;
			   $this->coll = $this->mdb->housedics;
			}
			catch( Exception $e ) {
				
				$data['xdebug_message'][] = $e;
				$data['message'].= " mongodb 数据连接错误 ";
			}
			
			if (empty($data['message'])) {
				$data['status'] = 1;
			}
			
			$this->echo_json($callback,$data);
		}

	}
	
	
	