import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"


export const Dashboard = ()=>{
    return <>
        <AppBar/>
        <div className="m-8">
            <Balance value={1000}/>
            <Users/>
        </div>
    </>
}