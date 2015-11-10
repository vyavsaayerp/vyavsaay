<?php

	include_once "./Classes/db.php";
	use RetailingEssentials\db_connect;

		$domain=$_SESSION['domain'];
		$db_name="re_user_".$domain;
		$conn=new db_connect($db_name);
		$query="select name,display_name,head_color,back_color from system_grids where status=? order by grid_order asc;";
		
		$stmt=$conn->conn->prepare($query);
		$stmt->execute(array('active'));
		$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);

		
		$grids_array=[];
		$grids_array_elem="";	
		$hide_string='';	
		$function_array_string='[';

		for($i=0;$i<count($struct_res);$i++)
		{
			$grids_array_elem.="?,";
			$grids_array[]=$struct_res[$i]['name'];
			$hide_string.="$('#".$struct_res[$i]['name']."_main').hide();";
			$function_array_string.="'".$struct_res[$i]['name']."',";
		}
		$function_array_string=rtrim($function_array_string,",");

		$grids_array_elem=trim($grids_array_elem,",");
		$query1="select * from system_grid_metrics where grid in (".$grids_array_elem.") and status=?";
		$grids_array[]='active';
		$stmt1=$conn->conn->prepare($query1);
		$stmt1->execute($grids_array);
		$struct_res2=$stmt1->fetchAll(PDO::FETCH_ASSOC);

		$metric_by_grid=[];
		$script_content="";
		$function_names="";

		for($j=0;$j<count($struct_res2);$j++)
		{		
			$script_content.=$struct_res2[$j]['function_def'];
			$function_names.=$struct_res2[$j]['function_name'];
		}
		$script_content.="function calculate_grid_metrics() {deferred_execute(function(){".$function_names."});};";
		
		echo "<div id='home_grid'><ul>";
		
				
		for($i=0;$i<count($struct_res);$i++)
		{
			echo "<li id='".$struct_res[$i]['name']."_link' onclick=\"grid_click('".$struct_res[$i]['name']."');\" style='background-color:".$struct_res[$i]['back_color']."'>".
				"<a><div style='background-color:".$struct_res[$i]['head_color']."'><b>".$struct_res[$i]['display_name']."</b></div></a>".
				"<ul>";
			
			for($j=0;$j<count($struct_res2);$j++)
			{		
				if($struct_res[$i]['name']==$struct_res2[$j]['grid'])
				{
					echo "<li>".$struct_res2[$j]['display_name'].": <a class='grid_item' id='".$struct_res2[$j]['metric_id']."'></a></li>";
				}					
			}
			
			echo "</ul></li>";
		}
		
		echo "</ul>".
			"</div>";
				
			
		echo "<script type='text/javascript'>";
		echo "function hide_all_grids(){".$hide_string."};";
		echo "system_grids_array=".$function_array_string."];";
		echo $script_content;
		echo "</script>";
			

?>
