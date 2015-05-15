<div id='form122' class='function_detail'>
	<form id='form122_master'>
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' id='form122_add_supplier'><br>
			<input type='text' required></label>
			<label>Bill Number<br><input type='text' required></label>
			<label>Bill Date<br><input type='text' required></label>
			<label>Entry Date<br><input type='text' required></label>
			<label>Notes<br><textarea></textarea></label>
			<label>Unbilled Items<br><input readonly='readonly' type='number'></label>
			<label>
				<input type='hidden' value=''>
				<input type='hidden' name='transaction'>
			</label>
			<label>	<input type='button' value='Select unbilled items' class='generic_icon'></label>
			<label>	<input type='button' title='Save Bill' class='save_icon'></label>
			<label> <input type='button' title='Print Bill' class='print_icon' onclick='form122_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form122_header'></form>
					<th>Product Name</th>
					<th>Quantity</th>
					<th>Amount</th>
					<th>Batch</th>
					<th>Storage Area</th>
					<th><input type='button' form='form122_header' title='Add item' class='add_icon' onclick='form122_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form122_body'>
		</tbody>
		<tfoot id='form122_foot'>
		</tfoot>
	</table>
</div>