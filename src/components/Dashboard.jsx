import { Navigate, useNavigate, useParams } from "react-router-dom"
import React,{useState,useEffect} from "react";
import { getData } from "./api";
import Schedule from "./Schedule";
import ToDo from "./ToDo";
import Assignment from "./Assignment";
const Dashboard=()=>{
    const [userData,setUserData]=useState();
    const [isTeacher,setIsTeacher]=useState(false);
    const [currentState,setCurrentState]=useState(AppState.SCHEDULE);
    const [section,setSection]=useState({});
    const [allSections,setAllSections]=useState();
    const [loading,setLoading]=useState(true);
    const params=useParams();
    const [error,setError]=useState("");
    const navigate=useNavigate();
   
    const getSection=async ()=>{
        
        const {result,error}=await getData("/getsection","GET",{})
        if(error){
           setError("Failed to fetch Section List")
           navigate("/")
        }
        else if(result){
           setAllSections(result.message);
            result.message.length > 0 && userData?.sec_id && result.message.map((sec,i)=>{
                if(sec.sec_id==userData.sec_id){
                    setSection({...section,sec_name:sec.sec_name,session:sec.session});
                }
            })
        }
        setLoading(false)
    }

   
    useEffect(()=>{
        const userDataInLocal=JSON.parse(localStorage.getItem("userData"));
        setUserData(userDataInLocal);
            if(!userDataInLocal){
                alert(userDataInLocal)
                navigate("/login")
            }
            else{
                
                if(userDataInLocal.p_role==="teacher"){
                    getSection(); 
                    setIsTeacher(true);
                }
            }
     
    },[])
    // useEffect(()=>{
    //     getSection(); 
    // },[])
    if(loading){
        return(
            <>
            </>
        )
    }
    return(
        <div className="dashboardContainer d-flex">
            <div className="sideBar p-4" style={{width:"400px",background:"DimGray",height:"100vh",borderRight:"1px white solid"}}>
               <div className="about">
                    <div className="name bold whiteText">
                        {userData?.name} ({userData?.p_role})
                    </div>
                    <div className="email bold whiteText">
                        {userData?.email}
                    </div>
                    
                </div>
                <div className="tabs">
                    <div className="section">
                        {
                            !isTeacher && <>
                                <div className="bold whiteText pointer" onClick={()=>{
                                setCurrentState(AppState.SCHEDULE)
                            }}>
                            Section:
                        </div>
                        {section.sec_name}({section.session})
                            </>
                        }
                        {
                            isTeacher && <>
                            <div className="bold whiteText pointer" onClick={()=>{
                                setCurrentState(AppState.SCHEDULE)
                            }}>
                            Schedule
                        </div>
                            </>
                        }
                        
                    </div>
                    <div className="bold whiteText pointer" onClick={()=>{
                                setCurrentState(AppState.TODO);
                            }}>
                            To Do
                    </div>
                    <div className="bold whiteText pointer" onClick={()=>{
                                setCurrentState(AppState.ASSIGNMENT);
                            }}>
                            Assignment
                    </div>
                   
                </div>
            </div>  
            <div className="rightSide">
                {
                    currentState===AppState.SCHEDULE && <>
                    <Schedule isTeacher={isTeacher} userData={userData} allSections={allSections}/>
                    </>
                }
                {
                    currentState===AppState.TODO && <>
                    <ToDo isTeacher={isTeacher} userData={userData} allSections={allSections}/>
                    </>
                }
                 {
                    currentState===AppState.ASSIGNMENT && <>
                    <Assignment isTeacher={isTeacher} userData={userData} allSections={allSections}/>
                    </>
                }
            {error}
            </div>
            
            </div>  

    )
};

export class AppState{
    static SCHEDULE="schedule";
    static TODO="todo";
    static ASSIGNMENT="assignment";
}

export default Dashboard;