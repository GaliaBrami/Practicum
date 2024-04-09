import axios from 'axios';
import { useEffect, useState } from "react";
import{ useDispatch, useSelector}from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import * as action from "../store/action"

const AddRole = () => {
    // const [managers,setManagers]=useState([])
    const roles=useSelector(x=>x.roles)
    const [roleName,setRoleName]=useState("")
    // const [password,setPassword]=useState("")
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const add=()=>{
        axios.post("https://localhost:7259/api/Roles",{name:roleName}).then(info=>{
            dispatch({ type: action.ADD_ROLE, r: info.data })
        })
        navigate("/workerList")
    }
    useEffect(() => {

        axios.get("https://localhost:7259/api/Roles")
          .then(info => {
            console.log(info.data, "daratatrtra")
             dispatch({ type: action.SET_ROLES, r: info.data })
            // setWorkers(info.data)
            // console.log(workers)
            // setManagers(info.data);
            console.log(info.data);
            // setRoles(["teacher","principal"]);
    
          })
          .catch(err => console.log(err));
      }, []);
return(<>
<h1>add new role to your business!!</h1>
Role Name:
<form>
    <input onChange={(e)=>setRoleName(e.target.value)} placeholder="New Role Name" ></input>
    <button onClick={(e)=>{
        
        add()
    }}>Add</button>
    {/* <button onClick={go()}>login</button> */}
</form>
{/* <Link class="item" to="/workerList">worker list</Link> */}
{/* <button onClick={go()}>workerlist</button> */}
</>);
}
export default AddRole;