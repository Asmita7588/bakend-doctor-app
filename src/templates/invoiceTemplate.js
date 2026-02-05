export const getInvoiceHtml = (data) => {
    const patientName = data.patientId?.userId?.name || "N/A";
    const patientEmail = data.patientId?.userId?.email || "N/A";

    return `
    <html>
    <head>
        <style>
            body { font-family: 'Helvetica', sans-serif; color: #333; margin: 0; padding: 40px; }
            .invoice-header { display: flex; justify-content: space-between; border-bottom: 2px solid #444; padding-bottom: 20px; }
            .info-section { display: flex; justify-content: space-between; margin-top: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 30px; }
            th { background-color: #f4f4f4; padding: 12px; text-align: left; border-bottom: 2px solid #ddd; }
            td { padding: 12px; border-bottom: 1px solid #eee; }
            .total-box { margin-top: 30px; text-align: right; font-size: 1.2em; font-weight: bold; }
            .footer { margin-top: 50px; font-size: 0.8em; color: #777; text-align: center; }
        </style>
    </head>
    <body>
        <div class="invoice-header">
            <div>
                <h2>HEALTHCARE CLINIC</h2>
                <p>Invoice ID: ${data._id}</p>
            </div>
            <div style="text-align: right;">
                <h1>INVOICE</h1>
                <p>Issued At: ${data.issuedAt}</p>
            </div>
        </div>

        <div class="info-section">
            <div>
                <strong>Billed To:</strong><br>
                ${patientName}<br>
                ${data.patientId.address}<br>
                ${patientEmail}
            </div>
            <div style="text-align: right;">
                <strong>Patient Details:</strong><br>
                Age: ${data.patientId.age}<br>
                Blood Group: ${data.patientId.bloodGroup}
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${data.items.map(item => `
                    <tr>
                        <td>${item.label}</td>
                        <td style="text-align: right;">₹${item.amount.toLocaleString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div class="total-box">
            Total Amount: ₹${data.totalAmount.toLocaleString()}
        </div>

        <div class="footer">
            This is a computer-generated invoice and does not require a physical signature.
        </div>
    </body>
    </html>`;
};