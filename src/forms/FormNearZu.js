
FML.forms.FormNearZu = Ext.extend(Ext.form.FormPanel,{
	
    initComponent: function () {
        Ext.apply(this, {
        	
items : [
	   		{
	                xtype: 'fieldset',
					id:'FormNearZu',
	               	items: [
	               
   
           		FML.forms.sum_price_zu, 	//租金
           		
           		FML.forms.form_bedroom, 	//几居室
           		FML.forms.form_foreroom, 	//几厅
           		FML.forms.form_toilet, 		//几卫
           		FML.forms.facetocode,		//朝向
           		
           		FML.forms.build_area, 		//面积
           		//FML.forms.districtcode,		//什么小区
   				//FML.forms.house_type		//一手房 二手房
	               
	                ]
				}	
	           ]
        });
	
        
       
        
   
        FML.forms.FormNearZu.superclass.initComponent.call(this);
    }
    
});