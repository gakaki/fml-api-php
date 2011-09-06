
Ext.override(Ext.Picker, {
doneButton: "确定",
cancelButton:"取消"
});

Ext.override(Ext.form.FormPanel, {
    getValuesFilter: function() {
        var result = this.getValues();
        for(var k in result){
			if (!result[k]) {
				delete result[k];
			};
		}
		return result;
    }
});
FML.views.CustomSearchFormPanel = Ext.extend(Ext.Panel,{
		
    initComponent: function () {
		var me = this;	
    	this.segmentedButton = new Ext.SegmentedButton({
			
		    allowMultiple: true,
			ui:'light',
		    items: [
		        {
		            text: '我的附近'
		        },
		        {
		            text   : '自定义',
					pressed:true
		        }
		    ],
		    listeners: {
		        toggle: function(container, button, pressed){
		            mlog("User toggled the '" + button.text + "' button: " + (pressed ? 'on' : 'off'));
					
		        }
		    }
		});
	
		this.formkeyword 		= new FML.forms.FormKeyWord();
		this.formNearBuy 		= new FML.forms.FormNearBuy();
		this.formNearZu 		= new FML.forms.FormNearZu();
		
    	this.items = 
        [  
			{
                 	xtype: 'panel',
                 	id:"FormKeyWord",
             
                 	height:150,
					items:[
						this.formkeyword
					]
			},	
			{
	                xtype: 'panel',
	                autoDestroy: true,
					layout:'card',
		            cardSwitchAnimation: {
		            	type:'slide'
		            },
		            id:"form_common",
		        	height:400,
					items:[
						this.formNearBuy,this.formNearZu
					]
			}
        ];
        
        Ext.apply(this, {
            id:'CustomSearchFormPanel',
    		scroll:'vertical',
    		layout:{
    			type:'vbox',
    			align:'stretch'
    		},
	
 			dockedItems: [
            {
                dock: 'top',
                xtype: 'toolbar',
                id:'CustomSearchFormPanelToolBar',
                title:"定制搜索",
                items: [ 
		        {
		            iconMask: true,
		            iconCls: 'action',
		            id:'CustomSearchFormPanelToolBar_zu_or_mai_btn',
		            handler: function(){
						
		            	FML.utils.Config.toggle_zu_or_mai();
		            	
		            	me.set_toolbar();
		            	
						Ext.Anim.run(me, 'flip', {
						    out: false,
						    autoClear: true
						});
		            },
		            text: "租"
		        },
                {xtype: 'spacer'},
				{xtype: 'spacer'},
                {
                    text: '搜索',
                    ui: 'action',
                    handler: function(e) {
						
                    	var formKeyWord 		= me.formkeyword;
                    	var formNearBuy 		= me.formNearBuy;
                    	var formNearZu 			= me.formNearZu; 

						var formKeyWordValue  	= formKeyWord.getValuesFilter();
						var formNearBuyValue  	= formNearBuy.getValuesFilter();
						var formNearZuValue  	= formNearZu.getValuesFilter();
						
			
						var other_values  = {
						
							is_search_near	:FML.utils.Config.is_search_near,
							lat				:FML.utils.Config.lat,
							long			:FML.utils.Config.long,
							zu_or_mai		:FML.utils.Config.zu_or_mai
							
						};
						
						 var form_total_values  = Ext.apply(formKeyWordValue, formNearBuyValue,other_values);
						
						 var store = FML.stores.HouseSearchStore;
						 store.getProxy().extraParams = form_total_values;
						
						 store.load();
						 
						 var customSearchListWrapPanel 	= Ext.getCmp('CustomSearchListWrapPanel');
						 var customSearchWrapPanel		= Ext.getCmp('CustomSearchWrapPanel');
						 
						 Ext.getCmp('CustomSearchListWrapPanelToolbar').setTitle(FML.utils.Config.get_notice_txt()+"房资源搜索结果");
						 
						 customSearchWrapPanel.setActiveItem(customSearchListWrapPanel);
						 
                    }
                }	
                ]
            }
    		]
        });
		
        me.set_handler_for_is_search_near_btn();
        
        me.on({
   
        	'afterrender':function(){	
        		
	        	FML.utils.Config.on({
		        	"change_zu_or_mai" : function(notice_txt,zu_or_mai){
		        		console.log(notice_txt,zu_or_mai,FML.utils.Config.zu_or_mai);
		        		me.set_toolbar();
		        	}
	        	});
	        	
        		FML.utils.Config.trigger_zu_or_mai();
        		
        	}
        });
        
        
  
        
        FML.views.CustomSearchFormPanel.superclass.initComponent.call(this);
        
    
        
    },
    set_handler_for_is_search_near_btn:function(){
    	Ext.getCmp('is_search_near').on({
    		'change' : function(slider,thumb,newValue,oldValue){
    			
    			FML.utils.Config.is_search_near =  newValue;
    			mlog('FML.utils.Config.is_search_near',FML.utils.Config.is_search_near);
    		} 
    	});	
    },
    set_toolbar:function(){
    	
    	
    	var toolbar  		= Ext.getCmp('CustomSearchFormPanelToolBar');
    	var zu_or_mai_btn	= Ext.getCmp('CustomSearchFormPanelToolBar_zu_or_mai_btn');
    	
    	if (FML.utils.Config.is_zu()) {
        		toolbar.setTitle("租房房源搜索");
				zu_or_mai_btn.setText("买");

		}else{
				toolbar.setTitle("买房房源搜索");
				zu_or_mai_btn.setText("租");
		};
    }
 
});