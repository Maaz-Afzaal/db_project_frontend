import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from './api';
const Login=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    
    const submitLoginForm=async (e)=>{
        e.preventDefault();
        const {result,error}=await getData("/login","POST",{email,password,});
        if(error){
            setError(error.message)
        }
        else{
            console.log(result)
            localStorage.setItem('userData', JSON.stringify(result.message[0]));
            navigate("/dashboard")
        }
    }
    return(
        <>
             <form onSubmit={(e)=>{submitLoginForm(e)}} className="d-flex flex-column">
                       
                        <label  className="m-3">
                            Email:
                            <input onChange={e=>
                                setEmail(e.target.value)
                            }></input>
                        </label>
                        <label  className="m-3">
                            Password:
                            <input type="password" onChange={e=>
                                setPassword(e.target.value)
                            }></input>
                        </label>
                        <button className="btn btn-warning m-2" style={{width:"fit-content"}} type="submit">Log in</button>
                </form>
                <div>{error && <>Wrong Email or Password</>}</div>
        </>
    )
}
export default Login;