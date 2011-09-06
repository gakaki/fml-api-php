
FML.views.OptionPanel = Ext.extend(Ext.Panel,{
   
    initComponent: function () {

        Ext.apply(this, {
           html:'option panel',
           title:'选项',
           iconCls:'settings'
        });

        FML.views.OptionPanel.superclass.initComponent.call(this);
    }
});