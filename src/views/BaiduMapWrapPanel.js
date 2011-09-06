
FML.views.BaiduMapWrapPanel = Ext.extend(Ext.Panel,{

	baiduMapPanel 				:null,
	baiduMapListPanel 			:null,
	baiduMapDetailPanel 		:null,	
		

    initComponent: function () {
    	
        this.baiduMapPanel 		= new FML.views.BaiduMapPanel();

        Ext.apply(this, {
            autoDestroy: true,
          	layout: "card",
          	iconCls: 'info',
          	title:'地图',
            fullscreen: true,
            items: [this.baiduMapPanel],
            cardSwitchAnimation: {
            	type:'slide'
            }
        });
        FML.views.BaiduMapWrapPanel.superclass.initComponent.call(this);
    },
    
    getBaiduMapPanel:function(){
    	return this.baiduMapPanel;
    },
    
    constructor: function (a) {
    
        FML.views.BaiduMapWrapPanel.superclass.constructor.call(this, a)
    }
   
});