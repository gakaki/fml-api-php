
FML.views.HouseListPanel = Ext.extend(Ext.List,{

    initComponent: function () {
		
    	//FML.stores.HouseNearStore.load();
    	
        Ext.apply(this, {
            autoDestroy: true,
            fullscreen: true,
			layout: "auto", 
		    itemTpl: FML.templates.HouseListTemplate,
	      	emptyText: '<div style="margin:5px;">暂无房源信息.</div>',	 
	      	store: FML.stores.HouseNearStore,
	      	id:"HouseListPanel",
	      	listeners: {
	            itemtap : function(thisView, idx) {

	            	//mlog(thisView, idx);

	                var rec = thisView.store.getAt(idx);
					//mlog(rec);
					
					
					var house_detail_panel = houseNearPanel.getHouseDetailPanel();
					mlog(house_detail_panel);
					house_detail_panel.update(rec.data);
					
					houseNearPanel.setActiveItem(house_detail_panel);
					//	house_list_panel.setActiveItem(house_detail_panel);
	                //card swith view the record

	                //showActionSheet(rec);

	//                Ext.defer(function() {
	//                    thisView.deselect(idx);
	//                }, 100);

	            }
	        }
	      	
        });

        FML.views.HouseListPanel.superclass.initComponent.call(this);
    }
});


FML.views.HouseListWrapPanel = Ext.extend(Ext.Panel,{
	
	houseListPanel  : null,
	
	change_state:function() {
		
		//mai fang
    	if (FML.utils.Config.is_zu()) {
    		
    		FML.utils.Config.set_mai();
    		Ext.getCmp('zu_or_mai_btn').setText("租");
			Ext.getCmp('house_near_toolbar').setTitle("附近购房信息");
    	
    	}else{
    	//zufang
    		FML.utils.Config.set_zu();
    		
    		Ext.getCmp('zu_or_mai_btn').setText("买");
    		Ext.getCmp('house_near_toolbar').setTitle("附近租房信息");
    		
    	}
    	
		Ext.Anim.run(Ext.getCmp('HouseListWrapPanel'), 'flip', {
		    out: false,
		    autoClear: true
		});
		
		
	},
    initComponent: function() {
		
    	var me = this;
    	this.houseListPanel = new FML.views.HouseListPanel();
    	
    	var toolBarItems = [];
    	
    	var zu_or_mai_info = {};
    	if (FML.utils.Config.is_mai()) {
    		zu_or_mai_info.right_btn_txt = "买";
    		zu_or_mai_info.toolbar_title = "附近租房信息";
        }else{
    		zu_or_mai_info.right_btn_txt = "租";
    		zu_or_mai_info.toolbar_title = "附近购房信息";	
        }
    	
        toolBarItems.push({
                text: "定位",
                ui: 'action',
                handler: undefined,
                scope: this
        });
    
        toolBarItems.push({
                xtype: "spacer"
        });
       
        toolBarItems.push({
            iconMask: true,
            iconCls: 'action',
            id:'zu_or_mai_btn',
            handler: function(){
            	
            	
            	if (FML.utils.Config.is_zu()) {
            		
            		FML.utils.Config.set_mai();
            		this.setText("租");
            		me.toolbar.setTitle ("附近购房信息");
            	}else{
            		FML.utils.Config.set_zu();
            		this.setText("买");
            		me.toolbar.setTitle  ("附近租房信息");
            	}
            	
				Ext.Anim.run(me, 'flip', {
				    out: false,
				    autoClear: true
				});
				
            },
            text: "租"
        });

        this.toolbar = new Ext.Toolbar({
            dock: 'top',
            items: toolBarItems,
            title: '附近购房信息',
            id:'house_near_toolbar'
        });
        
        Ext.apply(this, {
            autoDestroy: true,
            fullscreen: true,
			layout: "card", 
			dockedItems: [this.toolbar],
			items:this.houseListPanel,
			id:'HouseListWrapPanel'
		});
			
    	FML.views.HouseListWrapPanel.superclass.initComponent.call(this);
    	
    	//this.initGeoLocation();
    },
    findNearHouses:function(){
    	
    	
    },
    initGeoLocation:function(){
    	me = this;
    	this.geo = new FML.utils.GeoLocation({
		    autoUpdate: false,
		    listeners: {
		    	locationUpdateStart:function(){
					me.waitMask = new Ext.LoadMask(Ext.getBody(), {msg:"查询附近房源中 请等待..."});
					me.waitMask.show();
		    	},
		    	locationUpdateEnd:function(){
		    		me.waitMask.hide(); 
		    	},
		        locationupdate: function (geo,position,point) {
		            mlog('geo positon is : ' + geo,position);

		        	me.findNearHouses(point,{});
		        },
		        locationerror: function (object,  error, 
		                                    message) {
		           mlog( 'locationerror',  error, message);
		         
					Ext.Msg.show({
					   title: '百度地图',
					   msg: message,
					   showAnimation:true,
					   width: 300,
					   fn:  Ext.emptyFn,
					   icon: Ext.MessageBox.INFO
					});
					
					setTimeout(function() {
						Ext.Msg.hide()
					}, 2000);
	        	},
		    }
		});
    },
});


