<div id='form59' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form59_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form59_header' onblur="form59_ini('');"></th>
					<th>Requisite Type <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form59_header' onblur="form59_ini('');"></th>
					<th>Requisite Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form59_header' onblur="form59_ini('');"></th>
					<th>Quantity</th>
					<th><input type="button" value='Add new requisite' form='form59_header' class='add_icon' onclick="form59_add_item();">
						<input type='button' form='form59_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form59_header' value='IMPORT' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form59_body'>
		</tbody>
	</table>
</div>