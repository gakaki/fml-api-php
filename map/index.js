var map = new BMap.Map("container");
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
// 创建地址解析器实例
var myGeo = new BMap.Geocoder();

var list_success = [];
var list_fail	 = [];

Ext.application({
    name: 'app',
    launch: function() {

		
    	var me = this;

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            
            items: [
            	{
                    id:'btns',
                    region:'north',
                    baseCls:'x-plain',
                    split: true,
                    height: 50,
                    minHeight: 50,
                    maxHeight: 50,
             
                    margins: '5 5 0 5',
                    items: [
                    {xtype:'button',text: '解析ok数据列表到服务器',
	                    handler:function(){
	                    	//console.log('list success',list_success);
	                    	me.map_set_housesdic_loc(list_success);
	                    }
		             },
                    {xtype:'button',text: '开始解析地图数据',
	                    handler:function(){
	                    	me.map_get_hoiusedic_loc();
	                    }
		        	},
                    {xtype:'button',text: '解析错误数据列表到服务器',
	                    handler:function(){
	                    	console.log('fail success',list_fail);
	                    	//me.map_get_hoiusedic_loc();
	                    }
		        	}
	            ],
            },
                {
                    title: 'hi 百度地图',
                    contentEl: Ext.get('container')
                }
            ]
        });
        

		//this.fetch_address();

        //this.map();
    },    
    map_get_hoiusedic_loc:function(){
    	
		var me = this;
		
    	Ext.Ajax.timeout = 116000; // 1 seconds
        // Set up a model to use in our Store
		Ext.define('HouseDicAddress', {
		    extend: 'Ext.data.Model',
		    fields: [
		        {name: 'housediccode', type: 'string'},
		        {name: 'address',  type: 'string'}
		    ]
		});
		//console.log(app.config.base_url()+'/houses/map_get_address');
		var HouseDicAddressStore = new Ext.data.Store({
		    model: 'HouseDicAddress',
		    proxy: {
		        type: 'ajax',
		        url : app.config.base_url()+'/houses/map_get_housesdic_loc',
				//url: '/index.php/houses/map_get_address',
		        reader: {
		            type: 'json',
		            root: 'houseDicAddresses'
		        }
		    },
		    autoLoad: false
		});
		
		HouseDicAddressStore.load({
		    scope   : this,
		    callback: function(records, operation, success) {
		        //the operation object contains all of the details of the load operation
		        //console.log(records);
		        for (var i=0; i < records.length; i++) {
		        	var record = records[i];
		        	var d = record.data;

		        	//console.log('出现的数据',d)
					me.def_get_point(d);
		        };
	
		    }
		});
    	
    },
    map_set_housesdic_loc:function(data){
    	
		Ext.Ajax.request({
		    url: app.config.base_url()+'/houses/map_set_housesdic_loc',
		    params: {
		        housedics: Ext.JSON.encode(data)
		    },
		    disableCaching:true,
		    method:'POST',
			type:'json',
		    success: function(response){
		    	
		    	console.log(response);
		    	
		    	//Ext.JSON.decode()
		        //var text = response.responseText;
		        // process server response here
		    },
			listeners: {
				beforerequest  :function(  conn,  options,  options ){
					 console.log(conn,  options,  options);
				},
			    requestcomplete:function(  conn,  response,  options,  options ) {
			       console.log(conn,  response,  options,  options);
			    },
			    requestcomplete:function(  conn,  response,  options,  options ) {
			        console.log(conn,  response,  options,  options);
			    }
			}
		});
    },
    fetch_address:function(){
    	
		Ext.Ajax.request({
		    url: app.config.base_url()+'/houses/map_get_housesdic_loc',
		    params: {
		        page_size: 1,
		      	page:22,
		      	start:21
		    },
		    type:'json',
		    disableCaching:true,
		    method:'POST',
		    success: function(response){
		    	//console.log(response);
		    	//Ext.JSON.decode()
		        //var text = response.responseText;
		        // process server response here
		    },
			listeners: {
				beforerequest  :function(  conn,  options,  options ){
					 console.log(conn,  options,  options);
				},
			    requestcomplete:function(  conn,  response,  options,  options ) {
			       console.log(conn,  response,  options,  options);
			    },
			    requestcomplete:function(  conn,  response,  options,  options ) {
			        console.log(conn,  response,  options,  options);
			    }
			}
		});


    },
    def_get_point:function(data){
    	
    	var me = this;
    	
    	Ext.Function.defer(function(){
    		
				//console.log('每次传递的数据',data.address,data)
			    me.map(data);
			    
		}, 5000);
    	
    },
    map:function(data){

    	if (!data) {
			console.log('注意 地址数据为空了');
    		return false;
    	};
    	
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(data.address, function(point){
		  if (point) {
		    //map.centerAndZoom(point, 16);
		    //map.addOverlay(new BMap.Marker(point));
		    console.log(point,data.address,data.housediccode);
		    
		    data.point = point;
		    //存储数据到本地的array中
		    list_success.push(data);

		  }else{
		  	console.log("没有参数结果的时候",point,data.address,data.housediccode);
		  	list_fail.push(data);
		  }
		}, "上海市");

		
	},
 	map_test:function(){
    	
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint("罗秀路990弄", function(point){
		  if (point) {
		    map.centerAndZoom(point, 16);
		    map.addOverlay(new BMap.Marker(point));
		  }else{
		  	console.log("没有参数结果的时候",point);
		  }
		}, "上海市");

		console.log( myGeo,myGeo.toString() );

    }

});






Ext.ns('app.config');
app.config = {

	base_url: function(){

		//return "http://192.168.1.102/index.php";
		return "http://"+window.location.host+"/index.php"
		
	}

};