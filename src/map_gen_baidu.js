// 存储设备获取的location 坐标
var baidu_location  = new BMap.Geolocation();


// 自定义 marker 我自己的marker
function Custom_marker(data,callback){
	this._data 		= data;
	this._callback 	= callback;
}
Custom_marker.prototype = new BMap.Overlay();
Custom_marker.prototype.initialize = function(map){
	
	this._map = map;
	var div = this._div = document.createElement("div");
	div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
	
	
	return div;
}


     	   	// 复杂的自定义覆盖物
     	     function ComplexCustomOverlay(point, text, mouseoverText,fun_callback_click){
     	       this._point = point;
     	       this._text = text;
     	       this._overText = mouseoverText;
     	       this._fun_callback_click = fun_callback_click;
     	     }
     	     ComplexCustomOverlay.prototype = new BMap.Overlay();
     	     ComplexCustomOverlay.prototype.initialize = function(map){
     	       this._map = map;
     	       var div = this._div = document.createElement("div");
     	       div.style.position = "absolute";
     	       div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
     	       div.style.backgroundColor = "#EE5D5B";
     	       div.style.border = "1px solid #BC3B3A";
     	       div.style.color = "white";
     	       div.style.height = "18px";
     	       div.style.padding = "2px";
     	       div.style.lineHeight = "18px";
     	       div.style.whiteSpace = "nowrap";
     	       div.style.MozUserSelect = "none";
     	       div.style.fontSize = "12px"
     	       var span = this._span = document.createElement("span");
     	       div.appendChild(span);
     	       span.appendChild(document.createTextNode(this._overText));      
     	       var that = this;
     	       
     	       div.setAttribute("class","custom_marker");
     	       div.setAttribute("className","custom_marker");
     	 
     	 		
     	       var arrow = this._arrow = document.createElement("div");
     	       arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
     	       arrow.style.position = "absolute";
     	       arrow.style.width = "11px";
     	       arrow.style.height = "10px";
     	       arrow.style.top = "22px";
     	       arrow.style.left = "10px";
     	       arrow.style.overflow = "hidden";
     	       div.appendChild(arrow);
     	      
     	       div.onmouseover = function(){
     	    
     	         this.style.backgroundColor = "#6BADCA";
     	         this.style.borderColor = "#0000ff";
     	         this.getElementsByTagName("span")[0].innerHTML = that._overText;
     	         arrow.style.backgroundPosition = "0px -20px";
     	       }
     	 
     	       div.onmouseout = function(){
     	         this.style.backgroundColor = "#EE5D5B";
     	         this.style.borderColor = "#BC3B3A";
     	         this.getElementsByTagName("span")[0].innerHTML = that._overText;
     	         arrow.style.backgroundPosition = "0px 0px";
     	       }
     	 	   div.onclick  = function(){
     	 	   
     	 	   		mlog("这次你点击的是什么哪",that._overText);
     	 	   		
     	 	        that._fun_callback_click(that._point,that._overText);
     	 	   
     	 	   }
     	       map.getPanes().labelPane.appendChild(div);
     	       
     	       return div;
     	     }
     	     ComplexCustomOverlay.prototype.draw = function(){
     	       var map = this._map;
     	       var pixel = map.pointToOverlayPixel(this._point);
     	       this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
     	       this._div.style.top  = pixel.y - 30 + "px";
     	     }
     	          	     
     	     
     	  
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
     			       // alert('failed:'+getFailReason(this.getStatus()));  
     			}       
     			
     			//     			map.addEventListener("load", function(){  
     			  // 在这里添加您的后续代码  
//     			})  
//     			window.setTimeout(function(){  
//     			  map.panTo(point);  
//     			  alert(map.getCenter().lng + ", " + map.getCenter().lat); 
//     			  
//     			}, 1000);  
     			     		
     	};
     	mlog("baidu 地图geolocation 数据结果为 ",31.234309729773,121.48479060028);
     	baidu_location.getCurrentPosition(baidu_location_success);	
//     		enableHighAccuracy:true,
//     		timeout :20,
//     		maximumAge :0
//     	});	  		    
	    
//	    
//	    
//     
//    }
//});