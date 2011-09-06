
//一手房 二手房
FML.forms.house_type = {

                label: '房屋类型',
                xtype: 'selectfield',
                name: 'buy_type',
                disabled:true,
                options: [
                {
                    text: '不限',
                    value: ''
                },
                {
                    text: '二手房',
                    value: '1'
                },
                {
                    text: '新房',
                    value: '2'
                },
                ]
};
			

//租金
FML.forms.sum_price_zu = {
                label: '租金',
                xtype: 'selectfield',
                name: 'sum_price',
                options: [
                {
                    text: '不限',
                    value: ''
                },
                {
                    text: '500 以下',
                    value: '0,500'
                },
                {
                    text: '500-1000',
                    value: '500,1000'
                },
                {
                    text: '1500-2000',
                    value: '1500,2000'
                },
                {
                    text: '2000-3000',
                    value: '2000,3000'
                },
                　 {
                    text: '3000-5000',
                    value: '3000,5000'
                },
                　 {
                    text: '5000-8000',
                    value: '5000,8000'
                },
                　 {
                    text: '8000以上',
                    value: '8000,99999999'
                }]
			 };



//房屋总价
FML.forms.sum_price_buy = {

                label: '房价',
                xtype: 'selectfield',
                name: 'sum_price',
                options: [
                {
                    text: '不限',
                    value: ''
                },
                {
                    text: '50万以下',
                    value: '0,50'
                },
                {
                    text: '50~80万',
                    value: '50,80'
                },
                {
                    text: '80~100万',
                    value: '80,100'
                },
                {
                    text: '100~120万',
                    value: '100,120'
                },
                　 {
                    text: '120~150万',
                    value: '120,150'
                },
                　 {
                    text: '150~200万',
                    value: '150,200'
                },
                {
                    text: '200~300万',
                    value: '200,300'
                },
                {
                    text: '300万以上',
                    value: '300,9999999'
                }]
};
			
//几居室
FML.forms.form_bedroom =	{

                label: '户型',

                xtype: 'selectfield',
                name: 'form_bedroom',
                options: [
                {
                    text: '不限',
                    value: ''
                },
                {
                    text: '一居室',
                    value: '1'
                },
                {
                    text: '两居室',
                    value: '2'
                },
                {
                    text: '三居室',
                    value: '3'
                },
                {
                    text: '四居室',
                    value: '4'
                },
                {
                    text: '五居室',
                    value: '5'
                },
                {
                    text: '六居室',
                    value: '6'
                }
                ]

};
//客厅数量
FML.forms.form_foreroom =	{

                label: '厅',
                xtype: 'selectfield',
                name: 'form_foreroom',
                options: [
                {
                    text: '不限',
                    value: ''
                },
                {
                    text: '一厅',
                    value: '1'
                },
                {
                    text: '两厅',
                    value: '2'
                },
                {
                    text: '三厅',
                    value: '3'
                },
                {
                    text: '四厅',
                    value: '4'
                },
                {
                    text: '五厅',
                    value: '5'
                },
                {
                    text: '六厅',
                    value: '6'
                }
                ]

};
//卫生间数量
FML.forms.form_toilet =	{
                label: '卫',
                xtype: 'selectfield',
                name: 'form_toilet',
                options: [
                {
                    text: '不限',
                    value: ''
                },
                {
                    text: '一卫',
                    value: '1'
                },
                {
                    text: '两卫',
                    value: '2'
                },
                {
                    text: '三卫',
                    value: '3'
                },
                {
                    text: '四卫',
                    value: '4'
                },
                {
                    text: '五卫',
                    value: '5'
                },
                {
                    text: '六卫',
                    value: '6'
                },
                {
                    text: '七卫',
                    value: '7'
                }
                ]
};

//朝向
FML.forms.facetocode =	{
                label: '朝向',
                xtype: 'selectfield',
                name: 'facetocode',
                options: [
                {
                    text: '不限',
                    value: ''
                },
                {
                    text: '南北',
                    value: '0001'
                },
                {
                    text: '南向',
                    value: '0002'
                },
                {
                    text: '东南',
                    value: '0003'
                },
                {
                    text: '西南',
                    value: '0004'
                },
                {
                    text: '东西',
                    value: '0005'
                },
               {
                    text: '北向',
                    value: '0006'
                },
                {
                    text: '东向',
                    value: '0007'
                },
                {
                    text: '西向',
                    value: '0008'
                },
                {
                    text: '东北',
                    value: '5'
                },
                {
                    text: '西北',
                    value: '5'
                }
                ]
};


//面积
FML.forms.build_area = {
                label: '面积',

                xtype: 'selectfield',
                name: 'build_area',
                options: [
                {
                    text: '全部面积',
                    value: ''
                },
                {
                    text: '50　平米以下',
                    value: '0,50'
                },
                {
                    text: '50~70　平米',
                    value: '50,70'
                },
                {
                    text: '70~90　平米',
                    value: '50,90'
                },
                {
                    text: '90~110　平米',
                    value: '90,110'
                },
                　　 {
                    text: '110~130　平米',
                    value: '110,130'
                },
                　　 {
                    text: '130~150　平米',
                    value: '130,150'
                },
                　　 {
                    text: '150~200　平米',
                    value: '150,200'
                },
                　　 {
                    text: '200~300　平米',
                    value: '200,300'
                },
                {
                    text: '300　平米以上',
                    value: '300,99999999'
                }
                ]
			 };
			 



//区县
FML.forms.districtcode = {
                label: '区县',
                xtype: 'selectfield',
                name: 'districtcode',
                options: [
                {
                    text: '不限',
                    value: ''
                },
                 {text: '闵行区',value: '01'}
				,{text: '徐汇区',value: '02'}
				,{text: '长宁区',value: '03'}
				,{text: '静安区',value: '04'}
				,{text: '卢湾区',value: '05'}
				,{text: '虹口区',value: '06'}
				,{text: '黄浦区',value: '07'}
				,{text: '浦东新区',value: '08'}
				,{text: '杨浦区',value: '09'}
				,{text: '闸北区',value: '10'}
				,{text: '南市区',value: '102'}
				,{text: '普陀区',value: '11'}
				,{text: '嘉定区',value: '12'}
				,{text: '宝山区',value: '13'}
				,{text: '青浦县',value: '14'}
				,{text: '奉贤县',value: '15'}
				,{text: '崇明县',value: '17'}
				,{text: '金山区',value: '18'}
				,{text: '松江区',value: '19'}
				,{text: '昆山花桥',value: '21'}
                ]
            };

