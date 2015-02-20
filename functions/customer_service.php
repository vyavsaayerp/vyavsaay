<div id='customer_service_main' class='function_main'>
	<?php 
		
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form128-')!==false)
				echo "<li><a id='form128_link' href='#form128' onclick='form128_header_ini(); form128_ini();' data-i18n='form.manage_service_requests'></a></li>";
			if(strpos($_SESSION['forms'],'form134-')!==false)
				echo "<li><a id='form134_link' href='#form134' onclick='form134_header_ini(); form134_ini();' data-i18n='form.service_request_dashboard'></a></li>";
			if(strpos($_SESSION['forms'],'form126-')!==false)
				echo "<li><a id='form126_link' href='#form126' onclick='form126_header_ini(); form126_ini();' data-i18n='form.issues_list'></a></li>";
			if(strpos($_SESSION['forms'],'form129-')!==false)
				echo "<li><a id='form129_link' href='#form129' onclick='form129_ini();' data-i18n='form.engineer_locations'></a></li>";
			if(strpos($_SESSION['forms'],'form130-')!==false)
				echo "<li><a id='form130_link' href='#form130' onclick='form130_header_ini(); form130_ini();' data-i18n='form.job_orders'></a></li>";
			if(strpos($_SESSION['forms'],'form131-')!==false)
				echo "<li><a id='form131_link' href='#form131' onclick='form131_header_ini(); form131_ini();' data-i18n='form.check_tasks'></a></li>";
			if(strpos($_SESSION['forms'],'form132-')!==false)
				echo "<li><a id='form132_link' href='#form132' onclick='form132_header_ini();' data-i18n='form.create_service_request'></a></li>";			
			if(strpos($_SESSION['forms'],'form133-')!==false)
				echo "<li><a id='form133_link' href='#form133' onclick='form133_header_ini(); form133_ini();' data-i18n='form.service_documents'></a></li>";			
			if(strpos($_SESSION['reports'],'report56-')!==false)
				echo "<li><a id='report56_link' href='#report56' onclick='report56_header_ini();' data-i18n='form.service_requests_report'></a></li>";			
			if(strpos($_SESSION['reports'],'report57-')!==false)
				echo "<li><a id='report57_link' href='#report57' onclick='report57_header_ini();' data-i18n='form.warranty_status'></a></li>";			
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form128-')!==false)
			include "forms/form128.php";
		if(strpos($_SESSION['forms'],'form134-')!==false)
			include "forms/form134.php";
		if(strpos($_SESSION['forms'],'form126-')!==false)	
			include "forms/form126.php"; 
		if(strpos($_SESSION['forms'],'form129-')!==false)
			include "forms/form129.php";
		if(strpos($_SESSION['forms'],'form130-')!==false)
			include "forms/form130.php";
		if(strpos($_SESSION['forms'],'form131-')!==false)
			include "forms/form131.php";
		if(strpos($_SESSION['forms'],'form132-')!==false)
			include "forms/form132.php";
		if(strpos($_SESSION['forms'],'form133-')!==false)
			include "forms/form133.php";
		if(strpos($_SESSION['reports'],'report56-')!==false)
			include "reports/report56.php";
		if(strpos($_SESSION['reports'],'report57-')!==false)
			include "reports/report57.php";
	?>		
	
	<script>
	!function(){
		$("#customer_service_main").tabs(
		{
			show:"slide",
			activate:function(e, ui) 
		    {
		    	e.currentTarget.blur();
		    	$('#form131_calendar').fullCalendar('render');
		    	$('#form132_calendar').fullCalendar('render');
				if(typeof map129 != 'undefined')		    	
			    	map129.invalidateSize(false);
		    },
		    beforeActivate:function(event,ui)
		    {
		    	$(document).off('keydown');
			}
		}).css(
			{
				'min-height': '570px',
				'overflow': 'auto'
			});
		}();
				
	</script>

</div>