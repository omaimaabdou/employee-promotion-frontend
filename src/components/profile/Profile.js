import {useState} from 'react'
import { Link} from "react-router-dom";
import Navigation from './../navigation/Navigation'
import profileIcon from './../../images/profile (2).png'
import eye from './../../images/eye.png'


function Profile() {
	//Current User Info----
	const [username, setUsername] = useState(localStorage.getItem("user"));
	const [email, setEmail] = useState(localStorage.getItem("email"));
	const [password, setPassword] = useState('')

	const [updatedUser, setUpdatedUser] = useState({})
	const [error, setError] = useState('')
	const [notification, setNotification] = useState('')

	const togglePassword = ()=>{
		const togglePassword = document.querySelector('#togglePassword');
		const password = document.querySelector('#password');

		const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
	    password.setAttribute('type', type);
	}

	const onInputChange = (e)=>{
		setError('')
		let inputName = e.target.name;
		let inputValue = e.target.value;

		if (inputName=="username")
			setUsername(inputValue)
		else if (inputName=="email")
			setEmail(inputValue)
		else
			setPassword(inputValue)
		
		//setUpdatedUser(Object.assign(updatedUser, {[e.target.name]: e.target.value}))
	}
	const updateUser = ()=>{
		//console.log("YOUR new USER ",{username,password,email})
		//console.log("updatedUser ",updatedUser)
		fetch('http://localhost:5000/user', {
		method : 'put',
		headers : {
			'Content-Type' : 'application/json', 
			'Authorization': 'Bearer ' + localStorage.getItem("token")
		},
		body : JSON.stringify({username,password,email})
		})
		.then(response=>response.json())
		.then(data=>{
			if (data.success){
				//setUsername(updatedUser.username)
				//setEmail(updatedUser.email)
				//setEmail(updatedUser.password)
				//Store the new user in the localstorage
				localStorage.setItem("user", username);
				localStorage.setItem("email", email);
				//localStorage.setItem("password", password);

				setNotification("user was updated successfully")
				setError('')
				const notif = document.getElementById("notif-profile");
				notif.style.display = "block"
				setTimeout(function(){ notif.style.display = "none" }, 3000);
			}
			else
				setError("unable to update user profile")
		})
		.catch( err=> {
			console.log(err)
			setError(err.message+". Please enter your info")
		} )
	}

	return (
		<div className="mt0" >
			<Navigation path="profile" />
			<div className="flex w-60 center" >
				<article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
				  <div className="tc">
				    <img src={profileIcon} className="br-100 h4 w4 dib ba b--black-05 pa2" title="Photo of the user"/>
				    <h1 className="f3 mb2"> {username} </h1>
				    <h2 className="f5 fw4 gray mt0"> {email} </h2>
				  </div>
				</article>
				<article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
				  <div className="tc">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						      <div className="mt3">
						        <label className="db fw6 lh-copy f6" htmlFor="email-address">Username</label>
						        <input 
							        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							        type="text" 
							        name="username"  
							        value={username}
							        id="username-signin"
							        onChange={ (e)=> onInputChange(e)}  
							     />
						      </div>
						      <div className="mv3">
						        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						        <input 
							        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							        type="email" 
							        name="email" 
							        value={email}
							        id="email_create"
							        onChange={ (e)=> onInputChange(e)} 
						        />
						      </div>
						      <div className="mv3">
						        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
						        <input 
							        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							        type="password" 
							        name="password" 
							        value={password} 
							        id="password"
							        onChange={(e)=> onInputChange(e)} 
						        />
						        <img id="togglePassword" 
							        className="pointer bg-white" 
							        style={{'marginTop': '1px', 'marginLeft': '-33px', 'position': 'absolute'}} 
							        src={eye} alt="show password" 
							        onClick={togglePassword}
							    />
						      </div>
					    </fieldset>
				    	<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib hover-white hover-bg-green" type="submit" value="Update" 
			      			onClick={updateUser}
			      		/>
			      		<p className="f6 dim red db pa0 mt3"> {error} </p>
				  </div>
				</article>
			</div>
			<Link to="/">
				<p className="f5 mr4 pa1 link pointer dim black db underline" >Return to home page</p>
			</Link>
			<p id="notif-profile" className="white bg-green" > {notification} </p>
		</div>
	)
}

export default Profile
