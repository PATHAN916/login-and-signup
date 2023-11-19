import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

function Login() {
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
   let navigate=useNavigate();


let dataToServerLogin=async()=>{
    axios.defaults.baseURL="http://localhost:1234";
    let dataToSend=new FormData();
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value)

let response= await axios.post("/login",dataToSend)
console.log(response)
alert(response.data.msg)

if(response.data.status==="success"){
navigate("/home")
}
}

  return (
    <div className='App'>
        <form>
        <div>
            <label>email</label>
            <input ref={emailInputRef}></input>
        </div>
        <div>
            <label>password</label>
            <input ref={passwordInputRef}></input>
        </div>
        <div>
            <button type="button" onClick={()=>{dataToServerLogin()}}>submit</button>
        </div>
        <Link to="/">SignUp</Link>
        </form>
     
    </div>
  )
}

export default Login