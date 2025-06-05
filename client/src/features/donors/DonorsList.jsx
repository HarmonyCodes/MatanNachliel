import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useGetDonorsQuery, useDeleteDonorMutation } from './donorApiSlice';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DonorsList = ({ donors, onDonorClick }) => {
    const {data:donorsList, isLoading, isSuccess, isError, error}= useGetDonorsQuery();
    const [deleteDonor]= useDeleteDonorMutation()
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const handleDeleteClick=(donorItem)=>{
        deleteDonor({id:donorItem._id})
    }

    return(
        <>
        <Button label="מחק" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDeleteClick(donor)} />
        </>
    )
}
export default DonorsList