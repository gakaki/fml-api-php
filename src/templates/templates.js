
FML.templates.BLANK_IMAGES = String.format(" onerror='this.src={0}' ", '"http://www.4000168000.com/images/noPic.png"');

//console.log(FML.templates.BLANK_IMAGES);

FML.templates.MapContent = new Ext.XTemplate(
'<div class="map_content clearfix">',
	'<div class="image left">',
		'<img src="{pic_url}" class="map_content_image" />',
	'<div>',
	'<div class="content right">',
		'<p>{title}</p>',
		'<p>共{count}套房子符合要求二手房</p>',
		'<p>均价{sum_price}元/平米</p>',
	'<div>',
"</div>"
);

//http://sinatra-book.gittr.com/

//这里如果remarks为空 name就选择addresss  注意房东的电话
FML.templates.HouseListTemplate = new Ext.XTemplate(
        '<div class="list-item-row">',
         		'<tpl if="showMore"><div class="show_more_row">载入更多.....</div></tpl>',
         		'<tpl if="shi_id != 0">',
		      		'<div class="left">',
				      		'<tpl if="thumb.length == 0">',
					            "<img "+FML.templates.BLANK_IMAGES+" src='"+FML.utils.Config.pic_base_url+"{kt}' width='160' height='150'   />",
					        '</tpl>',
					        '<tpl if="thumb.length &gt; 0">',
					            "<img src='"+FML.utils.Config.pic_base_url+"{kt}' width='160' height='150'   />",
					        '</tpl>',
		      		'</div>',
		      		'<div class="right">',
		      			'<div class="title">{houseDicName} {address}</div>',
		      			'<div class="spec">{remarks}</div>',
		      			'<div class="spec">{build_area}㎡  {build_floor}楼/{build_levels}层</div>',
		      			
						'<tpl if="atype === 0">',//买
				            '<div class="price"><span class="sum_price">{sum_price_gai}万  {sum_price_junjia}</span>万/㎡</div>',
				        '</tpl>',
				        
						'<tpl if="atype === 1">', //租用
							'<tpl if="rent_price &gt; 0">', 
								'<div class="price"><span class="sum_price">{rent_price_gai}</span> 元/月</div>',
							'</tpl>',
							'<tpl if="rent_price == false">', 
								'<div class="price"><span class="sum_price">面议</span></div>',
							'</tpl>',
						'</tpl>',
						
				        '<tpl if="atype === 2">', //买 和 租
				            '<div class="price"><span class="sum_price">{sum_price_gai}万  {sum_price_junjia}</span>万/㎡',
				        	'&nbsp;<span class="sum_price">{rent_price_gai}</span>元/月',
				            '</div>',
				        '</tpl>',
		      			
		      			'<div class="phone_no">',
			      			'<a href="tel:{tel1}"><img class="phone_call" src="/src/images/phone_call.png" /></a>',
		      			'</div>',
		      		'</div>',
		      	'</tpl>',
	      		'<div class="clear"></div>',
'</div>',
{
        compiled: true,

}

);



FML.templates.HouseDetailTemplate = new Ext.XTemplate(
'<div class="house_detail_template_not_sell">',

		  "<img  "+FML.templates.BLANK_IMAGES+" shi_id='{shi_id}' id='customSearchDetailImageId' hPic_id='{hPic_id}' havePic='{havePic}' src='"+FML.utils.Config.pic_base_url+"{kt}' alt='{kt}' />",

		'<tpl if="atype === 0">',//买
		 	'<div class="sum_price price red">{sum_price_gai}万  {sum_price_junjia}</span>万/㎡  {build_area}㎡</div>',
		'</tpl>',
		'<tpl if="atype === 1">', //租用
			'<tpl if="rent_price &gt; 0">', 
				'<div class="sum_price price red"> {rent_price_gai}元/月 </div>',
			'</tpl>',
			'<tpl if="rent_price == false">', 
				'<div class="sum_price price red"> 面议 </div>',
			'</tpl>',
		'</tpl>',
		'<tpl if="atype === 2">', //买 和 租
			'<div class="sum_price price red">{sum_price_gai}万  {sum_price_junjia}</span>万/㎡ {build_area}㎡</div>',
		'</div>',
		'</tpl>',

		  "<div class='info'>",
		  	"<ul class='info_title'>",
		  	
		  		"<li>编号</li>",
		  		"<li  class='phone_call_detail'>电话1</li>",
		  		"<li  class='phone_call_detail'>电话2</li>",
		  		"<li  class='phone_call_detail'>电话3</li>",	 
		  		
		  		"<li>分店</li>",
		  		
		  		"<li>地址</li>",
		  		"<li>小区</li>",
		  		"<li>户型</li>",
		  		"<li>面积</li>",
		
		  		"<li>朝向</li>",
		  		"<li>楼层</li>",
		  		
		  		"<li>装修</li>",
		  		
		  		"<li>权属</li>",
		  		
		  	"</ul>",
			"<ul class='info_content'>",
			
				//编号
				'<tpl if="shi_id.length == 0">',
		             '<li>不详</li>',
		        '</tpl>',
		        '<tpl if="shi_id.length &gt; 0">',
		            "<li>{shi_id}</li>",
		        '</tpl>',
		        
				//电话1
				'<tpl if="tel1.length == 0">',
		            '<li>不详</li>',
		        '</tpl>',
		        '<tpl if="tel1.length &gt; 0">',
		            "<li class='phone_call_detail'><a class='phone_call_detail_style1' href='tel:{tel1}'>&nbsp;</a></li>",
		        '</tpl>',

				//电话2
				'<tpl if="tel2.length == 0">',
		            '<li>不详</li>',
		        '</tpl>',
		        '<tpl if="tel2.length &gt; 0">',
		            "<li  class='phone_call_detail'><a  class='phone_call_detail phone_call_detail_style2' href='tel:{tel2}'>&nbsp;</a></li>",
		        '</tpl>',
		        
		        //电话3
				'<tpl if="tel3.length == 0">',
		            '<li>不详</li>',
		        '</tpl>',
		        '<tpl if="tel3.length &gt; 0">',
		            "<li  class='phone_call_detail'><a  class='phone_call_detail phone_call_detail_style3' href='tel:{tel3}'>&nbsp;</a></li>", 
		        '</tpl>',
		        
		        //分店
				'<tpl if="su_name.length == 0">',
		            '<li>不详</li>',
		        '</tpl>',
		        '<tpl if="su_name.length &gt; 0">',
		            "<li>{su_name}</li>",
		        '</tpl>',
					
		        //地址
				'<tpl if="address.length == 0">',
		            '<li>不详</li>',
		        '</tpl>',
		        '<tpl if="address.length &gt; 0">',
		            "<li>{address}</li>",
		        '</tpl>',
		        
		        //小区
				'<tpl if="houseDicName.length == 0">',
		            '<li>不详</li>',
		        '</tpl>',
		        '<tpl if="houseDicName.length &gt; 0">',
		            "<li>{houseDicName}</li>",
		        '</tpl>',
		        
		        
				//户型
				"<li>{form_bedroom}室{form_foreroom}厅{form_toilet}卫{form_terrace}阳台</li>",
				
				//面积
				"<li>{build_area}㎡</li>",
				
				//朝向
				'<tpl if="facetoName.length == 0">',
		            '<li>不详</li>',
		        '</tpl>',
		        '<tpl if="facetoName.length &gt; 0">',
		            "<li>{facetoName}</li>",
		        '</tpl>',
	
		        //楼层
				"<li>{build_floor}楼/{build_levels}层</li>",
				
				//装修
				'<tpl if="facetoName.length == 0">',
		            "<li>不详</li>",
		        '</tpl>',
		        '<tpl if="facetoName.length &gt; 0">',
		            "<li>{fitmentName}</li>",
		        '</tpl>',
				
				
				//权属
				'<tpl if="propertyname.length == 0">',
		            "<li>不详</li>",
		        '</tpl>',
		        '<tpl if="propertyname.length &gt; 0">',
		            "<li>{propertyname}</li>",
		        '</tpl>',
		        
		        //百度地图 查询周边的 幼儿园 医院 地铁 公交 大型超市
		    	
		        
				
			"</ul>",
		  "</div>",
		"</div>",
{
        compiled: true,

}
);




// carcausol的圖片模板
FML.templates.HouseDetailImageTemplate = new Ext.XTemplate(
	"<img "+FML.templates.BLANK_IMAGES+" src='"+FML.utils.Config.pic_base_url+"{kt}' width='300' height='400'   />"
);
