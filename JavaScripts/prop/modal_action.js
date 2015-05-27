/**
 * @modalNo 8
 * @modal Add new Offer
 * @param button
 */
function modal8_action()
{
	var form=document.getElementById('modal8_form');
		
	var offer_name=form.elements[1];
	var end_date=form.elements[2];
	var offer_type=form.elements[3];
	var product_name=form.elements[4];
	var batch=form.elements[5];
	var all_batch=form.elements[6];
	var service=form.elements[7];
	var criteria_type=form.elements[8];
	var criteria_amount=form.elements[9];
	var criteria_quantity=form.elements[10];
	var result_type=form.elements[11];
	var discount_percent=form.elements[12];
	var discount_amount=form.elements[13];
	var quantity_percent=form.elements[14];
	var quantity_amount=form.elements[15];
	var free_product_name=form.elements[16];
	var free_quantity=form.elements[17];
	var free_service_name=form.elements[18];
	
	var product_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	set_my_value_list(product_data,product_name);
	set_my_value_list(product_data,free_product_name);
	var service_data="<services>" +
		"<name></name>" +
		"</services>";
	set_my_value_list(service_data,service);
	set_my_value_list(service_data,free_service_name);
	
	$(all_batch).off('click');
	$(all_batch).on('click',function(event)
	{
		if(all_batch.checked)
		{
			batch.value='all';
			$(batch).attr('readonly','readonly');
		}
		else
		{
			batch.value='';
			$(batch).removeAttr('readonly');
		}
	});
	
	$(offer_type).off('blur');
	$(offer_type).on('blur',function(event)
	{
		$(product_name).parent().hide();
		$(batch).parent().hide();
		$(all_batch).parent().hide();
		$(service).parent().hide();
		$(criteria_type).parent().hide();
		$(criteria_amount).parent().hide();
		$(criteria_quantity).parent().hide();
		
		if(offer_type.value=='product')
		{
			$(product_name).off('blur');
			$(product_name).on('blur',function(event)
			{
				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name exact='yes'>"+product_name.value+"</product_name>" +
						"</product_instances>";
				set_my_value_list(batch_data,batch);
			});
						
			$(product_name).parent().show();
			$(batch).parent().show();
			$(all_batch).parent().show();
			$(criteria_type).parent().show();
			$(product_name).focus();
		}
		else if(offer_type.value=='service')
		{			
			$(service).parent().show();
			$(criteria_type).parent().show();
			$(service).focus();
		}
		else if(offer_type.value=='bill')
		{
			criteria_type.value='min amount crossed';
			$(criteria_amount).parent().show();
			$(criteria_amount).focus();
		}
	});
	
	$(criteria_type).off('blur');
	$(criteria_type).on('blur',function(event)
	{
		$(criteria_amount).parent().hide();
		$(criteria_quantity).parent().hide();
		if(criteria_type.value=='min amount crossed')
		{
			$(criteria_amount).parent().show();
			$(criteria_amount).focus();
		}
		else if(criteria_type.value=='min quantity crossed')
		{
			$(criteria_quantity).parent().show();
			$(criteria_quantity).focus();
		}
	});
	
	$(result_type).off('blur');
	$(result_type).on('blur',function(event)
	{
		$(discount_percent).parent().hide();
		$(discount_amount).parent().hide();
		$(quantity_percent).parent().hide();
		$(quantity_amount).parent().hide();
		$(free_product_name).parent().hide();
		$(free_quantity).parent().hide();
		$(free_service_name).parent().hide();
		
		if(result_type.value=='discount')
		{
			$(discount_percent).parent().show();
			$(discount_amount).parent().show();
			$(discount_percent).focus();
		}
		else if(result_type.value=='quantity addition')
		{
			$(quantity_percent).parent().show();
			$(quantity_amount).parent().show();
			$(quantity_percent).focus();
		}
		else if(result_type.value=='product free')
		{
			$(free_product_name).parent().show();
			$(free_quantity).parent().show();
			$(free_product_name).focus();
		}
		else if(result_type.value=='service free')
		{
			$(free_service_name).parent().show();
			$(free_service_name).focus();
		}
	});
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form35'))
		{
			var offer_name_value=offer_name.value;
			var end_date_value=get_raw_time(end_date.value);
			var type_value=offer_type.value;
			var product_value=product_name.value;
			var batch_value=batch.value;
			var service_value=service.value;
			var criteria_type_value=criteria_type.value;
			var criteria_amount_value=criteria_amount.value;
			var criteria_quantity_value=criteria_quantity.value;
			var result_type_value=result_type.value;
			var discount_percent_value=discount_percent.value;
			var discount_amount_value=discount_amount.value;
			var quantity_percent_value=quantity_percent.value;
			var quantity_amount_value=quantity_amount.value;
			var free_product_name_value=free_product_name.value;
			var free_quantity_value=free_quantity.value;
			var free_service_name_value=free_service_name.value;
			var status_value='active';
			var data_id=get_new_key();
			var last_updated=get_my_time();
			
			var offer_detail_value="Get ";
			if(result_type_value=='discount')
			{
				if(discount_percent_value=="")
					offer_detail_value+="a discount of Rs: "+discount_amount_value;
				else
					offer_detail_value+="a discount of "+discount_percent_value+"%";
			}
			else if(result_type_value=='quantity addition')
			{
				if(quantity_percent_value=="")
					offer_detail_value+="additional "+quantity_amount_value+" free pieces";
				else
					offer_detail_value+="additional "+quantity_percent_value+"% free";
			}	
			else if(result_type_value=='free product')
			{
				offer_detail_value+=free_quantity_value+" pieces of "+free_product_name_value;
			}
			else if(result_type_value=='free service')
			{
				offer_detail_value+="free service "+free_service_name_value;
			}
			
			if(type_value=='bill')
			{
				offer_detail_value+=" on bill amount of more than Rs: "+criteria_amount_value;
			}
			else if(type_value=='product')
			{
				offer_detail_value+=" on purchase of ";
				if(criteria_type_value=="min amount crossed")
					offer_detail_value+="worth Rs: "+criteria_amount_value+" or more";
				else if(criteria_type_value=="min quantity crossed")
					offer_detail_value+=+criteria_quantity_value+" piece or more";
				offer_detail_value+=" of "+product_value;
			}	
			else if(type_value=='service')
			{
				offer_detail_value+=" on availing "+service_value+ " service ";
				if(criteria_type_value=="min amount crossed")
					offer_detail_value+="worth Rs: "+criteria_amount_value+" or more";
				else if(criteria_type_value=="min quantity crossed")
					offer_detail_value+=+criteria_quantity_value+" times or more";
			}
			
			var data_xml="<offers>" +
						"<id>"+data_id+"</id>" +
						"<offer_name unique='yes'>"+offer_name_value+"</offer_name>" +
						"<offer_type>"+type_value+"</offer_type>" +
						"<product_name>"+product_value+"</product_name>" +
						"<batch>"+batch_value+"</batch>" +
						"<service>"+service_value+"</service>" +
						"<criteria_type>"+criteria_type_value+"</criteria_type>" +
						"<criteria_amount>"+criteria_amount_value+"</criteria_amount>" +
						"<criteria_quantity>"+criteria_quantity_value+"</criteria_quantity>" +
						"<result_type>"+result_type_value+"</result_type>" +
						"<discount_percent>"+discount_percent_value+"</discount_percent>" +
						"<discount_amount>"+discount_amount_value+"</discount_amount>" +
						"<quantity_add_percent>"+quantity_percent_value+"</quantity_add_percent>" +
						"<quantity_add_amount>"+quantity_amount_value+"</quantity_add_amount>" +
						"<free_product_name>"+free_product_name_value+"</free_product_name>" +
						"<free_product_quantity>"+free_quantity_value+"</free_product_quantity>" +
						"<free_service_name>"+free_service_name_value+"</free_service_name>" +
						"<end_date>"+end_date_value+"</end_date>" +
						"<offer_detail>"+offer_detail_value+"</offer_detail>" +
						"<status>"+status_value+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</offers>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>offers</tablename>" +
						"<link_to>form35</link_to>" +
						"<title>Saved</title>" +
						"<notes>Offer "+offer_name_value+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
			}	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal8").dialog("close");
	});
	
	set_static_value_list('offers','criteria_type',criteria_type);
	set_static_value_list('offers','result_type',result_type);
	set_static_value_list('offers','offer_type',offer_type);
	$(end_date).datepicker();
	
	$(product_name).parent().hide();
	$(batch).parent().hide();
	$(all_batch).parent().hide();
	$(service).parent().hide();
	$(criteria_type).parent().hide();
	$(criteria_amount).parent().hide();
	$(criteria_quantity).parent().hide();
	$(discount_percent).parent().hide();
	$(discount_amount).parent().hide();
	$(quantity_percent).parent().hide();
	$(quantity_amount).parent().hide();
	$(free_product_name).parent().hide();
	$(free_quantity).parent().hide();
	$(free_service_name).parent().hide();
	
	$("#modal8").dialog("open");
	
}

/**
 * @modalNo 9
 * @modal Add document
 * @param button
 */
function modal9_action()
{
	var form=document.getElementById('modal9_form');
	
	var fid=form.elements[1];
	var fname=form.elements[2];
	var docInfo=document.getElementById('modal9_url');
	var fpicture=form.elements[3];
		
	var id_data="<service_requests>" +
		"<id></id>" +
		"</service_requests>";
	set_my_value_list(id_data,fid);
	
	fpicture.addEventListener('change',function(evt)
	{
		select_document(evt,function(dataURL)
		{
			docInfo.setAttribute('href',dataURL);
		});
	},false);
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var target_id=fid.value;
			var doc_name=fname.value;
			var data_id=get_my_time();
			var url=$(docInfo).attr('href');
			var last_updated=data_id;

			if(url!="")
			{
				var pic_xml="<documents>" +
							"<id>"+data_id+"</id>" +
							"<url>"+url+"</url>" +
							"<doc_type>service request</doc_type>" +
							"<doc_name>"+doc_name+"</doc_name>"+						
							"<target_id>"+target_id+"</target_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</documents>";
				if(is_online())
				{
					server_create_simple(pic_xml);
				}
				else
				{
					local_create_simple(pic_xml);
				}	
			}
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal9").dialog("close");
	});
	
	$("#modal9").dialog("open");
}


/**
 * @modalNo 10
 * @modal Add new asset
 * @param button
 */
function modal10_action(func)
{
	var form=document.getElementById('modal10_form');
	var fname=form.elements[1];
	var ftype=form.elements[2];
	var fdescription=form.elements[3];
	
	////adding attribute fields/////
	var attribute_label=document.getElementById('modal10_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>asset</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});
	
	set_static_value_list('assets','type',ftype);
		
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var name=fname.value;
		var type=ftype.value;
		var description=fdescription.value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<assets>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<type>"+type+"</type>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</assets>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>assets</tablename>" +
					"<link_to>form5</link_to>" +
					"<title>Added</title>" +
					"<notes>Asset "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row_func(data_xml,activity_xml,func);
		}
		else
		{
			local_create_row_func(data_xml,activity_xml,func);
		}

		var id=get_new_key();
		$("#modal10_attributes").find('input, select').each(function()
		{
			id++;
			var value=$(this).val();
			var attribute=$(this).attr('name');
			if(value!="")
			{
				var attribute_xml="<attributes>" +
						"<id>"+id+"</id>" +
						"<name>"+name+"</name>" +
						"<type>asset</type>" +
						"<attribute>"+attribute+"</attribute>" +
						"<value>"+value+"</value>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</attributes>";
				if(is_online())
				{
					server_create_simple(attribute_xml);
				}
				else
				{
					local_create_simple(attribute_xml);
				}
			}
		});
		
		$("#modal10").dialog("close");
	});
	
	$("#modal10").dialog("open");
}


/**
 * @modalNo 11
 * @modal Add new customer
 * @param button
 */
function modal11_action(func)
{
	var form=document.getElementById('modal11_form');
	
	var fname=form.elements[1];
	var fphone=form.elements[2];
	var femail=form.elements[3];
	var faddress=form.elements[4];
	var fpincode=form.elements[5];
	var fcity=form.elements[6];
	var fstate=form.elements[7];
	var fcountry=form.elements[8];
	var fnotes=form.elements[9];
	
	////adding attribute fields///////
	var attribute_label=document.getElementById('modal11_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>customer</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form30'))
		{
			var name=fname.value;
			var phone=fphone.value;
			var acc_name=name+" ("+phone+")";
			var email=femail.value;
			var address=faddress.value;
			var pincode=fpincode.value;
			var city=fcity.value;
			var state=fstate.value;
			var country=fcountry.value;
			var notes=fnotes.value;
			var data_id=get_new_key();
			var address_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<customers>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<notes>"+notes+"</notes>" +
						"<acc_name unique='yes'>"+acc_name+"</acc_name>" +
						"<status>active</status>" +
						"<address>"+address+"</address>" +
						"<pincode>"+pincode+"</pincode>" +
						"<city>"+city+"</city>" +
						"<state>"+state+"</state>" +
						"<country>"+country+"</country>" +
						"<address_status>pending analysis</address_status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</customers>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>customers</tablename>" +
						"<link_to>form30</link_to>" +
						"<title>Added</title>" +
						"<notes>New customer "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var account_xml="<accounts>" +
						"<id>"+data_id+"</id>" +
						"<description>"+notes+"</description>" +
						"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
						"<type>customer</type>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</accounts>";
			if(is_online())
			{
				server_create_row_func(data_xml,activity_xml,func);
				server_create_simple(account_xml);
			}
			else
			{
				local_create_row_func(data_xml,activity_xml,func);
				local_create_simple(account_xml);
			}	
			
			var business_title=get_session_var('title');
			var sms_message="Hi "+name+", thanks for being a valuable customer of "+business_title+". Please visit again.";
			//send_sms(phone,sms_message,'transaction');			
			
			var id=get_new_key();
			$("#modal11_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+acc_name+"</name>" +
							"<type>customer</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal11").dialog("close");
	});
	
	$("#modal11").dialog("open");
}


/**
 * @modalNo 12
 * @modal Add new account
 * @param button
 */
function modal12_action(func)
{
	var form=document.getElementById('modal12_form');
	
	var fname=form.elements[1];
	var fdescription=form.elements[2];
	var fdata_id=get_new_key();
	
	////adding attribute fields///////
	var attribute_label=document.getElementById('modal12_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>account</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var name=fname.value;
		var type='financial';
		var description=fdescription.value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<accounts>" +
					"<id>"+data_id+"</id>" +
					"<acc_name unique='yes'>"+name+"</acc_name>" +
					"<type>"+type+"</type>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</accounts>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>accounts</tablename>" +
					"<link_to>form71</link_to>" +
					"<title>Added</title>" +
					"<notes>New account "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row_func(data_xml,activity_xml,func);
		}
		else
		{
			local_create_row_func(data_xml,activity_xml,func);
		}	
		
		var id=get_new_key();
		$("#modal12_attributes").find('input, select').each(function()
		{
			id++;
			var value=$(this).val();
			var attribute=$(this).attr('name');
			if(value!="")
			{	
				var attribute_xml="<attributes>" +
						"<id>"+id+"</id>" +
						"<name>"+acc_name+"</name>" +
						"<type>account</type>" +
						"<attribute>"+attribute+"</attribute>" +
						"<value>"+value+"</value>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</attributes>";
				if(is_online())
				{
					server_create_simple(attribute_xml);
				}
				else
				{
					local_create_simple(attribute_xml);
				}
			}
		});

		$("#modal12").dialog("close");
	});
	
	$("#modal12").dialog("open");
}

/**
 * @modalNo 13
 * @modal Add new supplier
 * @param button
 */
function modal13_action(func)
{
	var form=document.getElementById('modal13_form');
	
	var fname=form.elements[1];
	var fphone=form.elements[2];
	var femail=form.elements[3];
	var faddress=form.elements[4];
	var fpincode=form.elements[5];
	var fcity=form.elements[6];
	var fstate=form.elements[7];
	var fcountry=form.elements[8];
	var fnotes=form.elements[9];
	
	////adding attribute fields///////
	var attribute_label=document.getElementById('modal13_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>supplier</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});
	
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form40'))
		{
			var name=fname.value;
			var phone=fphone.value;
			var acc_name=name+" ("+phone+")";
			var email=femail.value;
			var address=faddress.value;
			var pincode=fpincode.value;
			var city=fcity.value;
			var state=fstate.value;
			var country=fcountry.value;
			var notes=fnotes.value;
			var data_id=get_new_key();
			var address_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<suppliers>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<notes>"+notes+"</notes>" +
						"<acc_name unique='yes'>"+acc_name+"</acc_name>" +
						"<address>"+address+"</address>" +
						"<pincode>"+pincode+"</pincode>" +
						"<city>"+city+"</city>" +
						"<state>"+state+"</state>" +
						"<country>"+country+"</country>" +
						"<address_status>pending analysis</address_status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</suppliers>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>suppliers</tablename>" +
						"<link_to>form40</link_to>" +
						"<title>Added</title>" +
						"<notes>Supplier "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var account_xml="<accounts>" +
						"<id>"+data_id+"</id>" +
						"<description>"+notes+"</description>" +
						"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
						"<type>supplier</type>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</accounts>";
			if(is_online())
			{
				server_create_row_func(data_xml,activity_xml,func);
				server_create_simple(account_xml);
			}
			else
			{
				local_create_row_func(data_xml,activity_xml,func);
				local_create_simple(account_xml);
			}	
			
			var id=get_new_key();
			$("#modal13_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+acc_name+"</name>" +
							"<type>supplier</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal13").dialog("close");
	});
	
	$("#modal13").dialog("open");
}


/**
 * @modalNo 14
 * @modal Add new product
 * @param button
 */
function modal14_action(func)
{
	var form=document.getElementById('modal14_form');
	
	var fname=form.elements[1];
	var fmake=form.elements[2];
	var fdescription=form.elements[3];
	var fpictureinfo=form.elements[4];
	var fpicture=form.elements[5];
	var fbarcode=form.elements[7];
	var auto_generate=form.elements[8];
	
	fbarcode.value=get_my_time();
	auto_generate.checked=true;
	
	$(auto_generate).off('click');
	$(auto_generate).on('click',function(event)
	{
		if(auto_generate.checked)
		{
			fbarcode.value=get_my_time();
		}
		else
		{
			fbarcode.value="";
		}
	});
	
	var make_data="<product_master>" +
		"<make></make>" +
		"</product_master>";
	set_my_filter(make_data,fmake);
	
	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";			
		});
	},false);
	
	////adding attribute fields///////
	var attribute_label=document.getElementById('modal14_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>product</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=form.elements[1].value;
			var make=form.elements[2].value;
			var description=form.elements[3].value;
			var tax=form.elements[6].value;
			var data_id=get_new_key();
			var pic_id=get_new_key();
			var url=$(fpictureinfo).find('div').find('img').attr('src');
			var barcode=form.elements[7].value;
			var last_updated=get_my_time();
			var data_xml="<product_master>" +
						"<id>"+data_id+"</id>" +
						"<make>"+make+"</make>" +
						"<name>"+name+"</name>" +
						"<description>"+description+"</description>" +
						"<tax>"+tax+"</tax>" +
						"<bar_code unique='yes'>"+barcode+"</bar_code>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</product_master>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>product_master</tablename>" +
						"<link_to>form39</link_to>" +
						"<title>Added</title>" +
						"<notes>Product "+name+" to inventory</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row_func(data_xml,activity_xml,func);
			}
			else
			{
				local_create_row_func(data_xml,activity_xml,func);
			}	

			var id=get_new_key();
			$("#modal14_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+name+"</name>" +
							"<type>product</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});

			if(url!="")
			{
				var pic_xml="<documents>" +
							"<id>"+pic_id+"</id>" +
							"<url>"+url+"</url>" +
							"<doc_type>product_master</doc_type>" +
							"<target_id>"+data_id+"</target_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</documents>";
				if(is_online())
				{
					server_create_simple(pic_xml);
				}
				else
				{
					local_create_simple(pic_xml);
				}	
			}
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal14").dialog("close");
	});
	
	$("#modal14").dialog("open");
}


/**
 * @modalNo 15
 * @modal Add Feedback
 * @param button
 */
function modal15_action()
{
	var form=document.getElementById('modal15_form');
	
	var fprovider=form.elements[1];
	var fdetail=form.elements[2];
	var ftype=form.elements[3];
	var frating=form.elements[4];
	var fdate=form.elements[5];
	var fdata_id=get_new_key();
	
	var accounts_data="<accounts>" +
		"<acc_name></acc_name>" +
		"</accounts>";
	
	set_my_value_list(accounts_data,fprovider);
	set_static_value_list('feedback','type',ftype);
	set_static_value_list('feedback','rating',frating);
	$(fdate).datepicker();
	fdate.value=get_my_date();
		
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var provider=fprovider.value;
		var detail=fdetail.value;
		var type=ftype.value;
		var rating=frating.value;
		var date=get_raw_time(fdate.value);
		var data_id=fdata_id;
		var last_updated=get_my_time();
		var table='feedback';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<provider>"+provider+"</provider>" +
					"<type>"+type+"</type>" +
					"<detail>"+detail+"</detail>" +
					"<rating>"+rating+"</rating>" +
					"<date>"+date+"</date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>report42</link_to>" +
					"<title>Added</title>" +
					"<notes>Feedback from "+provider+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		
		$("#modal15").dialog("close");
	});
	
	$("#modal15").dialog("open");
}


/**
 * @modalNo 16
 * @modal Add new staff
 * @param button
 */
function modal16_action(func)
{
	var form=document.getElementById('modal16_form');
	var fusername=form.elements[2];
	
	$(fusername).on('blur',function(e)
	{
		var match=fusername.value.match(/[a-z0-9]*/i);
		if(match[0].length!=fusername.value.length)
		{
			fusername.value="";
		}
	});
	
	////adding attribute fields///////
	var attribute_label=document.getElementById('modal16_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>staff</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}	
		});
	});
	
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form8'))
		{
			var name=form.elements[1].value;
			var username=form.elements[2].value;
			var phone=form.elements[3].value;
			var acc_name=name+" ("+phone+")";
			var email=form.elements[4].value;
			var address=form.elements[5].value;
			var pincode=form.elements[6].value;
			var city=form.elements[7].value;
			var state=form.elements[8].value;
			var country=form.elements[9].value;
			var data_id=get_new_key();
			var address_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<staff>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<acc_name unique='yes'>"+acc_name+"</acc_name>" +
						"<address>"+address+"</address>" +
						"<pincode>"+pincode+"</pincode>" +
						"<city>"+city+"</city>" +
						"<state>"+state+"</state>" +
						"<country>"+country+"</country>" +
						"<address_status>pending analysis</address_status>" +
						"<status>active</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</staff>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>staff</tablename>" +
						"<link_to>form8</link_to>" +
						"<title>Added</title>" +
						"<notes>Staff "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var account_xml="<accounts>" +
						"<id>"+data_id+"</id>" +
						"<description>account for staff "+name+"</description>" +
						"<username unique='yes'>"+username+"</username>" +
						"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
						"<type>staff</type>" +
						"<status>active</status>"+						
						"<last_updated>"+last_updated+"</last_updated>" +
						"</accounts>";
			if(is_online())
			{
				server_create_row_func(data_xml,activity_xml,func);
				server_create_simple(account_xml);
			}
			else
			{
				local_create_row_func(data_xml,activity_xml,func);
				local_create_simple(account_xml);
			}	
			
			var id=get_new_key();
			$("#modal16_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{	
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+acc_name+"</name>" +
							"<type>staff</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal16").dialog("close");
	});
	
	$("#modal16").dialog("open");
}


/**
 * @modalNo 17
 * @modal Update staff details
 * @param button
 */
function modal17_action(button)
{
	var form=document.getElementById('modal17_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var faddress_detail=father_form.elements[3];
	var fdata_id=father_form.elements[5];
	var data_id=father_form.elements[5].value;
	
	var faddress=father_form.elements[8];
	var fpincode=father_form.elements[9];
	var fcity=father_form.elements[10];
	var fstate=father_form.elements[11];
	var fcountry=father_form.elements[12];
	var faddress_status=father_form.elements[13];
	
	form.elements[1].value=faddress.value;
	form.elements[2].value=fpincode.value;
	form.elements[3].value=fcity.value;
	form.elements[4].value=fstate.value;
	form.elements[5].value=fcountry.value;
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var address=form.elements[1].value;
		var pincode=form.elements[2].value;
		var city=form.elements[3].value;
		var state=form.elements[4].value;
		var country=form.elements[5].value;
		
		faddress_detail.value=address+", "+pincode+", "+city+", "+state+", "+country;
		faddress.value=address;
		fpincode.value=pincode;
		fcity.value=city;
		fstate.value=state;
		fcountry.value=country;
		faddress_status.value='pending analysis';

		var data_xml="<staff>" +
				"<id>"+data_id+"</id>" +
				"<address>"+address+"</address>" +
				"<pincode>"+pincode+"</pincode>" +
				"<city>"+city+"</city>" +
				"<state>"+state+"</state>" +
				"<country>"+country+"</country>" +
				"<address_status>pending analysis</address_status>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</staff>";

		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}				
		
		$("#modal17").dialog("close");
	});
	
	$("#modal17").dialog("open");
}

/**
 * @modalNo 18
 * @modal Add new task type
 * @param button
 */
function modal18_action(func)
{
	var form=document.getElementById('modal18_form');
	
	var fname=form.elements[1];
	var fdescription=form.elements[2];
	var fest_hours=form.elements[3];
	
	fname.value='';
	fdescription.value='';
	fest_hours.value='';
	
	////adding attribute fields///////
	var attribute_label=document.getElementById('modal18_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>task</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});
	
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var name=form.elements[1].value;
		var description=form.elements[2].value;
		var est_hours=form.elements[3].value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<task_type>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<est_hours>"+est_hours+"</est_hours>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_type>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_type</tablename>" +
					"<link_to>form79</link_to>" +
					"<title>Added</title>" +
					"<notes>Task type "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row_func(data_xml,activity_xml,func);
		}
		else
		{
			local_create_row_func(data_xml,activity_xml,func);
		}
		
		var id=get_new_key();
		$("#modal18_attributes").find('input, select').each(function()
		{
			id++;
			var value=$(this).val();
			var attribute=$(this).attr('name');
			if(value!="")
			{
				var attribute_xml="<attributes>" +
						"<id>"+id+"</id>" +
						"<name>"+name+"</name>" +
						"<type>task</type>" +
						"<attribute>"+attribute+"</attribute>" +
						"<value>"+value+"</value>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</attributes>";
				if(is_online())
				{
					server_create_simple(attribute_xml);
				}
				else
				{
					local_create_simple(attribute_xml);
				}
			}
		});

		$("#modal18").dialog("close");
		//$("#modal18").dialog("destroy");
	});
	
	$("#modal18").dialog("open");
}

/**
 * @modalNo 19
 * @modal Copy product
 * @param button
 */
function modal19_action(button)
{
	var form=document.getElementById('modal19_form');
	
	var fname=form.elements[1];
	var fmake=form.elements[2];
	var fdescription=form.elements[3];
	var fpictureinfo=form.elements[4];
	var fpicture=form.elements[5];
	var ftax=form.elements[6];
	
	var fbarcode=form.elements[7];
	var auto_generate=form.elements[8];
	
	$(auto_generate).off('click');
	$(auto_generate).on('click',function(event)
	{
		if(auto_generate.checked)
		{
			fbarcode.value=get_my_time();
		}
		else
		{
			fbarcode.value="";
		}
	});		

	/////---------initializing all the values-------///////////
	var form_id=$(button).attr('form');
	var copy_form=document.getElementById(form_id);
	var copy_name=copy_form.elements[0].value;
	
	var copy_master_data="<product_master>" +
			"<id></id>" +
			"<name exact='yes'>"+copy_name+"</name>" +
			"<description></description>" +
			"<make></make>" +
			"<tax></tax>" +
			"</product_master>";
	
	fetch_requested_data('form39',copy_master_data,function(results)
	{
		results.forEach(function(result)
		{
			fmake.value=result.make;
			ftax.value=result.tax;
			fdescription.value=result.description;
			
			var picture_column="<documents>" +
					"<id></id>" +
					"<url></url>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id exact='yes'>"+result.id+"</target_id>" +
					"</documents>";
			fetch_requested_data('form39',picture_column,function(pic_results)
			{
				var pic_results_url="";
				for (var j in pic_results)
				{
					pic_results_url=pic_results[j].url;
				}
				updated_url=pic_results_url.replace(/ /g,"+");
				fpictureinfo.innerHTML="<div class='figure'><img src='"+updated_url+"'/></div>";
			});
		});
	});
		
	////---------initialization complete------///////////////
	
	
	////-----setting editable dropdowns etc----------/////////////
	var make_data="<product_master>" +
		"<make></make>" +
		"</product_master>";
	set_my_filter(make_data,fmake);
	
	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";			
		});
	},false);
	
	///////-------------set editable finished-------/////////////

	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=form.elements[1].value;
			var make=form.elements[2].value;
			var description=form.elements[3].value;
			var tax=form.elements[6].value;
			var data_id=get_new_key();
			var pic_id=get_new_key();
			var url=$(fpictureinfo).find('div').find('img').attr('src');
			var barcode=form.elements[7].value;
			var last_updated=get_my_time();
			var data_xml="<product_master>" +
						"<id>"+data_id+"</id>" +
						"<make>"+make+"</make>" +
						"<name>"+name+"</name>" +
						"<description>"+description+"</description>" +
						"<tax>"+tax+"</tax>" +
						"<bar_code unique='yes'>"+barcode+"</bar_code>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</product_master>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>product_master</tablename>" +
						"<link_to>form39</link_to>" +
						"<title>Added</title>" +
						"<notes>Product "+name+" to inventory</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
			}	

			if(url!="")
			{
				var pic_xml="<documents>" +
							"<id>"+pic_id+"</id>" +
							"<url>"+url+"</url>" +
							"<doc_type>product_master</doc_type>" +
							"<target_id>"+data_id+"</target_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</documents>";
				if(is_online())
				{
					server_create_simple(pic_xml,pic_activity_xml);
				}
				else
				{
					local_create_simple(pic_xml,pic_activity_xml);
				}	
			}

			var copy_attributes_data="<attributes>" +
					"<name exact='yes'>"+copy_name+"</name>" +
					"<type>product</type>" +
					"<attribute></attribute>" +
					"<value></value>" +
					"</attributes>";
			fetch_requested_data('form39',copy_attributes_data,function(attributes)
			{
				attributes.forEach(function(attribute)
				{
					if(attribute!="")
					{
						var data_xml="<attributes>" +
								"<id>"+get_new_key()+"</id>" +
								"<name>"+name+"</name>" +
								"<type>product</type>" +
								"<attribute>"+attribute.attribute+"</attribute>" +
								"<value>"+attribute.value+"</value>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</attributes>";
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});
			
			var copy_requisite_data="<pre_requisites>" +
					"<name exact='yes'>"+copy_name+"</name>" +
					"<type>product</type>" +
					"<requisite_type></requisite_type>" +
					"<requisite_name></requisite_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			fetch_requested_data('',copy_requisite_data,function(requisites)
			{
				requisites.forEach(function(requisite)
				{
					if(requisite!="")
					{
						var data_xml="<pre_requisites>" +
								"<id>"+get_new_key()+"</id>" +
								"<name>"+name+"</name>" +
								"<type>product</type>" +
								"<requisite_type>"+requisite.requisite_type+"</requisite_type>" +
								"<requisite_name>"+requisite.requisite_name+"</requisite_name>" +
								"<quantity>"+requisite.quantity+"</quantity>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</pre_requisites>";
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});
			
			var copy_cross_data="<cross_sells>" +
					"<name exact='yes'>"+copy_name+"</name>" +
					"<type>product</type>" +
					"<cross_type></cross_type>" +
					"<cross_name></cross_name>" +
					"</cross_sells>";
			fetch_requested_data('',copy_cross_data,function(cross_sells)
			{
				cross_sells.forEach(function(cross_sell)
				{
					if(cross_sell!="")
					{
						var data_xml="<cross_sells>" +
							"<id>"+get_new_key()+"</id>" +
							"<name>"+name+"</name>" +
							"<type>product</type>" +
							"<cross_type>"+cross_sell.cross_type+"</cross_type>" +
							"<cross_name>"+cross_sell.cross_type+"</cross_name>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</cross_sells>";
				
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal19").dialog("close");
	});
	
	$("#modal19").dialog("open");
}

/**
 * @modalNo 20
 * @modal Add new service
 * @param button
 */
function modal20_action(func)
{
	var form=document.getElementById('modal20_form');
	
	var fname=form.elements[1];
	var fdescription=form.elements[2];
	
	////adding attribute fields///////
	var attribute_label=document.getElementById('modal20_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>service</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form57') || is_update_access('form57'))
		{
			var name=form.elements[1].value;					
			var description=form.elements[2].value;
			var tax=form.elements[3].value;
			var price=form.elements[4].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<services>" +
						"<id>"+data_id+"</id>" +
						"<name unique='yes'>"+name+"</name>" +
						"<price>"+price+"</price>" +
						"<description>"+description+"</description>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</services>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>services</tablename>" +
						"<link_to>form57</link_to>" +
						"<title>Added</title>" +
						"<notes>New service "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row_func(data_xml,activity_xml,func);
			}
			else
			{
				local_create_row_func(data_xml,activity_xml,func);
			}	
			
			var id=get_new_key();
			$("#modal20_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				if(value!="")
				{
					var attribute=$(this).attr('name');
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+name+"</name>" +
							"<type>service</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal20").dialog("close");
	});
	
	$("#modal20").dialog("open");
}


/**
 * @modalNo 21
 * @modal Copy service
 * @param button
 */
function modal21_action()
{
	var form=document.getElementById('modal21_form');
	
	var fname=form.elements[1];
	var fdescription=form.elements[2];
	
	//////////----initializing form----------////////////
	
	var form_id=$(button).attr('form');
	var copy_form=document.getElementById(form_id);
	var copy_name=copy_form.elements[0].value;
	
	var copy_master_data="<services>" +
			"<id></id>" +
			"<name exact='yes'>"+copy_name+"</name>" +
			"<description></description>" +
			"<price></price>" +
			"<taxable></taxable>" +
			"<tax></tax>" +
			"</services>";
	fetch_requested_data('form57',copy_master_data,function(results)
	{
		results.forEach(function(result)
		{
			form.elements[2].value=result.description;
			form.elements[3].value=result.tax;
			form.elements[4].value=result.price;
		});
	});
	
	////////------end of initialization-----------///////////
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form57'))
		{
			var name=form.elements[1].value;
			var description=form.elements[2].value;
			var tax=form.elements[3].value;
			var price=form.elements[4].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<services>" +
						"<id>"+data_id+"</id>" +
						"<name unique='yes'>"+name+"</name>" +
						"<price>"+price+"</price>" +
						"<description>"+description+"</description>" +
						"<taxable>"+taxable+"</taxable>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</services>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>services</tablename>" +
						"<link_to>form57</link_to>" +
						"<title>Added</title>" +
						"<notes>New service "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
			}	

			var copy_attributes_data="<attributes>" +
					"<name exact='yes'>"+copy_name+"</name>" +
					"<type>service</type>" +
					"<attribute></attribute>" +
					"<value></value>" +
					"</attributes>";
			fetch_requested_data('',copy_attributes_data,function(attributes)
			{
				attributes.forEach(function(attribute)
				{
					if(attribute!="")
					{
						var data_xml="<attributes>" +
								"<id>"+get_new_key()+"</id>" +
								"<name>"+name+"</name>" +
								"<type>service</type>" +
								"<attribute>"+attribute.attribute+"</attribute>" +
								"<value>"+attribute.value+"</value>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</attributes>";
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});

			var copy_requisite_data="<pre_requisites>" +
					"<name exact='yes'>"+copy_name+"</name>" +
					"<type>service</type>" +
					"<requisite_type></requisite_type>" +
					"<requisite_name></requisite_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			fetch_requested_data('',copy_requisite_data,function(requisites)
			{
				requisites.forEach(function(requisite)
				{
					if(requisite!="")
					{
						var data_xml="<pre_requisites>" +
								"<id>"+get_new_key()+"</id>" +
								"<name>"+name+"</name>" +
								"<type>service</type>" +
								"<requisite_type>"+requisite.requisite_type+"</requisite_type>" +
								"<requisite_name>"+requisite.requisite_name+"</requisite_name>" +
								"<quantity>"+requisite.quantity+"</quantity>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</pre_requisites>";
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});
			
			var copy_cross_data="<cross_sells>" +
					"<name exact='yes'>"+copy_name+"</name>" +
					"<type>service</type>" +
					"<cross_type></cross_type>" +
					"<cross_name></cross_name>" +
					"</cross_sells>";
			fetch_requested_data('',copy_cross_data,function(cross_sells)
			{
				cross_sells.forEach(function(cross_sell)
				{
					if(cross_sell!="")
					{
						var data_xml="<cross_sells>" +
							"<id>"+get_new_key()+"</id>" +
							"<name>"+name+"</name>" +
							"<type>service</type>" +
							"<cross_type>"+cross_sell.cross_type+"</cross_type>" +
							"<cross_name>"+cross_sell.cross_type+"</cross_name>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</cross_sells>";
				
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});			
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal21").dialog("close");
	});
	$("#modal21").dialog("open");
}

/**
 * @modalNo 22
 * @modal Add new batch
 */
function modal22_action(func)
{
	var form=document.getElementById('modal22_form');
	
	var fname=form.elements[1];
	var fbatch=form.elements[2];
	var fmanufacture=form.elements[3];
	var fexpiry=form.elements[4];
	var fmrp=form.elements[5];
	var fcost=form.elements[6];
	var fsale_price=form.elements[7];
	
	$(fexpiry).datepicker();
	$(fmanufacture).datepicker();
	
	var name_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_value_list(name_data,fname);
	
	$(fname).off('blur');
	$(fname).on('blur',function(event)
	{
		var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name exact='yes'>"+fname.value+"</product_name>" +
				"</product_instances>";
		get_single_column_data(function(batches)
		{
			$(fbatch).off('blur');
			$(fbatch).on('blur',function(event)
			{
				var found = $.inArray($(this).val(), batches) > -1;
				if(found)
				{
		            $(this).val('');
		        }
			});
		},batch_data);
	});		
	
	////adding sale price fields for all billing types///////
	var billing_type_data="<bill_types>" +
			"<name></name>" +
			"<status exact='yes'>active</status>" +
			"</bill_types>";
	get_single_column_data(function(bill_types)
	{
		var billing_label=document.getElementById('modal22_billings');
		billing_label.innerHTML="";
		bill_types.forEach(function(bill_type)
		{
			var bill_label=document.createElement('label');
			bill_label.innerHTML=bill_type+" sale price (Rs.) <input type='number' id='"+bill_type+"' step='any' required>";
			billing_label.appendChild(bill_label);
			var line_break=document.createElement('br');
			billing_label.appendChild(line_break);
		});
	},billing_type_data);
	////////////////////////////////////////////////
	
	////auto setting sale price fields/////////
	$(fsale_price).off('blur');
	$(fsale_price).on('blur',function(event)
	{
		var sale_price=fsale_price.value;
		$("#modal22_billings").find('input').each(function()
		{
			if($(this).val()=="")
			{
				$(this).val(sale_price);
			}
		});
	});		
	////////////////////
	
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form1'))
		{
			var name=fname.value;
			var batch=fbatch.value;
			var manu_date=get_raw_time(fmanufacture.value);
			var expiry=get_raw_time(fexpiry.value);
			var cost=fcost.value;
			var mrp=fmrp.value;
			var sale_price=fsale_price.value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<product_instances>" +
						"<id>"+data_id+"</id>" +
						"<product_name>"+name+"</product_name>" +
						"<batch>"+batch+"</batch>" +
						"<expiry>"+expiry+"</expiry>" +
						"<manufacture_date>"+manu_date+"</manufacture_date>" +
						"<mrp>"+mrp+"</mrp>" +
						"<cost_price>"+cost+"</cost_price>" +
						"<sale_price>"+sale_price+"</sale_price>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</product_instances>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>product_instances</tablename>" +
						"<link_to>form1</link_to>" +
						"<title>Added</title>" +
						"<notes>New batch "+batch+" for product "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row_func(data_xml,activity_xml,func);
			}
			else
			{
				local_create_row_func(data_xml,activity_xml,func);
			}
			
			var id=get_new_key();
			
			$("#modal22_billings").find('input').each(function()
			{
				id++;
				var price=$(this).val();
				var bill_type=$(this).attr('id');
				var sale_price_xml="<sale_prices>" +
						"<id>"+id+"</id>" +
						"<product_name>"+name+"</product_name>" +
						"<batch>"+batch+"</batch>" +
						"<sale_price>"+price+"</sale_price>" +
						"<pi_id>"+data_id+"</pi_id>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</sale_prices>";
				if(is_online())
				{
					server_create_simple(sale_price_xml);
				}
				else
				{
					local_create_simple(sale_price_xml);
				}
			});
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal22").dialog("close");
	});
	
	$("#modal22").dialog("open");
}


/**
 * @modal Data import
 * @param t_func function to generate import template
 * @param i_func function to import the generated data_array
 */
function modal23_action(t_func,i_func)
{
	var form=document.getElementById('modal23_form');
	
	var template_button=form.elements[1];
	var new_records=form.elements[2];
	var update_records=form.elements[3];
	var select_file=form.elements[4];
	var selected_file=form.elements[5];
	var import_button=form.elements[6];

	$(template_button).off("click");
	$(template_button).on("click",function(event)
	{
		t_func();
	});
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		show_progress();
		var file=select_file.files[0];
        var fileType = /csv/gi;

        selected_file.value = "Uploading!! Please don't refresh";
    	var reader = new FileReader();
        reader.onload = function(e)
        {
        	progress_value=5;
        	var content=reader.result;
        	var data_array=csv_string_to_obj_array(content);

        	progress_value=10;
           
           //console.log(data_array);
        	if(new_records.checked)
        	{
        		i_func(data_array,'create_new');
        	}
        	else if(update_records.checked)
        	{
        		i_func(data_array,'update_records');
        	}
           
        	progress_value=15;
        	
        	//console.log(data_array.length);
        	
        	var ajax_complete=setInterval(function()
        	{
        		//console.log(number_active_ajax);
        		if(number_active_ajax===0)
        		{
        			progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
        		}
        		else if(localdb_open_requests===0)
        		{
        			progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
        		}
        		
        		if(number_active_ajax===0 && localdb_open_requests===0)
        		{
        			hide_progress();
        			selected_file.value="Upload complete";
        			$(select_file).val('');
        			$("#modal23").dialog("close");
        			clearInterval(ajax_complete);
        		}
        	},1000);
        }
        reader.readAsText(file);    
    });
	
	$("#modal23").dialog("open");
}

/**
 * @modal Update customer address
 * @param button
 */
function modal24_action(button)
{
	var form=document.getElementById('modal24_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var faddress_detail=father_form.elements[3];
	var data_id=father_form.elements[4].value;
	var faddress=father_form.elements[7];
	var fpincode=father_form.elements[8];
	var fcity=father_form.elements[9];
	var fstate=father_form.elements[10];
	var fcountry=father_form.elements[11];
	var faddress_status=father_form.elements[12];
		
	form.elements[1].value=faddress.value;
	form.elements[2].value=fpincode.value;
	form.elements[3].value=fcity.value;
	form.elements[4].value=fstate.value;
	form.elements[5].value=fcountry.value;
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var address=form.elements[1].value;
		var pincode=form.elements[2].value;
		var city=form.elements[3].value;
		var state=form.elements[4].value;
		var country=form.elements[5].value;
		
		var address_detail=address+", "+pincode+", "+city+", "+state+", "+country;
		faddress_detail.value=address_detail;
		faddress.value=address;
		fpincode.value=pincode;
		fcity.value=city;
		fstate.value=state;
		fcountry.value=country;
		faddress_status.value="pending analysis";

		var data_xml="<customers>" +
				"<id>"+data_id+"</id>" +
				"<address>"+address+"</address>" +
				"<pincode>"+pincode+"</pincode>" +
				"<city>"+city+"</city>" +
				"<state>"+state+"</state>" +
				"<country>"+country+"</country>" +
				"<address_status>pending analysis</address_status>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</customers>";

		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
					
		$("#modal24").dialog("close");
	});
	
	$("#modal24").dialog("open");
}


/**
 * @modal Update supplier address
 * @param button
 */
function modal25_action(button)
{
	var form=document.getElementById('modal25_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var faddress_detail=father_form.elements[3];
	var data_id=father_form.elements[4].value;
	var faddress=father_form.elements[7];
	var fpincode=father_form.elements[8];
	var fcity=father_form.elements[9];
	var fstate=father_form.elements[10];
	var fcountry=father_form.elements[11];
	var faddress_status=father_form.elements[1];
	
	form.elements[1].value=faddress.value;
	form.elements[2].value=fpincode.value;
	form.elements[3].value=fcity.value;
	form.elements[4].value=fstate.value;
	form.elements[5].value=fcountry.value;
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var address=form.elements[1].value;
		var pincode=form.elements[2].value;
		var city=form.elements[3].value;
		var state=form.elements[4].value;
		var country=form.elements[5].value;
		
		var address_detail=address+", "+pincode+", "+city+", "+state+", "+country;
		faddress_detail.value=address_detail;
		faddress.value=address;
		fpincode.value=pincode;
		fcity.value=city;
		fstate.value=state;
		fcountry.value=country;
		faddress_status.value="pending analysis";
	
		var data_xml="<suppliers>" +
				"<id>"+data_id+"</id>" +
				"<address>"+address+"</address>" +
				"<pincode>"+pincode+"</pincode>" +
				"<city>"+city+"</city>" +
				"<state>"+state+"</state>" +
				"<country>"+country+"</country>" +
				"<address_status>pending analysis</address_status>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</suppliers>";

		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		
		$("#modal25").dialog("close");
	});
	
	$("#modal25").dialog("open");
}

/**
 * @modalNo 26
 * @modal Payment Details
 */
function modal26_action(payment_id,func)
{
	var form=document.getElementById('modal26_form');
	
	var fcustomer=form.elements[1];
	var ftotal=form.elements[2];
	var fpaid=form.elements[3];
	var fdue_date=form.elements[4];
	var fmode=form.elements[5];
	var fstatus=form.elements[6];
	
	$(fdue_date).datepicker();
	
	var customer_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	set_my_value_list(customer_data,fcustomer);
	set_static_value_list('payments','status',fstatus);
	set_static_value_list('payments','mode',fmode);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();

		if(fstatus.value=='closed' && (ftotal.value>(fpaid.value+1) || fpaid.value==""))
		{
			alert("Payment can't be closed as the full amount has not been paid.");
			fstatus.value='pending';
		}
		else 
		{
			var customer=fcustomer.value;
			var total=ftotal.value;
			var paid=fpaid.value;
			var due_date=get_raw_time(fdue_date.value);
			var mode=fmode.value;
			var status=fstatus.value;
			var last_updated=get_my_time();
			var data_xml="<payments>" +
						"<id>"+payment_id+"</id>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<type>received</type>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+paid+"</paid_amount>" +
						"<status>"+status+"</status>" +
						"<due_date>"+due_date+"</due_date>" +
						"<mode>"+mode+"</mode>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</payments>";
			var activity_xml="<activity>" +
						"<data_id>"+payment_id+"</data_id>" +
						"<tablename>payments</tablename>" +
						"<link_to>form11</link_to>" +
						"<title>Updated</title>" +
						"<notes>Payment of "+paid+" from "+customer+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			
			if(is_online())
			{
				server_update_row(data_xml,activity_xml);
			}
			else
			{
				local_update_row(data_xml,activity_xml);
			}
			if(func)
			{
				func(mode,paid);
			}
			
			$("#modal26").dialog("close");
		}
	});
	
	var payments_data="<payments>" +
			"<id>"+payment_id+"</id>" +
			"<acc_name></acc_name>" +
			"<type>received</type>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<status></status>" +
			"<due_date></due_date>" +
			"<mode></mode>" +
			"</payments>";
	fetch_requested_data('',payments_data,function(payments)
	{
		for(var k in payments)
		{
			fcustomer.value=payments[k].acc_name;
			ftotal.value=my_round(payments[k].total_amount,0);
			fpaid.value=my_round(payments[k].paid_amount,0);
			fdue_date.value=get_my_past_date(payments[k].due_date);
			fmode.value=payments[k].mode;
			fstatus.value=payments[k].status;
			break;
		}
		$("#modal26").dialog("open");
	});		
}


/**
 * @modalNo 27
 * @modal Order product
 * @param button
 */
function modal27_action(product_name)
{
	var form=document.getElementById('modal27_form');
	
	var fname=form.elements[1];
	var fmake=form.elements[2];
	var fprice=form.elements[3];
	var fquantity=form.elements[4];
	var fsupplier=form.elements[5];
	var data_id=get_new_key();
	
	fmake.value="";
	fprice.value="";
	fquantity.value="";
	fsupplier.value="";
	fname.value=product_name;
	
	var supplier_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	set_my_value_list(supplier_data,fsupplier);

	var make_data="<product_master>" +
		"<make></make>" +
		"<name exact='yes'>"+product_name+"</name>" +
		"</product_master>";
	set_my_value(make_data,fmake);
	
	var price_data="<product_instances>" +
		"<cost_price></cost_price>" +
		"<product_name exact='yes'>"+product_name+"</product_name>" +
		"</product_instances>";
	set_my_value(price_data,fprice);

	/// logic for last supplier
	var last_purchase_data="<purchase_order_items>" +
			"<id></id>" +
			"<quantity></quantity>" +
			"<order_id></order_id>" +
			"<product_name exact='yes'>"+product_name+"</product_name>" +
			"</purchase_order_items>";
	fetch_requested_data('',last_purchase_data,function(last_purchases)
	{
		var order_id="";
		for(var k in last_purchases)
		{
			order_id=last_purchases[k].order_id;
			
			var last_order_data="<purchase_orders>" +
					"<supplier></supplier>" +
					"<id exact='yes'>"+order_id+"</id>" +
					"<status></status>" +
					"</purchase_orders>";
			fetch_requested_data('',last_order_data,function(last_orders)
			{
				for(var j in last_orders)
				{
					if(last_orders[j].status=='draft')
					{
						fquantity.value=last_purchases[k].quantity;
						data_id=last_purchases[k].id;
					}
					fsupplier.value=last_orders[j].supplier;
					break;
				}
			});
			break;
		}
	});
	
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form43'))
		{
			var name=fname.value;
			var make=fmake.value;
			var price=fprice.value;
			var quantity=fquantity.value;
			var supplier=fsupplier.value;
			var last_updated=get_my_time();
		
			var purchase_order_data="<purchase_orders>" +
					"<id></id>" +
					"<supplier exact='yes'>"+supplier+"</supplier>" +
					"<status>draft</status>" +
					"</purchase_orders>";
			fetch_requested_data('',purchase_order_data,function(purchase_orders)
			{
				var order_id="";
				for(var i in purchase_orders)
				{
					order_id=purchase_orders[i].id;
					break;
				}
				if(purchase_orders.length===0)
				{
					order_id=get_new_key();
					var data_xml="<purchase_orders>" +
								"<id>"+order_id+"</id>" +
								"<order_date>"+get_my_time()+"</order_date>" +
								"<supplier>"+supplier+"</supplier>" +
								"<status>draft</status>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</purchase_orders>";
					var activity_xml="<activity>" +
								"<data_id>"+order_id+"</data_id>" +
								"<tablename>purchase_orders</tablename>" +
								"<link_to>form43</link_to>" +
								"<title>Created</title>" +
								"<notes>Purchase order for supplier "+supplier+" for purchase</notes>" +
								"<updated_by>"+get_name()+"</updated_by>" +
								"</activity>";
					if(is_online())
					{
						server_create_row(data_xml,activity_xml);
					}
					else
					{
						local_create_row(data_xml,activity_xml);
					}	
				}
				var data_xml="<purchase_order_items>" +
							"<id>"+data_id+"</id>" +
							"<product_name>"+name+"</product_name>" +
							"<make>"+make+"</make>" +
							"<price>"+price+"</price>" +
							"<quantity>"+quantity+"</quantity>" +
							"<order_id>"+order_id+"</order_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</purchase_order_items>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>purchase_order_items</tablename>" +
							"<link_to>form43</link_to>" +
							"<title>Ordered</title>" +
							"<notes>Product "+name+" for purchase</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_create_row(data_xml,activity_xml);
					server_update_row(data_xml,activity_xml);
				}
				else
				{
					local_create_row(data_xml,activity_xml);
					local_update_row(data_xml,activity_xml);
				}	
			});
			
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal27").dialog("close");
	});
	
	$("#modal27").dialog("open");
}

/**
 * @modalNo 28
 * @modal Payment Details
 */
function modal28_action(payment_id)
{
	var form=document.getElementById('modal28_form');
	
	var fsupplier=form.elements[1];
	var ftotal=form.elements[2];
	var fpaid=form.elements[3];
	var fdue_date=form.elements[4];
	var fmode=form.elements[5];
	var fstatus=form.elements[6];
	
	$(fdue_date).datepicker();
	
	set_static_value_list('payments','status',fstatus);
	set_static_value_list('payments','mode',fmode);
	

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();

		if(fstatus.value=='closed' && (ftotal.value>(fpaid.value+1) || fpaid.value==""))
		{
			alert("Payment can't be closed as the full amount has not been paid.");
			fstatus.value='pending';
		}
		else 
		{
				
			var supplier=fsupplier.value;
			var total=ftotal.value;
			var paid=fpaid.value;
			var due_date=get_raw_time(fdue_date.value);
			var mode=fmode.value;
			var status=fstatus.value;
			var last_updated=get_my_time();
			var data_xml="<payments>" +
						"<id>"+payment_id+"</id>" +
						"<acc_name>"+supplier+"</acc_name>" +
						"<type>paid</type>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+paid+"</paid_amount>" +
						"<status>"+status+"</status>" +
						"<due_date>"+due_date+"</due_date>" +
						"<mode>"+mode+"</mode>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</payments>";
			var activity_xml="<activity>" +
						"<data_id>"+payment_id+"</data_id>" +
						"<tablename>payments</tablename>" +
						"<link_to>form11</link_to>" +
						"<title>Updated</title>" +
						"<notes>Payment of "+paid+" to "+supplier+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			
			if(is_online())
			{
				server_update_row(data_xml,activity_xml);
			}
			else
			{
				local_update_row(data_xml,activity_xml);
			}	
		
			$("#modal28").dialog("close");
		}
	});
	
	var payments_data="<payments>" +
			"<id>"+payment_id+"</id>" +
			"<acc_name></acc_name>" +
			"<type>paid</type>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<status></status>" +
			"<due_date></due_date>" +
			"<mode></mode>" +
			"</payments>";
	fetch_requested_data('',payments_data,function(payments)
	{
		for(var k in payments)
		{
			fsupplier.value=payments[k].acc_name;
			ftotal.value=payments[k].total_amount;
			fpaid.value=payments[k].paid_amount;
			fdue_date.value=get_my_past_date(payments[k].due_date);
			fmode.value=payments[k].mode;
			fstatus.value=payments[k].status;
			break;
		}
		$("#modal28").dialog("open");
	});		
	
}

/**
 * @modal Update secondary payment details
 * @param button
 */
function modal29_action(button)
{
	var form=document.getElementById('modal29_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var fdetail=father_form.elements[5];
	var fmode=father_form.elements[7];
	var fdate=father_form.elements[8];
	var fdue_date=father_form.elements[9];
	var fbill_id=father_form.elements[10];
	var fnotes=father_form.elements[11];
		
	form.elements[1].value=fbill_id.value;
	var date=form.elements[2];
	date.value=get_my_past_date(fdate.value);
	var mode=form.elements[3];
	mode.value=fmode.value;
	var due_date=form.elements[4];
	due_date.value=get_my_past_date(fdue_date.value);
	form.elements[5].value=fnotes.value;
	
	$(date).datepicker();
	$(due_date).datepicker();
	set_static_value_list('payments','mode',mode);
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var detail_string="Bill Id: " +form.elements[1].value+
				"\nMode of payment: " +form.elements[3].value+
				"\nDue Date: "+form.elements[4].value+
				"\nDate closed: "+form.elements[2].value+
				"\nClosing Notes: "+form.elements[5].value;

		fdetail.value=detail_string;
		fmode.value=form.elements[3].value;
		fdue_date.value=get_raw_time(form.elements[4].value);
		fbill_id.value=form.elements[1].value;
		fnotes.value=form.elements[5].value;
	
		$("#modal29").dialog("close");
		$(father_form).submit();
	});
	
	$("#modal29").dialog("open");
}

/**
 * @modal Add Receipt
 * @modalNo 30
 */
function modal30_action()
{
	var form=document.getElementById("modal30_form");
	var account_filter=form.elements[2];
	var amount_filter=form.elements[3];
	var balance_filter=form.elements[4];
	var type_filter=form.elements[5];
	
	var accounts_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	set_my_value_list(accounts_data,account_filter);
	set_static_value_list('receipts','type',type_filter);
	
	$(account_filter).off('blur');
	$(account_filter).on('blur',function(e)
	{
		var payments_data="<payments>" +
				"<id></id>" +
				"<type></type>" +
				"<total_amount></total_amount>" +
				"<paid_amount></paid_amount>" +
				"<status exact='yes'>pending</status>" +
				"<acc_name exact='yes'>"+account_filter.value+"</acc_name>" +
				"</payments>";

		fetch_requested_data('',payments_data,function(payments)
		{
			var balance_amount=0;
			payments.forEach(function(payment)
			{
				if(payment.type=='received')
				{
					balance_amount+=parseFloat(payment.total_amount);
					balance_amount-=parseFloat(payment.paid_amount);
				}
				else if(payment.type=='paid')
				{
					balance_amount-=parseFloat(payment.total_amount);
					balance_amount+=parseFloat(payment.paid_amount);
				}
			});
			
			if(balance_amount==0)
			{
				balance_filter.value="Rs. 0";
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					$("#modal30").dialog("close");
				});
			}
			else if(balance_amount>0)
			{
				balance_filter.value="Receivable: Rs. "+balance_amount;
				type_filter.value='received';
			}
			else
			{
				balance_amount=(-balance_amount);
				balance_filter.value="Payable: Rs. "+balance_amount;
				type_filter.value='paid';
			}
			amount_filter.setAttribute('max',balance_amount);
		});
	});
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		///////////////////////////////////////
		event.preventDefault();
		var receipt_id=form.elements[1].value;
		var receipt_type=type_filter.value;
		var account_name=account_filter.value;
		var counter_payment=parseFloat(amount_filter.value);
		
		if(is_create_access('form124'))
		{
			var accounts_data="<payments>" +
					"<id></id>" +
					"<type exact='yes'>"+receipt_type+"</type>" +
					"<acc_name exact='yes'>"+account_name+"</acc_name>" +
					"<date></date>" +
					"<total_amount></total_amount>" +
					"<paid_amount></paid_amount>" +
					"<notes></notes>" +
					"<status>pending</status>" +
					"</payments>";
			
			fetch_requested_data('',accounts_data,function(accounts)
			{
				accounts.sort(function(a,b)
				{
					if(a.date>b.date)
					{	return 1;}
					else 
					{	return -1;}
				});
				
				var total_amount=0;
				for(var i=0;i<accounts.length;i++)
				{
					total_amount=parseFloat(accounts[i].total_amount)-parseFloat(accounts[i].paid_amount);
				}
				
				var new_id=get_new_key();
				var last_updated=get_my_time();
				accounts.forEach(function(account)
				{
					new_id++;
					if(total_amount==counter_payment)
					{
						var notes=account.notes+"\nClosed by receipt # "+receipt_id;
						var payment_xml="<payments>" +
								"<id>"+account.id+"</id>" +
								"<paid_amount>"+account.total_amount+"</paid_amount>" +
								"<status>closed</status>" +
								"<notes>"+notes+"</notes>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</payments>";
						var receipt_xml="<receipts>" +
								"<id>"+new_id+"</id>" +
								"<receipt_id>"+receipt_id+"</receipt_id>" +
								"<payment_id>"+account.id+"</payment_id>" +
								"<type>"+receipt_type+"</type>" +
								"<amount>"+(parseFloat(account.total_amount)-parseFloat(account.paid_amount))+"</amount>" +
								"<acc_name>"+account_name+"</acc_name>" +
								"<date>"+last_updated+"</date>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</receipts>";
						if(is_online())
						{
							server_update_simple(payment_xml);
							server_create_simple(receipt_xml);
						}
						else
						{
							local_update_simple(payment_xml);
							local_create_simple(receipt_xml);
						}
					}
					else
					{
						var pending_amount=parseFloat(account.total_amount)-parseFloat(account.paid_amount);
						if(pending_amount<=counter_payment)
						{
							var notes=account.notes+"\nClosed by receipt # "+receipt_id;
							var payment_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+account.total_amount+"</paid_amount>" +
									"<status>closed</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</payments>";
							var receipt_xml="<receipts>" +
									"<id>"+new_id+"</id>" +
									"<receipt_id>"+receipt_id+"</receipt_id>" +
									"<payment_id>"+account.id+"</payment_id>" +
									"<type>"+receipt_type+"</type>" +
									"<amount>"+pending_amount+"</amount>" +
									"<acc_name>"+account_name+"</acc_name>" +
									"<date>"+last_updated+"</date>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</receipts>";
							if(is_online())
							{
								server_update_simple(payment_xml);
								server_create_simple(receipt_xml);
							}
							else
							{
								local_update_simple(payment_xml);
								local_create_simple(receipt_xml);
							}
							
							counter_payment-=pending_amount;
						}
						else
						{
							var paid_amount=parseFloat(account.paid_amount)+counter_payment;
							var notes=account.notes+"\n Rs."+counter_payment+" balanced against receipt # "+receipt_id;
							var payment_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+paid_amount+"</paid_amount>" +
									"<status>pending</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</payments>";
							var receipt_xml="<receipts>" +
									"<id>"+new_id+"</id>" +
									"<receipt_id>"+receipt_id+"</receipt_id>" +
									"<payment_id>"+account.id+"</payment_id>" +
									"<type>"+receipt_type+"</type>" +
									"<amount>"+counter_payment+"</amount>" +
									"<acc_name>"+account_name+"</acc_name>" +
									"<date>"+last_updated+"</date>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</receipts>";
							if(is_online())
							{
								server_update_simple(payment_xml);
								server_create_simple(receipt_xml);
							}
							else
							{
								local_update_simple(payment_xml);
								local_create_simple(receipt_xml);
							}
							counter_payment=0;
						}
					}
				});
			});
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal30").dialog("close");
		/////////////////////////////////////////
	});
	$("#modal30").dialog("open");
}


/**
 * @modal Delete Receipt
 * @modalNo 31
 */
function modal31_action()
{
	var form=document.getElementById("modal31_form");
	var receipt_filter=form.elements[1];
	var account_filter=form.elements[2];
	var balance_filter=form.elements[3];
	var amount_filter=form.elements[4];
		
	$(receipt_filter).off('blur');
	$(receipt_filter).on('blur',function(e)
	{
		var receipts_data="<receipts>" +
				"<id></id>" +
				"<receipt_id exact='yes'>"+receipt_filter.value+"</receipt_id>" +
				"<amount></amount>" +
				"<acc_name></acc_name>" +
				"</receipts>";
		fetch_requested_data('',receipts_data,function(receipts)
		{
			if(receipts.length>0)
			{
				account_filter.value=receipts[0].acc_name;
				var receipt_amount=0;
				for(var j in receipts)
				{
					receipt_amount+=parseFloat(receipts[j].amount);
				}
				amount_filter.value=receipt_amount;
				
				var payments_data="<payments>" +
					"<id></id>" +
					"<type></type>" +
					"<total_amount></total_amount>" +
					"<paid_amount></paid_amount>" +
					"<status exact='yes'>pending</status>" +
					"<acc_name exact='yes'>"+account_filter.value+"</acc_name>" +
					"</payments>";
				fetch_requested_data('',payments_data,function(payments)
				{
					var balance_amount=0;
					payments.forEach(function(payment)
					{
						if(payment.type=='received')
						{
							balance_amount+=parseFloat(payment.total_amount);
							balance_amount-=parseFloat(payment.paid_amount);
						}
						else if(payment.type=='paid')
						{
							balance_amount-=parseFloat(payment.total_amount);
							balance_amount+=parseFloat(payment.paid_amount);
						}
					});
					
					if(balance_amount==0)
					{
						balance_filter.value="Rs. 0";
					}
					else if(balance_amount>0)
					{
						balance_filter.value="Receivable: Rs. "+balance_amount;
					}
					else
					{
						balance_amount=(-balance_amount);
						balance_filter.value="Payable: Rs. "+balance_amount;
					}
				});
			}
		});
	});
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		///////////////////////////////////////
		event.preventDefault();
		var receipt_id=form.elements[1].value;
		
		if(is_delete_access('form124'))
		{
			var receipts_data="<receipts>" +
				"<id></id>" +
				"<receipt_id exact='yes'>"+receipt_filter.value+"</receipt_id>" +
				"<payment_id></payment_id>" +
				"<amount></amount>" +
				"<type></type>" +
				"<acc_name></acc_name>" +
				"</receipts>";

			fetch_requested_data('',receipts_data,function(receipts)
			{
				receipts.forEach(function(receipt)
				{	
					var payments_data="<payments>" +
								"<id>"+receipt.payment_id+"</id>" +
								"<paid_amount></paid_amount>" +
								"</payments>";
					fetch_requested_data('',payments_data,function(payments)
					{	
						var last_updated=get_my_time();
						payments.forEach(function(payment)
						{
							var paid_amount=parseFloat(payment.paid_amount)-parseFloat(receipt.amount);
							var payment_xml="<payments>" +
									"<id>"+payment.id+"</id>" +
									"<paid_amount>"+paid_amount+"</paid_amount>" +
									"<status>pending</status>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</payments>";
							if(is_online())
							{
								server_update_simple(payment_xml);
							}
							else
							{
								local_update_simple(payment_xml);
							}
						});
						
						var receipt_xml="<receipts>" +
							"<receipt_id>"+receipt_filter.value+"</receipt_id>" +
							"</receipts>";
						if(is_online())
						{
							server_delete_simple(receipt_xml);
						}
						else
						{
							local_delete_simple(receipt_xml);
						}
					});
				});
			});
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal31").dialog("close");
		/////////////////////////////////////////
	});
	$("#modal31").dialog("open");
}

/**
 * @modal Add Task
 * @modalNo 32
 */
function modal32_action(date_initiated)
{
	var form=document.getElementById("modal32_form");
	var task_filter=form.elements[1];
	var staff_filter=form.elements[2];
	var due_filter=form.elements[3];
	var status_filter=form.elements[4];
	var hours_filter=form.elements[5];
	
	var task_data="<task_type>" +
			"<name></name>" +
			"</task_type>";
	set_my_value_list(task_data,task_filter);
	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_value_list(staff_data,staff_filter);
	$(due_filter).datetimepicker();
	set_static_value_list('task_instances','status',status_filter);
	
	$(task_filter).off('blur');
	$(task_filter).on('blur',function(event)
	{
		var hours_data="<task_type>" +
				"<est_hours></est_hours>" +
				"<name exact='yes'>"+task_filter.value+"</name>" +
				"</task_type>";
		set_my_value(hours_data,hours_filter);
	});
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		
		var name=form.elements[1].value;
		var assignee=form.elements[2].value;
		var t_due=get_raw_time(form.elements[3].value);
		var t_initiated=get_raw_time(date_initiated);
		var status=form.elements[4].value;
		var hours=form.elements[5].value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<assignee>"+assignee+"</assignee>" +
					"<t_initiated>"+t_initiated+"</t_initiated>" +
					"<t_due>"+t_due+"</t_due>" +
					"<status>"+status+"</status>" +
					"<task_hours>"+hours+"</task_hours>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_instances</tablename>" +
					"<link_to>form14</link_to>" +
					"<title>Added</title>" +
					"<notes>Task "+name+" assigned to "+assignee+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>task_instances</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"<access_type>all</access_type>" +
					"<user>"+get_account_name()+"</user>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(access_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(access_xml);
		}	
		
		$("#modal32").dialog("close");
	});
	
	$("#modal32").dialog("open");
}

/**
 * @modal Update Task
 * @modalNo 33
 */
function modal33_action(id)
{
	var form=document.getElementById("modal33_form");
	var task_filter=form.elements[1];
	var staff_filter=form.elements[2];
	var due_filter=form.elements[3];
	var status_filter=form.elements[4];
	
	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_value_list(staff_data,staff_filter);
	$(due_filter).datetimepicker();
	set_static_value_list('task_instances','status',status_filter);
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form14') || is_create_access('form104'))
		{
			var name=form.elements[1].value;
			var assignee=form.elements[2].value;
			var t_due=get_raw_time(form.elements[3].value);
			var status=form.elements[4].value;
			var data_id=id;
			var last_updated=get_my_time();
			var data_xml="<task_instances>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<assignee>"+assignee+"</assignee>" +
						"<t_due>"+t_due+"</t_due>" +
						"<status>"+status+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</task_instances>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>task_instances</tablename>" +
						"<link_to>form14</link_to>" +
						"<title>Updated</title>" +
						"<notes>Task "+name+" assigned to "+assignee+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_update_row(data_xml,activity_xml);
			}
			else
			{
				local_update_row(data_xml,activity_xml);
			}	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal33").dialog("close");		
	});
	
	var tasks_data="<task_instances>" +
			"<id>"+id+"</id>" +
			"<name></name>" +
			"<description></description>" +
			"<assignee></assignee>" +
			"<t_due></t_due>" +
			"<t_initiated></t_initiated>" +
			"<task_hours></task_hours>" +
			"<status></status>" +
			"</task_instances>";
	fetch_requested_data('',tasks_data,function(results)
	{
		for(var i in results)
		{
			task_filter.value=results[i].name;
			staff_filter.value=results[i].assignee;
			due_filter.value=get_my_datetime(results[i].t_due);
			status_filter.value=results[i].status;
			
			break;
		}
		$("#modal33").dialog("open");
	});
}


/**
 * @modal Add Store Area
 * @modalNo 35
 */
function modal35_action(func)
{
	var form=document.getElementById("modal35_form");
	var owner_filter=form.elements[2];
	var area_type_filter=form.elements[3];

	var owner_data="<staff>"+
				"<acc_name></acc_name>"+
				"</staff>";
	set_my_value_list(owner_data,owner_filter);
	
	set_static_value_list('store_areas','area_type',area_type_filter);
	
	////adding attribute fields///////
	var attribute_label=document.getElementById('modal35_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>storage</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});
	
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form83'))
		{
			var data_id=get_new_key();
			var name=form.elements[1].value;
			var owner=form.elements[2].value;
			var area_type=form.elements[3].value;
			var last_updated=get_my_time();
			var data_xml="<store_areas>" +
						"<id>"+data_id+"</id>" +
						"<name unique='yes'>"+name+"</name>" +
						"<owner>"+owner+"</owner>" +
						"<area_type>"+area_type+"</area_type>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</store_areas>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>store_areas</tablename>" +
						"<link_to>form83</link_to>" +
						"<title>Added</title>" +
						"<notes>Store area "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row_func(data_xml,activity_xml,func);
			}
			else
			{
				local_create_row_func(data_xml,activity_xml,func);
			}
			
			var id=get_new_key();
			$("#modal35_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				if(value!="")
				{
					var attribute=$(this).attr('name');
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+name+"</name>" +
							"<type>storage</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal35").dialog("close");		
	});
	
	$("#modal35").dialog("open");
}

/**
 * @modal Add Appointment
 * @modalNo 36
 */
function modal36_action(schedule_date)
{
	var form=document.getElementById("modal36_form");
	var customer_filter=form.elements[1];
	var staff_filter=form.elements[2];
	var schedule_filter=form.elements[3];
	var hours_filter=form.elements[4];
	var status_filter=form.elements[6];
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_value_list(customer_data,customer_filter);
	
	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_value_list(staff_data,staff_filter);
	
	$(schedule_filter).datetimepicker();
	schedule_filter.value=schedule_date;
	set_static_value_list('appointments','status',status_filter);
		
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form89'))
		{
			var name=form.elements[1].value;
			var assignee=form.elements[2].value;
			var schedule=get_raw_time(form.elements[3].value);
			var hours=form.elements[4].value;
			var notes=form.elements[5].value;
			var status=form.elements[6].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<appointments>" +
						"<id>"+data_id+"</id>" +
						"<customer>"+name+"</customer>" +
						"<assignee>"+assignee+"</assignee>" +
						"<schedule>"+schedule+"</schedule>" +
						"<status>"+status+"</status>" +
						"<hours>"+hours+"</hours>" +
						"<notes>"+notes+"</notes>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</appointments>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>appointments</tablename>" +
						"<link_to>form89</link_to>" +
						"<title>Added</title>" +
						"<notes>Appointment with "+name+" assigned to "+assignee+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
			}	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal36").dialog("close");
	});
	
	$("#modal36").dialog("open");
}

/**
 * @modal Update Appointment
 * @modalNo 37
 */
function modal37_action(id)
{
	var form=document.getElementById("modal37_form");
	var customer_filter=form.elements[1];
	var staff_filter=form.elements[2];
	var notes_filter=form.elements[3];
	var status_filter=form.elements[4];
	
	var customer_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customer_data,customer_filter);

	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_value_list(staff_data,staff_filter);
	set_static_value_list('appointments','status',status_filter);
	
	
	var apps_data="<appointments>" +
			"<id>"+id+"</id>" +
			"<customer></customer>" +
			"<assignee></assignee>" +
			"<notes></notes>" +
			"<status></status>" +
			"</appointments>";
	fetch_requested_data('form89',apps_data,function(results)
	{
		for(var i in results)
		{
			customer_filter.value=results[i].customer;
			staff_filter.value=results[i].assignee;
			notes_filter.value=results[i].notes;
			status_filter.value=results[i].status;
			
			break;
		}
		$("#modal37").dialog("open");
	});
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form89'))
		{
			var name=form.elements[1].value;
			var assignee=form.elements[2].value;
			var notes=form.elements[3].value;
			var status=form.elements[4].value;
			var last_updated=get_my_time();
			var data_xml="<appointments>" +
						"<id>"+id+"</id>" +
						"<customer>"+name+"</customer>" +
						"<assignee>"+assignee+"</assignee>" +
						"<notes>"+notes+"</notes>" +
						"<status>"+status+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</appointments>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>appointments</tablename>" +
						"<link_to>form89</link_to>" +
						"<title>Updated</title>" +
						"<notes>Appointment with "+name+" assigned to "+assignee+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_update_row(data_xml,activity_xml);
			}
			else
			{
				local_update_row(data_xml,activity_xml);
			}	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal37").dialog("close");		
	});
}

/**
 * @modalNo 38
 * @modal Update sale price
 */
function modal38_action(father_id,sale_price_value)
{
	var form=document.getElementById('modal38_form');	
	var fsale_price=form.elements[1];
	var billing_label=document.getElementById('modal38_billings');
	$(billing_label).html("");

	fsale_price.value=sale_price_value;
	////adding sale price fields for all billing types///////
	var billing_type_data="<sale_prices>" +
			"<id></id>" +
			"<sale_price></sale_price>" +
			"<billing_type></billing_type>" +
			"<pi_id exact='yes'>"+father_id+"</pi_id>" +
			"</sale_prices>";
	fetch_requested_data('',billing_type_data,function(sale_prices)
	{
		sale_prices.forEach(function(sale_price)
		{
			var bill_label=document.createElement('label');
			bill_label.innerHTML=sale_price.billing_type+" sale price (Rs.) <input type='number' id='"+sale_price.id+"' value='"+sale_price.sale_price+"' step='any' required>";
			billing_label.appendChild(bill_label);
			var line_break=document.createElement('br');
			billing_label.appendChild(line_break);
		});
	});
	////////////////////////////////////////////////
	
	////auto setting sale price fields/////////
	$(fsale_price).off('blur');
	$(fsale_price).on('blur',function(event)
	{
		var sale_price=fsale_price.value;
		$("#modal38_billings").find('input').each(function()
		{
			if($(this).val()=="")
			{
				$(this).val(sale_price);
			}
		});
	});		
	////////////////////
	
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form166'))
		{
			var sale_price=fsale_price.value;
			var last_updated=get_my_time();
			var data_xml="<product_instances>" +
						"<id>"+father_id+"</id>" +
						"<sale_price>"+sale_price+"</sale_price>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</product_instances>";
			if(is_online())
			{
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
			
			$("#modal38_billings").find('input').each(function()
			{
				var price=$(this).val();
				var id=$(this).attr('id');
				var sale_price_xml="<sale_prices>" +
						"<id>"+id+"</id>" +
						"<sale_price>"+price+"</sale_price>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</sale_prices>";
				if(is_online())
				{
					server_update_simple(sale_price_xml);
				}
				else
				{
					local_update_simple(sale_price_xml);
				}
			});
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal38").dialog("close");
	});
	
	$("#modal38").dialog("open");
}

/**
 * @modal Add Loan
 * @modalNo 39
 */
function modal39_action(schedule_date)
{
	var form=document.getElementById("modal39_form");
	var type_filter=form.elements[1];
	var account_filter=form.elements[2];
	var amount_filter=form.elements[3];
	var date_filter=form.elements[4];
	var repayment_filter=form.elements[5];
	var rate_filter=form.elements[6];
	var iperiod_filter=form.elements[7];
	var itype_filter=form.elements[8];
	var emi_filter=form.elements[9];
	var emi_period_filter=form.elements[10];
	var num_emi_filter=form.elements[11];
	
	var account_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	set_my_value_list(account_data,account_filter);
	set_static_value_list('loans','type',type_filter);
	set_static_value_list('loans','repayment_method',repayment_filter);
	set_static_value_list('loans','interest_type',itype_filter);

	$(rate_filter).parent().hide();
	$(iperiod_filter).parent().hide();
	$(itype_filter).parent().hide();
	$(emi_filter).parent().hide();
	$(emi_period_filter).parent().hide();
	$(num_emi_filter).parent().hide();

	$(repayment_filter).off('blur');
	$(repayment_filter).on('blur',function(event)
	{
		if(repayment_filter.value=='instalments')
		{
			$(emi_filter).parent().show();
			$(emi_period_filter).parent().show();
			$(num_emi_filter).parent().show();
			$(rate_filter).parent().hide();
			$(iperiod_filter).parent().hide();
			$(itype_filter).parent().hide();
		}
		else
		{
			$(rate_filter).parent().show();
			$(iperiod_filter).parent().show();
			$(itype_filter).parent().show();
			$(emi_filter).parent().hide();
			$(emi_period_filter).parent().hide();
			$(num_emi_filter).parent().hide();
		}
	});
	
	$(date_filter).datepicker();
	date_filter.value=get_my_date();
	
	////adding attribute fields///////
	var attribute_label=document.getElementById('modal39_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>loan</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});
	
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form93'))
		{
			var type=form.elements[1].value;
			var account=form.elements[2].value;
			var amount=form.elements[3].value;
			var date=get_raw_time(form.elements[4].value);
			var repayment=form.elements[5].value;
			var rate=form.elements[6].value;
			var period=form.elements[7].value;
			var itype=form.elements[8].value;
			var next_date=date+(parseFloat(period)*86400000);
			var emi=form.elements[9].value;
			var emi_period=form.elements[10].value;
			var num_emi=form.elements[11].value;
			var next_emi_date=date+(parseFloat(emi_period)*86400000);
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var adjective="to";
			var receiver=account;
			var giver="loan";
			var ptype='paid';
			var due_time=get_debit_period();
			if(type=='taken')
			{
				adjective="from";
				giver=account;
				receiver="loan";
				ptype='received';
			}
			var data_xml="<loans>" +
						"<id>"+data_id+"</id>" +
						"<type>"+type+"</type>" +
						"<account>"+account+"</account>" +
						"<loan_amount>"+amount+"</loan_amount>" +
						"<date_initiated>"+date+"</date_initiated>" +
						"<repayment_method>"+repayment+"</repayment_method>" +
						"<interest_paid>0</interest_paid>" +
						"<interest_rate>"+rate+"</interest_rate>" +
						"<interest_period>"+period+"</interest_period>" +
						"<next_interest_date>"+next_date+"</next_interest_date>" +
						"<interest_type>"+itype+"</interest_type>" +
						"<emi>"+emi+"</emi>" +
						"<emi_period>"+emi_period+"</emi_period>" +
						"<pending_emi>"+num_emi+"</pending_emi>" +
						"<next_emi_date>"+next_emi_date+"</next_emi_date>" +
						"<status>open</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</loans>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>loans</tablename>" +
						"<link_to>form93</link_to>" +
						"<title>Added</title>" +
						"<notes>Loan of amount Rs. "+amount+" "+type+" "+adjective+" "+account+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var payment_id=get_new_key()+""+Math.floor(Math.random()*1000);
			var transaction2_xml="<transactions>" +
						"<id>"+payment_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+amount+"</amount>" +
						"<receiver>"+receiver+"</receiver>" +
						"<giver>"+giver+"</giver>" +
						"<tax>0</tax>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</transactions>";
			var payment_xml="<payments>" +
						"<id>"+payment_id+"</id>" +
						"<acc_name>"+account+"</acc_name>" +
						"<type>"+ptype+"</type>" +
						"<total_amount>"+amount+"</total_amount>" +
						"<paid_amount>"+amount+"</paid_amount>" +
						"<status>closed</status>" +
						"<date>"+get_my_time()+"</date>" +
						"<due_date>"+get_my_time()+"</due_date>" +
						"<mode></mode>" +
						"<transaction_id>"+payment_id+"</transaction_id>" +
						"<bill_id>"+data_id+"</bill_id>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</payments>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction2_xml);
				server_create_simple_func(payment_xml,function()
				{
					console.log(payment_id);
					if(type=='taken')
						modal26_action(payment_id);
					else
						modal28_action(payment_id);
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction2_xml);
				local_create_simple_func(payment_xml,function()
				{
					if(type=='taken')
						modal26_action(payment_id);
					else
						modal28_action(payment_id);
				});
			}
			
			var id=get_new_key();
			$("#modal39_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				if(value!="")
				{
					var attribute=$(this).attr('name');
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+data_id+"</name>" +
							"<type>loan</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});

		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal39").dialog("close");
	});
	
	$("#modal39").dialog("open");
}


/**
 * @modal Discard Item
 * @modalNo 40
 */
function modal40_action(product,batch)
{
	var form=document.getElementById("modal40_form");
	var item_filter=form.elements[1];
	var batch_filter=form.elements[2];
	var quantity_filter=form.elements[3];
	
	item_filter.value=product;
	batch_filter.value=batch;
	
	var item_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_value_list(item_data,item_filter);
	
	$(item_filter).off('blur');
	$(item_filter).on('blur',function(event)
	{
		var batch_data="<product_instances>" +
			"<batch></batch>" +
			"<product_name exact='yes'>"+item_filter.value+"</product_name>" +
			"</product_instances>";
		set_my_value_list(batch_data,batch_filter);
	});
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form94'))
		{
			var item=form.elements[1].value;
			var batch=form.elements[2].value;
			var quantity=form.elements[3].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<discarded>" +
						"<id>"+data_id+"</id>" +
						"<product_name>"+item+"</product_name>" +
						"<batch>"+batch+"</batch>" +
						"<quantity>"+quantity+"</quantity>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</discarded>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>discarded</tablename>" +
						"<link_to>form94</link_to>" +
						"<title>Added</title>" +
						"<notes>Batch number "+batch+" of product "+name+" to discarded list</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
			}
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal40").dialog("close");
	});
	
	$("#modal40").dialog("open");
}

/**
 * @modal Close Payments
 * @modalNo 41
 */
function modal41_action(button)
{
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	
	var form=document.getElementById("modal41_form");
	
	var account_name=father_form.elements[0].value;
	var balance_display=father_form.elements[3].value;
	var balance=father_form.elements[8].value;
	
	form.elements[1].value=account_name;
	form.elements[2].value=balance_display;
	form.elements[3].setAttribute('max',balance);
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		
		var counter_payment=parseFloat(form.elements[3].value);
		//console.log(counter_payment);
		var user_notes=form.elements[4].value;
		
		if(is_create_access('form11'))
		{
			var accounts_data="<payments>" +
					"<id></id>" +
					"<status exact='yes'>pending</status>" +
					"<acc_name exact='yes'>"+account_name+"</acc_name>" +
					"<type></type>" +
					"<date></date>" +
					"<total_amount></total_amount>" +
					"<paid_amount></paid_amount>" +
					"<notes></notes>" +
					"</payments>";
			
			fetch_requested_data('',accounts_data,function(accounts)
			{
				accounts.sort(function(a,b)
				{
					if(a.date>b.date)
					{	return 1;}
					else 
					{	return -1;}
				});
				
				var total_received=0;
				var total_paid=0;
				for(var i=0;i<accounts.length;i++)
				{
					if(accounts[i].type=='paid')
					{
						total_paid=parseFloat(accounts[i].total_amount)-parseFloat(accounts[i].paid_amount);
					}
					else
					{
						total_received=parseFloat(accounts[i].total_amount)-parseFloat(accounts[i].paid_amount);
					}
				}
				
				if(total_received<total_paid)
				{
					total_received+=counter_payment;
				}
				else
				{
					total_paid+=counter_payment;
				}

				accounts.forEach(function(account)
				{
					if(total_received<total_paid)
					{
						if(account.type=='received')
						{
							var notes=account.notes+"\nClosed by balancing against other payables";
							var received_xml="<payments>" +
								"<id>"+account.id+"</id>" +
								"<paid_amount>"+account.total_amount+"</paid_amount>" +
								"<status>closed</status>" +
								"<notes>"+notes+"</notes>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</payments>";
							if(is_online())
							{
								server_update_simple(received_xml);
							}
							else
							{
								local_update_simple(received_xml);
							}
						}
						else
						{
							var pending_amount=parseFloat(account.total_amount)-parseFloat(account.paid_amount);
							if(pending_amount<=total_received)
							{
								var notes=account.notes+"\n"+user_notes;
								var paid_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+account.total_amount+"</paid_amount>" +
									"<status>closed</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
								if(is_online())
								{
									server_update_simple(paid_xml);
								}
								else
								{
									local_update_simple(paid_xml);
								}
		
								total_received-=pending_amount;
								total_paid-=pending_amount;
							}
							else
							{
								var paid_amount=parseFloat(account.paid_amount)+total_received;
								//console.log(paid_amount);
								var notes=account.notes+"\n Rs."+total_received+" balanced against other receivables and "+user_notes;
								var paid_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+paid_amount+"</paid_amount>" +
									"<status>pending</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
								if(is_online())
								{
									server_update_simple(paid_xml);
								}
								else
								{
									local_update_simple(paid_xml);
								}
		
								total_received=0;
								total_paid=0;
							}
						}
					}
					else
					{
						if(account.type=='paid')
						{
							var notes=account.notes+"\nClosed by balancing other receivables";
							var paid_xml="<payments>" +
								"<id>"+account.id+"</id>" +
								"<paid_amount>"+account.total_amount+"</paid_amount>" +
								"<status>closed</status>" +
								"<notes>"+notes+"</notes>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</payments>";
							if(is_online())
							{
								server_update_simple(paid_xml);
							}
							else
							{
								local_update_simple(paid_xml);
							}
						}
						else
						{
							var pending_amount=parseFloat(account.total_amount)-parseFloat(account.paid_amount);
							
							if(pending_amount<=total_paid)
							{
								var notes=account.notes+"\n"+user_notes;
								var received_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+account.total_amount+"</paid_amount>" +
									"<status>closed</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
								if(is_online())
								{
									server_update_simple(received_xml);
								}
								else
								{
									local_update_simple(received_xml);
								}
								
								total_received-=pending_amount;
								total_paid-=pending_amount;
							}
							else
							{
								var paid_amount=parseFloat(account.paid_amount)+total_paid;
								var notes=account.notes+"\n Rs."+total_paid+" balanced against other payables "+user_notes;
								var received_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+paid_amount+"</paid_amount>" +
									"<status>pending</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
								if(is_online())
								{
									server_update_simple(received_xml);
								}
								else
								{
									local_update_simple(received_xml);
								}
								total_received=0;
								total_paid=0;
							}
						}
					}
				});
			});
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal41").dialog("close");
	});
	
	$("#modal41").dialog("open");
}


/**
 * @modal Bill Type
 * @modalNo 42
 */
function modal42_action(order_id)
{
	var form=document.getElementById("modal42_form");
	var type_filter=form.elements[1];
	
	var type_data="<bill_types>" +
			"<name></name>" +
			"<status exact='yes'>active</status>" +
			"</bill_types>";
	set_my_value_list(type_data,type_filter);
	set_my_value(type_data,type_filter);	
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		form108_bill(order_id,type_filter.value);
		$("#modal42").dialog("close");
	});
	
	$("#modal42").dialog("open");
}

/**
 * @modal Add Project Task
 * @modalNo 43
 */
function modal43_action(date_initiated,project_id)
{
	var form=document.getElementById("modal43_form");
	var task_filter=form.elements[1];
	var desc_filter=form.elements[2];
	var staff_filter=form.elements[3];
	var due_filter=form.elements[4];
	var status_filter=form.elements[5];
	
	start_filter.value=date_initiated;
		
	var task_data="<project_phases>" +
			"<phase_name></phase_name>" +
			"<project_id exact='yes'>"+project_id+"</project_id>"+
			"</project_phases>";
	set_my_value_list(task_data,task_filter);
	
	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_value_list(staff_data,staff_filter);
	
	$(due_filter).datetimepicker();
	set_static_value_list('task_instances','status',status_filter);
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form104'))
		{
			var name=form.elements[1].value;
			var description=form.elements[2].value;
			var assignee=form.elements[3].value;
			var t_due=get_raw_time(form.elements[4].value);
			var status=form.elements[5].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<task_instances>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<description>"+description+"</description>"+
						"<assignee>"+assignee+"</assignee>" +
						"<t_initiated>"+last_updated+"</t_initiated>" +
						"<t_due>"+t_due+"</t_due>" +
						"<status>"+status+"</status>" +
						"<task_hours>"+hours+"</task_hours>" +
						"<source>project</source>" +
						"<source_id>"+project_id+"</source_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</task_instances>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>task_instances</tablename>" +
						"<link_to>form104</link_to>" +
						"<title>Added</title>" +
						"<notes>Task "+name+" assigned to "+assignee+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var access_xml="<data_access>" +
						"<id>"+get_new_key()+"</id>" +
						"<tablename>task_instances</tablename>" +
						"<record_id>"+data_id+"</record_id>" +
						"<access_type>all</access_type>" +
						"<user>"+get_account_name()+"</user>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</data_access>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(access_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(access_xml);
			}	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal43").dialog("close");
	});
	
	$("#modal43").dialog("open");
}

/**
 * @modal Share
 * @modalNo 44
 */
function modal44_action(recipient,subject,message)
{
	show_loader();
	var form=document.getElementById("modal44_form");
	var client=form.elements[1];
	
	set_static_value_list('share','share_options',client);
	var sup_email_data="<suppliers>" +
			"<email></email>" +
			"<acc_name exact='yes'>"+recipient+"</acc_name>" +
			"</suppliers>";
	var cust_email_data="<customers>" +
			"<email></email>" +
			"<acc_name exact='yes'>"+recipient+"</acc_name>" +
			"</customers>";
	var staff_email_data="<staff>" +
			"<email></email>" +
			"<acc_name exact='yes'>"+recipient+"</acc_name>" +
			"</staff>";
	
	var email_data_array=[sup_email_data,cust_email_data,staff_email_data];
	message=encodeURIComponent(message);
	subject=encodeURIComponent(subject);
	
	get_single_column_data_array(email_data_array,function(email_results)
	{
		if(email_results.length>0)
		{
			form.elements[2].value=email_results[0];
		}
		form.elements[3].value=recipient;
		
		var whatsapp_link=document.createElement('a');
		whatsapp_link.setAttribute('href',"whatsapp://send?text="+message);
		whatsapp_link.setAttribute('target',"_blank");
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();

			var email=encodeURIComponent(form.elements[2].value);
			var gmail_string="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su="+subject+"&to="+email+"&body="+message;
			var outlook_string="https://mail.live.com/default.aspx?rru=compose&to="+email+"&subject="+subject+"&body="+message;
			var yahoo_string="http://compose.mail.yahoo.com/?To="+email+"&Cc=&Bcc=&Subj="+subject+"&Body="+message;
			switch(client.value)
			{
				case 'gmail': window.open(gmail_string,'_blank');
								break;
				case 'outlook':	window.open(outlook_string,'_blank');
								break;
				case 'whatsapp': $(whatsapp_link).click();
								break;
				case 'yahoo': window.open(yahoo_string,'_blank');
								break;
			}
			$("#modal44").dialog("close");
		});
		
		$("#modal44").dialog("open");
		hide_loader();
	});
	
}


/**
 * @modalNo 45
 * @modal Add new loyalty program
 * @param button
 */
function modal45_action()
{
	var form=document.getElementById('modal45_form');
		
	var program_name=form.elements[1];
	var type=form.elements[2];
	var tier=form.elements[3];
	var tier_criteria_min=form.elements[4];
	var tier_criteria_max=form.elements[5];
	var redemption_criteria=form.elements[6];
	var points_addition=form.elements[7];
	var discount=form.elements[8];
	var cashback=form.elements[9];
	var reward_product=form.elements[10];
	var status=form.elements[11];
	
	var product_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	set_my_value_list(product_data,reward_product);
	set_static_value_list('loyalty_programs','type',type);
	set_static_value_list('loyalty_programs','status',status);
	$(discount).parent().hide();
	$(cashback).parent().hide();
	$(reward_product).parent().hide();
	$(redemption_criteria).parent().hide();
	
	$(type).off('blur');
	$(type).on('blur',function(event)
	{
		$(discount).parent().hide();
		$(cashback).parent().hide();
		$(reward_product).parent().hide();
		$(redemption_criteria).parent().hide();
		
		if(type.value=='cashback')
		{
			$(cashback).parent().show();
			$(redemption_criteria).parent().show();
		}
		else if(type.value=='discount')
		{			
			$(discount).parent().show();
		}
		else if(type.value=='reward product')
		{
			$(reward_product).parent().show();
			$(redemption_criteria).parent().show();
		}
	});
	
	////adding attribute fields///////
	var attribute_label=document.getElementById('modal45_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>loyalty program</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});
	
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form116'))
		{
			var name_value=form.elements[1].value;
			var type_value=form.elements[2].value;
			var tier_value=form.elements[3].value;
			var tier_criteria_min_value=form.elements[4].value;
			var tier_criteria_max_value=form.elements[5].value;
			var redemption_criteria_value=form.elements[6].value;
			var points_addition_value=form.elements[7].value;
			var discount_value=form.elements[8].value;
			var cashback_value=form.elements[9].value;
			var reward_product_value=form.elements[10].value;
			var status_value=form.elements[11].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
						
			var data_xml="<loyalty_programs>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name_value+"</name>" +
						"<type>"+type_value+"</type>" +
						"<tier>"+tier_value+"</tier>" +
						"<tier_criteria_lower>"+tier_criteria_min_value+"</tier_criteria_lower>" +
						"<tier_criteria_upper>"+tier_criteria_max_value+"</tier_criteria_upper>" +
						"<redemption_criteria>"+redemption_criteria_value+"</redemption_criteria>" +
						"<points_addition>"+points_addition_value+"</points_addition>" +
						"<discount>"+discount_value+"</discount>" +
						"<cashback>"+cashback_value+"</cashback>" +
						"<reward_product>"+reward_product_value+"</reward_product>" +
						"<status>"+status_value+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</loyalty_programs>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>loyalty_programs</tablename>" +
						"<link_to>form116</link_to>" +
						"<title>Added</title>" +
						"<notes>Loyalty program "+name_value+" tier "+tier_value+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
			}
			
			var id=get_new_key();
			$("#modal45_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				if(value!="")
				{
					var attribute=$(this).attr('name');
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+name_value+"</name>" +
							"<type>loyalty program</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});

			var customer_data="<customers>" +
						"<acc_name></acc_name>" +
						"</customers>";
			get_single_column_data(function(customers)
			{
				var customers_xml="<loyalty_customers>";
				var id=get_new_key();
				var counter=0;
				customers.forEach(function(customer)
				{
					if(counter==500)
					{
						counter=0;
						customers_xml+="</loyalty_customers><separator></separator><loyalty_customers>";
					}
					customers_xml+="<row>" +
							"<id>"+id+"</id>" +
							"<program_name>"+name_value+"</program_name>" +
							"<customer>"+customer+"</customer>" +
							"<tier>"+tier_value+"</tier>" +
							"<status>inactive</status>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";
					id+=1;
					counter+=1;
				});
				customers_xml+="</loyalty_customers>";
				if(is_online())
				{
					server_create_batch(customers_xml);
				}
				else
				{
					local_create_batch(customers_xml);
				}
			},customer_data);
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal45").dialog("close");
	});
	$("#modal45").dialog("open");	
}


/**
 * @modalNo 46
 * @modal Update Loyalty program
 * @param button
 */
function modal46_action(button)
{
	var form=document.getElementById('modal46_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var fname=father_form.elements[0];
	var ftype=father_form.elements[1];
	var fdetail=father_form.elements[3];
	var fstatus=father_form.elements[4];
	var fdata_id=father_form.elements[5];
	var ftier_criteria_lower=father_form.elements[8];
	var ftier_criteria_upper=father_form.elements[9];
	var fpoint_addition=father_form.elements[10];
	var fdiscount=father_form.elements[11];
	var fcashback=father_form.elements[12];
	var freward_product=father_form.elements[13];
	var fredemption_criteria=father_form.elements[14];
	
	form.elements[1].value=ftier_criteria_lower.value;
	form.elements[2].value=ftier_criteria_upper.value;
	form.elements[4].value=fpoint_addition.value;
	form.elements[8].value=fstatus.value;
	
	var redemption_criteria=form.elements[3];
	redemption_criteria.value=fredemption_criteria.value;
	var discount=form.elements[5]
	discount.value=fdiscount.value;
	var cashback=form.elements[6];
	cashback.value=fcashback.value;
	var reward_product=form.elements[7];
	reward_product.value=freward_product.value;
	
	$(discount).parent().hide();
	$(cashback).parent().hide();
	$(reward_product).parent().hide();
	$(redemption_criteria).parent().hide();
	
	if(ftype.value=='cashback')
	{
		$(cashback).parent().show();
		$(redemption_criteria).parent().show();
	}
	else if(ftype.value=='discount')
	{			
		$(discount).parent().show();
	}
	else if(ftype.value=='reward product')
	{
		$(reward_product).parent().show();
		$(redemption_criteria).parent().show();
	}
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form116'))
		{
			ftier_criteria_lower.value=form.elements[1].value;
			ftier_criteria_upper.value=form.elements[2].value;
			fredemption_criteria.value=form.elements[3].value;
			fpoint_addition.value=form.elements[4].value;
			fdiscount.value=form.elements[5].value;
			fcashback.value=form.elements[6].value;
			freward_product.value=form.elements[7].value;
			fstatus.value=form.elements[8].value;
			if(ftype.value=='cashback')
			{
				fdetail.value="Tier criteria: "+ftier_criteria_lower.value+"-"+ftier_criteria_upper.value+"\nPoints Addition: "+fpoint_addition.value+"\nCashback: "+fcashback.value+"\nRedemption Criteria: "+fredemption_criteria.value;
			}
			else if(ftype.value=='discount')
			{
				fdetail.value="Tier criteria: "+ftier_criteria_lower.value+"-"+ftier_criteria_upper.value+"\nPoints Addition: "+fpoint_addition.value+"\nDiscount: "+fdiscount.value;
			}
			else if(ftype.value=='reward product')
			{
				fdetail.value="Tier criteria: "+ftier_criteria_lower.value+"-"+ftier_criteria_upper.value+"\nPoints Addition: "+fpoint_addition.value+"\nReward Product: "+freward_product.value+"\nRedemption Criteria: "+fredemption_criteria.value;
			}
			
			var data_xml="<loyalty_programs>" +
					"<id>"+fdata_id.value+"</id>" +
					"<tier_criteria_lower>"+ftier_criteria_lower.value+"</tier_criteria_lower>" +
					"<tier_criteria_upper>"+ftier_criteria_upper.value+"</tier_criteria_upper>" +
					"<redemption_criteria>"+fredemption_criteria.value+"</redemption_criteria>" +
					"<points_addition>"+fpoint_addition.value+"</points_addition>" +
					"<discount>"+fdiscount.value+"</discount>" +
					"<cashback>"+fcashback.value+"</cashback>" +
					"<reward_product>"+freward_product.value+"</reward_product>" +
					"<status>"+fstatus.value+"</status>" +
					"<last_updated>"+get_my_time()+"</last_updated>" +
					"</loyalty_programs>";	
			var activity_xml="<activity>" +
					"<data_id>"+fdata_id.value+"</data_id>" +
					"<tablename>loyalty_programs</tablename>" +
					"<link_to>form116</link_to>" +
					"<title>Updated</title>" +
					"<notes>Loyalty program "+fname.value+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
			if(is_online())
			{
				server_update_row(data_xml,activity_xml);
			}
			else
			{
				local_update_row(data_xml,activity_xml);
			}
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal46").dialog("close");
	});
	
	$("#modal46").dialog("open");
}

/**
 * @modal Add Service Request
 * @modalNo 47
 */
function modal47_action(service_date)
{
	var form=document.getElementById("modal47_form");
	var id_filter=form.elements[1];
	var customer_filter=form.elements[2];
	var by_filter=form.elements[3];
	var problem_type_filter=form.elements[4];
	var problem_filter=form.elements[5];
	id_filter.value=get_my_time();
	by_filter.value=get_account_name();
	
	var customers_list_data="<customers>"+
							"<acc_name></acc_name>"+									
							"</customers>";	
	set_my_value_list(customers_list_data,customer_filter);
	
	var problem_type_data="<service_requests>"+
						"<problem_type></problem_type>"+								
						"</service_requests>";	
	set_my_filter(problem_type_data,problem_type_filter);
		
	var customer_data="<accounts count='1'>"+
					"<acc_name></acc_name>"+
					"<type exact='yes'>customer</type>"+							
					"<username>"+get_username()+"</username>"+
					"</accounts>";	
	get_single_column_data(function(customer_names)
	{
		if(customer_names.length>0)
		{
			customer_filter.value=customer_names[0];
			customer_filter.setAttribute('readonly','readonly');
		}
	},customer_data);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form132'))
		{
			var data_id=id_filter.value;			
			var customer=customer_filter.value;
			var reported_by=by_filter.value;
			var problem=problem_filter.value;
			var problem_type=problem_type_filter.value;
			var last_updated=get_my_time();
			var data_xml="<service_requests>" +
						"<id>"+data_id+"</id>" +
						"<customer>"+customer+"</customer>" +
						"<notes>"+problem+"</notes>" +
						"<problem_type>"+problem_type+"</problem_type>" +
						"<reported_by>"+reported_by+"</reported_by>" +
						"<reported_time>"+last_updated+"</reported_time>" +
						"<start_time>"+get_raw_time(service_date)+"</start_time>" +
						"<end_time>"+(get_raw_time(service_date)+86400000)+"</end_time>" +
						"<status>open</status>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</service_requests>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>service_requests</tablename>" +
						"<link_to>form128</link_to>" +
						"<title>Added</title>" +
						"<notes>Service request from customer "+customer+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
			}	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal47").dialog("close");
	});
	
	$("#modal47").dialog("open");
}


/**
 * @modal Add Solution
 * @modalNo 48
 */
function modal48_action(issue_id)
{
	var form=document.getElementById("modal48_form");
	var issue_filter=form.elements[1];
	var solution_filter=form.elements[2];
	issue_filter.value=issue_id;	
		
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form126'))
		{
			var solution=form.elements[2].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<solutions>" +
						"<id>"+data_id+"</id>" +
						"<issue_id>"+issue_id+"</issue_id>" +
						"<detail>"+solution+"</detail>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</solutions>";
			if(is_online())
			{
				server_create_simple(data_xml);
			}
			else
			{
				local_create_simple(data_xml);
			}	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal48").dialog("close");
	});
	
	$("#modal48").dialog("open");
}


/**
 * @modal Add Issue
 * @modalNo 49
 */
function modal49_action(issue_id)
{
	var form=document.getElementById("modal49_form");
	var issue_filter=form.elements[1];
	var short_filter=form.elements[2];
	var detail_filter=form.elements[3];
	issue_filter.value=get_my_time();	
		
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form126'))
		{
			var issue_id=form.elements[1].value;
			var short_desc=form.elements[2].value;
			var detail=form.elements[3].value;
			var last_updated=get_my_time();
			var data_xml="<issues>" +
						"<id>"+issue_id+"</id>" +
						"<short_desc>"+short_desc+"</short_desc>" +
						"<detail>"+detail+"</detail>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</issues>";
			if(is_online())
			{
				server_create_simple(data_xml);
			}
			else
			{
				local_create_simple(data_xml);
			}	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal49").dialog("close");
	});
	
	$("#modal49").dialog("open");
}


/**
 * @modal Sending Mails
 * @modalNo 50
 */
function modal50_action()
{
	show_loader();
	var form=document.getElementById("form78_master");
	var nl_name=form.elements[1].value;
	var nl_id=form.elements[3].value;
	var sms_content=form.elements[2].value;			

	print_newsletter(nl_name,nl_id,'mail',function(container)
	{
		var business_title=get_session_var('title');
		var subject=nl_name+" - " +business_title;
		
		var email_id_string="";
		
		$("[id^='row_form78_']").each(function(index)
		{
			var form_id=$(this).attr('id');
			var form=document.getElementById(form_id);
			
			if(form.elements[3].checked)
			{
				email_id_string+=form.elements[1].value+";";
				var customer_name=form.elements[4].value;
				var customer_phone=form.elements[2].value;
				var message=sms_content.replace(/customer_name/g,customer_name);
				message=message.replace(/business_title/g,business_title);
			
				send_sms(customer_phone,message,'transaction');
			}
		});	

		var message=encodeURIComponent(container.innerHTML);
		
		var to=email_id_string;
		var from=get_session_var('email');
		send_email(to,from,subject,message,'promotion',function()
		{
			$("#modal58").dialog("open");
			hide_loader();			
		});
	});		
}



/**
 * @modal Merge records
 * @modalNo 51
 */
function modal51_action(object)
{
	if(is_create_access('form80'))
	{
		$("#modal51").dialog("open");
		
		var de_duplication_data="<de_duplication>" +
					"<id></id>" +
					"<object exact='yes'>"+object+"</object>"+
					"<tablename></tablename>"+
					"<keycolumn></keycolumn>"+
					"<slave_id></slave_id>"+
				    "<slave_value></slave_value>"+
				    "<master_id></master_id>"+
				    "<master_value></master_value>"+
				    "<references_value></references_value>"+
				    "<references_id></references_id>"+
				    "<status>pending</status>"+
				    "</de_duplication>";
				
		fetch_requested_data('',de_duplication_data,function(results)
		{
			results.forEach(function(result)
			{
				if(result.slave_id!==result.master_id)
				{
					//////deleting the slave record from master table
					var slave_xml="<"+result.tablename+">" +
							"<id>"+result.slave_id+"</id>" +
							"</"+result.tablename+">";
					
					if(is_online())
					{
						server_delete_simple(slave_xml);
					}
					else
					{
						local_delete_simple(slave_xml);
					}
					
					//////replacing slave values with master values
					var refs_array=result.references_value.split(";");
					refs_array.forEach(function(refs)
					{
						var refs_split=refs.split("--");
						var tablename=refs_split[0];
						var column=refs_split[1];
						
						if(tablename!=="" && tablename!==null)
						{	
							var refs_data="<"+tablename+">" +
									"<id></id>" +
									"<"+column+" exact='yes'>"+result.slave_value+"</"+column+">" +
									"</"+tablename+">";
							fetch_requested_data('',refs_data,function(ref_results)
							{
								ref_results.forEach(function(ref_result)
								{
									var refs_xml="<"+tablename+">" +
											"<id>"+ref_result.id+"</id>" +
											"<"+column+">"+result.master_value+"</"+column+">" +
											"<last_updated>"+get_my_time()+"</last_updated>" +
											"</"+tablename+">";
									if(is_online())
									{
										server_update_simple(refs_xml);
									}
									else
									{
										local_update_simple(refs_xml);
									}
								});
							});
						}
					});
					
					////replacing slave ids with master ids
					var ref_ids_array=result.references_id.split(";");
					ref_ids_array.forEach(function(ref_ids)
					{
						var ref_ids_split=ref_ids.split("--");
						var tablename=ref_ids_split[0];
						var column=ref_ids_split[1];
						
						if(tablename!=="" && tablename!==null)
						{
							var ref_ids_data="<"+tablename+">" +
									"<id></id>" +
									"<"+column+" exact='yes'>"+result.slave_id+"</"+column+">" +
									"</"+tablename+">";
							fetch_requested_data('',ref_ids_data,function(ref_id_results)
							{
								ref_id_results.forEach(function(ref_id_result)
								{
									var ref_ids_xml="<"+tablename+">" +
											"<id>"+ref_id_result.id+"</id>" +
											"<"+column+">"+result.master_id+"</"+column+">" +
											"<last_updated>"+get_my_time()+"</last_updated>" +
											"</"+tablename+">";
									if(is_online())
									{
										server_update_simple(ref_ids_xml);
									}
									else
									{
										local_update_simple(ref_ids_xml);
									}
								});
							});
						}
					});
					
				}
				
				/////marking the record as closed in de-duplication table
				var de_duplication_xml="<de_duplication>" +
						"<id>"+result.id+"</id>" +
						"<status>closed</status>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</de_duplication>";
				if(is_online())
				{
					server_update_simple(de_duplication_xml);
				}
				else
				{
					local_update_simple(de_duplication_xml);
				}
			});
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @modalNo 53
 * @modal Scheme to customer
 */
function modal53_action(item_name,customer)
{
	var bills_data="<bills>" +
			"<id></id>" +
			"<customer_name exact='yes'>"+customer+"</customer_name>" +
			"</bills>";
	get_single_column_data(function(bills)
	{
		var bill_id_string="--";
		for(var i in bills)
		{
			bill_id_string+=bills[i]+"--";
		}
		
		var bill_items_data="<bill_items count='5'>" +
				"<id></id>" +
				"<item_name exact='yes'>"+item_name+"</item_name>" +
				"<p_quantity></p_quantity>" +
				"<f_quantity></f_quantity>" +
				"<batch></batch>" +
				"<bill_id array='yes'>"+bill_id_string+"</bill_id>" +
				"</bill_items>";
		fetch_requested_data('',bill_items_data,function(bill_items)
		{
			var item_table=document.getElementById("modal53_table");
			item_table.innerHTML="";
			var item_head=document.createElement('tr');
			item_head.innerHTML="<th>Batch</th><th>Quantity</th>";
			item_table.appendChild(item_head);
			bill_items.forEach(function(bill_item)
			{
				var item_row=document.createElement('tr');
				item_row.innerHTML="<td>"+bill_item.batch+"</td><td>"+bill_item.p_quantity+"+"+bill_item.f_quantity+"</td>";
				item_table.appendChild(item_row);
			});
			
			$("#modal53").dialog("open");
		});
	},bills_data);
}

/**
 * @modalNo 54
 * @modal Scheme from suppliers
 */
function modal54_action(item_name)
{
	var bill_items_data="<supplier_bill_items count='5'>" +
			"<id></id>" +
			"<product_name exact='yes'>"+item_name+"</product_name>" +
			"<p_quantity></p_quantity>" +
			"<f_quantity></f_quantity>" +
			"<batch></batch>" +
			"</supplier_bill_items>";
	fetch_requested_data('',bill_items_data,function(bill_items)
	{
		var item_table=document.getElementById("modal54_table");
		item_table.innerHTML="";
		var item_head=document.createElement('tr');
		item_head.innerHTML="<th>Batch</th><th>Quantity</th>";
		item_table.appendChild(item_head);
		bill_items.forEach(function(bill_item)
		{
			var item_row=document.createElement('tr');
			item_row.innerHTML="<td>"+bill_item.batch+"</td><td>"+bill_item.p_quantity+"+"+bill_item.f_quantity+"</td>";
			item_table.appendChild(item_row);
		});
	});
	////////////////////////////////////////////////
		
	$("#modal54").dialog("open");
}

/**
 * @modalNo 57
 * @modal Pricing History
 */
function modal57_action(item_name,customer)
{
	var bills_data="<bills>" +
			"<id></id>" +
			"<customer_name exact='yes'>"+customer+"</customer_name>" +
			"</bills>";
	get_single_column_data(function(bills)
	{
		var bill_id_string="--";
		for(var i in bills)
		{
			bill_id_string+=bills[i]+"--";
		}
		
		var bill_items_data="<bill_items count='5'>" +
				"<id></id>" +
				"<item_name exact='yes'>"+item_name+"</item_name>" +
				"<quantity></quantity>" +
				"<total></total>" +
				"<bill_id array='yes'>"+bill_id_string+"</bill_id>" +
				"</bill_items>";
		fetch_requested_data('',bill_items_data,function(bill_items)
		{
			var item_table=document.getElementById("modal57_bill_table");
			item_table.innerHTML="";
			var item_head=document.createElement('tr');
			item_head.innerHTML="<th>Quantity</th><th>Total</th>";
			item_table.appendChild(item_head);
			bill_items.forEach(function(bill_item)
			{
				var item_row=document.createElement('tr');
				item_row.innerHTML="<td>"+bill_item.quantity+"</td><td>"+bill_item.total+"</td>";
				item_table.appendChild(item_row);
			});
		});
	},bills_data);
	
	var quot_data="<quotation>" +
			"<id></id>" +
			"<customer exact='yes'>"+customer+"</customer>" +
			"</quotation>";
	get_single_column_data(function(quots)
	{
		var quot_id_string="--";
		for(var i in quots)
		{
			quot_id_string+=quots[i]+"--";
		}
		
		var quot_items_data="<quotation_items count='5'>" +
				"<id></id>" +
				"<item_name exact='yes'>"+item_name+"</item_name>" +
				"<quantity></quantity>" +
				"<total></total>" +
				"<quotation_id array='yes'>"+quot_id_string+"</quotation_id>" +
				"</quotation_items>";
		fetch_requested_data('',quot_items_data,function(quot_items)
		{
			var item_table=document.getElementById("modal57_quot_table");
			item_table.innerHTML="";
			var item_head=document.createElement('tr');
			item_head.innerHTML="<th>Quantity</th><th>Total</th>";
			item_table.appendChild(item_head);
			quot_items.forEach(function(quot_item)
			{
				var item_row=document.createElement('tr');
				item_row.innerHTML="<td>"+quot_item.quantity+"</td><td>"+quot_item.total+"</td>";
				item_table.appendChild(item_row);
			});
		});
	},quot_data);
	
	$("#modal57").dialog("open");
}


/**
 * @modalNo 101
 * @modal Update service request details
 * @param button
 */
function modal101_action(request_id)
{
	var form=document.getElementById('modal101_form');
	
	var request_id=form.elements[1];
	var machine_filter=form.elements[2];
	var problem_type_filter=form.elements[3];
	var problem_filter=form.elements[4];

	var request_data="<service_requests count='1'>"+
						"<id>"+request_id+"</id>"+						
						"<machine_type></machine_type>"+
						"<problem_type></problem_type>"+
						"<notes></notes>"+
						"</service_requests>";	
	fetch_requested_data('',request_data,function(requests)
	{
		if(requests.length>0)
		{
			machine_filter.value=requests[0].machine_type;
			problem_type_filter.value=requests[0].problem_type;
			problem_filter.value=requests[0].notes;
		}
	});
		
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var machine=machine_filter.value;
		var problem_type=problem_type_filter.value;
		var problem=problem_filter.value;
		var last_updated=get_my_time();

		var request_xml="<service_requests>" +
					"<id>"+request_id+"</id>" +
					"<machine_type>"+machine+"</machine_type>" +
					"<problem_type>"+problem_type+"</problem_type>" +
					"<notes>"+problem+"</notes>"+						
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_requests>";
		if(is_online())
		{
			server_update_simple(request_xml);
		}
		else
		{
			local_update_simple(request_xml);
		}	
		
		$("#modal101").dialog("close");
	});
	
	$("#modal101").dialog("open");
}

/**
 * @modalNo 102
 * @modal re-assign service request
 * @param button
 */
function modal102_action(request_id)
{
	var form=document.getElementById('modal102_form');
	
	var request_id=form.elements[1];
	var assignee_filter=form.elements[2];

	var request_data="<service_requests count='1'>"+
						"<assignee></assignee>"+						
						"<id>"+request_id+"</id>"+						
						"</service_requests>";
	set_my_value(request_data,assignee_filter);	
		
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var assignee=assignee_filter.value;
		var last_updated=get_my_time();

		var request_xml="<service_requests>" +
					"<id>"+request_id+"</id>" +
					"<assignee>"+assignee+"</assignee>"+						
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_requests>";
		if(is_online())
		{
			server_update_simple(request_xml);
		}
		else
		{
			local_update_simple(request_xml);
		}	
		
		$("#modal102").dialog("close");
	});
	
	$("#modal102").dialog("open");
}

/**
 * @modalNo 103
 * @modal close service request
 * @param button
 */
function modal103_action(button)
{
	var form=document.getElementById('modal103_form');

	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);

	var request_id=father_form.elements[0].value;
	form.elements[1].value=request_id;
	var closing_filter=form.elements[2];
	var status_filter=form.elements[3];

	set_static_value_list('service_requests','status',status_filter);
	var request_data="<service_requests count='1'>"+
						"<id>"+request_id+"</id>"+						
						"<closing_notes></closing_notes>"+
						"<status></status>"+						
						"</service_requests>";
	fetch_requested_data('',request_data,function(requests)
	{
		if(requests.length>0)
		{
			closing_filter.value=requests[0].closing_notes;
			status_filter.value=requests[0].status;
		}
	});
		
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var closing_notes=closing_filter.value;
		var status=status_filter.value;
		var last_updated=get_my_time();
		father_form.elements[3].value=status;
		
		var request_xml="<service_requests>" +
					"<id>"+request_id+"</id>" +
					"<closing_notes>"+closing_notes+"</closing_notes>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_requests>";
		if(is_online())
		{
			server_update_simple(request_xml);
		}
		else
		{
			local_update_simple(request_xml);
		}	
		
		$("#modal103").dialog("close");
	});
	
	$("#modal103").dialog("open");
}

/**
 * @modalNo 104
 * @modal close machine service
 * @param button
 */
function modal104_action(button)
{
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);

	var machine_name=father_form.elements[1].value;
	var data_id=father_form.elements[5].value;

	var form=document.getElementById('modal104_form');
	form.elements[1].value=machine_name;
	var closing_filter=form.elements[2];
	var status_filter=form.elements[3];

	set_static_value_list('service_request_machines','status',status_filter);
	var request_data="<service_request_machines count='1'>"+
						"<id>"+data_id+"</id>"+
						"<closing_notes></closing_notes>"+
						"<status></status>"+
						"</service_request_machines>";
	fetch_requested_data('',request_data,function(requests)
	{
		if(requests.length>0)
		{
			closing_filter.value=requests[0].closing_notes;
			status_filter.value=requests[0].status;
		}
	});
		
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var closing_notes=closing_filter.value;
		var status=status_filter.value;
		var last_updated=get_my_time();
		father_form.elements[4].value=status;
		father_form.elements[3].value=closing_notes;
		
		var request_xml="<service_request_machines>" +
					"<id>"+data_id+"</id>" +
					"<closing_notes>"+closing_notes+"</closing_notes>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_machines>";
		if(is_online())
		{
			server_update_simple(request_xml);
		}
		else
		{
			local_update_simple(request_xml);
		}
		$("#modal104").dialog("close");
	});

	$("#modal104").dialog("open");
}


/**
 * @modalNo 105
 * @modal Add project phase
 * @param button
 */
function modal105_action(project_id)
{
	var form=document.getElementById('modal105_form');

	var start_filter=form.elements[3];
	var due_filter=form.elements[4];
	var status_filter=form.elements[5];

	$(start_filter).datepicker();
	$(due_filter).datepicker();
	set_static_value_list('project_phases','status',status_filter);
		
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		
		var phase=form.elements[1].value;
		var details=form.elements[2].value;
		var start_date=get_raw_time(form.elements[3].value);
		var due_date=get_raw_time(form.elements[4].value);
		var status=form.elements[5].value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<project_phases>" +
					"<id>"+data_id+"</id>" +
					"<project_id>"+project_id+"</project_id>" +
					"<phase_name>"+phase+"</phase_name>" +
					"<details>"+details+"</details>" +
					"<start_date>"+start_date+"</start_date>" +
					"<due_date>"+due_date+"</due_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</project_phases>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		
		$("#modal105").dialog("close");
	});
	
	$("#modal105").dialog("open");
}

/**
 * @modalNo 106
 * @modal Add Ledger Entry
 * @param button
 */
function modal106_action()
{
	var form=document.getElementById('modal106_form');

	var account_filter=form.elements[1];
	var type_filter=form.elements[3];

	set_static_value_list('modal106','type',type_filter);
	var account_data="<accounts>"+
						"<acc_name></acc_name>"+
						"</accounts>";	
	set_my_value_list(account_data,account_filter);
		
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		
		var account=form.elements[1].value;
		var particulars=form.elements[2].value;
		var type='received';		
		var receiver='master';
		var giver=account;
		if(form.elements[3].value=='debit')
		{
			type='paid';
			receiver=account;
			giver='master';
		}		
		var amount=form.elements[4].value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<payments>" +
					"<id>"+data_id+"</id>" +
					"<acc_name>"+account+"</acc_name>" +
					"<type>"+type+"</type>" +
					"<total_amount>"+amount+"</total_amount>" +
					"<paid_amount>0</paid_amount>"+
					"<status>pending</status>"+
					"<date>"+last_updated+"</date>"+
					"<transaction_id>"+data_id+"</transaction_id>"+
					"<source_info>"+particulars+"</source_info>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";
		var pt_xml="<transactions>" +
						"<id>"+data_id+"</id>" +
						"<trans_date>"+last_updated+"</trans_date>" +
						"<amount>"+amount+"</amount>" +
						"<receiver>"+receiver+"</receiver>" +
						"<giver>"+giver+"</giver>" +
						"<tax>0</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		
		$("#modal106").dialog("close");
	});
	
	$("#modal106").dialog("open");
}

/**
 * @modalNo 107
 * @modal Update project phase
 * @param button
 */
function modal107_action(data_id)
{
	var form=document.getElementById('modal107_form');

	var start_filter=form.elements[3];
	var due_filter=form.elements[4];
	var status_filter=form.elements[5];

	$(start_filter).datepicker();
	$(due_filter).datepicker();
	set_static_value_list('project_phases','status',status_filter);
		
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		
		var phase=form.elements[1].value;
		var details=form.elements[2].value;
		var start_date=get_raw_time(form.elements[3].value);
		var due_date=get_raw_time(form.elements[4].value);
		var status=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<project_phases>" +
					"<id>"+data_id+"</id>" +
					"<phase_name>"+phase+"</phase_name>" +
					"<details>"+details+"</details>" +
					"<start_date>"+start_date+"</start_date>" +
					"<due_date>"+due_date+"</due_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</project_phases>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}	
		$("#modal107").dialog("close");
	});

	var phase_data="<project_phases count='1'>"+
						"<id>"+data_id+"</id>"+
						"<phase_name></phase_name>"+
						"<details></details>"+
						"<start_date></start_date>"+
						"<due_date></due_date>"+
						"<status></status>"+
						"</project_phases>";
	fetch_requested_data('',phase_data,function(phases)
	{
		phases.forEach(function(phase)
		{
			form.elements[1].value=phase.phase_name;
			form.elements[2].value=phase.details;
			form.elements[3].value=get_my_past_date(phase.start_date);
			form.elements[4].value=get_my_past_date(phase.due_date);
			form.elements[5].value=phase.status;
		});
		$("#modal107").dialog("open");
	});
}

/**
 * @modalNo 108
 * @modal Workflow Assignees (Record level)
 * @param button
 */
function modal108_action(tablename,record_id)
{
	var form=document.getElementById('modal108_form');

	var type_filter=form.elements[1];
	var user_type_filter=form.elements[2];
	var user_filter=form.elements[3];
	var user_field_filter=form.elements[4];
	var field_filter=form.elements[5];
	var value_filter=form.elements[6];

	$(user_type_filter).off('blur');
	$(user_type_filter).on('blur',function()
	{
		$(user_filter).hide();
		$(user_field_filter).hide();

		if(user_type_filter.value=='user')
		{
			$(user_filter).show();
		}
		else if(user_type_filter.value=='field')
		{
			$(user_field_filter).show();
		}
	});

	set_static_value_list('data_access','access_type',type_filter);
	
	var user_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	set_my_value_list(user_data,user_filter);
	
	var field_data="<user_fields_list>"+
				"<field_name></field_name>"+
				"<tablename exact='yes'>"+tablename+"</tablename>"+
				"</user_fields_list>";		
	set_my_value_list(field_data,user_filter);
	
	var field_data="<data_access>" +
			"<criteria_field></criteria_field>" +
			"<tablename exact='yes'>"+tablename+"</tablename>" +
			"</data_access>";
	set_my_filter(field_data,field_filter);
	
	$(type_filter).focus();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		
		var access_type=form.elements[1].value;
		var user_type=form.elements[2].value;
		var user=form.elements[3].value;
		var user_field=form.elements[4].value;
		var criteria_field=form.elements[5].value;
		var criteria_value=form.elements[6].value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<data_access>" +
					"<id>"+data_id+"</id>" +
					"<tablename>"+tablename+"</tablename>" +
					"<record_id>"+record_id+"</record_id>" +
					"<access_type>"+access_type+"</access_type>" +
					"<user_type>"+user_type+"</user_type>" +
					"<user>"+user+"</user>" +
					"<user_field>"+user_field+"</user_field>" +
					"<criteria_field>"+criteria_field+"</criteria_field>" +
					"<criteria_value>"+criteria_value+"</criteria_value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
	
		$("#modal108").dialog("close");
	});
	$("#modal108").dialog("open");

}

/**
 * @modalNo 109
 * @modal Workflow Assignees
 * @param button
 */
function modal109_action(tablename)
{
	var form=document.getElementById('modal109_form');

	var type_filter=form.elements[1];
	var user_type_filter=form.elements[2];
	var user_filter=form.elements[3];
	var user_field_filter=form.elements[4];
	var field_filter=form.elements[5];
	var value_filter=form.elements[6];

	$(user_field_filter).parent().hide();

	$(user_type_filter).off('blur');
	$(user_type_filter).on('blur',function()
	{
		$(user_filter).parent().hide();
		$(user_field_filter).parent().hide();

		if(user_type_filter.value=='user')
		{
			$(user_filter).parent().show();
		}
		else if(user_type_filter.value=='field')
		{
			$(user_field_filter).parent().show();
		}
	});

	set_static_value_list('data_access','access_type',type_filter);
	
	var user_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	set_my_value_list(user_data,user_filter);
	
	var field_data="<user_fields_list>"+
				"<field_name></field_name>"+
				"<tablename exact='yes'>"+tablename+"</tablename>"+
				"</user_fields_list>";		
	set_my_value_list(field_data,user_filter);
	
	var field_data="<data_access>" +
				"<criteria_field></criteria_field>" +
				"<tablename exact='yes'>"+tablename+"</tablename>" +
				"</data_access>";
	set_my_filter(field_data,field_filter);
	
	$(type_filter).focus();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		
		var access_type=form.elements[1].value;
		var user_type=form.elements[2].value;
		var user=form.elements[3].value;
		var user_field=form.elements[4].value;
		var criteria_field=form.elements[5].value;
		var criteria_value=form.elements[6].value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<data_access>" +
					"<id>"+data_id+"</id>" +
					"<tablename>"+tablename+"</tablename>" +
					"<record_id>all</record_id>" +
					"<access_type>"+access_type+"</access_type>" +
					"<user_type>"+user_type+"</user_type>" +
					"<user>"+user+"</user>" +
					"<user_field>"+user_field+"</user_field>" +
					"<criteria_field>"+criteria_field+"</criteria_field>" +
					"<criteria_value>"+criteria_value+"</criteria_value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
	
		$("#modal109").dialog("close");
	});
	
	$("#modal109").dialog("open");

}

/**
 * @modalNo 110
 * @modal Add to inventory
 * @param button
 */
function modal110_action(button)
{
	var form_id=$(button).attr('form');
	var master_form=document.getElementById(form_id);
	var product_name=master_form.elements[0].value;
	var batch=master_form.elements[1].value;
	var quantity=master_form.elements[2].value;	
	var data_id=master_form.elements[5].value;

	var form=document.getElementById('modal110_form');

	var manu_filter=form.elements[1];
	var expiry_filter=form.elements[2];
	var store_filter=form.elements[5];
	
	var store_data="<store_areas>"+
					"<name></name>"+
					"<area_type exact='yes'>storage</area_type>"+					
					"</store_areas>";
	set_my_value_list(store_data,store_filter);
	
	$(manu_filter).datepicker();
	$(expiry_filter).datepicker();	
	$(manu_filter).focus();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		
		master_form.elements[4].value='completed';
		var last_updated=get_my_time();
		var manu_date=get_raw_time(form.elements[1].value);
		var expiry_date=get_raw_time(form.elements[2].value);
		var cost_price=form.elements[3].value;
		var sale_price=form.elements[4].value;
		var store=form.elements[5].value;
		var id=get_new_key();
		var data_xml="<manufacturing_schedule>" +
					"<id>"+data_id+"</id>" +
					"<status>completed</status>"+					
					"<last_updated>"+last_updated+"</last_updated>" +
					"</manufacturing_schedule>";
		var inventory_xml="<inventory_adjust>"+
					"<id>"+id+"</id>"+						
					"<product_name>"+product_name+"</product_name>"+
					"<batch>"+batch+"</batch>"+
					"<quantity>"+quantity+"</quantity>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</inventory_adjust>";	
		var area_xml="<area_utilization>"+
					"<id>"+id+"</id>"+
					"<item_name>"+product_name+"</item_name>"+
					"<batch>"+batch+"</batch>"+
					"<name>"+store+"</name>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</area_utilization>";		
		var instances_xml="<product_instances>" +
					"<id>"+id+"</id>" +
					"<product_name>"+product_name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<expiry>"+expiry_date+"</expiry>" +
					"<manufacture_date>"+manu_date+"</manufacture_date>" +
					"<cost_price>"+cost_price+"</cost_price>" +
					"<sale_price>"+sale_price+"</sale_price>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_instances>";
		var store_owner_xml="<store_areas>"+
							"<owner></owner>"+
							"<name exact='yes'>"+store+"</name>"+
							"</store_areas>";
		get_single_column_data(function(owners)
		{
			if(owners.length>0)
			{
				var store_xml="<store_movement>"+
					"<id>"+get_new_key()+"</id>"+
					"<item_name>"+product_name+"</item_name>"+
					"<batch>"+batch+"</batch>"+
					"<quantity>"+quantity+"</quantity>"+
					"<target>"+store+"</target>"+
					"<source>manufacturing</source>"+
					"<receiver>"+owners[0]+"</receiver>"+
					"<status>received</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";		
				if(is_online())
				{
					server_create_simple(store_xml);
				}
				else
				{
					local_create_simple(store_xml);
				}				
			}		
		},store_owner_xml);

		////adding sale price fields for all billing types///////
		var billing_type_data="<bill_types>" +
			"<name></name>" +
			"<status exact='yes'>active</status>" +
			"</bill_types>";
		get_single_column_data(function(bill_types)
		{
			var i=1;
			bill_types.forEach(function (bill_type) 
			{
				i++;
				var sale_price_xml="<sale_prices>" +
						"<id>"+(id+i)+"</id>" +
						"<product_name>"+product_name+"</product_name>" +
						"<batch>"+batch+"</batch>" +
						"<sale_price>"+sale_price+"</sale_price>" +
						"<pi_id>"+id+"</pi_id>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</sale_prices>";
				if(is_online())
				{
					server_create_simple(sale_price_xml);
				}
				else
				{
					local_create_simple(sale_price_xml);
				}
			});
		},billing_type_data);
		
		if(is_online())
		{
			server_update_simple(data_xml);
			server_create_simple(inventory_xml);
			server_create_simple(instances_xml);
			server_create_simple(area_xml);
		}
		else
		{
			local_update_simple(data_xml);
			local_create_simple(inventory_xml);
			local_create_simple(instances_xml);
			local_create_simple(area_xml);
		}	
	
		$("#modal110").dialog("close");
	});

	$("#modal110").dialog("open");	
}

/**
 * @modalNo 111
 * @modal Log Location
 * @param button
 */
function modal111_action()
{
	if(navigator && navigator.geolocation)
	{
		show_loader();
		navigator.geolocation.getCurrentPosition(function(position)
		{
			var form=document.getElementById('modal111_form');
			var flocation=form.elements[1];
			var fname=form.elements[2];
			var ftime=form.elements[3];
			var flat=form.elements[4];
			var flng=form.elements[5];
			
			ftime.value=get_my_datetime();
			fname.value=get_account_name();
			flat.value=position.coords.latitude;
			flng.value=position.coords.longitude;
							
			$(form).off("submit");
			$(form).on("submit",function(event)
			{
				event.preventDefault();
				
				var data_id=get_new_key();
				var last_updated=get_my_time();
				var data_xml="<location_history>" +
							"<id>"+data_id+"</id>" +
							"<acc_name>"+fname.value+"</acc_name>" +
							"<lat>"+flat.value+"</lat>" +
							"<lng>"+flng.value+"</lng>" +
							"<location>"+flocation.value+"</location>" +
							"<log_time>"+get_raw_time(ftime.value)+"</log_time>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</location_history>";	
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>location_history</tablename>" +
							"<link_to>form86</link_to>" +
							"<title>Logged</title>" +
							"<notes>Location for user "+fname.value+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_create_row(data_xml,activity_xml);
				}
				else
				{
					local_create_row(data_xml,activity_xml);
				}	
				
				$("#modal111").dialog("close");
			});
			hide_loader();
			$("#modal111").dialog("open");
		},function()
		{
			$("#modal56").dialog("open");
			console.log('error in getting geo-location');
			hide_loader();
		});
	}
}


/**
 * @modalNo 112
 * @modal Add new product
 * @param button
 */
function modal112_action(func)
{
	var form=document.getElementById('modal112_form');
	
	var fname=form.elements[1];
	var fmake=form.elements[2];
	var fdescription=form.elements[3];
	var fpictureinfo=form.elements[4];
	var fpicture=form.elements[5];
		
	var make_data="<product_master>" +
		"<make></make>" +
		"</product_master>";
	set_my_filter(make_data,fmake);
	
	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";			
		});
	},false);
	
	////adding attribute fields///////
	var attribute_label=document.getElementById('modal112_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>product</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}				
				else 
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}				
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});
	
	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=form.elements[1].value;
			var make=form.elements[2].value;
			var description=form.elements[3].value;
			var tax=form.elements[6].value;
			var data_id=get_new_key();
			var pic_id=get_new_key();
			var cost_price=form.elements[7].value;
			var sale_price=form.elements[8].value;
			var url=$(fpictureinfo).find('div').find('img').attr('src');
			var last_updated=get_my_time();
			var data_xml="<product_master>" +
							"<id>"+data_id+"</id>" +
							"<make>"+make+"</make>" +
							"<name>"+name+"</name>" +
							"<description>"+description+"</description>" +
							"<tax>"+tax+"</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</product_master>";	
			var instance_xml="<product_instances>"+
							"<id>"+data_id+"</id>"+
							"<product_name>"+name+"</product_name>"+
							"<batch>"+name+"</batch>"+
							"<cost_price>"+cost_price+"</cost_price>"+
							"<sale_price>"+sale_price+"</sale_price>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</product_instances>";			
			var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>product_master</tablename>" +
							"<link_to>form39</link_to>" +
							"<title>Added</title>" +
							"<notes>Product "+name+" to inventory</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
			if(is_online())
			{
				server_create_row_func(data_xml,activity_xml,func);
				server_create_simple(instance_xml);
			}
			else
			{
				local_create_row_func(data_xml,activity_xml,func);
				local_create_simple(instance_xml);
			}	

			////adding sale price fields for all billing types///////
			var billing_type_data="<bill_types>" +
					"<name></name>" +
					"<status exact='yes'>active</status>" +
					"</bill_types>";
			get_single_column_data(function(bill_types)
			{
				bill_types.forEach(function(bill_type)
				{				
					var id=get_new_key();
					var sale_price_xml="<sale_prices>" +
							"<id>"+id+"</id>" +
							"<product_name>"+name+"</product_name>" +
							"<batch>"+name+"</batch>" +
							"<sale_price>"+sale_price+"</sale_price>" +
							"<pi_id>"+data_id+"</pi_id>" +
							"<billing_type>"+bill_type+"</billing_type>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</sale_prices>";
					if(is_online())
					{
						server_create_simple(sale_price_xml);
					}
					else
					{
						local_create_simple(sale_price_xml);
					}
				});
			},billing_type_data);
			////////////////////////////////////////////////
	
			var id=get_new_key();
			$("#modal112_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+name+"</name>" +
							"<type>product</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});

			if(url!="")
			{
				var pic_xml="<documents>" +
							"<id>"+pic_id+"</id>" +
							"<url>"+url+"</url>" +
							"<doc_type>product_master</doc_type>" +
							"<target_id>"+data_id+"</target_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</documents>";
				if(is_online())
				{
					server_create_simple(pic_xml);
				}
				else
				{
					local_create_simple(pic_xml);
				}	
			}
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal112").dialog("close");
	});
	
	$("#modal112").dialog("open");
}