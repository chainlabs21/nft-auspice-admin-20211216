import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import logo from "../../img/logo.png"
import axios from "axios";
import { API } from "../../utils/api";
import { SET_LOGIN, SET_LEVEL } from "../../store/adminReducer";
import crypto from "crypto";
import styled from "styled-components";
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
    const secret ="ESREVMETI"
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

    const AdminLogin= ()=>{
        if (account && password){}else{alert('정보 없음');return;}
        try{
            const pwhash = crypto.createHmac('sha256', secret).update(password).digest('hex');
            console.log(pwhash)
            let data = {account: account, hashpassword: pwhash};
            console.log(data)
            axios.post(API.API_ADMIN_LOGIN, data)
            .then(res=>{
                console.log(res);
                if (res.data.status=="OK"){
                    console.log("res.data.accessToken : "+ res.data.payload);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.payload;
                    localStorage.setItem('token', res.data.payload);
                    localStorage.setItem('account', res.data.account);
                    //localStorage.setItem('account') = 
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
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const account = localStorage.getItem('account');
        axios.get(`${API.API_ADMIN_LOGIN}/${account}/${token}`).then((res)=>{
            let{resp} = res.data
            if(resp){
                console.log(resp)
                dispatch({ type: SET_LOGIN, payload: { value: true } });
            }
        })
    }, [])



return(
    <>
    <LoginComp>
    <div className="Holder">
    <h1 className="title"><img src={logo} /></h1>
    <div className="Account">
    <p className="accounttitle">Account ID *</p>
    <input
    onChange={(e) => setaccount(e.target.value)} value={account}
/>
</div>
<div className="Password">
    <p className="passwordtitle">Password</p>
    <input
    onChange={(e) => setpass(e.target.value)} value={password}
    type='password'
/>
</div>
    {/* <Form style={{width:'600px', margin: 'auto auto', margintop:'100px'}}>
    <h1 className="title">관리자 로그인 패널</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="username" placeholder="Enter Account" onChange={(e) => setaccount(e.target.value)} value={account} style={{width:'400px', float:'right'}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" onChange={(e) => setpass(e.target.value)} value={password} style={{width:'400px'}}/>
        </Form.Group>

        <Button variant="primary" onClick={()=>{AdminLogin()}}>
            Submit
        </Button>
        
    </Form> */}
    <button
            className="Btn"
            onClick={()=>{AdminLogin()}}
        >
            Submit
        </button>
    
        </div>
        </LoginComp>
    </>
)
}
const LoginComp = styled.div`
display: flex;
width: 100vw;
height: 100vh;
justify-content: center;
align-items: center;
background-color: #fff;

.Holder{
    display: flex;
    width: 576px;
height: 672px;
background: #FFFFFF;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
border-radius: 12px;
//justify-content: center;
align-items: center;
flex-direction: column;
padding-top: 100px;
.title{
    display: flex;
    width: 100%;
    //margin-left: 100px;
    justify-content: center;
align-items: center;
margin-bottom: 100px;
    
}

.Account{
    .accounttitle{
        padding: 0;
        margin: 0;

    }
}

.Account{
    .accounttitle{
        padding: 0;
        margin: 0;
        padding-bottom: 10px;

    }
}

.Password{
    .passwordtitle{
        padding: 0;
        margin: 0;
        margin-top: 20px;
        padding-bottom: 10px;
    }
}

input{
    border-radius: 6px;
    padding: 5px;
    border: 1px solid #D9D9D9;
    border-radius: 8px;
    width: 440px;
height: 48px;
}
/* button{

    display: flex;
    
    justify-content: flex-end;
    align-items: right;
    
} */
.Btn{
    margin-top: 30px;
    width: 440px;
height: 52px;

background: #353535;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
border-radius: 30px;
color: #fff;
display: flex;
justify-content: center;
line-height: 52px;
}

}

`;
export default Login;