 /**
 * Print reports in tabular format
 * @param report_name
 * @param report_title
 * @param print_button
 */
function print_tabular_report(report_name,report_title,print_button)
{
	$(print_button).off('click');
	$(print_button).on('click',function(event)
	{
	   var container=document.createElement('div');
	   var business_title=document.createElement('div');
	   var title=document.createElement('div');
	   var bt=get_session_var('title');
	   business_title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.5em'><b>"+bt+"</b></div>";
	   title.innerHTML="<div style='display: block;width:100%;font-size:1.2em'><b>"+report_title+"</b></div>";
	   var table_element=document.getElementById(report_name+"_body").parentNode;
	   var table_copy=table_element.cloneNode(true);
	   table_copy.removeAttribute('class');
	   var font_size=get_session_var('print_size');
	   $(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	   container.appendChild(business_title);
	   container.appendChild(title);
	   container.appendChild(table_copy);
	   $.print(container);
	});
}

/**
 * Print reports in graphical form
 * @param report_name
 * @param report_title
 * @param print_button
 * @param chart_element
 */
function print_graphical_report(report_name,report_title,print_button,chart_element)
{
	$(print_button).off('click');
	$(print_button).on('click',function(event)
	{
	   var container=document.createElement('div');
	   var business_title=document.createElement('div');
	   var title=document.createElement('div');
	   var bt=get_session_var('title');
	   business_title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.5em'><b>"+bt+"</b></div>";
	   title.innerHTML="<div style='display: block;width:100%;font-size:1.2em'><b>"+report_title+"</b></div>";
	   var legend=document.createElement('div');
	   legend.innerHTML="<b>Legend<div style='display: block;'>"+chart_element.generateLegend();+"</div></b>";
	   var report_image=document.createElement('img');
	   report_image.setAttribute('src',chart_element.toBase64Image());

	   container.appendChild(business_title);
	   container.appendChild(title);
	   container.appendChild(legend);
	   container.appendChild(report_image);
	   $.print(container);
	});
}

/**
 * Print bills, receipts etc in tabular format
 */
function print_tabular_form(form_id,form_title,table_copy)
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bill_message=document.createElement('div');
	var signature=document.createElement('div');
	var footer=document.createElement('div');
	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	signature.innerHTML="<div style='float:right;text-align:left;display:block;width:30%;font-size:"+font_size+"em'><b>Signature: </b></div>";
	bill_message.innerHTML="<div style='float:left;text-align:left;display:block;width:60%;font-size:"+font_size+"em'><textarea style='border:none;width:100%;height:100px;'>"+get_session_var('bill_message')+"</textarea></div>";
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em;margin:2px;'><b>"+form_title+"</b></div>";
	
	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b><br>" +
							"<div style='font-size:"+font_size+"em;padding:5px'>VAT #: "+get_session_var('vat')+"<br>" +
							"TIN #: "+get_session_var('tin')+"</div></div>"+
							"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
							"<br>Address: "+get_session_var('address')+"</div></div>";
	business_title.setAttribute('style',"height:80px;padding:1%;border:2px solid black;border-bottom:none;font-size:"+font_size+"em");
	
	var form_master=form_id+"_master";
	var header_element=document.getElementById(form_master);
	var header_copy=header_element.cloneNode(true);
	$(header_copy).find("a").remove();
	$(header_copy).find("input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	
	if(!table_copy)
	{
		var table_element=document.getElementById(form_id+'_body').parentNode;
		table_copy=table_element.cloneNode(true);
	}
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,v1").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	$(table_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});
	
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"padding:1%;font-size:"+font_size+"em;border:2px solid black;");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(header_copy);
	container.appendChild(table_copy);
	footer.appendChild(bill_message);
	footer.appendChild(signature);
	container.appendChild(footer);
	$.print(container);
}

/**
 * @form Create pamphlets
 * @formNo 2
 */
function form2_print_form()
{	
	var form=document.getElementById("form2_master");
	var pamphlet_name=form.elements[1].value;
	var pamphlet_id=form.elements[2].value;
	
	var container=document.getElementById('print_container');
	
	var print_pamphlet=document.createElement('div');
		print_pamphlet.setAttribute('class','print_pamphlet');
	var header=document.createElement('div');
		header.setAttribute('class','header');
	var logo=document.createElement('div');
		logo.setAttribute('class','logo');
		//logo.innerHTML="<img src='./images/feedback.jpeg'>";
	var title=document.createElement('div');
		title.setAttribute('class','title');
		title.textContent='Vyavsaay.com';
	var seller_info=document.createElement('div');
		seller_info.setAttribute('class','seller_info');
	var seller_phone=document.createElement('div');
		seller_phone.setAttribute('class','seller_phone');
		seller_phone.textContent='Contact No: 9818005232';
	var seller_address=document.createElement('div');
		seller_address.setAttribute('class','seller_address');
		seller_address.textContent="Office: R.S.D. colony, Sirsa";
	var content=document.createElement('div');
		content.setAttribute('class','content');
	var pamphlet_header=document.createElement('div');
		pamphlet_header.setAttribute('class','pamphlet_header');
	var pamphlet_time=document.createElement('div');
		pamphlet_time.setAttribute('class','pamphlate_time');
		pamphlet_time.textContent='hurry up! Offers limited';
	var offers=document.createElement('div');
		offers.setAttribute('class','offers');
	
		container.appendChild(print_pamphlet);
		print_pamphlet.appendChild(header);
		print_pamphlet.appendChild(content);
		//header.appendChild(logo);
		header.appendChild(title);
		header.appendChild(seller_info);
		seller_info.appendChild(seller_phone);
		seller_info.appendChild(seller_address);
		content.appendChild(pamphlet_header);
		pamphlet_header.appendChild(pamphlet_time);
		content.appendChild(offers);
	
	var pamphlet_items_data="<pamphlet_items>" +
			"<item_name></item_name>" +
			"<offer></offer>" +
			"<pamphlet_id>"+pamphlet_id+"</pamphlet_id>" +
			"</pamphlet_items>";
	
	fetch_requested_data('form44',pamphlet_items_data,function(results)
	{
		for(var i in results)
		{
			var offer_item=document.createElement('div');
				offer_item.setAttribute('class','offer_item');
			var product_name=document.createElement('div');
				product_name.setAttribute('class','product_name');
				product_name.textContent=results[i].item_name;
			var offer_detail=document.createElement('div');
				offer_detail.setAttribute('class','offer_detail');
				offer_detail.textContent=results[i].offer;
				
				offers.appendChild(offer_item);
				offer_item.appendChild(product_name);
				offer_item.appendChild(offer_detail);
		}	
		
		$.print(container);
		container.removeChild(print_pamphlet);
	});		
}


/**
 * @form Create service bills
 * @formNo 10
 */
function form10_print_form()
{
	print_tabular_form('form10','Sale Bill');
}


/**
 * @form Create Product bills
 * @formNo 12
 */
function form12_print_form()
{
	print_tabular_form('form12','Sale Bill');}


/**
 * @form Enter customer returns
 * @formNo 15
 */
function form15_print_form()
{
	print_tabular_form('form15','Sale Returns');
}


/**
 * @form Enter supplier returns
 * @formNo 19
 */
function form19_print_form()
{
	print_tabular_form('form19','Purchase Returns');
}


/**
 * @form Enter supplier bill
 * @formNo 21
 */
function form21_print_form()
{
	print_tabular_form('form21','Purchase Bill');
}


/**
 * @form Create Purchase order
 * @formNo 24
 */
function form24_print_form()
{
	print_tabular_form('form24','Purchase Order');
}


/**
 * @form Create Sale order
 * @formNo 69
 */
function form69_print_form()
{
	print_tabular_form('form69','Sale Order');
}


/**
 * @form Create bills
 * @formNo 72
 */
function form72_print_form()
{
	print_tabular_form('form72','Sale Bill');
}


/**
 * @form Scan items(multi-register)
 * @formNo 82
 */
function form82_print_form()
{
	print_tabular_form('form82','Sale Bill');
}

/**
 * @form Create bills(multi-register)
 * @formNo 91
 */
function form91_print_form()
{
	var new_thead="<tr>"+
		"<th colspan='2'>Item</th>"+
		"<th>Qty.</th>" +
		"<th>Total</th>" +
		"<th></th>"+
		"</tr>";
	
	var table_element=document.getElementById('form91_body').parentNode;
	var table_copy=table_element.cloneNode(true);
	$(table_copy).find('datalist,form').remove();
	
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).attr('value',$(this).val());
	});
	
	var tfoot=table_copy.children[2].innerHTML;
	var new_tfoot=tfoot.replace(/<td colspan='3'/g,"<td colspan='2'");
	var new_tfoot=new_tfoot.replace(/<td colspan=\"3\"/g,"<td colspan='2'");
	
	//console.log(tbody);
	table_copy.children[0].innerHTML=new_thead;
	table_copy.children[2].innerHTML=new_tfoot;
	
	var single_bill_items=parseInt(get_session_var('bill_print_items'));
	var rows=table_copy.children[1].children.length;
	
	for(var i=0;i<rows;i++)
	{
		table_copy.children[1].children[i].children[0].setAttribute('colspan','2');
		
		table_copy.children[1].children[i].removeChild(table_copy.children[1].children[i].children[1]);
		table_copy.children[1].children[i].removeChild(table_copy.children[1].children[i].children[2]);
	}
	
	while(rows>0)
	{
		var new_table_copy=table_copy.cloneNode(true);
		
		for(var j=single_bill_items;j<rows;j++)
		{
			new_table_copy.children[1].removeChild(new_table_copy.children[1].children[single_bill_items]);
		}
		for(var i=0;i<single_bill_items && i<rows;i++)
		{
			table_copy.children[1].removeChild(table_copy.children[1].children[0]);
		}
		rows=table_copy.children[1].children.length;
		print_tabular_form('form91','Sale Bill',new_table_copy);
	}
}

/**
 * @form Create bills(multi-register, unbilled items)
 * @formNo 119
 */
function form119_print_form()
{
	var new_thead="<tr>"+
				"<th>Make</th>"+
				"<th colspan='2'>Item</th>"+
				"<th>Batch</th>" +
				"<th>Expiry</th>" +
				"<th>Qty.</th>" +
				"<th>Free</th>"+
				"<th>S. Price</th>"+
				"<th>MRP</th>"+
				"<th>Amount</th>" +
				"<th>Tax</th>" +
				"<th></th>"+
				"</tr>";
	var table_element=document.getElementById('form119_body').parentNode;
	var table_copy=table_element.cloneNode(true);
	$(table_copy).find('datalist,form').remove();
	
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).attr('value',$(this).val());
	});
	
	var tbody=table_copy.children[1].innerHTML;
	var new_tbody=tbody.replace(/<br>/g,'</td><td>');
	
	var tfoot=table_copy.children[2].innerHTML;
	var new_tfoot=tfoot.replace(/<td>/g,"<td colspan='2'>");
	var new_tfoot=new_tfoot.replace(/<td colspan='3'/g,"<td colspan='7'");
	var new_tfoot=new_tfoot.replace(/<td colspan=\"3\"/g,"<td colspan='7'");
	
	//console.log(tbody);
	table_copy.children[0].innerHTML=new_thead;
	table_copy.children[1].innerHTML=new_tbody;
	table_copy.children[2].innerHTML=new_tfoot;
	
	
	var single_bill_items=parseInt(get_session_var('bill_print_items'));
	var rows=table_copy.children[1].children.length;

	for(var i=0;i<rows;i++)
	{
		table_copy.children[1].children[i].children[1].setAttribute('colspan','2');
	}
	
	while(rows>0)
	{
		var new_table_copy=table_copy.cloneNode(true);
		
		for(var j=single_bill_items;j<rows;j++)
		{
			new_table_copy.children[1].removeChild(new_table_copy.children[1].children[single_bill_items]);
		}
		for(var i=0;i<single_bill_items && i<rows;i++)
		{
			table_copy.children[1].removeChild(table_copy.children[1].children[0]);
		}
		rows=table_copy.children[1].children.length;
		print_tabular_form('form119','Sale Bill',new_table_copy);
	}
}

/**
 * @form Enter supplier bill (unbilled items)
 * @formNo 122
 */
function form122_print_form()
{
	print_tabular_form('form119','Purchase Bill');
}


/**
 * @form Job Orders
 * @formNo 130
 */
function form130_print_form()
{
	print_tabular_form('form130','Job Order');
}

/**
 * @form Service Request - budgeting
 */
function form151_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bill_message=document.createElement('div');
	var signature=document.createElement('div');
	var footer=document.createElement('div');
	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	signature.innerHTML="<div style='float:right;text-align:left;display:block;width:30%;font-size:"+font_size+"em'><b>Signature: </b></div>";
	bill_message.innerHTML="<div style='float:left;text-align:left;display:block;width:60%;font-size:"+font_size+"em'><textarea style='border:none;width:100%;height:100px;'>"+get_session_var('bill_message')+"</textarea></div>";
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em;margin:2px;'><b>Service Request Bill</b></div>";
	
	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b><br>" +
							"<div style='font-size:"+font_size+"em;padding:5px'>VAT #: "+get_session_var('vat')+"<br>" +
							"TIN #: "+get_session_var('tin')+"</div></div>"+
							"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
							"<br>Address: "+get_session_var('address')+"</div></div>";
	business_title.setAttribute('style',"height:80px;padding:1%;border:2px solid black;border-bottom:none;font-size:"+font_size+"em");
	
	var form_master="form151_master";
	var header_element=document.getElementById(form_master);
	$(header_element).find("textarea").each(function(index)
	{
		$(this).attr('value',$(this).val());
	});	

	var header_copy=header_element.cloneNode(true);
	$(header_copy).find("a").remove();
	$(header_copy).find("input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	$(header_copy).find("textarea").each(function(index)
	{
		$(this).replaceWith($(this).attr('value'));
	});
	
	var table_task_element=document.getElementById('form151_task_body').parentNode;
	var table_item_element=document.getElementById('form151_item_body').parentNode;
	var table_expense_element=document.getElementById('form151_expense_body').parentNode;
	table_task_copy=table_task_element.cloneNode(true);
	table_item_copy=table_item_element.cloneNode(true);
	table_expense_copy=table_expense_element.cloneNode(true);
	
	table_task_copy.removeAttribute('class');
	table_item_copy.removeAttribute('class');
	table_expense_copy.removeAttribute('class');
	
	$(table_task_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,v1").remove();
	$(table_item_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,v1").remove();
	$(table_expense_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,v1").remove();
	
	$(table_task_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	$(table_item_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	$(table_expense_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	
	$(table_task_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});
	$(table_item_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});
	$(table_expense_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});
	
	$(table_task_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_item_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_expense_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"padding:1%;font-size:"+font_size+"em;border:2px solid black;");

	var line_break1=document.createElement('br');
	var line_break2=document.createElement('br');
		
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(header_copy);
	container.appendChild(table_task_copy);
	container.appendChild(line_break1);	
	container.appendChild(table_item_copy);
	container.appendChild(line_break2);
	container.appendChild(table_expense_copy);
	footer.appendChild(bill_message);
	footer.appendChild(signature);
	container.appendChild(footer);
	$.print(container);
}