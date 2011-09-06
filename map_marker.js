var my_location = {};
var map = new BMap.Map("map");  
var sprite_offset = 1;
baidu_location  = new BMap.Geolocation();

// 编写自定义函数，创建标注  
function addMarker(point, index){  
    
  // 创建图标对象  
  var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {  
    // 指定定位位置。  
    // 当标注显示在地图上时，其所指向的地理位置距离图标左上  
    // 角各偏移10像素和25像素。您可以看到在本例中该位置即是  
    // 图标中央下端的尖角位置。  
    anchor: new BMap.Size(10, 25),  
    // 设置图片偏移。  
    // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您  
    // 需要指定大图的偏移位置，此做法与css sprites技术类似。  
    imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移  
  });  
  
  // 创建标注对象并添加到地图  
  var marker = new BMap.Marker(point, {icon: myIcon});  
  map.addOverlay(marker);  
}  

     	
function baidu_location_success(geolocationResult){
	// alert(" current point is "+ geolocationResult.point.lat + ','+geolocationResult.point.lng + " and 精确度为 "+geolocationResult.accuracy);
	
	//console.log("当前坐标为 ",geolocationResult.point.lng," ", geolocationResult.point.lat);
	var point = new BMap.Point(geolocationResult.point.lng, geolocationResult.point.lat); 
	
	map.centerAndZoom(point, 18);  
	map.addEventListener("load", function(){  

	});
	map.addEventListener("click", function(e){  
	  //console.log("您点击了地图。",e.point.lng,e.point.lat);  
	  
	  
	  console.log( e.point.lng,e.point.lat);	 
	  
	  var point = new BMap.Point(e.point.lng,e.point.lat);  
	  addMarker(point, sprite_offset);  
	  sprite_offset++; 
	 
	}); 
	window.setTimeout(function(){  
	  map.panTo(point);  
	 // alert(map.getCenter().lng + ", " + map.getCenter().lat); 
	  
	}, 1000);  
	var marker = new BMap.Marker(point);        // 创建标注  
	map.addOverlay(marker);     
	         
 
	
};

baidu_location.getCurrentPosition(baidu_location_success,{
	enableHighAccuracy:true,
	timeout :20,
	maximumAge :0
});	  		    
