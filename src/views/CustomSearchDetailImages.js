FML.views.CustomSearchDetailImages = Ext.extend(Ext.Carousel,{
	
    initComponent: function () {
		
    	Ext.apply(this, {
            autoDestroy: true,
            fullscreen: true,
			id:"CustomSearchDetailImages",
			indicator : true,
			ui:'dark',
			layout:'card',
		    dockedItems: [
		     {
		            dock : 'top',
		            xtype: 'toolbar',
		            title: '房源图片',
		            
					items: [
					        {
					            text: '后退',
					            ui: 'back',
					            handler: function () {
					            	 
									 var customSearchWrapPanel		= Ext.getCmp('CustomSearchWrapPanel');
									 var customSearchDetailPanel 	= Ext.getCmp('CustomSearchDetailPanel');
									 
									 customSearchWrapPanel.setActiveItem(customSearchDetailPanel);
					            	
					            }
					        }
					]
		        }
		    ],
		    liseners: {
		    	cardswitch :function ( container, newCard,oldCard, index, animated ) {
		    	  	console.log( container, newCard,oldCard, index, animated);
		    	}
		    }
		
        });

        FML.views.CustomSearchDetailImages.superclass.initComponent.call(this);
    	
    }
});