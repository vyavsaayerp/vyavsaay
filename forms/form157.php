<div id='form157' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form157_header'></form>
					<th>Product <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form157_header'></th>
					<th>Quantity </th>
					<th>Store </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form157_header'></th>
					<th><input type="button" value='Add new' class='add_icon' form='form157_header' onclick="form157_add_item();">
						<input type='button' form='form157_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form157_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form157_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form157_prev' class='prev_icon' data-index='-25' onclick="$('#form157_index').attr('data-index',$(this).attr('data-index')); form157_ini();">
		<div style='display:hidden;' id='form157_index' data-index='0'></div>
		<img src='./images/next.png' id='form157_next' class='next_icon' data-index='25' onclick="$('#form157_index').attr('data-index',$(this).attr('data-index')); form157_ini();">
	</div>
</div>