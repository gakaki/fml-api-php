
FML.views.BaiduMapPanel = Ext.extend(Ext.Panel,{
	

    initComponent: function () {
		var me = this;
        Ext.apply(this, {
            autoDestroy: true,
            fullscreen: true,
			layout : 'auto',
			styleHtmlContent:false,
			map:undefined,
			point:undefined,
			waitMask:undefined,
			geo:undefined,
		    dockedItems: [
		          {
		              dock : 'top',
		              xtype: 'toolbar',
		              title: "地图",
		              items:[
						{
				                text: "定位",
				                ui: 'action',
				                handler: this.relocate,
				                scope: this
				        }
		              ]
		         }
		      ],
		    contentEl: 'map'
        });

		
		
		
        FML.views.BaiduMapPanel.superclass.initComponent.call(this);
        
        this.initMap();
       // this.initGeoLocation();
      //    this.relocate();
    },
    getMap:function(){
    	return this.map;	
    },
    initMap:function() {
    
    	this.map 		= new BMap.Map("map");          			// 创建地图实例  
    	var map			= this.map;
    	var point		= new BMap.Point(116.404, 39.915);
    	
		//map.centerAndZoom(point, 18);        // 初始化地图，设置中心点坐标和地图级别 
		
		map.enableScrollWheelZoom();  // 开启鼠标滚轮缩放  
		map.enableKeyboard();         // 开启键盘控制  
		map.enableContinuousZoom();   // 开启连续缩放效果  
		map.enableInertialDragging(); // 开启惯性拖拽效果  
		

		map.addControl(new BMap.NavigationControl());  
		map.addControl(new BMap.ScaleControl());  
		map.addControl(new BMap.OverviewMapControl());  
		map.addControl(new BMap.MapTypeControl());  

    },
    initGeoLocation:function(){
    	me = this;
    	this.geo = new FML.utils.GeoLocation({
		    autoUpdate: false,
		    listeners: {
		    	locationUpdateStart:function(){
		    		mlog('locationUpdateStart');
		    		
					me.waitMask = new Ext.LoadMask(Ext.getBody(), {msg:"定位中 请等待..."});
					me.waitMask.show();
					//me.setLoading(true); 
		    		
		    	},
		    	locationUpdateEnd:function(){
		    		mlog('locationUpdateEnd');
		    		
		    		me.waitMask.hide(); 
		    		
		    	},
		        locationupdate: function (geo,position,point) {
		            mlog('geo positon is : ' + geo,position);
		            
		            me.centerUserInMap(geo,position,point);
		            
		        	me.findNearHouses(point,{});
		            
		        },
		        locationerror: function (object,  error, 
		                                    message) {
		           mlog( 'locationerror',  error, message);
		           
				    //Ext.Msg.alert('百度地图', message, Ext.emptyFn);

					Ext.Msg.show({
					   title: '百度地图',
					   msg: message,
					   showAnimation:true,
					   width: 300,
					   fn:  Ext.emptyFn,
					   icon: Ext.MessageBox.INFO
					});
					
					setTimeout(function() {
						Ext.Msg.hide()
					}, 2000);
	        	},
		    }
		});
    },
    findNearHouses:function(point,options){
    	var me = this;
    	
    	// store load to find near houses than fireEvent for the 
    	var store_near = new FML.stores.HouseNearStore();
    	store_near.extraParams = {};
    	store_near.load();
    	
    	
    	
    	
    },
    relocate:function(){
    	
    	this.geo.updateLocation(function(r,o,o){
    		mlog('updated get the location',r,o,o);
    	});
    	
    },
    centerUserInMap:function(geo,positon,geo_point){
    	var map 		= this.map;
    	this.point		= geo_point;
    	
    	map.clearOverlays();
    	map.clearHotspots();	
    	var point =  new BMap.Point(geo_point.lng,geo_point.lat); 
    	var marker = new BMap.Marker(point);        // 创建标注  
    	
    	
    	
     	map.centerAndZoom(point, 18);        // 初始化地图，设置中心点坐标和地图级别 
    	map.addOverlay(marker);              
      	map.panTo(point);
     	
      	
      	var sContent = FML.templates.MapContent.apply({
      		pic_url:"http://baidu.com",
      		title:'biaoti',
      		count:'fangzi',
      		sum_price:'jiage'
      	});
      	var infoWindow = new BMap.InfoWindow(sContent, {
     					 // width : 25,     // 信息窗口宽度
     					 // height: 25,     // 信息窗口高度
     					  title : "您的当前位置",  // 信息窗口标题,
     					  offset: {
     					  	width:-3,
     					  	height:-10
     					  }
     	});  // 创建信息窗口对象
  		
     	map.openInfoWindow(infoWindow, point);      // 打开信息窗口			
     	
		marker.addEventListener("click", function(){          
		   this.openInfoWindow(infoWindow);
		   //图片加载完毕重绘infowindow
		   
		    Ext.select('.map_content_image').on({
			   	"load":function  () {
			   		infoWindow.redraw();
			   	}
		   });
		});
		
		
    },
    baiduLocationSuccess:function(geo){
    	
    	
    },
    baiduLocationFails:function(){
    	
    	
    }
});