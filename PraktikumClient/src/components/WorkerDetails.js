import { useDispatch, useSelector } from "react-redux";
// import * as actions from '../../store//action.js'
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const WorkerDetails = () => {
    // const dispatch = useDispatch();?????????????????????
    const worker = useSelector(state => state.workerToShow);
    // console.log(worker," dcfgbhjkl")
    const [rols,setRols]=useState([]);
    // console.log(worker," dcfgbhjkl")
    // אובייקט ריק שיהיה המילון
    useEffect(() => {
var objectsDictionary = {};

// מעבר על המערך ומציב את האיבר האחרון שנפלט לפי שם האובייקט במילון
worker.roles.forEach(obj => {
    objectsDictionary[obj.name.name] = obj;
});

// יצירת מערך מערכים עם הערכים של המיל
setRols(Object.values(objectsDictionary));
        
      }, []);
    return (
        <div className="" key={worker?.Id}>
            <Link class="item" to="/workerList">worker list</Link>

            <h1>Worker Name: {worker?.firstName} {worker.lastName}</h1>
            <h2>Identity: {worker.identity}</h2>
            <h2>{worker.gender ? "Female" : "Male"}</h2>
            <h2>Birth Date: {worker.birthDate.split('T')[0]}</h2>
            <h2>Start Working Date: {worker.startDate.split('T')[0]}</h2>
            <h3>Roles:</h3>
            <ul>
                {rols.map((i) => (
                    <li>
                        {i.name.name} {i.isManager?"Manager":"not Manager"} {i.startDate.split('T')[0]}
                    </li>
                ))}</ul>

            <button class="ui button" onClick={() => {
                window.print();
            }}>
                print<i class="print icon"></i>
            </button>
        </div>
    );

}

export default WorkerDetails;