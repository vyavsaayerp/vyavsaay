<div id='form146' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form146_header'></form>
					<th>Product <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form146_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form146_header'></th>
					<th>Quantity</th>
					<th>Schedule</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form146_header'></th>
					<th><input type='button' form='form146_header' value='Add new schedule' class='add_icon' onclick='form146_add_item();'>
						<input type='button' form='form146_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form146_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form146_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form146_prev' class='prev_icon' data-index='-25' onclick="$('#form146_index').attr('data-index',$(this).attr('data-index')); form146_ini();">
		<div style='display:hidden;' id='form146_index' data-index='0'></div>
		<img src='./images/next.png' id='form146_next' class='next_icon' data-index='25' onclick="$('#form146_index').attr('data-index',$(this).attr('data-index')); form146_ini();">
	</div>
</div>