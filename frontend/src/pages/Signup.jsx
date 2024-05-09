import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomRedirect } from "../components/BottomRedirect";
import axios from "axios";


export const Signup = ()=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label="Sign Up"/>
                    <SubHeading label="Enter your information to create your account"/> 
                    <InputBox label="First Name" placeholder="John" onChange={e=>{
                        setFirstName(e.target.value);
                    }}/>
                    <InputBox label="Last Name" placeholder="Doe" onChange={e=>{
                        setLastName(e.target.value);
                    }}/>
                    <InputBox label="Email" placeholder="johndoe@gmail.com" onChange={e=>{
                        setUsername(e.target.value);
                    }}/>
                    <InputBox label="Password" placeholder="******" onChange={e=>{
                        setPassword(e.target.value);
                    }}/>
                    <div className="pt-4">
                        <Button label="Sign up" onClick={async ()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/singup",{
                                username,
                                password,
                                firstName,
                                lastName
                            });
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                        }}/>
                    </div>
                    <BottomRedirect label="Already have an account?" buttonText="Sign in" to="/Signin"/>
                </div>
            </div>
        </div>
    )
}