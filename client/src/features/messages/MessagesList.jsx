import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useGetMessagesQuery, useDeleteMessageMutation } from './messageApiSlice';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MessagesList = ({ messages, onMessageClick }) => {
    const {data:messagesList, isLoading, isSuccess, isError, error}= useGetMessagesQuery();
    const [deleteMessage]= useDeleteMessageMutation()
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const handleDeleteClick=(MessageItem)=>{
        deleteMessage({id:MessageItem._id})
    }

    return(
        <>
        <Button label="מחק" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDeleteClick(message)} />
        </>
    )
}
export default MessagesList