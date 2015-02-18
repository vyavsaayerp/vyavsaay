<div id='form118' class='function_detail'>
	<form id='form118_master'>
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' onclick='modal11_action();'></br>
			<input type='text' required></label>
			<label id='form118_customer_info'></label>
			<label>Bill Date</br><input type='text' required></label>
			<label>Bill #<br><input type='text' name='bill_num' readonly="readonly"></label>
			<input type='hidden' name='bill_id'>
			<input type='hidden' name='offer'>
			<input type='hidden' name='transaction'>
			<label>Loyalty Program</br><input type='text' name='loyalty_program'></label>
			<label>Loyalty Points</br><input type='number' name='loyalty_points' step='any'></label>
			<label>Redeem Points</br><input type='checkbox' name='redeem'></label>
			<input type='button' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form118_print_form();'>
			<input type='button' id='form118_share' class='share_icon' style='display:none;'>
			<input type='submit' class='submit_hidden'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form118_header'></form>
				<th>Product Name</th>
				<th>Batch</th>
				<th>Quantity</th>
				<th>Unit Price</th>
				<th>Total</th>
				<th><input type='button' title='Add item' class='add_icon' onclick='form118_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form118_body'>
		</tbody>
		<tfoot id='form118_foot'>
		</tfoot>
	</table>
</div>