import React,{useState,useEffect} from "react";
import { getData } from "./api";

const Assignment=(props)=>{

    const [insert,setInsert]=useState(false);
    const [assignmentDetails,setAssignmentDetails]=useState("");
    const [isProject,setIsProject]=useState(false);
    const [subjectName,setSubjectName]=useState("")
    const [sec_id,setSectionId]=useState(props.allSections[0].sec_id);
    const [allSections,setAllSections]=useState(props.allSections);
    const [allAssignments,setAllAssignments]=useState([]);
    const [error,setError]=useState("")
    const handleAssignmentSubmit=async (e)=>{
        e.preventDefault();
        const {result,error}=await getData(`/insertassignment`,"POST",{
            assigned_by:props.userData.p_id,
            is_project:isProject,
            details:assignmentDetails,
            subject_name:subjectName,
            sec_id:sec_id,
        })
        if(error){
            setError(JSON.stringify(error))
        }
        else if(result){
            setError("Assignment Added Succesfuly");
        }
    }
    const getAssignments=async ()=>{
        const {result,error}=await getData(`/getasignments/${props.userData.p_role=="teacher"?props.userData.p_id:props.userData.sec_id}?role=${props.userData.p_role}`,"GET");
        if (error){
            setError(JSON.stringify(error));
        }
        else if(result){
            setAllAssignments(result);
            console.log(result.message);
        }
    }
    useEffect(()=>{
        getAssignments();
    },[])
    return(
        <>
            {props.isTeacher && <>
                <div>
                    <div className="btn btn-warning " onClick={()=>{setInsert(true)}}>Insert Assignment</div>
                    <div className="btn btn-warning ms-3" onClick={()=>{setInsert(false)}}>See Assignments</div>
                </div>
                
            </>}
            {
                    insert && props.isTeacher && <>
                          <form onSubmit={(e)=>{handleAssignmentSubmit(e)}}>
                    <label>Insert Details</label>
                    <input type={"text"} onChange={(e)=>{
                        setAssignmentDetails(e.target.value)
                    }}/>
                    <label>Subject Name</label>
                    <input type={"text"} onChange={(e)=>{
                        setSubjectName(e.target.value)
                    }}/>
                    <label>Is Project?</label>
                    <input value={isProject} onChange={(e)=>setIsProject(!isProject)} type={"checkbox"}/>
                    <label className="m-3">Select Section
                          <select name="section" id="section" 
                          onChange={(e)=>{
                     
                               setSectionId(e.target.value);
                            }}>
                                {allSections.map((sec,i)=>{
                                    return(
                                        <>
                                            {allSections.length==0 && <input disabled={true} placeholder="no section in Database"/>}
                                            {allSections.length>=1 && <option value={sec.sec_id}>{sec.sec_name}({sec.session})</option>}
                                        </>
                                    )
                                })}
                            
                                </select></label>
                    <button className="btn btn-warning" type="submit">Submit</button>
                </form>
                    </>
                }
                {!insert && <>
                <div>
                    {allAssignments?.message?.length>0 && allAssignments?.message?.map((ass,i)=>{
                        return(
                            <div className="border m-3 border-primary">
                                {ass.is_project && 
                                    <h3>Project</h3>
                                }
                                <div>
                                    <b>Subject Name:</b>{ass.subject_name}
                                </div>
                                <div>
                                    <b>Details:</b>{ass.details}
                                </div>

                            </div>
                        )
                    })}
                </div>
                </>}
                 {
                error &&  <div className="border border-danger mt-3" style={{color:"red"}}>
                {error}</div>
            }
        </>
    )
}
export default Assignment;