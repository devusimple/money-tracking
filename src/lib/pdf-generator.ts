import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from "pdf-lib";
// import fs from 'fs';
// import path from 'path';

interface Transaction {
  id?: number;
  amount: number;
  type: "Expense" | "Income" | "Transfer";
  paymentMethod: string;
  category: string;
  date: Date;
  description: string;
}

const formatCurrency = (amount: number): string =>
  "$" + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const drawHeader = (page: PDFPage, font: PDFFont, y: number): number => {
  page.drawText("Monthly Transaction Report", {
    x: 40,
    y,
    size: 16,
    font,
    color: rgb(0, 0.2, 0.4),
  });

  const headers = [
    "Date",
    "Type",
    "Category",
    "Method",
    "Amount",
    "Description",
  ];
  const columnWidths = [60, 60, 80, 80, 60, 200];
  let x = 40;
  y -= 25;
  headers.forEach((header, i) => {
    page.drawText(header, { x, y, size: 10, font });
    x += columnWidths[i];
  });
  return y - 10;
};

const drawFooter = (page: PDFPage, font: PDFFont, pageNumber: number): void => {
  page.drawText(`Page ${pageNumber}`, {
    x: 520,
    y: 20,
    size: 10,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });
};

export async function generateMonthlyTransactionPDF(
  transactions: Transaction[]
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const columnWidths = [60, 60, 80, 80, 60, 200];
  let y = 800;
  let pageNumber = 1;

  let totalIncome = 0;
  let totalExpense = 0;

  y = drawHeader(page, font, y);
  drawFooter(page, font, pageNumber);

  const grouped: Record<string, Transaction[]> = {};
  for (const txn of transactions) {
    const key = txn.category;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(txn);
  }

  for (const category in grouped) {
    if (y < 120) {
      page = pdfDoc.addPage([595, 842]);
      y = 800;
      pageNumber++;
      y = drawHeader(page, font, y);
      drawFooter(page, font, pageNumber);
    }

    page.drawText(`=== Category: ${category} ===`, {
      x: 40,
      y,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
    y -= 18;

    for (const txn of grouped[category]) {
      if (y < 100) {
        page = pdfDoc.addPage([595, 842]);
        y = 800;
        pageNumber++;
        y = drawHeader(page, font, y);
        drawFooter(page, font, pageNumber);
      }

      const values = [
        txn.date,
        txn.type,
        txn.category,
        txn.paymentMethod,
        formatCurrency(txn.amount),
        txn.description || "",
      ];

      let x = 40;
      values.forEach((val, i) => {
        page.drawText(val.toString(), { x, y, size: 9, font });
        x += columnWidths[i];
      });

      if (txn.type === "Income") totalIncome += txn.amount;
      else if (txn.type === "Expense") totalExpense += txn.amount;

      y -= 18;
    }
  }

  if (y < 100) {
    page = pdfDoc.addPage([595, 842]);
    y = 800;
    pageNumber++;
    y = drawHeader(page, font, y);
    drawFooter(page, font, pageNumber);
  }

  y -= 30;
  page.drawText(`Total Income: ${formatCurrency(totalIncome)}`, {
    x: 40,
    y,
    size: 12,
    font,
  });
  y -= 18;
  page.drawText(`Total Expense: ${formatCurrency(totalExpense)}`, {
    x: 40,
    y,
    size: 12,
    font,
  });
  y -= 18;
  page.drawText(`Net Balance: ${formatCurrency(totalIncome - totalExpense)}`, {
    x: 40,
    y,
    size: 12,
    font,
    color: rgb(0, 0.6, 0),
  });
  return await pdfDoc.save();
}
