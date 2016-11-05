<div id='report116' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report116_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report116_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report116_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report116_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report116_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Branch" class='floatlabel' name='branch'></label>
				<label><input type='text' placeholder="Manifest Date" class='floatlabel' name='date'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Branch</th>
					<th>Total Assigned</th>
					<th>Received</th>
					<th>Out for Delivery</th>
					<th>Pending</th>
					<th>RTO</th>
					<th>Delivered</th>
					<th>COD Collected</th>
					<th>COD Pending</th>
				</tr>
			</thead>
			<tbody id='report116_body'>
			</tbody>
			<tfoot id='report116_foot'>
			</tfoot>
		</table>
	</div>

	<div class='modal_forms'>
		<a href='#report116_popup' data-toggle="modal" id='report116_popup_link'></a>
		<div id="report116_popup" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog modal-full">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">Order Details</h4>
					</div>
					<div class="modal-body">
						<div class="scroller" style="height:400px;" data-always-visible="1" data-rail-visible1="1">
							<table id='report116_popup_table' class='table table-striped table-bordered table-hover dt-responsive no-more-tables'>
								<thead>
									<tr>
										<th>AWB #</th>
										<th>Order #</th>
										<th>Ship To</th>
										<th>Shipment Date</th>
										<th>COD Value</th>
									</tr>
								</thead>
								<tbody id='report116_popup_body'></tbody>
							</table>
							</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn green" data-dismiss='modal' name='close' value='Close'>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script>
        function report116_header_ini()
        {
            var form=document.getElementById('report116_header');
			var branch_filter=form.elements['branch'];
			var manifest_filter=form.elements['date'];

            $(form).off('submit');
            $(form).on('submit',function(event)
            {
                event.preventDefault();
                report116_ini();
            });

			var branch_data={data_store:'store_areas',return_column:'name'};
			set_my_filter_json(branch_data,branch_filter);

			$(manifest_filter).datepicker();
			manifest_filter.value=vTime.date();

			var paginator=$('#report116_body').paginator({'visible':false,'container':$('#report116_body')});
            setTimeout(function(){$('#report116').formcontrol();},1000);
        }

        function report116_ini()
        {
            var form=document.getElementById('report116_header');
			var branch=form.elements['branch'].value;
			var manifest_date=vTime.unix({date:form.elements['date'].value});

            show_loader();
            $('#report116_body').html('');

			var branches_data={data_store:'store_areas',return_column:'name',
								indexes:[{index:'name',value:branch}]};

			read_json_single_column(branches_data,function(branches_array)
			{
				var branches=[];
				branches_array.forEach(function(branch)
				{
					var branch_obj={
						'name':branch,
						'total':0,
						'transit':0,
						'received':0,
						'ofd':0,
						'pending':0,
						'rto':0,
						'delivered':0,
						'total_cod':0,
						'cod_collected':0,
						'cod_pending':0
					};
					branches.push(branch_obj);
				});

	            var orders_data={data_store:'logistics_orders',
	                              indexes:[{index:'id'},
										  {index:'branch',array:branches_array},
	                                      {index:'manifest_date',exact:manifest_date},
										  {index:'status'},
									  	  {index:'collectable_value'}]};
				read_json_rows('report116',orders_data,function(orders)
	            {
					orders.forEach(function(order)
					{
						if(order.branch!="")
						{
							branches.forEach(function(branch)
							{
								if(order.branch==branch.name)
								{
									switch(order.status)
									{
										case 'in-transit': branch.transit+=1;
														branch.total_cod+=parseFloat(order.collectable_value);
														branch.total+=1;
														break;
										case 'received':
										case 'pending':
										case 'undelivered':branch.pending+=1;
														branch.total_cod+=parseFloat(order.collectable_value);
														branch.total+=1;
														break;
										case 'out for delivery':branch.ofd+=1;
														branch.total_cod+=parseFloat(order.collectable_value);
														branch.total+=1;
														break;
										case 'delivered':branch.delivered+=1;
														branch.cod_collected+=parseFloat(order.collectable_value);
														branch.total_cod+=parseFloat(order.collectable_value);
														branch.total+=1;
														break;
										case 'RTO Delivered':
										case 'RTO pending':
										case 'RTO out for delivery':branch.rto+=1;
														branch.total+=1;
														break;
										default: branch.total+=1;
												branch.total_cod+=parseFloat(order.collectable_value);
									}
								}
							});
						}
					});

		          	branches.forEach(function(branch)
		            {
						branch.received=branch.total-branch.transit;
						branch.cod_pending=branch.total_cod-branch.cod_collected;

						  var rowsHTML="<tr>";
						  rowsHTML+="<td data-th='Branch'>";
		                      rowsHTML+=branch.name;
		                  rowsHTML+="</td>";
						  rowsHTML+="<td data-th='Total Assigned'><a onclick=\"report116_popup_action('"+branch.name+"','total');\">";
		                      rowsHTML+=branch.total;
		                  rowsHTML+="</a></td>";
		                  rowsHTML+="<td data-th='Received'><a onclick=\"report116_popup_action('"+branch.name+"','received');\">";
		                      rowsHTML+=branch.received;
		                  rowsHTML+="</a></td>";
						  rowsHTML+="<td data-th='Out for Delivery'><a onclick=\"report116_popup_action('"+branch.name+"','ofd');\">";
		                      rowsHTML+=branch.ofd;
		                  rowsHTML+="</a></td>";
			              rowsHTML+="<td data-th='Pending'><a onclick=\"report116_popup_action('"+branch.name+"','pending');\">";
		                      rowsHTML+=branch.pending;
		                  rowsHTML+="</a></td>";
		                  rowsHTML+="<td data-th='RTO'><a onclick=\"report116_popup_action('"+branch.name+"','rto');\">";
		                      rowsHTML+=branch.rto;
		                  rowsHTML+="</a></td>";
						  rowsHTML+="<td data-th='Delivered'><a onclick=\"report116_popup_action('"+branch.name+"','delivered');\">";
		                      rowsHTML+=branch.delivered;
		                  rowsHTML+="</a></td>";
						  rowsHTML+="<td data-th='COD Collected'><a onclick=\"report116_popup_action('"+branch.name+"','delivered');\">";
		                      rowsHTML+="Rs. "+branch.cod_collected;
		                  rowsHTML+="</a></td>";
						  rowsHTML+="<td data-th='COD Pending'><a onclick=\"report116_popup_action('"+branch.name+"','cod_pending');\">";
		                      rowsHTML+="Rs. "+branch.cod_pending;
		                  rowsHTML+="</a></td>";
						  rowsHTML+="</tr>";

		                  $('#report116_body').append(rowsHTML);
		            });

					vExport.export_buttons({file:'Branch Stock Report',report_id:'report116',action:'static'});
					hide_loader();
			    });
			});
		};

		function report116_popup_action(branch,type)
		{
			show_loader();
			var form=document.getElementById('report116_header');
			var manifest_date=vTime.unix({date:form.elements['date'].value});

			$('#report116_popup_body').html('');
			var status_object={index:'status'};
			switch(type)
			{
				case 'total':status_object={index:"status"};
							break;
				case 'received':status_object={index:"status",unequal:'in-transit'};
								break;
				case 'ofd':status_object={index:"status",exact:'out for delivery'};
								break;
				case 'pending':status_object={index:"status",array:['pending','undelivered','received']};
								break;
				case 'rto':status_object={index:"status",array:['RTO pending','RTO delivered','RTO out for delivery']};
								break;
				case 'delivered':status_object={index:"status",exact:'delivered'};
								break;
				case 'cod_pending':status_object={index:"status",array:['pending','undelivered','out for delivery']};
								break;
			}
			var form=document.getElementById('report116_popup_form');
			var orders_data={data_store:'logistics_orders',
							indexes:[{index:'awb_num'},
									{index:'order_num'},
									{index:'ship_to'},
									{index:'address1'},
									{index:'address2'},
									{index:'city'},
									{index:'manifest_type'},
									{index:'branch',exact:branch},
									{index:'manifest_date',exact:manifest_date},
									{index:'import_date'},
									status_object,
									{index:'collectable_value'}]};
			read_json_rows('report116',orders_data,function(orders)
			{
				orders.forEach(function(order)
				{
					var rowsHTML="<tr>";
					rowsHTML+="<td data-th='AWB #'>";
						rowsHTML+=order.awb_num;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order #'>";
						rowsHTML+=order.order_num;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Ship To'>";
						rowsHTML+=order.ship_to+", "+order.address1+", "+order.address2+", "+order.city;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Shipment Date'>";
						rowsHTML+=vTime.date({time:order.import_date});
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='COD Value'>";
						if(order.manifest_type=='COD')
							rowsHTML+="Rs. "+order.collectable_value;
						else
							rowsHTML+="-";
					rowsHTML+="</a></td>";
					rowsHTML+="</tr>";

					$('#report116_popup_body').append(rowsHTML);
				});
				hide_loader();
			});

			$("#report116_popup_link").click();
		};
	</script>
</div>
