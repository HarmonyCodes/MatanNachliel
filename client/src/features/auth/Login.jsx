import React, { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { setToken } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [LoginFunc, {isError, error, isSuccess, data}] = useLoginMutation()
    const [formData, setFormData] = useState({
        name: "",
        password: ""
    });

    useEffect(()=>{
        if(isSuccess){
            dispatch(setToken(data));
            navigate("/books");
        }
    },[isSuccess])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        LoginFunc(formData)
    }
    return(
        <>
        
        </>
    )
}
export default Login