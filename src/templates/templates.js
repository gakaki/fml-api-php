
FML.templates.BLANK_IMAGES = String.format(" onerror='this.src={0}' ", '"http://api.yukiqiqi.com/src/images/newlogo.gif"');

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
	      			'<div class="spec">{build_area}平米  {build_floor}/总{build_levels}层</div>',
	      			
					'<tpl if="atype === 0">',//买
			            '<div class="price"><span class="sum_price">{sum_price}</span>万元/平米</div>',
			        '</tpl>',
			        '<tpl if="atype === 1">', //租用
			            '<div class="price"><span class="sum_price">{rent_price}</span> 元/月</div>',
			        '</tpl>',
			        '<tpl if="atype === 2">', //买 和 租
			            '<div class="price"><span class="sum_price">{sum_price}</span>万元/平米',
			        	'&nbsp;<span class="sum_price">{rent_price}</span>元/月',
			            '</div>',
			        '</tpl>',
	      			
	      			
	      			'<div class="phone_no">',
	      			//'{su_name}',
	      			'<a href="tel:{tel1}">{tel1}</a>',
	      			'<a href="tel:{tel2}">{tel2}</a>',
	      			'<a href="tel:{tel3}">{tel3}</a>',
	      			'</div>',
	      		'</div>',
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
		 	'<div class="price">{sum_price} 万元/平米</div>"',
		'</tpl>',
		'<tpl if="atype === 1">', //租用
		   	'<div class="price">{rent_price}元/月 </div>"',
		'</tpl>',
		'<tpl if="atype === 2">', //买 和 租
			'<div class="price">{sum_price}万元/平米 &nbsp;{rent_price}</span>元/月 </div>"',
		'</div>',
		'</tpl>',

		  "<div class='info'>",
		  	"<ul class='info_title'>",
		  		"<li>电话</li>",
		  		"<li>联系人</li>",
		  		"<li>发布时间</li>",
		  		"<li>租赁方式</li>",
		  		"<li>户型</li>",
		  		"<li>面积</li>",
		  		"<li>小区名称</li>",
		  		"<li>房屋朝向</li>",
		  		"<li>楼层信息</li>",
		  	"</ul>",
			"<ul class='info_content'>",
				
				'<tpl if="tel1.length == 0">',
		            "<li><a href='tel:{tel1}'>{tel1}</a></li>",
		        '</tpl>',
		        '<tpl if="tel1.length &gt; 0">',
		            '<li>不详</li>',
		        '</tpl>',
		        
				'<tpl if="linkman.length == 0">',
		            "<li>{linkman}</li>",
		        '</tpl>',
		        '<tpl if="linkman.length &gt; 0">',
		            '<li>不详</li>',
		        '</tpl>',
			
				'<tpl if="update_date.length == 0">',
		            "<li>{update_date}</li>",
		        '</tpl>',
		        '<tpl if="update_date.length &gt; 0">',
		            '<li>不详</li>',
		        '</tpl>',
		        
				"<li>整租</li>",
				"<li>{form_bedroom}室{form_foreroom}厅{form_toilet}卫{form_terrace}阳台</li>",
				"<li>{build_area}平方米</li>",
				
				'<tpl if="houseDicName.length == 0">',
		            "<li>{houseDicName}</li>",
		        '</tpl>',
		        '<tpl if="houseDicName.length &gt; 0">',
		            '<li>不详</li>',
		        '</tpl>',


				'<tpl if="facetoName.length == 0">',
		            "<li>{facetoName}</li>",
		        '</tpl>',
		        '<tpl if="facetoName.length &gt; 0">',
		            '<li>不详</li>',
		        '</tpl>',
	
		        
				"<li>当前{build_floor}层/总{build_levels}层</li>",
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
