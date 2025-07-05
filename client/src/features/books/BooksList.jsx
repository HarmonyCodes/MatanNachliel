import React, { useState } from 'react';
import './Book.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useGetBooksQuery, useDeleteBookMutation } from './bookApiSlice';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../Alef-Regular.js'
import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { removeToken } from '../auth/authSlice';
import apiSlice from '../../app/apiSlice';
import Login from '../auth/Login';
import { Dialog } from 'primereact/dialog';

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
    const [showLogin, setShowLogin] = useState(false);
    const { isUserLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    const handleLogoutClick = () => {
        dispatch(removeToken());
        dispatch(apiSlice.util.resetApiState());
        //navigate('/');
    };
    const handleLoginClick = () => {
        setShowLogin(true);
    }
    const { data: booksList = [], isLoading, isError, error, refetch } = useGetBooksQuery('',
        {}
    );
    const [deleteBook] = useDeleteBookMutation()
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

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
        const worksheet = XLSX.utils.json_to_sheet(booksList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Books");
        XLSX.writeFile(workbook, "books.xlsx");
    };

    const exportPdf = () => {
        const doc = new jsPDF();
        doc.text("Books List", 14, 16);
        // doc.setLanguage('he');
        // doc.setFont('Arial', 'normal');
        doc.addFont("Alef", "normal", "normal");
        doc.setFontSize(12);
        doc.setFont("Alef");
        const tableColumn = ["קוד", "שם", "מחבר", "נושא", "קטגוריה", "תורם"];
        const tableRows = booksList.map(book => [
            book.code,
            book.name,
            book.author,
            book.subject,
            book.category,
            book.donor ? 'כן' : 'לא'
        ]);
        // doc.autoTable({
        //     head: [tableColumn],
        //     body: tableRows,
        //     startY: 20,
        // });
        autoTable(doc, {
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
        rowData.donor ? <Tag value={`נתרם ע"י ${rowData.donor}`} /> : null;

    const handleDeleteClick = (bookItem) => {
        deleteBook({ id: bookItem._id })
    }
    return (
        <>
            <div className="card">
                <h2>רשימת ספרים</h2>
                {isUserLoggedIn && <Button label="הוספת ספר" icon="pi pi-plus" className="p-button-success" />}
                <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
                {isUserLoggedIn && <Button label="התנתק" icon="pi pi-sign-out" className="p-button-danger" onClick={handleLogoutClick} />}
                {!isUserLoggedIn && <Button label="Login" icon="pi pi-user" onClick={handleLoginClick} />}
                {/* {!isUserLoggedIn && <Button label="התחבר" icon="pi pi-sign-in" className="p-button-secondary" onClick={handleLoginClick} />} */}
            </div>
            <DataTable value={booksList} loading={isLoading} paginator rows={10} dataKey="id" filterDisplay="row">
                <Column field="code" header="קוד ספר" filter filterPlaceholder="חפש לפי קוד" />
                <Column field="name" header="שם ספר" filter filterPlaceholder="חפש לפי שם ספר" />
                <Column field="author" header="מחבר" filter filterPlaceholder="חפש לפי מחבר" />
                <Column field="category" header="קטגוריה" body={categoryBodyTemplate} filter filterPlaceholder="חפש לפי קטגוריה" />
                <Column field="subject" header="נושא" />
                <Column field="image" header="תמונה" body={imageBodyTemplate} />
                <Column field="donor" header="תורם" body={donorBodyTemplate} />
                {/* <Column body={(rowData) => (<Button label="ערוך" icon="pi pi-pencil" className="p-button-warning" onClick={() => editBook(rowData)} />)} /> */}
                {isUserLoggedIn && <Column body={(rowData) => (<Button label="מחק" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDeleteClick(rowData)} />)} />}
            </DataTable>
            <Button label="רענן" icon="pi pi-refresh" className="p-button-secondary" onClick={refetch} />
            <Dialog
                visible={showLogin}
                onHide={() => setShowLogin(false)}
                style={{ width: '30vw' }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
                <Login />
            </Dialog>
        </>

    )
}
export default BooksList;