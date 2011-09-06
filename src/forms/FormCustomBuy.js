
FML.forms.FormCustomBuy = Ext.extend(Ext.form.FormPanel,{
	
    initComponent: function () {
		
        Ext.apply(this, {
           items : [
   			{
                xtype: 'fieldset',

               	items: [
               
                   								//城市暂时省略
	           		FML.forms.sum_price_zu, 	//租金
	           		FML.forms.form_bedroom, 	//几居室
	           		FML.forms.form_foreroom, 	//几厅
	           		FML.forms.form_toilet, 		//几卫
	           		FML.forms.facetocode,		//朝向
	           		
	           		FML.forms.build_area, 		//面积
	   				FML.forms.house_type		//一手房 二手房
               
                ]
			}	
           ]
        });
	
   
        FML.forms.FormCustomBuy.superclass.initComponent.call(this);
    }
    
});