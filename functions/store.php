<div id='store_main' class='tabs function_main'>
	<ul>
		<li><a id='form5_link' href='#form5' onclick='form5_header_ini(); form5_ini();' data-i18n='form.manage_assets'></a></li>
		<li><a id='form109_link' href='#form109' onclick='form109_header_ini(); form109_ini();' data-i18n='form.asset_attributes'></a></li>
		<li><a id='form38_link' href='#form38' onclick='form38_header_ini(); form38_ini();' data-i18n='form.store_placement'></a></li>
		<li><a id='report45_link' href='#report45' onclick='report45_header_ini();' data-i18n='form.virtual_store'></a></li>
		<li><a id='form83_link' href='#form83' onclick='form83_header_ini(); form83_ini();' data-i18n='form.storage_areas'></a></li>
		<li><a id='report1_link' href='#report1' onclick='report1_header_ini();' data-i18n='form.signage_changes'></a></li>
	</ul>

	<?php
			include "forms/form5.php";
			include "forms/form109.php";
			include "forms/form38.php";
			include "reports/report45.php";
			include "forms/form83.php";
			include "reports/report1.php";
	?>
	
</div>