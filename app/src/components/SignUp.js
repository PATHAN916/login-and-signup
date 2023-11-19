import React, { useRef } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';

function SignUp() {
let nameInputRef=useRef();
let emailInputRef=useRef();
let passwordInputRef=useRef();

let dataFromServer=async()=>{
axios.defaults.baseURL="http://localhost:1234";
let dataToSend=new FormData();
dataToSend.append("name",nameInputRef.current.value);
dataToSend.append("email",emailInputRef.current.value);
dataToSend.append("password",passwordInputRef.current.value);

let response= await axios.post("/signup",dataToSend);
console.log(response);
alert(response.data.msg)


}
  return (
    <div className='App'>
        <form>
        <div>
            <label>name</label>
            <input ref={nameInputRef}></input>
        </div>
        <div>
            <label>email</label>
            <input ref={emailInputRef}></input>
        </div>
        <div>
            <label>password</label>
            <input ref={passwordInputRef}></input>
        </div>
        <div>
            <button type='button' onClick={()=>{dataFromServer();}}>submit</button>
        </div>

        <Link to="/login">Login</Link>
        </form>
        
    </div>
  )
}

export default SignUp