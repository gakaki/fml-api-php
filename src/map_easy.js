

// 存储设备获取的location 坐标
var baidu_location  = new BMap.Geolocation();

function getFailReason(code){
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
}

function baidu_location_success(geolocationResult){
     			
		if(this.getStatus() != BMAP_STATUS_SUCCESS){
			alert('failed:'+getFailReason(this.getStatus()));  
		}
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
				
		
				map.addOverlay(myCompOverlay);

		} 
		
     		
};
mlog("baidu 地图geolocation 数据结果为 ",31.234309729773,121.48479060028);
baidu_location.getCurrentPosition(baidu_location_success,{
     		enableHighAccuracy:true,
     		timeout :20,
     		maximumAge :0
});	  		    
