import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useGetDonorsQuery } from './donorApiSlice';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DonorsList = ({ donors, onDonorClick }) => {
    const {data:donorsList, isLoading, isSuccess, isError, error}= useGetDonorsQuery();
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return(
        <>
        
        </>
    )
}
export default DonorsList