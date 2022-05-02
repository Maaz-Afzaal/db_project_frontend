import React,{useState,useEffect} from "react";
import { getData } from "./api";
import {useNavigate} from "react-router-dom";
const Signup=()=>{
    const navigate=useNavigate();
    const [signupAs,setSignupAs]=useState("teacher");
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:"",
    })
    const [secList,setSectionList]=useState([])
    const [teacherSignupValues,setTeacherSignupValues]=useState({
        sec_name:"",
        session:"",
    });
    const [studentSignupValues,setStudentSignupValues]=useState({
        roll_number:"",
        sec_id: ""
    })
    
    const [error,setError]=useState("")
    useEffect(()=>{
        getSection();
    },[signupAs])
    const getSection=async ()=>{
        
        const {result,error}=await getData("/getsection","GET",{})
        if(error){
            alert("failed to get section list");
        }
        else{
            setStudentSignupValues({...studentSignupValues,sec_id:result.message[0].sec_id})
            setSectionList([...result.message])
        }
        
    }
    const submitSignupForm=async (e)=>{
        e.preventDefault();
        const body={
            role:signupAs,
            name:values.name,
            email:values.email,
            password:values.password,
            sec_name:[teacherSignupValues.sec_name],
            session:[teacherSignupValues.session],
            sec_id:studentSignupValues.sec_id,
            roll_number:studentSignupValues.roll_number
        }
        const {result,error}=await getData("/signup","POST",body)
        if(error){
            setError(error.err)
        }
        else if(result){
            setError("");
            
            alert("You have signedup successfuly.Please login to use this app.");
            navigate("/login");
        }
        console.log(secList,"signupAs",values);
        console.log(teacherSignupValues,"values",studentSignupValues);
    }
    return(
        <>
            <div className="signupContainer">
                <div className="topBar w-100 d-flex justify-content-center mt-5">
                    <div className={`btn ${signupAs==="teacher"?"btn-warning":"border border-warning"}`}
                    onClick={()=>{
                        setSignupAs("teacher");
                    }}
                    >Signup As Teacher</div>
                    <div className={`btn ms-2 ${signupAs==="student"?"btn-warning":" border border-warning"}`}
                    onClick={()=>{
                        setSignupAs("student");
                    }}
                    >Signup As Student</div>
                </div>
                <div className="signupPageContent">
                    <form onSubmit={(e)=>{submitSignupForm(e)}} className="d-flex flex-column">
                        <label className="m-3">
                            Name:
                            <input onChange={e=>
                                setValues({...values,name:e.target.value})
                            }></input>
                        </label>
                        <label  className="m-3">
                            Email:
                            <input onChange={e=>
                                setValues({...values,email:e.target.value})
                            }></input>
                        </label>
                        <label  className="m-3">
                            Password:
                            <input type="password" onChange={e=>
                                setValues({...values,password:e.target.value})
                            }></input>
                        </label>
                        {
                            signupAs==="teacher" && <>
                                <label  className="m-3">
                            Section Name:
                            <input onChange={e=>{
                              
                                setTeacherSignupValues({...teacherSignupValues,sec_name:e.target.value});
                            }
                            }></input>
                        </label>
                        <label  className="m-3">
                            Session:
                            <input type="number" onChange={e=>{
                            
                                setTeacherSignupValues({...teacherSignupValues,session:e.target.value});
                            }
                            }></input>
                        </label>
                            </>
                        }
                        {
                            signupAs=="student" && <>
                             <label className="m-3">
                            Roll Number:
                            <input onChange={e=>{
                               setStudentSignupValues({...studentSignupValues,roll_number:e.target.value})
                            }
                            }></input>
                            <label className="m-3">Select Section<select name="section" id="section" onChange={(e)=> setStudentSignupValues({...studentSignupValues,sec_id:e.target.value})}>
                                {secList.map((sec,i)=>{
                                    return(
                                        <>
                                            {secList.length==0 && <input disabled={true} placeholder="no section in Database"/>}
                                            {secList.length>=1 && <option value={sec.sec_id}>{sec.sec_name}({sec.session})</option>}
                                        </>
                                    )
                                })}
                            
                                </select></label>
                            
                        </label>
                            </>
                        }
                        <button className="btn btn-warning m-2" style={{width:"fit-content"}} type="submit">Signup</button>
                    </form>
                    {error}
                </div>
            </div>
        </>
    )
}

export default Signup;