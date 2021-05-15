import {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import './index.css'

const Index = ()=> {
	const [employees, setEmployees] = useState([])
	const [user, setUser] = useState('')
	let history = useHistory();

	useEffect(() => {
		setUser(localStorage.getItem("user"))
		fetch('http://localhost:5000/employees', {
		method : 'post',
		headers : {
			'Content-Type' : 'application/json', 
			'Authorization': 'Bearer ' + localStorage.getItem("token")
		},
		body : JSON.stringify({"page": 1})
		})
		.then(response=>response.json())
		.then(data=>{
			if (data.success){
				setEmployees(data.data)
			}
			else
				history.push("/signin")
		})
		.catch( err=> console.log(err) )
	}, [])

if (!employees.length)
	return <h1 className='f1 tc'>LOADING...</h1>;
else
	return (
		<div className="w-90 center" >
			<h1>Welcome <span className='i green' >{user} ...</span></h1>
			<table id="customers">
			  <thead>
				 <tr>
				    <th>First name</th>
				    <th>Last name</th>
				    <th>Email</th>
				    <th>Age</th>
				    <th>Social Situation</th>
				    <th>Degree</th>
				    <th>Grade</th>
				    <th>Grade seniority</th>
				    <th>Entry date</th>
				    <th>Created at</th>
				    <th>Updated at</th>
			   	</tr>
			  </thead>
			  <tbody>
			  	{
			  		employees.map((employe,index)=>{
			  			return <tr key={index+employe.first_name} >
			  				<td>{employe.first_name}</td>
			  				<td>{employe.last_name}</td>
			  				<td>{employe.email}</td>
			  				<td>{employe.age}</td>
			  				<td>{employe.social_situation}</td>
			  				<td>{employe.degree}</td>
			  				<td>{employe.grade}</td>
			  				<td>{employe.grade_seniority}</td>
			  				<td>{employe.entry_date}</td>
			  				<td>{employe.created_at.slice(0,10)}</td>
			  				<td>{employe.updated_at.slice(0,10)}</td>
			  			</tr>
			  		})
			  	}
			  </tbody>
			</table>
		</div>
	)
}

export default Index