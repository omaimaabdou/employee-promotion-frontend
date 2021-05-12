import {useState } from 'react';
import { useHistory } from "react-router-dom";

const Register = ({onRouteChange})=> {

	const [user, setUser] = useState({
		name : '',
		username: '',
		password: ''
	})
	const history = useHistory();
	const [error, setError] = useState("")

	const onInputChange = (e)=>{
		setUser(Object.assign(user, {[e.target.name]: e.target.value}))
	}

	const onSubmitRegister = ()=>{
		fetch('http://localhost:5000/register', {
			method : 'post',
			headers : {'Content-Type' : 'application/json'},
			body : JSON.stringify({
				"username": user.username,
			    "password": user.password,
			    "email": user.email
			})
		})
		.then(response=>response.json())
		.then(data=>{
			if (data.success){
				fetch('http://localhost:5000/login', {
				method : 'post',
				headers : {'Content-Type' : 'application/json'},
				body : JSON.stringify({
					username : user.username,
					password : user.password})
				})
				.then(response=>response.json())
				.then(data=>{
					if (data.success){
						localStorage.setItem("token", data.Token);
						onRouteChange();
						history.push("/home");
					}
					else
						setError(data.error.message)
				})
				.catch( err=> console.log("You are registered but You are Unable to login") )
			}
			else 
				setError(data.error.message)
		})
		.catch( err=> console.log("Unable to register"))
	}

	  return (
	  	<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		    <main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="text" 
					        name="username"  
					        id="name" 
					        onChange={onInputChange}
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email"  
					        id="email-address" 
					        onChange={onInputChange}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password" 
					        onChange={onInputChange}
				        />
				      </div>
			    </fieldset>

			    <div className="">
			      	<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" 
			      		onClick={onSubmitRegister}
			      	/>
			    </div>
			  </div>
			  <div> <p className="f6 dim red db" > {error} </p> </div>
			</main>
		</article>
	  );
}

export default Register;




