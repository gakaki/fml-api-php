
FML.views.CustomSearchListPanel = Ext.extend(Ext.List,{

    initComponent: function () {
	
        Ext.apply(this, {
            autoDestroy: true,
            fullscreen: true,
		    itemTpl: FML.templates.HouseListTemplate,
	      	emptyText: '<div style="margin:5px;">暂无房源信息.</div>',	 
	      	store: FML.stores.HouseSearchStore,
	      	id:"CustomSearchListPanel",
	      	layout:'fit',
	      	listeners: {
	            itemtap : function(thisView, idx) {

	                var rec = thisView.store.getAt(idx);
					var customSearchDetailPanel = Ext.getCmp('CustomSearchDetailPanel');
	
					customSearchDetailPanel.update(rec.data);
					
					var customSearchWrapPanel		= Ext.getCmp('CustomSearchWrapPanel');
			
					
					customSearchWrapPanel.setActiveItem(customSearchDetailPanel);
					            	
	            }
	        }
        });
        FML.views.CustomSearchListPanel.superclass.initComponent.call(this);
    }
});


FML.views.CustomSearchListWrapPanel = Ext.extend(Ext.Panel,{

    initComponent: function() {
		
    	var me = this;
    	
    	this.customSearchListPanel = new FML.views.CustomSearchListPanel();
    	
    	var toolBarItems = [];
    	
        toolBarItems.push({
                text: "后退",
                ui: 'action',
                handler: function(){
               
					var customSearchFormPanel 	= Ext.getCmp('CustomSearchFormPanel');
					var customSearchWrapPanel		= Ext.getCmp('CustomSearchWrapPanel');
					
					customSearchWrapPanel.setActiveItem(customSearchFormPanel);

						 
                },
                scope: this
        });
    
        toolBarItems.push({
                xtype: "spacer"
        });
      	/* 
        toolBarItems.push({
            iconMask: true,
            iconCls: 'action',
            id:'zu_or_mai_btn',
            handler: function(){
            
            },
            text: "租"
        });
		*/
		
        this.toolbar = new Ext.Toolbar({
            dock: 'top',
            items: toolBarItems,
            title: '',
            id:'CustomSearchListWrapPanelToolbar'
        });
        
        Ext.apply(this, {
        	cardSwitchAnimation :{
				type: 'pop',
        		direction: 'right'
			},
            autoDestroy: true,
            fullscreen: true,
            layout:'fit',
			dockedItems: [this.toolbar],
			items:this.customSearchListPanel,
			id:'CustomSearchListWrapPanel'
		});
			
    	FML.views.CustomSearchListWrapPanel.superclass.initComponent.call(this);
    }
});


