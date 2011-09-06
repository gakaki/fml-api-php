
var debug = 1;
function mlog () {
    if (debug)
    	console.log(arguments);
}


String.format = function() {
    if( arguments.length == 0 )
        return null;
    var str = arguments[0]; 
    for(var i=1;i<arguments.length;i++) {
        var re = new RegExp('\\{' + (i-1) + '\\}','gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

Ext.override(Ext.LoadMask,{
	msg :"载入中"
});
Ext.override(Ext.DataView,{
	loadingText :"载入中"
});

Ext.regApplication({
    name: 'FML',
   
    icon: 'resources/images/icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'resources/images/splashscreen.png',
	statusBarStyle: 'black',
    glossOnIcon: true,
    
    launch: function() {
        this.launched = true;
        this.mainLaunch();
    },
    mainLaunch: function() {
        // if (!device || !this.launched) {return;}
        // var formPanel = new FML.views.CustomSearchWrapPanel();
         
         //console.log(Ext.BLANK_IMAGE_URL );
         
         if (debug === 1) {
         	
         	//detect redis mongodb sqlserver connection
         	 var makeJSONPRequest = function() {
	            //Ext.getBody().mask('Loading...', 'x-mask-loading', false);
	            Ext.util.JSONP.request({
	                url: FML.utils.Config.get_base_url()+'/test/test_connection',
	                callbackKey: 'callback',
	                params: {                    
	                  
	                },
	                callback: function(result) {
	                	console.log(result);
	                	if (result['status']!==1) {
	                		Ext.Msg.alert('服务器出错了', result['message'], Ext.emptyFn);
	                	}
	                	
	                	/*
	                    var weather = result.data.weather;
	                    if (weather) {
	                        var html = tpl.applyTemplate(weather);
	                        Ext.getCmp('content').update(html);                        
	                    }
	                    else {
	                        alert('There was an error retrieving the weather.');
	                    }
	                    Ext.getCmp('status').setTitle('Palo Alto, CA Weather');*/
	                    //Ext.getBody().unmask();
	                }
	            });
	        };
        
         	makeJSONPRequest();
         	
         };
         
         var mainPanel =  new FML.views.MainPanel();
    }
});


Ext.namespace('FML.forms','FML.share','FML.templates','FML.utils','FML.stores','FML.single');
