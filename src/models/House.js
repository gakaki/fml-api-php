/*Ext.regModel('Setting', {
    fields: [
        'id',
        'language',
        'distanceUnit',
        {
            name: 'animation',
            type: 'boolean'
        }
    ]    
});
*/

FML.models.House = Ext.regModel('House', {
            fields: [
            {  //pk
                name: 'shi_id',
                type: 'string'
            },
            { //地址？
                name: 'shi_addr',
                type: 'string'
            },
            {
            	name: 'update_date',
            	type: 'string'
            },
            //备注
            {
                name: 'remarks',
                type: 'string'
            },
           
            //联系电话
            {
                name: 'landlord_tel',
                type: 'string'
            },
            {//室
                name: 'form_bedroom',
                type: 'int'
            },
            //厅
            {
                name: 'form_foreroom',
                type: 'int'
            },
            //卫
            　　 {
                name: 'form_toilet',
                type: 'int'
            },
            //阳台
            　 {
                name: 'form_terrace',
                type: 'int'
            },
             {//总价
                name: 'sum_price',
                type: 'string',
            	
            },
            {//租金
                name: 'rent_price',
                type: 'string',
            },
            {
            	name: 'sum_price_gai',
            	convert: function(value, record) {
	                var sum_price  = record.get('sum_price');
	      
					var for_dight  = function(dight,how){
						var res = Math.round (dight*Math.pow(10,how))/Math.pow(10,how); 
						return res;
					}
	                return for_dight(sum_price,2);
	            }	
            },
            {
            	name: 'sum_price_junjia',
            	convert: function(value, record) {
	                var sum_price  = record.get('sum_price');
	      			var build_area = record.get('build_area');
					var res		   = sum_price / build_area;
					res			   = Math.round (res*Math.pow(10,2))/Math.pow(10,2); 
					
	                return res;
	            }
            },
            {	name: 'rent_price' 	},
            {
            	name: 'rent_price_gai',
            	convert: function(value, record) {
	                var rent_price  = record.get('rent_price');
					var res = Math.round (rent_price*Math.pow(10,2))/Math.pow(10,2); 
					return res;
	            }	
            },
            {//建筑面积
                name: 'build_area',
                type: 'int'
            },
            //使用面积
            {
                name: 'usable_area',
                type: 'string'
            },
            //楼盘名 	
            {
                name: 'houseDicName',
                type: 'string'
            },
            {//楼盘字典id
                name: 'houseDicCode',
                type: 'string'
            },
            {name: 'districtCode',     type: 'string'}, //区域id
            {name: 'districtName',  type: 'string'}, 	//小区名
            {name: 'lineName',  type: 'string'}, 	//联系人名
            {name: 'landlord_name',  	   type: 'string'}, //房东姓名
            {name: 'landlord_tel',  type: 'string'}, 	//房东电话
            {name: 'address',  type: 'string'}, 	//楼盘字典的地址
            {name: 'fitmentName',  type: 'string'}, 	//装修情况
            {name: 'yearName',  type: 'string'}, //具体年代
            {name: 'hPic'  	 }, 		//户型图
            {name: 'havePic',  type: 'string'}, //是否有图片
            {name: 'trade_type',  	type: 'string'}, 		//城区
            {name: 'hasKey',  type: 'auto'}, 	//是否有钥匙
            {name: 'build_floor',  type: 'string'}, 	//当前楼层
            {name: 'build_levels', type: 'string'}, //总楼层
            {name: 'stateName',  type: 'string'}, 	//有效
            {name: 'atype',  	 type: 'int'}, 		//是租还是售
            {name: 'stateCode',  type: 'string'}, 	//状态编号
            {name: 'facetoName', type: 'string'}, 		//朝向
   
            {name: 'hPicURL',  type: 'string'}, 	//图片url 暂时不使用
            {name: 'hPic_id',  type: 'string'}, 	//图片id fk
            
            {name: 'su_name',  type: 'string'}, 	//门店名
            {name: 'tel1',  type: 'string'}, 	//电话1
            {name: 'tel2',  type: 'string'}, 	//电话2
            {name: 'tel3',  type: 'string'},		//电话3
            
            {name: 'thumb',  type: 'string'}, 	//縮略圖
            {name: 'kt',  type: 'string'}, 	//縮略圖1
            {name: 'zw',  type: 'string'}, 	//縮略圖2
            {name: 'cf',  type: 'string'},		//縮略圖3
            {name: 'wsj',  type: 'string'},		//縮略圖4
            {name: 'ws',  type: 'string'},		//縮略圖5
            {name: 'propertyname',  type: 'string'}		//权属
    	] 	
            
            
            
});
    	
    /*
    	// 房源信息表 和 楼盘字典 表 各添加一个 map_location列用来存储 地图定位数据 
ALTER TABLE h_houseinfor ADD map_location varchar(50)
ALTER TABLE s_HouseDic ADD map_location varchar(50)
    
    */




FML.stores.HouseSearchStore = new Ext.data.Store({
			storeId: 'HouseSearchStore',
    	    model: 'House',
    	    pageSize : FML.utils.Config.page_size,
    	    clearOnPageLoad :false,
    	    showMoreText : "载入更多......",
    	    proxy: {
    	        type: FML.utils.Config.get_call_back_proxy(),
    	        actionMethods: {
    	                   create : 'POST',
    	                   read   : 'POST',
    	                   update : 'POST',
    	                   destroy: 'POST'
    	        },
    	        url : FML.utils.Config.get_base_url()+'/houses/search_list',
    	        reader: {
    	            type: 'json',
    	            root: 'houses'
    	        },
    	        extraParams: {
					
    	        					  	



				}
    	    },
    	    autoLoad: false,
		    listeners:{
	      		datachanged : function(store ){
	      			console.log('datachanged',store);
	      		},
	      		load : function(store,  records,  successful ){
	      			console.log('load',store,  records,  successful);
	      			
			     	// add "show more..."
		            var showMore = Ext.ModelMgr.create({
		                name : this.showMoreText,
		                showMore: true,
		            }, 'House');
		            store.insert(store.getCount(),showMore);
	      		
	      		}
		    }
});

FML.stores.HouseNearStore = new Ext.data.Store({
			storeId: 'house_near_store',
		    model: 'House',
		    pageSize : FML.utils.Config.get_base_url()+FML.utils.Config.page_size,
		    proxy: {
		        type: 'ajax',
		        url : '/index.php/houses/near_list',
		        reader: {
		            type: 'json',
		            root: 'houses',
		        },
				actionMethods: {
				      create : 'POST',
				      read   : 'POST',
				      update : 'POST',
				      destroy: 'POST'
				},
				extraParams: {
				    
				}
		    },
		    autoLoad: false
});
		


FML.models.FormSearchSettings = Ext.regModel('FormSearchSettings', {
            fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'sum_price',
                type: 'string'
            },
            {
                name: 'form_bedroom',
                type: 'string'
            },
            {
                name: 'form_foreroom',
                type: 'string'
            },
            {
                name: 'form_toilet',
                type: 'string'
            },
            {
                name: 'facetocode',
                type: 'string'
            },
            {
                name: 'build_area',
                type: 'string'
            }]
});



FML.stores.FormSearchSettingsStore = new Ext.data.Store({
	storeId: 'FormSearchSettingsStore',
    model: 'FormSearchSettings',
	proxy: {
		type: 'localstorage',
		id  : 'FML.FormSearchSettings'
	},
    autoLoad: false
});
			



FML.models.HouseDetailImages = Ext.regModel('HouseDetailImages', {
            fields: [
            {  name: 'kt'},
            {  name: 'zw' },
            {  name: 'cf' },
            {  name: 'wsj' },
            {  name: 'wj'  },
            {  name: 'gd'  }]
});




FML.stores.HouseDetailImagesStore = new Ext.data.Store({
			storeId: 'HouseDetailImagesStore',
    	    model: 'HouseDetailImages',
    	    pageSize : FML.utils.Config.page_size,
    	    proxy: {
    	        type: FML.utils.Config.get_call_back_proxy(),
    	        actionMethods: {
    	                   create : 'POST',
    	                   read   : 'POST',
    	                   update : 'POST',
    	                   destroy: 'POST'
    	        },
    	        url : FML.utils.Config.get_base_url()+'/houses/detail_pics',
    	        reader: {
    	            type: 'json',
    	            root: 'house_detail_pics'
    	        },
    	        extraParams: {
					

				}
    	    },
    	    autoLoad: false
});
