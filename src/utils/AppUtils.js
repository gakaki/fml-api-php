
FML.utils.AppUtils = {
	default_image_for_src:function(){
		
		
		
		
	},
	getLocation:function(){
		
		
		
		
	},
	object_filter_blank:function(object){
		for(var k in object){
			if (!object[k]) {
				delete object[k];
			};
		}
		return object;
	},
	
    loadFile: function(fileName,callback){
        mlog("loadFile");
        callback(BVApp.models.Data[fileName]);
    },
    sendEMail: function(email,subject,body){
        mlog("enter sendEMail");
        if(Ext.is.PhoneGap()){
            if(this.isIPhone()){
             window.plugins.emailComposer.showEmailComposer(subject,body,email);
            }else if(this.isAndroid()){                
                var extras = {};
                extras[WebIntent.EXTRA_SUBJECT] = subject;
                extras[WebIntent.EXTRA_TEXT] = body;
                extras[WebIntent.EXTRA_EMAIL] = email;
                window.plugins.webintent.startActivity({
                    action: WebIntent.ACTION_SEND,
                    type: 'text/plain',
                    extras: extras
                }, function() {
                    mlog("sendEMail:success");
                }, function() {
                    mlog("sendEMail:error");
                });
            }
        }else{
            this.alertMessage(BVApp.Main.getLangString("OptionsHint"),BVApp.Main.getLangString("EMailOnlyInNativeApp"));
        }

    },
    dialTelNumber: function(number){
        mlog("enter dialTelNumber");
        if(this.isAndroid()){
            window.plugins.webintent.startActivity({
                action: WebIntent.ACTION_DIAL,
                url: "tel:" + number
            }, function() {
                mlog("dialNumber:success");
            }, function() {
                mlog("dialNumber:error");
            });
        }
    },
    isIPhone: function(){
        return device.name.indexOf("iPhone") !== -1 || device.platform.indexOf("iPhone") !== -1;
    },
    isAndroid: function(){
        if(this.isPhoneGap()){
            return device.name.indexOf("Android") !== -1 || device.platform.indexOf("Android") !== -1;
        }else{
            return false;
        }
    },
    isPhoneGap: function(){
        return (typeof device !== "undefined");
    },
    alertMessage: function(title,message){
        if(this.isPhoneGap()){
            navigator.notification.alert(message,Ext.emptyFn,title);
            //Ext.Msg.alert(title,message, Ext.emptyFn);
        }else{
            Ext.Msg.alert(title,message, Ext.emptyFn);
        }

    },
    /*,
    loadGoogleMaps: function(){
        var e = document.createElement("script");
        e.src = "http://maps.google.com/maps/api/js?sensor=true";
        e.type="text/javascript";
        document.getElementsByTagName("head")[0].appendChild(e);
    }*/
};