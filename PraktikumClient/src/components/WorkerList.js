import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/WorkerList.css';
import { FaTrash, FaEdit, FaPlus, FaRegEye } from 'react-icons/fa'; // Import icons for delete, edit, and add
import axios from 'axios';
// import actions from "../store/index"
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../store/action';
// ייבוא הספרייה
import * as XLSX from 'xlsx';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

const WorkerList = () => {
  const workers=useSelector(x=>x.workers);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [activeWorkers, setActiveWorkers] = useState([]);
  const [isAddingOrEditing, setAorE] = useState(false);
  const [editingWorker, setE] = useState(null);
  const [roles, setRoles] = useState([]);
  const [roleToSearch, setRoleToSearch] = useState({});
  const navigator = useNavigate();
  const dispatch = useDispatch();
//   const deleteUser=(id)=>{
//   axios.put(`https://localhost:7259/api/Worker/status/${id}`).then(info=>
//                   dispatch({ type: action.EDIT_WORKER, worker: info }))
// }
//===========================================
// const workers = useSelector(x => x.workers);
// const [activeWorkers, setActiveWorkers] = useState([]);
// const [filteredWorkers, setFilteredWorkers] = useState([]);
const [filterRole, setFilterRole] = useState('');
const [filterName, setFilterName] = useState('');
const [filterIdentity, setFilterIdentity] = useState('');
// const [filterIsManager, setFilterIsManager] = useState('');

useEffect(() => {
  setActiveWorkers(workers.filter(worker => worker.status));
}, [workers]);

useEffect(() => {
  let filtered = activeWorkers.filter(worker => {
    // Apply filters based on the filter values
    let match = true;
    if (filterRole) {
      match = match && worker.roles.some(role => role.name.name === filterRole);
    }
    if (filterName) {
      match = match && worker.firstName.toLowerCase().includes(filterName.toLowerCase());
    }
    
    if (filterIdentity) {
      match = match && worker.identity.toLowerCase().includes(filterIdentity.toLowerCase());
    }
    // if (filterIsManager !== '') {
    //   match = match && worker.roles.some(r=>r.isManager === filterIsManager);
    // }
    return match;
  });
  setFilteredWorkers(filtered);
}, [activeWorkers, filterRole, filterName, filterIdentity]);
//=========================================================
  useEffect(() => {

    axios.get("https://localhost:7259/api/Worker")
      .then(info => {
        // console.log(info.data, "daratatrtra")
        dispatch({ type: action.SET_WORKERS, workers: info.data })
        // console.log(workers)
        setActiveWorkers(workers.map(w=>w.status==true))
        setFilteredWorkers(activeWorkers);
      })
      .catch(err => console.log(err));

      axios.get("https://localhost:7259/api/Roles")
      .then(info => {
        setRoles(info.data);
        if(info.data.length==0)
          navigator("/addRole")
        const uniqueRoles=[];
        roles.forEach(role => {
          if (!uniqueRoles.some(r => r.name === role.name)) {
              uniqueRoles.push(role);
          }
          setRoles(uniqueRoles)
      });
      })
      .catch(err => console.log(err));
 
  }, []);
    useEffect(() => {

      setActiveWorkers(workers.filter(w=>w.status==true))
 
  }, [workers]);
  useEffect(() => {
    if(roleToSearch!=""){const filtered = activeWorkers.filter(w => {
      return w.roles && w.roles.some(r => r.name === roleToSearch);
    });
    setFilteredWorkers(filtered);}
    else
    setFilteredWorkers(activeWorkers)
  }, [workers, roleToSearch]);
const search=()=>{
  const x=workers.map(w=>{w.roles?.some(r=>r.name==roleToSearch)})
  setFilteredWorkers(x)
}


const formatDatatoExcel = (employees) => {
  return employees.map(employee => (
      {
          FirstName: employee.firstName,
          LastName: employee.lastName,
          Identity: employee.identity,
          StartDate: employee.startDate,
      }
  ));
};

const exportToExcel = () => { // Pass workers as a parameter
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');
  const headers = [ 'First Name', 'Last Name', 'Identity', 'Start Date'];
  worksheet.addRow(headers)
  const rows = formatDatatoExcel(activeWorkers);
  console.log(rows);
  rows.forEach(i=>{
    worksheet.addRow(Object.values(i))
  })
  workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      saveAs(blob, `employees_${new Date().toISOString().split(['T'][0])}.xlsx`)
  })
}

  return (<>
    <div className="worker-table-container">
      <h2 className="table-heading">Worker Table</h2>
      <div className="filter-controls">
          <input type="text" placeholder="Filter by name" value={filterName} onChange={e => setFilterName(e.target.value)} />
          <input type="text" placeholder="Filter by identity" value={filterIdentity} onChange={e => setFilterIdentity(e.target.value)} />
          <select value={filterRole} onChange={e => setFilterRole(e.target.value)}>
            <option value="">Filter by role</option>
            {roles.map((r,index)=>(
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
            {/* Render options for roles */}
          </select>
          {/* <select value={filterIsManager} onChange={e => setFilterIsManager(e.target.value)}>
            <option value="">Filter by manager</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select> */}
        </div>
      <div class="ui list">
        {/* <select class="ui dropdown" name="selectByRole" defaultValue="selectByRole" onChange={(e) => {setRoleToSearch(e.target.value);}}>
            <option value="" >select Role</option>
            
                {roles.map((r,index)=>(
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}

            
        </select> */}
        {/* <select class="ui dropdown" name="selectDuration" onChange={(e) => setTime(e.target.value)}>
            <option value="" >select duration</option>
            {durations?.map((d) => (
                <option key={d.id} value={d.id}>
                    {d.value}
                </option>
            ))}
        </select>
        <select class="ui dropdown" name="select difficulty" onChange={(e) => setLevel(e.target.value)}>
            <option value="" >select difficulty</option>
            {difficulties?.map((d) => (
                <option key={d.id} value={d.id}>
                    {d.value}
                </option>
            ))}
        </select> */}
        </div>
        
      <table className="worker-table">
        <thead>
          <tr>
            <th>Details</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Identity</th>
            <th>Starting Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkers.map(worker => (///?filtered
            worker?.status==true?
            <tr key={worker.id}>
              <td  onClick={()=>{
              console.log(worker);
              dispatch({type:action.SET_W_TO_SHOW,w:worker});navigator("/workerDetails")}}
              ><FaRegEye /></td>
              <td>{worker.firstName}</td>
              <td>{worker.lastName}</td>
              <td>{worker.identity}</td>
              <td>{worker.startDate.split('T')[0]}</td>
              {/* הוספת תפקיד לעובד */}
              <td><FaEdit onClick={() => {
                dispatch({ type: action.SET_WORKER, worker: worker });
                navigator(`/workerForm`)
              }} /></td>
              <td><FaTrash onClick={() => {
                axios.put(`https://localhost:7259/api/Worker/status/${worker.id}`).then(info=>{
                  dispatch({ type: action.EDIT_WORKER, worker: info.data });
                  // console.log(info.data)
                }) 
                }} />
              </td>
            </tr>:null
          ))}
        </tbody>
      </table>
      <div className="action-buttons">
        
        <button onClick={() => {
          dispatch({ type: action.SET_WORKER, worker: null });
          navigator("/workerForm")}}><FaPlus /> Add Worker</button>
        <button onClick={() => {
          dispatch({ type: action.SET_WORKER, worker: null });
          navigator("/addRole")}}><FaPlus /> Add Role</button>

        <button onClick={()=>{exportToExcel()}}>export to Excel</button>
      </div>
    </div>
  </>);
};

export default WorkerList;



//טופס שמירה =====vv
//ועריכה 
//סינונים===========vvv
//הוספת תפקיד==================v^v
//הוספת מנהל?vvv
///הצגת פרטי עובד=========vvv
//עיצוב
//ולידציות טופס=====vv

// 