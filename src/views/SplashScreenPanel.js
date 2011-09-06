FML.views.SplashScreenPanel = Ext.extend(Ext.Panel,{

    initComponent: function () {
		
    	
    	Ext.apply(this, {
            autoDestroy: true,
            fullscreen: true,
			layout: "card", 
		    contentEl: 'splash_screen',
		    cover:true,
		    houseNearPanel 		: Ext.getCmp('HouseNearPanel'),
			mainPanel	   		: Ext.getCmp('MainPanel'),
			mainTabPanel   		: Ext.getCmp('MainTabPanel'),
			customSearchPanel 	: Ext.getCmp('CustomSearchWrapPanel')
        });

        FML.views.SplashScreenPanel.superclass.initComponent.call(this);
    	var me = this;		
        
        this.on({
        	"afterrender":function(){
        		
        		//先设置为租状态
				FML.utils.Config.set_zu();
        		
        		
        		var zu_or_mai_check_box = Ext.select('.zu_or_mai .checkbox');
        		var zufang_button 		= Ext.select('.zufang_button');
        		var maifang_button 		= Ext.select('.dingzhi_search_button');
        		
        		//设置 给 租和买 添加checkbox效果
		        function mark_zu_or_mai_checkbox(e) {
		        	
					zu_or_mai_check_box.removeCls('zu_or_mai_check_mark');
					
					Ext.get(this).addCls('zu_or_mai_check_mark');
					
					if (this.id==="mai_check") {
						FML.utils.Config.set_mai();
					}else{
						FML.utils.Config.set_zu();
					}
					
				}
		
				// checkbox 做一下标记
				var zu_check = Ext.get('zu_check').on({
					'tap':mark_zu_or_mai_checkbox,
				}).addCls('zu_or_mai_check_mark');

				var mai_check =Ext.get('mai_check').on({
					'tap':mark_zu_or_mai_checkbox
				});
				
				
				// 附近房源搜索按钮
				var zufang_button = Ext.select('.zufang_button').on(
				{
					'tapstart':function(e) {
						zufang_button.addCls('zufang_button_clicked');
					},	
					'touchend':function(e) {
						zufang_button.removeCls('zufang_button_clicked');
					},
					'click':function(e) {
						
						var houseNearPanel 		= Ext.getCmp('HouseNearPanel');
						var mainPanel	   		= Ext.getCmp('MainPanel');
						var mainTabPanel   		= Ext.getCmp('MainTabPanel');
						
						mainPanel.setActiveItem(mainTabPanel);
						mainTabPanel.setActiveItem(houseNearPanel,{type:"fade"});
						
					}
				})
		
				//定制搜索按钮
				var dingzhi_search_button = Ext.select('.dingzhi_search_button');
				dingzhi_search_button.on({
						'tapstart':function(e) {
							dingzhi_search_button.addCls('dingzhi_search_button_clicked');
						},	'touchend':function(e) {
							dingzhi_search_button.removeCls('dingzhi_search_button_clicked');
						},
						'click':function(e) {
							
							var mainPanel	   		= Ext.getCmp('MainPanel');
							var mainTabPanel   		= Ext.getCmp('MainTabPanel');
							var customSearchPanel 	= Ext.getCmp('CustomSearchWrapPanel');
							
							mainPanel.setActiveItem(mainTabPanel);
							mainTabPanel.setActiveItem(customSearchPanel,{type:"fade"});
							
						}
				});
        	}
        });
        
    }
});