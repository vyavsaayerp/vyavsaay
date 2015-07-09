<div class='modal_forms'>
	<div id="modal1" title="Please type your password again">
		<form>
			<input type="password" id="modal1_pass" required>
			<input type="submit" class='modal_submit' tabindex="-1" style="position:absolute; top:-1000px">
		</form>
	</div>
	
	<div id="modal2" title="Access denied">
		You don't have permissions to perform this operation.
		To allow this operation, ask your administrator to update your access control.
	</div>
	
	<div id="modal3" title="Saved">
		Saved Successfully!
	</div>
	
	<div id="modal4" title="Deleted">
		Deleted successfully!
	</div>
	
	<div id="modal5" title="Duplicate Entry">
		This operation will result in a duplicate entry. Operation aborted.
		Please validate whether the required record already exists or try again with different parameters (e.g. different name).
	</div>

	<div id="modal6" title="Get online">
		This operation can be performed in online mode only. Please make sure you are connected to internet and change to online mode.
	</div>
	
	<div id="modal7" title="Offer finished">
		Offer will not be applicable on this purchase as the offered product is out of stock.
	</div>
	
	<div id="modal8" title="Add new Offer">
		<form id='modal8_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>End Date: <input type='text'></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Product name: <input type="text"></label><br>
				<label>Batch: <input type="text"></label>
				<label><input type='checkbox'>Select All batches</label><br>
				<label>Service: <input type="text"></label><br>
				<label>Applicability Criteria: <input type="text" required></label><br>
				<label>Criteria Amount: Rs. <input type="number"></label><br>
				<label>Criteria Quantity: <input type="number"></label><br>
				<label>Incentive: <input type="text" required></label><br>
				<label>%: <input type="number"></label>
				<label>Rs: <input type="number"></label><br>
				<label>%: <input type="number"></label>
				<label>Quantity: <input type="number"></label><br>
				<label>Free product name: <input type="text"></label><br>
				<label>Free product quantity: <input type="number"></label><br>			
				<label>Free service name: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal9" title="Add document">
		<form id='modal9_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type="text" required></label><br>
				<label>Document Name: <input type="text"></label><br>
				<label>File: <a id='modal9_url'>link</a>
						<input type="file"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal10" title="Add new asset">
		<form id='modal10_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label id='modal10_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal11" title="Add new customer">
		<form id='modal11_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Phone: <input type="tel"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<label>Notes: <textarea></textarea></label><br>
				<label id='modal11_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal12" title="Add new account">
		<form id='modal12_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label id='modal12_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal13" title="Add new supplier">
		<form id='modal13_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Phone: <input type="text"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<label>Notes: <textarea></textarea></label><br>
				<label id='modal13_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal14" title="Add new product">
		<form id='modal14_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Make: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type="file"></label><br>
				<label>Tax (%): <input type="number" step='any'></label><br>
				<label>Bar Code: <input type="text" required></label>
				<label><input type='checkbox'>Auto generate</label><br>
				<label id='modal14_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal15" title="Provide feedback">
		<form id='modal15_form' autocomplete="off">
			<fieldset>
				<label>Feedback provider: <input type='text' required></label><br>
				<label>Detail: <textarea></textarea></label><br>
				<label>Type: <input type="text" required></label><br>
				<label>Rating: <input type="text" required></label><br>
				<label>Date: <input type="text" required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal16" title="Add new staff">
		<form id='modal16_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>UserName: <input type='text' required title='only alphanumeric characters'></label><br>
				<label>Phone: <input type="text"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<label id='modal16_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal17" title="Add staff details">
		<form id='modal17_form' autocomplete="off">
			<fieldset>
				<label>Address: <input type="text"></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal18" title="Add task type">
		<form id='modal18_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Estimated Hours: <input type="number" step='any' required></label><br>
				<label id='modal18_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal19" title="Copy product">
		<form id='modal19_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Make: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type="file"></label><br>
				<label>Tax (%): <input type="number"></label><br>
				<label>Bar Code: <input type="text" required></label>
				<label><input type='checkbox'>Auto generate</label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal20" title="Add new service">
		<form id='modal20_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Tax (%): <input type="number" step='any'></label><br>
				<label>Price: <input type="number"></label><br>
				<label id='modal20_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal21" title="Copy service">
		<form id='modal21_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Tax (%): <input type="number"></label><br>
				<label>Price: <input type="number"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal22" title="Add new batch">
		<form id='modal22_form' autocomplete="off">
			<fieldset>
				<label>Product Name: <input type="text" required></label><br>
				<label>Batch: <input type='text' required></label><br>
				<label>Manufacturing Date: <input type="text"></label><br>
				<label>Expiry Date: <input type="text"></label><br>
				<label>MRP: Rs. <input type="number" step='any'></label><br>
				<label>Purchase price: Rs. <input type="number" step='any' required></label><br>
				<label>Default Sale Price: Rs. <input type="number" step='any' required></label><br>
				<label id='modal22_billings'></label>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal23" title="Data Import">
		<form id='modal23_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Download import template' class='modal_submit'>
				<br>
				<br>
				<br>
				<b>Import pre-filled template</b><br>
				<label><input type="radio" name='upload_option' value='new'>Create New Records</label><br>
				<label><input type="radio" name='upload_option' value='existing' checked>Update existing Records</label><br>
				<input type="file" value='Select file' accept=".csv"><br>
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal24" title="Update Customer Address">
		<form id='modal24_form' autocomplete="off">
			<fieldset>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text" required></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal25" title="Update Supplier Address">
		<form id='modal25_form' autocomplete="off">
			<fieldset>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text" required></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal26" title="Payment Details">
		<form id='modal26_form' autocomplete="off">
			<fieldset>
				<label>Paid by: <input type='text' required readonly='readonly'></label><br>
				<label>Total Amount: Rs. <input type="number" required readonly='readonly' step='any'></label><br>
				<label>Amount Paid: Rs. <input type="number" required step='any'></label><br>
				<label>Due Date: <input type="text"></label><br>
				<label>Mode of Payment: <input type="text"></label><br>
				<label>Status: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal27" title="Order product">
		<form id='modal27_form' autocomplete="off">
			<fieldset>
				<label>Product Name: <input type='text' required readonly='readonly'></label><br>
				<label>Make: <input type="text" required readonly='readonly'></label><br>
				<label>Cost Price: Rs. <input type="number" step='any' readonly='readonly'></label><br>
				<label>Quantity: <input type="number" step='any' requried></label><br>
				<label>Supplier: <input type="text" required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal28" title="Payment Details">
		<form id='modal28_form' autocomplete="off">
			<fieldset>
				<label>Paid to: <input type='text' required readonly='readonly'></label><br>
				<label>Total Amount: Rs. <input type="number" required step='any'></label><br>
				<label>Amount Paid: Rs. <input type="number" required step='any'></label><br>
				<label>Due Date: <input type="text"></label><br>
				<label>Mode of Payment: <input type="text"></label><br>
				<label>Status: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal29" title="Payment Details">
		<form id='modal29_form' autocomplete="off">
			<fieldset>
				<label>Bill Id: <input type='text' readonly='readonly'></label><br>
				<label>Date: <input type="text" readonly='readonly'></label><br>
				<label>Mode of Payment: <input type="text"></label><br>
				<label>Due Date: <input type="text"></label><br>
				<label>Closing Notes: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal30" title="Add Receipt">
		<form id='modal30_form' autocomplete="off">
			<fieldset>
				<label>Receipt Id: <input type='text' required></label><br>
				<label>Account: <input type="text" required></label><br>
				<label>Receipt Amount: Rs. <input type="number" min='0' step='any' required></label><br>
				<label>Balance <input type="text" readonly='readonly'></label><br>
				<input type="hidden" name='type'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal31" title="Delete Receipt">
		<form id='modal31_form' autocomplete="off">
			<fieldset>
				<label>Receipt Id: <input type='text' required></label><br>
				<label>Account: <input type="text" readonly='readonly' required></label><br>
				<label>Balance <input type="text" readonly='readonly'></label><br>
				<label>Receipt Amount: Rs. <input type="number" step='any' readonly='readonly' required></label><br>
				<input type="submit" value='Delete' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal32" title="Add task">
		<form id='modal32_form' autocomplete="off">
			<fieldset>
				<label>Task: <input type='text' required></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Due time: <input type="text"></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type='hidden'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal33" title="Update task">
		<form id='modal33_form' autocomplete="off">
			<fieldset>
				<label>Task: <input type='text' readonly="readonly" required></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Due time: <input type="text"></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal35" title="Add Store Area">
		<form id='modal35_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Owner: <input type='text'></label><br>
				<label>Area Type: <input type="text" value='storage'></label><br>
				<label id='modal35_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal36" title="Add appointment">
		<form id='modal36_form' autocomplete="off">
			<fieldset>
				<label>Customer: <input type='text' required></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Schedule: <input type="text" required></label><br>
				<label>Hours: <input type="number" required value='1' step='any'></label><br>
				<label>Notes: <textarea></textarea></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal37" title="Update appointment">
		<form id='modal37_form' autocomplete="off">
			<fieldset>
				<label>Customer: <input type='text' required></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Notes: <textarea></textarea></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal38" title="Update sale price">
		<form id='modal38_form' autocomplete="off">
			<fieldset>
				<label>Default Sale Price: Rs. <input type="number" step='any' required></label><br>
				<label id='modal38_billings'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal39" title="Add loan">
		<form id='modal39_form' autocomplete="off">
			<fieldset>
				<label>Type: <input type='text' required></label><br>
				<label>Account: <input type="text" required></label><br>
				<label>Loan amount: Rs. <input type='number' min='0' required step='any'></label><br>
				<label>Date initiated: <input type="text" required></label><br>
				<label>Repayment method: <input type="text" required></label><br>
				<label>Interest rate(%): <input type="number" step='any' min='0'></label><br>
				<label>Interest period(in days): <input type="number" min='0'></label><br>
				<label>Interest is: <input type="text"></label><br>
				<label>EMI: Rs. <input type="number" step='any' min='0'></label><br>
				<label>EMI period(in days): <input type="number" min='0'></label><br>
				<label>Number of EMIs: <input type="number" min='0'></label><br>
				<label id='modal39_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal40" title="Discard item">
		<form id='modal40_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type='text' required></label><br>
				<label>Batch: <input type="text" required></label><br>
				<label>Quantity: <input type='number' required></label><br>
				<label>Storage: <input type='text'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal41" title="Close Payments">
		<form id='modal41_form' autocomplete="off">
			<fieldset>
				<label>Account: <input type='text' readonly='readonly' required></label><br>
				<label>Balance: Rs. <input type="text" readonly='readonly' required></label><br>
				<label>Counter Payment <input type='number' step='2' value='0' required></label><br>
				<label>Closing Notes: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal42" title="Bill Type">
		<form id='modal42_form' autocomplete="off">
			<fieldset>
				<label>Bill Type: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal43" title="Add task">
		<form id='modal43_form' autocomplete="off">
			<fieldset>
				<label>Phase: <input type='text' required></label><br>
				<label>Task: <input type="text"></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Due time: <input type="text"></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal44" title="Share">
		<form id='modal44_form' autocomplete="off">
			<fieldset>
				<label>Choose Client: <input type='text' required value='gmail'></label><br>
				<label>Recipient Email: <input type="text"></label><br>
				<label>Recipient Name: <input type="text" readonly='readonly'></label><br>
				<input type="submit" value='Send' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal45" title="Add new loyalty program">
		<form id='modal45_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Tier: <input type='text' required></label><br>
				<label title='Minimum points for tier qualification'>Tier Criteria(min.): <input type="number" step='any' required></label><br>
				<label title='Maximum points for tier qualification'>Tier Criteria(max.): <input type="number" step='any' required></label><br>
				<label title='Minimum points to redeem'>Redemption Criteria(max.): <input type="number" step='any'></label><br>
				<label title='Points per rupee spent'>Points Addition: <input type="number" step='any' required></label>
				<label title='% discount on purchases'>Discount: <input type="number" step='any'></label><br>
				<label title='Cashback per earned point'>Cashback: Rs. <input type="number" step='any'></label><br>
				<label title='Reward product on fulfilment of tier criteria'>Reward Product: <input type="text"></label><br>
				<label>Status: <input type="text" requried></label><br>
				<label id='modal45_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal46" title="Update loyalty program">
		<form id='modal46_form' autocomplete="off">
			<fieldset>
				<label title='Minimum points for tier qualification'>Tier Criteria(min.): <input type="number" step='any' required></label><br>
				<label title='Maximum points for tier qualification'>Tier Criteria(max.): <input type="number" step='any' required></label><br>
				<label title='Minimum points to redeem'>Redemption Criteria(max.): <input type="number" step='any'></label><br>
				<label title='Points per rupee spent'>Points Addition: <input type="number" step='any' required></label>
				<label title='% discount on purchases'>Discount: <input type="number" step='any'></label><br>
				<label title='Cashback per earned point'>Cashback: Rs. <input type="number" step='any'></label><br>
				<label title='Reward product on fulfilment of tier criteria'>Reward Product: <input type="text"></label><br>
				<label>Status: <input type="text" requried></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal47" title="Add service request">
		<form id='modal47_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type="text" readonly='readonly'></label><br>
				<label>Customer: <input type='text' required></label><br>
				<label>Reported By: <textarea required readonly="readonly"></textarea></label><br>
				<label>Problem Type: <input type='text'></label><br>
				<label>Problem Detail: <textarea required></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal48" title="Add solution">
		<form id='modal48_form' autocomplete="off">
			<fieldset>
				<label>Issue Id: <input type="text" readonly='readonly'></label><br>
				<label>Solution Detail: <textarea required></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal49" title="Add issue">
		<form id='modal49_form'>
			<fieldset>
				<label>Issue Id: <input type="text" readonly='readonly'></label><br>
				<label>Short Description: <textarea required></textarea></label><br>
				<label>Detail: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal50" title="Sending Mails">
		<a href='' id='modal50_sendmail'>Send mails through Gmail</a>
	</div>
	
	<div id="modal51" title="Merging Records">
		Merging records. 
		You can close this window at any time. The process will continue in the background.
	</div>
	
	<div id="modal52" title="Local Storage Cleared">
		Local storage on this system has been cleared. 
		You will be logged out now. Login again to access the system in online mode.
	</div>
	
	<div id="modal53" title="Scheme to customer">
		<table id='modal53_table'>
		</table>
	</div>
	<div id="modal54" title="Scheme from supplier">
		<table id='modal54_table'>
		</table>
	</div>

	<div id="modal55" title="Server Db backup">
	</div>

	<div id="modal56" title="Location not available">
		oops! your location can't be determined at the moment. Please try in a few moments.
	</div>

	<div id="modal57" title="Pricing History">
		Previous Bills
		<table id='modal57_bill_table'>
		</table>
		<br>
		Previous Quotations
		<table id='modal57_quot_table'>
		</table>
		
	</div>

	<div id="modal58" title="Promotions Sent">
		All selected customers have been sent the news Letter and SMS on their email-ids and phone numbers respectively.
	</div>

	<div id="modal59" title="Emails disabled">
		Emails are disabled for this account.
	</div>

	<div id="modal60" title="SMS Disabled">
		SMS are disabled for this account.
	</div>

	<div id="modal61" title="Updating Order Status">
		Please wait while we update the status of the processed orders.
	</div>

	<div id="modal101" title="Email Document">
		<form id='modal101_form' autocomplete="off">
			<fieldset>
				<label>To: <input type='text' readonly="readonly"></label><br>
				<label>Email: <textarea required></textarea></label><br>
				<label>Subject: <textarea></textarea></label><br>
				<input type='hidden'>
				<input type="submit" value='Send' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal102" title="Re-assign">
		<form id='modal102_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type='text' readonly="readonly"></label><br>
				<label>Assignee: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal103" title="Close service request">
		<form id='modal103_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type='text' readonly="readonly"></label><br>
				<label>Closing notes: <textarea required></textarea></label><br>
				<label>Status: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal104" title="Close machine service">
		<form id='modal104_form' autocomplete="off">
			<fieldset>
				<label>Machine: <input type='text' readonly="readonly"></label><br>
				<label>Closing notes: <textarea required></textarea></label><br>
				<label>Status: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal105" title="Add Schedule">
		<form id='modal105_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text'></label><br>
				<label>Details: <textarea required></textarea></label><br>
				<label>Start Time: <input type='text' required></label><br>
				<label>End Time: <input type='text' required></label><br>
				<label>Status: <input type='text' required value='inactive'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal106" title="Add Ledger Entry">
		<form id='modal106_form' autocomplete="off">
			<fieldset>
				<label>Account: <input type='text' required></label><br>
				<label>Particulars: <textarea required></textarea></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Amount: <input type='number' step='2' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal107" title="Update Schedule">
		<form id='modal107_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text'></label><br>
				<label>Details: <textarea required></textarea></label><br>
				<label>Start Time: <input type='text' required></label><br>
				<label>End Time: <input type='text' required></label><br>
				<label>Status: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal108" title="Workflow Assignees (Record Level)">
		<form id='modal108_form' autocomplete="off">
			<fieldset>
				<label>Access Type: <input type='text' required></label><br>
				<label>User Field: <input required type='text'></label><br>
				<label>User: <input type='text'></label><br>
				<label>User Field: <input type='text'></label><br>
				<label>Criteria Field: <input type='text'></label><br>
				<label>Criteria Value: <input type='text'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal109" title="Workflow Assignees">
		<form id='modal109_form' autocomplete="off">
			<fieldset>
				<label>Access Type: <input type='text' required></label><br>
				<label>User Field: <input required type='text'></label><br>
				<label>User: <input type='text'></label><br>
				<label>User Field: <input type='text'></label><br>
				<label>Criteria Field: <input type='text'></label><br>
				<label>Criteria Value: <input type='text'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal110" title="Add to Inventory">
		<form id='modal110_form' autocomplete="off">
			<fieldset>
				<label>Manufacturing Date: <input type='text'></label><br>
				<label>Expiry Date: <input type='text'></label><br>
				<label>Cost Price: <input type='text'></label><br>
				<label>Sales Price: <input type='text'></label><br>
				<label>Store: <input type='text'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal111" title="Log location">
		<form id='modal111_form' autocomplete="off">
			<fieldset>
				<label>Location: <textarea></textarea></label><br>
				<label>Name: <textarea readonly='readonly'></textarea></label><br>
				<label>Time: <input type="text" readonly='readonly'></label><br>
				<label>Latitude: <input type="text" readonly='readonly'></label><br>
				<label>Longitude: <input type="text" readonly='readonly'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal112" title="Add new product">
		<form id='modal112_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Make: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type="file"></label><br>
				<label>Tax (%): <input type="number" step='any'></label><br>
				<label>Cost Price: <input type="number" step='any'></label><br>
				<label>Sale Price: <input type="number" step='any'></label><br>
				<label id='modal112_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal113" title="Add Store Area">
		<form id='modal113_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Parent: <input type="text"></label><br>
				<label>Owner: <input type="text"></label><br>
				<label>Length: <input type="number"></label><br>
				<label>Breadth: <input type="number"></label><br>
				<label>Height: <input type="number"></label><br>
				<label>Unit: <input type="text"></label><br>
				<label id='modal113_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal114" title="Add new product">
		<form id='modal114_form' autocomplete="off">
			<fieldset>
				<label>SKU: <input type="text" required></label><br>
				<label>Name: <textarea></textarea></label><br>
				<label>Make: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type="file"></label><br>
				<label>Tax (%): <input type="number" step='any'></label><br>
				<label>Length: <input type="number" step='any'></label><br>
				<label>Breadth: <input type="number" step='any'></label><br>
				<label>Height: <input type="number" step='any'></label><br>
				<label>Volume: <input type="number" step='any'></label><br>
				<label>Unit: <input type="text"></label><br>
				<label>Weight(in gms): <input type="number" step='any'></label><br>
				<label>Packing: <textarea></textarea></label><br>
				<label>Bar Code: <input type="text" required></label>
				<label><input type='checkbox'>Auto generate</label><br>
				<label id='modal114_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal115" title="Delete Confirmation">
		Are you sure, you want to delete this record?
		<br>
		<br>
		<br>		
		<form id='modal115_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Yes' class='modal_submit'>
				<input type="button" value='No' class='modal_submit'>
			</fieldset>
		</form>
	</div>

<!--	
	<div id="modal116" title="Print Barcode">
		<div id='modal116_div' style='width:200px;height:100px'>
			<img style='width:200px;' id='modal116_img'>
		</div>
		<br>
		<form id='modal116_form'></form>
		<input type="button" id='modal116_print' value='Print' class='modal_submit'>
	</div>
-->	

	<div id="modal116" title="Map Barcode">
		<form id='modal116_form' autocomplete="off">
			<fieldset>
				<label>Barcode: <input type='text' readonly='readonly' required name='barcode'></label><br>
				<label>SKU: <input type="text" required name='sku'></label><br>
				<label>Name: <textarea name='name'></textarea></label><br>
				<input type='hidden' name='id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal117" title="Add task">
		<form id='modal117_form' autocomplete="off">
			<fieldset>
				<label>Task: <input type='text' required></label><br>
				<label>Details: <textarea></textarea></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Due time: <input type="text"></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal118" title="New order">
		<form id='modal118_form' autocomplete="off">
			<fieldset>
				<label>Phone: <input type='text' name='phone' required></label><br>
				<label>Name: <input type='text' name='name' required></label><br>
				<label>Credit: Rs. <input type="number" name='credit' step='any' readonly="readonly"></label><br>
				<label>Address: <textarea name='address'></textarea></label><br>
				<label>Notes: <textarea name='notes'></textarea></label><br>
				<label>Email: <textarea name='email'></textarea></label><br>
				<input type='hidden' name='new_old'>
				<input type='hidden' name='acc_name'>
				<input type='hidden' name='customer_id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal119" title="Assignee">
		<form id='modal119_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal120" title="Add new batch">
		<form id='modal120_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type="text" required></label><br>
				<label>Batch: <input type='text' required></label><br>
				<label>Expiry: <input type="text"></label><br>
				<label>MRP: Rs. <input type="number" step='any'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal121" title="Offline Storage Deletion">
		Any unsynced data will be lost if you delete offline storage. Please re-enter your password to continue.
		<br>
		<form id='modal121_form' autocomplete="off">
			<input type="password" name='pass' required>
			<input type="submit" class='modal_submit' value='Delete'>
		</form>
	</div>

	<div id="modal122" title="Update Inventory">
		<form id='modal122_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type="text" required readonly="readonly"></label><br>
				<label>Fresh: <input type='number' step='any' required></label><br>
				<label>Hireable: <input type="number" step='any' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal123" title="Add LetterHead">
		<form id='modal123_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Date: <input type="text"></label><br>
				<label>To: <textarea></textarea></label><br>
				<label>Subject: <textarea></textarea></label><br>
				<label>Salutation: <textarea></textarea></label><br>
				<label>Content: <textarea></textarea></label><br>
				<label>Signature: <textarea></textarea></label><br>
				<label>Footer: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal124" title="Send SMS">
		<form id='modal124_form' autocomplete="off">
			<fieldset>
				<label>To: <input type='text' name='to' readonly="readonly"></label><br>
				<label>Phone: <input type='text' name='phone' required></label><br>
				<label>SMS: <textarea name='sms'></textarea></label><br>
				<input type='hidden'>				
				<input type="submit" value='Send' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal125" title="List of suppliers">
		<form id='modal125_form' autocomplete="off">
			<fieldset>
				<label id='modal125_suppliers'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal127" title="Print Laundry Tags">
		Do you want to print tags?
		<br>
		<br>
		<br>		
		<form id='modal127_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Yes' class='modal_submit'>
				<input type="button" value='No' class='modal_submit'>
			</fieldset>
		</form>
	</div>

</div>