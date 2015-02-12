<div id='form103' class='function_detail'>
	<form id='form103_master'>
		<fieldset>
			<label>Project Name</br><input type='text' required></label>
			<input type='hidden' name='project_id' form='form103_master'>
			<input type='submit' title='Save' class='save_icon'>
			<input type='button' title='Print' class='print_icon' onclick='form103_print_form($(this));'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form103_header'></form>
					<th>Phase Name</th>
					<th>Details</th>
					<th>Start Date</th>
					<th>Due Date</th>
					<th>Status</th>
					<th><input type='button' class='add_icon' form='form103_header' title='Add phase' onclick='form103_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form103_body'>
		</tbody>
	</table>
</div>