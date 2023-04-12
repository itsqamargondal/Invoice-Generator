// Get the form elementinvoic
const invoiceForm = document.querySelector('#invoice-form');

// Add event listener for form submission
invoiceForm.addEventListener('submit', (event) => {
	event.preventDefault(); // Prevent form submission

	// Get the form data
	const invoiceNumber = document.querySelector('#invoice-number').value;
	const invoiceDate = document.querySelector('#invoice-date').value;
	const deliveryDate = document.querySelector('#delivery-date').value;
	const clientName = document.querySelector('#client-name').value;
	const clientEmail = document.querySelector('#client-email').value;
	const clientMobile = document.querySelector('#client-mobile').value;
	const itemInputs = document.querySelectorAll('input[name="item[]"]');
	const quantityInputs = document.querySelectorAll('input[name="quantity[]"]');
	const priceInputs = document.querySelectorAll('input[name="price[]"]');
	const socialLinks = document.querySelectorAll('.social-links');



	const companyName = document.querySelectorAll('.company-name');
	const companyAddress = document.querySelectorAll('.company-address');
	const companyPhone = document.querySelectorAll('.company-phone');
	
	

	

	// Create the invoice object
	const invoice = {
		invoiceNumber,
		invoiceDate,
		deliveryDate,
		
		companyName,
		companyAddress,
		companyPhone,



		clientName,
		socialLinks,
		clientEmail,
		clientMobile,
		items: []
	};

	// Loop through the item inputs and add the items to the invoice object
	itemInputs.forEach((itemInput, index) => {
		const item = itemInput.value;
		const quantity = quantityInputs[index].value;
		const price = priceInputs[index].value;
		const total = quantity * price;

		invoice.items.push({
			item,
			quantity,
			price,
			total
		});
	});

	// Calculate the total amount
	const advancePayment = parseFloat(document.getElementById("advance-payment").value);
	const totalAmount = invoice.items.reduce((total, item) => total + item.total, 0);
	const duePayment = totalAmount - advancePayment;





	// Update the total amount input
	document.querySelector('#total-amount').value = totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
	document.querySelector('#due-payment').value = duePayment.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
	// Generate the PDF invoice
	generatePDF(invoice);
});

// Add event listener for "Add Item" button
document.querySelector('#add-item').addEventListener('click', () => {
	const invoiceItems = document.querySelector('#invoice-items tbody');
	const newItemRow = document.createElement('tr');

	newItemRow.innerHTML = `
		<td><input type="text" name="item[]" required></td>
		<td><input type="number" name="quantity[]" min="1" value="1" required></td>
		<td><input type="number" name="price[]" min="0" step=".01" value="0" required></td>
		<td><button type="button" class="remove-item">&times;</button></td>
	`;

	invoiceItems.appendChild(newItemRow);

	// Add event listener for "Remove Item" button
	newItemRow.querySelector('.remove-item').addEventListener('click', () => {
		newItemRow.remove();
	});
});

// Function to generate the PDF invoice
function generatePDF(invoice) {
	// Create a new jsPDF instance
	const doc = new jsPDF();

	// Set the document font size
	doc.setFontSize(16);

	// Add the invoice header
	doc.text('INVOICE', 14, 35);
	doc.setFontSize(12);
	doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 14, 45);
	doc.text(`Invoice Date: ${invoice.invoiceDate}`, 14, 51);
	doc.text(`Delivery Date: ${invoice.deliveryDate}`, 14, 57);
	doc.setFontSize(12);
	doc.text(`Customer Name: ${invoice.clientName}`, 100, 45);
	doc.text(`Customer Email: ${invoice.clientEmail}`, 100, 51);
	doc.text(`Customer Mobile: ${invoice.clientMobile}`, 100, 57);
	doc.text(` ${invoice.socialLinks}`, 14, 202);

	doc.setFontSize(20)
	doc.text(` ${invoice.companyName}`, 72, 12);
	doc.setFontSize(10)
	doc.text(` ${invoice.companyAddress}`, 70, 17);
	doc.text(` ${invoice.companyPhone}`, 78, 22);
	
	  

	// Add the invoice items
	doc.setFontSize(12);
	doc.text('Item', 14, 70);
	doc.text('Quantity', 70, 70);
	doc.text('Price', 105, 70);
	doc.text('Total', 140, 70);
	doc.line(14, 72, 196, 72);
	let y = 78;

	invoice.items.forEach((item, index) => {
		const itemY = y + (index * 10);
		doc.text(item.item, 14, itemY);
		doc.text(item.quantity.toString(), 70, itemY);
		doc.text(item.price.toLocaleString('en-US', { style: 'currency', currency: 'PKR' }), 105, itemY);
		doc.text(item.total.toLocaleString('en-US', { style: 'currency', currency: 'PKR' }), 140, itemY);
	});

	// Add the total amount
	doc.text('Total Amount:', 105, y + (invoice.items.length * 10) + 10);
	doc.text(invoice.totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'PKR' }), 140, y + (invoice.items.length * 10) + 10);
// 	//add the advance payment
// 	doc.text('Advance Payment:', 105, y + (invoice.items.length * 10) + 20);
// doc.text(advancePayment.toLocaleString('en-US', { style: 'currency', currency: 'PKR' }), 140, y + (invoice.items.length * 10) + 20);
// 	//add the due payment
// doc.text('Due Payment:', 105, y + (invoice.items.length * 10) + 30);
// doc.text(duePayment.toLocaleString('en-US', { style: 'currency', currency: 'PKR' }), 140, y + (invoice.items.length * 10) + 30);
	

	// Save the PDF file
	doc.save('invoice.pdf');
}

// Add event listener for "Download PDF" button
document.getElementById("download-btn").addEventListener("click", function() {
	const invoiceNumber = document.querySelector('#invoice-number').value;
	const invoiceDate = document.querySelector('#invoice-date').value;
	const deliveryDate = document.querySelector('#delivery-date').value;
	const clientName = document.querySelector('#client-name').value;
	const clientEmail = document.querySelector('#client-email').value;
	const clientMobile = document.querySelector('#client-mobile').value;
	const itemInputs = document.querySelectorAll('input[name="item[]"]');
	const quantityInputs = document.querySelectorAll('input[name="quantity[]"]');
	const priceInputs = document.querySelectorAll('input[name="price[]"]');
	const socialLinks = document.querySelectorAll('.social-links a');


	const companyName = document.querySelectorAll('.company-name a');
	const companyAddress = document.querySelectorAll('.company-address a');
	const companyPhone = document.querySelectorAll('.company-phone a');

	const doc = new jsPDF();
	// Create a new PDF document
  
	

	// Create the invoice object
	const invoice = {
		invoiceNumber,
		invoiceDate,
		deliveryDate,
		
		
		clientName,
		clientEmail,
		
		clientMobile,
		socialLinks: Array.from(socialLinks).map(link => link.getAttribute('href')).join(', '),
		companyName: Array.from(companyName).map(link => link.getAttribute('href')).join(', '),
		companyAddress: Array.from(companyAddress).map(link => link.getAttribute('href')).join(', '),
		companyPhone: Array.from(companyPhone).map(link => link.getAttribute('href')).join(', '),
		items: []
	};
	doc.save("invoice.pdf");

	// Loop through the item inputs and add the items to the invoice object
	itemInputs.forEach((itemInput, index) => {
		const item = itemInput.value;
		const quantity = quantityInputs[index].value;
		const price = priceInputs[index].value;
		const total = quantity * price;

		invoice.items.push({
			item,
			quantity,
			price,
			total
		});
	});

	// Calculate the total amount
	const totalAmount = invoice.items.reduce((total, item) => total + item.total, 0);

	// Add the total amount to the invoice object
	invoice.totalAmount = totalAmount;

	// Generate the PDF invoice
	
	generatePDF(invoice);
});












