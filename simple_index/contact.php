<?php
	include "includes/index_header.php";
?>
		
	    <!---/start-contact----->
	    <div class="contact" id="contact">
	      	<div class="container">
	      		  <h3>CONTACT</h3>
      			  <div class="gallery-head text-center">
	       			  <p><b>Email: info@vyavsaay.com <br> Phone: +91-9818005232</b></p>
       			  </div>
				  
      			  <div class="contact-form">
		  	        <form id='index_contact'>
			    	    <p class="comment-form-author"><label>Name</label>
			    	    	<input type="text" name='userName' required class="textbox" placeholder="Enter your name...">
				    	</p>
				        <p class="comment-form-author"><label>Email</label>
				     	   <input type="email" name='userEmail' class="textbox" placeholder="Enter your email...">
				        </p>
				        <p class="comment-form-author"><label>Phone</label>
				     	   <input type="tel" name='userPhone' class="textbox" placeholder="Enter your email...">
				        </p>
				        <p class="comment-form-author"><label>Message</label>
				    	  <textarea name='userMsg' placeholder='Enter your message...'></textarea>
				        </p>
				        <input type="submit" value="Submit">
			        </form>
		          </div>
		          <div class="Demo-text"><p id="contact_complete"></p></div>
	      	</div>
		</div>

		<script>
			$('#index_contact').on('submit',function(event)
			{
				event.preventDefault();
				contact_click();
			});

			function contact_click()
			{
				var form=document.getElementById('index_contact');

				var username=form.elements[0].value;
				var email=form.elements[1].value;
				var phone=form.elements[2].value;
				var message=form.elements[3].value;
				
				show_loader();
				var post_data="userName="+username+
								"&userEmail="+email+
								"&userPhone="+phone+
								"&userMsg="+message;

				ajax_with_custom_func("./ajax/contact.php",post_data,function(e)
				{
					$("#index_contact").slideUp();
					document.getElementById("contact_complete").innerHTML="Thanks for contacting Vyavsaay. We will reach out to you very soon.";
					//window.location.assign("index.php#contact");	
					hide_loader();
				});
			}
						
		</script>
	</body>
</html>