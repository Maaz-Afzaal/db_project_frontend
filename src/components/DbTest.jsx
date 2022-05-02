import React,{useState} from "react";

export const api=async (path,method,body)=>{
	
	try {
		let headers={};
		
			headers={
				"Content-Type": "application/json",
				"Accept": "application/json",
			};
		const response = await fetch(`localhost:8000/${path}`, {
			method: `${method}`,
			headers: headers,
			body: `${method==="GET"?null:JSON.stringify(body)}`
		});
		const json = await response.json();
		if(response.ok){
			return {result:json};
		}
	
		return {error:json};
	} catch (error) {
		return {error,};
	}
};

const DbTest=()=>{
    const [name,setName]=useState('');
    const [countryName,setCountryName]=useState('');
    const [travellerData,setTravellerData]=useState('');
    const [countryData,setCountryData]=useState('');
    const [newTraveller,setNewTraveller]=useState({t_id:'',name:'',arrived_date:'',destination_id:''});
    const findTravellerData=(e,name)=>{
        e.preventDefault();
        
    }
    const findCountryData=(e,name)=>{
        e.preventDefault();
        console.log(countryName);
    }
    return(
        <>
        <form onSubmit={(e)=>{findTravellerData(e,name)}}>
            <label>
                Insert Traveller Name:
                <input onChange={(e)=>{
                    setName(e.target.value)
                }}/>
            </label>
            <button type="submit" className="bg-warning btn btn-md">Submit</button>
        </form>
        <div>
            {travellerData}
        </div>
        <form onSubmit={(e)=>{findCountryData(e,name)}}>
            <label>
                Insert Country Name:
                <input onChange={(e)=>{
                    setCountryName(e.target.value)
                }}/>
            </label>
            <button type="submit" className="bg-warning btn btn-md">Submit</button>
        </form>
        <div>
            {countryData}
        </div>
        <form onSubmit={(e)=>{findCountryData(e,name)}}>
        Insert Traveller Data:
        <label>
                tid
                <input onChange={(e)=>{
                    setNewTraveller({...newTraveller,t_id:e.target.value})
                }}/>
            </label>
            <label>
                Name
                <input onChange={(e)=>{
                    setNewTraveller({...newTraveller,name:e.target.value})
                }}/>
            </label>
            <label>
                arrived_date
                <input onChange={(e)=>{
                    setNewTraveller({...newTraveller,arrived_date:e.target.value})
                }}/>
            </label>
            <label>
                destination_id
                <input onChange={(e)=>{
                    setNewTraveller({...newTraveller,destination_id:e.target.value})
                }}/>
            </label>
            <button type="submit" className="bg-warning btn btn-md">Submit</button>
        </form>
        <div>
            {countryData}
        </div>

        </>
    )
}

export default DbTest;