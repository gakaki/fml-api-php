
FML.utils.Config_Base =  Ext.extend(Ext.util.Observable,{
	   
	   constructor: function(config){
			
	        this.addEvents({
	            "change_zu_or_mai" : true,
	        });
	        
	        FML.utils.Config_Base.superclass.constructor.call(this, config)
	    },
    
		page_size: 3, 
		is_search_near: 0,
		lat: 121, 
		long : 31, 
		zu_or_mai : 0,			//租1　买　0
		
		
		production	: true,
		
		//development_url: 'http://192.168.3.101:8081/index.php',
		
		development_url: 'http://192.168.1.102/index.php',
		production_url: 'http://api.yukiqiqi.com/index.php',
		
		local_url		:'http://127.0.0.1/index.php',
		pic_base_url	:'http://www.4000168000.com/HouseMis/',
		
		
		is_phonegap:function(){
			return (typeof device !== 'undefined');
		},
		get_base_url:function(){
			
			var url = window.location.href;
			var regExp = /(127)|local/i;
        	
			if (this.get_call_back_proxy() === "scripttag") {
				
				if (this.production) {
					return this.production_url;
				}else{
					return this.production_url;
				}
				
			}else{
				if (url.match(regExp)){
	        		return this.local_url;
	        	}
				else{
					
					if (Ext.is.Desktop) {
						return window.location.origin+"/index.php";
					}else	//not desktop is phone?
					{
						return window.location+"/index.php";
					}
				}
			}
		},
	
		is_file_url:function(){
			if (typeof window.location.protocol !== 'undefined'){
				console.log('window location procotol',window.location.protocol);
				if (window.location.protocol==='file:') {
					return true;
				}else{
					return false;
				}
			}else{
				return true;
			}
		},
		get_call_back_proxy:function(){
			if (this.is_phonegap() || this.is_file_url()) {
	
				return 'scripttag';
			}else
			{
				return 'ajax';
			}				
		},
		get_zu_or_mai:function(){
			return this.zu_or_mai;
		},
		toggle_zu_or_mai:function(){
			
			
			if (this.is_zu()) {
				this.set_mai();
			}else{
				this.set_zu();
			}
			
			this.fireEvent('change_zu_or_mai',this.get_notice_txt(),this.zu_or_mai);
		},
		get_notice_txt:function(){
			return 	this.zu_or_mai===0?"买":'租';
		},
	
		trigger_zu_or_mai:function(){
			this.fireEvent('change_zu_or_mai',this.get_notice_txt(),this.zu_or_mai);
		},
		is_zu:function(){
			return this.zu_or_mai === 1;
		},
		is_mai:function(){
			return this.zu_or_mai === 0;
		},
		set_mai:function(){
			this.zu_or_mai = 0;
			this.fireEvent('change_zu_or_mai',"买",this.zu_or_mai);
		},
		set_zu:function(){
			this.zu_or_mai = 1;
			this.fireEvent('change_zu_or_mai',"租",this.zu_or_mai);
		},
		get_loc:function(){
			var result = {
				lat:this.lat,
				long:this.long
			};
			return result;
		},
		set_lat:function(lat){
			this.lat = lat;
		},
		set_long:function(long){
			this.long = long;
		},
		
		get_is_search_near:function(){
			return this.is_search_near == 1;
		},
		set_search_near:function(){
			this.is_search_near =1 ;
		},
		set_not_search_near:function(){
			this.is_search_near =0 ;
		},
		get_status:function(){
			
			for(var k in this){
				mlog(k,this[k]);
			}
	
		}
});


FML.utils.Config = new FML.utils.Config_Base();