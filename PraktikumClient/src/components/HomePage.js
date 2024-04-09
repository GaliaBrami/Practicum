import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as action from '../store/action';

const HomePage = () => {
    const passwordRedux = useSelector(state => state.password);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("https://localhost:7259/api/Managers")
            .then(response => {
                dispatch({ type: action.SET_PASSWORD, password: response.data[0]?.password || null });
            })
            .catch(error => {
                console.log("Error fetching managers:", error);
            });
    }, []);

    const handleLogin = () => {
        const isManager = password === passwordRedux;
        if (isManager) {
            navigate("/workerList");
        } else {
            alert("Invalid password!");
        }
    };

    const setNewPass = () => {
        axios.post("https://localhost:7259/api/Managers", { password })
            .then(response => {
                dispatch({ type: action.SET_PASSWORD, password: response.data ?.password })
            })
            .catch(error => {
                console.log("Error setting new password:", error);
            });
            navigate("/workerList");
    };

    return (
        <>
            <h1>Welcome to Worker Management App!!!</h1>
            {passwordRedux == null ?
                <Popup
                    trigger={<button className="button">Enter Password</button>}
                    modal
                    nested
                >
                    {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header">Password</div>
                            <div className="content">
                                <div>
                                    <input onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
                                </div>
                                <button onClick={setNewPass}>Set Password</button>
                            </div>
                        </div>
                    )}
                </Popup>
                :
                <Popup trigger={<button>Login</button>} position="right center">
                    <div>
                        {/* <input
                            type="text"
                            placeholder="Manager name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        /> */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </Popup>
            }
        </>
    );
};

export default HomePage;
