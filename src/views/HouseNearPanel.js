
FML.views.HouseNearPanel = Ext.extend(Ext.Panel,{

	houseDetailPanel 		:null,
	houseListWrapPanel 		:null,

    initComponent: function () {
    	
   
        this.houseDetailPanel 		= new FML.views.HouseDetailPanel();
        this.houseListWrapPanel		= new FML.views.HouseListWrapPanel();

       
        Ext.apply(this, {
        	id:'HouseNearPanel',
            autoDestroy: true,
          	layout: "card",
            fullscreen: true,
            iconCls: 'favorites',
            title:'列表',
            items: [this.houseListWrapPanel,this.houseDetailPanel],
            cardSwitchAnimation: {
            	type:'slide'
            },
			listeners: {
		        beforecardswitch:function(container,newCard ,oldCard,index ,animated) {
		           mlog('houselsit switch timer',container,newCard ,oldCard,index ,animated);
	        	},
		        cardswitch:function(container,newCard ,oldCard,index ,animated) {
		           mlog('houselsit switch timer',container,newCard ,oldCard,index ,animated);
	        	},
	        	active:function  () {
	        		mlog('active');
	        	}
    		}
        });
        FML.views.HouseNearPanel.superclass.initComponent.call(this);
    },
    
    getHouseDetailPanel:function(){
    	return this.houseDetailPanel;
    },
    getHouseListWrapPanel:function(){
    	return this.houseListWrapPanel;
    },
    constructor: function (a) {
 
        FML.views.HouseNearPanel.superclass.constructor.call(this, a)
    }
   
});