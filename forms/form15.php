<div id='form15' class='function_detail'>
	<form id='form15_master'>
		<fieldset>
			<label>Customer	<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form15_add_customer'><br>
			<input type='text' required></label>
			<label>Return Date</br><input type='text' required></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='transaction'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form15_print_form();'></label>
			<label>	<input type='button' id='form15_share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
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
		<tfoot id='form15_foot'>
		</tfoot>
	</table>
</div>