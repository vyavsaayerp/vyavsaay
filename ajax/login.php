<?php
session_start();

include_once "../Classes/db.php";
use RetailingEssentials\db_connect;


	$status="failed_auth";
	$domain=$_POST['domain'];
	$pass=$_POST['pass'];
	$user=$_POST['user'];
	
	try 
	{
		$conn=new db_connect("re_user_".$domain);
		$stmt=$conn->conn->prepare("select password from user_profiles where username=?");
		$stmt->execute(array($user));
		
		//echo "this is domainname: $domain and password: $pass";
		
		if(!$stmt || $stmt->rowCount()!=1)
		{
			$status="failed_auth";
		}
		else
		{
			$row=$stmt->fetch(PDO::FETCH_ASSOC);
			$pass_hash=$row['password'];
			if(!password_verify($pass,$pass_hash))
			{
				$status="failed_auth";
			}
			else	
			{
				$status="successful";
			
				$_SESSION['session']='yes';
				$_SESSION['domain']=$domain;
				$_SESSION['username']=$user;
				//comment this line if errors with session
				//session_write_close();
				
				$session_var="<session>";
				
				$stmt=$conn->conn->query("select name,value from user_preferences");
				while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
				{
					$session_var.="<".$row['name'].">";
					$session_var.=$row['value'];
					$session_var.="</".$row['name'].">";
				}
				
				/////////setting access control session variables
				$read_access="";
				$stmt1=$conn->conn->prepare("select element_id from access_control where username=? and re=? and status=?");
				$stmt1->execute(array($user,'checked','active'));
				while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
				{
					$read_access.=$row['element_id']."-";
				}
				$session_var.="<re>";
				$session_var.=$read_access;
				$session_var.="</re>";
				
				$create_access="";
				$stmt1=$conn->conn->prepare("select element_id from access_control where username=? and cr=? and status=?");
				$stmt1->execute(array($user,'checked','active'));
				while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
				{
					$create_access.=$row['element_id']."-";
				}
				$session_var.="<cr>";
				$session_var.=$create_access;
				$session_var.="</cr>";
				
				$update_access="";
				$stmt1=$conn->conn->prepare("select element_id from access_control where username=? and up=? and status=?");
				$stmt1->execute(array($user,'checked','active'));
				while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
				{
					$update_access.=$row['element_id']."-";
				}
				$session_var.="<up>";
				$session_var.=$update_access;
				$session_var.="</up>";
				
				$del_access="";
				$stmt1=$conn->conn->prepare("select element_id from access_control where username=? and del=? and status=?");
				$stmt1->execute(array($user,'checked','active'));
				while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
				{
					$del_access.=$row['element_id']."-";
				}
				$session_var.="<del>";
				$session_var.=$del_access;
				$session_var.="</del>";
				
				$_SESSION['re']=$read_access;
				$_SESSION['cr']=$create_access;
				$_SESSION['up']=$update_access;
				$_SESSION['del']=$del_access;
				
				//////setting username and name
				$stmt2=$conn->conn->prepare("select name from user_profiles where username=?");
				$stmt2->execute(array($user));
				$row2=$stmt2->fetch(PDO::FETCH_ASSOC);
				$session_var.="<username>";
				$session_var.=$user;
				$session_var.="</username>";
				$session_var.="<name>";
				$session_var.=$row2['name'];
				$session_var.="</name>";

				$session_var.="</session>";
				$status=$session_var;	
			}
		}
	}
	catch(PDOException $ex)
	{
		$status="failed_auth";
	}
	header ("Content-Type:text/xml");
	echo $status;

?>