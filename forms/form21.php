<div class='forms'><b>Enter goods received</b>
	<form id='form21_master'>
		<fieldset>
			Supplier<input type='text'>
			Bill Date<input type='text'>
			Entry Date<input type='text'>
			Total Amount<input type='text' >
			<input type='hidden' value=''>
			<input type='button' value='Save Bill' onclick='form12_save_form();'>
			<input type='button' value='Discard Bill' onclick='form12_delete_form();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<form id='form21_header'></form>
					<th>Product Name</th>
					<th>Batch</th>
					<th>Expiry</th>
					<th>Cost Price</th>
					<th>Quantity</th>
					<th><input type='button' form='form21_header' value='Add item' onclick='form21_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form21_body'>
		</tbody>
	</table>
</div>