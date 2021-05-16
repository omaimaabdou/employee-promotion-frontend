import {useState } from 'react';
import { useHistory, Link} from "react-router-dom";

const Signin = ()=>{
	const [user, setUser] = useState({
		username: '',
		password: ''
	})
	const history = useHistory();
	const [error, setError] = useState("")

const onInputChange = (e)=>{
	setUser(Object.assign(user, {[e.target.name]: e.target.value}))
}
const onSubmitSingIn = ()=>{
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
			localStorage.setItem("user", data.user.username);
			localStorage.setItem("email", data.user.email);
			localStorage.setItem("id", data.user.uid);
			history.push("/");
		}
		else
			setError(data.error.message)
	})
	.catch( err=> console.log(err) )
}

	//---Render()-------------------------------------------------------------------------------
	return (
		  	<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			    <main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Username</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="username"  
						        id="username-signin"
						        onChange={ (e)=> onInputChange(e)}  
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
				      	<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" 
				      		onClick={onSubmitSingIn}
				      	/>
				    </div>
				    <div className="lh-copy mt3">
				    <Link to="/register" >
				      	<p className="f6 link pointer dim black db underline"
				      	>
				      	Register</p>
				    </Link>
				    </div>
				  </div>
				  <div> <p className="f6 dim red db" > {error} </p> </div>
				</main>
			</article>
		  );
	
  
}

export default Signin;




