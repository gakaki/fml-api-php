
FML.views.MainPanel = Ext.extend(Ext.Panel,{

    initComponent: function () {
    	
        this.splashScreenPanel 		= new FML.views.SplashScreenPanel();
        this.mainTabPanel			= new FML.views.MainTabPanel();
    	
        Ext.apply(this, {
        	id:'MainPanel',
            autoDestroy: true,
          	layout: "card",
            fullscreen: true,
            items: [this.splashScreenPanel,this.mainTabPanel],
            cardSwitchAnimation: {
            	type:'slide'
            }
        });
        FML.views.MainPanel.superclass.initComponent.call(this);
        
     	
    }
   
});