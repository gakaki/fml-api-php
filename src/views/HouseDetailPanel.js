FML.views.HouseDetailPanel = Ext.extend(Ext.Panel,{

    initComponent: function () {
		
        Ext.apply(this, {
            autoDestroy: true,
            fullscreen: true,
			layout: "card", 
			id:'HouseDetailPanel',
		    dockedItems: [
		     {
		            dock : 'top',
		            xtype: 'toolbar',
		            title: '详细信息',
					items: [
					        {
					            text: '列表',
					            ui: 'back',
					            handler: function () {
					            	
									houseNearPanel.setActiveItem(houseNearPanel.getHouseListWrapPanel());
					            }
					        }
					]
		        }
		    ],
		 	
			//tpl:Ext.XTemplate.from(Ext.get("house_detail_template_not_sell_template"))
	      	tpl:FML.templates.HouseDetailTemplate
        });

        FML.views.HouseDetailPanel.superclass.initComponent.call(this);
    }
});