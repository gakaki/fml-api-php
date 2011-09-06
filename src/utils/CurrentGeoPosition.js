
FMP.utils.CurrentGeoPosition = new Object({
  	//default lat long
    latitude: 31.234309729773,
    longitude: 121.48479060028
    geo: null,
    // error already showed, display it only once
    errorShowed:false,
    /** call the callback only 1 times*/
    callbackCounter:0,
    updateLocation: function(callback){
        var me = this;
        me.callbackCounter=0;
        if(this.geo === null){
        	
        	this.geo = new BMap.Geolocation();
        	geo.getCurrentPosition(function(geolocationResult){

     			if(this.getStatus() == BMAP_STATUS_SUCCESS){
     			
     					mlog(geolocationResult);
     					
     					mlog(" current point is "+ geolocationResult.point.lat + ','+geolocationResult.point.lng + " and 精确度为 "+geolocationResult.accuracy);
     				
     				    mlog(baidu_location.getStatus());
     					mlog(BMAP_STATUS_SUCCESS);
     					 
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
     					
     					
     					var info_window_opts = {
     					  width : 250,     // 信息窗口宽度
     					  height: 100,     // 信息窗口高度
     					  title : "Hello"  // 信息窗口标题
     					}
     					
     					
     					var infoWindow = new BMap.InfoWindow("World<br/>time datas", info_window_opts);  // 创建信息窗口对象
     					
     					marker.addEventListener("click", function(e){   
     					  mlog("您点击了标注",e);   
     					  this.openInfoWindow(infoWindow);  
     					
     					});  
     					
     					
     					
     					map.openInfoWindow(new BMap.InfoWindow("当前位置是", {
     					  width : 25,     // 信息窗口宽度
     					  height: 25,     // 信息窗口高度
     					  title : ""  // 信息窗口标题
     					}), map.getCenter());      // 打开信息窗口
     					
     					
     					
     					
     					//gen a new marker for houses to add it
     					var house_point = new BMap.Point(121.39674, 31.266134 ); 
     					// 创建图标对象  
     				
     					var txt = "银湖海岸城", mouseoverTxt = txt + " " + parseInt(Math.random() * 1000,10) + "套" ;
     					var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(121.483982,31.234564), "银湖海岸城",mouseoverTxt,function(d,t){
     					
     					
     						mlog(d,t);
     					
     					});
     					map.addOverlay(myCompOverlay);
     					
     					
     					 
     					
     					// 附近的公交 菜场 医院 计算距离 距离工具
     					// 公交站点信息 http://dev.baidu.com/wiki/static/map/API/examples/?v=1.2&7_19#7&19
     					// 用tab 标签切换吧
     					
     			}else{
     			        alert('failed:'+getFailReason(this.getStatus()));  
     			}       
     	});	
        	
        	
     	
     		//     			map.addEventListener("load", function(){  
     			  // 在这里添加您的后续代码  
//     			})  
//     			window.setTimeout(function(){  
//     			  map.panTo(point);  
//     			  alert(map.getCenter().lng + ", " + map.getCenter().lat); 
//     			  
//     			}, 1000);  
     			     		
        	
            this.geo = new Ext.util.GeoLocation({
                autoUpdate: true,
                scope:this,
                listeners: {
                    locationupdate: function (geo) {
                        BVApp.utils.CurrentGeoPosition.latitude = geo.latitude;
                        BVApp.utils.CurrentGeoPosition.longitude = geo.longitude;
                        if(me.callbackCounter===0){
                            me.callbackCounter=1;
                            callback();
                        }
                    },
                    locationerror: function (   geo,
                                                bTimeout,
                                                bPermissionDenied,
                                                bLocationUnavailable,
                                                message) {
                        if(!BVApp.utils.CurrentGeoPosition.errorShowed){
                            BVApp.utils.AppUtils.alertMessage(BVApp.Main.getLangString("PositionAlertTitle"), BVApp.Main.getLangString("PositionAlert"));
                            BVApp.utils.CurrentGeoPosition.errorShowed = true;
                        }
                        if(me.callbackCounter===0){
                            me.callbackCounter=1;
                            callback();
                        }
                    }
                }
            });
        }
        this.geo.updateLocation();
    }
});
