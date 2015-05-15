<div id='form12' class='function_detail'>
	<form id='form12_master'>
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form12_add_customer'>
			<br><input type='text' required></label>
			<label>Bill Date<br><input type='text' required></label>
			<label>Bill #<br><input type='text' name='bill_num' readonly="readonly"></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='offer'>
				<input type='hidden' name='transaction'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form12_print_form();'></label>
			<label>	<input type='button' id='form12_share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form12_header'></form>
					<th>Product Name</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th>Unit Price</th>
					<th>Total</th>
					<th><input type='button' form='form12_header' title='Add item' class='add_icon' onclick='form12_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form12_body'>
		</tbody>
		<tfoot id='form12_foot'>
		</tfoot>
	</table>
</div>