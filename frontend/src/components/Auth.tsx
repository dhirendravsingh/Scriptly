import {  useState } from "react"
import { ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@dhirendravsingh/scriptly-commons"
import axios from "axios"
import BACKEND_URL from "../pages/config"

export default function Auth({type}: {type : "signup" | "signin"}) {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name : "",
        username : "",
        password : ""
    })

   async function sendRequest(){
       try {
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=== "signin"? "signin" : "signup"}`, postInputs)
        
        const jwt = response.data.jwt
        localStorage.setItem("token", jwt)
        alert("sherrr")
        navigate("/blogs")
       } catch (e) {
        alert("Arey kch masla h")
       }
    }


    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
        <div className="text-3xl font-extrabold ">
        Create an account
        </div>
        <div className="text-slate-500" > 
            {type === "signin"? "Don't have an account?" : "Already have an account?"} <Link className="pl-1 underline" to = {type==="signin" ? "/signup" : "/signin" }>{type==="signin" ? "Sign up" : "Login"}</Link>
        </div>
        </div>

        <div className="pt-8">
           <div className="mb-3">
            {type==="signup" ? <LabelledInput label ="Name" placeholder="dhiru" onChange={(e)=>{
                setPostInputs(c=>({
                    ...c,
                    name : e.target.value,
                    
                }))
            }}/> : null}
            </div>
            <div className="mb-3">
    
    <LabelledInput label ="Email" placeholder="dhiru@gmail.com" onChange={(e)=>{
                setPostInputs(c=>({
                    ...c,
                    username : e.target.value,
                    
                }))
            }}/>
            </div>
            <div >

    <LabelledInput label ="Password" type="Password" placeholder="123456" onChange={(e)=>{
                setPostInputs(c=>({
                    ...c,
                    password : e.target.value,
                    
                }))
            }}/>
            
            </div>
            <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=== "signup"? "Sign up" : "Sign in"}</button>
    </div>
    </div>
        </div>
    </div>
}
interface LabelledInputType {
    label : string
    placeholder : string
    onChange : (e: ChangeEvent<HTMLInputElement>) => void
    type? : string
}
function LabelledInput({label, placeholder, onChange, type}: LabelledInputType ){
    return <div>
        <label className="block mb-2 text-sm  text-black font-semibold" > {label} </label>
        <input onChange={onChange} type = {type || "text"}  id = "first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required/>
    </div>
}