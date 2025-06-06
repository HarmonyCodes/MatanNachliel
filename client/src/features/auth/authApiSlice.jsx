import apiSlice from "../../app/apiSlice"

const authApiSlice= apiSlice.injectEndpoints({
    endpoints: (build)=>({
        register: build.mutation({
            query: (registerUser)=>({
                url: "/auth/register",
                method: "POST",
                body:registerUser
            })
        }),
        login: build.mutation({
            query: (loginData)=>({
                url: "/auth/login",
                method: "POST",
                body: loginData
            })
        })
    })
})
export const {useRegisterMutation, useLoginMutation}= authApiSlice