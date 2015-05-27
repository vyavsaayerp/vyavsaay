/**
 * @form Create Newsletter
 * @param button
 */
function form2_create_item(form)
{
	if(is_create_access('form2'))
	{
		if(is_online())
		{
			var nl_id=document.getElementById('form2_master').elements[3].value;
			var type=form.elements[0].value;
			var name=form.elements[1].value;
			var detail=form.elements[2].value;
			var url=form.elements[3].value;
			var column_size=form.elements[6].value;
			var data_id=form.elements[7].value;
			var blob=$("#img_form2_"+data_id).attr('src');
			var blob_name="client_images/"+data_id+".jpeg";
			var del_button=form.elements[9];
			var last_updated=get_my_time();
			var data_xml="<newsletter_items>" +
						"<id>"+data_id+"</id>" +
						"<item_name>"+name+"</item_name>" +
						"<item_type>"+type+"</item_type>" +
						"<item_detail>"+detail+"</item_detail>" +
						"<nl_id>"+nl_id+"</nl_id>" +
						"<url>"+url+"</url>"+
						"<data_blob>"+blob+"</data_blob>"+
						"<pic_url>"+blob_name+"</pic_url>"+
						"<column_size>"+column_size+"</column_size>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</newsletter_items>";
			
			$.ajax
			({
				type: "POST",
				url: "./ajax/save_image.php",
				data: {
					blob: blob,
					name:blob_name
				}
			});
		
			server_create_simple(data_xml);
			
			for(var i=0;i<7;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
			del_button.removeAttribute("onclick");
			$(del_button).on('click',function(event)
			{
				form2_delete_item(del_button);
			});
			
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
			});
		}
		else
		{
			$("#modal6").dialog("open");		
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create NewsLetter
 * @param button
 */
function form2_create_form()
{
	if(is_create_access('form2'))
	{
		var form=document.getElementById("form2_master");

		var name=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[3].value;
		var save_button=form.elements[4];	

		var last_updated=get_my_time();
		var data_xml="<newsletter>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<description>"+description+"</description>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</newsletter>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>newsletter</tablename>" +
					"<link_to>form2</link_to>" +
					"<title>Created</title>" +
					"<notes>NewsLetter "+name+"</notes>" +
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
	
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form2_update_form();
		});
		
		$("[id^='save_form2_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}


/**
 * @form Attendance
 * @param button
 */
function form7_create_item(form)
{
	if(is_create_access('form1'))
	{
		var name=form.elements[0].value;
		var presence=form.elements[1].value;
		var hours=form.elements[2].value;
		var data_id=form.elements[3].value;
		var date=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<attendance>" +
					"<id>"+data_id+"</id>" +
					"<acc_name>"+name+"</acc_name>" +
					"<presence>"+presence+"</presence>" +
					"<date>"+date+"</date>" +
					"<hours_worked>"+hours+"</hours_worked>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attendance>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
				
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form7_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
	
}


/**
 * @form Service bill
 * @param button
 */
function form10_create_item(form)
{
	if(is_create_access('form10'))
	{
		var bill_id=document.getElementById("form10_master").elements[4].value;
		
		var name=form.elements[0].value;
		var staff=form.elements[1].value;
		var notes=form.elements[2].value;
		var price=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var offer=form.elements[8].value;
		var data_id=form.elements[9].value;
		var last_updated=get_my_time();
		var free_service_name=form.elements[12].value;
		
		var pre_requisite_data="<pre_requisites>" +
				"<type exact='yes'>service</type>" +
				"<requisite_type exact='yes'>task</requisite_type>" +
				"<name exact='yes'>"+name+"</name>" +
				"<requisite_name></requisite_name>" +
				"<quantity></quantity>" +
				"</pre_requisites>";
		fetch_requested_data('',pre_requisite_data,function(pre_requisites)
		{
			var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+name+"</item_name>" +
					"<unit_price>"+price+"</unit_price>" +
					"<notes>"+notes+"</notes>" +
					"<staff>"+staff+"</staff>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<offer>"+offer+"</offer>" +
					"<type>bought</type>" +
					"<tax>"+tax+"</tax>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";	
			if(is_online())
			{
				server_create_simple(data_xml);
			}
			else
			{
				local_create_simple(data_xml);
			}

			pre_requisites.forEach(function(pre_requisite)
			{
				var task_id=get_new_key();
				var task_xml="<task_instances>" +
						"<id>"+task_id+"</id>" +
						"<name>"+pre_requisite.name+"</name>" +
						"<assignee>"+staff+"</assignee>" +
						"<t_initiated>"+get_my_time()+"</t_initiated>" +
						"<t_due>"+get_task_due_period()+"</t_due>" +
						"<status>pending</status>" +
						"<task_hours>"+pre_requisite.quantity+"</task_hours>" +
						"<source>service</source>" +
						"<source_id>"+data_id+"</source_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</task_instances>";
				var activity_xml="<activity>" +
						"<data_id>"+task_id+"</data_id>" +
						"<tablename>task_instances</tablename>" +
						"<link_to>form14</link_to>" +
						"<title>Added</title>" +
						"<notes>Task "+pre_requisite.name+" assigned to "+staff+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
		
				if(is_online())
				{
					server_create_row(task_xml,activity_xml);
				}
				else
				{
					local_create_row(task_xml,activity_xml);
				}		
			});
		});

		
   	//////adding free service to the bill if applicable
		if(free_service_name!="" && free_service_name!=null)
		{
			var id=get_new_key();
			rowsHTML="<tr>";
				rowsHTML+="<form id='form10_"+id+"'></form>";
                	rowsHTML+="<td>";
                    	rowsHTML+="<input type='text' readonly='readonly' form='form10_"+id+"' value='"+free_service_name+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='text' readonly='readonly' required form='form10_"+id+"' value='"+staff+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<textarea readonly='readonly' required form='form10_"+id+">free with "+name+"</textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form10_"+id+"' value='0'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form10_"+id+"' value='0'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value='free with "+name+"'>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+id+"'>";
                            rowsHTML+="<input type='button' class='save_icon' form='form10_"+id+"' id='save_form10_"+id+"' >";
                            rowsHTML+="<input type='button' class='delete_icon' form='form10_"+id+"' id='delete_form10_"+id+"' onclick='form10_delete_item($(this));'>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value=''>";
                    rowsHTML+="</td>";
            rowsHTML+="</tr>";

         $('#form10_body').prepend(rowsHTML);

    		var free_pre_requisite_data="<pre_requisites>" +
					"<type exact='yes'>service</type>" +
					"<requisite_type exact='yes'>task</requisite_type>" +
					"<name exact='yes'>"+free_service_name+"</name>" +
					"<requisite_name></requisite_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			fetch_requested_data('',free_pre_requisite_data,function(free_pre_requisites)
			{
				var free_xml="<bill_items>" +
							"<id>"+id+"</id>" +
							"<item_name>"+free_service_name+"</item_name>" +
							"<staff>"+staff+"</staff>" +
							"<notes>free with "+name+"</notes>" +
							"<unit_price>0</unit_price>" +
							"<amount>0</amount>" +
							"<total>0</total>" +
							"<discount>0</discount>" +
							"<offer></offer>" +
							"<type>free</type>" +
							"<tax>0</tax>" +
							"<bill_id>"+bill_id+"</bill_id>" +
							"<free_with>"+name+"</free_with>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</bill_items>";
				if(is_online())
				{
					server_create_simple(free_xml);
				}
				else
				{
					local_create_simple(free_xml);
				}
				
				free_pre_requisites.forEach(function(free_pre_requisite)
				{
					var task_id=get_new_key();
					var task_xml="<task_instances>" +
							"<id>"+task_id+"</id>" +
							"<name>"+free_pre_requisite.name+"</name>" +
							"<assignee>"+staff+"</assignee>" +
							"<t_initiated>"+get_my_time()+"</t_initiated>" +
							"<t_due>"+get_task_due_period()+"</t_due>" +
							"<status>pending</status>" +
							"<task_hours>"+free_pre_requisite.quantity+"</task_hours>" +
							"<source>service</source>" +
							"<source_id>"+id+"</source_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</task_instances>";
					var activity_xml="<activity>" +
							"<data_id>"+task_id+"</data_id>" +
							"<tablename>task_instances</tablename>" +
							"<link_to>form14</link_to>" +
							"<title>Added</title>" +
							"<notes>Task "+free_pre_requisite.name+" assigned to "+staff+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
			
					if(is_online())
					{
						server_create_row(task_xml,activity_xml);
					}
					else
					{
						local_create_row(task_xml,activity_xml);
					}		
				});
			});
		}
		///////////added free service///////////
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form10_delete_item(del_button);
		});

		var save_button=form.elements[10];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Service Reciept
 * @param button
 */
function form10_create_form()
{
	if(is_create_access('form10'))
	{
		var form=document.getElementById("form10_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var bill_num=form.elements[3].value;
		var message_string="Bill from: "+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form10_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Price: "+subform.elements[3].value;
		});

		var data_id=form.elements[4].value;
		var transaction_id=form.elements[6].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<free_service_name></free_service_name>" +
				"<offer_detail></offer_detail>" +
				"<status array='yes'>active--extended</status>" +
				"</offers>";
		
		fetch_requested_data('',offer_data,function(offers)
		{
			offers.sort(function(a,b)
			{
				if(a.criteria_amount<b.criteria_amount)
				{	return 1;}
				else 
				{	return -1;}
			});
			
			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else 
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='service free')
				{
					var free_service_name=offers[i].free_service_name;	
					var id=get_new_key();
					rowsHTML="<tr>";
						rowsHTML+="<form id='form10_"+id+"'></form>";
		                	rowsHTML+="<td>";
		                    	rowsHTML+="<input type='text' readonly='readonly' form='form10_"+id+"' value='"+free_service_name+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='text' readonly='readonly' required form='form10_"+id+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<textarea readonly='readonly' required form='form10_"+id+"'>free service</textarea>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                        	rowsHTML+="<input type='number' readonly='readonly' required form='form10_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form10_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value='free on the bill amount'>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+id+"'>";
	                                rowsHTML+="<input type='submit' class='save_icon' form='form10_"+id+"' id='save_form10_"+id+"' >";
	                                rowsHTML+="<input type='button' class='delete_icon' form='form10_"+id+"' id='delete_form10_"+id+"' onclick='form10_delete_item($(this));'>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value=''>";
	                        rowsHTML+="</td>";
	                rowsHTML+="</tr>";

	            $('#form10_body').prepend(rowsHTML);

	        		var free_pre_requisite_data="<pre_requisites>" +
							"<type exact='yes'>service</type>" +
							"<requisite_type exact='yes'>task</requisite_type>" +
							"<name exact='yes'>"+free_service_name+"</name>" +
							"<requisite_name></requisite_name>" +
							"<quantity></quantity>" +
							"</pre_requisites>";
					fetch_requested_data('',free_pre_requisite_data,function(free_pre_requisites)
					{
		             var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_service_name+"</item_name>" +
									"<staff></staff>" +
									"<notes>free service</notes>" +
									"<unit_price>0</unit_price>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+data_id+"</bill_id>" +
									"<free_with>bill</free_with>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
						
						free_pre_requisites.forEach(function(free_pre_requisite)
						{
							var task_id=get_new_key();
							var task_xml="<task_instances>" +
									"<id>"+task_id+"</id>" +
									"<name>"+free_pre_requisite.name+"</name>" +
									"<assignee></assignee>" +
									"<t_initiated>"+get_my_time()+"</t_initiated>" +
									"<t_due>"+get_task_due_period()+"</t_due>" +
									"<status>pending</status>" +
									"<task_hours>"+free_pre_requisite.quantity+"</task_hours>" +
									"<source>service</source>" +
									"<source_id>"+id+"</source_id>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</task_instances>";
							var activity_xml="<activity>" +
									"<data_id>"+task_id+"</data_id>" +
									"<tablename>task_instances</tablename>" +
									"<link_to>form14</link_to>" +
									"<title>Added</title>" +
									"<notes>Task "+free_pre_requisite.name+"</notes>" +
									"<updated_by>"+get_name()+"</updated_by>" +
									"</activity>";
					
							if(is_online())
							{
								server_create_row(task_xml,activity_xml);
							}
							else
							{
								local_create_row(task_xml,activity_xml);
							}		
						});
				
					});
				}
				offer_detail=offers[i].offer_detail;
				break;
			}
			
			
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<bill_num>"+bill_num+"</bill_num>"+
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>service</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Saved</title>" +
						"<notes>Bill no "+bill_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
						"<id>"+transaction_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>"+customer+"</receiver>" +
						"<giver>master</giver>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var pt_tran_id=get_new_key();
			var payment_xml="<payments>" +
						"<id>"+pt_tran_id+"</id>" +
						"<status>closed</status>" +
						"<type>received</type>" +
						"<date>"+get_my_time()+"</date>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+total+"</paid_amount>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<due_date>"+get_credit_period()+"</due_date>" +
						"<mode>"+get_payment_mode()+"</mode>" +
						"<transaction_id>"+pt_tran_id+"</transaction_id>" +
						"<bill_id>"+data_id+"</bill_id>" +
						"<source_info>for sale bill #"+bill_num+"</source_info>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</payments>";
			var pt_xml="<transactions>" +
						"<id>"+pt_tran_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>master</receiver>" +
						"<giver>"+customer+"</giver>" +
						"<tax>0</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var num_data="<user_preferences>"+
						"<id></id>"+						
						"<name exact='yes'>bill_num</name>"+												
						"</user_preferences>";
			get_single_column_data(function (bill_num_ids)
			{
				if(bill_num_ids.length>0)
				{
					var num_xml="<user_preferences>"+
									"<id>"+bill_num_ids[0]+"</id>"+
									"<value>"+(parseInt(bill_num)+1)+"</value>"+
									"</user_preferences>";
					if(is_online())
					{
						server_update_simple(num_xml);
					}
					else 
					{
						local_update_simple(num_xml);
					}
				}
			},num_data);
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction_xml);
				server_create_simple(pt_xml);
				server_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction_xml);
				local_create_simple(pt_xml);
				local_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			
			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			
			var subject="Bill from "+get_session_var('title');
			$('#form10_share').show();
			$('#form10_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});
			
			var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
						"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form10_foot').html(total_row);
		});
		
		var save_button=form.elements[7];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form10_update_form();
		});
		
		$("[id^='save_form10_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Bill
 * @param button
 */
function form12_create_item(form)
{
	if(is_create_access('form12'))
	{
		var bill_id=document.getElementById("form12_master").elements[4].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var price=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var offer=form.elements[8].value;
		var data_id=form.elements[9].value;
		var free_product_name=form.elements[12].value;
		var free_product_quantity=form.elements[13].value;

		var storage=get_session_var('sales_store');		
		
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<amount>"+amount+"</amount>" +
				"<total>"+total+"</total>" +
				"<discount>"+discount+"</discount>" +
				"<offer>"+offer+"</offer>" +
				"<type>bought</type>" +
				"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<free_with></free_with>" +
				"<storage>"+storage+"</storage>"+				
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		//////adding free product to the bill if applicable
		if(free_product_name!="" && free_product_name!=null)
		{
			get_inventory(free_product_name,'',function(free_quantities)
			{
				if(free_quantities>=free_product_quantity)
				{
					var free_batch_data="<bill_items count='1'>" +
							"<batch></batch>" +
							"<item_name exact='yes'>"+free_product_name+"</item_name>" +
							"</bill_items>";
					get_single_column_data(function(data)
					{
						var free_batch="";
						if(data.length>0)
						{
							free_batch=data[0];	
						}
						
						var id=get_new_key();
						rowsHTML="<tr>";
							rowsHTML+="<form id='form12_"+id+"'></form>";
			                	rowsHTML+="<td>";
			                    	rowsHTML+="<input type='text' readonly='readonly' form='form12_"+id+"' value='"+free_product_name+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='text' required form='form12_"+id+"' value='"+free_batch+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='"+free_product_quantity+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='free with "+name+"'>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
		                                rowsHTML+="<input type='button' class='save_icon' form='form12_"+id+"' id='save_form12_"+id+"' >";
		                                rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='form12_delete_item($(this));'>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
		                        rowsHTML+="</td>";
		                rowsHTML+="</tr>";
	
		                $('#form12_body').prepend(rowsHTML);
	
						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_batch+"</batch>" +
									"<unit_price>0</unit_price>" +
									"<quantity>"+free_product_quantity+"</quantity>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+bill_id+"</bill_id>" +
									"<free_with>"+name+"</free_with>" +
									"<storage>"+storage+"</storage>"+				
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
					},free_batch_data);
				}
				else
				{
					$("#modal7").dialog("open");
				}
			});
		}
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form12_delete_item(del_button);
		});

		var save_button=form.elements[10];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Bill
 * @param button
 */
function form12_create_form()
{
	if(is_create_access('form12'))
	{
		var form=document.getElementById("form12_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var bill_num=form.elements[3].value;
		var storage=get_session_var('sales_store');		
		
		var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form12']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[2].value;
			message_string+=" Total: "+subform.elements[4].value;
		});

		var data_id=form.elements[4].value;
		var transaction_id=form.elements[6].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<quantity_add_percent></quantity_add_percent>" +
				"<quantity_add_amount></quantity_add_amount>" +
				"<free_product_name></free_product_name>" +
				"<free_product_quantity></free_product_quantity>" +
				"<offer_detail></offer_detail>" +
				"<status array='yes'>active--extended</status>" +
				"</offers>";
		fetch_requested_data('',offer_data,function(offers)
		{
			offers.sort(function(a,b)
			{
				if(a.criteria_amount<b.criteria_amount)
				{	return 1;}
				else 
				{	return -1;}
			});
			
			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else 
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];	
								}

								var id=get_new_key();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form12_"+id+"'></form>";
					                	rowsHTML+="<td>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form12_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='text' required form='form12_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='button' class='save_icon' form='form12_"+id+"' id='save_form12_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='form12_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form12_body').prepend(rowsHTML);

				                var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<storage>"+storage+"</storage>"+				
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";	
								
								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}
							},free_batch_data);
						}
						else
						{
							$("#modal7").dialog("open");
						}
					});
				}
				offer_detail=offers[i].offer_detail;
				break;
			}
			
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<bill_num></bill_num>"+
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Saved</title>" +
						"<notes>Bill no "+bill_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
						"<id>"+transaction_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>"+customer+"</receiver>" +
						"<giver>master</giver>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var pt_tran_id=get_new_key();
			var payment_xml="<payments>" +
						"<id>"+pt_tran_id+"</id>" +
						"<status>closed</status>" +
						"<type>received</type>" +
						"<date>"+get_my_time()+"</date>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+total+"</paid_amount>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<due_date>"+get_credit_period()+"</due_date>" +
						"<mode>"+get_payment_mode()+"</mode>" +
						"<transaction_id>"+pt_tran_id+"</transaction_id>" +
						"<bill_id>"+data_id+"</bill_id>" +
						"<source_info>for sale bill #"+bill_num+"</source_info>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</payments>";
			var pt_xml="<transactions>" +
						"<id>"+pt_tran_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>master</receiver>" +
						"<giver>"+customer+"</giver>" +
						"<tax>0</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var num_data="<user_preferences>"+
						"<id></id>"+						
						"<name exact='yes'>bill_num</name>"+												
						"</user_preferences>";
			get_single_column_data(function (bill_num_ids)
			{
				if(bill_num_ids.length>0)
				{
					var num_xml="<user_preferences>"+
									"<id>"+bill_num_ids[0]+"</id>"+
									"<value>"+(parseInt(bill_num)+1)+"</value>"+
									"</user_preferences>";
					if(is_online())
					{
						server_update_simple(num_xml);
					}
					else 
					{
						local_update_simple(num_xml);
					}
				}
			},num_data);
						
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction_xml);
				server_create_simple(pt_xml);
				server_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction_xml);
				local_create_simple(pt_xml);
				local_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			
			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			
			var subject="Bill from "+get_session_var('title');
			$('#form12_share').show();
			$('#form12_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});
			
			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form12_foot').html(total_row);
		});

		var save_button=form.elements[7];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form12_update_form();
		});
		
		$("[id^='save_form12_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage Tasks
 * @param button
 */
function form14_create_item(form)
{
	if(is_create_access('form14'))
	{
		var name=form.elements[0].value;
		var assignee=form.elements[1].value;
		var t_due=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var hours=form.elements[7].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<assignee>"+assignee+"</assignee>" +
					"<t_initiated>"+get_my_time()+"</t_initiated>" +
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
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		var message_string="Due time: "+form.elements[2].value+"\nTask: "+name+"\nAssignee:"+assignee;
		message_string=encodeURIComponent(message_string);
		$("#form14_whatsapp_"+data_id).attr('href',"whatsapp://send?text="+message_string);
		$("#form14_whatsapp_"+data_id).show();
		
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form14_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form14_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Enter customer returns 
 * @param button
 */
function form15_create_item(form)
{
	if(is_create_access('form15'))
	{
		var return_id=document.getElementById("form15_master").elements[3].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var notes=form.elements[2].value;
		var quantity=form.elements[3].value;
		var saleable='unchecked';
		if(form.elements[4].checked)
			saleable='checked';
		var type=form.elements[5].value;
		var total_batch=form.elements[6].value;
		var tax=form.elements[7].value;
		var data_id=form.elements[8].value;
		
		var storage=get_session_var('sales_return_store');
		
		var last_updated=get_my_time();
					
		var data_xml="<customer_return_items>" +
				"<id>"+data_id+"</id>" +
				"<return_id>"+return_id+"</return_id>" +
				"<item_name>"+name+"</item_name>" +
				"<notes>"+notes+"</notes>" +
				"<batch>"+batch+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<type>"+type+"</type>" +
				"<saleable>"+saleable+"</saleable>";
		if(type=='refund')
		{
			data_xml+="<refund_amount>"+total_batch+"</refund_amount>";
		}
		else
		{
			data_xml+="<exchange_batch>"+total_batch+"</exchange_batch>";
		}
		data_xml+="<tax>"+tax+"</tax>" +
				"<storage>"+storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</customer_return_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
				
		if(saleable!="checked")
		{
			var discard_id=get_new_key();
			var discard_xml="<discarded>" +
					"<id>"+discard_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<source_id>"+return_id+"</source_id>" +
					"<batch>"+batch+"</batch>" +
					"<source>sale return</source>" +
					"<source_link>form15</source_link>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</discarded>";
			if(is_online())
			{
				server_create_simple(discard_xml);
			}
			else
			{
				local_create_simple(discard_xml);
			}
		}
		
		for(var i=0;i<8;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[12];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form15_delete_item(del_button);
		});

		var save_button=form.elements[11];
		$(save_button).off('click');

	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form manage customer returns
 * @param button
 */
function form15_create_form()
{
	if(is_create_access('form15'))
	{
		var form=document.getElementById("form15_master");
		
		var customer=form.elements[1].value;
		var return_date=get_raw_time(form.elements[2].value);
		var message_string="Returns Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		
		var tax=0;
		var total=0;
		
		$("[id^='save_form15']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[3].value;
			
			if(subform.elements[5].value=='refund')
			{	
				total+=parseFloat(subform.elements[6].value);
				message_string+=" Refund Rs: "+subform.elements[6].value;
			}
			else
			{
				message_string+=" Exchanged";
			}
			tax+=parseFloat(subform.elements[7].value);
		});
		
		message_string+="\nTotal: "+total;
		var subject="Returns Bill from "+get_session_var('title');
		$('#form15_share').show();
		$('#form15_share').click(function()
		{
			modal44_action(customer,subject,message_string);
		});
				
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
			"<td>Refund:</td>" +
			"<td>Rs. "+total+"</td>" +
			"<td></td>" +
			"</tr>";
		$('#form15_foot').html(total_row);
		
		var data_id=form.elements[3].value;
		var transaction_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<customer_returns>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<return_date>"+return_date+"</return_date>" +
					"<total>"+total+"</total>" +
					"<type>product</type>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</customer_returns>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>customer_returns</tablename>" +
					"<link_to>form16</link_to>" +
					"<title>Saved</title>" +
					"<notes>Returns from customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+customer+"</giver>" +
					"<tax>"+(-tax)+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		var pt_tran_id=get_new_key();
		var payment_xml="<payments>" +
					"<id>"+pt_tran_id+"</id>" +
					"<status>pending</status>" +
					"<type>paid</type>" +
					"<date>"+get_my_time()+"</date>" +
					"<total_amount>"+total+"</total_amount>" +
					"<paid_amount>0</paid_amount>" +
					"<acc_name>"+customer+"</acc_name>" +
					"<due_date>"+get_debit_period()+"</due_date>" +
					"<mode>"+get_payment_mode()+"</mode>" +
					"<transaction_id>"+pt_tran_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";
		var pt_xml="<transactions>" +
					"<id>"+pt_tran_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+customer+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(transaction_xml);
			server_create_simple(pt_xml);
			server_create_simple_func(payment_xml,function()
			{
				modal28_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				modal28_action(pt_tran_id);
			});
		}
		
		var save_button=form.elements[5];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form15_update_form();
		});
		$("[id^='save_form15_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Enter supplier returns 
 * @param button
 */
function form19_create_item(form)
{
	if(is_create_access('form19'))
	{
		var return_id=document.getElementById("form19_master").elements[3].value;
		var storage=get_session_var('purchase_return_store');
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var notes=form.elements[2].value;
		var quantity=form.elements[3].value;
		var saleable='unchecked';
		if(form.elements[4].checked)
			saleable='checked';
		var total=form.elements[5].value;
		var tax=form.elements[6].value;
		var data_id=form.elements[7].value;
		
		var last_updated=get_my_time();
			
		var data_xml="<supplier_return_items>" +
				"<id>"+data_id+"</id>" +
				"<return_id>"+return_id+"</return_id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<saleable>"+saleable+"</saleable>" +
				"<refund_amount>"+total+"</refund_amount>" +
				"<tax>"+tax+"</tax>" +
				"<storage>"+storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</supplier_return_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
	
		if(saleable!="checked")
		{
			var discard_id=get_new_key();
			var discard_xml="<discarded>" +
					"<id>"+discard_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<source_id>"+return_id+"</source_id>" +
					"<batch>"+batch+"</batch>" +
					"<source>purchase return</source>" +
					"<source_link>form19</source_link>" +
					"<quantity>"+(-quantity)+"</quantity>" +
					"<storage>"+storage+"</storage>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</discarded>";
			if(is_online())
			{
				server_create_simple(discard_xml);
			}
			else
			{
				local_create_simple(discard_xml);
			}
		}
		
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form19_delete_item(del_button);
		});

		var save_button=form.elements[10];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form enter supplier returns
 * @param button
 */
function form19_create_form()
{
	if(is_create_access('form19'))
	{
		var form=document.getElementById("form19_master");
		
		var supplier=form.elements[1].value;
		var return_date=get_raw_time(form.elements[2].value);
		
		var message_string="Returns from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		
		var total=0;
		var tax=0;
		
		$("[id^='save_form19']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);	
			total+=parseFloat(subform.elements[5].value);
			tax+=parseFloat(subform.elements[6].value);
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[3].value;
			message_string+=" Amount: "+subform.elements[5].value;
		});

		message_string+="\nTotal Refund Rs : "+total;
		
		var subject="Returns from "+get_session_var('title');
		$('#form19_share').show();
		$('#form19_share').click(function()
		{
			modal44_action(supplier,subject,message_string);
		});
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Refund:</td>" +
				"<td>Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form19_foot').html(total_row);

		var data_id=form.elements[3].value;
		var transaction_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<supplier_returns>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<return_date>"+return_date+"</return_date>" +
					"<total>"+total+"</total>" +
					"<tax>"+tax+"</tax>" +
					"<type>product</type>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_returns>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_returns</tablename>" +
					"<link_to>form17</link_to>" +
					"<title>Saved</title>" +
					"<notes>Returns to supplier "+supplier+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+supplier+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		var pt_tran_id=get_new_key();
		var payment_xml="<payments>" +
					"<id>"+pt_tran_id+"</id>" +
					"<status>pending</status>" +
					"<type>received</type>" +
					"<date>"+get_my_time()+"</date>" +
					"<total_amount>"+total+"</total_amount>" +
					"<paid_amount>0</paid_amount>" +
					"<acc_name>"+supplier+"</acc_name>" +
					"<due_date>"+get_credit_period()+"</due_date>" +
					"<mode>"+get_payment_mode()+"</mode>" +
					"<transaction_id>"+pt_tran_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";
		var pt_xml="<transactions>" +
					"<id>"+pt_tran_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+supplier+"</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(transaction_xml);
			server_create_simple(pt_xml);
			server_create_simple_func(payment_xml,function()
			{
				modal26_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				modal26_action(pt_tran_id);
			});
		}
		
		var save_button=form.elements[5];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form19_update_form();
		});
		$("[id^='save_form19_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Purchase Bill
 * @formNo 21
 * @param button
 */
function form21_create_item(form)
{
	if(is_create_access('form21'))
	{
		var bill_id=document.getElementById("form21_master").elements[6].value;
		var name=form.elements[0].value;
		var pquantity=form.elements[1].value;
		var fquantity=form.elements[2].value;
		var quantity=parseFloat(pquantity)+parseFloat(fquantity);
		var total=form.elements[3].value;
		var tax=form.elements[4].value;
		var amount=form.elements[5].value;
		var price=form.elements[6].value;
		var batch=form.elements[8].value;
		var storage=form.elements[9].value;
		var data_id=form.elements[10].value;
		var last_updated=get_my_time();

		var data_xml="<supplier_bill_items>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+batch+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<p_quantity>"+pquantity+"</p_quantity>" +
				"<f_quantity>"+fquantity+"</f_quantity>" +
				"<total>"+total+"</total>" +
				"<tax>"+tax+"</tax>" +
				"<amount>"+amount+"</amount>" +
				"<unit_price>"+price+"</unit_price>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<storage>"+storage+"</storage>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</supplier_bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
				
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[12];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form21_delete_item(del_button);
		});

		var save_button=form.elements[11];
		$(save_button).off('click');
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+name+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && storage!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+name+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				if(is_online())
				{
					server_create_simple(storage_xml);
				}
				else
				{
					local_create_simple(storage_xml);
				}
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New supplier Bill
 * @param button
 */
function form21_create_form()
{
	if(is_create_access('form21'))
	{
		var form=document.getElementById("form21_master");
		
		var supplier=form.elements[1].value;
		var bill_id=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var entry_date=get_raw_time(form.elements[4].value);
		
		var total=0;
		var tax=0;
		var amount=0;
		
		$("[id^='save_form21']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[3].value);
			tax+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
		});

		var discount=0;
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form21_foot').html(total_row);

		var notes=form.elements[5].value;
		var data_id=form.elements[6].value;
		var transaction_id=form.elements[7].value;
		var last_updated=get_my_time();
		
		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Saved</title>" +
					"<notes>Supplier Bill no "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+supplier+"</giver>" +
					"<tax>"+(-tax)+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		var pt_tran_id=get_new_key();
		var payment_xml="<payments>" +
					"<id>"+pt_tran_id+"</id>" +
					"<status>pending</status>" +
					"<type>paid</type>" +
					"<date>"+get_my_time()+"</date>" +
					"<total_amount>"+total+"</total_amount>" +
					"<paid_amount>0</paid_amount>" +
					"<acc_name>"+supplier+"</acc_name>" +
					"<due_date>"+get_debit_period()+"</due_date>" +
					"<mode>"+get_payment_mode()+"</mode>" +
					"<transaction_id>"+pt_tran_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";
		var pt_xml="<transactions>" +
					"<id>"+pt_tran_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+supplier+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(transaction_xml);
			server_create_simple(pt_xml);
			server_create_simple_func(payment_xml,function()
			{
				modal28_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				modal28_action(pt_tran_id);
			});
		}

		var save_button=form.elements[8];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form21_update_form();
		});
		
		$("[id^='save_form21_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Purchase Order
 * @param button
 */
function form24_create_item(form)
{
	if(is_create_access('form24'))
	{
		var order_id=document.getElementById("form24_master").elements[5].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var make=form.elements[2].value;
		var mrp=form.elements[3].value;
		var price=form.elements[4].value;
		var data_id=form.elements[5].value;
		var del_button=form.elements[7];
		var save_button=form.elements[6];
		var last_updated=get_my_time();
		var data_xml="<purchase_order_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<quantity>"+quantity+"</quantity>" +
				"<order_id>"+order_id+"</order_id>" +
				"<make>"+make+"</make>" +
				"<mrp>"+mrp+"</mrp>" +
				"<price>"+price+"</price>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</purchase_order_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form24_delete_item(del_button);
		});
		
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Purchase Order
 * @param button
 */
function form24_create_form()
{
	if(is_create_access('form24'))
	{
		var form=document.getElementById("form24_master");
		var supplier=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);		
		var order_num=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var save_button=form.elements[6];
		
		$('#form24_share').show();
		$('#form24_share').click(function()
		{
			modal101_action('purchase_order',supplier,order_num);
		});
				
		var last_updated=get_my_time();		
		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<order_num>"+order_num+"</order_num>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form43</link_to>" +
					"<title>Created</title>" +
					"<notes>Purchase order # "+order_num+"</notes>" +
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

		var num_data="<user_preferences>"+
						"<id></id>"+						
						"<name exact='yes'>po_num</name>"+												
						"</user_preferences>";
		get_single_column_data(function (bill_num_ids)
		{
			if(bill_num_ids.length>0)
			{
				var num_xml="<user_preferences>"+
							"<id>"+bill_num_ids[0]+"</id>"+
							"<value>"+(parseInt(order_num)+1)+"</value>"+
							"</user_preferences>";
				if(is_online())
				{
					server_update_simple(num_xml);
				}
				else 
				{
					local_update_simple(num_xml);
				}
			}
		},num_data);
			
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form24_update_form();
		});
		
		$("[id^='save_form24_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}



/**
 * @form Store Placement
 * @param button
 */
function form38_create_item(form)
{
	if(is_create_access('form38'))
	{
		var product_name=form.elements[0].value;
		var batch=form.elements[1].value;
		var name=form.elements[2].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<area_utilization>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+product_name+"</item_name>" +
					"<batch>"+batch+"</batch>" +
					"<name>"+name+"</name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</area_utilization>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>area_utilization</tablename>" +
					"<link_to>form38</link_to>" +
					"<title>Added</title>" +
					"<notes>Item "+product_name+" to storage area "+name+"</notes>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var save_button=form.elements[5];
		$(save_button).hide();
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form38_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Access Control
 * @param button
 */
function form51_create_item(form)
{
	if(is_create_access('form51'))
	{
		var master_form=document.getElementById('form51_master');
		var username=master_form.elements[1].value;
		var name=master_form.elements[2].value;
			
		var element_name=form.elements[0].getAttribute('data-i18n');
		element_name=element_name.substr(element_name.indexOf('.')+1);
		var re='unchecked';
		if(form.elements[1].checked)
			re='checked';
		var cr='unchecked';
		if(form.elements[2].checked)
			cr='checked';
		var up='unchecked';
		if(form.elements[3].checked)
			up='checked';
		var del='unchecked';
		if(form.elements[4].checked)
			del='checked';
		var data_id=form.elements[5].value;
		var element_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<access_control>" +
					"<id>"+data_id+"</id>" +
					"<username>"+username+"</username>" +
					"<element_id>"+element_id+"</element_id>" +
					"<element_name>"+element_name+"</element_name>" +
					"<re>"+re+"</re>" +
					"<cr>"+cr+"</cr>" +
					"<up>"+up+"</up>" +
					"<del>"+del+"</del>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</access_control>";	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form51_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 56
 * form Cash Register
 * @param button
 */
function form56_create_item(form)
{
	if(is_create_access('form56'))
	{
		var account=form.elements[0].value;
		var type=form.elements[1].value;
		var amount=form.elements[2].value;
		var notes=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var receiver=account;
		var giver="master";
		var due_time=get_debit_period();
		if(type=='received')
		{
			giver=account;
			receiver="master";
			due_time=get_credit_period();
		}
		var data_xml="<cash_register>" +
					"<id>"+data_id+"</id>" +
					"<type>"+type+"</type>" +
					"<acc_name>"+account+"</acc_name>" +
					"<notes>"+notes+"</notes>" +
					"<amount>"+amount+"</amount>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</cash_register>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>cash_register</tablename>" +
					"<link_to>form56</link_to>" +
					"<title>Added</title>" +
					"<notes>Cash record of amount "+amount+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+data_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+amount+"</amount>" +
					"<receiver>"+giver+"</receiver>" +
					"<giver>"+receiver+"</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+get_my_time()+"</last_updated>" +
					"</transactions>";
		var payment_id=get_my_time();
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
					"<type>"+type+"</type>" +
					"<total_amount>"+amount+"</total_amount>" +
					"<paid_amount>"+amount+"</paid_amount>" +
					"<status>closed</status>" +
					"<date>"+get_my_time()+"</date>" +
					"<due_date>"+due_time+"</due_date>" +
					"<mode>cash</mode>" +
					"<transaction_id>"+payment_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<last_updated>"+get_my_time()+"</last_updated>" +
					"</payments>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(transaction_xml);
			server_create_simple(transaction2_xml);
			server_create_simple(payment_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(transaction2_xml);
			local_create_simple(payment_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form56_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form56_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 58
 * form Manage Service pre-requisites
 * @param button
 */
function form58_create_item(form)
{
	if(is_create_access('form58'))
	{
		var service=form.elements[0].value;
		var type=form.elements[1].value;
		var requisite=form.elements[2].value;
		var quantity=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<pre_requisites>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<requisite_type>"+type+"</requisite_type>" +
					"<requisite_name>"+requisite+"</requisite_name>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</pre_requisites>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>pre_requisites</tablename>" +
					"<link_to>form58</link_to>" +
					"<title>Added</title>" +
					"<notes>Pre-requisite for service "+service+"</notes>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form58_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form58_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 59
 * form Manage product pre-requisites
 * @param button
 */
function form59_create_item(form)
{
	if(is_create_access('form59'))
	{		
		var product=form.elements[0].value;
		var type=form.elements[1].value;
		var requisite=form.elements[2].value;
		var quantity=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='pre_requisites';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<requisite_type>"+type+"</requisite_type>" +
					"<requisite_name>"+requisite+"</requisite_name>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form59</link_to>" +
					"<title>Added</title>" +
					"<notes>Pre-requisite for product "+product+"</notes>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form59_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form59_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 60
 * form Product Attributes
 * @param button
 */
function form60_create_item(form)
{
	if(is_create_access('form60'))
	{
		var product=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form60</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for product "+product+"</notes>" +
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
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form60_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form60_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 61
 * form service Attributes
 * @param button
 */
function form61_create_item(form)
{
	if(is_create_access('form61'))
	{
		var service=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form61</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for service "+service+"</notes>" +
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
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form61_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form61_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 62
 * form Product reviews
 * @param button
 */
function form62_create_item(form)
{
	if(is_create_access('form62'))
	{
		var product=form.elements[0].value;
		var reviewer=form.elements[1].value;
		var detail=form.elements[2].value;
		var rating=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='reviews';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<reviewer>"+reviewer+"</reviewer>" +
					"<detail>"+detail+"</detail>" +
					"<rating>"+rating+"</rating>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form62</link_to>" +
					"<title>Added</title>" +
					"<notes>Review for product "+product+"</notes>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form62_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form62_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 63
 * form service reviews
 * @param button
 */
function form63_create_item(form)
{
	if(is_create_access('form63'))
	{
		var service=form.elements[0].value;
		var reviewer=form.elements[1].value;
		var detail=form.elements[2].value;
		var rating=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='reviews';
		var data_xml="<reviews>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<reviewer>"+reviewer+"</reviewer>" +
					"<detail>"+detail+"</detail>" +
					"<rating>"+rating+"</rating>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</reviews>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>reviews</tablename>" +
					"<link_to>form63</link_to>" +
					"<title>Added</title>" +
					"<notes>Review for service "+service+"</notes>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form63_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form63_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 64
 * form Service Cross sells
 * @param button
 */
function form64_create_item(form)
{
	if(is_create_access('form64'))
	{
		var service=form.elements[0].value;
		var cross_type=form.elements[1].value;
		var cross_name=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<cross_sells>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<cross_type>"+cross_type+"</cross_type>" +
					"<cross_name>"+cross_name+"</cross_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</cross_sells>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>cross_sells</tablename>" +
					"<link_to>form64</link_to>" +
					"<title>Added</title>" +
					"<notes>Cross selling of "+cross_name+" to service "+service+"</notes>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form64_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form64_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 66
 * form Cross sells
 * @param button
 */
function form66_create_item(form)
{
	if(is_create_access('form66'))
	{
		var product=form.elements[0].value;
		var cross_type=form.elements[1].value;
		var cross_name=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='cross_sells';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<cross_type>"+cross_type+"</cross_type>" +
					"<cross_name>"+cross_name+"</cross_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form66</link_to>" +
					"<title>Added</title>" +
					"<notes>Cross selling of "+cross_name+" to product "+product+"</notes>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form66_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form66_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Sale Order
 * @param button
 */
function form69_create_item(form)
{
	if(is_create_access('form69'))
	{
		var order_id=document.getElementById("form69_master").elements[4].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var notes=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<sale_order_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<quantity>"+quantity+"</quantity>" +
				"<order_id>"+order_id+"</order_id>" +
				"<notes>"+notes+"</notes>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</sale_order_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
		
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form69_delete_item(del_button);
		});
		
		var save_button=form.elements[4];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Sale Order
 * @param button
 */
function form69_create_form()
{
	if(is_create_access('form69'))
	{
		var form=document.getElementById("form69_master");
		
		var customer=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);		
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();		
		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<type>product</type>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form70</link_to>" +
					"<title>Created</title>" +
					"<notes>Sale order no "+data_id+"</notes>" +
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

		var save_button=form.elements[5];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form69_update_form();
		});
		
		$("[id^='save_form69_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * This function transforms a sale order into a bill
 * It is applicable for product bills only
 * @form 70
 * @param order_id
 */
function form70_bill(order_id)
{
	if(is_create_access('form70'))
	{
		show_loader();
		var bill_type='product';
		var bill_amount=0;
		var bill_total=0;
		var bill_offer="";
		var bill_discount=0;
		var bill_tax=0;
		var pending_items_count=0;
		var storage=get_session_var('sales_store');		
		///////selecting all ordered items////
		var order_item_data="<sale_order_items>" +
				"<id></id>" +
				"<order_id exact='yes'>"+order_id+"</order_id>" +
				"<item_name></item_name>" +
				"<quantity></quantity>" +
				"<notes></notes>" +
				"</sale_order_items>";
		fetch_requested_data('',order_item_data,function(order_items)
		{
			console.log(order_items);
			pending_items_count=order_items.length;
			order_items.forEach(function(order_item)
			{
				var item_amount=0;
				var item_total=0;
				var item_offer="";
				var item_discount=0;
				var item_tax=0;
				
				get_inventory(order_item.item_name,'',function(quantity)
				{
					console.log(quantity);
					if(parseFloat(quantity)>=parseFloat(order_item.quantity))
					{
						var batch_data="<product_instances count='1'>" +
								"<batch></batch>" +
								"<sale_price></sale_price>" +
								"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
								"</product_instances>";
						fetch_requested_data('',batch_data,function(batches)
						{
							console.log(batches);
							var batch="";
							var sale_price=0;
							if(batches.length>0)
							{
								batch=batches[0].batch;
								sale_price=batches[0].sale_price;
							}
				
							//////adding offer details
							item_amount=parseFloat(order_item.quantity)*parseFloat(sale_price);
							var offer_data="<offers>" +
									"<offer_type>product</offer_type>" +
									"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
									"<batch array='yes'>"+batch+"--all</batch>" +
									"<criteria_type></criteria_type>" +
									"<criteria_amount></criteria_amount>" +
									"<criteria_quantity></criteria_quantity>" +
									"<result_type></result_type>" +
									"<discount_percent></discount_percent>" +
									"<discount_amount></discount_amount>" +
									"<quantity_add_percent></quantity_add_percent>" +
									"<quantity_add_amount></quantity_add_amount>" +
									"<free_product_name></free_product_name>" +
									"<free_product_quantity></free_product_quantity>" +
									"<offer_detail></offer_detail>" +
									"<status array='yes'>active--extended</status>" +
									"</offers>";
							fetch_requested_data('',offer_data,function(offers)
							{
								offers.sort(function(a,b)
								{
									if(parseFloat(a.criteria_amount)<parseFloat(b.criteria_amount))
									{	return 1;}
									else if(parseFloat(a.criteria_quantity)<parseFloat(b.criteria_quantity))
									{	return 1;}
									else 
									{	return -1;}
								});
										
								for(var i in offers)
								{
									//console.log("found atleast one offer");
									item_offer=offers[i].offer_detail;
									if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(order_item.quantity))
									{
										console.log("offer criteria met");

										if(offers[i].result_type=='discount')
										{
											if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
											{
												item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
											}
											else 
											{
												item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(order_item.quantity)/parseFloat(offers[i].criteria_quantity)));
											}
										}
										else if(offers[i].result_type=='quantity addition')
										{
											if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
											{
												order_item.quantity=parseFloat(order_item.quantity)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
											}
											else 
											{
												order_items.quantity=parseFloat(order_item.quantity)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(order_items.quantity)/parseFloat(offers[i].criteria_quantity))));
											}
										}
										else if(offers[i].result_type=='product free')
										{
											//console.log("adding free product as per offer");

											var free_product_name=offers[i].free_product_name;
											var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(order_item.quantity)/parseFloat(offers[i].criteria_quantity)));
											
											get_inventory(free_product_name,'',function(free_quantities)
											{
												if(parseFloat(free_quantities)>=free_product_quantity)
												{
													var free_batch_data="<bill_items count='1'>" +
															"<batch></batch>" +
															"<item_name exact='yes'>"+free_product_name+"</item_name>" +
															"</bill_items>";
													get_single_column_data(function(data)
													{
														var free_batch="";
														if(data.length>0)
														{
															free_batch=data[0];	
														}
														
														var bill_item_id=get_new_key();
										                var free_xml="<bill_items>" +
																	"<id>"+bill_item_id+"</id>" +
																	"<item_name>"+free_product_name+"</item_name>" +
																	"<batch>"+free_batch+"</batch>" +
																	"<unit_price>0</unit_price>" +
																	"<quantity>"+free_product_quantity+"</quantity>" +
																	"<amount>0</amount>" +
																	"<total>0</total>" +
																	"<discount>0</discount>" +
																	"<offer></offer>" +
																	"<type>free</type>" +
																	"<tax>0</tax>" +
																	"<bill_id>"+order_id+"</bill_id>" +
																	"<free_with>"+order_item.item_name+"</free_with>" +
																	"<storage>"+storage+"</storage>"+
																	"<last_updated>"+get_my_time()+"</last_updated>" +
																	"</bill_items>";	
														
														if(is_online())
														{
															server_create_simple(free_xml);
														}
														else
														{
															local_create_simple(free_xml);
														}
													},free_batch_data);
												}
											});
										}
										break;
									}
									else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=item_amount)
									{
										if(offers[i].result_type=='discount')
										{
											if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
											{
												item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
											}
											else 
											{
												item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount)));
											}
										}
										else if(offers[i].result_type=='quantity addition')
										{
											if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
											{
												order_item.quantity=parseFloat(order_item.quantity)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
											}
											else 
											{
												order_item.quantity=parseFloat(order_item.quantity)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount))));
											}
										}
										else if(offers[i].result_type=='product free')
										{
											var free_product_name=offers[i].free_product_name;
											var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
																						
											//////updating product quantity in inventory
											get_inventory(free_product_name,'',function(free_quantities)
											{
												if(free_quantities>=free_product_quantity)
												{
													var free_batch_data="<bill_items count='1'>" +
															"<batch></batch>" +
															"<item_name exact='yes'>"+free_product_name+"</item_name>" +
															"</bill_items>";
													get_single_column_data(function(data)
													{
														var free_batch="";
														if(data.length>0)
														{
															free_batch=data[0];	
														}
														var bill_item_id=get_new_key();
										                var free_xml="<bill_items>" +
																	"<id>"+bill_item_id+"</id>" +
																	"<item_name>"+free_product_name+"</item_name>" +
																	"<batch>"+free_batch+"</batch>" +
																	"<unit_price>0</unit_price>" +
																	"<quantity>"+free_product_quantity+"</quantity>" +
																	"<amount>0</amount>" +
																	"<total>0</total>" +
																	"<discount>0</discount>" +
																	"<offer></offer>" +
																	"<type>free</type>" +
																	"<tax>0</tax>" +
																	"<bill_id>"+order_id+"</bill_id>" +
																	"<free_with>"+order_item.item_name+"</free_with>" +
																	"<storage>"+storage+"</storage>"+
																	"<last_updated>"+last_updated+"</last_updated>" +
																	"</bill_items>";	
														
														if(is_online())
														{
															server_create_simple(free_xml);
														}
														else
														{
															local_create_simple(free_xml);
														}
													},free_batch_data);
												}
											});
										}
										break;
									}
								}
								
								var tax_data="<product_master>" +
										"<name exact='yes'>"+order_item.item_name+"</name>" +
										"<tax></tax>" +
										"</product_master>";
								fetch_requested_data('',tax_data,function(taxes)
								{
									console.log(taxes);

									taxes.forEach(function(tax)
									{
										item_tax=parseFloat((parseFloat(tax.tax)*(item_amount-parseFloat(item_discount)))/100);
									});
									
									item_total=parseFloat(item_amount)+parseFloat(item_tax)-parseFloat(item_discount);
									
									/////saving to bill item
									var bill_item_id=get_new_key();
					                var data_xml="<bill_items>" +
											"<id>"+bill_item_id+"</id>" +
											"<item_name>"+order_item.item_name+"</item_name>" +
											"<batch>"+batch+"</batch>" +
											"<unit_price>"+sale_price+"</unit_price>" +
											"<quantity>"+order_item.quantity+"</quantity>" +
											"<amount>"+item_amount+"</amount>" +
											"<total>"+item_total+"</total>" +
											"<discount>"+item_discount+"</discount>" +
											"<offer>"+item_offer+"</offer>" +
											"<type>bought</type>" +
											"<tax>"+item_tax+"</tax>" +
											"<bill_id>"+order_id+"</bill_id>" +
											"<free_with></free_with>" +
											"<storage>"+storage+"</storage>"+
											"<last_updated>"+get_my_time()+"</last_updated>" +
											"</bill_items>";	
									bill_amount+=item_amount;
									bill_total+=item_total;
									bill_discount+=item_discount;
									bill_tax+=item_tax;
									pending_items_count-=1;
									
									console.log(data_xml);

									if(is_online())
									{
										server_create_simple(data_xml);
									}
									else
									{
										local_create_simple(data_xml);
									}
								});
								
							});
							
						});
					}
					else
					{
						pending_items_count-=1;
					}
				});
			});
		});
		
		
		/////saving bill details
		var bill_items_complete=setInterval(function()
		{
	  	   if(pending_items_count===0)
	  	   {
	  		   	clearInterval(bill_items_complete);
	  		   	
	  		   	var order_data="<sale_orders>" +
	  		   			"<id>"+order_id+"</id>" +
	  		   			"<customer_name></customer_name>" +
	  		   			"<order_date></order_date>" +
	  		   			"<type>product</type>" +
	  		   			"<status exact='yes'>pending</status>" +
	  		   			"</sale_orders>";
	  		   	fetch_requested_data('',order_data,function(sale_orders)
	  		   	{
	  		   		console.log(sale_orders);
	  		   		///////////////////////////////////////////////////////////
	  		   		var offer_data="<offers>" +
							"<criteria_type exact='yes'>min amount crossed</criteria_type>" +
							"<criteria_amount upperbound='yes'>"+(bill_amount-bill_discount)+"</criteria_amount>" +
							"<offer_type exact='yes'>bill</offer_type>" +
							"<result_type></result_type>" +
							"<discount_percent></discount_percent>" +
							"<discount_amount></discount_amount>" +
							"<quantity_add_percent></quantity_add_percent>" +
							"<quantity_add_amount></quantity_add_amount>" +
							"<free_product_name></free_product_name>" +
							"<free_product_quantity></free_product_quantity>" +
							"<offer_detail></offer_detail>" +
							"<status array='yes'>active--extended</status>" +
							"</offers>";
					fetch_requested_data('',offer_data,function(offers)
					{
						offers.sort(function(a,b)
						{
							if(parseFloat(a.criteria_amount)<parseFloat(b.criteria_amount))
							{	return 1;}
							else 
							{	return -1;}
						});
						
						for(var i in offers)
						{
							if(offers[i].result_type=='discount')
							{
								if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
								{
									var dis=parseFloat(((bill_amount-bill_discount)*parseInt(offers[i].discount_percent))/100);
									bill_tax-=(bill_tax*(dis/(bill_amount-bill_discount)));
									bill_discount+=dis;
									bill_total=bill_amount-bill_discount+bill_tax;
								}
								else 
								{
									var dis=parseFloat(offers[i].discount_amount)*(Math.floor((bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
									bill_tax-=(bill_tax*(dis/(bill_amount-bill_discount)));
									bill_discount+=dis;
									bill_total=bill_amount-bill_discount+bill_tax;
								}
							}
							else if(offers[i].result_type=='product free')
							{
								var free_product_name=offers[i].free_product_name;
								var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
								
								get_inventory(free_product_name,'',function(free_quantities)
								{
									if(free_quantities>=free_product_quantity)
									{
										var free_batch_data="<bill_items count='1'>" +
												"<batch></batch>" +
												"<item_name exact='yes'>"+free_product_name+"</item_name>" +
												"</bill_items>";
										get_single_column_data(function(data)
										{
											var free_batch="";
											if(data.length>0)
											{
												free_batch=data[0];	
											}
											var bill_item_id=get_new_key();
							                var free_xml="<bill_items>" +
														"<id>"+bill_item_id+"</id>" +
														"<item_name>"+free_product_name+"</item_name>" +
														"<batch>"+free_batch+"</batch>" +
														"<unit_price>0</unit_price>" +
														"<quantity>"+free_product_quantity+"</quantity>" +
														"<amount>0</amount>" +
														"<total>0</total>" +
														"<discount>0</discount>" +
														"<offer></offer>" +
														"<type>free</type>" +
														"<tax>0</tax>" +
														"<bill_id>"+order_id+"</bill_id>" +
														"<free_with>bill</free_with>" +
														"<storage></storage>"+
														"<last_updated>"+last_updated+"</last_updated>" +
														"</bill_items>";	
											
											if(is_online())
											{
												server_create_simple(free_xml);
											}
											else
											{
												local_create_simple(free_xml);
											}
											
										},free_batch_data);
									}
								});
							}
							bill_offer=offers[i].offer_detail;
							break;
						}
						
						console.log(sale_orders);
						for(var z in sale_orders)
						{
							var sale_order_xml="<sale_orders>" +
										"<id>"+order_id+"</id>" +
										"<status>billed</status>" +
										"</sale_orders>";
							var bill_xml="<bills>" +
										"<id>"+order_id+"</id>" +
										"<customer_name>"+sale_orders[z].customer_name+"</customer_name>" +
										"<bill_date>"+get_my_time()+"</bill_date>" +
										"<amount>"+bill_amount+"</amount>" +
										"<total>"+bill_total+"</total>" +
										"<type>product</type>" +
										"<offer>"+bill_offer+"</offer>" +
										"<discount>"+bill_discount+"</discount>" +
										"<tax>"+bill_tax+"</tax>" +
										"<transaction_id>"+order_id+"</transaction_id>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</bills>";
							var activity_xml="<activity>" +
										"<data_id>"+order_id+"</data_id>" +
										"<tablename>bills</tablename>" +
										"<link_to>form42</link_to>" +
										"<title>Saved</title>" +
										"<notes>Bill no "+order_id+"</notes>" +
										"<updated_by>"+get_name()+"</updated_by>" +
										"</activity>";
							var transaction_xml="<transactions>" +
										"<id>"+order_id+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>"+sale_orders[z].customer_name+"</receiver>" +
										"<giver>master</giver>" +
										"<tax>"+bill_tax+"</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
							var pt_tran_id=get_new_key();
							var payment_xml="<payments>" +
										"<id>"+pt_tran_id+"</id>" +
										"<status>pending</status>" +
										"<type>received</type>" +
										"<date>"+get_my_time()+"</date>" +
										"<total_amount>"+bill_total+"</total_amount>" +
										"<paid_amount>0</paid_amount>" +
										"<acc_name>"+sale_orders[z].customer_name+"</acc_name>" +
										"<due_date>"+get_credit_period()+"</due_date>" +
										"<mode>"+get_payment_mode()+"</mode>" +
										"<transaction_id>"+pt_tran_id+"</transaction_id>" +
										"<bill_id>"+order_id+"</bill_id>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</payments>";
							var pt_xml="<transactions>" +
										"<id>"+pt_tran_id+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>master</receiver>" +
										"<giver>"+sale_orders[z].customer_name+"</giver>" +
										"<tax>0</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
							if(is_online())
							{
								server_update_simple(sale_order_xml);
								server_create_row(bill_xml,activity_xml);
								server_create_simple(transaction_xml);
								server_create_simple(pt_xml);
								server_create_simple(payment_xml);
							}
							else
							{
								local_update_simple(sale_order_xml);
								local_create_row(bill_xml,activity_xml);
								local_create_simple(transaction_xml);
								local_create_simple(pt_xml);
								local_create_simple(payment_xml);
							}
						}
						hide_loader();
					});
	  		   		///////////////////////////////////////////////////////////
	  		   	});
	  	   }
	    },100);
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}

/**
 * @form New Bill
 * @param button
 */
function form72_create_item(form)
{
	if(is_create_access('form72'))
	{
		var bill_id=document.getElementById("form72_master").elements[4].value;
		var storage=get_session_var('sales_store');
		var name=form.elements[0].value;
		var batch="";
		var staff="";
		var quantity="";
		var notes="";
		if(isNaN(form.elements[2].value))
		{
			staff=form.elements[1].value;
			notes=form.elements[2].value;
		}
		else
		{
			batch=form.elements[1].value;
			quantity=form.elements[2].value;
		}
		var price=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var offer=form.elements[8].value;
		var data_id=form.elements[9].value;
		var free_product_name=form.elements[12].value;
		var free_product_quantity=form.elements[13].value;
		var free_service_name=form.elements[14].value;
		var last_updated=get_my_time();
		
		if(isNaN(form.elements[2].value))
		{
			var pre_requisite_data="<pre_requisites>" +
					"<type exact='yes'>service</type>" +
					"<requisite_type exact='yes'>task</requisite_type>" +
					"<name exact='yes'>"+name+"</name>" +
					"<requisite_name></requisite_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			fetch_requested_data('',pre_requisite_data,function(pre_requisites)
			{
				var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<item_name>"+name+"</item_name>" +
						"<unit_price>"+price+"</unit_price>" +
						"<notes>"+notes+"</notes>" +
						"<staff>"+staff+"</staff>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<discount>"+discount+"</discount>" +
						"<offer>"+offer+"</offer>" +
						"<type>bought</type>" +
						"<tax>"+tax+"</tax>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"<storage>"+storage+"</storage>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bill_items>";		
				if(is_online())
				{
					server_create_simple(data_xml);
				}
				else
				{
					local_create_simple(data_xml);
				}
		
				pre_requisites.forEach(function(pre_requisite)
				{
					var task_id=get_new_key();
					var task_xml="<task_instances>" +
							"<id>"+task_id+"</id>" +
							"<name>"+pre_requisite.name+"</name>" +
							"<assignee>"+staff+"</assignee>" +
							"<t_initiated>"+get_my_time()+"</t_initiated>" +
							"<t_due>"+get_task_due_period()+"</t_due>" +
							"<status>pending</status>" +
							"<task_hours>"+pre_requisite.quantity+"</task_hours>" +
							"<source>service</source>" +
							"<source_id>"+data_id+"</source_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</task_instances>";
					var activity_xml="<activity>" +
							"<data_id>"+task_id+"</data_id>" +
							"<tablename>task_instances</tablename>" +
							"<link_to>form14</link_to>" +
							"<title>Added</title>" +
							"<notes>Task "+pre_requisite.name+" assigned to "+staff+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
			
					if(is_online())
					{
						server_create_row(task_xml,activity_xml);
					}
					else
					{
						local_create_row(task_xml,activity_xml);
					}		
				});
			});
			
		}
		else
		{
			var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+name+"</item_name>" +
					"<batch>"+batch+"</batch>" +
					"<unit_price>"+price+"</unit_price>" +
					"<quantity>"+quantity+"</quantity>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<offer>"+offer+"</offer>" +
					"<type>bought</type>" +
					"<tax>"+tax+"</tax>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<free_with></free_with>" +
					"<storage>"+storage+"</storage>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";	
		
			if(is_online())
			{
				server_create_simple(data_xml);
			}
			else
			{
				local_create_simple(data_xml);
			}
		}
		////adding free service
		if(free_service_name!="" && free_service_name!=null)
		{
			var id=get_new_key();
			rowsHTML="<tr>";
				rowsHTML+="<form id='form72_"+id+"'></form>";
                	rowsHTML+="<td>";
                    	rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+free_service_name+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='text' readonly='readonly' required form='form72_"+id+"' value='"+staff+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<textarea readonly='readonly' required form='form72_"+id+">free with "+name+"</textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value='free with "+name+"'>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
                            rowsHTML+="<input type='button' class='save_icon' form='form72_"+id+"' id='save_form72_"+id+"' >";
                            rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
                    rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form72_body').prepend(rowsHTML);

			var free_xml="<bill_items>" +
						"<id>"+id+"</id>" +
						"<item_name>"+free_service_name+"</item_name>" +
						"<staff>"+staff+"</staff>" +
						"<notes>free with "+name+"</notes>" +
						"<unit_price>0</unit_price>" +
						"<amount>0</amount>" +
						"<total>0</total>" +
						"<discount>0</discount>" +
						"<offer></offer>" +
						"<type>free</type>" +
						"<tax>0</tax>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"<free_with>"+name+"</free_with>" +
						"<storage>"+storage+"</storage>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bill_items>";
			if(is_online())
			{
				server_create_simple(free_xml);
			}
			else
			{
				local_create_simple(free_xml);
			}
			offer_invalid=false;
		}

		
		//////adding free product to the bill if applicable
		if(free_product_name!="" && free_product_name!=null)
		{
			get_inventory(free_product_name,'',function(free_quantities)
			{
				if(free_quantities>=free_product_quantity)
				{
					var free_batch_data="<bill_items count='1'>" +
							"<batch></batch>" +
							"<item_name exact='yes'>"+free_product_name+"</item_name>" +
							"</bill_items>";
					get_single_column_data(function(data)
					{
						var free_batch="";
						if(data.length>0)
						{
							free_batch=data[0];	
						}
						
						var id=get_new_key();
						rowsHTML="<tr>";
							rowsHTML+="<form id='form72_"+id+"'></form>";
		                	rowsHTML+="<td>";
		                    	rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+free_product_name+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='text' readonly='readonly' required form='form72_"+id+"' value='"+free_batch+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='"+free_product_quantity+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='free with "+name+"'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
	                                rowsHTML+="<input type='button' class='save_icon' form='form72_"+id+"' id='save_form72_"+id+"' >";
	                                rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
	                        rowsHTML+="</td>";
		                rowsHTML+="</tr>";

		                $('#form72_body').prepend(rowsHTML);

						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_batch+"</batch>" +
									"<unit_price>0</unit_price>" +
									"<quantity>"+free_product_quantity+"</quantity>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+bill_id+"</bill_id>" +
									"<free_with>"+name+"</free_with>" +
									"<storage>"+storage+"</storage>"+
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
					},free_batch_data);
				}
				else
				{
					$("#modal7").dialog("open");
				}
			});
		}
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form72_delete_item(del_button);
		});

		var save_button=form.elements[10];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Bill
 * @param button
 */
function form72_create_form()
{
	if(is_create_access('form72'))
	{
		var form=document.getElementById("form72_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var bill_date=form.elements[3].value;
		var storage=get_session_var('sales_store');

		var message_string="Bill from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form72']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Price: "+subform.elements[3].value;
			message_string+=" Total: "+subform.elements[4].value;
		});
		
				
		var data_id=form.elements[4].value;
		var transaction_id=form.elements[6].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<quantity_add_percent></quantity_add_percent>" +
				"<quantity_add_amount></quantity_add_amount>" +
				"<free_product_name></free_product_name>" +
				"<free_product_quantity></free_product_quantity>" +
				"<free_service_name></free_service_name>" +
				"<offer_detail></offer_detail>" +
				"<status array='yes'>active--extended</status>" +
				"</offers>";
		fetch_requested_data('',offer_data,function(offers)
		{
			offers.sort(function(a,b)
			{
				if(a.criteria_amount<b.criteria_amount)
				{	return 1;}
				else 
				{	return -1;}
			});
			
			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else 
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];	
								}
	
								var id=get_new_key();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form72_"+id+"'></form>";
					                	rowsHTML+="<td>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='text' required form='form72_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='button' class='save_icon' form='form72_"+id+"' id='save_form72_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form72_body').prepend(rowsHTML);

				                var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<storage>"+storage+"</storage>"+
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";	
								
								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}
								
							},free_batch_data);
						}
						else
						{
							$("#modal7").dialog("open");
						}
					});
				}
				else if(offers[i].result_type=='service free')
				{
					var free_service_name=offers[i].free_service_name;	
					var id=get_new_key();
					rowsHTML="<tr>";
						rowsHTML+="<form id='form72_"+id+"'></form>";
		                	rowsHTML+="<td>";
		                    	rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+free_service_name+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='text' readonly='readonly' required form='form72_"+id+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<textarea readonly='readonly' required form='form72_"+id+"'>free service</textarea>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                        	rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='free on the bill amount'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
	                                rowsHTML+="<input type='button' class='save_icon' form='form72_"+id+"' id='save_form72_"+id+"' >";
	                                rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
	                        rowsHTML+="</td>";
	                rowsHTML+="</tr>";

	                $('#form72_body').prepend(rowsHTML);

	                var free_pre_requisite_data="<pre_requisites>" +
							"<type exact='yes'>service</type>" +
							"<requisite_type exact='yes'>task</requisite_type>" +
							"<name exact='yes'>"+free_service_name+"</name>" +
							"<requisite_name></requisite_name>" +
							"<quantity></quantity>" +
							"</pre_requisites>";
					fetch_requested_data('',free_pre_requisite_data,function(free_pre_requisites)
					{
		                var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_service_name+"</item_name>" +
									"<staff></staff>" +
									"<notes>free service</notes>" +
									"<unit_price>0</unit_price>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+data_id+"</bill_id>" +
									"<free_with>bill</free_with>" +
									"<storage>"+storage+"</storage>"+
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
						
						free_pre_requisites.forEach(function(free_pre_requisite)
						{
							var task_id=get_new_key();
							var task_xml="<task_instances>" +
									"<id>"+task_id+"</id>" +
									"<name>"+free_pre_requisite.name+"</name>" +
									"<assignee></assignee>" +
									"<t_initiated>"+get_my_time()+"</t_initiated>" +
									"<t_due>"+get_task_due_period()+"</t_due>" +
									"<status>pending</status>" +
									"<task_hours>"+free_pre_requisite.quantity+"</task_hours>" +
									"<source>service</source>" +
									"<source_id>"+id+"</source_id>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</task_instances>";
							var activity_xml="<activity>" +
									"<data_id>"+task_id+"</data_id>" +
									"<tablename>task_instances</tablename>" +
									"<link_to>form14</link_to>" +
									"<title>Added</title>" +
									"<notes>Task "+free_pre_requisite.name+"</notes>" +
									"<updated_by>"+get_name()+"</updated_by>" +
									"</activity>";
					
							if(is_online())
							{
								server_create_row(task_xml,activity_xml);
							}
							else
							{
								local_create_row(task_xml,activity_xml);
							}		
						});
				
					});
				}

				offer_detail=offers[i].offer_detail;
				break;
			}
			
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_num>"+bill_num+"</bill_num>"+
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>both</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Saved</title>" +
						"<notes>Bill no "+bill_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
						"<id>"+transaction_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>"+customer+"</receiver>" +
						"<giver>master</giver>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var pt_tran_id=get_new_key();
			var payment_xml="<payments>" +
						"<id>"+pt_tran_id+"</id>" +
						"<status>closed</status>" +
						"<type>received</type>" +
						"<date>"+get_my_time()+"</date>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+total+"</paid_amount>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<due_date>"+get_credit_period()+"</due_date>" +
						"<mode>"+get_payment_mode()+"</mode>" +
						"<transaction_id>"+pt_tran_id+"</transaction_id>" +
						"<bill_id>"+data_id+"</bill_id>" +
						"<source_info>from sale bill #"+bill_num+"</source_info>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</payments>";
			var pt_xml="<transactions>" +
						"<id>"+pt_tran_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>master</receiver>" +
						"<giver>"+customer+"</giver>" +
						"<tax>0</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var num_data="<user_preferences>"+
						"<id></id>"+						
						"<name exact='yes'>bill_num</name>"+												
						"</user_preferences>";
			get_single_column_data(function (bill_num_ids)
			{
				if(bill_num_ids.length>0)
				{
					var num_xml="<user_preferences>"+
									"<id>"+bill_num_ids[0]+"</id>"+
									"<value>"+(parseInt(bill_num)+1)+"</value>"+
									"</user_preferences>";
					if(is_online())
					{
						server_update_simple(num_xml);
					}
					else 
					{
						local_update_simple(num_xml);
					}
				}
			},num_data);
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction_xml);
				server_create_simple(pt_xml);
				server_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction_xml);
				local_create_simple(pt_xml);
				local_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			
			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			var subject="Bill from "+get_session_var('title');
			$('#form72_share').show();
			$('#form72_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+discount+"</br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
			$('#form72_foot').html(total_row);
		});
		
		var save_button=form.elements[7];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form72_update_form();
		});
		
		$("[id^='save_form72_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form De-duplication mapping
 * @param button
 */
function form80_create_item(form)
{
	if(is_create_access('form80'))
	{
		var master_form=document.getElementById('form80_master');
		var object=master_form.elements[1].value;
		var table=master_form.elements[2].value;
		var column=master_form.elements[3].value;
		var refs=master_form.elements[4].value;
		var ref_ids=master_form.elements[5].value;
		
		var slave_value=form.elements[0].value;
		var slave_id=form.elements[1].value;
		var master_value=form.elements[2].value;
		var master_id=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<de_duplication>" +
					"<id>"+data_id+"</id>" +
					"<object>"+object+"</object>" +
					"<tablename>"+table+"</tablename>" +
					"<keycolumn>"+column+"</keycolumn>" +
					"<references_value>"+refs+"</references_value>" +
					"<references_id>"+ref_ids+"</references_id>" +
					"<slave_id>"+slave_id+"</slave_id>" +
					"<slave_value>"+slave_value+"</slave_value>" +
					"<master_id>"+master_id+"</master_id>" +
					"<master_value>"+master_value+"</master_value>" +
					"<status>pending</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</de_duplication>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form80_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Sale leads
 * @param button
 */
function form81_create_item(form)
{
	if(is_create_access('form81'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form81</link_to>" +
					"<title>Added</title>" +
					"<notes>Sale lead for customer "+customer+"</notes>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var customer_data="<customers>"+
						"<name></name>"+
						"<phone></phone>"+
						"<email></email>"+
						"<acc_name exact='yes'>"+customer+"</acc_name>"+
						"</customers>";
		fetch_requested_data('',customer_data,function(customers)
		{
			var customer_name=customers[0].name;
			var customer_phone=customers[0].phone;
			var business_title=get_session_var('title');
			var sms_content=get_session_var('sms_content');			
			var message=sms_content.replace(/customer_name/g,customer_name);
			message=message.replace(/business_title/g,business_title);
			
			send_sms(customer_phone,message,'transaction');
			///////////////////////////////////////////////////////////////////////////////

			var nl_name=get_session_var('default_newsletter');
			var nl_id_xml="<newsletter>"+
						"<id></id>"+
						"<name exact='yes'>"+nl_name+"</name>"+
						"</newsletter>";			

			get_single_column_data(function(nls)
			{		
				var subject=nl_name+" - " +business_title;
				var nl_id=nls[0];	
				print_newsletter(nl_name,nl_id,'mail',function(container)
				{
					var message=encodeURIComponent(container.innerHTML);
					var to=customers[0].email;
					var from=get_session_var('email');
					send_email(to,from,subject,message,'promotion',function(){});
				});
			},nl_id_xml);		
			//////////////////////////////////////////////////////////////////////////////		
		});
				
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form81_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form81_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * This function transforms scanned items into a bill
 * @form 82
 */
function form82_bill()
{
	if(is_create_access('form82'))
	{
		var master_form=document.getElementById('form82_master');
		var storage=get_session_var('sales_store');   	
		var bill_type='product';
		var bill_amount=0;
		var bill_total=0;
		var bill_offer="";
		var bill_discount=0;
		var bill_tax=0;
		var pending_items_count=0;
		var order_id=master_form.elements[4].value;
		///////selecting all scanned items////
		var order_items=new Array();
		
		var message_string="Bill from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		$("[id^='delete_form82']").each(function(index)
		{
			var form_id=$(this).attr('form');
			var form=document.getElementById(form_id);
			var order_item=new Object();
			order_item.item_name=form.elements[1].value;
			order_item.batch=form.elements[2].value;
			order_item.quantity=1;
			order_item.sale_price=parseFloat(form.elements[3].value);
			order_items.push(order_item);
			
			message_string+="\nItem: "+form.elements[1].value;
			message_string+=" Price: "+form.elements[3].value;
		});
		
		var scanned_items=new Array();
		for(var i=0; i<order_items.length;i++)
		{
			var new_obj=new Object();
			new_obj.item_name=order_items[i].item_name;
			new_obj.batch=order_items[i].batch;
			new_obj.sale_price=order_items[i].sale_price;
			new_obj.quantity=parseFloat(order_items[i].quantity);
			for(var j=i+1;j<order_items.length;j++)
			{
				if(order_items[j].item_name==new_obj.item_name && order_items[j].batch==new_obj.batch)
				{
					new_obj.quantity+=parseFloat(order_items[j].quantity);
					order_items.splice(j,1);
					j-=1;
				}
			}
			scanned_items.push(new_obj);
		}
		
		pending_items_count=scanned_items.length;
		
		scanned_items.forEach(function(order_item)
		{
			var item_amount=0;
			var item_total=0;
			var item_offer="";
			var item_discount=0;
			var item_tax=0;
			
			var batch=order_item.batch;
			var sale_price=order_item.sale_price;
			
			//////adding offer details
			item_amount=parseFloat(order_item.quantity)*parseFloat(sale_price);
			var offer_data="<offers>" +
					"<offer_type>product</offer_type>" +
					"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
					"<batch array='yes'>"+batch+"--all</batch>" +
					"<criteria_type></criteria_type>" +
					"<criteria_amount></criteria_amount>" +
					"<criteria_quantity></criteria_quantity>" +
					"<result_type></result_type>" +
					"<discount_percent></discount_percent>" +
					"<discount_amount></discount_amount>" +
					"<quantity_add_percent></quantity_add_percent>" +
					"<quantity_add_amount></quantity_add_amount>" +
					"<free_product_name></free_product_name>" +
					"<free_product_quantity></free_product_quantity>" +
					"<offer_detail></offer_detail>" +
					"<status array='yes'>active--extended</status>" +
					"</offers>";
			fetch_requested_data('',offer_data,function(offers)
			{
				offers.sort(function(a,b)
				{
					if(a.criteria_amount<b.criteria_amount)
					{	return 1;}
					else if(a.criteria_quantity<b.criteria_quantity)
					{	return 1;}
					else 
					{	return -1;}
				});
						
				for(var i in offers)
				{
					//console.log("found atleast one offer");
					item_offer=offers[i].offer_detail;
					if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(order_item.quantity))
					{
						//console.log("offer criteria met");

						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
							}
							else 
							{
								item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(order_item.quantity)/parseFloat(offers[i].criteria_quantity)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								order_item.quantity=parseFloat(order_item.quantity)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else 
							{
								order_items.quantity=parseFloat(order_item.quantity)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(order_items.quantity)/parseFloat(offers[i].criteria_quantity))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							//console.log("adding free product as per offer");

							var free_product_name=offers[i].free_product_name;
							var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(order_item.quantity)/parseFloat(offers[i].criteria_quantity)));
							
							get_inventory(free_product_name,'',function(free_quantities)
							{
								if(free_quantities>=free_product_quantity)
								{
									var free_batch_data="<bill_items count='1'>" +
											"<batch></batch>" +
											"<item_name exact='yes'>"+free_product_name+"</item_name>" +
											"</bill_items>";
									get_single_column_data(function(data)
									{
										var free_batch="";
										if(data.length>0)
										{
											free_batch=data[0];	
										}
										var bill_item_id=get_new_key();
						                var free_xml="<bill_items>" +
													"<id>"+bill_item_id+"</id>" +
													"<item_name>"+free_product_name+"</item_name>" +
													"<batch>"+free_batch+"</batch>" +
													"<unit_price>0</unit_price>" +
													"<quantity>"+free_product_quantity+"</quantity>" +
													"<amount>0</amount>" +
													"<total>0</total>" +
													"<discount>0</discount>" +
													"<offer></offer>" +
													"<type>free</type>" +
													"<tax>0</tax>" +
													"<bill_id>"+order_id+"</bill_id>" +
													"<free_with>"+order_item.item_name+"</free_with>" +
													"<storage>"+storage+"</storage>"+													
													"<last_updated>"+get_my_time()+"</last_updated>" +
													"</bill_items>";	
										
										if(is_online())
										{
											server_create_simple(free_xml);
										}
										else
										{
											local_create_simple(free_xml);
										}
									},free_batch_data);
								}
							});
						}
						break;
					}
					else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=item_amount)
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
							}
							else 
							{
								item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								order_item.quantity=parseFloat(order_item.quantity)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else 
							{
								order_item.quantity=parseFloat(order_item.quantity)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							var free_product_name=offers[i].free_product_name;
							var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
																		
							//////updating product quantity in inventory
							get_inventory(free_product_name,'',function(free_quantities)
							{
								if(free_quantities>=free_product_quantity)
								{
									var free_batch_data="<bill_items count='1'>" +
											"<batch></batch>" +
											"<item_name exact='yes'>"+free_product_name+"</item_name>" +
											"</bill_items>";
									get_single_column_data(function(data)
									{
										var free_batch="";
										if(data.length>0)
										{
											free_batch=data[0];	
										}
									
										var bill_item_id=get_new_key();
										var free_xml="<bill_items>" +
													"<id>"+bill_item_id+"</id>" +
													"<item_name>"+free_product_name+"</item_name>" +
													"<batch>"+free_batch+"</batch>" +
													"<unit_price>0</unit_price>" +
													"<quantity>"+free_product_quantity+"</quantity>" +
													"<amount>0</amount>" +
													"<total>0</total>" +
													"<discount>0</discount>" +
													"<offer></offer>" +
													"<type>free</type>" +
													"<tax>0</tax>" +
													"<bill_id>"+order_id+"</bill_id>" +
													"<free_with>"+order_item.item_name+"</free_with>" +
													"<storage>"+storage+"</storage>"+
													"<last_updated>"+last_updated+"</last_updated>" +
													"</bill_items>";	
										
										if(is_online())
										{
											server_create_simple(free_xml);
										}
										else
										{
											local_create_simple(free_xml);
										}
									},free_batch_data);
								}
							});
						}
						break;
					}
				}
				
				var tax_data="<product_master>" +
						"<name exact='yes'>"+order_item.item_name+"</name>" +
						"<tax></tax>" +
						"</product_master>";
				fetch_requested_data('',tax_data,function(taxes)
				{
					taxes.forEach(function(tax)
					{
						item_tax=parseFloat((parseFloat(tax.tax)*(item_amount-parseFloat(item_discount)))/100);
					});
					
					item_total=parseFloat(item_amount)+parseFloat(item_tax)-parseFloat(item_discount);
					
					/////saving to bill item
					var bill_item_id=get_new_key();
					var data_xml="<bill_items>" +
							"<id>"+bill_item_id+"</id>" +
							"<item_name>"+order_item.item_name+"</item_name>" +
							"<batch>"+batch+"</batch>" +
							"<unit_price>"+sale_price+"</unit_price>" +
							"<quantity>"+order_item.quantity+"</quantity>" +
							"<amount>"+item_amount+"</amount>" +
							"<total>"+item_total+"</total>" +
							"<discount>"+item_discount+"</discount>" +
							"<offer>"+item_offer+"</offer>" +
							"<type>bought</type>" +
							"<tax>"+item_tax+"</tax>" +
							"<bill_id>"+order_id+"</bill_id>" +
							"<free_with></free_with>" +
							"<storage>"+storage+"</storage>"+
							"<last_updated>"+get_my_time()+"</last_updated>" +
							"</bill_items>";	
					bill_amount+=item_amount;
					bill_total+=item_total;
					bill_discount+=item_discount;
					bill_tax+=item_tax;
					pending_items_count-=1;
					if(is_online())
					{
						server_create_simple(data_xml);
					}
					else
					{
						local_create_simple(data_xml);
					}
				});
			});
		});
		
		/////saving bill details
		var bill_items_complete=setInterval(function()
		{
	  	   if(pending_items_count===0)
	  	   {
	  		   	clearInterval(bill_items_complete);
	  		   	
	  		   	var customer=master_form.elements[1].value;
	  		   	var bill_date=master_form.elements[2].value;
					var bill_num=master_form.elements[3].value;		  		
	  		   		///////////////////////////////////////////////////////////
  		   		var offer_data="<offers>" +
						"<criteria_type>min amount crossed</criteria_type>" +
						"<criteria_amount upperbound='yes'>"+(bill_amount-bill_discount)+"</criteria_amount>" +
						"<offer_type exact='yes'>bill</offer_type>" +
						"<result_type></result_type>" +
						"<discount_percent></discount_percent>" +
						"<discount_amount></discount_amount>" +
						"<quantity_add_percent></quantity_add_percent>" +
						"<quantity_add_amount></quantity_add_amount>" +
						"<free_product_name></free_product_name>" +
						"<free_product_quantity></free_product_quantity>" +
						"<offer_detail></offer_detail>" +
						"<status array='yes'>active--extended</status>" +
						"</offers>";
				fetch_requested_data('',offer_data,function(offers)
				{
					offers.sort(function(a,b)
					{
						if(parseFloat(a.criteria_amount)<parseFloat(b.criteria_amount))
						{	return 1;}
						else 
						{	return -1;}
					});
					
					for(var i in offers)
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								var dis=parseFloat(((bill_amount-bill_discount)*parseInt(offers[i].discount_percent))/100);
								bill_tax-=(bill_tax*(dis/(bill_amount-bill_discount)));
								bill_discount+=dis;
								bill_total=bill_amount-bill_discount+bill_tax;
							}
							else 
							{
								var dis=parseFloat(offers[i].discount_amount)*(Math.floor((bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
								bill_tax-=(bill_tax*(dis/(bill_amount-bill_discount)));
								bill_discount+=dis;
								bill_total=bill_amount-bill_discount+bill_tax;
							}
						}
						else if(offers[i].result_type=='product free')
						{
							var free_product_name=offers[i].free_product_name;
							var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
							
							get_inventory(free_product_name,'',function(free_quantities)
							{
								if(free_quantities>=free_product_quantity)
								{
									var free_batch_data="<bill_items count='1'>" +
											"<batch></batch>" +
											"<item_name exact='yes'>"+free_product_name+"</item_name>" +
											"</bill_items>";
									get_single_column_data(function(data)
									{
										var free_batch="";
										if(data.length>0)
										{
											free_batch=data[0];	
										}
										var bill_item_id=get_new_key();
										var free_xml="<bill_items>" +
													"<id>"+bill_item_id+"</id>" +
													"<item_name>"+free_product_name+"</item_name>" +
													"<batch>"+free_batch+"</batch>" +
													"<unit_price>0</unit_price>" +
													"<quantity>"+free_product_quantity+"</quantity>" +
													"<amount>0</amount>" +
													"<total>0</total>" +
													"<discount>0</discount>" +
													"<offer></offer>" +
													"<type>free</type>" +
													"<tax>0</tax>" +
													"<bill_id>"+order_id+"</bill_id>" +
													"<free_with>bill</free_with>" +
													"<storage>"+storage+"</storage>"+
													"<last_updated>"+last_updated+"</last_updated>" +
													"</bill_items>";	
										
										if(is_online())
										{
											server_create_simple(free_xml);
										}
										else
										{
											local_create_simple(free_xml);
										}
										
									},free_batch_data);
								}
							});
						}
						bill_offer=offers[i].offer_detail;
						break;
					}
			  		
			  		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_amount+"</br>" +
							"Rs. "+bill_discount+"</br>" +
							"Rs. "+bill_tax+"</br>" +
							"Rs. "+bill_total+"</td>" +
							"<td></td>" +
							"</tr>";
					$('#form82_foot').html(total_row);

			  		var save_button=master_form.elements[7];
					$(save_button).off('click');
					$(save_button).on('click',function(event)
					{
						event.preventDefault();
					});
								  		
			  		message_string+="\nAmount: "+bill_amount;
					message_string+="\ndiscount: "+bill_discount;
					message_string+="\nTax: "+bill_tax;
					message_string+="\nTotal: "+bill_total;
					
					var subject="Bill from "+get_session_var('title');
					$('#form82_share').show();
					$('#form82_share').click(function()
					{
						modal44_action(customer,subject,message_string);
					});
					
			  		var bill_xml="<bills>" +
								"<id>"+order_id+"</id>" +
								"<bill_num>"+bill_num+"</bill_num>"+
								"<customer_name>"+customer+"</customer_name>" +
								"<bill_date>"+get_raw_time(bill_date)+"</bill_date>" +
								"<amount>"+bill_amount+"</amount>" +
								"<total>"+bill_total+"</total>" +
								"<type>product</type>" +
								"<offer>"+bill_offer+"</offer>" +
								"<discount>"+bill_discount+"</discount>" +
								"<tax>"+bill_tax+"</tax>" +
								"<transaction_id>"+order_id+"</transaction_id>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</bills>";
					var activity_xml="<activity>" +
								"<data_id>"+order_id+"</data_id>" +
								"<tablename>bills</tablename>" +
								"<link_to>form42</link_to>" +
								"<title>Saved</title>" +
								"<notes>Bill no "+bill_num+"</notes>" +
								"<updated_by>"+get_name()+"</updated_by>" +
								"</activity>";
					var transaction_xml="<transactions>" +
								"<id>"+order_id+"</id>" +
								"<trans_date>"+get_my_time()+"</trans_date>" +
								"<amount>"+bill_total+"</amount>" +
								"<receiver>"+customer+"</receiver>" +
								"<giver>master</giver>" +
								"<tax>"+bill_tax+"</tax>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</transactions>";
					var pt_tran_id=get_new_key();
					var payment_xml="<payments>" +
								"<id>"+pt_tran_id+"</id>" +
								"<status>closed</status>" +
								"<type>received</type>" +
								"<date>"+get_my_time()+"</date>" +
								"<total_amount>"+bill_total+"</total_amount>" +
								"<paid_amount>"+bill_total+"</paid_amount>" +
								"<acc_name>"+customer+"</acc_name>" +
								"<due_date>"+get_credit_period()+"</due_date>" +
								"<mode>"+get_payment_mode()+"</mode>" +
								"<transaction_id>"+pt_tran_id+"</transaction_id>" +
								"<bill_id>"+order_id+"</bill_id>" +
								"<source_info>for sale bill #"+bill_num+"</source_info>"+
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</payments>";
					var pt_xml="<transactions>" +
								"<id>"+pt_tran_id+"</id>" +
								"<trans_date>"+get_my_time()+"</trans_date>" +
								"<amount>"+bill_total+"</amount>" +
								"<receiver>master</receiver>" +
								"<giver>"+customer+"</giver>" +
								"<tax>0</tax>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</transactions>";
					var num_data="<user_preferences>"+
								"<id></id>"+						
								"<name exact='yes'>bill_num</name>"+												
								"</user_preferences>";
					get_single_column_data(function (bill_num_ids)
					{
						if(bill_num_ids.length>0)
						{
							var num_xml="<user_preferences>"+
											"<id>"+bill_num_ids[0]+"</id>"+
											"<value>"+(parseInt(bill_num)+1)+"</value>"+
											"</user_preferences>";
							if(is_online())
							{
								server_update_simple(num_xml);
							}
							else 
							{
								local_update_simple(num_xml);
							}
						}
					},num_data);
					
					if(is_online())
					{
						server_create_row(bill_xml,activity_xml);
						server_create_simple(transaction_xml);
						server_create_simple(pt_xml);
						server_create_simple_func(payment_xml,function()
						{
							modal26_action(pt_tran_id);
						});

					}
					else
					{
						local_create_row(bill_xml,activity_xml);
						local_create_simple(transaction_xml);
						local_create_simple(pt_xml);
						local_create_simple_func(payment_xml,function()
						{
							modal26_action(pt_tran_id);
						});
					}
				});
	  	   }
	    },100);
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}

/**
 * @form Manage Subscriptions
 * @param button
 */
function form84_create_item(form)
{
	if(is_create_access('form84'))
	{
		var customer=form.elements[0].value;
		var service=form.elements[1].value;
		var status=form.elements[2].value;
		var notes=form.elements[3].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var next_due_date=get_my_time();
		var data_xml="<service_subscriptions>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<service>"+service+"</service>" +
					"<status>"+status+"</status>" +
					"<notes>"+notes+"</notes>" +
					"<next_due_date>"+next_due_date+"</next_due_date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_subscriptions>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>service_subscriptions</tablename>" +
					"<link_to>form84</link_to>" +
					"<title>Added</title>" +
					"<notes>Customer "+customer+" for subscription to "+service+"</notes>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form84_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form84_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage Subscriptions
 * @formNo 84
 */
function form84_bills()
{
	var due_lead_time=parseFloat(get_my_time())+86400000;
	
	var subscriptions_data="<service_subscriptions>" +
			"<id></id>" +
			"<customer></customer>" +
			"<service></service>" +
			"<status exact='yes'>active</status>" +
			"<notes></notes>" +
			"<next_due_date upperbound='yes'>"+due_lead_time+"</next_due_date>" +
			"</service_subscriptions>";
	
	fetch_requested_data('',subscriptions_data,function(subscriptions)
	{
		subscriptions.forEach(function(subscription)
		{
			var bill_type='service';
			var order_id=get_new_key();
			var item_amount=0;
			var item_total=0;
			var item_offer="";
			var item_discount=0;
			var item_tax=0;
				
			var service_data="<services count='1'>" +
					"<name exact='yes'>"+subscription.service+"</name>" +
					"<price></price>" +
					"<tax></tax>" +
					"</services>";
			fetch_requested_data('',service_data,function(services)
			{
				item_amount=parseFloat(services[0].price);
				var offer_data="<offers>" +
						"<offer_type>service</offer_type>" +
						"<service exact='yes'>"+subscriptions.service+"</service>" +
						"<criteria_type></criteria_type>" +
						"<criteria_amount></criteria_amount>" +
						"<criteria_quantity></criteria_quantity>" +
						"<result_type></result_type>" +
						"<discount_percent></discount_percent>" +
						"<discount_amount></discount_amount>" +
						"<quantity_add_percent></quantity_add_percent>" +
						"<quantity_add_amount></quantity_add_amount>" +
						"<free_product_name></free_product_name>" +
						"<free_product_quantity></free_product_quantity>" +
						"<offer_detail></offer_detail>" +
						"<status array='yes'>active--extended</status>" +
						"</offers>";
				fetch_requested_data('',offer_data,function(offers)
				{
					offers.sort(function(a,b)
					{
						if(a.criteria_amount<b.criteria_amount)
						{	return 1;}
						else 
						{	return -1;}
					});
							
					for(var i in offers)
					{
						item_offer=offers[i].offer_detail;
						if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=1)
						{
							if(offers[i].result_type=='discount')
							{
								if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
								{
									item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
								}
								else 
								{
									item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(1/parseFloat(offers[i].criteria_quantity)));
								}
							}
							else if(offers[i].result_type=='service free')
							{
								var free_service_name=offers[i].free_service_name;	
								var id=get_new_key();
				        		var free_pre_requisite_data="<pre_requisites>" +
										"<type exact='yes'>service</type>" +
										"<requisite_type exact='yes'>task</requisite_type>" +
										"<name exact='yes'>"+free_service_name+"</name>" +
										"<requisite_name></requisite_name>" +
										"<quantity></quantity>" +
										"</pre_requisites>";
								fetch_requested_data('',free_pre_requisite_data,function(free_pre_requisites)
								{
					                var free_xml="<bill_items>" +
												"<id>"+id+"</id>" +
												"<item_name>"+free_service_name+"</item_name>" +
												"<staff></staff>" +
												"<notes>free service</notes>" +
												"<unit_price>0</unit_price>" +
												"<amount>0</amount>" +
												"<total>0</total>" +
												"<discount>0</discount>" +
												"<offer></offer>" +
												"<type>free</type>" +
												"<tax>0</tax>" +
												"<bill_id>"+order_id+"</bill_id>" +
												"<free_with>"+subscription.service+"</free_with>" +
												"<last_updated>"+last_updated+"</last_updated>" +
												"</bill_items>";	
									if(is_online())
									{
										server_create_simple(free_xml);
									}
									else
									{
										local_create_simple(free_xml);
									}
									
									free_pre_requisites.forEach(function(free_pre_requisite)
									{
										var task_id=get_new_key();
										var task_xml="<task_instances>" +
												"<id>"+task_id+"</id>" +
												"<name>"+free_pre_requisite.name+"</name>" +
												"<assignee></assignee>" +
												"<t_initiated>"+get_my_time()+"</t_initiated>" +
												"<t_due>"+get_task_due_period()+"</t_due>" +
												"<status>pending</status>" +
												"<task_hours>"+free_pre_requisite.quantity+"</task_hours>" +
												"<source>service</source>" +
												"<source_id>"+id+"</source_id>" +
												"<last_updated>"+last_updated+"</last_updated>" +
												"</task_instances>";
										var activity_xml="<activity>" +
												"<data_id>"+task_id+"</data_id>" +
												"<tablename>task_instances</tablename>" +
												"<link_to>form14</link_to>" +
												"<title>Added</title>" +
												"<notes>Task "+free_pre_requisite.name+"</notes>" +
												"<updated_by>"+get_name()+"</updated_by>" +
												"</activity>";
								
										if(is_online())
										{
											server_create_row(task_xml,activity_xml);
										}
										else
										{
											local_create_row(task_xml,activity_xml);
										}		
									});
							
								});
							}
							break;
						}
						else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=item_amount)
						{
							if(offers[i].result_type=='discount')
							{
								if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
								{
									item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
								}
								else 
								{
									item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount)));
								}
							}
							else if(offers[i].result_type=='service free')
							{
								var free_service_name=offers[i].free_service_name;	
								var id=get_new_key();
				        		var free_pre_requisite_data="<pre_requisites>" +
										"<type exact='yes'>service</type>" +
										"<requisite_type exact='yes'>task</requisite_type>" +
										"<name exact='yes'>"+free_service_name+"</name>" +
										"<requisite_name></requisite_name>" +
										"<quantity></quantity>" +
										"</pre_requisites>";
								fetch_requested_data('',free_pre_requisite_data,function(free_pre_requisites)
								{
					                var free_xml="<bill_items>" +
												"<id>"+id+"</id>" +
												"<item_name>"+free_service_name+"</item_name>" +
												"<staff></staff>" +
												"<notes>free service</notes>" +
												"<unit_price>0</unit_price>" +
												"<amount>0</amount>" +
												"<total>0</total>" +
												"<discount>0</discount>" +
												"<offer></offer>" +
												"<type>free</type>" +
												"<tax>0</tax>" +
												"<bill_id>"+order_id+"</bill_id>" +
												"<free_with>"+subscription.service+"</free_with>" +
												"<last_updated>"+last_updated+"</last_updated>" +
												"</bill_items>";	
									if(is_online())
									{
										server_create_simple(free_xml);
									}
									else
									{
										local_create_simple(free_xml);
									}
									
									free_pre_requisites.forEach(function(free_pre_requisite)
									{
										var task_id=get_new_key();
										var task_xml="<task_instances>" +
												"<id>"+task_id+"</id>" +
												"<name>"+free_pre_requisite.name+"</name>" +
												"<assignee></assignee>" +
												"<t_initiated>"+get_my_time()+"</t_initiated>" +
												"<t_due>"+get_task_due_period()+"</t_due>" +
												"<status>pending</status>" +
												"<task_hours>"+free_pre_requisite.quantity+"</task_hours>" +
												"<source>service</source>" +
												"<source_id>"+id+"</source_id>" +
												"<last_updated>"+get_my_time()+"</last_updated>" +
												"</task_instances>";
										var activity_xml="<activity>" +
												"<data_id>"+task_id+"</data_id>" +
												"<tablename>task_instances</tablename>" +
												"<link_to>form14</link_to>" +
												"<title>Added</title>" +
												"<notes>Task "+free_pre_requisite.name+"</notes>" +
												"<updated_by>"+get_name()+"</updated_by>" +
												"</activity>";
								
										if(is_online())
										{
											server_create_row(task_xml,activity_xml);
										}
										else
										{
											local_create_row(task_xml,activity_xml);
										}		
									});
							
								});
							}

							break;
						}
					}
					
					item_tax=parseFloat((parseFloat(services[0].tax)*(item_amount-parseFloat(item_discount)))/100);
					item_total=parseFloat(item_amount)+parseFloat(item_tax)-parseFloat(item_discount);
					
					var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
					get_single_column_data(function(bill_nums)
					{
						var bill_num=bill_nums[0];
						/////saving to bill item
						var bill_item_id=get_new_key();
		                var data_xml="<bill_items>" +
									"<id>"+bill_item_id+"</id>" +
									"<item_name>"+subscription.service+"</item_name>" +
									"<batch></batch>" +
									"<unit_price>"+services[0].price+"</unit_price>" +
									"<quantity>1</quantity>" +
									"<amount>"+item_amount+"</amount>" +
									"<total>"+item_total+"</total>" +
									"<discount>"+item_discount+"</discount>" +
									"<offer>"+item_offer+"</offer>" +
									"<type>bought</type>" +
									"<tax>"+item_tax+"</tax>" +
									"<bill_id>"+order_id+"</bill_id>" +
									"<free_with></free_with>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</bill_items>";	
		                var bill_xml="<bills>" +
									"<id>"+order_id+"</id>" +
									"<bill_num>"+bill_num+"</bill_num>"+								
									"<customer_name>"+subscription.customer+"</customer_name>" +
									"<bill_date>"+get_my_time()+"</bill_date>" +
									"<amount>"+item_amount+"</amount>" +
									"<total>"+item_total+"</total>" +
									"<type>service</type>" +
									"<offer></offer>" +
									"<discount>"+item_discount+"</discount>" +
									"<tax>"+item_tax+"</tax>" +
									"<transaction_id>"+order_id+"</transaction_id>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</bills>";
						var activity_xml="<activity>" +
									"<data_id>"+order_id+"</data_id>" +
									"<tablename>bills</tablename>" +
									"<link_to>form42</link_to>" +
									"<title>Saved</title>" +
									"<notes>Bill no "+order_id+"</notes>" +
									"<updated_by>"+get_name()+"</updated_by>" +
									"</activity>";
						var transaction_xml="<transactions>" +
									"<id>"+order_id+"</id>" +
									"<trans_date>"+get_my_time()+"</trans_date>" +
									"<amount>"+item_total+"</amount>" +
									"<receiver>"+subscription.customer+"</receiver>" +
									"<giver>master</giver>" +
									"<tax>"+item_tax+"</tax>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</transactions>";
						var pt_tran_id=get_new_key();
						var payment_xml="<payments>" +
									"<id>"+pt_tran_id+"</id>" +
									"<status>pending</status>" +
									"<type>received</type>" +
									"<date>"+get_my_time()+"</date>" +
									"<total_amount>"+item_total+"</total_amount>" +
									"<paid_amount>0</paid_amount>" +
									"<acc_name>"+subscription.customer+"</acc_name>" +
									"<due_date>"+get_credit_period()+"</due_date>" +
									"<mode>"+get_payment_mode()+"</mode>" +
									"<transaction_id>"+pt_tran_id+"</transaction_id>" +
									"<bill_id>"+order_id+"</bill_id>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
						var pt_xml="<transactions>" +
									"<id>"+pt_tran_id+"</id>" +
									"<trans_date>"+get_my_time()+"</trans_date>" +
									"<amount>"+item_total+"</amount>" +
									"<receiver>master</receiver>" +
									"<giver>"+subscription.customer+"</giver>" +
									"<tax>0</tax>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</transactions>";
						if(is_online())
						{
							server_create_simple(data_xml);
							server_create_row(bill_xml,activity_xml);
							server_create_simple(transaction_xml);
							server_create_simple(pt_xml);
							server_create_simple(payment_xml);
						}
						else
						{
							local_create_simple(data_xml);
							local_create_row(bill_xml,activity_xml);
							local_create_simple(transaction_xml);
							local_create_simple(pt_xml);
							local_create_simple(payment_xml);
						}
					
						var num_data="<user_preferences>"+
							"<id></id>"+						
							"<name exact='yes'>bill_num</name>"+												
							"</user_preferences>";
						get_single_column_data(function (bill_num_ids)
						{
							if(bill_num_ids.length>0)
							{
								var num_xml="<user_preferences>"+
												"<id>"+bill_num_ids[0]+"</id>"+
												"<value>"+(parseInt(bill_num)+1)+"</value>"+
												"</user_preferences>";
								if(is_online())
								{
									server_update_simple(num_xml);
								}
								else 
								{
									local_update_simple(num_xml);
								}
							}
						},num_data);
						
					},bill_num_data);	
					////adding pre-requisite tasks
					
					var pre_requisite_data="<pre_requisites>" +
							"<type exact='yes'>service</type>" +
							"<requisite_type exact='yes'>task</requisite_type>" +
							"<name exact='yes'>"+subscription.service+"</name>" +
							"<requisite_name></requisite_name>" +
							"<quantity></quantity>" +
							"</pre_requisites>";
					fetch_requested_data('',pre_requisite_data,function(pre_requisites)
					{
						pre_requisites.forEach(function(pre_requisite)
						{
							var task_id=get_new_key();
							var task_xml="<task_instances>" +
									"<id>"+task_id+"</id>" +
									"<name>"+pre_requisite.name+"</name>" +
									"<assignee></assignee>" +
									"<t_initiated>"+get_my_time()+"</t_initiated>" +
									"<t_due>"+get_task_due_period()+"</t_due>" +
									"<status>pending</status>" +
									"<task_hours>"+pre_requisite.quantity+"</task_hours>" +
									"<source>service</source>" +
									"<source_id>"+bill_item_id+"</source_id>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</task_instances>";
							var activity_xml="<activity>" +
									"<data_id>"+task_id+"</data_id>" +
									"<tablename>task_instances</tablename>" +
									"<link_to>form14</link_to>" +
									"<title>Added</title>" +
									"<notes>Task "+pre_requisite.name+" assigned to </notes>" +
									"<updated_by>"+get_name()+"</updated_by>" +
									"</activity>";
					
							if(is_online())
							{
								server_create_row(task_xml,activity_xml);
							}
							else
							{
								local_create_row(task_xml,activity_xml);
							}		
						});
					});

					
					
					////////////updating subscription//////////////
					var subscription_period_data="<attributes>" +
							"<type exact='yes'>service</type>" +
							"<attribute>subscription period</attribute>" +
							"<name exact='yes'>"+subscription.service+"</name>" +
							"<value></value>" +
							"</attributes>";
					fetch_requested_data('',subscription_period_data,function(periods)
					{
						if(periods.length>0)
						{
							var date=new Date(parseFloat(subscription.next_due_date));
							var day=date.getDate();
							var month=date.getMonth();
							var year=date.getFullYear();
							var next_due_date="";
							var period_value=parseInt(periods[0].value.substring(0,2));
							console.log(periods[0].value);							
							console.log(periods[0].value.search('month'));							
							if(periods[0].value.search('month')!=-1)
							{
								month+=period_value;
								year+=parseInt(month/12);
								month=parseInt(month%12);
							}
							else if(periods[0].value.search('day')!=-1)
							{
								day+=period_value;
								month+=parseInt(day/30);
								day=parseInt(day%30);
								year+=parseInt(month/12);
								month=parseInt(month%12);
								
							}
							else if(periods[0].value.search('year')!=-1)
							{
								year+=period_value;
							}
							var new_date=new Date(year,month,day,0,0,0,0);
							next_due_date=new_date.getTime();
							
							var subscription_xml="<service_subscriptions>" +
									"<id>"+subscription.id+"</id>" +
									"<last_bill_id>"+order_id+"</last_bill_id>" +
									"<last_bill_date>"+get_my_time()+"</last_bill_date>" +
									"<next_due_date>"+next_due_date+"</next_due_date>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</service_subscriptions>";
							if(is_online())
							{
								server_update_simple(subscription_xml);
							}
							else
							{
								local_update_simple(subscription_xml);
							}
						}
					});
				});
			});
		});
	});
}

/**
 * @form Manufacturing Schedule
 * @formNo 88
 */
function form88_create_item(form)
{
	if(is_create_access('form88'))
	{
		var product=form.elements[0].value;
		var process=form.elements[1].value;
		var status=form.elements[2].value;
		var schedule=get_raw_time(form.elements[3].value);
		var iteration=form.elements[4].value;
		var data_id=form.elements[5].value;
		form.elements[8].value=status;
		var last_updated=get_my_time();
		var data_xml="<manufacturing_schedule>" +
					"<id>"+data_id+"</id>" +
					"<product>"+product+"</product>" +
					"<process_notes>"+process+"</process_notes>" +
					"<status>"+status+"</status>" +
					"<schedule>"+schedule+"</schedule>" +
					"<iteration_notes>"+iteration+"</iteration_notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</manufacturing_schedule>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>manufacturing_schedule</tablename>" +
					"<link_to>form88</link_to>" +
					"<title>Added</title>" +
					"<notes>Manufacturing schedule for product "+product+"</notes>" +
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

		if(status=='scheduled')
		{
			var pre_requisite_data="<pre_requisites>" +
					"<type exact='yes'>product</type>" +
					"<requisite_type exact='yes'>task</requisite_type>" +
					"<name exact='yes'>"+product+"</name>" +
					"<requisite_name></requisite_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			fetch_requested_data('',pre_requisite_data,function(pre_requisites)
			{
				pre_requisites.forEach(function(pre_requisite)
				{
					var task_id=get_new_key();
					var task_xml="<task_instances>" +
							"<id>"+task_id+"</id>" +
							"<name>"+pre_requisite.name+"</name>" +
							"<assignee></assignee>" +
							"<t_initiated>"+get_my_time()+"</t_initiated>" +
							"<t_due>"+get_task_due_time(schedule)+"</t_due>" +
							"<status>pending</status>" +
							"<task_hours>"+pre_requisite.quantity+"</task_hours>" +
							"<source>product</source>" +
							"<source_id>"+data_id+"</source_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</task_instances>";
					var activity_xml="<activity>" +
							"<data_id>"+task_id+"</data_id>" +
							"<tablename>task_instances</tablename>" +
							"<link_to>form14</link_to>" +
							"<title>Added</title>" +
							"<notes>Task "+pre_requisite.name+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
			
					if(is_online())
					{
						server_create_row(task_xml,activity_xml);
					}
					else
					{
						local_create_row(task_xml,activity_xml);
					}		
				});
			});
		}

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form88_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form88_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Appointments
 * @formNo 89
 */
function form89_create_item(form)
{
	if(is_create_access('form89'))
	{
		var name=form.elements[0].value;
		var assignee=form.elements[1].value;
		var schedule=get_raw_time(form.elements[2].value);
		var notes=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<appointments>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+name+"</customer>" +
					"<assignee>"+assignee+"</assignee>" +
					"<schedule>"+schedule+"</schedule>" +
					"<status>"+status+"</status>" +
					"<hours>1</hours>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		var message_string=name+" appointment with "+assignee+" @"+form.elements[2].value+"\nNotes:"+result.notes;
		message_string=encodeURIComponent(message_string);
		$("#form89_whatsapp_"+data_id).attr('href',"whatsapp://send?text="+message_string);
		$("#form89_whatsapp_"+data_id).show();
		
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form89_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form89_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Billing types
 * @formNo 90
 */
function form90_create_item(form)
{
	if(is_create_access('form90'))
	{
		show_loader();

		var name=form.elements[0].value;
		var notes=form.elements[1].value;
		var status='active';
		var data_id=form.elements[2].value;
		var last_updated=get_my_time();
		var data_xml="<bill_types>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<notes>"+notes+"</notes>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_types>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bill_types</tablename>" +
					"<link_to>form90</link_to>" +
					"<title>Added</title>" +
					"<notes>Billing type "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var num_xml="<user_preferences>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"_bill_num</name>" +
					"<display_name>Next "+name+" Bill series number</display_name>"+					
					"<value>1</value>" +
					"<status>active</status>" +
					"<type>accounting</type>"+
					"<shortcut></shortcut>"+
					"<sync>checked</sync>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_preferences>";

		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(num_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(num_xml);
		}

		var product_instance_data="<product_instances>" +
					"<id></id>" +
					"<product_name></product_name>" +
					"<batch></batch>" +
					"<sale_price></sale_price>" +
					"</product_instances>";
		fetch_requested_data('',product_instance_data,function(instances)
		{
			var prices_xml="<sale_prices>";
			var id=parseFloat(get_new_key());
			var counter=0;
			instances.forEach(function(instance)
			{
				if(counter==500)
				{
					counter=0;
					prices_xml+="</sale_prices><separator></separator><sale_prices>";
				}
				prices_xml+="<row>" +
						"<id>"+id+"</id>" +
						"<product_name>"+instance.product_name+"</product_name>" +
						"<batch>"+instance.batch+"</batch>" +
						"<sale_price>"+instance.sale_price+"</sale_price>" +
						"<pi_id>"+instance.id+"</pi_id>" +
						"<billing_type>"+name+"</billing_type>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</row>";
				id+=1;
				counter+=1;
			});
			prices_xml+="</sale_prices>";
			if(is_online())
			{
				server_create_batch(prices_xml);
			}
			else
			{
				local_create_batch(prices_xml);
			}
		});

		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[4];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form90_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form90_update_item(form);
		});
		
		var sales_price_complete=setInterval(function()
		{
  		   if(localdb_open_requests===0 && number_active_ajax===0)
  		   {
  			   clearInterval(sales_price_complete);
	  		   hide_loader();
  		   }
	    },3000);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Bill(multiple registers)
 * @formNo 91
 * @param button
 */
function form91_create_item(form)
{
	if(is_create_access('form91'))
	{
		var bill_id=document.getElementById("form91_master").elements[5].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var price=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var offer=form.elements[8].value;
		var data_id=form.elements[9].value;
		var free_product_name=form.elements[12].value;
		var free_product_quantity=form.elements[13].value;
		
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<amount>"+amount+"</amount>" +
				"<total>"+total+"</total>" +
				"<discount>"+discount+"</discount>" +
				"<offer>"+offer+"</offer>" +
				"<type>bought</type>" +
				"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<free_with></free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		//////adding free product to the bill if applicable
		if(free_product_name!="" && free_product_name!=null)
		{
			get_inventory(free_product_name,'',function(free_quantities)
			{
				if(free_quantities>=free_product_quantity)
				{
					var free_batch_data="<bill_items count='1'>" +
							"<batch></batch>" +
							"<item_name exact='yes'>"+free_product_name+"</item_name>" +
							"</bill_items>";
					get_single_column_data(function(data)
					{
						var free_batch="";
						if(data.length>0)
						{
							free_batch=data[0];	
						}
						
						var id=get_new_key();
						rowsHTML="<tr>";
							rowsHTML+="<form id='form91_"+id+"'></form>";
			                	rowsHTML+="<td data-th='Item'>";
			                    	rowsHTML+="<input type='text' readonly='readonly' form='form91_"+id+"' value='"+free_product_name+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Batch'>";
		                                rowsHTML+="<input type='text' required form='form91_"+id+"' value='"+free_batch+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Quantity'>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form91_"+id+"' value='"+free_product_quantity+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Unit Price'>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form91_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Total'>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form91_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Action'>";
		                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='free with "+name+"'>";
		                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+id+"'>";
		                                rowsHTML+="<input type='button' class='save_icon' form='form91_"+id+"' id='save_form91_"+id+"' >";
		                                rowsHTML+="<input type='button' class='delete_icon' form='form91_"+id+"' id='delete_form91_"+id+"' onclick='form91_delete_item($(this));'>";
		                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value=''>";
		                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value=''>";
		                        rowsHTML+="</td>";
		                rowsHTML+="</tr>";
	
		            $('#form91_body').prepend(rowsHTML);
	
						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_batch+"</batch>" +
									"<unit_price>0</unit_price>" +
									"<quantity>"+free_product_quantity+"</quantity>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+bill_id+"</bill_id>" +
									"<free_with>"+name+"</free_with>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
					},free_batch_data);
				}
				else
				{
					$("#modal7").dialog("open");
				}
			});
		}
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form91_delete_item(del_button);
		});

		var save_button=form.elements[10];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create bill(bakery)
 * @formNo 91
 * @param button
 */
function form91_create_form()
{
	if(is_create_access('form91'))
	{
		var form=document.getElementById("form91_master");
		
		var customer=form.elements[1].value;
		var bill_type=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var bill_num=form.elements[4].value;
		
		var message_string="Bill from: "+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form91']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[2].value;
			message_string+=" Total: "+subform.elements[4].value;
		});

		var data_id=form.elements[5].value;
		var transaction_id=form.elements[7].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<quantity_add_percent></quantity_add_percent>" +
				"<quantity_add_amount></quantity_add_amount>" +
				"<free_product_name></free_product_name>" +
				"<free_product_quantity></free_product_quantity>" +
				"<offer_detail></offer_detail>" +
				"<status array='yes'>active--extended</status>" +
				"</offers>";
		fetch_requested_data('',offer_data,function(offers)
		{
			offers.sort(function(a,b)
			{
				if(a.criteria_amount<b.criteria_amount)
				{	return 1;}
				else 
				{	return -1;}
			});
			
			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else 
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];	
								}

								var id=get_new_key();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form91_"+id+"'></form>";
					                	rowsHTML+="<td data-th='Item'>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form91_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Batch'>";
				                                rowsHTML+="<input type='text' required form='form91_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Quantity'>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form91_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Unit Price'>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form91_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Total'>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form91_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Action'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='button' class='save_icon' form='form91_"+id+"' id='save_form91_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form91_"+id+"' id='delete_form91_"+id+"' onclick='form91_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form91_body').prepend(rowsHTML);

				                var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";	
								
								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}
							},free_batch_data);
						}
						else
						{
							$("#modal7").dialog("open");
						}
					});
				}
				offer_detail=offers[i].offer_detail;
				break;
			}
			
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<bill_num>"+bill_num+"</bill_num>"+
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form92</link_to>" +
						"<title>Saved</title>" +
						"<notes>Bill no "+bill_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
						"<id>"+transaction_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>"+customer+"</receiver>" +
						"<giver>master</giver>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var pt_tran_id=get_new_key();
			var payment_xml="<payments>" +
						"<id>"+pt_tran_id+"</id>" +
						"<status>closed</status>" +
						"<type>received</type>" +
						"<date>"+get_my_time()+"</date>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+total+"</paid_amount>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<due_date>"+get_credit_period()+"</due_date>" +
						"<mode>"+get_payment_mode()+"</mode>" +
						"<transaction_id>"+pt_tran_id+"</transaction_id>" +
						"<bill_id>"+data_id+"</bill_id>" +
						"<source_info>for sale bill #"+bill_num+"</source_info>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</payments>";
			var pt_xml="<transactions>" +
						"<id>"+pt_tran_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>master</receiver>" +
						"<giver>"+customer+"</giver>" +
						"<tax>0</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var num_data="<user_preferences>"+
						"<id></id>"+						
						"<name exact='yes'>"+bill_type+"_bill_num</name>"+												
						"</user_preferences>";
			get_single_column_data(function (bill_num_ids)
			{
				if(bill_num_ids.length>0)
				{
					var num_xml="<user_preferences>"+
									"<id>"+bill_num_ids[0]+"</id>"+
									"<value>"+(parseInt(bill_num)+1)+"</value>"+
									"</user_preferences>";
					if(is_online())
					{
						server_update_simple(num_xml);
					}
					else 
					{
						local_update_simple(num_xml);
					}
				}
			},num_data);

			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction_xml);
				server_create_simple(pt_xml);
				server_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction_xml);
				local_create_simple(pt_xml);
				local_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			
			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form91_foot').html(total_row);

			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			
			var subject="Bill from "+get_session_var('title');
			$('#form91_share').show();
			$('#form91_share').off('click');
			$('#form91_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});
		});
		
		var save_button=form.elements[8];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form91_update_form();
		});
		
		$("[id^='save_form91_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 96
 * form Customer Attributes
 * @param button
 */
function form96_create_item(form)
{
	if(is_create_access('form96'))
	{
		var customer=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+customer+"</name>" +
					"<type>customer</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form96</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for customer "+customer+"</notes>" +
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
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form96_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form96_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 97
 * form Supplier Attributes
 * @param button
 */
function form97_create_item(form)
{
	if(is_create_access('form97'))
	{
		var supplier=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+supplier+"</name>" +
					"<type>supplier</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form97</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for supplier "+supplier+"</notes>" +
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
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form97_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form97_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 98
 * form Staff Attributes
 * @param button
 */
function form98_create_item(form)
{
	if(is_create_access('form98'))
	{
		var staff=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+staff+"</name>" +
					"<type>staff</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form98</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for staff "+staff+"</notes>" +
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
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form98_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form98_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 101
 * form Manage Projects
 * @param button
 */
function form101_create_item(form)
{
	if(is_create_access('form101'))
	{
		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var start_date=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<projects>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<start_date>"+start_date+"</start_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</projects>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>projects</tablename>" +
					"<link_to>form101</link_to>" +
					"<title>Added</title>" +
					"<notes>Project "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>projects</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"<access_type>all</access_type>" +
					"<access_type>user</access_type>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form101_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form101_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Team
 * @formNo 102
 * @param button
 */
function form102_create_item(form)
{
	if(is_create_access('form102'))
	{
		var project_id=document.getElementById('form102_master').elements[2].value;
		var member=form.elements[0].value;
		var role=form.elements[1].value;
		var notes=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<project_team>" +
					"<id>"+data_id+"</id>" +
					"<project_id>"+project_id+"</project_id>" +
					"<member>"+member+"</member>" +
					"<role>"+role+"</role>" +
					"<notes>"+notes+"</notes>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</project_team>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>project_team</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"<access_type>all</access_type>" +
					"<user_type>user</user_type>"+
					"<user>"+get_account_name()+"</user>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";
		if(is_online())
		{
			server_create_simple(data_xml);
			server_create_simple(access_xml);
		}
		else
		{
			local_create_simple(data_xml);
			local_create_simple(access_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form102_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form102_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Team
 * @param button
 */
function form102_create_form()
{
	$("[id^='save_form102_']").click();
}

/**
 * @form Project Phases
 * @formNo 103
 * @param button
 */
function form103_create_item(form)
{
	if(is_create_access('form103'))
	{
		var project_id=document.getElementById('form103_master').elements[2].value;
		var phase=form.elements[0].value;
		var details=form.elements[1].value;
		var start_date=get_raw_time(form.elements[2].value);
		var due_date=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
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
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>project_phases</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"<access_type>all</access_type>" +
					"<user_type>user</user_type>"+
					"<user>"+get_account_name()+"</user>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";
		if(is_online())
		{
			server_create_simple(data_xml);
			server_create_simple(access_xml);
		}
		else
		{
			local_create_simple(data_xml);
			local_create_simple(access_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form103_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form103_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Team
 * @param button
 */
function form103_create_form()
{
	$("[id^='save_form103_']").click();
}


/**
 * @form Manage Data Access
 * @formNo 105
 * @param button
 */
function form105_create_item(form)
{
	if(is_create_access('form105'))
	{
		var tablename=document.getElementById('form105_master').elements[1].value;
		var record_id=document.getElementById('form105_master').elements[2].value;
		var access_type=form.elements[0].value;
		var user_type=form.elements[1].value;
		var user=form.elements[2].value;
		var user_field=form.elements[3].value;
		var criteria_field=form.elements[4].value;
		var criteria_value=form.elements[5].value;
		var data_id=form.elements[6].value;
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
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[8];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form105_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Data Access
 * @param button
 */
function form105_create_form()
{
	$("[id^='save_form105_']").click();
}


/**
 * This function transforms a sale order into a bill
 * It is applicable for product bills only
 * @form 108
 * @param order_id
 */
function form108_bill(order_id,bill_type)
{
	if(is_create_access('form108'))
	{
		show_loader();
		//var bill_type='product';
		var bill_amount=0;
		var bill_total=0;
		var bill_offer="";
		var bill_discount=0;
		var bill_tax=0;
		var pending_items_count=0;
		///////selecting all ordered items////
		var order_item_data="<sale_order_items>" +
				"<id></id>" +
				"<order_id exact='yes'>"+order_id+"</order_id>" +
				"<item_name></item_name>" +
				"<quantity></quantity>" +
				"<notes></notes>" +
				"</sale_order_items>";
		fetch_requested_data('',order_item_data,function(order_items)
		{
			pending_items_count=order_items.length;
			order_items.forEach(function(order_item)
			{
				var item_amount=0;
				var item_total=0;
				var item_offer="";
				var item_discount=0;
				var item_tax=0;
				
				get_inventory(order_item.item_name,'',function(quantity)
				{
					if(parseFloat(quantity)>=parseFloat(order_item.quantity))
					{
						var batch_data="<product_instances count='1'>" +
								"<batch></batch>" +
								"<sale_price></sale_price>" +
								"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
								"</product_instances>";
						fetch_requested_data('',batch_data,function(batches)
						{
							var batch="";
							var sale_price=0;
							if(batches.length>0)
							{
								batch=batches[0].batch;
								sale_price=batches[0].sale_price;
							}
				
							var price_data="<sale_prices count='1'>" +
									"<sale_price></sale_price>" +
									"<billing_type exact='yes'>"+bill_type+"</billing_type>" +
									"<batch exact='yes'>"+batch+"</batch>" +
									"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
									"</sale_prices>";
							get_single_column_data(function(sale_prices)
							{
								if(sale_prices.length>0)
								{
									sale_price=sale_prices[0];
								}
								//////adding offer details
								item_amount=parseFloat(order_item.quantity)*parseFloat(sale_price);
								var offer_data="<offers>" +
										"<offer_type>product</offer_type>" +
										"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
										"<batch array='yes'>--"+batch+"--all--</batch>" +
										"<criteria_type></criteria_type>" +
										"<criteria_amount></criteria_amount>" +
										"<criteria_quantity></criteria_quantity>" +
										"<result_type></result_type>" +
										"<discount_percent></discount_percent>" +
										"<discount_amount></discount_amount>" +
										"<quantity_add_percent></quantity_add_percent>" +
										"<quantity_add_amount></quantity_add_amount>" +
										"<free_product_name></free_product_name>" +
										"<free_product_quantity></free_product_quantity>" +
										"<offer_detail></offer_detail>" +
										"<status array='yes'>--active--extended--</status>" +
										"</offers>";
								fetch_requested_data('',offer_data,function(offers)
								{
									offers.sort(function(a,b)
									{
										if(parseFloat(a.criteria_amount)<parseFloat(b.criteria_amount))
										{	return 1;}
										else if(parseFloat(a.criteria_quantity)<parseFloat(b.criteria_quantity))
										{	return 1;}
										else 
										{	return -1;}
									});
											
									for(var i in offers)
									{
										//console.log("found atleast one offer");
										item_offer=offers[i].offer_detail;
										if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(order_item.quantity))
										{
											console.log("offer criteria met");
	
											if(offers[i].result_type=='discount')
											{
												if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
												{
													item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
												}
												else 
												{
													item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(order_item.quantity)/parseFloat(offers[i].criteria_quantity)));
												}
											}
											else if(offers[i].result_type=='quantity addition')
											{
												if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
												{
													order_item.quantity=parseFloat(order_item.quantity)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
												}
												else 
												{
													order_items.quantity=parseFloat(order_item.quantity)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(order_items.quantity)/parseFloat(offers[i].criteria_quantity))));
												}
											}
											else if(offers[i].result_type=='product free')
											{
												//console.log("adding free product as per offer");
	
												var free_product_name=offers[i].free_product_name;
												var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(order_item.quantity)/parseFloat(offers[i].criteria_quantity)));
												
												get_inventory(free_product_name,'',function(free_quantities)
												{
													if(parseFloat(free_quantities)>=free_product_quantity)
													{
														var free_batch_data="<bill_items count='1'>" +
																"<batch></batch>" +
																"<item_name exact='yes'>"+free_product_name+"</item_name>" +
																"</bill_items>";
														get_single_column_data(function(data)
														{
															var free_batch="";
															if(data.length>0)
															{
																free_batch=data[0];	
															}
															
															var bill_item_id=get_new_key();
											                var free_xml="<bill_items>" +
																		"<id>"+bill_item_id+"</id>" +
																		"<item_name>"+free_product_name+"</item_name>" +
																		"<batch>"+free_batch+"</batch>" +
																		"<unit_price>0</unit_price>" +
																		"<quantity>"+free_product_quantity+"</quantity>" +
																		"<amount>0</amount>" +
																		"<total>0</total>" +
																		"<discount>0</discount>" +
																		"<offer></offer>" +
																		"<type>free</type>" +
																		"<tax>0</tax>" +
																		"<bill_id>"+order_id+"</bill_id>" +
																		"<free_with>"+order_item.item_name+"</free_with>" +
																		"<last_updated>"+get_my_time()+"</last_updated>" +
																		"</bill_items>";	
															
															if(is_online())
															{
																server_create_simple(free_xml);
															}
															else
															{
																local_create_simple(free_xml);
															}
														},free_batch_data);
													}
												});
											}
											break;
										}
										else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=item_amount)
										{
											if(offers[i].result_type=='discount')
											{
												if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
												{
													item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
												}
												else 
												{
													item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount)));
												}
											}
											else if(offers[i].result_type=='quantity addition')
											{
												if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
												{
													order_item.quantity=parseFloat(order_item.quantity)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
												}
												else 
												{
													order_item.quantity=parseFloat(order_item.quantity)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount))));
												}
											}
											else if(offers[i].result_type=='product free')
											{
												var free_product_name=offers[i].free_product_name;
												var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
																							
												//////updating product quantity in inventory
												get_inventory(free_product_name,'',function(free_quantities)
												{
													if(free_quantities>=free_product_quantity)
													{
														var free_batch_data="<bill_items count='1'>" +
																"<batch></batch>" +
																"<item_name exact='yes'>"+free_product_name+"</item_name>" +
																"</bill_items>";
														get_single_column_data(function(data)
														{
															var free_batch="";
															if(data.length>0)
															{
																free_batch=data[0];	
															}
															var bill_item_id=get_new_key();
											                var free_xml="<bill_items>" +
																		"<id>"+bill_item_id+"</id>" +
																		"<item_name>"+free_product_name+"</item_name>" +
																		"<batch>"+free_batch+"</batch>" +
																		"<unit_price>0</unit_price>" +
																		"<quantity>"+free_product_quantity+"</quantity>" +
																		"<amount>0</amount>" +
																		"<total>0</total>" +
																		"<discount>0</discount>" +
																		"<offer></offer>" +
																		"<type>free</type>" +
																		"<tax>0</tax>" +
																		"<bill_id>"+order_id+"</bill_id>" +
																		"<free_with>"+order_item.item_name+"</free_with>" +
																		"<last_updated>"+last_updated+"</last_updated>" +
																		"</bill_items>";	
															
															if(is_online())
															{
																server_create_simple(free_xml);
															}
															else
															{
																local_create_simple(free_xml);
															}
														},free_batch_data);
													}
												});
											}
											break;
										}
									}
								
									var tax_data="<product_master>" +
											"<name exact='yes'>"+order_item.item_name+"</name>" +
											"<tax></tax>" +
											"</product_master>";
									fetch_requested_data('',tax_data,function(taxes)
									{
										taxes.forEach(function(tax)
										{
											item_tax=parseFloat((parseFloat(tax.tax)*(item_amount-parseFloat(item_discount)))/100);
										});
										
										item_total=parseFloat(item_amount)+parseFloat(item_tax)-parseFloat(item_discount);
										
										/////saving to bill item
										var bill_item_id=get_new_key();
						                var data_xml="<bill_items>" +
												"<id>"+bill_item_id+"</id>" +
												"<item_name>"+order_item.item_name+"</item_name>" +
												"<batch>"+batch+"</batch>" +
												"<unit_price>"+sale_price+"</unit_price>" +
												"<quantity>"+order_item.quantity+"</quantity>" +
												"<amount>"+item_amount+"</amount>" +
												"<total>"+item_total+"</total>" +
												"<discount>"+item_discount+"</discount>" +
												"<offer>"+item_offer+"</offer>" +
												"<type>bought</type>" +
												"<tax>"+item_tax+"</tax>" +
												"<bill_id>"+order_id+"</bill_id>" +
												"<free_with></free_with>" +
												"<last_updated>"+get_my_time()+"</last_updated>" +
												"</bill_items>";	
										bill_amount+=item_amount;
										bill_total+=item_total;
										bill_discount+=item_discount;
										bill_tax+=item_tax;
										pending_items_count-=1;
										
										console.log(data_xml);
	
										if(is_online())
										{
											server_create_simple(data_xml);
										}
										else
										{
											local_create_simple(data_xml);
										}
									});
									
								});
									
							},price_data);
							
						});
					}
					else
					{
						pending_items_count-=1;
					}
				});
			});
		});
		
		
		/////saving bill details
		var bill_items_complete=setInterval(function()
		{
	  	   if(pending_items_count===0)
	  	   {
	  		   	clearInterval(bill_items_complete);
	  		   	
	  		   	var order_data="<sale_orders>" +
	  		   			"<id>"+order_id+"</id>" +
	  		   			"<customer_name></customer_name>" +
	  		   			"<order_date></order_date>" +
	  		   			"<type>product</type>" +
	  		   			"<status exact='yes'>pending</status>" +
	  		   			"</sale_orders>";
	  		   	fetch_requested_data('',order_data,function(sale_orders)
	  		   	{
	  		   		console.log(sale_orders);
	  		   		///////////////////////////////////////////////////////////
	  		   		var offer_data="<offers>" +
							"<criteria_type exact='yes'>min amount crossed</criteria_type>" +
							"<criteria_amount upperbound='yes'>"+(bill_amount-bill_discount)+"</criteria_amount>" +
							"<offer_type exact='yes'>bill</offer_type>" +
							"<result_type></result_type>" +
							"<discount_percent></discount_percent>" +
							"<discount_amount></discount_amount>" +
							"<quantity_add_percent></quantity_add_percent>" +
							"<quantity_add_amount></quantity_add_amount>" +
							"<free_product_name></free_product_name>" +
							"<free_product_quantity></free_product_quantity>" +
							"<offer_detail></offer_detail>" +
							"<status array='yes'>active--extended</status>" +
							"</offers>";
					fetch_requested_data('',offer_data,function(offers)
					{
						offers.sort(function(a,b)
						{
							if(parseFloat(a.criteria_amount)<parseFloat(b.criteria_amount))
							{	return 1;}
							else 
							{	return -1;}
						});
						
						for(var i in offers)
						{
							if(offers[i].result_type=='discount')
							{
								if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
								{
									var dis=parseFloat(((bill_amount-bill_discount)*parseInt(offers[i].discount_percent))/100);
									bill_tax-=(bill_tax*(dis/(bill_amount-bill_discount)));
									bill_discount+=dis;
									bill_total=bill_amount-bill_discount+bill_tax;
								}
								else 
								{
									var dis=parseFloat(offers[i].discount_amount)*(Math.floor((bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
									bill_tax-=(bill_tax*(dis/(bill_amount-bill_discount)));
									bill_discount+=dis;
									bill_total=bill_amount-bill_discount+bill_tax;
								}
							}
							else if(offers[i].result_type=='product free')
							{
								var free_product_name=offers[i].free_product_name;
								var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
								
								get_inventory(free_product_name,'',function(free_quantities)
								{
									if(free_quantities>=free_product_quantity)
									{
										var free_batch_data="<bill_items count='1'>" +
												"<batch></batch>" +
												"<item_name exact='yes'>"+free_product_name+"</item_name>" +
												"</bill_items>";
										get_single_column_data(function(data)
										{
											var free_batch="";
											if(data.length>0)
											{
												free_batch=data[0];	
											}
											var bill_item_id=get_new_key();
							                var free_xml="<bill_items>" +
														"<id>"+bill_item_id+"</id>" +
														"<item_name>"+free_product_name+"</item_name>" +
														"<batch>"+free_batch+"</batch>" +
														"<unit_price>0</unit_price>" +
														"<quantity>"+free_product_quantity+"</quantity>" +
														"<amount>0</amount>" +
														"<total>0</total>" +
														"<discount>0</discount>" +
														"<offer></offer>" +
														"<type>free</type>" +
														"<tax>0</tax>" +
														"<bill_id>"+order_id+"</bill_id>" +
														"<free_with>bill</free_with>" +
														"<last_updated>"+last_updated+"</last_updated>" +
														"</bill_items>";	
											
											if(is_online())
											{
												server_create_simple(free_xml);
											}
											else
											{
												local_create_simple(free_xml);
											}
											
										},free_batch_data);
									}
								});
							}
							bill_offer=offers[i].offer_detail;
							break;
						}
						
						for(var z in sale_orders)
						{
							var sale_order_xml="<sale_orders>" +
										"<id>"+order_id+"</id>" +
										"<status>billed</status>" +
										"</sale_orders>";
							var transaction_xml="<transactions>" +
										"<id>"+order_id+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>"+sale_orders[z].customer_name+"</receiver>" +
										"<giver>master</giver>" +
										"<tax>"+bill_tax+"</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
							var pt_tran_id=get_new_key();
							var payment_xml="<payments>" +
										"<id>"+pt_tran_id+"</id>" +
										"<status>pending</status>" +
										"<type>received</type>" +
										"<date>"+get_my_time()+"</date>" +
										"<total_amount>"+bill_total+"</total_amount>" +
										"<paid_amount>0</paid_amount>" +
										"<acc_name>"+sale_orders[z].customer_name+"</acc_name>" +
										"<due_date>"+get_credit_period()+"</due_date>" +
										"<mode>"+get_payment_mode()+"</mode>" +
										"<transaction_id>"+pt_tran_id+"</transaction_id>" +
										"<bill_id>"+order_id+"</bill_id>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</payments>";
							var pt_xml="<transactions>" +
										"<id>"+pt_tran_id+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>master</receiver>" +
										"<giver>"+sale_orders[z].customer_name+"</giver>" +
										"<tax>0</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
							if(is_online())
							{
								server_update_simple(sale_order_xml);
								server_create_simple(transaction_xml);
								server_create_simple(pt_xml);
								server_create_simple(payment_xml);
							}
							else
							{
								local_update_simple(sale_order_xml);
								local_create_simple(transaction_xml);
								local_create_simple(pt_xml);
								local_create_simple(payment_xml);
							}
							
							var num_data="<user_preferences>"+
										"<id></id>"+						
										"<value></value>"+										
										"<name exact='yes'>"+bill_type+"_bill_num</name>"+												
										"</user_preferences>";
							fetch_requested_data('',num_data,function (bill_num_ids)
							{
								if(bill_num_ids.length>0)
								{
									var num_xml="<user_preferences>"+
											"<id>"+bill_num_ids[0].id+"</id>"+
											"<value>"+(parseInt(bill_num_ids[0].value)+1)+"</value>"+
											"</user_preferences>";
									var bill_xml="<bills>" +
										"<id>"+order_id+"</id>" +
										"<bill_num>"+bill_num_ids[0].value+"</bill_num>"+										
										"<customer_name>"+sale_orders[z].customer_name+"</customer_name>" +
										"<bill_date>"+get_my_time()+"</bill_date>" +
										"<billing_type>"+bill_type+"</billing_type>" +
										"<amount>"+bill_amount+"</amount>" +
										"<total>"+bill_total+"</total>" +
										"<type>product</type>" +
										"<offer>"+bill_offer+"</offer>" +
										"<discount>"+bill_discount+"</discount>" +
										"<tax>"+bill_tax+"</tax>" +
										"<transaction_id>"+order_id+"</transaction_id>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</bills>";			
									var activity_xml="<activity>" +
										"<data_id>"+order_id+"</data_id>" +
										"<tablename>bills</tablename>" +
										"<link_to>form42</link_to>" +
										"<title>Saved</title>" +
										"<notes>Bill no "+order_id+"</notes>" +
										"<updated_by>"+get_name()+"</updated_by>" +
										"</activity>";
							
									if(is_online())
									{
										server_update_simple(num_xml);
										server_create_row(bill_xml,activity_xml);
									}
									else 
									{
										local_update_simple(num_xml);
										local_create_row(bill_xml,activity_xml);
									}
								}
							});
						}
						hide_loader();
					});
	  		   		///////////////////////////////////////////////////////////
	  		   	});
	  	   }
	    },100);
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}


/**
 * formNo 109
 * form Asset Attributes
 * @param button
 */
function form109_create_item(form)
{
	if(is_create_access('form109'))
	{
		var asset=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+asset+"</name>" +
					"<type>asset</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form109</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for asset "+asset+"</notes>" +
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
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form109_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form109_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Reports
 * @param button
 */
function form111_create_item(form)
{
	if(is_create_access('form111'))
	{
		var report_id=document.getElementById('form111_master').elements[3].value;
		var table1=form.elements[0].value;
		var field1=form.elements[1].value;
		var condition=form.elements[2].value;
		var table2=form.elements[3].value;
		var field2=form.elements[4].value;
		var value=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<report_items>" +
					"<id>"+data_id+"</id>" +
					"<table1>"+table1+"</table1>" +
					"<field1>"+field1+"</field1>" +
					"<condition1>"+condition+"</condition1>" +
					"<table2>"+table2+"</table2>" +
					"<field2>"+field2+"</field2>" +
					"<value>"+value+"</value>" +
					"<report_id>"+report_id+"</report_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</report_items>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[8];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form111_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Reports
 */
function form111_create_form()
{
	if(is_create_access('form111'))
	{
		var form=document.getElementById("form111_master");

		var name=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<reports>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</reports>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>reports</tablename>" +
					"<link_to>form111</link_to>" +
					"<title>Created</title>" +
					"<notes>Report "+name+"</notes>" +
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
	
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form111_update_form();
		});
		
		$("[id^='save_form111_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}


/**
 * @form Add unbilled sale items
 * @param button
 */
function form112_create_item(form)
{
	if(is_create_access('form112'))
	{
		var customer=document.getElementById('form112_master').elements[1].value;
		var sale_date=get_raw_time(document.getElementById('form112_master').elements[2].value);
		var item_name=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<unbilled_sale_items>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<item_name>"+item_name+"</item_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<sale_date>"+sale_date+"</sale_date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</unbilled_sale_items>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form112_delete_item(del_button);
		});
		
		var save_button=form.elements[4];
		$(save_button).off('click');

	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Add unbilled sale items
 * @param button
 */
function form112_create_form()
{
	if(is_create_access('form112'))
	{
		$("[id^='save_form112_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}


/**
 * @form Add unbilled purchase items
 * @param button
 */
function form114_create_item(form)
{
	if(is_create_access('form114'))
	{
		var supplier=document.getElementById('form114_master').elements[1].value;
		var purchase_date=get_raw_time(document.getElementById('form114_master').elements[2].value);
		var item_name=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<unbilled_purchase_items>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<item_name>"+item_name+"</item_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<purchase_date>"+purchase_date+"</purchase_date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</unbilled_purchase_items>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form114_delete_item(del_button);
		});
		
		var save_button=form.elements[4];
		$(save_button).off('click');

	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Add unbilled purchase items
 * @param button
 */
function form114_create_form()
{
	if(is_create_access('form114'))
	{
		$("[id^='save_form114_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}

/**
 * @form Create Bill(loyalty)
 * @formNo 118
 * @param button
 */
function form118_create_item(form)
{
	if(is_create_access('form118'))
	{
		var bill_id=document.getElementById("form118_master").elements[4].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var price=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var offer=form.elements[8].value;
		var data_id=form.elements[9].value;
		var free_product_name=form.elements[12].value;
		var free_product_quantity=form.elements[13].value;
		
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<amount>"+amount+"</amount>" +
				"<total>"+total+"</total>" +
				"<discount>"+discount+"</discount>" +
				"<offer>"+offer+"</offer>" +
				"<type>bought</type>" +
				"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<free_with></free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		//////adding free product to the bill if applicable
		if(free_product_name!="" && free_product_name!=null)
		{
			get_inventory(free_product_name,'',function(free_quantities)
			{
				if(free_quantities>=free_product_quantity)
				{
					var free_batch_data="<bill_items count='1'>" +
							"<batch></batch>" +
							"<item_name exact='yes'>"+free_product_name+"</item_name>" +
							"</bill_items>";
					get_single_column_data(function(data)
					{
						var free_batch="";
						if(data.length>0)
						{
							free_batch=data[0];	
						}
						
						var id=get_new_key();
						rowsHTML="<tr>";
							rowsHTML+="<form id='form118_"+id+"'></form>";
			                	rowsHTML+="<td data-th='Item'>";
			                    	rowsHTML+="<input type='text' readonly='readonly' form='form118_"+id+"' value='"+free_product_name+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Batch'>";
		                                rowsHTML+="<input type='text' required form='form118_"+id+"' value='"+free_batch+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Quantity'>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='"+free_product_quantity+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Unit Price'>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Total'>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Action'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='free with "+name+"'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+id+"'>";
		                                rowsHTML+="<input type='button' class='save_icon' form='form118_"+id+"' id='save_form118_"+id+"' >";
		                                rowsHTML+="<input type='button' class='delete_icon' form='form118_"+id+"' id='delete_form118_"+id+"' onclick='form118_delete_item($(this));'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
		                        rowsHTML+="</td>";
		                rowsHTML+="</tr>";
	
		                $('#form118_body').prepend(rowsHTML);
	
						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_batch+"</batch>" +
									"<unit_price>0</unit_price>" +
									"<quantity>"+free_product_quantity+"</quantity>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+bill_id+"</bill_id>" +
									"<free_with>"+name+"</free_with>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
					},free_batch_data);
				}
				else
				{
					$("#modal7").dialog("open");
				}
			});
		}
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form118_delete_item(del_button);
		});
		var save_button=form.elements[10];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create bill(loyalty)
 * @formNo 118
 * @param button
 */
function form118_create_form()
{
	if(is_create_access('form118'))
	{
		var form=document.getElementById("form118_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var bill_num=form.elements[3].value;
		
		var message_string="Bill from: "+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form118']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[2].value;
			message_string+=" Total: "+subform.elements[4].value;
		});

		var data_id=form.elements[4].value;
		var transaction_id=form.elements[6].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<quantity_add_percent></quantity_add_percent>" +
				"<quantity_add_amount></quantity_add_amount>" +
				"<free_product_name></free_product_name>" +
				"<free_product_quantity></free_product_quantity>" +
				"<offer_detail></offer_detail>" +
				"<status array='yes'>active--extended</status>" +
				"</offers>";
		fetch_requested_data('',offer_data,function(offers)
		{
			offers.sort(function(a,b)
			{
				if(a.criteria_amount<b.criteria_amount)
				{	return 1;}
				else 
				{	return -1;}
			});
			
			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else 
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];	
								}

								var id=get_new_key();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form118_"+id+"'></form>";
					                	rowsHTML+="<td data-th='Item'>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form118_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Batch'>";
				                                rowsHTML+="<input type='text' required form='form118_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Quantity'>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Unit Price'>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Total'>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Action'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='button' class='save_icon' form='form118_"+id+"' id='save_form118_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form118_"+id+"' id='delete_form118_"+id+"' onclick='form118_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form118_body').prepend(rowsHTML);

				                var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";	
								
								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}
							},free_batch_data);
						}
						else
						{
							$("#modal7").dialog("open");
						}
					});
				}
				offer_detail=offers[i].offer_detail;
				break;
			}
			
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<bill_num>"+bill_num+"</bill_num>"+
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Saved</title>" +
						"<notes>Bill no "+bill_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
						"<id>"+transaction_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>"+customer+"</receiver>" +
						"<giver>master</giver>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var pt_tran_id=get_new_key();
			var payment_xml="<payments>" +
						"<id>"+pt_tran_id+"</id>" +
						"<status>closed</status>" +
						"<type>received</type>" +
						"<date>"+get_my_time()+"</date>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+total+"</paid_amount>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<due_date>"+get_credit_period()+"</due_date>" +
						"<mode>"+get_payment_mode()+"</mode>" +
						"<transaction_id>"+pt_tran_id+"</transaction_id>" +
						"<bill_id>"+data_id+"</bill_id>" +
						"<source_info>for sale bill #"+bill_num+"</source_info>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</payments>";
			var pt_xml="<transactions>" +
						"<id>"+pt_tran_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>master</receiver>" +
						"<giver>"+customer+"</giver>" +
						"<tax>0</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var num_data="<user_preferences>"+
						"<id></id>"+						
						"<name exact='yes'>bill_num</name>"+												
						"</user_preferences>";
			get_single_column_data(function (bill_num_ids)
			{
				if(bill_num_ids.length>0)
				{
					var num_xml="<user_preferences>"+
									"<id>"+bill_num_ids[0]+"</id>"+
									"<value>"+(parseInt(bill_num)+1)+"</value>"+
									"</user_preferences>";
					if(is_online())
					{
						server_update_simple(num_xml);
					}
					else 
					{
						local_update_simple(num_xml);
					}
				}
			},num_data);

			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction_xml);
				server_create_simple(pt_xml);
				server_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction_xml);
				local_create_simple(pt_xml);
				local_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			
			var loyalty_program_data="<loyalty_programs>"+
									"<name></name>"+
									"<points_addition></points_addition>"+
									"<status exact='yes'>active</status>"+
									"</loyalty_programs>";
			fetch_requested_data('',loyalty_program_data,function(programs)
			{
				array_unique(programs);
				programs.forEach(function(program)
				{
					var points=parseFloat(program.points_addition)*parseFloat(total);
					var loyalty_points_xml="<loyalty_points>"+
						"<id>"+get_new_key()+"</id>"+
						"<program_name>"+program.name+"</program_name>"+
						"<customer>"+customer+"</customer>"+
						"<points_addition>"+program.points_addition+"</points_addition>"+
						"<points>"+points+"</points>"+
						"<date>"+get_my_date()+"</date>"+
						"<source>sale</source>"+
						"<source_id>"+data_id+"</source_id>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</loyalty_points>";
					if(is_online())
					{
						server_create_simple(loyalty_points_xml);
					}
					else
					{
						local_create_simple(loyalty_points_xml);
					}	
				});
			});
			
			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form118_foot').html(total_row);

			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			
			var subject="Bill from "+get_session_var('title');
			$('#form118_share').show();
			$('#form118_share').off('click');
			$('#form118_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});
		});
		
		var save_button=form.elements[10];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form118_update_form();
		});
		
		$("[id^='save_form118_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Bill(multiple registers, unbilled items)
 * @formNo 119
 * @param button
 */
function form119_create_item(form)
{
	if(is_create_access('form119'))
	{
		var bill_id=document.getElementById("form119_master").elements[6].value;
		var customer=document.getElementById("form119_master").elements[1].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var squantity=form.elements[2].value;
		var fquantity=form.elements[3].value;
		var quantity=parseFloat(squantity)+parseFloat(fquantity);
		var price=form.elements[4].value;
		var mrp=form.elements[5].value;
		var amount=form.elements[6].value;
		var discount=form.elements[7].value;
		var tax=form.elements[8].value;
		var total=form.elements[9].value;
		var offer=form.elements[10].value;
		var data_id=form.elements[11].value;
		var free_product_name=form.elements[14].value;
		var free_product_quantity=form.elements[15].value;
		var unbilled_item=form.elements[16].value;
		
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<p_quantity>"+squantity+"</p_quantity>" +
				"<f_quantity>"+fquantity+"</f_quantity>" +
				"<unit_price>"+price+"</unit_price>" +
				"<mrp>"+mrp+"</mrp>" +
				"<amount>"+amount+"</amount>" +
				"<total>"+total+"</total>" +
				"<discount>"+discount+"</discount>" +
				"<offer>"+offer+"</offer>" +
				"<type>bought</type>" +
				"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<free_with></free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";
		var unbilled_xml="<unbilled_sale_items>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"<customer>"+customer+"</customer>" +
				"</unbilled_sale_items>";
		if(is_online())
		{
			server_create_simple(data_xml);
			if(unbilled_item=='yes')
				server_delete_simple(unbilled_xml);
		}
		else
		{
			local_create_simple(data_xml);
			if(unbilled_item=='yes')
				local_delete_simple(unbilled_xml);
		}

		//////adding free product to the bill if applicable
		if(free_product_name!="" && free_product_name!=null)
		{
			get_inventory(free_product_name,'',function(free_quantities)
			{
				if(free_quantities>=free_product_quantity)
				{
					var free_batch_data="<bill_items count='1'>" +
							"<batch></batch>" +
							"<item_name exact='yes'>"+free_product_name+"</item_name>" +
							"</bill_items>";
					get_single_column_data(function(data)
					{
						var free_batch="";
						if(data.length>0)
						{
							free_batch=data[0];	
						}
						
						var id=get_new_key();
						
						var rowsHTML="<tr>";
						rowsHTML+="<form id='form119_"+id+"'></form>";
							rowsHTML+="<td data-th='Product Name'>";
								rowsHTML+="<label id='form119_product_make_"+id+"'></label>";
								rowsHTML+="<br><v2></v2><textarea required form='form119_"+id+"' readonly='readonly'>"+free_product_name+"</textarea>";
								rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' onclick='modal14_action();'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Batch'>";
								rowsHTML+="<input type='text' required form='form119_"+id+"' value='"+free_batch+"'>";
								rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' onclick='modal22_action();'>";
								rowsHTML+="<br><v2>Expiry: </v2><label id='form119_exp_"+id+"'></label>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<v1>Bought: </v1><input type='number' min='0' required readonly='readonly' form='form119_"+id+"' step='any' value='0'>";
								rowsHTML+="<br><v2>Free: </v2><input type='number' min='0' value='0' required readonly='readonly' form='form119_"+id+"' step='any' value='"+free_product_quantity+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Price'>";
								rowsHTML+="<v1>Sale: </v1>Rs. <input type='number' required min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
								rowsHTML+="<br><v2>MRP: </v2>Rs. <input type='number' min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Total'>";
								rowsHTML+="<v1>Amount: </v1>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
								rowsHTML+="<input type='hidden' value='0' form='form119_"+id+"' readonly='readonly'>";
								rowsHTML+="<br><v2>Tax: </v2>Rs. <input type='number' required min='0' value='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form119_"+id+"' value='0'>";
								rowsHTML+="<input type='hidden' form='form119_"+id+"' value='free with "+name+"'>";
								rowsHTML+="<input type='hidden' form='form119_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form119_"+id+"' id='save_form119_"+id+"' >";
								rowsHTML+="<input type='button' class='delete_icon' form='form119_"+id+"' id='delete_form119_"+id+"' onclick='form119_delete_item($(this));'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
						     
		            $('#form119_body').prepend(rowsHTML);
	
		            var make_data="<product_master>" +
								"<make></make>" +
								"<name exact='yes'>"+free_product_name+"</name>" +
								"</product_master>";
						get_single_column_data(function(data)
						{
							if(data.length>0)
							{
								document.getElementById('form119_product_make_'+id).innerHTML=data[0]+":";
							}
						},make_data);
						
						var exp_data="<product_instances>" +
								"<expiry></expiry>" +
								"<product_name exact='yes'>"+free_product_name+"</product_name>" +
								"<batch exact='yes'>"+free_batch+"</batch>" +
								"</product_instances>";
						get_single_column_data(function(data)
						{
							if(data.length>0)
							{
								document.getElementById('form119_exp_'+id).innerHTML=get_my_past_date(data[0]);
							}
						},exp_data);
		                
						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_batch+"</batch>" +
									"<unit_price>0</unit_price>" +
									"<mrp>0</mrp>" +
									"<p_quantity>0</p_quantity>" +
									"<f_quantity>"+free_product_quantity+"</f_quantity>" +
									"<quantity>"+free_product_quantity+"</quantity>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+bill_id+"</bill_id>" +
									"<free_with>"+name+"</free_with>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
					},free_batch_data);
				}
				else
				{
					$("#modal7").dialog("open");
				}
			});
		}
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		var save_button=form.elements[12];
		$(save_button).off('click');
		
		var del_button=form.elements[13];
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form119_delete_item(del_button);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create bill(multiple registers, unbilled items)
 * @formNo 119
 * @param button
 */
function form119_create_form()
{
	if(is_create_access('form119'))
	{
		var form=document.getElementById("form119_master");
		
		var customer=form.elements[1].value;
		var bill_type=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var bill_num=form.elements[4].value;
		
		var message_string="Bill from: "+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form119']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			amount+=parseFloat(subform.elements[6].value);
			discount+=parseFloat(subform.elements[7].value);
			tax+=parseFloat(subform.elements[8].value);
			total+=parseFloat(subform.elements[9].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+parseFloat(subform.elements[2].value)+parseFloat(subform.elements[3].value);
			message_string+=" Total: "+subform.elements[9].value;
		});
		
		var data_id=form.elements[6].value;
		var transaction_id=form.elements[8].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<quantity_add_percent></quantity_add_percent>" +
				"<quantity_add_amount></quantity_add_amount>" +
				"<free_product_name></free_product_name>" +
				"<free_product_quantity></free_product_quantity>" +
				"<offer_detail></offer_detail>" +
				"<status array='yes'>--active--extended--</status>" +
				"</offers>";
		fetch_requested_data('',offer_data,function(offers)
		{
			offers.sort(function(a,b)
			{
				if(a.criteria_amount<b.criteria_amount)
				{	return 1;}
				else 
				{	return -1;}
			});
			
			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else 
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];	
								}

								var id=get_new_key();
								
								var rowsHTML="<tr>";
								rowsHTML+="<form id='form119_"+id+"'></form>";
									rowsHTML+="<td data-th='Product Name'>";
										rowsHTML+="<label id='form119_product_make_"+id+"'></label>";
										rowsHTML+="<br><v2></v2><textarea required form='form119_"+id+"' readonly='readonly'>"+free_product_name+"</textarea>";
										rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' onclick='modal14_action();'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Batch'>";
										rowsHTML+="<input type='text' required form='form119_"+id+"' value='"+free_batch+"'>";
										rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' onclick='modal22_action();'>";
										rowsHTML+="<br><v2>Expiry: </v2><label id='form119_exp_"+id+"'></label>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Quantity'>";
										rowsHTML+="<v1>Bought: </v1><input type='number' min='0' required readonly='readonly' form='form119_"+id+"' step='any' value='0'>";
										rowsHTML+="<br><v2>Free: </v2><input type='number' min='0' value='0' required readonly='readonly' form='form119_"+id+"' step='any' value='"+free_product_quantity+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Price'>";
										rowsHTML+="<v1>Sale: </v1>Rs. <input type='number' required min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
										rowsHTML+="<br><v2>MRP: </v2>Rs. <input type='number' min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Total'>";
										rowsHTML+="<v1>Amount: </v1>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
										rowsHTML+="<input type='hidden' value='0' form='form119_"+id+"' readonly='readonly'>";
										rowsHTML+="<br><v2>Tax: </v2>Rs. <input type='number' required min='0' value='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Action'>";
										rowsHTML+="<input type='hidden' form='form119_"+id+"' value='0'>";
										rowsHTML+="<input type='hidden' form='form119_"+id+"' value='free with "+name+"'>";
										rowsHTML+="<input type='hidden' form='form119_"+id+"' value='"+id+"'>";
										rowsHTML+="<input type='button' class='submit_hidden' form='form119_"+id+"' id='save_form119_"+id+"' >";
										rowsHTML+="<input type='button' class='delete_icon' form='form119_"+id+"' id='delete_form119_"+id+"' onclick='form119_delete_item($(this));'>";
									rowsHTML+="</td>";			
								rowsHTML+="</tr>";
								     
				                $('#form119_body').prepend(rowsHTML);
			
				                var make_data="<product_master>" +
										"<make></make>" +
										"<name exact='yes'>"+free_product_name+"</name>" +
										"</product_master>";
								get_single_column_data(function(data)
								{
									if(data.length>0)
									{
										document.getElementById('form119_product_make_'+id).innerHTML=data[0]+":";
									}
								},make_data);
								
								var exp_data="<product_instances>" +
										"<expiry></expiry>" +
										"<product_name exact='yes'>"+free_product_name+"</product_name>" +
										"<batch exact='yes'>"+free_batch+"</batch>" +
										"</product_instances>";
								get_single_column_data(function(data)
								{
									if(data.length>0)
									{
										document.getElementById('form119_exp_'+id).innerHTML=get_my_past_date(data[0]);
									}
								},exp_data);
				                
								var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<mrp>0</mrp>" +
											"<p_quantity>0</p_quantity>" +
											"<f_quantity>"+free_product_quantity+"</f_quantity>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";	
								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}
							},free_batch_data);
						}
						else
						{
							$("#modal7").dialog("open");
						}
					});
				}
				offer_detail=offers[i].offer_detail;
				break;
			}
			
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<bill_num>"+bill_num+"</bill_num>"+
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form92</link_to>" +
						"<title>Saved</title>" +
						"<notes>Bill no "+bill_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
						"<id>"+transaction_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>"+customer+"</receiver>" +
						"<giver>master</giver>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var num_data="<user_preferences>"+
						"<id></id>"+						
						"<name exact='yes'>"+bill_type+"_bill_num</name>"+												
						"</user_preferences>";
			get_single_column_data(function (bill_num_ids)
			{
				if(bill_num_ids.length>0)
				{
					var num_xml="<user_preferences>"+
									"<id>"+bill_num_ids[0]+"</id>"+
									"<value>"+(parseInt(bill_num)+1)+"</value>"+
									"</user_preferences>";
					if(is_online())
					{
						server_update_simple(num_xml);
					}
					else 
					{
						local_update_simple(num_xml);
					}
				}
			},num_data);
			
			var pt_tran_id=get_new_key();
			var p_status="closed";
			var p_amount=total;
			if((get_payment_mode())=='credit')
			{
				p_status='pending';
				p_amount=0;
			}
			var payment_xml="<payments>" +
						"<id>"+pt_tran_id+"</id>" +
						"<status>"+p_status+"</status>" +
						"<type>received</type>" +
						"<date>"+get_my_time()+"</date>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+p_amount+"</paid_amount>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<due_date>"+get_credit_period()+"</due_date>" +
						"<mode>"+get_payment_mode()+"</mode>" +
						"<transaction_id>"+pt_tran_id+"</transaction_id>" +
						"<bill_id>"+data_id+"</bill_id>" +
						"<source_info>for sale bill #"+bill_num+"</source_info>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</payments>";
			var pt_xml="<transactions>" +
						"<id>"+pt_tran_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>master</receiver>" +
						"<giver>"+customer+"</giver>" +
						"<tax>0</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction_xml);
				server_create_simple(pt_xml);
				server_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id,function(mode,paid_amount)
					{
						document.getElementById('form119_payment_info').innerHTML="Payment: "+mode+"<br>Paid: Rs."+paid_amount;
					});
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction_xml);
				local_create_simple(pt_xml);
				local_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id,function(mode,paid_amount)
					{
						document.getElementById('form119_payment_info').innerHTML="Payment: "+mode+"<br>Paid: Rs."+paid_amount;
					});
				});
			}
			
			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form119_foot').html(total_row);
			
			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			
			var subject="Bill from "+get_session_var('title');
			$('#form119_share').show();
			$('#form119_share').off('click');
			$('#form119_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});

		});

		var save_button=form.elements[10];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form119_update_form();
		});
		
		$("[id^='save_form119_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Enter Supplier Bill(unbilled items)
 * @formNo 122
 * @param button
 */
function form122_create_item(form)
{
	if(is_create_access('form122'))
	{
		var bill_id=document.getElementById("form122_master").elements[7].value;
		var supplier=document.getElementById("form122_master").elements[1].value;
		
		var name=form.elements[0].value;
		var pquantity=form.elements[1].value;
		var fquantity=form.elements[2].value;
		var quantity=parseFloat(pquantity)+parseFloat(fquantity);
		var total=form.elements[3].value;
		var tax=form.elements[4].value;
		var amount=form.elements[5].value;
		var price=form.elements[6].value;
		var batch=form.elements[8].value;
		var storage=form.elements[9].value;
		var data_id=form.elements[10].value;
		var unbilled_item=form.elements[13].value;
		
		var last_updated=get_my_time();
			
		var data_xml="<supplier_bill_items>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+batch+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<p_quantity>"+pquantity+"</p_quantity>" +
				"<f_quantity>"+fquantity+"</f_quantity>" +
				"<total>"+total+"</total>" +
				"<tax>"+tax+"</tax>" +
				"<amount>"+amount+"</amount>" +
				"<unit_price>"+price+"</unit_price>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<storage>"+storage+"</storage>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</supplier_bill_items>";	
		var unbilled_xml="<unbilled_purchase_items>" +
				"<supplier>"+supplier+"</supplier>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"</unbilled_purchase_items>";
		if(is_online())
		{
			server_create_simple(data_xml);
			if(unbilled_item=='yes')
				server_delete_simple(unbilled_xml);
		}
		else
		{
			local_create_simple(data_xml);
			if(unbilled_item=='yes')
				local_delete_simple(unbilled_xml);
		}
				
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[12];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form122_delete_item(del_button);
		});

		var save_button=form.elements[11];
		$(save_button).off('click');
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+name+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && storage!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+name+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				if(is_online())
				{
					server_create_simple(storage_xml);
				}
				else
				{
					local_create_simple(storage_xml);
				}
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 121
 * form Adjust Loyalty Points
 * @param button
 */
function form121_create_item(form)
{
	if(is_create_access('form121'))
	{
		var program=form.elements[0].value;
		var customer=form.elements[1].value;
		var points=form.elements[2].value;
		var date=form.elements[3].value;
		var source=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<loyalty_points>" +
					"<id>"+data_id+"</id>" +
					"<program_name>"+program+"</program_name>" +
					"<customer>"+customer+"</customer>" +
					"<points>"+points+"</points>" +
					"<date>"+get_raw_time(date)+"</date>" +
					"<source>"+source+"</source>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</loyalty_points>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>loyalty_points</tablename>" +
					"<link_to>form121</link_to>" +
					"<title>Added</title>" +
					"<notes>"+points+" Loyalty points to "+customer+"</notes>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form121_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New supplier Bill
 * @param button
 */
function form122_create_form()
{
	if(is_create_access('form122'))
	{
		var form=document.getElementById("form122_master");
		
		var supplier=form.elements[1].value;
		var bill_id=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var entry_date=get_raw_time(form.elements[4].value);
		
		var total=0;
		var tax=0;
		var amount=0;
		
		$("[id^='save_form122']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[3].value);
			tax+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
		});

		var discount=0;
		total=total-discount;
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form122_foot').html(total_row);
		
		var notes=form.elements[5].value;
		var data_id=form.elements[7].value;
		var transaction_id=form.elements[8].value;
		var last_updated=get_my_time();
		
		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Saved</title>" +
					"<notes>Supplier Bill no "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+supplier+"</giver>" +
					"<tax>"+(-tax)+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		var pt_tran_id=get_new_key();
		var payment_xml="<payments>" +
					"<id>"+pt_tran_id+"</id>" +
					"<status>pending</status>" +
					"<type>paid</type>" +
					"<date>"+get_my_time()+"</date>" +
					"<total_amount>"+total+"</total_amount>" +
					"<paid_amount>0</paid_amount>" +
					"<acc_name>"+supplier+"</acc_name>" +
					"<due_date>"+get_debit_period()+"</due_date>" +
					"<mode>"+get_payment_mode()+"</mode>" +
					"<transaction_id>"+pt_tran_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";
		var pt_xml="<transactions>" +
					"<id>"+pt_tran_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+supplier+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(transaction_xml);
			server_create_simple(pt_xml);
			server_create_simple_func(payment_xml,function()
			{
				modal28_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				modal28_action(pt_tran_id);
			});
		}
		
		var save_button=form.elements[10];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form122_update_form();
		});
		
		$("[id^='save_form122_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 123
 * form Mandatory Attributes
 * @param button
 */
function form123_create_item(form)
{
	if(is_create_access('form123'))
	{
		var object=form.elements[0].value;
		var attribute=form.elements[1].value;
		var values=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var del_button=form.elements[6];
		var last_updated=get_my_time();
		var data_xml="<mandatory_attributes>" +
					"<id>"+data_id+"</id>" +
					"<object>"+object+"</object>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+values+"</value>"+
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</mandatory_attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>mandatory_attributes</tablename>" +
					"<link_to>form123</link_to>" +
					"<title>Added</title>" +
					"<notes>Mandatory attribute "+attribute+" for "+object+"</notes>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form123_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form123_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 125
 * form Customer Accounts
 * @param button
 */
function form125_create_item(form)
{
	if(is_create_access('form125'))
	{
		var customer=form.elements[0].value;
		var username=form.elements[1].value;
		var password=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var domain=get_domain();
	
		var salt='$2a$10$'+domain+'1234567891234567891234';
		var salt_22=salt.substring(0, 29);
		
		var bcrypt = new bCrypt();
		bcrypt.hashpw(password, salt_22, function(newhash)
		{		
			var data_xml="<accounts>" +
						"<id>"+data_id+"</id>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<username unique='yes'>"+username+"</username>" +
						"<status>"+status+"</status>" +
						"<password>"+newhash+"</password>"+					
						"<type>customer</type>"+					
						"<last_updated>"+last_updated+"</last_updated>" +
						"</accounts>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>accounts</tablename>" +
						"<link_to>form125</link_to>" +
						"<title>Added</title>" +
						"<notes>Account for username "+username+"</notes>" +
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
			for(var i=0;i<5;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
			var del_button=form.elements[6];
			del_button.removeAttribute("onclick");
			$(del_button).on('click',function(event)
			{
				form125_delete_item(del_button);
			});
			
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form125_update_item(form);
			});
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
};

/**
 * @form Job Order
 * @param button
 */
function form130_create_item(form)
{
	if(is_create_access('form130'))
	{
		var bill_id=document.getElementById("form130_master").elements[3].value;
		
		var name=form.elements[0].value;
		var batch="";
		var staff="";
		var quantity="";
		var notes="";
		if(isNaN(form.elements[2].value))
		{
			staff=form.elements[1].value;
			notes=form.elements[2].value;
		}
		else
		{
			batch=form.elements[1].value;
			quantity=form.elements[2].value;
		}
		var price=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var offer=form.elements[8].value;
		var data_id=form.elements[9].value;
		var free_product_name=form.elements[12].value;
		var free_product_quantity=form.elements[13].value;
		var free_service_name=form.elements[14].value;
		var last_updated=get_my_time();
		
		if(isNaN(form.elements[2].value))
		{
			var pre_requisite_data="<pre_requisites>" +
					"<type exact='yes'>service</type>" +
					"<requisite_type exact='yes'>task</requisite_type>" +
					"<name exact='yes'>"+name+"</name>" +
					"<requisite_name></requisite_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			fetch_requested_data('',pre_requisite_data,function(pre_requisites)
			{
				var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<item_name>"+name+"</item_name>" +
						"<unit_price>"+price+"</unit_price>" +
						"<notes>"+notes+"</notes>" +
						"<staff>"+staff+"</staff>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<discount>"+discount+"</discount>" +
						"<offer>"+offer+"</offer>" +
						"<type>bought</type>" +
						"<tax>"+tax+"</tax>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bill_items>";		
				if(is_online())
				{
					server_create_simple(data_xml);
				}
				else
				{
					local_create_simple(data_xml);
				}
		
				pre_requisites.forEach(function(pre_requisite)
				{
					var task_id=get_new_key();
					var task_xml="<task_instances>" +
							"<id>"+task_id+"</id>" +
							"<name>"+pre_requisite.name+"</name>" +
							"<assignee>"+staff+"</assignee>" +
							"<t_initiated>"+get_my_time()+"</t_initiated>" +
							"<t_due>"+get_task_due_period()+"</t_due>" +
							"<status>pending</status>" +
							"<task_hours>"+pre_requisite.quantity+"</task_hours>" +
							"<source>service</source>" +
							"<source_id>"+data_id+"</source_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</task_instances>";
					var activity_xml="<activity>" +
							"<data_id>"+task_id+"</data_id>" +
							"<tablename>task_instances</tablename>" +
							"<link_to>form14</link_to>" +
							"<title>Added</title>" +
							"<notes>Task "+pre_requisite.name+" assigned to "+staff+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
			
					if(is_online())
					{
						server_create_row(task_xml,activity_xml);
					}
					else
					{
						local_create_row(task_xml,activity_xml);
					}		
				});
			});
			
		}
		else
		{
			var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+name+"</item_name>" +
					"<batch>"+batch+"</batch>" +
					"<unit_price>"+price+"</unit_price>" +
					"<quantity>"+quantity+"</quantity>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<offer>"+offer+"</offer>" +
					"<type>bought</type>" +
					"<tax>"+tax+"</tax>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<free_with></free_with>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";	
		
			if(is_online())
			{
				server_create_simple(data_xml);
			}
			else
			{
				local_create_simple(data_xml);
			}
		}
		////adding free service
		if(free_service_name!="" && free_service_name!=null)
		{
			var id=get_new_key();
			rowsHTML="<tr>";
				rowsHTML+="<form id='form130_"+id+"'></form>";
                	rowsHTML+="<td>";
                    	rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+free_service_name+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='text' readonly='readonly' required form='form130_"+id+"' value='"+staff+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<textarea readonly='readonly' required form='form130_"+id+">free with "+name+"</textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value='free with "+name+"'>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
                            rowsHTML+="<input type='button' class='save_icon' form='form130_"+id+"' id='save_form130_"+id+"' >";
                            rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='form130_delete_item($(this));'>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
                    rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form130_body').prepend(rowsHTML);

			var free_xml="<bill_items>" +
						"<id>"+id+"</id>" +
						"<item_name>"+free_service_name+"</item_name>" +
						"<staff>"+staff+"</staff>" +
						"<notes>free with "+name+"</notes>" +
						"<unit_price>0</unit_price>" +
						"<amount>0</amount>" +
						"<total>0</total>" +
						"<discount>0</discount>" +
						"<offer></offer>" +
						"<type>free</type>" +
						"<tax>0</tax>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"<free_with>"+name+"</free_with>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bill_items>";
			if(is_online())
			{
				server_create_simple(free_xml);
			}
			else
			{
				local_create_simple(free_xml);
			}
			offer_invalid=false;
		}

		
		//////adding free product to the bill if applicable
		if(free_product_name!="" && free_product_name!=null)
		{
			get_inventory(free_product_name,'',function(free_quantities)
			{
				if(free_quantities>=free_product_quantity)
				{
					var free_batch_data="<bill_items count='1'>" +
							"<batch></batch>" +
							"<item_name exact='yes'>"+free_product_name+"</item_name>" +
							"</bill_items>";
					get_single_column_data(function(data)
					{
						var free_batch="";
						if(data.length>0)
						{
							free_batch=data[0];	
						}
						
						var id=get_new_key();
						rowsHTML="<tr>";
							rowsHTML+="<form id='form130_"+id+"'></form>";
		                	rowsHTML+="<td>";
		                    	rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+free_product_name+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='text' readonly='readonly' required form='form130_"+id+"' value='"+free_batch+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='"+free_product_quantity+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='free with "+name+"'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
	                                rowsHTML+="<input type='button' class='save_icon' form='form130_"+id+"' id='save_form130_"+id+"' >";
	                                rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='form130_delete_item($(this));'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                        rowsHTML+="</td>";
		                rowsHTML+="</tr>";

		                $('#form130_body').prepend(rowsHTML);

						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_batch+"</batch>" +
									"<unit_price>0</unit_price>" +
									"<quantity>"+free_product_quantity+"</quantity>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+bill_id+"</bill_id>" +
									"<free_with>"+name+"</free_with>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
					},free_batch_data);
				}
				else
				{
					$("#modal7").dialog("open");
				}
			});
		}
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form130_delete_item(del_button);
		});

		var save_button=form.elements[10];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Job Order
 * @param button
 */
function form130_create_form()
{
	if(is_create_access('form130'))
	{
		var form=document.getElementById("form130_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		
		var message_string="Bill from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form130']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Price: "+subform.elements[3].value;
			message_string+=" Total: "+subform.elements[4].value;
		});
		
				
		var data_id=form.elements[3].value;
		var transaction_id=form.elements[5].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<quantity_add_percent></quantity_add_percent>" +
				"<quantity_add_amount></quantity_add_amount>" +
				"<free_product_name></free_product_name>" +
				"<free_product_quantity></free_product_quantity>" +
				"<free_service_name></free_service_name>" +
				"<offer_detail></offer_detail>" +
				"<status array='yes'>active--extended</status>" +
				"</offers>";
		fetch_requested_data('',offer_data,function(offers)
		{
			offers.sort(function(a,b)
			{
				if(a.criteria_amount<b.criteria_amount)
				{	return 1;}
				else 
				{	return -1;}
			});
			
			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else 
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];	
								}
	
								var id=get_new_key();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form130_"+id+"'></form>";
					                	rowsHTML+="<td>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='text' required form='form130_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='button' class='save_icon' form='form130_"+id+"' id='save_form130_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='form130_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form130_body').prepend(rowsHTML);

				                var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";	
								
								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}
								
							},free_batch_data);
						}
						else
						{
							$("#modal7").dialog("open");
						}
					});
				}
				else if(offers[i].result_type=='service free')
				{
					var free_service_name=offers[i].free_service_name;	
					var id=get_new_key();
					rowsHTML="<tr>";
						rowsHTML+="<form id='form130_"+id+"'></form>";
		                	rowsHTML+="<td>";
		                    	rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+free_service_name+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='text' readonly='readonly' required form='form130_"+id+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<textarea readonly='readonly' required form='form130_"+id+"'>free service</textarea>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                        	rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='free on the bill amount'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
	                                rowsHTML+="<input type='button' class='save_icon' form='form130_"+id+"' id='save_form130_"+id+"' >";
	                                rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='form130_delete_item($(this));'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                        rowsHTML+="</td>";
	                rowsHTML+="</tr>";

	                $('#form130_body').prepend(rowsHTML);

	                var free_pre_requisite_data="<pre_requisites>" +
							"<type exact='yes'>service</type>" +
							"<requisite_type exact='yes'>task</requisite_type>" +
							"<name exact='yes'>"+free_service_name+"</name>" +
							"<requisite_name></requisite_name>" +
							"<quantity></quantity>" +
							"</pre_requisites>";
					fetch_requested_data('',free_pre_requisite_data,function(free_pre_requisites)
					{
		                var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_service_name+"</item_name>" +
									"<staff></staff>" +
									"<notes>free service</notes>" +
									"<unit_price>0</unit_price>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+data_id+"</bill_id>" +
									"<free_with>bill</free_with>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
						
						free_pre_requisites.forEach(function(free_pre_requisite)
						{
							var task_id=get_new_key();
							var task_xml="<task_instances>" +
									"<id>"+task_id+"</id>" +
									"<name>"+free_pre_requisite.name+"</name>" +
									"<assignee></assignee>" +
									"<t_initiated>"+get_my_time()+"</t_initiated>" +
									"<t_due>"+get_task_due_period()+"</t_due>" +
									"<status>pending</status>" +
									"<task_hours>"+free_pre_requisite.quantity+"</task_hours>" +
									"<source>service</source>" +
									"<source_id>"+id+"</source_id>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</task_instances>";
							var activity_xml="<activity>" +
									"<data_id>"+task_id+"</data_id>" +
									"<tablename>task_instances</tablename>" +
									"<link_to>form14</link_to>" +
									"<title>Added</title>" +
									"<notes>Task "+free_pre_requisite.name+"</notes>" +
									"<updated_by>"+get_name()+"</updated_by>" +
									"</activity>";
					
							if(is_online())
							{
								server_create_row(task_xml,activity_xml);
							}
							else
							{
								local_create_row(task_xml,activity_xml);
							}		
						});
				
					});
				}

				offer_detail=offers[i].offer_detail;
				break;
			}
			
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>both</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Saved</title>" +
						"<notes>Bill no "+data_id+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
						"<id>"+transaction_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>"+customer+"</receiver>" +
						"<giver>master</giver>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			var pt_tran_id=get_new_key();
			var payment_xml="<payments>" +
						"<id>"+pt_tran_id+"</id>" +
						"<status>closed</status>" +
						"<type>received</type>" +
						"<date>"+get_my_time()+"</date>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+total+"</paid_amount>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<due_date>"+get_credit_period()+"</due_date>" +
						"<mode>"+get_payment_mode()+"</mode>" +
						"<transaction_id>"+pt_tran_id+"</transaction_id>" +
						"<bill_id>"+data_id+"</bill_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</payments>";
			var pt_xml="<transactions>" +
						"<id>"+pt_tran_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>master</receiver>" +
						"<giver>"+customer+"</giver>" +
						"<tax>0</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction_xml);
				server_create_simple(pt_xml);
				server_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction_xml);
				local_create_simple(pt_xml);
				local_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			
			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			var subject="Bill from "+get_session_var('title');
			$('#form130_share').show();
			$('#form130_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+discount+"</br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
			$('#form130_foot').html(total_row);
		});
		
		var save_button=form.elements[6];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form130_update_form();
		});
		
		$("[id^='save_form130_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 134
 * form Service dashboard - Add issue
 * @param button
 */
function form134_add_issue(button,problem_type,problem_detail,solution)
{
	if(is_create_access('form126'))
	{
		var issue_xml="<issues>"+
					"<id></id>"+
					"<detail>"+problem_detail+"</detail>"+
					"</issues>";
		get_single_column_data(function(problems)
		{
			var last_updated=get_my_time();
			var data_id=get_new_key();
					
			if(problems.length==0)
			{		
				var data_xml="<issues>" +
							"<id>"+data_id+"</id>" +
							"<short_desc>"+problem_type+"</short_desc>"+
							"<detail>"+problem_detail+"</detail>"+					
							"<status>active</status>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</issues>";	
				var solution_xml="<solutions>" +
							"<id>"+data_id+"</id>" +
							"<issue_id>"+data_id+"</issue_id>"+
							"<detail>"+solution+"</detail>"+					
							"<status>active</status>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</solutions>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>issues</tablename>" +
							"<link_to>form126</link_to>" +
							"<title>Added</title>" +
							"<notes>Issue to repository</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_create_row(data_xml,activity_xml);
					if(solution!="")					
						server_create_simple(solution_xml);
				}
				else
				{
					local_create_row(data_xml,activity_xml);
					if(solution!="")					
						local_create_simple(solution_xml);
				}
			}
			else if(solution!="")
			{
				var issue_id=problems[0];
				var solution_xml="<solutions>"+
							"<id></id>"+
							"<issue_id exact='yes'>"+issue_id+"</issue_id>"+
							"<detail exact='yes'>"+solution+"</detail>"+
							"</solutions>";
				get_single_column_data(function(solutions)
				{
					if(solutions.length==0)
					{
						var solution_xml="<solutions>" +
						"<id>"+get_new_key()+"</id>" +
						"<issue_id>"+issue_id+"</issue_id>"+
						"<detail>"+solution+"</detail>"+					
						"<status>active</status>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</solutions>";
						
						if(is_online())
						{
							server_create_simple(solution_xml);
						}
						else
						{
							local_create_simple(solution_xml);
						}
					}
				},solution_xml);
			}				
		},issue_xml);

		$(button).attr("onclick",'');
		$(button).attr('value','Added to Repo');	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * formNo 134
 * form Service dashboard - machine
 * @param button
 */
function form134_create_machine(form)
{
	if(is_create_access('form134'))
	{
		var master_fields=document.getElementById('form134_master');
		var request_id=master_fields.elements[1].value;
		var type=form.elements[0].value;
		var machine=form.elements[1].value;
		var problem=form.elements[2].value;
		var closing_notes=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		
		var data_xml="<service_request_machines>" +
					"<id>"+data_id+"</id>" +
					"<request_id>"+request_id+"</request_id>"+
					"<machine_type>"+type+"</machine_type>" +
					"<machine>"+machine+"</machine>" +
					"<problem>"+problem+"</problem>" +
					"<closing_notes>"+closing_notes+"</closing_notes>"+					
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_machines>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>service_request_machines</tablename>" +
					"<link_to>form134</link_to>" +
					"<title>Added</title>" +
					"<notes>Machine "+machine+" to SR# "+request_id+"</notes>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form134_delete_machine(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form134_update_machine(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};

/**
 * formNo 134
 * form Service dashboard - team
 * @param button
 */
function form134_create_team(form)
{
	if(is_create_access('form134'))
	{
		var master_fields=document.getElementById('form134_master');
		var request_id=master_fields.elements[1].value;

		var assignee=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		
		var data_xml="<service_request_team>" +
					"<id>"+data_id+"</id>" +
					"<request_id>"+request_id+"</request_id>"+
					"<assignee>"+assignee+"</assignee>" +
					"<phone>"+phone+"</phone>" +
					"<email>"+email+"</email>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_team>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>service_request_team</tablename>" +
					"<link_to>form134</link_to>" +
					"<title>Added</title>" +
					"<notes>Assignee "+assignee+" to SR# "+request_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>service_requests</tablename>" +
					"<record_id>"+request_id+"</record_id>" +
					"<access_type>all</access_type>" +
					"<user>"+assignee+"</user>" +
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
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form134_delete_team(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form134_update_team(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};

/**
 * formNo 134
 * form Service dashboard - document
 * @param button
 */
function form134_create_document(form)
{
	if(is_create_access('form134'))
	{
		var master_fields=document.getElementById('form134_master');
		var request_id=master_fields.elements[1].value;

		var doc_name=form.elements[0].value;
		var data_id=form.elements[2].value;
		var url_id="form134_document_url_"+data_id;
		var docInfo=document.getElementById(url_id);
		var url=$(docInfo).attr('href');
		var last_updated=get_my_time();
		
		var data_xml="<documents>" +
					"<id>"+data_id+"</id>" +
					"<target_id>"+request_id+"</target_id>"+
					"<url>"+url+"</url>"+
					"<doc_name>"+doc_name+"</doc_name>" +
					"<doc_type>service request</doc_type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</documents>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>documents</tablename>" +
					"<link_to>form134</link_to>" +
					"<title>Added</title>" +
					"<notes>Document "+doc_name+" for SR# "+request_id+"</notes>" +
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
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[4];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form134_delete_document(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};

/**
 * formNo 134
 * form Service dashboard - task
 * @param button
 */
function form134_create_task(form)
{
	if(is_create_access('form134'))
	{
		var master_fields=document.getElementById('form134_master');
		var request_id=master_fields.elements[1].value;

		var description=form.elements[0].value;
		var assignee=form.elements[1].value;
		var due_by=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+request_id+"</source_id>"+
					"<source>service request</source>"+
					"<assignee>"+assignee+"</assignee>" +
					"<name>SR #"+request_id+"</name>" +
					"<description>"+description+"</description>" +
					"<t_initiated>"+last_updated+"</t_initiated>"+
					"<t_due>"+due_by+"</t_due>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_instances</tablename>" +
					"<link_to>form134</link_to>" +
					"<title>Added</title>" +
					"<notes>Task for SR# "+request_id+"</notes>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form134_delete_task(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form134_update_task(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * formNo 135
 * form Project dashboard - task
 * @param button
 */
function form135_create_task(form)
{
	if(is_create_access('form135'))
	{
		var master_fields=document.getElementById('form135_master');
		var project_name=master_fields.elements[1].value;
		var project_id=master_fields.elements[4].value;

		var task=form.elements[0].value;
		var description=form.elements[1].value;
		var assignee=form.elements[2].value;
		var due_by=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;				
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>"+
					"<source>project</source>"+
					"<assignee>"+assignee+"</assignee>" +
					"<name>"+task+"</name>" +
					"<description>"+description+"</description>" +
					"<t_initiated>"+last_updated+"</t_initiated>"+
					"<t_due>"+due_by+"</t_due>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_instances</tablename>" +
					"<link_to>form135</link_to>" +
					"<title>Added</title>" +
					"<notes>Task "+task+" to project "+project_name+"</notes>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form135_delete_task(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form135_update_task(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * formNo 135
 * form Project dashboard - document
 * @param button
 */
function form135_create_document(form)
{
	if(is_create_access('form135'))
	{
		var master_fields=document.getElementById('form135_master');
		var project_name=master_fields.elements[1].value;
		var project_id=master_fields.elements[4].value;

		var doc_name=form.elements[0].value;
		var data_id=form.elements[2].value;
		var url_id="form135_document_url_"+data_id;
		var docInfo=document.getElementById(url_id);
		var url=$(docInfo).attr('href');
		var last_updated=get_my_time();
		
		var data_xml="<documents>" +
					"<id>"+data_id+"</id>" +
					"<target_id>"+project_id+"</target_id>"+
					"<url>"+url+"</url>"+
					"<doc_name>"+doc_name+"</doc_name>" +
					"<doc_type>project</doc_type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</documents>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>documents</tablename>" +
					"<link_to>form135</link_to>" +
					"<title>Added</title>" +
					"<notes>Document "+doc_name+" for project "+project_name+"</notes>" +
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
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[4];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form135_delete_document(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * formNo 135
 * form Project dashboard - team
 * @param button
 */
function form135_create_team(form)
{
	if(is_create_access('form135'))
	{
		var master_fields=document.getElementById('form135_master');
		var project_name=master_fields.elements[1].value;
		var project_id=master_fields.elements[4].value;

		var member=form.elements[0].value;
		var role=form.elements[1].value;
		var notes=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<project_team>" +
					"<id>"+data_id+"</id>" +
					"<project_id>"+project_id+"</project_id>"+
					"<member>"+member+"</member>" +
					"<role>"+role+"</role>" +
					"<notes>"+notes+"</notes>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</project_team>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>project_team</tablename>" +
					"<link_to>form135</link_to>" +
					"<title>Added</title>" +
					"<notes>Member "+member+" to project team of "+project_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>projects</tablename>" +
					"<record_id>"+project_id+"</record_id>" +
					"<access_type>read</access_type>" +
					"<user>"+member+"</user>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form135_delete_team(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form135_update_team(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * @form Enter Purchase Bill (wholesale)
 * @formNo 136
 * @param button
 */
function form136_create_item(form)
{
	if(is_create_access('form136'))
	{
		var bill_id=document.getElementById("form136_master").elements[6].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var pquantity=form.elements[2].value;
		var fquantity=form.elements[3].value;
		var quantity=parseFloat(pquantity)+parseFloat(fquantity);
		var price=form.elements[4].value;
		var tax=form.elements[5].value;
		var total=form.elements[6].value;
		var amount=total-tax;		
		var storage=form.elements[7].value;
		var data_id=form.elements[8].value;
				
		var last_updated=get_my_time();
			
		var data_xml="<supplier_bill_items>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+batch+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<p_quantity>"+pquantity+"</p_quantity>" +
				"<f_quantity>"+fquantity+"</f_quantity>" +
				"<total>"+total+"</total>" +
				"<tax>"+tax+"</tax>" +
				"<amount>"+amount+"</amount>" +
				"<unit_price>"+price+"</unit_price>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<storage>"+storage+"</storage>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</supplier_bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
				
		for(var i=0;i<8;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[10];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form136_delete_item(del_button);
		});

		var save_button=form.elements[9];
		$(save_button).off('click');
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+name+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && storage!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+name+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				if(is_online())
				{
					server_create_simple(storage_xml);
				}
				else
				{
					local_create_simple(storage_xml);
				}
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Enter supplier Bill (wholesale)
 * @param button
 */
function form136_create_form()
{
	if(is_create_access('form136'))
	{
		var form=document.getElementById("form136_master");
		
		var supplier=form.elements[1].value;
		var bill_id=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var entry_date=get_raw_time(form.elements[4].value);
		
		var total=0;
		var tax=0;
		var amount=0;
		
		$("[id^='save_form136']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[5].value);
		});
		
		var discount=0;
		amount=total-tax;
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form136_foot').html(total_row);

		var notes=form.elements[5].value;
		var data_id=form.elements[6].value;
		var transaction_id=form.elements[7].value;
		var last_updated=get_my_time();
		
		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Saved</title>" +
					"<notes>Supplier Bill no "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+supplier+"</giver>" +
					"<tax>"+(-tax)+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		var pt_tran_id=get_new_key();
		var payment_xml="<payments>" +
					"<id>"+pt_tran_id+"</id>" +
					"<status>pending</status>" +
					"<type>paid</type>" +
					"<date>"+get_my_time()+"</date>" +
					"<total_amount>"+total+"</total_amount>" +
					"<paid_amount>0</paid_amount>" +
					"<acc_name>"+supplier+"</acc_name>" +
					"<due_date>"+get_debit_period()+"</due_date>" +
					"<mode>"+get_payment_mode()+"</mode>" +
					"<transaction_id>"+pt_tran_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";
		var pt_xml="<transactions>" +
					"<id>"+pt_tran_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+supplier+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(transaction_xml);
			server_create_simple(pt_xml);
			server_create_simple_func(payment_xml,function()
			{
				modal28_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				modal28_action(pt_tran_id);
			});
		}

		var save_button=form.elements[8];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form136_update_form();
		});
		
		$("[id^='save_form136_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}



/**
 * @form Project Expenses
 * @formNo 137
 * @param button
 */
function form137_create_item(form)
{
	if(is_create_access('form137'))
	{
		var project_id=document.getElementById('form137_master').elements[2].value;
		var person=form.elements[0].value;
		var amount=form.elements[1].value;
		var details=form.elements[2].value;
		var status=form.elements[3].value;		
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>" +
					"<source>project</source>"+
					"<status>"+status+"</status>" +
					"<person>"+person+"</person>" +
					"<amount>"+amount+"</amount>" +
					"<detail>"+details+"</detail>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</expenses>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form137_delete_item(del_button);
		});
		
		$(form).off('submit');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Expenses
 * @param button
 */
function form137_create_form()
{
	$("[id^='save_form137_']").click();
}


/**
 * @form Customer Profiling
 * @formNo 139
 * @param button
 */
function form139_create_item(form)
{
	if(is_create_access('form139'))
	{
		var owner=form.elements[0].value;
		var facility=form.elements[1].value;
		var location=form.elements[2].value;
		var area=form.elements[3].value;
		var floors=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<assets>" +
					"<id>"+data_id+"</id>" +
					"<name>"+facility+"</name>" +
					"<type>facility</type>"+
					"<owner>"+owner+"</owner>" +
					"<owner_type>customer</owner_type>" +
					"<location>"+location+"</location>" +
					"<floors>"+floors+"</floors>"+
					"<area>"+area+"</area>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</assets>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form139_delete_item(del_button);
		
		$(form).off('submit');
		});
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form139_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Supplier Profiling
 * @formNo 140
 * @param button
 */
function form140_create_item(form)
{
	if(is_create_access('form140'))
	{
		var supplier=form.elements[0].value;
		var asset_type=form.elements[1].value;
		var desc=form.elements[2].value;
		var location=form.elements[3].value;	
		var notes=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<assets>" +
					"<id>"+data_id+"</id>" +
					"<type>"+asset_type+"</type>"+
					"<description>"+desc+"</description>"+
					"<owner>"+supplier+"</owner>" +
					"<owner_type>supplier</owner_type>" +
					"<location>"+location+"</location>"+
					"<notes>"+notes+"</notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</assets>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form140_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form140_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Questionnaire 
 * @param button
 */
function form142_create_item(form)
{
	if(is_create_access('form142'))
	{
		var ques_id=document.getElementById("form142_master").elements[5].value;

		var display_name=form.elements[0].value;
		var description=form.elements[1].value;
		var type=form.elements[2].value;
		var values=form.elements[3].value;
		var order=form.elements[4].value;
		var name='field'+order;
		var required='unchecked';
		if(form.elements[5].checked)
			required='checked';
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
					
		var data_xml="<ques_fields>" +
				"<id>"+data_id+"</id>" +
				"<ques_id>"+ques_id+"</ques_id>" +
				"<name>"+name+"</name>" +
				"<display_name>"+display_name+"</display_name>" +
				"<description>"+description+"</description>" +
				"<type>"+type+"</type>" +
				"<fvalues>"+values+"</fvalues>" +
				"<forder>"+order+"</forder>" +
				"<freq>"+required+"</freq>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</ques_fields>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
				
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[8];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form142_delete_item(del_button);
		});

		var save_button=form.elements[7];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create questionnaire
 * @param button
 */
function form142_create_form()
{
	if(is_create_access('form142'))
	{
		var master_form=document.getElementById("form142_master");
		var name=master_form.elements[1].value;
		var display_name=master_form.elements[2].value;
		var func=master_form.elements[3].value;
		var status=master_form.elements[4].value;
		var data_id=master_form.elements[5].value;
		var last_updated=get_my_time();
					
		var data_xml="<ques_struct>" +
				"<id>"+data_id+"</id>" +
				"<name>"+name+"</name>" +
				"<display_name>"+display_name+"</display_name>" +
				"<func>"+func+"</func>" +
				"<status>"+status+"</status>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</ques_struct>";	
		var activity_xml="<activity>" +
				"<data_id>"+data_id+"</data_id>" +
				"<tablename>ques_struct</tablename>" +
				"<link_to>form143</link_to>" +
				"<title>Created</title>" +
				"<notes>Questionnaire "+display_name+"</notes>" +
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

		var save_button=master_form.elements[6];
		
		$(save_button).off('click');
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form142_update_form();
		});
		
		$("[id^='save_form142_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 144
 * form Project Budgeting - expense
 * @param button
 */
function form144_create_expense(form)
{
	if(is_create_access('form144'))
	{
		var master_fields=document.getElementById('form144_master');
		var project_name=master_fields.elements[1].value;
		var project_id=master_fields.elements[5].value;

		var person=form.elements[0].value;
		var amount=form.elements[1].value;
		var detail=form.elements[2].value;
		var status=form.elements[3].value;				
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>"+
					"<source>project</source>"+
					"<person>"+person+"</person>"+
					"<amount>"+amount+"</amount>"+
					"<detail>"+detail+"</detail>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</expenses>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>expenses</tablename>" +
					"<link_to>form144</link_to>" +
					"<title>Added</title>" +
					"<notes>Expense of Rs. "+amount+" for project "+project_name+"</notes>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form144_delete_expense(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form144_update_expense(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};



/**
 * @form Store Movement
 * @param button
 */
function form145_create_item(form)
{
	if(is_create_access('form145'))
	{
		var product_name=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var source=form.elements[3].value;
		var target=form.elements[4].value;
		var status=form.elements[5].value;
		var data_id=form.elements[6].value;
		var receiver=form.elements[7].value;
		//console.log(receiver);
		var last_updated=get_my_time();
		var data_xml="<store_movement>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+product_name+"</item_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<source>"+source+"</source>"+
					"<target>"+target+"</target>"+
					"<status>"+status+"</status>"+
					"<dispatcher>"+get_account_name()+"</dispatcher>"+
					"<receiver>"+receiver+"</receiver>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_movement</tablename>" +
					"<link_to>form145</link_to>" +
					"<title>New</title>" +
					"<notes>Store movement initiated for item "+product_name+" from storage area "+source+"</notes>" +
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
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var save_button=form.elements[8];
		$(save_button).hide();
		var del_button=form.elements[9];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form145_delete_item(del_button);
		});
		
		var dispatch_button=fields.elements[10];
		$(dispatch_button).show();
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+target+"</name>" +
				"<item_name exact='yes'>"+product_name+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && target!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+target+"</name>" +
						"<item_name>"+product_name+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				if(is_online())
				{
					server_create_simple(storage_xml);
				}
				else
				{
					local_create_simple(storage_xml);
				}
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manufacturing Schedule
 * @formNo 146
 */
function form146_create_item(form)
{
	if(is_create_access('form146'))
	{
		var product=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var schedule=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;		
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<manufacturing_schedule>" +
					"<id>"+data_id+"</id>" +
					"<product>"+product+"</product>" +
					"<batch>"+batch+"</batch>" +
					"<status>"+status+"</status>" +
					"<schedule>"+schedule+"</schedule>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</manufacturing_schedule>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>manufacturing_schedule</tablename>" +
					"<link_to>form146</link_to>" +
					"<title>Scheduled</title>" +
					"<notes>Manufacturing of product "+product+"</notes>" +
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


		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form146_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form146_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Roles
 * @formNo 147
 */
function form147_create_item(form)
{
	if(is_create_access('form147'))
	{
		var role=form.elements[0].value;
		var desc=form.elements[1].value;
		var status=form.elements[2].value;		
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<roles>" +
					"<id>"+data_id+"</id>" +
					"<role_name>"+role+"</role_name>" +
					"<description>"+desc+"</description>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</roles>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>roles</tablename>" +
					"<link_to>form147</link_to>" +
					"<title>Created</title>" +
					"<notes>Role "+role+"</notes>" +
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


		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form147_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form147_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Role
 * @param button
 */
function form148_create_item(form)
{
	if(is_create_access('form148'))
	{
		var master_form=document.getElementById('form148_master');
		var role=master_form.elements[1].value;
			
		var element_name=form.elements[0].getAttribute('data-i18n');
		element_name=element_name.substr(element_name.indexOf('.')+1);
		var re='unchecked';
		if(form.elements[1].checked)
			re='checked';
		var cr='unchecked';
		if(form.elements[2].checked)
			cr='checked';
		var up='unchecked';
		if(form.elements[3].checked)
			up='checked';
		var del='unchecked';
		if(form.elements[4].checked)
			del='checked';
		var data_id=form.elements[5].value;
		var element_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<access_control>" +
					"<id>"+data_id+"</id>" +
					"<username>"+role+"</username>" +
					"<element_id>"+element_id+"</element_id>" +
					"<element_name>"+element_name+"</element_name>" +
					"<re>"+re+"</re>" +
					"<cr>"+cr+"</cr>" +
					"<up>"+up+"</up>" +
					"<del>"+del+"</del>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</access_control>";	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form148_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Assign Roles
 * @formNo 149
 */
function form149_create_item(form)
{
	if(is_create_access('form149'))
	{
		var role=form.elements[0].value;
		var user=form.elements[1].value;
		var status=form.elements[2].value;		
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<user_role_mapping>" +
					"<id>"+data_id+"</id>" +
					"<role_name>"+role+"</role_name>" +
					"<username>"+user+"</username>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_role_mapping>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>user_role_mapping</tablename>" +
					"<link_to>form149</link_to>" +
					"<title>Assigned</title>" +
					"<notes>Role "+role+" to user "+user+"</notes>" +
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


		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form149_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form149_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form150_post_feed()
{
	if(is_create_access('form150'))
	{
		var form=document.getElementById('form150_master');
		var title=form.elements[1].value;
		var detail=form.elements[2].value;
		var project_id=form.elements[3].value;
		var owner=get_account_name();
		var last_updated=get_my_time();
		var data_id=get_new_key();
		var data_xml="<feeds>" +
					"<id>"+data_id+"</id>" +
					"<content_type>text</content_type>"+
					"<content_title>"+title+"</content_title>" +
					"<content_detail>"+detail+"</content_detail>" +
					"<source>project</source>"+
					"<source_id>"+project_id+"</source_id>"+
					"<status>visible</status>" +
					"<owner>"+owner+"</owner>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</feeds>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
		
		form.elements[1].value="";
		form.elements[2].value="";
		form.elements[3].value="";
		
		var feed_content="<div class='feed_item'>"+
						"<br><div class='feed_title'>"+title+
						" <a class='small_cross_icon' onclick=\"delete_feed('"+data_id+"',$(this));\" title='Delete post'>&#10006;</a></div>"+
						"<br><div class='feed_detail'>"+detail+"</div>"+
						"<br><div id='form150_likes_"+data_id+"' class='feed_likes'>"+
						"<img src='../images/thumbs_up_line.png' class='thumbs_icon' onclick=\"like_feed('"+data_id+"',$(this))\" title='Like this post'> <b id='form150_likes_count_"+data_id+"'>0</b> likes"+
						"</div>"+								
						"<br><div id='form150_comments_"+data_id+"' class='feed_comments'>"+
						"<label>"+owner+": <textarea class='feed_comments' placeholder='comment..'></textarea></label>"+
						"</div>"+
						"</div>";
		$('#form150_body').prepend(feed_content);
		$('#form150_comments_'+data_id).find('label').find('textarea').on('keyup',function(e)
		{
			if (e.keyCode==13) 
			{
				create_feed_comment(feed_id,this);
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 151
 * form Service dashboard - item
 * @param button
 */
function form151_create_item(form)
{
	if(is_create_access('form151'))
	{
		var master_fields=document.getElementById('form151_master');
		var request_id=master_fields.elements[1].value;

		var item=form.elements[0].value;
		var quantity=form.elements[1].value;
		var est_amount=form.elements[2].value;
		var amount=form.elements[3].value;
		var status=form.elements[4].value;				
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		
		var data_xml="<service_request_items>" +
					"<id>"+data_id+"</id>" +
					"<request_id>"+request_id+"</request_id>"+
					"<item_name>"+item+"</item_name>" +
					"<est_amount>"+est_amount+"</est_amount>"+
					"<amount>"+amount+"</amount>"+
					"<quantity>"+quantity+"</quantity>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_items>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>service_request_items</tablename>" +
					"<link_to>form151</link_to>" +
					"<title>Requested</title>" +
					"<notes>Item "+item+" for SR# "+request_id+"</notes>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form151_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form151_update_item(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};

/**
 * formNo 151
 * form Service dashboard - expense
 * @param button
 */
function form151_create_expense(form)
{
	if(is_create_access('form151'))
	{
		var master_fields=document.getElementById('form151_master');
		var request_id=master_fields.elements[1].value;

		var person=form.elements[0].value;
		var amount=form.elements[1].value;
		var detail=form.elements[2].value;
		var status=form.elements[3].value;				
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+request_id+"</source_id>"+
					"<source>service request</source>"+
					"<person>"+person+"</person>"+
					"<amount>"+amount+"</amount>"+
					"<detail>"+detail+"</detail>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</expenses>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>expenses</tablename>" +
					"<link_to>form151</link_to>" +
					"<title>Added</title>" +
					"<notes>Expense of Rs. "+amount+" for SR# "+request_id+"</notes>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form151_delete_expense(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form151_update_expense(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * @form Prepare Quotation
 * @formNo 153
 * @param button
 */
function form153_create_item(form)
{
	if(is_create_access('form153'))
	{
		var quot_id=document.getElementById("form153_master").elements[5].value;
		
		var name=form.elements[0].value;
		var description=form.elements[1].value;
		var quantity=form.elements[2].value;
		var unit=form.elements[3].value;
		var price=form.elements[4].value;
		var amount=form.elements[5].value;
		var total=form.elements[6].value;
		var discount=form.elements[7].value;
		var tax=form.elements[8].value;
		var data_id=form.elements[9].value;		
		var save_button=form.elements[10];
		var del_button=form.elements[11];
		var type=form.elements[12];
		var last_updated=get_my_time();
		
		var data_xml="<quotation_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<description>"+description+"</description>"+
				"<unit>"+unit+"</unit>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<amount>"+amount+"</amount>" +
				"<total>"+total+"</total>" +
				"<discount>"+discount+"</discount>" +
				"<type>"+type+"</type>" +
				"<tax>"+tax+"</tax>" +
				"<quotation_id>"+quot_id+"</quotation_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</quotation_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		
		for(var i=0;i<9;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form153_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Prepare Quotation
 * @formNo 153
 * @param button
 */
function form153_create_form()
{
	if(is_create_access('form153'))
	{
		var form=document.getElementById("form153_master");
		
		var customer=form.elements[1].value;
		var quot_type=form.elements[2].value;
		var quot_date=get_raw_time(form.elements[3].value);
		var intro_notes=form.elements[4].value;
		var save_button=form.elements[7];
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form153']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[6].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[7].value);
			tax+=parseFloat(subform.elements[8].value);
		});

		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
	
		var data_xml="<quotation>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<date>"+quot_date+"</date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<billing_type>"+quot_type+"</billing_type>" +
					"<discount>"+discount+"</discount>" +
					"<tax>"+tax+"</tax>" +
					"<status>generated</status>"+
					"<intro_notes>"+intro_notes+"</intro_notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</quotation>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>quotation</tablename>" +
					"<link_to>form152</link_to>" +
					"<title>Saved</title>" +
					"<notes>Quotation Id "+data_id+"</notes>" +
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
		
		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. <input type='number' value='"+discount+"' step='any' id='form153_discount' class='dblclick_editable'></br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form153_foot').html(total_row);

		longPressEditable($('.dblclick_editable'));

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form153_update_form();
		});
		
		$("[id^='save_form153_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Bill(DLM)
 * @formNo 154
 * @param button
 */
function form154_create_item(form)
{
	if(is_create_access('form154'))
	{
		var storage=document.getElementById("form154_master").elements[5].value;
		var bill_id=document.getElementById("form154_master").elements[6].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var price=form.elements[2].value;
		var amount=form.elements[3].value;
		var total=form.elements[4].value;
		var discount=form.elements[5].value;
		var tax=form.elements[6].value;
		var data_id=form.elements[7].value;
		var save_button=form.elements[8];
		var del_button=form.elements[9];
		
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+name+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<amount>"+amount+"</amount>" +
				"<total>"+total+"</total>" +
				"<discount>"+discount+"</discount>" +
				"<type>bought</type>" +
				"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<storage>"+storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form154_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Bill(DLM)
 * @formNo 154
 * @param button
 */
function form154_create_hiring_item(form)
{
	if(is_create_access('form154'))
	{
		var storage=document.getElementById("form154_master").elements[5].value;
		var bill_id=document.getElementById("form154_master").elements[6].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var from_date=get_raw_time(form.elements[2].value);
		var to_date=get_raw_time(form.elements[3].value);
		var price=form.elements[5].value;
		var amount=form.elements[6].value;
		var total=form.elements[7].value;
		var discount=form.elements[8].value;
		var tax=form.elements[9].value;
		var data_id=form.elements[10].value;
		var save_button=form.elements[11];
		var del_button=form.elements[12];
		
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+name+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<amount>"+amount+"</amount>" +
				"<total>"+total+"</total>" +
				"<discount>"+discount+"</discount>" +
				"<type>bought</type>" +
				"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<storage>"+storage+"</storage>"+
				"<from_date>"+from_date+"</from_date>"+
				"<to_date>"+to_date+"</to_date>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"<hired>yes</hired>"+
				"</bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form154_delete_hiring_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create bill(DLM)
 * @formNo 154
 * @param button
 */
function form154_create_form()
{
	if(is_create_access('form154'))
	{
		var form=document.getElementById("form154_master");
		
		var customer=form.elements[1].value;
		var bill_type=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var bill_num=form.elements[4].value;
		var storage=form.elements[5].value;		
		
		var hiring=false;
		if(bill_type=='Hiring')
			hiring=true;
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form154']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(hiring)
			{
				amount+=parseFloat(subform.elements[6].value);
				total+=parseFloat(subform.elements[7].value);
				discount+=parseFloat(subform.elements[8].value);
				tax+=parseFloat(subform.elements[9].value);
			}
			else
			{			
				amount+=parseFloat(subform.elements[3].value);
				total+=parseFloat(subform.elements[4].value);
				discount+=parseFloat(subform.elements[5].value);
				tax+=parseFloat(subform.elements[6].value);
			}
		});

		var data_id=form.elements[6].value;
		var transaction_id=form.elements[7].value;
		var save_button=form.elements[8];
		var last_updated=get_my_time();
		
		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_num>"+bill_num+"</bill_num>"+
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<billing_type>"+bill_type+"</billing_type>" +
					"<discount>"+discount+"</discount>" +
					"<cartage>0</cartage>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<storage>"+storage+"</storage>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bills</tablename>" +
					"<link_to>form92</link_to>" +
					"<title>Saved</title>" +
					"<notes>Bill no "+bill_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+customer+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		var pt_tran_id=get_new_key();
		var payment_xml="<payments>" +
					"<id>"+pt_tran_id+"</id>" +
					"<status>pending</status>" +
					"<type>received</type>" +
					"<date>"+get_my_time()+"</date>" +
					"<total_amount>"+total+"</total_amount>" +
					"<paid_amount>"+total+"</paid_amount>" +
					"<acc_name>"+customer+"</acc_name>" +
					"<due_date>"+get_credit_period()+"</due_date>" +
					"<mode>"+get_payment_mode()+"</mode>" +
					"<transaction_id>"+pt_tran_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<source_info>for sale bill #"+bill_num+"</source_info>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";
		var pt_xml="<transactions>" +
					"<id>"+pt_tran_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+customer+"</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		var num_data="<user_preferences>"+
					"<id></id>"+						
					"<name exact='yes'>"+bill_type+"_bill_num</name>"+												
					"</user_preferences>";
		get_single_column_data(function (bill_num_ids)
		{
			if(bill_num_ids.length>0)
			{
				var num_xml="<user_preferences>"+
								"<id>"+bill_num_ids[0]+"</id>"+
								"<value>"+(parseInt(bill_num)+1)+"</value>"+
								"</user_preferences>";
				if(is_online())
				{
					server_update_simple(num_xml);
				}
				else 
				{
					local_update_simple(num_xml);
				}
			}
		},num_data);

		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(transaction_xml);
			server_create_simple(pt_xml);
			server_create_simple_func(payment_xml,function()
			{
				//modal26_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				//modal26_action(pt_tran_id);
			});
		}
		
		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax: </br>Cartage: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. <input type='number' value='"+discount+"' step='any' id='form154_discount' class='dblclick_editable'></br>" +
					"Rs. "+tax+"</br>" +
					"Rs. <input type='number' value='0' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		if(hiring)
		{
			total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax: </br>Cartage: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. <input type='number' value='"+discount+"' step='any' id='form154_discount' class='dblclick_editable'></br>" +
					"Rs. "+tax+"</br>" +
					"Rs. <input type='number' value='0' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";

		}
		$('#form154_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form154_update_form();
		});
		
		$("[id^='save_form154_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Store Placement (DLM)
 * @param button
 */
function form156_create_item(form)
{
	if(is_create_access('form156'))
	{
		var product_name=form.elements[0].value;
		var name=form.elements[1].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<area_utilization>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+product_name+"</item_name>" +
					"<batch>"+product_name+"</batch>" +
					"<name>"+name+"</name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</area_utilization>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>area_utilization</tablename>" +
					"<link_to>form156</link_to>" +
					"<title>Added</title>" +
					"<notes>Item "+product_name+" to storage area "+name+"</notes>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var save_button=form.elements[4];
		$(save_button).hide();
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form156_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Store Movement (DLM)
 * @param button
 */
function form157_create_item(form)
{
	if(is_create_access('form157'))
	{
		var product_name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var source=form.elements[2].value;
		var target=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var receiver=form.elements[6].value;
		//console.log(receiver);
		var last_updated=get_my_time();
		var data_xml="<store_movement>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+product_name+"</item_name>" +
					"<batch>"+product_name+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<source>"+source+"</source>"+
					"<target>"+target+"</target>"+
					"<status>"+status+"</status>"+
					"<dispatcher>"+get_account_name()+"</dispatcher>"+
					"<receiver>"+receiver+"</receiver>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_movement</tablename>" +
					"<link_to>form157</link_to>" +
					"<title>New</title>" +
					"<notes>Store movement initiated for item "+product_name+" from storage area "+source+"</notes>" +
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
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var save_button=form.elements[7];
		$(save_button).hide();
		var del_button=form.elements[8];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form157_delete_item(del_button);
		});
		
		var dispatch_button=form.elements[9];
		$(dispatch_button).show();
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+target+"</name>" +
				"<item_name exact='yes'>"+product_name+"</item_name>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && target!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+target+"</name>" +
						"<item_name>"+product_name+"</item_name>" +
						"<batch>"+product_name+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				if(is_online())
				{
					server_create_simple(storage_xml);
				}
				else
				{
					local_create_simple(storage_xml);
				}
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Enter Purchase Bill (DLM)
 * @formNo 158
 * @param button
 */
function form158_create_item(form)
{
	if(is_create_access('form158'))
	{
		var master_form=document.getElementById("form158_master");
		
		var imported=master_form.elements[5].checked;
		var bill_id=master_form.elements[6].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var price=form.elements[2].value;
		var tax=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=total-tax;		
		var storage=form.elements[5].value;
		var data_id=form.elements[6].value;
		var save_button=form.elements[7];
		var del_button=form.elements[8];
		var last_updated=get_my_time();
			
		var data_xml="<supplier_bill_items>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+name+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<total>"+total+"</total>" +
				"<tax>"+tax+"</tax>" +
				"<amount>"+amount+"</amount>" +
				"<unit_price>"+price+"</unit_price>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<storage>"+storage+"</storage>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</supplier_bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
				
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form158_delete_item(del_button);
		});

		$(save_button).off('click');
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+name+"</item_name>" +
				"<batch exact='yes'>"+name+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && storage!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+name+"</item_name>" +
						"<batch>"+name+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				if(is_online())
				{
					server_create_simple(storage_xml);
				}
				else
				{
					local_create_simple(storage_xml);
				}
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Enter Purchase Bill (DLM)
 * @param button
 */
function form158_create_form()
{
	if(is_create_access('form158'))
	{
		var form=document.getElementById("form158_master");
		
		var supplier=form.elements[1].value;
		var bill_id=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var entry_date=get_raw_time(form.elements[4].value);
		var imported='no';
		var notes='Local Purchase';
		if(form.elements[5].checked)
		{
			imported='yes';
			notes='Imported';
		}
		var total=0;
		var tax=0;
		var amount=0;
		
		$("[id^='save_form158']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			total+=parseFloat(subform.elements[4].value);
			tax+=parseFloat(subform.elements[3].value);
		});
		
		var discount=0;
		amount=total-tax;
		
		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form158_foot').html(total_row);

		var data_id=form.elements[6].value;
		var transaction_id=form.elements[7].value;
		var last_updated=get_my_time();
		
		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<imported>"+imported+"</imported>" +
					"<notes>"+notes+"</notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Saved</title>" +
					"<notes>Supplier Bill no "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+supplier+"</giver>" +
					"<tax>"+(-tax)+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		var pt_tran_id=get_new_key();
		var payment_xml="<payments>" +
					"<id>"+pt_tran_id+"</id>" +
					"<status>pending</status>" +
					"<type>paid</type>" +
					"<date>"+get_my_time()+"</date>" +
					"<total_amount>"+total+"</total_amount>" +
					"<paid_amount>0</paid_amount>" +
					"<acc_name>"+supplier+"</acc_name>" +
					"<due_date>"+get_debit_period()+"</due_date>" +
					"<mode>"+get_payment_mode()+"</mode>" +
					"<transaction_id>"+pt_tran_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";
		var pt_xml="<transactions>" +
					"<id>"+pt_tran_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+supplier+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(transaction_xml);
			server_create_simple(pt_xml);
			server_create_simple_func(payment_xml,function()
			{
				//modal28_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				//modal28_action(pt_tran_id);
			});
		}

		var save_button=form.elements[8];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form158_update_form();
		});
		
		$("[id^='save_form158_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}
