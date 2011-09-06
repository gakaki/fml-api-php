
FML.forms.FormKeyWord = Ext.extend(Ext.form.FormPanel,{
	
    initComponent: function () {
		
        Ext.apply(this, {
		        id:"FormKeyWord",
        		items : [
	   			{
	                xtype: 'fieldset',
					style: 'text-align:center',
	               	items: [
		              	{xtype: 'searchfield',
			            name: 'search',
						placeHolder:'输入 小区,房源名称,备注 等 搜索',
						id:'keyword'
		               },
		               {
		               	xtype: 'togglefield',
			            name: 'is_search_near',
						disabled:true,
						id:'is_search_near',
						label:"搜索'我的附近'",
						labelWidth:150,
		               }
		               
	                ]
				}	
	           ]
        	}
        )
        
        
        FML.forms.FormKeyWord.superclass.initComponent.call(this);
    }
    
});