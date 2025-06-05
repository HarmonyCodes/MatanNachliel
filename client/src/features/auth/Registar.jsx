import React, { useState } from "react";
import { useRegisterMutation } from "./authApiSlice";

const Register = () => {
    const [registerFunc]= useRegisterMutation()
    const [formData, setFormData] = useState({
        name: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        registerFunc(formData)
    }

    return(
        <>
        
        </>
    )
}
export default Register