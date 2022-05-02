import React,{useState,useEffect} from "react";
import { getData } from "./api";

const ToDo=(props)=>{
    const [todoDetails,setToDODetails]=useState("");
    const [todoDate,setToDODate]=useState(null);
    const [insert,setInsert]=useState(false);
    const [todoList,setTodoList]=useState([]);
    const [error,setError]=useState("")
    const handleToDoSubmit=async (e)=>{
        e.preventDefault();
        const {result,error}=await getData("/inserttodo","POST",{p_id:props.userData.p_id,details:todoDetails,date:todoDate});
        if(error){
            setError(JSON.stringify(error));
        }
        else if(result){
            setError("Todo added Successfuly");
        }
    }
    const getTodo=async ()=>{
        const {result,error}=await getData(`/gettodo/${props.userData.p_id}`,"GET");
        if(error){
            setError(JSON.stringify(error));
        }
        else if(result){
            setTodoList([...result.message]);
        
        }
    }
    useEffect(()=>{
        setError("")
        getTodo();
    },[insert])
    return(
        <>
            
            <div className="btn btn-warning " onClick={()=>{setInsert(true)}}>Insert Todo</div>
        <div className="btn btn-warning ms-3" onClick={()=>{setInsert(false)}}>See Todo</div>
        {
            insert && <>
                <form onSubmit={(e)=>{handleToDoSubmit(e)}}>
                    <label>Insert Details</label>
                    <input type={"text"} onChange={(e)=>{
                        setToDODetails(e.target.value)
                    }}/>
                    <label>Date</label>
                    <input type={"date"} onChange={(e)=>{
                        setToDODate(e.target.value)
                    }}/>
                    <button className="btn btn-warning" type="submit">Submit</button>
                </form>
            </>
        }
        {
            !insert && <>
                <div className="row ">
                    {todoList.length>0 && todoList.map((todo,i)=>{
                        return(
                            <>
                                <div className="m-3 border border-primary d-flex flex-column">
                                    <b>Details:</b>{todo.details}
                                    <b>Date:</b>{todo.todo_date.slice(10)}
                                </div>
                            </>
                        )
                    })}
                    {todoList.length===0 && <div>Nothing to Show</div>}
                </div>
            </>
        }
         {
                error &&  <div className="border border-danger mt-3" style={{color:"red"}}>
                {error}</div>
            }
        
        </>
          
                         
        
            

    )
}
export default ToDo;