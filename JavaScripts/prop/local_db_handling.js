/**
 * xml attributes for read queries
 * comapre: more than,less than, not equal, equal
 * array: yes
 * exact: yes
 * sort: asc,desc
 * count: <integer>
 * start_index: <integer>
 */

/**
 * This function creates a new table in the local database
 * @param db_name name of the local database
 * @param func function to be executed on success
 */
function create_local_db(domain,func)
{
	//console.log("2.1");
	if("indexedDB" in window)
	{
		//console.log("2.2");
		var db_name="re_local_"+domain;
		//console.log("creating local db "+db_name);
		ajax_with_custom_func("./db/db_schema.xml","",function(e)
		{
			//console.log("2.3");
			var request = indexedDB.open(db_name,2);
		
			request.onsuccess=function(e)
			{
				//console.log("2.4");
				db=e.target.result;
				db.close();
				func();
			};
			
			request.onerror=function(ev)
			{
				alert('Could not switch to offline mode. Please refresh your browser and try again.');
			};
				
			request.onupgradeneeded=function(ev)
			{
				//console.log("2.6");
				db=ev.target.result;
				var tables=e.responseXML.childNodes[0].childNodes;
				
				for(var k=0;k<tables.length;k++)
				{
					if(tables[k].nodeName!="" && tables[k].nodeName!="#text" && tables[k].nodeName!="#comment")
					{	
						table=db.createObjectStore(tables[k].nodeName,{keyPath:'id'});
					
						for(var i=0;i<tables[k].childNodes.length;i++)
						{	
							if(tables[k].childNodes[i].nodeName!="" && tables[k].childNodes[i].nodeName!="#text" && tables[k].childNodes[i].nodeName!="#comment")
							{	
								//console.log(tables[k].childNodes[i].nodeName);
								var indexing=tables[k].childNodes[i].getAttribute('index');
								if(indexing=='yes')
								{
									table.createIndex(tables[k].childNodes[i].nodeName,tables[k].childNodes[i].nodeName);
								}
							}		
						}
					}
				}			
			};
		});
	}
	else
	{
		alert('Offline mode is not supported in your browser. Please update your browser.');
	}
};

/**
 * This func sets a global variable to an instance of local db
 * @param func
 * @returns
 */
function open_local_db(func)
{
	var db_name="re_local_"+get_domain();
	var request = indexedDB.open(db_name);
	request.onsuccess=function(e)
	{
		static_local_db=e.target.result;
		func();
	};
	request.onerror=function(e)
	{
		console.log(this.error);
	};
};


function delete_local_db()
{
	$("#modal52").dialog(
	{
		close:function(e,ui)
		{
			delete_session();
		}
	});
	if("indexedDB" in window)
	{
		var db_name="re_local_"+get_domain();

		console.log('deleting db');
		
		if(typeof static_local_db!='undefined')
		{
			static_local_db.close();
		}
		
		var deleterequest=indexedDB.deleteDatabase(db_name);
		deleterequest.onsuccess=function(ev)
		{
			$("#modal52").dialog("open");
		};
		
		deleterequest.onerror=function(ev)
		{
			alert('Could not delete local storage. Please refresh your browser and try again.');
		};
		
		deleterequest.onblocked=function(ev)
		{
			alert('Could not delete local storage. Please refresh your browser and try again.');
		};
	}
	else
	{
		$("#modal52").dialog("open");
	}
}

/**
 * This function executes a simple read access on local database
 * @param table table name that is to be accessed
 * @param column name of the column to be referenced
 * @param results data to be passed on to the callback function
 * @param callback function to be executed on successful access
 */
function local_read_single_column(columns,callback,results)
{
	//console.log(columns);
	var parser=new DOMParser();
	var data=parser.parseFromString(columns,"text/xml");
	var table=data.childNodes[0].nodeName;
	var cols=data.childNodes[0].childNodes;
	var count=0;
	if(data.childNodes[0].hasAttribute('count'))
	{
		count=parseInt(data.childNodes[0].getAttribute('count'));
	}
	var sort_index='last_updated';
	var sort_order='desc';
	var filter=new Array();
	for(var j=0; j<cols.length;j++)
	{
		if(cols[j].innerHTML!=null && cols[j].hasAttribute('sort'))
		{
			sort_index=cols[j].nodeName;
			sort_order=cols[j].getAttribute('sort');
		}
		
		if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
		{
			var fil=new Object();
			fil.name=cols[j].nodeName;
			if(cols[j].hasAttribute('compare'))
			{
				fil.value=parseInt(cols[j].innerHTML);
				fil.type=cols[j].getAttribute('compare');
			}
			else if(cols[j].hasAttribute('array'))
			{
				fil.value=cols[j].innerHTML;
				fil.type='array';
			}
			else if(cols[j].hasAttribute('exact'))
			{
				fil.value=cols[j].innerHTML;
				fil.type='exact';
			}
			else
			{
				fil.value=cols[j].innerHTML;
				fil.type='';
			}
			filter.push(fil);
		}
	}
	//console.log(filter);
	
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_read_single_column(columns,callback,results);
		});
	}
	else
	{
		localdb_open_requests+=1;

		if(sort_order=='asc')
		{
			sort_order='next';
		}
		else
		{
			sort_order='prev';
		}

		static_local_db.transaction([table],"readonly").objectStore(table).index(sort_index).openCursor(null,sort_order).onsuccess=function(e)
		{
			var result=e.target.result;
			if(result)
			{
				var record=result.value;
				var match=true;
				for(var i=0;i<filter.length;i++)
				{
					var string=record[filter[i].name].toString().toLowerCase();
					var search=filter[i].value.toString().toLowerCase();
					var found=0;
					
					if(filter[i].type=='')
					{
						found=string.search(search);
					}
					else if(filter[i].type=='exact')
					{
						if(search!==string)
						{
							match=false;
							break;
						}
					}
					else if(filter[i].type=='array')
					{
						found=search.search("-"+string+"-");
					}
					if(filter[i].type=='less than') 
					{
						if(parseInt(record[filter[i].name])>=filter[i].value)
						{
							match=false;
							break;
						}
					}
					else if(filter[i].type=='more than') 
					{
						if(parseInt(record[filter[i].name])<=filter[i].value)
						{
							match=false;
							break;
						}
					}
					else if(filter[i].type=='equal') 
					{
						if(parseInt(record[filter[i].name])!=filter[i].value)
						{
							match=false;
							break;
						}
					}
					else if(filter[i].type=='not equal') 
					{
						if(parseInt(record[filter[i].name])==filter[i].value)
						{
							match=false;
							break;
						}
					}

					if(found===-1)
					{
						match=false;
						break;
					}
				}
				
				if(match===true)
				{
					results.push(record[cols[0].nodeName]);
					if(results.length!=count)
					{
						result.continue();
					}
					else
					{
						localdb_open_requests-=1;
						callback(results);
					}
				}
				else
				{
					result.continue();
				}
			}
			else
			{
				localdb_open_requests-=1;
				callback(results);
			}
		};
	}
};


function local_read_multi_column(columns,callback,results)
{
	var parser=new DOMParser();
	var data=parser.parseFromString(columns,"text/xml");
	var table=data.childNodes[0].nodeName;
	var cols=data.childNodes[0].childNodes;
	var count=0;
	var start_index=0;
	if(data.childNodes[0].hasAttribute('count'))
	{
		count=parseInt(data.childNodes[0].getAttribute('count'));
	}
	if(data.childNodes[0].hasAttribute('start_index'))
	{
		start_index=parseInt(data.childNodes[0].getAttribute('start_index'));
	}
	var filter=new Array();
	var sort_index='last_updated';
	var sort_order='desc';
	
	for(var j=0;j<cols.length;j++)
	{
		if(cols[j].innerHTML!=null && cols[j].hasAttribute('sort'))
		{
			sort_index=cols[j].nodeName;
			sort_order=cols[j].getAttribute('sort');
		}
		
		if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
		{
			var fil=new Object();
			fil.name=cols[j].nodeName;
			
			if(cols[j].hasAttribute('compare'))
			{
				fil.value=parseInt(cols[j].innerHTML);
				fil.type=cols[j].getAttribute('compare');
			}
			else if(cols[j].hasAttribute('array'))
			{
				fil.value=cols[j].innerHTML;
				fil.type='array';
			}
			else if(cols[j].hasAttribute('exact'))
			{
				fil.value=cols[j].innerHTML;
				fil.type='exact';
			}
			else
			{
				fil.value=cols[j].innerHTML;
				fil.type='';
			}
			filter.push(fil);
		}
	}
	
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_read_multi_column(columns,callback,results)
		});
	}
	else
	{
		localdb_open_requests+=1;
		
		if(sort_order=='asc')
		{
			sort_order='next';
		}
		else
		{
			sort_order='prev';
		}
		
		static_local_db.transaction([table],"readonly").objectStore(table).index(sort_index).openCursor(null,sort_order).onsuccess=function(e)
		{
			var result=e.target.result;
			if(result)
			{
				var record=result.value;
				var match=true;
				for(var i=0;i<filter.length;i++)
				{
					var string=record[filter[i].name].toString().toLowerCase();
					var search=filter[i].value.toString().toLowerCase();
					var found=0;
					
					if(filter[i].type=='')
					{
						found=string.search(search);
					}
					else if(filter[i].type=='exact')
					{
						if(search!==string)
						{
							match=false;
							break;
						}
					}
					else if(filter[i].type=='array')
					{
						found=search.search("-"+string+"-");
					}
					if(filter[i].type=='less than') 
					{
						if(parseInt(record[filter[i].name])>=filter[i].value)
						{
							match=false;
							break;
						}
					}
					else if(filter[i].type=='more than') 
					{
						if(parseFloat(record[filter[i].name])<=parseFloat(filter[i].value))
						{
							match=false;
							break;
						}
					}
					else if(filter[i].type=='equal') 
					{
						if(parseFloat(record[filter[i].name])!=parseFloat(filter[i].value))
						{
							match=false;
							break;
						}
					}
					else if(filter[i].type=='not equal') 
					{
						if(parseFloat(record[filter[i].name])==parseFloat(filter[i].value))
						{
							match=false;
							break;
						}
					}

					if(found===-1)
					{
						match=false;
						break;
					}
				}
				
				if(match===true)
				{
					if(start_index==0)
					{
						results.push(record);
					}
					else
					{					
						start_index-=1;
					}
					
					if(results.length===count)
					{
						localdb_open_requests-=1;
						callback(results);
					}
					else
					{
						result.continue();
					}
				}
				else
				{
					result.continue();
				}
			}
			else
			{
				localdb_open_requests-=1;
				callback(results);
			}
		};		
	}
};


/**
 * this function updated a row of record in local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_update_row(data_xml,activity_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_update_row(data_xml,activity_xml);
		});
	}
	else
	{
		localdb_open_requests+=1;
		
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
		var cols=data.childNodes[0].childNodes;
	
		var activity=parser.parseFromString(activity_xml,"text/xml");
		var activity_data=activity.childNodes[0].childNodes;

		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		var req=objectStore.get(data_id);
		req.onsuccess=function(e)
		{
			var data_record=req.result;
			if(data_record)
			{
				for(var j=0;j<cols.length;j++)
				{
					data_record[cols[j].nodeName]=cols[j].innerHTML;
				}
				var put_req=objectStore.put(data_record);
				put_req.onsuccess=function(e)
				{
					var id=get_new_key();
					var act_row={id:id,
							type:'update',
							status:'unsynced',
							data_xml:data_xml,
							user_display:'yes',
							last_updated:get_my_time()};

					for(var k=0;k<activity_data.length;k++)
					{
						act_row[activity_data[k].nodeName]=activity_data[k].innerHTML;
					}

					static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
					{
						localdb_open_requests-=1;
					};
				};
			}
		};
	}
}

/**
 * this function updates a row of record in local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_update_simple(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_update_simple(data_xml);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		//data_xml=data_xml.replace(/[\x{0009}\x{000a}\x{000d}\x{0020}\x{D7FF}\x{E000}\x{FFFD}]/g," ");
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
		var cols=data.childNodes[0].childNodes;
		
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		var req=objectStore.get(data_id);
		req.onsuccess=function(e)
		{
			var data_record=req.result;
			if(data_record)
			{
				for(var j=0;j<cols.length;j++)
				{
					data_record[cols[j].nodeName]=cols[j].innerHTML;
				}
				
				var put_req=objectStore.put(data_record);
				put_req.onsuccess=function(e)
				{
					var id=get_new_key();
					var act_row={id:id,
							type:'update',
							status:'unsynced',
							data_xml:data_xml,
							user_display:'no',
							data_id:data_record.id,
							tablename:table,
							link_to:'',
							last_updated:get_my_time()};
					
					static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
					{
						localdb_open_requests-=1;
					};
				};
			}
		};
	}
}


/**
 * this function updates multiple rows of record in local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_update_batch(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_update_batch(data_xml);
		});
	}
	else
	{
		show_loader();
		var parser=new DOMParser();
		var data_xml_array=data_xml.split("<separator></separator>");
		var table="";
		var rows=[];
		
		data_xml_array.forEach(function(data_chunk)
		{
			var data=parser.parseFromString(data_chunk,"text/xml");
			table=data.childNodes[0].nodeName;
			var rows_data=data.childNodes[0].childNodes;
			
			for(var x=0;x<rows_data.length;x++)
			{
				rows.push(rows_data[x]);
			}
		});
		
		//console.log(rows.length);
		
		var os1=static_local_db.transaction([table],"readwrite").objectStore(table);
		var os2=static_local_db.transaction(['activities'],"readwrite").objectStore('activities');
		
		var i=0;
		var j=0;
		
		function update_records()
		{
			if(i<rows.length)
			{
				//console.log("I"+i);
				var data_id=rows[i].getElementsByTagName('id')[0].innerHTML;
				var cols=rows[i].childNodes;
				localdb_open_requests+=1;
								
				var req=os1.get(data_id);
				req.onsuccess=function(e)
				{
					i++;
					localdb_open_requests-=1;
					
					var data_record=req.result;
					if(data_record)
					{
						for(var j=0;j<cols.length;j++)
						{
							data_record[cols[j].nodeName]=cols[j].innerHTML;
						}
						
						var put_req=os1.put(data_record);
						put_req.onsuccess=function(e)
						{
							update_records();
						};
					}
				};
				req.onerror=function(e)
				{
					i++;
					localdb_open_requests-=1;
					update_records();
				};
			}
		};
		
		var activity_id=parseFloat(get_new_key());
		function insert_activities()
		{
			if(j<rows.length)
			{
				//console.log("J"+j);
				var data_id=rows[j].getElementsByTagName('id')[0].innerHTML;
				localdb_open_requests+=1;
				
				var row_data_xml="<"+table+">"+rows[j].innerHTML+"</"+table+">";
				var act_row={id:(activity_id+j),
						type:'update',
						status:'unsynced',
						data_xml:row_data_xml,
						user_display:'no',
						data_id:data_id,
						tablename:table,
						link_to:'',
						last_updated:get_my_time()};
				
				os2.put(act_row).onsuccess=function(e)
				{
					j++;
					localdb_open_requests-=1;
					insert_activities();
				};
			}
		};
		
		update_records();
		insert_activities();
			
		var local_update_complete=setInterval(function()
		{
			console.log(localdb_open_requests);
		   if(localdb_open_requests===0)
		   {
			   clearInterval(local_update_complete);
			   hide_loader();
		   }
	    },2000);	
	}
}


/**
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_update_simple_func(data_xml,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_update_simple_func(data_xml,func);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
		var cols=data.childNodes[0].childNodes;
		
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		var req=objectStore.get(data_id);
		req.onsuccess=function(e)
		{
			var data_record=req.result;
			if(data_record)
			{
				for(var j=0;j<cols.length;j++)
				{
					data_record[cols[j].nodeName]=cols[j].innerHTML;
				}
				
				var put_req=objectStore.put(data_record);
				put_req.onsuccess=function(e)
				{
					var id=get_new_key();
					var act_row={id:id,
							type:'update',
							status:'unsynced',
							data_xml:data_xml,
							user_display:'no',
							data_id:data_record.id,
							tablename:table,
							link_to:'',
							last_updated:get_my_time()};
				
					static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
					{
						localdb_open_requests-=1;
						func();
					};
				};
			}
		};
	}
}


/**
 * this function save a row of record to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_row(data_xml,activity_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_row(data_xml,activity_xml);
		});
	}
	else
	{
		localdb_open_requests+=1;
		show_loader();
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
		var cols=data.childNodes[0].childNodes;
		
		var unique=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
			{
				if(cols[j].hasAttribute('unique'))
				{
					var fil=new Object();
					fil.name=cols[j].nodeName;
					fil.value=cols[j].innerHTML;
					unique.push(fil);
				}
			}
		}
		
		var activity=parser.parseFromString(activity_xml,"text/xml");
		var activity_data=activity.childNodes[0].childNodes;
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(unique.length===0)
		{
			//console.log("unique length is zero");
			var type='create';
			var data_row=new Object();
				
			for(var j=0;j<cols.length;j++)
			{
				data_row[cols[j].nodeName]=cols[j].innerHTML;
			}
			
			var put_req=objectStore.put(data_row);
			put_req.onsuccess=function(e)
			{
				var id=get_new_key();
				var act_row={id:id,
						type:'create',
						status:'unsynced',
						data_xml:data_xml,
						user_display:'yes',
						last_updated:get_my_time()};
				for(var k=0;k<activity_data.length;k++)
				{
					act_row[activity_data[k].nodeName]=activity_data[k].innerHTML;
				}
				static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
				{
					localdb_open_requests-=1;
					hide_loader();
				};
			};
		}
		else
		{
			var unique_rec=true;
			var type='create';
			var data_row=new Object();

			objectStore.openCursor().onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					var record=result.value;
				
					if(record.id==data_id)
					{
						unique_rec=false;
						localdb_open_requests-=1;
						$("#modal5").dialog("open");
					}
					else 
					{	
						for(var k in unique)
						{
							if(record[unique[k].name]==unique[k].value)
							{
								unique_rec=false;
								localdb_open_requests-=1;
								$("#modal5").dialog("open");
							}
							else
							{
								result.continue();
							}
						}
					}
				}
				else
				{
					for(var j=0;j<cols.length;j++)
					{
						data_row[cols[j].nodeName]=cols[j].innerHTML;
					}
					objectStore.put(data_row).onsuccess=function(e)
					{
						var id=get_new_key();
						var act_row={id:id,
								type:type,
								status:'unsynced',
								data_xml:data_xml,
								user_display:'yes',
								last_updated:get_my_time()};
						
						for(var k=0;k<activity_data.length;k++)
						{
							act_row[activity_data[k].nodeName]=activity_data[k].innerHTML;
						}
						static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
						{
							localdb_open_requests-=1;
							hide_loader();
						};
					};
				}
			};
		}
	}
}


/**
 * this function save a row of record to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_simple(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_simple(data_xml);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
		var cols=data.childNodes[0].childNodes;

		var unique=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
			{
				if(cols[j].hasAttribute('unique'))
				{
					var fil=new Object();
					fil.name=cols[j].nodeName;
					fil.value=cols[j].innerHTML;
					unique.push(fil);
				}
			}
		}
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(unique.length===0)
		{
			//console.log("unique length is zero");
			var data_row=new Object();
				
			for(var j=0;j<cols.length;j++)
			{
				data_row[cols[j].nodeName]=cols[j].innerHTML;
			}
			
			var put_req=objectStore.put(data_row);
			put_req.onsuccess=function(e)
			{
				var id=get_new_key();
				var act_row={id:id,
						type:'create',
						status:'unsynced',
						data_xml:data_xml,
						user_display:'no',
						data_id:data_row.id,
						tablename:table,
						link_to:'',
						last_updated:get_my_time()};
				static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
				{
					localdb_open_requests-=1;
					hide_loader();
				};
			};
		}
		else
		{
			//console.log("unique length is non-zero");
			var unique_rec=true;
			var type='create';
			var data_row=new Object();
			var key=IDBKeyRange.only(unique[k].value);
			objectStore.index(unique[0].name).openCursor(key).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					localdb_open_requests-=1;
					$("#modal5").dialog("open");
				}
				else
				{
					if(record.id==data_id)
					{
						unique_rec=false;
						localdb_open_requests-=1;
						$("#modal5").dialog("open");
					}
					else 
					{	
						for(var k in unique)
						{
							if(record[unique[k].name]==unique[k].value)
							{
								unique_rec=false;
								localdb_open_requests-=1;
								$("#modal5").dialog("open");
							}
						}
					}
					if(unique_rec)
					{
						for(var j=0;j<cols.length;j++)
						{
							data_row[cols[j].nodeName]=cols[j].innerHTML;
						}
						objectStore.put(data_row).onsuccess=function(e)
						{
							var id=get_new_key();
							var act_row={id:id,
									type:type,
									status:'unsynced',
									data_xml:data_xml,
									user_display:'no',
									data_id:data_row.id,
									tablename:table,
									link_to:'',
									last_updated:get_my_time()};
							static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								hide_loader();
							};
						};
					}
				}
			};
		}
	}
}


/**
 * this function saves multiple records to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_batch(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_batch(data_xml);
		});
	}
	else
	{
		show_loader();
		var parser=new DOMParser();
		var data_xml_array=data_xml.split("<separator></separator>");
		var rows=[];
		var table="";
		data_xml_array.forEach(function(data_chunk)
		{
			var data=parser.parseFromString(data_chunk,"text/xml");
			table=data.childNodes[0].nodeName;
			var rows_data=data.childNodes[0].childNodes;
			
			for(var x=0;x<rows_data.length;x++)
			{
				rows.push(rows_data[x]);
			}
		});
		
		var first_col=rows[0].childNodes;
		var unique=new Array();
		for(var j=0;j<first_col.length;j++)
		{
			if(first_col[j].innerHTML!=null && first_col[j].innerHTML!="")
			{
				if(first_col[j].hasAttribute('unique'))
				{
					var fil=new Object();
					fil.name=first_col[j].nodeName;
					fil.value=first_col[j].innerHTML;
					unique.push(fil);
				}
			}
		}
		
		var os1=static_local_db.transaction([table],"readwrite").objectStore(table);
		var os2=static_local_db.transaction(['activities'],"readwrite").objectStore('activities');
		
		var i=0;
		var m=0;
		
		function create_records()
		{
			if(i<rows.length)
			{
				var data_id=rows[i].getElementsByTagName('id')[0].innerHTML;
				var cols=rows[i].childNodes;
				
				var data_row=new Object();
				
				for(var j=0;j<cols.length;j++)
				{
					data_row[cols[j].nodeName]=cols[j].innerHTML;
				}

				localdb_open_requests+=1;
				os1.put(data_row).onsuccess=function(e)
				{
					i+=1;
					localdb_open_requests-=1;
					create_records();
				};
			}
		};

		var activity_id=parseFloat(get_new_key());
		function insert_activities()
		{
			if(m<rows.length)
			{
				var data_id=rows[m].getElementsByTagName('id')[0].innerHTML;
				localdb_open_requests+=1;
				
				var row_data_xml="<"+table+">"+rows[m].innerHTML+"</"+table+">";
				var act_row={id:(activity_id+m),
						type:'create',
						status:'unsynced',
						data_xml:row_data_xml,
						user_display:'no',
						data_id:data_id,
						tablename:table,
						link_to:'',
						last_updated:get_my_time()};
				
				os2.put(act_row).onsuccess=function(e)
				{
					m++;
					localdb_open_requests-=1;
					insert_activities();
				};
			}
		};
		
		create_records();
		insert_activities();

		var local_create_complete=setInterval(function()
		{
			console.log(localdb_open_requests);
		   if(localdb_open_requests===0)
		   {
			   clearInterval(local_create_complete);
			   hide_loader();
		   }
	    },2000);	
	}
}



function local_create_simple_func(data_xml,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_simple_func(data_xml,func);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
		var cols=data.childNodes[0].childNodes;

		var unique=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
			{
				if(cols[j].hasAttribute('unique'))
				{
					var fil=new Object();
					fil.name=cols[j].nodeName;
					fil.value=cols[j].innerHTML;
					unique.push(fil);
				}
			}
		}
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(unique.length===0)
		{
			//console.log("unique length is zero");
			var data_row=new Object();
				
			for(var j=0;j<cols.length;j++)
			{
				data_row[cols[j].nodeName]=cols[j].innerHTML;
			}
			
			var put_req=objectStore.put(data_row);
			put_req.onsuccess=function(e)
			{
				var id=get_new_key();
				var act_row={id:id,
						type:'create',
						status:'unsynced',
						data_xml:data_xml,
						user_display:'no',
						data_id:data_row.id,
						tablename:table,
						link_to:'',
						last_updated:get_my_time()};
				static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
				{
					localdb_open_requests-=1;
					func();
				};
			};
		}
		else
		{
			//console.log("unique length is non-zero");
			var unique_rec=true;
			var type='create';
			var data_row=new Object();

			objectStore.openCursor().onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					var record=result.value;
				
					if(record.id==data_id)
					{
						unique_rec=false;
						localdb_open_requests-=1;
						$("#modal5").dialog("open");
					}
					else 
					{	
						for(var k in unique)
						{
							if(record[unique[k].name]==unique[k].value)
							{
								unique_rec=false;
								localdb_open_requests-=1;
								$("#modal5").dialog("open");
							}
							else
							{
								result.continue();
							}
						}
					}
				}
				else
				{
					for(var j=0;j<cols.length;j++)
					{
						data_row[cols[j].nodeName]=cols[j].innerHTML;
					}
					objectStore.put(data_row).onsuccess=function(e)
					{
						var id=get_new_key();
						var act_row={id:id,
								type:type,
								status:'unsynced',
								data_xml:data_xml,
								user_display:'no',
								data_id:data_row.id,
								tablename:table,
								link_to:'',
								last_updated:get_my_time()};
						static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
						{
							localdb_open_requests-=1;
							func();
						};
					};
				}
			};
		}
	}
}



/**
 * this function save a row of record to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_simple_no_warning(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_simple_no_warning(data_xml);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
		var cols=data.childNodes[0].childNodes;

		var unique=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
			{
				if(cols[j].hasAttribute('unique'))
				{
					var fil=new Object();
					fil.name=cols[j].nodeName;
					fil.value=cols[j].innerHTML;
					unique.push(fil);
				}
			}
		}
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(unique.length===0)
		{
			//console.log("unique length is zero");
			var data_row=new Object();
				
			for(var j=0;j<cols.length;j++)
			{
				data_row[cols[j].nodeName]=cols[j].innerHTML;
			}
			
			var put_req=objectStore.put(data_row);
			put_req.onsuccess=function(e)
			{
				var id=get_new_key();
				var act_row={id:id,
						type:'create',
						status:'unsynced',
						data_xml:data_xml,
						user_display:'no',
						data_id:data_row.id,
						tablename:table,
						link_to:'',
						last_updated:get_my_time()};
				static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
				{
					localdb_open_requests-=1;
					hide_loader();
				};
			};
		}
		else
		{
			//console.log("unique length is non-zero");
			var unique_rec=true;
			var type='create';
			var data_row=new Object();

			objectStore.openCursor().onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					var record=result.value;
				
					if(record.id==data_id)
					{
						unique_rec=false;
						localdb_open_requests-=1;
					}
					else 
					{	
						for(var k in unique)
						{
							if(record[unique[k].name]==unique[k].value)
							{
								unique_rec=false;
								localdb_open_requests-=1;
							}
							else
							{
								result.continue();
							}
						}
					}
				}
				else
				{
					for(var j=0;j<cols.length;j++)
					{
						data_row[cols[j].nodeName]=cols[j].innerHTML;
					}
					objectStore.put(data_row).onsuccess=function(e)
					{
						var id=get_new_key();
						var act_row={id:id,
								type:type,
								status:'unsynced',
								data_xml:data_xml,
								user_display:'no',
								data_id:data_row.id,
								tablename:table,
								link_to:'',
								last_updated:get_my_time()};
						static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
						{
							localdb_open_requests-=1;
							hide_loader();
						};
					};
				}
			};
		}
	}
}



/**
 * 
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_delete_row(data_xml,activity_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_delete_row(data_xml,activity_xml);
		});
	}
	else
	{
		show_loader();
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		
		var activity=parser.parseFromString(activity_xml,"text/xml");
		var activity_data=activity.childNodes[0].childNodes;
		
		var cols=data.childNodes[0].childNodes;
		var filter=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
			{
				fil=new Object();
				fil.name=cols[j].nodeName;
				fil.value=cols[j].innerHTML;
				filter.push(fil);
			}
		}
	
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(filter[0].name=='id')
		{
			var get_req=objectStore.get(filter[0].value);
			get_req.onsuccess=function(e)
			{
				localdb_open_requests-=1;
				var data=get_req.result;
				if(data)
				{
					var match=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search=filter[i].value.toString().toLowerCase();
						if(string!=search)
						{
							match=false;
							break;
						}
					}
					if(match===true)
					{
						localdb_open_requests+=1;
						objectStore.delete(filter[0].value).onsuccess=function(e)
						{
							var id=get_new_key();
							var act_row={id:id,
									type:'delete',
									status:'unsynced',
									user_display:'yes',
									data_xml:data_xml,
									last_updated:get_my_time()};
							
							for(var k=0;k<activity_data.length;k++)
							{
								act_row[activity_data[k].nodeName]=activity_data[k].innerHTML;
							}
							
							static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
							};
						};
					}
				}
			};
		}
		else
		{
			var keyValue=IDBKeyRange.only(filter[0].value);
			var delete_ids_array=[];
			objectStore.index(filter[0].name).openCursor(keyValue).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					var data=result.value;
					
					var match=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search=filter[i].value.toString().toLowerCase();
						if(string!=search)
						{
							match=false;
							break;
						}
					}
					if(match===true)
					{
						delete_ids_array.push(data.id);
					}
					result.continue();
				}
				else
				{
					var i=0;
					var j=0;
					var os1=static_local_db.transaction([table],"readwrite").objectStore(table);
					var os2=static_local_db.transaction(['activities'],"readwrite").objectStore('activities');
					
					
					function delete_records()
					{
						//console.log('i '+i);
						if(i<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							os1.delete(delete_ids_array[i]).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								delete_records();
							};
							i++;
						}
					};

					var activity_id=parseFloat(get_new_key());
					function insert_activities()
					{
						if(j<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							var act_row={id:(activity_id+j),
									type:'delete',
									status:'unsynced',
									user_display:'yes',
									data_xml:data_xml,
									last_updated:get_my_time()};
							
							for(var k=0;k<activity_data.length;k++)
							{
								act_row[activity_data[k].nodeName]=activity_data[k].innerHTML;
							}
							act_row['data_id']=delete_ids_array[j];

							os2.put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								insert_activities();
							};
							j++;
						}
					};
					
					delete_records();
					insert_activities();
					
					localdb_open_requests-=1;
				}
			};
		}
		
		var local_delete_complete=setInterval(function()
		{
		   if(localdb_open_requests===0)
		   {
			   clearInterval(local_delete_complete);
     		   hide_loader();
		   }
        },2000);
	}
};

/**
 * @param data_xml
 * @returns
 */
function local_delete_simple(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_delete_simple(data_xml);
		});
	}
	else
	{
		show_loader();
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;

		var cols=data.childNodes[0].childNodes;
		var filter=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
			{
				fil=new Object();
				fil.name=cols[j].nodeName;
				fil.value=cols[j].innerHTML;
				filter.push(fil);
			}
		}
	
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(filter[0].name=='id')
		{
			var get_req=objectStore.get(filter[0].value);
			get_req.onsuccess=function(e)
			{
				localdb_open_requests-=1;
				var data=get_req.result;
				if(data)
				{
					var match=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search=filter[i].value.toString().toLowerCase();
						if(string!=search)
						{
							match=false;
							break;
						}
					}
					if(match===true)
					{
						localdb_open_requests+=1;
						objectStore.delete(filter[0].value).onsuccess=function(e)
						{
							var id=get_new_key();
							var act_row={id:id,
									type:'delete',
									data_id:data.id,
									data_xml:data_xml,
									tablename:table,
									status:'unsynced',
									user_display:'no',
									link_to:'',
									last_updated:get_my_time()};
							static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								hide_loader();
							};
						};
					}
				}
			};
		}
		else
		{
			var keyValue=IDBKeyRange.only(filter[0].value);
			var delete_ids_array=[];
			objectStore.index(filter[0].name).openCursor(keyValue).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					var data=result.value;
					
					var match=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search=filter[i].value.toString().toLowerCase();
						if(string!=search)
						{
							match=false;
							break;
						}
					}
					if(match===true)
					{
						delete_ids_array.push(data.id);
					}
					result.continue();
				}
				else
				{
					var i=0;
					var j=0;
					var os1=static_local_db.transaction([table],"readwrite").objectStore(table);
					var os2=static_local_db.transaction(['activities'],"readwrite").objectStore('activities');
					
					
					function delete_records()
					{
						//console.log('i '+i);
						if(i<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							os1.delete(delete_ids_array[i]).onsuccess=function(e)
							{
								i++;
								localdb_open_requests-=1;
								delete_records();
							};
							
						}
					};

					var activity_id=parseFloat(get_new_key());
					function insert_activities()
					{
						//console.log('j '+j);
						if(j<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							var act_row={id:(activity_id+j),
									type:'delete',
									data_id:delete_ids_array[j],
									data_xml:data_xml,
									tablename:table,
									status:'unsynced',
									user_display:'no',
									link_to:'',
									last_updated:get_my_time()};
							os2.put(act_row).onsuccess=function(e)
							{
								j++;
								localdb_open_requests-=1;
								insert_activities();
							};
						}
					};
					
					delete_records();
					insert_activities();
					localdb_open_requests-=1;
				}
			};
		}
		
		var local_delete_complete=setInterval(function()
		{
			//console.log(localdb_open_requests);
		   if(localdb_open_requests===0)
		   {
			   clearInterval(local_delete_complete);
     		   hide_loader();
		   }
        },500);
	}
};


/**
 * @param data_xml
 * @returns
 */
function local_delete_simple_func(data_xml,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_delete_simple_func(data_xml,func);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;

		var cols=data.childNodes[0].childNodes;
		var filter=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
			{
				fil=new Object();
				fil.name=cols[j].nodeName;
				fil.value=cols[j].innerHTML;
				filter.push(fil);
			}
		}
	
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(filter[0].name=='id')
		{
			var get_req=objectStore.get(filter[0].value);
			get_req.onsuccess=function(e)
			{
				localdb_open_requests-=1;
				var data=get_req.result;
				if(data)
				{
					var match=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search=filter[i].value.toString().toLowerCase();
						if(string!=search)
						{
							match=false;
							break;
						}
					}
					if(match===true)
					{
						localdb_open_requests+=1;
						objectStore.delete(filter[0].value).onsuccess=function(e)
						{
							var id=get_new_key();
							var act_row={id:id,
									type:'delete',
									data_id:data.id,
									data_xml:data_xml,
									tablename:table,
									status:'unsynced',
									user_display:'no',
									link_to:'',
									last_updated:get_my_time()};
							static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								func();
							};
						};
					}
				}
			};
		}
		else
		{
			var keyValue=IDBKeyRange.only(filter[0].value);
			var delete_ids_array=[];
			objectStore.index(filter[0].name).openCursor(keyValue).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					var data=result.value;
					
					var match=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search=filter[i].value.toString().toLowerCase();
						if(string!=search)
						{
							match=false;
							break;
						}
					}
					if(match===true)
					{
						delete_ids_array.push(data.id);
					}
					result.continue();
				}
				else
				{
					var i=0;
					var j=0;
					var os1=static_local_db.transaction([table],"readwrite").objectStore(table);
					var os2=static_local_db.transaction(['activities'],"readwrite").objectStore('activities');
					
					
					function delete_records()
					{
						//console.log('i '+i);
						if(i<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							os1.delete(delete_ids_array[i]).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								delete_records();
							};
							i++;
						}
					};

					var activity_id=parseFloat(get_new_key());
					function insert_activities()
					{
						//console.log('j '+j);
						if(j<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							var act_row={id:(activity_id+j),
									type:'delete',
									data_id:delete_ids_array[j],
									data_xml:data_xml,
									tablename:table,
									status:'unsynced',
									user_display:'no',
									link_to:'',
									last_updated:get_my_time()};
							os2.put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								insert_activities();
							};
							j++;
						}
					};
					
					delete_records();
					insert_activities();
					
					localdb_open_requests-=1;
				}
			};
		}
		
		var local_delete_complete=setInterval(function()
		{
		   if(localdb_open_requests===0)
		   {
			   clearInterval(local_delete_complete);
			   func();
		   }
        },2000);
	}
};

/**
 * This function calculates the current inventory levels for a product
 * @param product
 * @param batch
 * @param callback
 * @returns
 */
function local_get_inventory(product,batch,callback)
{
	//console.log(filter);
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_get_inventory(product,batch,callback)
		});
	}
	else
	{
		var sort_order='prev';
		var result=0;
		var transaction=static_local_db.transaction(['bill_items','supplier_bill_items','supplier_return_items','inventory_adjust','customer_return_items','discarded'],"readonly");
		
		var keyValue=IDBKeyRange.only(product);
		
		transaction.objectStore('bill_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
		{
			var bi_result=e.target.result;
			if(bi_result)
			{
				var bi_record=bi_result.value;
				if(bi_record['batch']==batch || batch==='' || batch===null)
				{
					result-=parseFloat(bi_record['quantity']);
				}
				bi_result.continue();
			}
			else
			{
				transaction.objectStore('supplier_bill_items').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
				{
					var si_result=e.target.result;
					if(si_result)
					{
						var si_record=si_result.value;
						if(si_record['batch']==batch || batch==='' || batch===null)
						{
							result+=parseFloat(si_record['quantity']);
						}
						si_result.continue();
					}
					else
					{
						transaction.objectStore('supplier_return_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
						{
							var sr_result=e.target.result;
							if(sr_result)
							{
								var sr_record=sr_result.value;
								if(sr_record['batch']==batch || batch==='' || batch===null)
								{
									result-=parseFloat(sr_record['quantity']);
								}
								sr_result.continue();
							}
							else
							{
								transaction.objectStore('inventory_adjust').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
								{
									var ia_result=e.target.result;
									if(ia_result)
									{
										var ia_record=ia_result.value;
										if(ia_record['batch']==batch || batch==='' || batch===null)
										{
											result+=parseFloat(ia_record['quantity']);
										}
										ia_result.continue();
									}
									else
									{
										transaction.objectStore('customer_return_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
										{
											var cr_result=e.target.result;
											if(cr_result)
											{
												var cr_record=cr_result.value;
												if(cr_record['batch']==batch || batch==='' || batch===null)
												{
													result+=parseFloat(cr_record['quantity']);
												}
												if(cr_record['exchange_batch']==batch || batch==='' || batch===null)
												{
													result-=parseFloat(cr_record['quantity']);
												}
												cr_result.continue();
											}
											else
											{
												transaction.objectStore('discarded').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
												{
													var di_result=e.target.result;
													if(di_result)
													{
														var di_record=di_result.value;
														if(di_record['batch']==batch || batch==='' || batch===null)
														{
															result-=parseFloat(di_record['quantity']);
														}
														di_result.continue();
													}
													else
													{
														callback(result);
													}
												};
											}
										};
									}
								};
							}
						};
					}
				};			
			}
		};		
	}
}