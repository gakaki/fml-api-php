

var for_dight = function(dight,how){
	var res = Math.round (dight*Math.pow(10,how))/Math.pow(10,how); 
	return res;
}

FML.views.CustomSearchDetailPanel = Ext.extend(Ext.Panel,{

    initComponent: function () {
		
    	this.record_data  = {};
    	var me = this;
        Ext.apply(this, {
        
            fullscreen: true,
			cardSwitchAnimation :{
				type: 'fade',
        		direction: 'right'
       
			},
			id:'CustomSearchDetailPanel',
			scroll:'vertical',
		    dockedItems: [
		     {
		            dock : 'top',
		            xtype: 'toolbar',
		            title: '详细信息',
		            id:'customSearchDetailPanelToolBar',
					items: [
					        {
					            text: '列表',
					            ui: 'back',
					            handler: function () {
					            	 
									 var customSearchWrapPanel		= Ext.getCmp('CustomSearchWrapPanel');
									 var customSearchListWrapPanel 	= Ext.getCmp('CustomSearchListWrapPanel');
									 customSearchWrapPanel.setActiveItem(customSearchListWrapPanel,{
									 	       
											type: 'slide',
							        		direction: 'left'
		
									 	
									 });
					            	
					            }
					        }
					]
		        }
		    ],
		 	tpl:FML.templates.HouseDetailTemplate,
		 	listeners:{
		 		afterrender:function(){
		 			
	 			},
	 			show:function(){
	 				
	 			}
		 	}
        });
		
 
        FML.views.CustomSearchDetailPanel.superclass.initComponent.call(this);
        
       
					
    },

    no_more_pic_alert:function(){
    	Ext.Msg.alert('', '没有更多的图片了', Ext.emptyFn);
    },
    to_detail_images :function(){
		
		var customSearchDetailImage =  Ext.get('customSearchDetailImageId');

		customSearchDetailImage.on({
	    	'tap':function(e){
	    		
	    		//非常非常重要
				Ext.get(this).removeAllListeners(); 
	    		
				
	    
	    		
	    		
	    		 var hPic_id =  this.getAttribute('hPic_id');
	   			 var havePic =  this.getAttribute('havePic');
	    		 var shi_id  =  this.getAttribute('shi_id');
	    		 
	    		 var record = FML.stores.HouseSearchStore.findRecord('shi_id', shi_id, 0, true, false, true);
	    		 
	    		console.log(e,this);
				console.log(record,shi_id,havePic);
				console.log(havePic && shi_id && record);
				
				
	   			 if (havePic && shi_id && record) {
	
						var customSearchWrapPanel   		= Ext.getCmp('CustomSearchWrapPanel');
						var customSearchDetailImages 		= Ext.getCmp('CustomSearchDetailImages');
						
						
						var data =  record.data;
						
						var pics = [
							data['kt'],
							data['cf'],
							data['ws'],
							data['wsj'],
							data['zw']
						];
						
						var items = [];
						for (var i=0; i < pics.length; i++) {
							if (!pics[i]) {continue;};
							
							items.push(			
								{
									html: FML.templates.HouseDetailImageTemplate.apply({kt:pics[i]}),
									cls : 'CustomSearchDetailImages',
									title:'adfadsfadfdasfadsfasfasdfdasf',
								}
							);
						};
						
						customSearchDetailImages.removeAll();
						customSearchDetailImages.add(items);
						customSearchDetailImages.doLayout(); 
						customSearchDetailImages.scrollToCard(0); // This will send the user back to the first card
						
						customSearchDetailImages.on({
							cardswitch :function ( container, newCard,oldCard, index, animated ) {
			    	  			console.log( container, newCard,oldCard, index, animated);
			    			}
						});
						
						
						customSearchWrapPanel.setActiveItem(customSearchDetailImages);
	
	   			 }else{
	   			 	me.no_more_pic_alert();
	   			 }
	    		 
	    	}
		});
    }
  
});



