import React from 'react';
import '../styles/WorkerForm.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import * as action from "../store/action"
import { useDispatch, useSelector } from 'react-redux';

const schema = yup
  .object({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(2),
    identity: yup.string().required().min(9).max(9, "id has 9 digits!"),
    startDate: yup.date().required().min(yup.ref('birthDate')),
    birthDate: yup.date().required(),
    gender: yup.number().required(),
    status: yup.number(),
    roles: yup.array().of(
      yup.object().shape({
        id: yup.number(),
        name: yup.object().shape({
          id: yup.number(),
          name: yup.string()
        }),
        isManager: yup.boolean(),
        startDate: yup.date().min(yup.ref('startDate')),
      })
    ),
  })
  .required()
  ;

const WorkerForm = () => {
  const workerRedux = useSelector(x => x.worker)
  const [worker, setWorker] = useState(null);
  const [roles, setRoles] = useState([]);//all the existing roles
  const [prevRoles, setPRoles] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }, control
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      // id: workerRedux?.id,
      identity: workerRedux?.identity,
      firstName: workerRedux?.firstName,
      lastName: workerRedux?.lastName,
      birthDate: workerRedux?.birthDate?.split('T')[0],
      startDate: workerRedux?.startDate?.split('T')[0],
      gender: workerRedux?.gender,
      roles: workerRedux?.roles ? workerRedux.roles.map(role => ({
        id: role.id,
        name: { id: role.name.id, name: roles.find(r => r.id == role.name.id)?.name },
        isManager: role.isManager,
        startDate: role.startDate?.split('T')[0],
      })) : []
    },
  })

  useEffect(() => {

    axios.get("https://localhost:7259/api/Roles")
      .then(info => {
        console.log(info.data, "daratatrtra")
        setRoles(info.data);
      })
      .catch(err => console.log(err));
    console.log(workerRedux)
  }, []);

  const cancle = () => {
    dispatch({ type: action.SET_WORKER, worker: null })
    navigate("/workerList");
  }
  const onSubmit1 = (data) => {
    console.log(data)
    if (data.roles)
      data.roles.map(r => { r.id = 0; r.name.id = 0 });//roles.find(r1=>r1.name==r.name.name)?.id 
    // data.status = true;
    // data.id = 0;
    console.log(data)
    if (workerRedux) {

      // data.startDate=new Date(data.startDate).toISOString();
      // data.birthDate=new Date(data.birthDate).toISOString();
      axios.put(`https://localhost:7259/api/Worker/${workerRedux.id}`, data)
        .then(x => {
          dispatch({ type: action.EDIT_WORKER, worker: x.data })
          alert("worker edited succesfully");
          navigate('/workerList');
        })
        .catch(err => console.log(err))
    } else {
      axios.post("https://localhost:7259/api/Worker", data)
        .then(x => {
          dispatch({ type: action.ADD_WORKER, recipe: x.data })
          alert("worker added succesfully")
          navigate('/workerList');
        })
        .catch(err => console.log(err))
    }
  }

  const { fields: fieldsRoles, append: append, remove: remove, } = useFieldArray({
    control,
    name: "roles",
  });


  return (<>
    <button onClick={() => {
      dispatch({ type: action.SET_WORKER, worker: null });
      navigate("/addRole")
    }}> Add Role</button>

    <div className="worker-form-container">
      <h2 className="form-heading">{workerRedux ? 'Edit Worker' : 'Add Worker'}</h2>
      <form className='ui form' onSubmit={handleSubmit(onSubmit1)}>
        <div className="form-row">
          <label>First Name:</label>
          <input type="text" name="firstName" {...register("firstName")} //onChange={this.handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>Last Name:</label>
          <input type="text" name="lastName" {...register("lastName")} />
        </div>
        <div className="form-row">
          <label>Identity:</label>
          <input type="text" name="identity"{...register("identity")} />
        </div>
        <div className="form-row">
          <label>Starting Date:</label>
          <input type="date" name="startDate" {...register("startDate")} />
        </div>
        <div className="form-row">
          <label>Date of Birth:</label>
          <input type="date" name="birthDate" {...register("birthDate")} />
        </div>
        <div className="form-row">
          <label>Gender:</label>
          <select name="gender" {...register("gender")} >
            <option value="">Select Gender</option>
            <option value={0}>Male</option>
            <option value={1}>Female</option>
          </select> <hr></hr>
        </div>
        <div className="form-row">
          {/* {fieldsRoles.map((field, index) => (
            <div className="ui grid" key={index}>
              <label>Role Name:</label>
              <div className="four wide column">
                <select
                  name={`roles[${index}].name.name`}
                  defaultValue={field.name}
                  ref={register()}
                  {...register(`roles[${index}].name.name`)}
                >
                  <option value="">Select Role Name</option>
                  {roles.map((r, innerIndex) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="four wide column">
                <label htmlFor={`isManager-${index}`}>Manager</label>
                <input
                  type="checkbox"
                  id={`isManager-${index}`}
                  name={`roles.${index}.isManager`}
                  {...register(`roles.${index}.isManager`)}
                  value="true"
                />
                <input type="hidden" value="false" {...register(`roles.${index}.isManager`)} />
                <p>{errors.roles?.[index]?.isManager?.message}</p>
              </div>
              <div className="four wide column">
                <label>Start Working Date:</label>
                <input
                  {...register(`roles.${index}.startDate`)}
                  placeholder="startDate"
                  type="date"
                />
                <p>{errors.roles?.[index]?.c?.message}</p>
              </div>
              <div className="four wide column">
                <button
                  type="button"
                  className="ui button"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </div>
              <hr />
            </div>
          ))} */}

          {fieldsRoles.map((field, index) => (
            <div className="ui grid">
              <label>Role Name:</label>
              <div className="four wide column">
                <select  name={`roles[${index}].name.name`}
        defaultValue={field.name}
        ref={register()} {...register(`roles[${index}].name.name`)} >
                  <option value="">Select Role Name</option>
                  {roles.map((r, index) => (
                    <option key={r.id} value={r.name}>{r.name}</option>
))}

                </select>
              </div>
              <div className="four wide column">
                      <label for="cM">Manager</label>
                        <input type='checkbox' id="cM" name='cM' {...register(`roles.${index}.isManager`)} value="true" />
                        <p>{errors.roles?.[index]?.a?.message}</p>
                    </div>
              
              <div className="four wide column">
                <label>Start Working Date:</label>
                <input {...register(`roles.${index}.startDate`)} placeholder="startDate" type='date' />
                <p>{errors.roles?.[index]?.c?.message}</p>

              </div><div className="four wide column">
              <button type='button' className="ui button" onClick={() => remove(index)}> delete</button>
              </div><hr />
            </div>
          ))}
          <button type="button" class="ui button" onClick={()=>{append({id:0,name:{id:0,name:""},isManager:false,startDate:""})}}> add Role</button><br /><br />
        </div><br></br>
        <div className="form-buttons">
          <input className="save-button ui button" type="submit" value="Save"></input>
          <button className="cancel-button" onClick={cancle}>Cancle</button>
        </div>
      </form>

    </div></>
  );

}

export default WorkerForm;
