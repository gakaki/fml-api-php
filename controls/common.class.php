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
            	
	         	if (is_array($cn)) {
	         		
	         		//var_dump($cn);
	         		$res = array();
	         		foreach ($cn as $key => $single_cn) {
	         			
	         			$one_op = array(
	         				'operator' 		=> $v['operator'],
	        				'allow_blank' 	=> $v['allow_blank'],
	        				'column_value' 	=> $v['column_value'],
	        				'column_name' 	=> $single_cn
						);
						         			
						//var_dump($single_cn,$one_op);
						$res[] = $this->deal_op($one_op);
	         		}
	         	
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