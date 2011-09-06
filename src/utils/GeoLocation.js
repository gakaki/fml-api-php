
FML.utils.GeoLocation = Ext.extend(Ext.util.Observable, {
	
	constructor: function(config) {
		
	    config = Ext.apply({
	        autoUpdate : false
	    }, config);
	    
		this.addEvents({
            "updateLocation" : true,
            "locationerror" : true,
            "locationupdate" : true,
            "locationUpdateStart" : true,
            "locationUpdateEnd" : true,
        });
		this.geolocation = new BMap.Geolocation();
	    
	    FML.utils.GeoLocation.superclass.constructor.call(this, config);

	},
	updateLocation : function(callback, scope, positionOptions) {
		
		this.fireEvent('locationUpdateStart');
		
		var me = this;
		
		var failFunction = function(result,message){
            if(message){
                me.fireError(result,message);
            }
            else{
            	mlog('this is what',result,message);
                me.fireEvent('failFunction', result, message);
            }
            if(callback){
                callback.call(scope || me, null, me); //last parameter for legacy purposes
            }
        };

        if (!Ext.supports.GeoLocation) {
            setTimeout(function() {
                failFunction(null);
            }, 0);
            return;
        }
		
		try{
			
			
			me.geolocation.getCurrentPosition(function(r){
				
				me.fireEvent('locationUpdateEnd');
				
				baidu_geo = this;
				
				
			    if(this.getStatus() == BMAP_STATUS_SUCCESS){
			    	
			    	me.fireUpdate(r.point);
			        if(callback){
                        callback.call(scope || me, me, me); //last parameter for legacy purposes
                    }
			        mlog('您的位置：'+r.point.lng+','+r.point.lat);
			        
			    }else{
			    	
			    	message = me.getFailReason(this.getStatus());
			        mlog('failed:'+message,baidu_geo);
			        
			        failFunction(baidu_geo,message);
			    }        
			})
		}
		catch(e){
			setTimeout(function(){
                failFunction(e.message);
            }, 0);
		}
		
	},
	fireError: function(error,message){
		mlog('fireError',error,message);
        this.fireEvent('locationerror', this,error,
            message == undefined ? null : message);
    },
	
    fireUpdate: function(position){
    	
    	this.position = position;
    	this.point = position;
    	this.fireEvent('locationupdate', this,this.position,this.point);
    	/*
        this.timestamp = position.timestamp;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.accuracy = position.coords.accuracy;
        this.altitude = position.coords.altitude;
        this.altitudeAccuracy = position.coords.altitudeAccuracy;
        
        //google doesn't provide these two
        this.heading = typeof position.coords.heading == 'undefined' ? null : position.coords.heading;
        this.speed = typeof position.coords.speed == 'undefined' ? null : position.coords.speed;
        
        */
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
	            reVal = "服务不可用 可能您的 移动设备或浏览器尚未开启gps功能 ";
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

});


