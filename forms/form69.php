<div id='form69' class='function_detail'>
	<form id='form69_master'>
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' title='Add new customer' id='form69_add_customer'><br>
			<input type='text' required></label>
			<label>Order Date<br><input type='text' required></label>
			<label>Billing Status<br><input type='text' required></label>
			<label><input type='hidden' name='order_id' value=''></label>
			<label>	<input type='button' title='Save order' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form69_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form69_header'></form>
					<th>Product Name</th>
					<th>Quantity</th>
					<th>Notes</th>
					<th><input type='button' form='form69_header' title='Add item' class='add_icon' onclick='form69_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form69_body'>
		</tbody>
	</table>
</div>