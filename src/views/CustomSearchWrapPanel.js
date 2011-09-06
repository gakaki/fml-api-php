
FML.views.CustomSearchWrapPanel = Ext.extend(Ext.Panel,{

		

    initComponent: function () {
    	
        this.customSearchFormPanel 			= new FML.views.CustomSearchFormPanel();
		this.customSearchListWrapPanel 		= new FML.views.CustomSearchListWrapPanel();
		this.customSearchDetailPanel		= new FML.views.CustomSearchDetailPanel();
		this.customSearchDetailImages		= new FML.views.CustomSearchDetailImages();
		
        Ext.apply(this, {
            autoDestroy: true,
            id:'CustomSearchWrapPanel',
          	layout: "card",
          	title:'定制搜索',
            fullscreen: true,
            iconCls:'search',
            items: [this.customSearchFormPanel,this.customSearchListWrapPanel,this.customSearchDetailPanel,this.customSearchDetailImages],
            cardSwitchAnimation: {
            	type:'slide'
            },
            scroll:'vertical',
        });
        
        
        FML.views.CustomSearchWrapPanel.superclass.initComponent.call(this);
        
        
    },
    
    getBaiduMapPanel:function(){
    	return this.baiduMapPanel;
    },
    
    constructor: function (a) {
    
        FML.views.CustomSearchWrapPanel.superclass.constructor.call(this, a)
    }
   
});