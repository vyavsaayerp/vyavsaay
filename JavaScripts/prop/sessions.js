/**
 * this function initiates the session by using local storage
 * @param username
 */
function ini_session(domain,user)
{
	sessionStorage.setItem('domain',domain);
	sessionStorage.setItem('session','yes');
	sessionStorage.setItem('username',user);
}

/**
 * 
 * @param username
 * @param session_data
 */
function set_session(session_data)
{
	for(var field in session_data)
	{
		sessionStorage.setItem(field,session_data[field]);
	}
	window.location.assign("main.php");	
}

/**
 * 
 * @returns {Boolean}
 */
function is_online()
{
	var offline=sessionStorage.getItem('offline');
	if(offline=="online")
		return true;
	else
		return false;
}

/**
 * 
 * @returns {Boolean}
 */
function is_set_stocks()
{
	var stocks=sessionStorage.getItem('stocks');
	if(stocks=='yes')
		return true;
	else
		return false;
}


/**
 * 
 * @returns {Boolean}
 */
function is_set_tasks()
{
	var tasks=sessionStorage.getItem('tasks');
	if(tasks=='yes')
		return true;
	else
		return false;
}

/**
 * 
 * @returns {Boolean}
 */
function is_set_accounts()
{
	var accounts=sessionStorage.getItem('accounts');
	if(accounts=='yes')
		return true;
	else
		return false;
}

/**
 * 
 * @returns {Boolean}
 */
function is_set_customers()
{
	var customers=sessionStorage.getItem('customers');
	if(customers=='yes')
		return true;
	else
		return false;
}

/**
 * 
 * @returns {Boolean}
 */
function is_set_bills()
{
	var bills=sessionStorage.getItem('bills');
	if(bills=='yes')
		return true;
	else
		return false;
}

/**
 * 
 * @param ses_var
 * @returns
 */
function get_session_var(ses_var)
{
	var value=sessionStorage.getItem(ses_var);
	return value;
}

/**
 * this function returns the domain for the current session
 * @returns
 */
function get_domain()
{
	var domain=sessionStorage.getItem('domain');
	return domain;
}


/**
 * this function returns the username for the current session
 * @returns
 */
function get_username()
{
	var username=sessionStorage.getItem('username');
	return username;
}

/**
 * this function returns the name for the current session
 * @returns
 */
function get_name()
{
	var name=sessionStorage.getItem('name');
	return name;
}


/**
 * 
 * @returns {Boolean}
 */
function is_set_session()
{
	var sess=sessionStorage.getItem('session');
	if(sess=='yes')
		return true;
	else
		return false;
}

/**
 * 
 * @returns {String}
 */
function get_theme()
{
	var theme=sessionStorage.getItem('theme');
	if(theme==null)
	{
		theme="theme1";
	}
	var css="./CSS/"+theme+".css";
	return css;
}

/**
 * 
 */
function delete_session()
{
	sessionStorage.removeItem('session');
	sessionStorage.removeItem('domain');
	sessionStorage.removeItem('username');
	sessionStorage.clear();
	window.location.assign("logout.php");
}

function get_pamphlet_template()
{
	var template=sessionStorage.getItem('pamphlet');
	return template;
}

function is_read_access(form_id)
{
//	console.log('checking read access for '+form_id);
	var re=sessionStorage.getItem('re');
	var found=re.search(form_id+"-");
	if(found===-1)
	{
		return false;
	}
	else
		return true;
}

function is_create_access(form_id)
{
	var re=sessionStorage.getItem('cr');
	var found=re.search(form_id+"-");
	if(found===-1)
	{
		return false;
	}
	else
		return true;
}

function is_update_access(form_id)
{
	var re=sessionStorage.getItem('up');
	var found=re.search(form_id+"-");
	if(found===-1)
	{
		return false;
	}
	else
		return true;
}

function is_delete_access(form_id)
{
	var re=sessionStorage.getItem('del');
	var found=re.search(form_id+"-");
	if(found===-1)
	{
		return false;
	}
	else
		return true;
}