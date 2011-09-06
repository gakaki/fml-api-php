
Ext.BaiduMapPanel = Ext.extend(Ext.Panel,{
	
	baiduLocationSuccess:undefined,
	
	constructor: function (a) {
        this.addEvents("baiduLocationSuccess");
        Ext.BaiduMapPanel.superclass.constructor.call(this, a)
    },
	getFailReason:function(code){
     	    var reVal = null;
     	    switch(code){
     	        case BMAP_STATUS_SUCCESS:
     	            reVal = "检索成功";
     	            break;
     	        case BMAP_STATUS_CITY_LIST:
     	            reVal = "城市列表";
     	            break;
     	        case BMAP_STATUS_UNKNOWN_LOCATION:
     	            reVal = "位置结果未知";
     	            break;
     	        case BMAP_STATUS_UNKNOWN_ROUTE:
     	            reVal = "导航结果未知";
     	            break;
     	        case BMAP_STATUS_INVALID_KEY:
     	            reVal = "非法密钥";
     	            break;
     	        case BMAP_STATUS_INVALID_REQUEST:
     	            reVal = "非法请求";
     	            break;
     	        case BMAP_STATUS_PERMISSION_DENIED:
     	            reVal = "没有权限";
     	            break;
     	        case BMAP_STATUS_SERVICE_UNAVAILABLE:
     	            reVal = "服务不可用";
     	            break;
     	        case BMAP_STATUS_TIMEOUT:
     	            reVal = "超时";
     	            break;
     	        default:
     	            reVal = "";
     	            break;
     	    }
     	    return reVal;
	},
	getLocationCallBack:function(geolocationResult){
		
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
				mlog(" current point is "+ geolocationResult.point.lat + ','+geolocationResult.point.lng + " and 精确度为 "+geolocationResult.accuracy);
				mlog(baidu_location.getStatus());
				mlog(BMAP_STATUS_SUCCESS);
				
				this.fireEvent('baiduLocationSuccess');
				
				this.baiduLocationSuccess();	
				
				
				var map = new BMap.Map("map");  
     			mlog(geolocationResult.point.lng, geolocationResult.point.lat);
     			var point = new BMap.Point(geolocationResult.point.lng, geolocationResult.point.lat); 
     					
     					
				map.enableScrollWheelZoom();  // 开启鼠标滚轮缩放  
				map.enableKeyboard();         // 开启键盘控制  
				map.enableContinuousZoom();   // 开启连续缩放效果  
				map.enableInertialDragging(); // 开启惯性拖拽效果  
				
				map.centerAndZoom(point, 18);  

				map.addControl(new BMap.NavigationControl());  
				map.addControl(new BMap.ScaleControl());  
				map.addControl(new BMap.OverviewMapControl());  
				map.addControl(new BMap.MapTypeControl());  
				
				var marker = new BMap.Marker(point);        // 创建标注  
				map.addOverlay(marker);              
				//marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
				
				map.addEventListener("tilesloaded",function(){
					mlog("地图加载完毕");
				});
				map.addEventListener("click", function(e){
					mlog("您点击的坐标为 ..." + e.point.lng + " " + e.point.lat);
  				});		
		}

	},

    initComponent: function() {
		
    	this.houseListPanel = new FML.views.HouseListPanel();
    	
    	var toolBarItems = [];
        
        toolBarItems.push({
                text: "定位",
                ui: 'action',
                handler: undefined,
                scope: this
        });
    
        toolBarItems.push({
                xtype: "spacer"
        });
        /*
        toolBarItems.push({
            iconMask: true,
            iconCls: 'action',
            handler: undefined,
            scope:this
        });
*/
        this.toolbar = new Ext.Toolbar({
            dock: 'top',
            items: toolBarItems
        });
        
        Ext.apply(this, {
            autoDestroy: true,
            fullscreen: true,
			layout: "card", 
			dockedItems: [this.toolbar],
			items:this.houseListPanel
		});
			
    	Ext.BaiduMapPanel.superclass.initComponent.call(this);
    }
});

