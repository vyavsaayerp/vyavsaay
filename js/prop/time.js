function get_raw_time(date)
{
	if(date=='')
	{
		return "";
	}
	else
	{
		var date_time_array=String(date).split(/ /);
		var date_elem=date_time_array[0];

		var date_array=date_elem.split(/[\-\/]+/);

		var day=1;
		var month=0;
		var year=2016;
		if(date_array.length==3)
		{
			day=parseInt(date_array[0]);
			month=parseInt(date_array[1])-1;
			year=parseInt(date_array[2]);
		}
		else if(date_array.length==2)
		{
			month=parseInt(date_array[0])-1;
			year=parseInt(date_array[1]);
		}
		else if(date_array.length==1)
		{
			year=parseInt(date_array[0]);
		}

        if(year<50)
        {
            year=2000+year;
        }
        else if(year>50 && year<100)
        {
            year=1900+year;
        }

		var hour=0;
		var minutes=0;
		var seconds=0;

		if(date_time_array.length==2)
		{
			var time_elem=date_time_array[1];
	 		var time_array=time_elem.split(/:/);
			if(time_array.length==1)
			{
				hour=parseInt(time_array[0]);
			}
			else if(time_array.length==2)
			{
				hour=parseInt(time_array[0]);
				minutes=parseInt(time_array[1]);
			}
			else if(time_array.length==3)
			{
				hour=parseInt(time_array[0]);
				minutes=parseInt(time_array[1]);
				seconds=parseInt(time_array[2]);
			}
		}
		var d=new Date(year,month,day,hour,minutes,seconds,0);
		return d.getTime();
	}
}

function get_raw_time_24h()
{
	var d=new Date();
	var yesterday=parseFloat(d.getTime())-86400000;
	return yesterday;
}

function get_time_from_formatted_date(formatted_date)
{
	if(date=='')
	{
		return "";
	}
	else
	{
		var day=parseInt(date.substr(0,2));
		var month=parseInt(date.substr(3,2))-1;
		var current_date=new Date();
		var year=current_date.getFullYear();
		var d=new Date(year,month,day,0,0,0,0);
		return d.getTime();
	}
}

function get_formatted_time(my_time)
{
	var d=new Date(parseFloat(my_time));

	var month = new Array();
		month[0] = "Jan";
		month[1] = "Feb";
		month[2] = "Mar";
		month[3] = "Apr";
		month[4] = "May";
		month[5] = "Jun";
		month[6] = "Jul";
		month[7] = "Aug";
		month[8] = "Sep";
		month[9] = "Oct";
		month[10] = "Nov";
		month[11] = "Dec";

	var mon = month[d.getMonth()];
	//var year = d.getFullYear();
	var date = d.getDate();
	var hr = d.getHours();
	if(hr<10)
		hr="0"+hr;
	var min = d.getMinutes();
	if(min<10)
		min="0"+min;
	var time=date+" "+mon+", "+hr+":"+min;
	return time;
}

function get_only_time(my_time)
{
	var d=new Date(parseFloat(my_time));

	var hr = d.getHours();
	if(hr<10)
		hr="0"+hr;
	var min = d.getMinutes();
	if(min<10)
		min="0"+min;
	var time=hr+":"+min;
	return time;
}

function get_my_time()
{
	var d=new Date();
	var seconds=d.getTime();
	return seconds;
}

//this is to be replaced with vTime.date({time:raw_time});
function get_my_date(raw_time)
{
	if(!raw_time)
	{
		var d=new Date();
		var year = d.getFullYear();
		var month =d.getMonth()+1;
		if (month < 10) {
		    month = "0" + month;
		}
		var date = d.getDate();
		if (date < 10) {
		    date = "0" + date;
		}

		var time=date+"/"+month+"/"+year;
		return time;
	}
	else if(raw_time=='')
	{
		return "";
	}
	else
	{
		var d= new Date(parseFloat(raw_time));
		var year = d.getFullYear();
		var month =d.getMonth()+1;
		if (month < 10) {
		    month = "0" + month;
		}
		var date = d.getDate();
		if (date < 10) {
		    date = "0" + date;
		}

		var time=date+"/"+month+"/"+year;
		return time;
	}
}

//this is to be replaced with vTime.date({time:raw_time});
function get_my_past_date(raw_time)
{
	if(raw_time=='' || raw_time=='0' || raw_time=='null' || raw_time=='undefined' || raw_time==null)
	{
		return "";
	}
	else
	{
		var d= new Date(parseFloat(raw_time));
		var year = d.getFullYear();
		var month =d.getMonth()+1;
		if (month < 10) {
		    month = "0" + month;
		}
		var date = d.getDate();
		if (date < 10) {
		    date = "0" + date;
		}

		var time=date+"/"+month+"/"+year;
		return time;
	}
}

function get_my_datetime(raw_time)
{
	if(!raw_time)
	{
		var d=new Date();
		var year = d.getFullYear();
		var month =d.getMonth()+1;
		if (month < 10) {
		    month = "0" + month;
		}
		var date = d.getDate();
		if (date < 10) {
		    date = "0" + date;
		}
		var hour=d.getHours();
		if (hour < 10) {
		    hour = "0" + hour;
		}
		var minutes=d.getMinutes();
		if (minutes < 10) {
		    minutes = "0" + minutes;
		}
		var time=date+"/"+month+"/"+year+" "+hour+":"+minutes;
		return time;
	}
	else if(raw_time=="" || raw_time=="null" || raw_time=="undefined" || raw_time=="NULL")
	{
		//console.log('blank');
		return "";
	}
	else
	{
		var d= new Date(parseFloat(raw_time));
		var year = d.getFullYear();
		var month =d.getMonth()+1;
		if (month < 10) {
		    month = "0" + month;
		}
		var date = d.getDate();
		if (date < 10) {
		    date = "0" + date;
		}
		var hour=d.getHours();
		if (hour < 10) {
		    hour = "0" + hour;
		}
		var minutes=d.getMinutes();
		if (minutes < 10) {
		    minutes = "0" + minutes;
		}
		var time=date+"/"+month+"/"+year+" "+hour+":"+minutes;
		return time;
	}
}


function get_iso_date(raw_time)
{
	var d= new Date(parseInt(raw_time));
	var year = d.getFullYear();
	var month =d.getMonth()+1;
	if (month < 10) {
	    month = "0" + month;
	}
	var date = d.getDate();
	if (date < 10) {
	    date = "0" + date;
	}

	var time=year+"-"+month+"-"+date;
	return time;
}

function get_iso_time(raw_time)
{
	var d= new Date(parseInt(raw_time));
	var year = d.getFullYear();
	var month =d.getMonth()+1;
	if (month < 10) {
	    month = "0" + month;
	}
	var date = d.getDate();
	if (date < 10) {
	    date = "0" + date;
	}
	var hr = d.getHours();
	if(hr<10)
		hr="0"+hr;
	var min = d.getMinutes();
	if(min<10)
		min="0"+min;
	var seconds=d.getSeconds();
	if(seconds<10)
		seconds="0"+seconds;

	var time=year+"-"+month+"-"+date+"T"+hr+":"+min+":"+seconds+"Z";
	return time;
}

function get_my_date_from_iso(iso_date)
{
	if(iso_date=='')
	{
		return "";
	}
	else
	{
		var year=iso_date.substr(0,4);
		var month=iso_date.substr(5,2);
		var day=iso_date.substr(8,2);
		var my_date=day+"/"+month+"/"+year;
		return my_date;
	}
}
