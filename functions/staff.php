<div id='staff_main' class='vy_tabs function_main'>
		<ul>
			<li><a id='form8_link' href='#form8' onclick='form8_header_ini(); form8_ini();' data-i18n='form.manage_staff'></a></li>
			<li><a id='form7_link' href='#form7' onclick='form7_header_ini(); form7_ini();' data-i18n='form.attendance'></a></li>
			<li><a id='form14_link' href='#form14' onclick='form14_header_ini(); form14_ini();' data-i18n='form.manage_tasks'></a></li>
			<li><a id='form79_link' href='#form79' onclick='form79_header_ini(); form79_ini();' data-i18n='form.manage_task_types'></a></li>
			<li><a id='form86_link' href='#form86' onclick='form86_header_ini(); form86_ini();' data-i18n='form.location_tracking'></a></li>
			<li><a id='report17_link' href='#report17' onclick='report17_header_ini();' data-i18n='form.staff_performance'></a></li>
			<li><a id='report30_link' href='#report30' onclick='report30_header_ini();' data-i18n='form.tasks_performed'></a></li>
			<li><a id='form98_link' href='#form98' onclick='form98_header_ini(); form98_ini();' data-i18n='form.attributes'></a></li>
		</ul>

	<?php 
			include "forms/form8.php";
			include "forms/form7.php";
			include "forms/form14.php";
			include "forms/form79.php";
			include "forms/form86.php";
			include "reports/report17.php";
			include "reports/report30.php";
			include "forms/form98.php";
	?>
</div>