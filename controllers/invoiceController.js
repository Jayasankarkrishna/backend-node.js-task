const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoice = (req, res) => {
  const { products } = req.body;

  console.log(products);

  const invoiceDir = path.join(__dirname, '..', 'invoice');
  const filePath = path.join(invoiceDir, 'invoice.pdf');

  // Create the directory if it doesn't exist
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir);
  }

  const doc = new PDFDocument({ margin: 50 });
  const writeStream = fs.createWriteStream(filePath);

  doc.pipe(writeStream);

  // Adding the logo
  const logoPath = path.join(__dirname, '..', 'assets', 'logo.png');
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 450, 20, { width: 100 });
  }

  // Title and date
  doc.fontSize(25).text('INVOICE GENERATOR', { align: 'left' });
  doc.moveDown();
  doc.fontSize(10).text('Sample Output should be this', { align: 'left' });
  doc.moveDown();
  doc.fontSize(14).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'left' });

  // Product table headers
  doc.moveDown();
  doc.moveDown();
  const tableTop = doc.y;

  doc.fontSize(12).text('Product', 50, tableTop);
  doc.text('Qty', 200, tableTop);
  doc.text('Rate', 300, tableTop);
  doc.text('Total', 400, tableTop);
  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  // Product details
  let y = tableTop + 20;
  let grandTotal = 0;
  products.forEach((product) => {
    const { name, quantity, rate } = product;
    const total = quantity * rate;
    grandTotal += total;

    doc.fontSize(12).text(name, 50, y);
    doc.text(quantity, 200, y);
    doc.text(rate, 300, y);
    doc.text(`INR ${total.toFixed(2)}`, 400, y);
    y += 20;
  });

  doc.moveTo(50, y).lineTo(550, y).stroke();

  // Total and GST
  y += 10;
  doc.fontSize(14).text(`Total: INR ${grandTotal.toFixed(2)}`, 50, y);
  const gst = grandTotal * 0.18; // Assuming 18% GST
  doc.text(`GST: 18%`, 50, y + 20);

  // Align the grand total to the right as in the example
  doc.fontSize(16).fillColor('blue').text(`Grand Total: INR ${(grandTotal + gst).toFixed(2)}`, 400, y + 40, { align: 'right' });
  doc.fillColor('black');

  // Footer with terms and conditions
  y += 60;
  doc.fontSize(10).text('Valid until: 12/04/23', 50, y);

  // Draw the rounded black rectangle for the footer
  const footerY = doc.page.height - 120;
  doc.roundedRect(50, footerY, doc.page.width - 100, 70, 10)
    .fillColor('black')
    .fill();

  // Add the footer text on top of the black rectangle
  doc.fillColor('white')
    .fontSize(12)
    .text('Terms and Conditions', 60, footerY + 10, { align: 'left' });
  doc.fontSize(10)
    .text('we are happy to supply any further information you may need and trust that you call on us to fill your order, which will receive our prompt and careful attention', 60, footerY + 30, {
      align: 'left',
      width: doc.page.width - 120
    });

  doc.end();

  writeStream.on('finish', () => {
    res.download(filePath, 'invoice.pdf', (err) => {
      if (err) {
        console.error('Error downloading the file:', err);
        res.status(500).send('Failed to download the file');
      }
    });
  });

  writeStream.on('error', (err) => {
    console.error('Error writing to file:', err);
    res.status(500).send('Failed to generate the PDF');
  });
};

module.exports = { generateInvoice };



