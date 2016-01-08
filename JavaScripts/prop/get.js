/**
 * this function resizes and sets the preview of the picture
 * @param evt Event that is called when image is selected
 * @param pictureinfo the html element to display the preview of the image
 */
function select_picture(evt,pictureinfo,func)
{
	var file=evt.target.files[0];
	if(file.type.match('image.*'))
	{	
		var reader = new FileReader();
						
		reader.onloadend=function()
		{
		    var tempImg = new Image();
		    tempImg.src = reader.result;
		    tempImg.onload = function()
		    {
		        var MAX_WIDTH = 200;
		        var MAX_HEIGHT = 150;
		        var tempW = tempImg.width;
		        var tempH = tempImg.height;
		        if (tempW > tempH) {
		            if (tempW > MAX_WIDTH) {
		               tempH *= MAX_WIDTH / tempW;
		               tempW = MAX_WIDTH;
		            }
		        } else {
		            if (tempH > MAX_HEIGHT) {
		               tempW *= MAX_HEIGHT / tempH;
		               tempH = MAX_HEIGHT;
		            }
		        }
		 
		        var canvas = document.createElement('canvas');
		        canvas.width = tempW;
		        canvas.height = tempH;
		        var ctx = canvas.getContext("2d");
		        ctx.drawImage(this, 0, 0, tempW, tempH);
		        var dataURL = canvas.toDataURL("image/jpeg");
		        func(dataURL);
		    };
		 
		};
		reader.readAsDataURL(file);
	}
}

function select_picture_large(evt,func)
{
	var file=evt.target.files[0];
	if(file.type.match('image.*'))
	{	
		var reader = new FileReader();
						
		reader.onloadend=function()
		{
		    var tempImg = new Image();
		    tempImg.src = reader.result;
		    tempImg.onload = function()
		    {
		        var MAX_WIDTH = 1600;
		        var MAX_HEIGHT = 1200;
		        var tempW = tempImg.width;
		        var tempH = tempImg.height;
		        if (tempW > tempH) {
		            if (tempW > MAX_WIDTH) {
		               tempH *= MAX_WIDTH / tempW;
		               tempW = MAX_WIDTH;
		            }
		        } else {
		            if (tempH > MAX_HEIGHT) {
		               tempW *= MAX_HEIGHT / tempH;
		               tempH = MAX_HEIGHT;
		            }
		        }
		 
		        var canvas = document.createElement('canvas');
		        canvas.width = tempW;
		        canvas.height = tempH;
		        var ctx = canvas.getContext("2d");
		        ctx.drawImage(this, 0, 0, tempW, tempH);
		        var dataURL = canvas.toDataURL("image/jpeg");
		        func(dataURL);
		    };
		 
		};
		reader.readAsDataURL(file);
	}
}

function select_picture_unsized(evt,func)
{
	var file=evt.target.files[0];
	if(file.type.match('image.*'))
	{	
		var reader = new FileReader();
						
		reader.onloadend=function()
		{
		    var tempImg = new Image();
		    tempImg.src = reader.result;
		    tempImg.onload = function()
		    {
		        var tempW = tempImg.width;
		        var tempH = tempImg.height;
		        
		        var canvas = document.createElement('canvas');
		        canvas.width = tempW;
		        canvas.height = tempH;
		        var ctx = canvas.getContext("2d");
		        ctx.drawImage(this, 0, 0, tempW, tempH);
		        var dataURL = canvas.toDataURL("image/jpeg");
		        func(dataURL);
		    };
		};
		reader.readAsDataURL(file);
	}
}


function resize_picture(picture_tag,pic_width)
{
    var tempW = picture_tag.width;
    var tempH = picture_tag.height;
    if (tempW > tempH) 
    {
        if (tempW > pic_width) 
        {
           tempH *= pic_width / tempW;
           tempW = pic_width;
        }
    } 
 
    var canvas = document.createElement('canvas');
    canvas.width = tempW;
    canvas.height = tempH;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(picture_tag, 0, 0, tempW, tempH);
    var dataURL = canvas.toDataURL("image/jpeg");
    picture_tag.setAttribute("src", dataURL);
}

/**
 * this function saves the document
 * @param evt Event that is called when document selected
 */
function select_document(evt,func)
{
	var file=evt.target.files[0];
	var reader = new FileReader();
					
	reader.onloadend=function()
	{
        var dataURL = reader.result;
        func(dataURL);	
	};
	reader.readAsDataURL(file);
}


function get_new_key()
{
	var d=new Date();
	var seconds=d.getTime();
	//seconds=(seconds*1000)+Math.floor(Math.random()*1000);
	return seconds;
}


/*
* Fetches all records for a specified form and exports them to a csv
*/
function get_export_data(columns,filename)
{
	var new_columns=columns.replace(" count='25'","");
	new_columns=new_columns.replace(" count='100'","");
	new_columns=new_columns.replace("start_index","dont_use_index");
	//console.log(new_columns);
	show_loader();
	fetch_requested_data('',new_columns,function(results)
	{
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var export_xml="<export_log>"+
					"<id>"+data_id+"</id>"+
					"<acc_name>"+get_account_name()+"</acc_name>"+
					"<filename>"+filename+"</filename>"+
					"<export_time>"+last_updated+"</export_time>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</export_log>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>export_log</tablename>" +
					"<link_to></link_to>" +
					"<title>Exported</title>" +
					"<notes>"+filename+" report</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(export_xml,activity_xml);
		
		results.forEach(function(result)
		{
			result.last_updated=get_my_datetime(result.last_updated);
		});

		hide_loader();			
		my_obj_array_to_csv(results,filename);
	});
}

/*
* Fetches all records for a specified form and exports them to a csv
*/
function get_export_data_extended(columns,filename,func)
{
	show_loader();
	var new_columns=columns.replace(" count='25'","");
	new_columns=new_columns.replace(" count='100'","");
	new_columns=new_columns.replace("start_index","dont_use_index");
	//console.log(new_columns);
	
	fetch_requested_data('',new_columns,function(results)
	{
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var export_xml="<export_log>"+
					"<id>"+data_id+"</id>"+
					"<acc_name>"+get_account_name()+"</acc_name>"+
					"<filename>"+filename+"</filename>"+
					"<export_time>"+last_updated+"</export_time>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</export_log>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>export_log</tablename>" +
					"<link_to></link_to>" +
					"<title>Exported</title>" +
					"<notes>"+filename+" report</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(export_xml,activity_xml);
		
		results.forEach(function(result)
		{
			func(result);
		});

		var export_complete=setInterval(function()
		{
			
			//console.log(total_export_requests);
			if(total_export_requests===0)
			{
				clearInterval(export_complete);
				//console.log(results);				
				hide_loader();
				my_obj_array_to_csv(results,filename);
			}
		},1000);
	});
}


/*
* Fetches all records for a specified form and exports them to a csv
*/
function get_export_data_restructured(columns,filename,func)
{
	show_loader();
	
	columns.count=0;
	columns.start_index=0;
	columns.batch_size=5000;
	
	read_json_rows('',columns,function(results)
	{		
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var export_xml="<export_log>"+
					"<id>"+data_id+"</id>"+
					"<acc_name>"+get_account_name()+"</acc_name>"+
					"<filename>"+filename+"</filename>"+
					"<export_time>"+last_updated+"</export_time>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</export_log>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>export_log</tablename>" +
					"<link_to></link_to>" +
					"<title>Exported</title>" +
					"<notes>"+filename+" report</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(export_xml,activity_xml);
		
		var new_result_array=func(results);

		var export_complete=setInterval(function()
		{
			//console.log(total_export_requests);
			if(total_export_requests===0)
			{
				clearInterval(export_complete);
				//console.log(new_result_array);				
				hide_loader();
				my_obj_array_to_csv(new_result_array,filename);
			}
		},1000);
	});
}

/*
* Fetches all records for a specified form and exports them to a csv
*/
function get_limited_export_data(columns,filename,func)
{
	show_loader();
	columns.count=0;
	columns.start_index=0;
	columns.batch_size=5000;
	
	read_json_rows('',columns,function(results)
	{
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var export_xml="<export_log>"+
					"<id>"+data_id+"</id>"+
					"<acc_name>"+get_account_name()+"</acc_name>"+
					"<filename>"+filename+"</filename>"+
					"<export_time>"+last_updated+"</export_time>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</export_log>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>export_log</tablename>" +
					"<link_to></link_to>" +
					"<title>Exported</title>" +
					"<notes>"+filename+" report</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(export_xml,activity_xml);
		
		if(typeof func!='undefined')
		{
			results.forEach(function(result)
			{
				func(result);
			});
		}
		
		var export_complete=setInterval(function()
		{
			//console.log(total_export_requests);
			if(total_export_requests===0)
			{
				clearInterval(export_complete);
				//console.log(results);				
				hide_loader();
				my_obj_array_to_csv(results,filename);
			}
		},1000);
	});
}


/*
* Fetches all records for a specified report and exports them to a csv
*/
function csv_download_report(result_array,filename)
{
	var data_id=get_new_key();
	var last_updated=get_my_time();
	var export_xml="<export_log>"+
				"<id>"+data_id+"</id>"+
				"<acc_name>"+get_account_name()+"</acc_name>"+
				"<filename>"+filename+"</filename>"+
				"<export_time>"+last_updated+"</export_time>"+
				"<last_updated>"+last_updated+"</last_updated>"+
				"</export_log>";
	var activity_xml="<activity>" +
				"<data_id>"+data_id+"</data_id>" +
				"<tablename>export_log</tablename>" +
				"<link_to></link_to>" +
				"<title>Exported</title>" +
				"<notes>"+filename+" report</notes>" +
				"<updated_by>"+get_name()+"</updated_by>" +
				"</activity>";
	create_row(export_xml,activity_xml);

	hide_loader();			
	my_obj_array_to_csv(result_array,filename);
}


/**
 * Converts a two dimensional array to csv file
 * @param data_array
 */
function my_array_to_csv(data_array)
{
	var csvString = data_array.join(",");
	//csvString=escape(csvString);

	var a = document.createElement('a');
	//a.href = 'data:attachment/csv,' + csvString;
	//a.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
	//a.target = '_blank';
	//a.download = 'import_template.csv';

	var type = 'text/csv;';
	var blob = new Blob([csvString], { type: type });			
	var URL = window.URL || window.webkitURL;
	var downloadUrl = URL.createObjectURL(blob);	
			
	a.setAttribute('href',downloadUrl);
	a.download = 'import_template.csv';
	a.target = '_blank';

	document.body.appendChild(a);
	a.click();
}


/**
 * Converts an array of objects into a csv file
 */
function my_obj_array_to_csv(data_array,file_name)
{
	var csvRows = [];

	///for header row
	var header_string="";
	var header_array=[];
	for(var p in data_array[0])
	{
		header_array.push(p);	
		header_string+=p+",";
	}
	
    csvRows.push(header_string);
	
	/////for data rows
	data_array.forEach(function(data_row)
	{
		//console.log(data_row);
		var data_string="";
		for(var i=0;i<header_array.length;i++)
		{
			if(typeof data_row[header_array[i]]!= 'undefined')
			{
				if(header_array[i]=='id')
				{
					data_string+="'"+data_row[header_array[i]]+",";
				}
				else
				{
					if(String(data_row[header_array[i]]).search(",") || String(data_row[header_array[i]]).search(";"))
					{
						data_row[header_array[i]]="\""+data_row[header_array[i]]+"\"";
					}
					data_string+=data_row[header_array[i]]+",";
				}
			}
			else 
			{
				data_string+=",";
			}
		}
		csvRows.push(data_string);
	});

	var csvString = csvRows.join("\n");
	var a = document.createElement('a');

	var type = 'text/csv;';
	var blob = new Blob([csvString], { type: type });			
	var URL = window.URL || window.webkitURL;
	var downloadUrl = URL.createObjectURL(blob);	
			
	a.setAttribute('href',downloadUrl);
	a.download = file_name+'.csv';
	a.target = '_blank';
	
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}


/**
 * Converts an array of objects into a csv file
 */
function my_obj_array_to_csv_string(data_array)
{
	var csvRows = [];

	///for header row
	var header_string="";
	var header_array=[];
	for(var p in data_array[0])
	{
		header_array.push(p);	
		header_string+=p+",";
	}
	
    csvRows.push(header_string);
	
	/////for data rows
	data_array.forEach(function(data_row)
	{
		//console.log(data_row);
		var data_string="";
		for(var i=0;i<header_array.length;i++)
		{
			if(typeof data_row[header_array[i]]!= 'undefined')
			{
				if(header_array[i]=='id')
				{
					data_string+="'"+data_row[header_array[i]]+",";
				}
				else
				{
					if(String(data_row[header_array[i]]).search(","))
					{
						data_row[header_array[i]]="\""+data_row[header_array[i]]+"\"";
					}
					data_string+=data_row[header_array[i]]+",";
				}
			}
			else 
			{
				data_string+=",";
			}
		}
		csvRows.push(data_string);
	});

	var csvString = csvRows.join("\n");
	return csvString;
}


/**
 * This function converts a csv string into array of named objects
 * @param csvString CSV String to be converted 
 * @returns {Array} Array of objects
 */
function csv_string_to_obj_array(csvString)
{
	csvString = csvString.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\%\^\&\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
	//csvString = csvString.replace(/[a-zA-Z0-9<>|\n\t. _+&()-]/g,'');	
	csvString = csvString.replace(/â/g,'');
	
	
	var rows=csvString.split("\n");	
	var results=[];


	for(var x=0;x<rows.length;x++)
	{
		var dquotes=rows[x].match(/"/g);
		if(dquotes!=null && dquotes.length===1)
		{
			for(var y=x+1;y<rows.length;y++)
			{
				rows[x]+="\n"+rows[y];
				var second_dquotes=rows[y].match(/"/g);
				rows.splice(y,1);
				y-=1;
				if(second_dquotes!=null && second_dquotes.length===1)
				{
					break;
				}
			}
		}
	}

	var header_cols=rows[0].split(',');
	
	for(var i=1;i<rows.length;i++)
	{
		if(rows[i]!="")
		{
			var columns=rows[i].split(',');
			var col_result=new Object();
			
			for(var j=0;j<columns.length;j++)
			{
				var dquotes=columns[j].match(/"/g);
				if(dquotes!=null && dquotes.length===1)
				{
					for(var k=j+1;k<columns.length;k++)
					{
						columns[j]+=","+columns[k];
						var second_dquotes=columns[k].match(/"/g);
						columns.splice(k,1);
						k-=1;
						if(second_dquotes!=null && second_dquotes.length===1)
						{
							break;
						}
					}
					columns[j]=columns[j].replace(/^\"/, "");
					columns[j]=columns[j].replace(/\"$/, "");	
				}
				columns[j]=columns[j].replace(/&/g, "and");
				columns[j]=columns[j].replace(/^\"+|\"+$/gm,'');
				if(header_cols[j]=='id')
				{
					columns[j]=columns[j].replace(/'/gm,'');
				}
				col_result[header_cols[j]]=columns[j];
			}
			//console.log(col_result);
			results.push(col_result);
		}
	}
	return results;
}

function validate_import_array(data_array,vt)
{
	var error_array=new Object();
	error_array.status='success';
	error_array.logs=[];
	//console.log(vt);
	var row_count=1;
	data_array.forEach(function(data_row)
	{
		//console.log(data_row);
		row_count+=1;
		for (var a=0;a<vt.length;a++)
		{
			//console.log(vt[a]);
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
				if(typeof vt[a].regex!='undefined')
				{
					var test_result=vt[a].regex.test(data_row[vt[a].column]);
					//console.log(test_result);
					if(!test_result)
					{
						//console.log('e3');
						error_array.logs.push({row:row_count,column:vt[a].column,error:"Format Mismatch",data:data_row[vt[a].column]});
						error_array.status='error';
					}
				}
				
				if((typeof vt[a].list!='undefined') && $.inArray(data_row[vt[a].column],vt[a].list)==-1)
				{
					var list_string="";
					
					if(vt[a].list.length<10)
					{
						list_string=" - ";
						for(var x in vt[a].list)
						{
							list_string+=vt[a].list[x]+";";
						}
					}
					error_array.logs.push({row:row_count,column:vt[a].column,error:"Data doesn't match system list"+list_string,data:data_row[vt[a].column]});
					error_array.status='error';
				}

				if((typeof vt[a].anti_list!='undefined') && $.inArray(data_row[vt[a].column],vt[a].anti_list)!=-1)
				{
					var list_string="";
					
					if(vt[a].list.length<10)
					{
						list_string=" - ";
						for(var x in vt[a].list)
						{
							list_string+=vt[a].list[x]+";";
						}
					}
					error_array.logs.push({row:row_count,column:vt[a].column,error:"Duplicate Data - "+list_string,data:data_row[vt[a].column]});
					error_array.status='error';
				}
			}			
		}
	});
	return error_array;
}


function my_round(any_number,decimal_p)
{
	var multiplier=1;
	for(var i=0;i<decimal_p;i++)
	{
		multiplier*=10;
	}
	var result=(Math.round(any_number*multiplier))/multiplier;
	return result;
}

function array_unique(array)
{
    return array.filter(function(el,index,arr)
    {
        return index===arr.indexOf(el);
    });
}

function my_datalist_change(element,func)
{
	$(element).off('keyup');
	$(element).on('keyup', function()
	{
		var list_id=element.getAttribute('list');
    	var options = $('#'+list_id)[0].options;
    	for (var i=0;i<options.length;i++)
    	{
	       	if (options[i].value == $(this).val()) 
    	    {
    	    	func();
    	    	break;
    	    }
    	}
	});
}


function like_feed(feed_id,element)
{
	var like_xml="<feed_likes>"+
				"<id>"+get_new_key()+"</id>"+	
				"<feed_id exact='yes'>"+feed_id+"</feed_id>"+
				"<person exact='yes'>"+get_account_name()+"</person>"+
				"<last_updated>"+get_my_time()+"</last_updated>"+						
				"</feed_likes>";
	create_simple(like_xml);
	$(element).attr('src','../images/thumbs_up.png');
	$(element).attr('title','Unlike this post');
	$(element).attr("onclick",'');
	$(element).off('click');	
	$(element).on('click',function()
	{
		dislike_feed(feed_id,element);
	});
	var likes_count=parseInt($('#form150_likes_count_'+feed_id).html());
	$('#form150_likes_count_'+feed_id).html(likes_count+1);
}

function dislike_feed(feed_id,element)
{
	var like_xml="<feed_likes>"+
				"<feed_id>"+feed_id+"</feed_id>"+
				"<person>"+get_account_name()+"</person>"+	
				"</feed_likes>";
	delete_simple(like_xml);
	
	$(element).attr('src','../images/thumbs_up_line.png');
	$(element).attr('title','Like this post');
	$(element).attr("onclick",'');
	$(element).off('click');	
	$(element).on('click',function()
	{
		like_feed(feed_id,element);
	});
	var likes_count=parseInt($('#form150_likes_count_'+feed_id).html());
	$('#form150_likes_count_'+feed_id).html(likes_count-1);
}

function create_feed_comment(feed_id,element)
{
	var comment_text=element.value;
	var account_name=get_account_name();
	var data_id=get_new_key();
	var comment_xml="<feed_comments>"+
				"<id>"+data_id+"</id>"+	
				"<feed_id exact='yes'>"+feed_id+"</feed_id>"+
				"<person exact='yes'>"+account_name+"</person>"+
				"<comment_text>"+comment_text+"</comment_text>"+
				"<last_updated>"+get_my_time()+"</last_updated>"+						
				"</feed_comments>";
	create_simple(comment_xml);
	
	var comments_content="<label>"+account_name+": "+comment_text;
	comments_content+=" <a class='small_cross_icon' onclick=\"delete_feed_comment('"+data_id+"',$(this));\" title='Delete comment'>&#10006;</a>";
	comments_content+="</label><br>";
	comments_content+="<label>"+account_name+": <textarea class='feed_comments' placeholder='comment..'></textarea></label>";
	$(element).parent().parent().append(comments_content);
	//$('#form150_comments_'+feed_id).append(comments_content);
	$(element).parent().parent().find('label').find('textarea').on('keyup',function(e)
	{
		if (e.keyCode==13) 
		{
			create_feed_comment(feed_id,this);
		}
	});
	$(element).parent().remove();
}


function delete_feed_comment(comment_id,element)
{
	var comment_xml="<feed_comments>"+
					"<id>"+comment_id+"</id>"+
					"</feed_comments>";
	delete_simple(comment_xml);
	$(element).parent().remove();
}

function delete_feed(feed_id,element)
{
	var feed_xml="<feeds>"+
					"<id>"+feed_id+"</id>"+
					"</feeds>";
	var like_xml="<feed_likes>"+
					"<feed_id>"+feed_id+"</feed_id>"+
					"</feed_likes>";
	var comment_xml="<feed_comments>"+
					"<feed_id>"+feed_id+"</feed_id>"+
					"</feed_comments>";
	delete_simple(feed_xml);
	delete_simple(like_xml);
	delete_simple(comment_xml);
	$(element).parent().parent().remove();
}

function htmlentities(str)
{
    return String(str).replace(/&/g,'&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function revert_htmlentities(str)
{
    return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}


function get_all_child_storage(store_area,area_array)
{
	var child_data="<store_areas>"+
					"<name></name>"+
					"<parent exact='yes'>"+store_area+"</parent>" +
					"</store_areas>";
	storage_count_tracker+=1;				
	fetch_requested_data('',child_data,function(children)
	{
		if(children.length>0)
		{
			children.forEach(function(child)
			{
				area_array.push(child.name);
				//console.log(storage_count_tracker);
				get_all_child_storage(child.name,area_array);
			});
		}
		storage_count_tracker-=1;
		//console.log(storage_count_tracker);		
	});
}

function get_available_batch(item_name,batch_array,min_quantity,result_array,success_func)
{
	if(batch_array.length>0)
	{
		get_inventory(item_name,batch_array[0],function(inventory)
		{	
			if(parseFloat(inventory)>0)
			{	
				if(parseFloat(inventory)>=parseFloat(min_quantity))
				{
					var result_item=new Object();
					result_item.batch=batch_array[0];
					result_item.quantity=min_quantity;
					result_array.push(result_item);
					success_func();	
				}
				else 
				{
					var result_item=new Object();
					result_item.batch=batch_array[0];
					result_item.quantity=inventory;
					result_array.push(result_item);
					min_quantity=parseFloat(min_quantity)-parseFloat(inventory);
					batch_array.splice(0,1);
					get_available_batch(item_name,batch_array,min_quantity,result_array,success_func);
				}
			}
			else
			{
				batch_array.splice(0,1);
				get_available_batch(item_name,batch_array,min_quantity,result_array,success_func);
			}
		});
	}
	else 
	{
		success_func();
	}
}

function get_available_storage(item_name,batch,storage_array,min_quantity,result_array,success_func)
{
	if(storage_array.length>0)
	{
		get_store_inventory(storage_array[0],item_name,batch,function(inventory)
		{	
			if(parseFloat(inventory)>0)
			{	
				if(parseFloat(inventory)>=parseFloat(min_quantity))
				{
					var result_item=new Object();
					result_item.storage=storage_array[0];
					result_item.quantity=min_quantity;
					result_array.push(result_item);
					success_func();	
				}
				else 
				{
					var result_item=new Object();
					result_item.storage=storage_array[0];
					result_item.quantity=inventory;
					result_array.push(result_item);
					min_quantity=parseFloat(min_quantity)-parseFloat(inventory);
					storage_array.splice(0,1);
					get_available_storage(item_name,batch,storage_array,min_quantity,result_array,success_func);
				}
			}
			else
			{
				storage_array.splice(0,1);
				get_available_storage(item_name,batch,storage_array,min_quantity,result_array,success_func);
			}
		});
	}
	else 
	{
		success_func();
	}
}

function array_2d_1d(array, col_name)
{
	var column = [];
	for(var i=0; i<array.length; i++)
	{
		column.push(array[i][col_name]);
	}
	return column;
}