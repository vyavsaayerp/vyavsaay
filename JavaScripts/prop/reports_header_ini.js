function report4_header_ini()
{	
	var form=document.getElementById('report4_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(start_date).datepicker();
	$(end_date).datepicker();
	$(end_date).val(get_my_date());
}

/**
 * @reportNo 6
 * @report Payments due from customers
 */
function report6_header_ini()
{	
	var form=document.getElementById('report6_header');
	var due_date=form.elements[1];
	var customer_filter=form.elements[2];

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_value_list(customer_data,customer_filter);
	
	$(due_date).datepicker();
	$(due_date).val(get_my_date());
}

/**
 * @reportNo 14
 * @report Expenses by period
 */
function report14_header_ini()
{	
	var form=document.getElementById('report14_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];
	var account_filter=form.elements[3];

	var accounts_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	set_my_filter(accounts_data,account_filter);
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	$(start_date).val(get_my_date());
	$(end_date).val(get_my_date());
}


function report30_header_ini()
{	
	var form=document.getElementById('report30_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(start_date).datepicker();
	$(end_date).datepicker();
	$(end_date).val(get_my_date());
}

function report31_header_ini()
{	
	var form=document.getElementById('report31_header');
	var amount=form.elements[1];

	$("#form31_slider").slider({
		range: true,
		min: 0,
		max: 50000,
		values: [75,3000],
		slide: function(event,ui){
			$(amount).val("Rs. "+ui.values[0]+" - Rs. "+ui.values[1]);
		}});
	$(amount).val("Rs. "+$("#form31_slider").slider("values",0)+" - Rs. "+$("#form31_slider").slider("values",1));
	
}

function report32_header_ini()
{	
	var form=document.getElementById('report32_header');
	var amount=form.elements[1];

	$("#form32_slider").slider({
		range: true,
		min: 0,
		max: 50000,
		values: [500,5000],
		slide: function(event,ui){
			$(amount).val("Rs. "+ui.values[0]+" - Rs. "+ui.values[1]);
		}});
	$(amount).val("Rs. "+$("#form32_slider").slider("values",0)+" - Rs. "+$("#form32_slider").slider("values",1));
}

function report33_header_ini()
{	
	var form=document.getElementById('report33_header');
	var amount=form.elements[1];

	$("#form33_slider").slider({
		range: true,
		min: 0,
		max: 5000000,
		values: [7500,500000],
		slide: function(event,ui){
			$(amount).val("Rs. "+ui.values[0]+" - Rs. "+ui.values[1]);
		}});
	$(amount).val("Rs. "+$("#form33_slider").slider("values",0)+" - Rs. "+$("#form33_slider").slider("values",1));
}

function report35_header_ini()
{	
	var form=document.getElementById('report35_header');
	var product_filter=form.elements[1];
	var product_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	set_my_value_list(product_data,product_filter);
}

function report36_header_ini()
{	
	var form=document.getElementById('report36_header');
	var product_filter=form.elements[1];
	var product_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	set_my_value_list(product_data,product_filter);
}

/**
 * @reportNo 37
 * @report Payments due to suppliers
 */
function report37_header_ini()
{	
	var form=document.getElementById('report37_header');
	var due_date=form.elements[1];
	var supplier_filter=form.elements[2];

	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	set_my_value_list(supplier_data,supplier_filter);
	
	$(due_date).datepicker();
	$(due_date).val(get_my_date());
}
