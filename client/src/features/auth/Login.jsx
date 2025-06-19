import React, { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { setToken } from "./authSlice";
import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    const [LoginFunc, { isError, error, isSuccess, data }] = useLoginMutation()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    // useEffect(()=>{
    //     if(isSuccess){
    //         dispatch(setToken(data));
    //         //navigate("/books");
    //     } 
    // },[isSuccess])
    useEffect(() => {
        if (isSuccess && data?.accessToken) {
            dispatch(setToken({ token: data.accessToken, username: formData.username }));
            // navigate("/books");
        }
    }, [isSuccess, data, dispatch]);



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
    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                {isError && <p className="error">{error?.data?.message || "Login failed"}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}
export default Login