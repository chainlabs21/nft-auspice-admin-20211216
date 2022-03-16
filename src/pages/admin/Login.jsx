import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";
import { SET_LOGIN, SET_LEVEL } from "../../store/adminReducer";
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

const Login=()=>{
    const dispatch = useDispatch();
    const [account, setaccount]=useState('');
    const [password, setpass]=useState('');

    /*useEffect(async ()=>{
        console.log("onload asdadsasdas"+axios.defaults.headers.common['Authorization'])
        await axios.get(API.API_ADMIN_CHECK)
        .then((resp) => {
            let { status } = resp.data;
            console.log(resp.data)
            if (resp.data.message == 'PLEASE-LOGIN'){
                dispatch({ type: SET_LOGIN, payload: { value: false } });
              console.log('로그인되어있지아니함')
            }else{
                dispatch({ type: SET_LOGIN, payload: { value: true } });
              console.log('로그인 되어 있음')
            }
        
        }
        )

    },[])*/

    const AdminLogin=()=>{
        if (account && password){}else{alert('정보 없음');return;}
        try{
            let data = {account: account, hashpassword: password};
            console.log(data)
            axios.post(API.API_ADMIN_LOGIN, data)
            .then(res=>{
                console.log(res);
                if (res.data.status=="OK"){
                    console.log("res.data.accessToken : "+ res.data.respdata);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.respdata;
                    
                    dispatch({ type: SET_LEVEL, payload: {value: res.data.data}})
                    dispatch({ type: SET_LOGIN, payload: { value: true } });
                    //console.log("asdadsasdas"+axios.defaults.headers.common['Authorization'])
                }
            })
            .catch(err=>{
                console.log('failed: '+err)
            })
        }catch(e){
            console.log('Failed on post request with : '+e)

        }
    }



return(
    <>
    <div>
    <Form style={{width:'600px', margin: 'auto auto', margintop:'100px'}}>
    <h1>관리자 로그인 패널</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Account:  </Form.Label>
            <Form.Control type="username" placeholder="Enter Account" onChange={(e) => setaccount(e.target.value)} value={account} style={{width:'400px', float:'right'}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setpass(e.target.value)} value={password} style={{width:'400px'}}/>
        </Form.Group>
        <Button variant="primary" onClick={()=>{AdminLogin()}}>
            Submit
        </Button>
    </Form>
    
        <button onClick={()=>{dispatch({ type: SET_LOGIN, payload: { value: true } });}}>로그인</button>
        <button onClick={()=>{dispatch({ type: SET_LOGIN, payload: { value: false} });}}>로그아웃</button>
        </div>
        <h3>레벨 3 계정 admin00<br /> 레벨 2 계정 admin01<br /> 이슈: 레벨 별 보여야 하는 항목 필요</h3>
    </>
)
}
export default Login;