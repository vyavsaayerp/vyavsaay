<div id='form15' class='function_detail'>
	<form id='form15_master'>
		<fieldset>
			<label>Customer	<img src='./images/add_image.png' class='add_image' title='Add new customer' onclick='modal11_action();'></br>
			<input type='text' required></label>
			<label>Return Date</br><input type='text' required></label>
			<label>Total Refund</br>Rs. <input readonly='readonly' type='number' step='any'></label>
			<input type='hidden' name='bill_id'>
			<input type='hidden' name='transaction'>
			<input type='hidden' name='tax'>
			<input type='button' title='New Bill' class='add_icon' onclick='form15_new_form();'>
			<input type='submit' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form15_print_form();'>
			<input type='button' id='form15_share' class='share_icon' style='display:none;'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form15_header'></form>
					<th>Product Name</th>
					<th>Batch</th>
					<th>Notes</th>
					<th>Quantity</th>
					<th>Type</th>
					<th><input type='button' form='form15_header' title='Add item' class='add_icon' onclick='form15_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form15_body'>
		</tbody>
	</table>
</div>