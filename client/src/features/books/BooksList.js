import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import './Book.css';
import { useGetBooksQuery } from "./bookApiSlice";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const categoryColors = {
    TANACH: '#4CAF50',
    FESTIVALS: '#FF9800',
    THOUGHT: '#2196F3',
    ETHICS: '#00BCD4',
    CHASSIDUT: '#9C27B0',
    HALACHA: '#3F51B5',
    TALMUD_COMMENTATORS: '#673AB7',
    BAVLI: '#8BC34A',
    YERUSHALMI: '#CDDC39',
    MISHNAH: '#FFC107',
    SIDDURIM: '#E91E63',
    MISC: '#9E9E9E',
    REFERENCE: '#795548',
};

const categoryNames = {
    TANACH: `תנ"ך ומפרשיו`,
    FESTIVALS: "מועדים",
    THOUGHT: "מחשבה",
    ETHICS: "מוסר",
    CHASSIDUT: "חסידות",
    HALACHA: "הלכה",
    TALMUD_COMMENTATORS: `מפרשי הש"ס`,
    BAVLI: "תלמוד בבלי",
    YERUSHALMI: "תלמוד ירושלמי",
    MISHNAH: "משניות",
    SIDDURIM: "סידורים",
    MISC: "שונות",
    REFERENCE: "קונקורדנציה, אנציקלופדיות ומילונים"
};

const BooksList = () => {
    const { data: books = [], isLoading } = useGetBooksQuery();

    const categoryBodyTemplate = (rowData) => {
        const key = rowData.category;
        return (
            <Tag
                value={categoryNames[key] || key}
                style={{
                    backgroundColor: categoryColors[key] || '#ccc',
                    color: 'white',
                }}
            />
        );
    };
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(books);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Books");
        XLSX.writeFile(workbook, "books.xlsx");
    };
    
    const exportPdf = () => {
        const doc = new jsPDF();
        doc.text("Books List", 14, 16);
        const tableColumn = ["קוד", "שם", "מחבר", "נושא", "קטגוריה", "תורם"];
        const tableRows = books.map(book => [
            book.code,
            book.name,
            book.author,
            book.subject,
            book.category,
            book.donor ? 'כן' : 'לא'
        ]);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
        doc.save("books.pdf");
    };
    
    const imageBodyTemplate = (rowData) => (
        <img src={rowData.image} alt={rowData.title} width={50} />
    );

    const donorBodyTemplate = (rowData) =>
        rowData.donor ? <Tag value="נתרם" severity="success" /> : null;

    return <>
        <div className="card">
            <h2>רשימת ספרים</h2>
            <Button label="הוספת ספר" icon="pi pi-plus" className="p-button-success" />
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div>
            <DataTable value={books} loading={isLoading} paginator rows={10} dataKey="id" filterDisplay="row">
                <Column field="code" header="קוד ספר" filter filterPlaceholder="חפש לפי קוד" />
                <Column field="name" header="שם ספר" filter filterPlaceholder="חפש לפי שם ספר" />
                <Column field="author" header="מחבר" filter filterPlaceholder="חפש לפי מחבר" />
                <Column field="category" header="קטגוריה" body={categoryBodyTemplate} filter filterPlaceholder="חפש לפי קטגוריה" />
                <Column field="subject" header="נושא" />
                <Column field="image" header="תמונה" body={imageBodyTemplate} />
                <Column field="donor" header="תורם" body={donorBodyTemplate} />
                <Column Button label="עריכת ספר" icon="pi pi-pencil" className="p-button-warning" />
            </DataTable>
        </>
};

        export default BooksList;