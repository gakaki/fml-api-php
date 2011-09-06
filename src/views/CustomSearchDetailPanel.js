

var for_dight = function(dight,how){
	var res = Math.round (dight*Math.pow(10,how))/Math.pow(10,how); 
	return res;
}

FML.views.CustomSearchDetailPanel = Ext.extend(Ext.Panel,{

    initComponent: function () {
		
    	
    	this.record_data  = {};
    	var me = this;
        Ext.apply(this, {
            autoDestroy: true,
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
        
        this.addImageClick();
    },
    no_more_pic_alert:function(){
    	Ext.Msg.alert('', '没有更多的图片了', Ext.emptyFn);
    },
    addImageClick : function(){
    	
        var me = this;
		var customSearchDetailImage =  null;
        
        me.on({
        	'show' :function(){
        		
        		customSearchDetailImage =  Ext.get('customSearchDetailImageId');
        	
	        	customSearchDetailImage.on({
		        	'tap':function(e){
						
		        		 var hPic_id =  this.getAttribute('hPic_id');
		       			 var havePic =  this.getAttribute('havePic');
		        		 var shi_id  =  this.getAttribute('shi_id');
		        		 
		        		 var record = FML.stores.HouseSearchStore.findRecord('shi_id', shi_id, 0, true, false, true);
						
		       			 if (havePic && shi_id && record) {

								var customSearchWrapPanel   		= Ext.getCmp('CustomSearchWrapPanel');
								var customSearchDetailImages 		= Ext.getCmp('CustomSearchDetailImages');
								
								customSearchDetailImages.removeAll();
								
								var data =  record.data;
								
								var pics = [
									data['kt'],
									data['cf'],
									data['ws'],
									data['wsj'],
									data['zw'],
									data['kt']
								];
								var items = [];
								for (var i=0; i < pics.length; i++) {
									if (!pics[i]) {continue;};
									//console.log(FML.utils.Config.pic_base_url + pics[i]);
									//console.log(FML.templates.HouseDetailImageTemplate.apply({kt:pics[i]}));
									//console.log(i);
									items.push(			
										{
											html: FML.templates.HouseDetailImageTemplate.apply({kt:pics[i]}),
											cls : 'CustomSearchDetailImages'
										}
									);
								};
								
								//customSearchDetailImage.clearListeners();
								
								customSearchDetailImages.add(items);

								customSearchDetailImages.doLayout(); 
								customSearchDetailImages.scrollToCard(0); // This will send the user back to the first card

    							customSearchWrapPanel.setActiveItem(customSearchDetailImages);
    	
		       			 }else{
		       			 	me.no_more_pic_alert();
		       			 }
		        		 
		        	}
        		});
        	}
        });
    }
});



