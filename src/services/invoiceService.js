import Invoice from "../models/InvoiceModel.js"
import puppeteer from 'puppeteer-core';
import { getInvoiceHtml } from '../templates/invoiceTemplate.js';


export const createInvoice = async (roomData) => {
    return await Invoice.create(roomData);
};


export const getAllInvoices = async () => {
    return await Invoice.find();
};


export const getInvoiceById = async (id) => {
    return await Invoice.findById(id).populate("patientId").populate("paymentId");;
};

export const updateInvoice = async (id,updateData) => {
    return await Invoice.findByIdAndUpdate( id,updateData, { 
        new: true, 
        runValidators: true 
    });
};

export const deleteInvoice = async (id) => {
    return await Invoice.findByIdAndDelete(id);
};

export const generateInvoicePdfBuffer = async (invoiceId) => {
    const invoice = await Invoice.findById(invoiceId)
        .populate({
            path: 'patientId',
            populate: {
                path: 'userId', 
                select: 'name email' 
            }
        })
        .populate('paymentId')
        .populate('generatedBy', 'name');

    if (!invoice) throw new Error("Invoice not found");

    const htmlContent = getInvoiceHtml(invoice);

    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
        });

        return { pdfBuffer, invoice };
    } finally {
        await browser.close();
    }
}