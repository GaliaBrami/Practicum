import { useDispatch, useSelector } from "react-redux";
// import * as actions from '../../store//action.js'
import axios from "axios";
import { Link } from "react-router-dom";


const WorkerDetails = () => {
    // const dispatch = useDispatch();?????????????????????
    const worker = useSelector(state => state.workerToShow);
    // console.log(worker," dcfgbhjkl")
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
                {worker?.roles?.map((i) => (
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