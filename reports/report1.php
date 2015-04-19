<div id='report1' class='function_detail'>
	<form id='report1_header'>
		<fieldset>
			<legend>Select Filters</legend>
			<label>Date Since</br><input type='text' required title='Date since the changes are to be evaluated'></label>
			<label>Product</br><input type='text' title='If product is not specified, all applicable products will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Product</th>
				<th>Batch</th>
				<th>Store Area</th>
				<th>Type</th>
				<th>Detail</th>
			</tr>
		</thead>
		<tbody id='report1_body'>
		</tbody>
	</table>
</div>