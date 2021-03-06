/**
 * vImport
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */
var vImport = function (options)
{
	var defaults={};
	var settings = $.extend(defaults, options || {});

	//valdiates the import data as per the provided argument
	this.validate = function(data_array,vt)
	{
		var error_array=new Object();
		error_array.status='success';
		error_array.logs=[];
		//console.log(vt);
		var row_count=1;
		data_array.forEach(function(data_row)
		{
			// console.log(data_row);
			row_count+=1;
			for (var a=0;a<vt.length;a++)
			{
				if(data_row[vt[a].column]=='undefined')
				{
					error_array.logs.push({row:row_count,column:vt[a].column,error:"Undefined",data:''});
					error_array.status='error';
				}
				else if((typeof vt[a].required!='undefined') && vt[a].required=='yes' && (data_row[vt[a].column]=="" || data_row[vt[a].column]=='null'))
				{
					error_array.logs.push({row:row_count,column:vt[a].column,error:"Blank",data:''});
					error_array.status='error';
				}
				else if(data_row[vt[a].column]!="")
				{
					vImport.validateRegex(vt[a],data_row,error_array,row_count);
					vImport.validateList(vt[a],data_row,error_array,row_count);
					vImport.validateAntiList(vt[a],data_row,error_array,row_count);
					vImport.formulateJson(vt[a],data_row,error_array,row_count);
				}
			}
		});
		return error_array;
	};

	//this function validates the regex match
	this.validateRegex = function(column,data_row,error_array,row_count)
	{
		if(typeof column.regex!='undefined')
		{
			var test_result=column.regex.test(data_row[column.column]);
			if(!test_result)
			{
				error_array.logs.push({row:row_count,column:column.column,error:"Format Mismatch",data:data_row[column.column]});
				error_array.status='error';
			}
		}
	};

	//this function validates that the provided list should be matched
	this.validateList = function(column,data_row,error_array,row_count)
	{
		if((typeof column.list!='undefined') && $.inArray(data_row[column.column],column.list)==-1)
		{
			var list_string="";
			if(column.list.length<10)
			{
				list_string=" - ";
				for(var x in column.list)
				{
					list_string+=column.list[x]+";";
				}
			}
			error_array.logs.push({row:row_count,column:column.column,error:"Data doesn't match system list"+list_string,data:data_row[column.column]});
			error_array.status='error';
		}
	};

	//this function validates that the provided list should not be matched, i.e, avoids duplicate entries.
	this.validateAntiList = function(column,data_row,error_array,row_count)
	{
		if((typeof column.anti_list!='undefined') && $.inArray(data_row[column.column],column.anti_list)!=-1)
		{
			var list_string="";
			if(column.anti_list.length<10)
			{
				list_string=" - ";
				for(var x in column.anti_list)
				{
					list_string+=column.anti_list[x]+";";
				}
			}
			error_array.logs.push({row:row_count,column:column.column,error:"Duplicate Data - "+list_string,data:data_row[column.column]});
			error_array.status='error';
		}
	};

	this.formulateJson = function(column,data_row,error_array,row_count)
	{
		if((typeof column.json!='undefined'))
		{
			data_row[column.column] = data_row[column.column].replace(/\'/g,"\"");
			var x = data_row[column.column].replace(/\'/g,"\"");
			try{
				var data = JSON.parse(data_row[column.column]);
			}catch(e)
			{
				error_array.logs.push({row:row_count,column:column.column,error:"JSON Error",data:data_row[column.column]});
				error_array.status='error';
			}
		}
	};

	this.readFile = function(input,func)
	{
		vIni.showProgress();
		show_loader();

		var file=input.files[0];
		var fileType = /csv/gi;

		var reader = new FileReader();
		reader.onload = function(e){func(reader.result);};
		reader.readAsText(file);
	};

	this.importData = function(content,form,i_func,v_func)
	{
		progress_value=5;
		var data_array=vUtil.csv2array(content);

		progress_value=10;

		var error_array = {status:'success'};

		if(typeof v_func!='undefined')
		{
			error_array=v_func(data_array);
		}

		if(error_array.status=='success')
		{
			i_func(data_array);

			progress_value=15;

			//console.log(data_array.length);

			var ajax_complete=setInterval(function()
			{
				//console.log(number_active_ajax);
				if(number_active_ajax===0)
				{
					progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
				}
				else if(localdb_open_requests===0)
				{
					progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
				}

				if(number_active_ajax===0 && localdb_open_requests===0)
				{
					vIni.hideProgress();
					hide_loader();
					clearInterval(ajax_complete);
				}
			},1000);
			$(form).find(".close").click();
		}
		else
		{
			vIni.hideProgress();
			hide_loader();
			$(form).find(".close").click();
			modal164_action(error_array);
		}
	};
};
vImport=new vImport();
