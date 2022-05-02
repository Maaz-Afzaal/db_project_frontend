const baseUrl="https://db-project-backend-schedule.herokuapp.com"
export const getData=async (path,method,body)=>{
	
	try {
		let headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Access-Control-Allow-Headers': "Content-Type",
        };;
		
		let obj=method=="GET"?{method: `${method}`,
        headers: headers}:{
            method: `${method}`,
			headers: headers,
            body: JSON.stringify(body)
        }
		const response = await fetch(`${baseUrl}${path}`, obj);
		const json = await response.json();
		if(response.ok){
			return {result:json};
		}
	
		return {error:json};
	} catch (error) {
		return {error,};
	}
};