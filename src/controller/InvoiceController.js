import * as InvoiceService from '../services/invoiceService.js';

export const createInvoice = async (req, res) => {
    try {
        const Invoice = await InvoiceService.createInvoice(req.body);
        res.status(201).json({ success: true, data: Invoice });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const fetchAllInvoices = async (req, res) => {
    try {
        const Invoice = await InvoiceService.getAllInvoices();
        res.status(200).json({ success: true, count: Invoice.length, data: Invoice });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const fetchInvoiceById = async (req, res) => {
    try {
        const Invoice = await InvoiceService.getInvoiceById(req.params.id);
        if (!Invoice) return res.status(404).json({ message: "Invoice not found" });
        res.status(200).json({ success: true, data: Invoice });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateInvoiceDetails = async (req, res) => {
    try {
        const Invoice = await InvoiceService.updateInvoice(req.params.id,req.body);
        if (!Invoice) return res.status(404).json({ message: "Invoice not found" });
        res.status(200).json({ success: true, data: Invoice });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        const Invoice = await InvoiceService.deleteInvoice(req.params.id);
        if (!Invoice) return res.status(404).json({ message: "Invoice not found" });
        res.status(200).json({ success: true, message: "Invoice record deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const downloadInvoicePdf = async (req, res) => {
    try {
        const id  = req.params.id;
        
        const { pdfBuffer } = await InvoiceService.generateInvoicePdfBuffer(id);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=invoice_${id}.pdf`,
            'Content-Length': pdfBuffer.length,
        });

        return res.send(pdfBuffer);
    } catch (error) {
        console.error("PDF Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};