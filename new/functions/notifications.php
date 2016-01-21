<div id='notifications_box' style='display:none;'>
	<h3 class="page-title">Notifications</h3>
	<div class="row">
		<div class="col-md-12">
			<div class="tabbable-line tabbable-full-width">
				<div class="tab-content" id='notifications_detail'>
					No notifications
				</div>					
			</div>
		</div>
	</div>
</div>

<script>
function notifications_ini()
{
	show_loader();
	var columns=new Object();
	columns.data_store='notifications';
	columns.indexes=[{index:'id'},
						{index:'title'},
						{index:'link_to'},
						{index:'data_id'},
						{index:'notes'},
						{index:'t_generated'},
						{index:'status',exact:'pending'},
						{index:'target_user'},
						{index:'last_updated'}];
	
	if_data_read_access('notifications',function(accessible_data)
	{	
		read_json_rows('',columns,function(notifs)
		{	
			var result_html="";
			
			notifs.forEach(function(notif)
			{
				var read=false;
				var update=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id==notif.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || accessible_data[x].criteria_field=="null" || notif[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								break;
							}
							if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							if(accessible_data[x].access_type=='update')
							{
								update=true;
							}							
						}
					}
				}

				var found=notif.target_user.indexOf(get_account_name());
				if(read || found>=0)
				{
					if(update || found>=0)
					{
						result_html+="<div class='search-classic'><div class='notification_check'><i class='fa fa-check-square' onclick=notifications_update($(this),'"+notif.id+"','closed');></i></div><div class='notification_detail'><h4><a onclick=element_display('"+notif.data_id+"','"+notif.link_to+"');>"+
							notif.title+"</a></h4><p>"+notif.notes+"</p></div></div>";
					}
					else 
					{
						result_html+="<div class='search-classic'><div class='notification_check_grey'><i class='fa fa-check-square'></i></div><div class='notification_detail'><h4><a onclick=element_display('"+notif.data_id+"','"+notif.link_to+"');>"+
							notif.title+"</a></h4><p>"+notif.notes+"</p></div></div>";
					}
				}
			});
			
			var columns2=new Object();
				columns2.data_store='notifications';
				columns2.count=20;
				columns2.indexes=[{index:'id'},
									{index:'title'},
									{index:'link_to'},
									{index:'data_id'},
									{index:'notes'},
									{index:'t_generated'},
									{index:'status',exact:'reviewed'},
									{index:'target_user'},
									{index:'last_updated'}];

			read_json_rows('',columns2,function(notifs2)
			{	
				notifs2.forEach(function(notif2)
				{
					var read=false;
					var update=false;
					for(var x in accessible_data)
					{
						if(accessible_data[x].record_id==notif2.id || accessible_data[x].record_id=='all')
						{
							if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || notif2[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
							{
								if(accessible_data[x].access_type=='all')
								{
									read=true;
									update=true;
									break;
								}
								if(accessible_data[x].access_type=='read')
								{
									read=true;
								}
								if(accessible_data[x].access_type=='update')
								{
									update=true;
								}							
							}
						}
					}
					
					var found=notif2.target_user.indexOf(get_account_name());
					if(read || found>=0)
					{
						if(update || found>=0)
						{
							result_html+="<div class='search-classic'><div class='notification_check'><i class='fa fa-check-square' onclick=notifications_update($(this),'"+notif2.id+"','closed');></i></div><div class='notification_detail'><h4><a onclick=element_display('"+notif2.data_id+"','"+notif2.link_to+"');>"+
								notif2.title+"</a></h4><p>"+notif2.notes+"</p></div></div>";
						}
						else 
						{
							result_html+="<div class='search-classic'><div class='notification_check_grey'><i class='fa fa-check-square'></i></div><div class='notification_detail'><h4><a onclick=element_display('"+notif2.data_id+"','"+notif2.link_to+"');>"+
								notif2.title+"</a></h4><p>"+notif2.notes+"</p></div></div>";
						}
					}
				});
				$("#notifications_detail").html(result_html);
				hide_loader();
			});
		});
	});
}

function notifications_update(button,data_id,status)
{
	var data_json={data_store:'notifications',
 					log:'no',
 					data:[{index:'id',value:data_id},
 					{index:'status',value:status},
 					{index:'last_updated',value:get_my_time()}]};
 						
	update_json(data_json);
	$(button).parent().parent().hide();
}

</script>

<?php 
	
	include_once "./Classes/db.php";
	use RetailingEssentials\db_connect;

	$domain="";
				
	if(isset($_GET['dn']))
	{
		$domain=$_GET['dn'];
	}

	if(isset($_SESSION['domain']) || $domain!="")
	{
		if($domain=="")
		{	$domain=$_SESSION['domain'];}
					
		$db_name="re_user_".$domain;
		$conn=new db_connect($db_name);
		$query="select * from system_notifications where status=?;";
		$stmt=$conn->conn->prepare($query);
		$stmt->execute(array('active'));
		$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);
		
		$script_content="";
		$function_names="function start_workers(){";
		for($i=0;$i<count($struct_res);$i++)
		{
			$script_content.=$struct_res[$i]['function_def'];
			$function_names.="timed_execute(function(){".$struct_res[$i]['function_name']."},'".$struct_res[$i]['initial_delay']."','".$struct_res[$i]['repeat_delay']."');";
			//$function_names.="timed_execute(function(){".$struct_res[$i]['function_name']."},'10','50');";
		}
		
		$function_names.="}";
		
		echo "<script type='text/javascript'>";
		echo $script_content;		
		echo $function_names;
		echo "</script>";
	}
?>