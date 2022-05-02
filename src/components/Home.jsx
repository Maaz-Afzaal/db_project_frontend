import {useNavigate} from "react-router-dom"

const Home=()=>{
    const navigate=useNavigate();
    return(
        <div className="homeContainer d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div className="btn btn-primary me-2" onClick={()=>{
                navigate("/signup");
            }}>
                    Signup
            </div>
            <div className="btn btn-warning ms-2" onClick={()=>{
                navigate("/login");
            }}>
                    Login
            </div>
        
            
        </div>
    );
}

export default Home;