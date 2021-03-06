<div id='form191' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form191_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form191_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form191_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form191_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form191_upload' onclick=modal23_action(form191_import_template,form191_import,form191_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form191_header'></form>
						<th><input type='text' placeholder="Table" class='floatlabel' name='table' form='form191_header'></th>
						<th><input type='text' placeholder="List" class='floatlabel' name='list' form='form191_header'></th>
						<th><input type='text' placeholder="Value" class='floatlabel' name='value' form='form191_header'></th>
						<th><input type='submit' form='form191_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form191_body'>
			</tbody>
		</table>
	</div>

	<script>

		function form191_header_ini()
		{
			var form=document.getElementById('form191_header');
			var table_filter=form.elements['table'];
			var list_filter=form.elements['list'];
			var value_filter=form.elements['value'];

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form191_ini();
			});

			var table_data=new Object();
				table_data.data_store='values_list';
				table_data.indexes=[{index:'tablename'}];
				table_data.return_column='tablename';
			set_my_filter_json(table_data,table_filter);

			var list_data=new Object();
				list_data.data_store='values_list';
				list_data.indexes=[{index:'listname'}];
				list_data.return_column='listname';
			set_my_filter_json(list_data,list_filter);

			var value_data=new Object();
				value_data.data_store='values_list';
				value_data.indexes=[{index:'name'}];
				value_data.return_column='name';
			set_my_filter_json(value_data,value_filter);
		}

		function form191_ini()
		{
			var fid=$("#form191_link").attr('data_id');
			if(fid==null)
				fid="";

			var form=document.getElementById('form191_header');
			var table_filter=form.elements['table'].value;
			var list_filter=form.elements['list'].value;
			var value_filter=form.elements['value'].value;

			show_loader();
			$('#form191_body').html('');

			var paginator=$('#form191_body').paginator();

			var pop_data=new Object();
					pop_data.count=paginator.page_size();
					pop_data.start_index=paginator.get_index();
					pop_data.data_store='values_list';

					pop_data.indexes=[{index:'id',value:fid},
									{index:'tablename',value:table_filter},
									{index:'listname',value:list_filter},
									{index:'name',value:value_filter}];

			read_json_rows('form191',pop_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form191_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Table'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form191_"+result.id+"' value='"+result.tablename+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='List'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form191_"+result.id+"' value='"+result.listname+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<input type='text' class='dblclick_editable' readonly='readonly' form='form191_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form191_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form191_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form191_"+result.id+"' title='Delete' onclick='form191_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form191_body').append(rowsHTML);
					var fields=document.getElementById("form191_"+result.id);

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form191_update_item(fields);
					});
				});

				$('#form191').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:pop_data,file:'Values List',report_id:'form191'});
				hide_loader();
			});
		};

		function form191_add_item()
		{
			if(is_create_access('form191'))
			{
				var id=vUtil.newKey();

				var rowsHTML="<tr>";
						rowsHTML+="<form id='form191_"+id+"'></form>";
							rowsHTML+="<td data-th='Table'>";
								rowsHTML+="<input type='text' form='form191_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='List'>";
								rowsHTML+="<input type='text' form='form191_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<input type='text' class='dblclick_editable' form='form191_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form191_"+id+"' value='"+id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form191_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form191_"+id+"' title='Delete' onclick='form191_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

				$('#form191_body').prepend(rowsHTML);

				var fields=document.getElementById("form191_"+id);
				var table_filter=fields.elements[0];
				var list_filter=fields.elements[1];

				$(table_filter).focus();

				var table_data=new Object();
				table_data.data_store='values_list';
				table_data.indexes=[{index:'tablename'}];
				table_data.return_column='tablename';
				set_my_filter_json(table_data,table_filter);

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form191_create_item(fields);
				});
				$('#form191').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form191_create_item(form)
		{
			if(is_create_access('form191'))
			{
				var table=form.elements[0].value;
				var list=form.elements[1].value;
				var values=form.elements[2].value;
				var data_id=form.elements[3].value;
				var del_button=form.elements[5];
				var last_updated=get_my_time();

				var data_json={data_store:'values_list',
					data:[{index:'id',value:data_id},
	 					{index:'tablename',value:table,uniqueWith:['listname','name']},
	 					{index:'listname',value:list},
	 					{index:'name',value:values},
	 					{index:'last_updated',value:last_updated}]};

				create_json(data_json);

				$(form).readonly();

				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form191_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form191_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form191_update_item(form)
		{
			if(is_update_access('form191'))
			{
				var table=form.elements[0].value;
				var list=form.elements[1].value;
				var values=form.elements[2].value;
				var data_id=form.elements[3].value;
				var del_button=form.elements[5];
				var last_updated=get_my_time();

				var data_json={data_store:'values_list',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:values},
	 					{index:'last_updated',value:last_updated}]};
				update_json(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form191_delete_item(button)
		{
			if(is_delete_access('form191'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var data_id=form.elements[3].value;

					var data_json={data_store:'values_list',
 							data:[{index:'id',value:data_id}]};

					delete_json(data_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form191_import_template()
		{
			var data_array=['id','tablename','listname','value'];
			vUtil.arrayToCSV(data_array);
		};

		function form191_import(data_array,import_type)
		{
			var data_json={data_store:'values_list',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Values Lists system configuration',link_to:'form191'}};

			var counter=1;
			var last_updated=get_my_time();

			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}

				var data_json_array=[{index:'id',value:row.id},
	 					{index:'tablename',value:row.tablename},
	 					{index:'listname',value:row.listname},
	 					{index:'name',value:row.value},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});

			if(import_type=='create_new')
			{
				create_batch_json(data_json);
			}
			else
			{
				update_batch_json(data_json);
			}
		};

		function form191_import_validate(data_array)
		{
			var validate_template_array=[{column:'tablename',required:'yes',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
									{column:'listname',required:'yes',regex:new RegExp('^[0-9a-zA-Z_ -]+$')},
									{column:'value',required:'yes',regex:new RegExp('^[0-9a-zA-Z_ @-]+$')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

	</script>
</div>
