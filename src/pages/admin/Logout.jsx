import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//import {useNavigate} from "react-router";
import { useHistory } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";
import { SET_LOGIN, SET_LEVEL } from "../../store/adminReducer";
import crypto from "crypto";
import {
    Form,
    Modal,
    Row,
    Col,
    Container,
    Button,
    DropdownButton,
    Dropdown,
    ListGroup,
  } from "react-bootstrap";
import { prependOnceListener } from "process";
import { propTypes } from "react-bootstrap/esm/Image";

const Logout=()=>{
    const history = useHistory();
    const secret ="ESREVMETI"
    //const navigate = useNavigate();
    const dispatch = useDispatch();
    const [account, setaccount]=useState('');
    const [password, setpass]=useState('');
    

    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const account = localStorage.getItem('account');
        axios.delete(`${API.API_ADMIN_LOGOUT}/${account}/${token}`).then((resp)=>{
            if(resp){
                localStorage.clear();
                dispatch({ type: SET_LOGIN, payload: { value: false } });
                history.push("/");
            }
        })
    }, [])



return(
    <>

    </>
)
}
export default Logout;