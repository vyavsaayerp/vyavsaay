<div id='form2' class='tab-pane'>
	<form id='form2_master' autocomplete="off">
		<fieldset>
			<label>Name<br><input type='text' required></label>
			<label>Description<br><textarea class='widebox'></textarea></label>
			<label>	<input type='hidden' name='nl_id' form='form2_master' value=''></label>
			<label>	<input type='button' title='Save' class='save_icon'></label>
			<label>	<input type='button' title='Print' class='print_icon' onclick='form2_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>				
		</fieldset>
	</form>
	<table class='rwd-table sortable'>
		<thead>
			<tr>
				<form id='form2_header'></form>
					<th>Item</th>
					<th>Detail</th>
					<th>Image</th>
					<th><input type='button' class='add_icon' form='form2_header' title='Add item' onclick='form2_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form2_body'>
		</tbody>
	</table>
</div>