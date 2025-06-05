import { useState } from "react";
import { useAddMessageMutation } from "./messageApiSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

const AddMessage = () => {
    const [formData, setFormData] = useState({
        name:"",
        subject:"",
        description:"",
        phone:"",
        comments:""
    });

    const [addMessage, { isLoading }] = useAddMessageMutation();
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            addMessage(formData)
            setFormData({
                name:"",
                subject:"",
                description:"",
                phone:"",
                comments:""
            });
        }
        return(
            <>
            
            </>
        )
}
export default AddMessage