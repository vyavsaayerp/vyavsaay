<div id='form326' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal196_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form326_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form326_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form326_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form326_upload' onclick=modal23_action(form326_import_template,form326_import,form326_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form326_header'></form>
						<th><input type='text' placeholder="Letter #" class='floatlabel' name='letter' form='form326_header'></th>
						<th><input type='text' placeholder="Category" readonly='readonly' form='form326_header'></th>
						<th><input type='text' placeholder="Notes" readonly='readonly' form='form326_header'></th>
						<th><input type='text' placeholder="Assigned To" class='floatlabel' name='staff' form='form326_header'></th>
						<th><input type='text' placeholder="Process" readonly='readonly' form='form326_header'></th>
						<th><input type='submit' form='form326_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form326_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form326_header_ini()
		{
			var filter_fields=document.getElementById('form326_header');
			var names_filter=filter_fields.elements['letter'];
            var staff_filter=filter_fields.elements['staff'];

			var names_data={data_store:'letters',return_column:'letter_num'};
			set_my_filter_json(names_data,names_filter);

		    var staff_data={data_store:'staff',return_column:'acc_name'};
			set_my_filter_json(staff_data,staff_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form326_ini();
			});
		}

		function form326_ini()
		{
			show_loader();
			var fid=$("#form326_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form326_body').html("");

			var filter_fields=document.getElementById('form326_header');
			var fname=filter_fields.elements['letter'].value;
            var fstaff=filter_fields.elements['staff'].value;

			var paginator=$('#form326_body').paginator();

			var new_columns=new Object();
					new_columns.count=paginator.page_size();
					new_columns.start_index=paginator.get_index();
					new_columns.data_store='letters';
					new_columns.indexes=[{index:'id',value:fid},
									{index:'letter_num',value:fname},
									{index:'department'},
                                    {index:'detail'},
                                    {index:'office'},
                                    {index:'dpo_section'},
                                    {index:'remarks'},
                                    {index:'file_num'},
									{index:'status',exact:'open'},
									{index:'due_date'},
									{index:'assigned_to',value:fstaff}];

			read_json_rows('form326',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form326_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Letter #'>";
								rowsHTML+="<a onclick=\"modal200_action('"+result.id+"');\"><input type='text' readonly='readonly' form='form326_"+result.id+"' value='"+result.letter_num+"' name='letter' class='floatlabel' placeholder='Letter #'></a>";
								rowsHTML+="<input type='text' readonly='readonly' form='form326_"+result.id+"' value='"+result.file_num+"' name='file_num' class='floatlabel' placeholder='File #'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Category'>";
								rowsHTML+="<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Department' form='form326_"+result.id+"' name='dep' value='"+result.department+"'>";
                                rowsHTML+="<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Office' form='form326_"+result.id+"' name='office' value='"+result.office+"'>";
                                rowsHTML+="<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='DPO Section' form='form326_"+result.id+"' name='dpo' value='"+result.dpo_section+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Notes'>";
								rowsHTML+="<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Brief Notes' form='form326_"+result.id+"' name='notes'>"+result.detail+"</textarea>";
                                rowsHTML+="<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Remarks' form='form326_"+result.id+"' name='remarks'>"+result.remarks+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Assigned To'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form326_"+result.id+"' name='staff' class='dblclick_editable' value='"+result.assigned_to+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Process'>";
								rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form326_"+result.id+"' name='followup'>Follow up</button>";
                                rowsHTML+="<button type='button' class='btn default purple-stripe' form='form326_"+result.id+"' name='close'>Close</button>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form326_"+result.id+"' name='id' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form326_"+result.id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form326_"+result.id+"' title='Delete' name='delete' onclick='form326_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                                rowsHTML+="<button type='button' class='btn yellow-saffron' form='form326_"+result.id+"' title='Contact Assignee' name='contact'><i class='fa fa-envelope'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form326_body').append(rowsHTML);
					var fields=document.getElementById("form326_"+result.id);
					var dep_filter=fields.elements['dep'];
					var staff_filter=fields.elements['staff'];
					var followup_button=fields.elements['followup'];
                    var close_button=fields.elements['close'];
					var contact_button=fields.elements['contact'];

					$(followup_button).on('click',function ()
					{
						modal198_action(result.id,result.letter_num,result.detail);
					});

					$(close_button).on('click',function ()
					{
						modal197_action(result.id,result.letter_num,result.detail);
					});

                    $(contact_button).on('click',function ()
					{
						modal199_action(result.id,result.letter_num,result.assigned_to);
					});

					var dep_data={data_store:'letters',return_column:'department'};
					set_my_filter_json(dep_data,dep_filter);

					var staff_data={data_store:'staff',return_column:'acc_name'};
					set_my_value_list_json(staff_data,staff_filter);

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form326_update_item(fields);
					});
				});

				$('#form326').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:new_columns,file:'Open Letters',report_id:'form326',feach:function (item)
				{
                    delete item.status;

                    item['Letter #']=item.letter_num;
                    delete item.letter_num;

                    item['File #']=item.file_num;
                    delete item.file_num;

                    item['DPO Section']=item.dpo_section;
                    delete item.dpo_section;

                    item['Due Date']=get_my_past_date(item.due_date);
                    delete item.due_date;
                }});
				hide_loader();
			});
		};

		function form326_update_item(form)
		{
			if(is_update_access('form326'))
			{
				var letter=form.elements['letter'].value;
				var dep=form.elements['dep'].value;
                var detail=form.elements['notes'].value;
				var staff=form.elements['staff'].value;
				var office=form.elements['office'].value;
				var remarks=form.elements['remarks'].value;
				var dpo=form.elements['dpo'].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();
				var data_json={data_store:'letters',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'department',value:dep},
                        {index:'detail',value:detail},
                        {index:'office',value:office},
                        {index:'remarks',value:remarks},
                        {index:'dpo_section',value:dpo},
                        {index:'assigned_to',value:staff},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Letter # '+letter,link_to:'form326'}};
				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form326_delete_item(button)
		{
			if(is_delete_access('form326'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var letter=form.elements['letter'].value;
					var data_id=form.elements['id'].value;
					var data_json={data_store:'letters',
	 					log:'yes',
	 					data:[{index:'id',value:data_id}],
	 					log_data:{title:'Deleted',notes:'Letter # '+letter,link_to:'form326'}};
					var follow_json={data_store:'followups',
	 					data:[{index:'source_id',value:data_id}]};

					delete_json(data_json);
					delete_json(follow_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

        function form326_import_template()
		{
			var data_array=['id','letter number','file number','DPO section','department','office','brief notes','remarks','due_date','assigned_to'];
			vUtil.arrayToCSV(data_array);
		};

		function form326_import_validate(data_array)
		{
			var validate_template_array=[{column:'letter numner',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'notes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                    {column:'file number',regex:new RegExp('^[0-9a-zA-Z \'_.,/#@$!()-]+$')},
                                    {column:'remakrs',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                    {column:'office',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                    {column:'DPO section',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                    {column:'department',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                    {column:'assigned_to',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'due_date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form326_import(data_array,import_type)
		{
			var data_json={data_store:'letters',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Open letters',link_to:'form326'}};

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
	 					{index:'letter_num',value:row['letter number']},
	 					{index:'detail',value:row.notes},
                        {index:'department',value:row.department},
                        {index:'office',value:row.office},
                        {index:'dpo_section',value:row['DPO section']},
                        {index:'remarks',value:row.remarks},
                        {index:'file_num',value:row['file number']},
	 					{index:'due_date',value:get_raw_time(row.due_date)},
	 					{index:'assigned_to',value:row.assigned_to},
                        {index:'status',value:'open'},
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
		}

	</script>
</div>
