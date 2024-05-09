import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useDebounce } from "../hooks/useDebounce";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const debouncedFilter = useDebounce(filter, 500);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + debouncedFilter)
        .then(response => {
            setUsers(response.data.user);
        })
    }, [debouncedFilter]);

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={e=>{
                setFilter(e.target.value);
            }} type="text" placeholder="Search users..." className="w-full py-1 px-2 border rounded border-slate-200"/>
        </div>
        <div>
            {users.map(user=><User user={user}/>)}
        </div>
    </>
}

function User({user}){
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bl-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick={e=>{
                navigate("/payment?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"}/>
        </div>
    </div>
}
