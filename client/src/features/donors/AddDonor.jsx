import { useState } from "react";
import { useAddDonorMutation } from "./donorApiSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

const AddDonor = () => {
    const [formData, setFormData] = useState({
        name: "",
        email:"",
        namesToRemember:"",
        phone:"",
        comments:""
    });

    const [addDonor, { isLoading }] = useAddDonorMutation();
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            addDonor(formData)
            setFormData({
                name: "",
                email:"",
                namesToRemember:"",
                phone:"",
                comments:""
            });
        }
        return(
            <>
            
            </>
        )
}
export default AddDonor