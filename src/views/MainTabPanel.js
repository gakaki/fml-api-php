
FML.views.MainTabPanel = Ext.extend(Ext.TabPanel,{    
    tabBar: {
        dock: 'bottom',
        layout: {
            pack: 'center'
        }
    },
	id:'MainTabPanel',
 	fullscreen: true,
    ui: 'light',
    cardSwitchAnimation: {
        type: 'slide',
        cover: true
    },
	layout: "card", 
    scroll:false,

    initComponent: function(){
    	
		this.houseNearPanel 			= new FML.views.HouseNearPanel();
		//this.baiduMapWrapPanel 			= new FML.views.BaiduMapWrapPanel();
		this.customSearchFormPanel 		= new FML.views.CustomSearchWrapPanel();	
		this.optionPanel 				= new FML.views.OptionPanel();
	
      //  this.items = [this.houseNearPanel,this.baiduMapWrapPanel,this.customSearchFormPanel,this.optionPanel];
		
		this.items = [this.houseNearPanel,this.customSearchFormPanel];
		
        this.on("cardswitch", function(cmp , newCard, oldCard, index, animated ){
        	
            if(index==1){ /*
                if(
                	
                	this.favoritesPanel.getFavoriteList().getStore().getCount()===0){
                    					FML.utils.AppUtils.alertMessage(FML.Main.getLangString("HelpTitle"),BVApp.Main.getLangString("HelpEmptyFavList"));
                }*/
            }
        });
        this.on("show", function(){
        	
        	//Ext.getCmp('HouseListWrapPanel').change_state();
        	
        });
        FML.views.MainTabPanel.superclass.initComponent.call(this);
    },
    
    
    getHomePanel: function(){
        return this.homePanel;
    },
    getFavoritesPanel: function(){
        return this.favoritesPanel;
    }


});