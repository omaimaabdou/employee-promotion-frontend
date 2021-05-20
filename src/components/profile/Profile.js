import {useState} from 'react'
import profileIcon from './../../images/profile (2).png'
import { Link} from "react-router-dom";


function Profile() {
	const [username, setUsername] = useState(localStorage.getItem("user"));
	const [email, setEmail] = useState(localStorage.getItem("email"));
	const [id, setId] = useState(localStorage.getItem("id"))
	const [updatedUser, setUpdatedUser] = useState({})
	const [error, setError] = useState('')
	const [notification, setNotification] = useState('')

	const onInputChange = (e)=>{
		setUpdatedUser(Object.assign(updatedUser, {[e.target.name]: e.target.value}))
	}
	const updateUser = (id)=>{
		console.log(updatedUser)
		fetch('http://localhost:5000/user', {
		method : 'put',
		headers : {
			'Content-Type' : 'application/json', 
			'Authorization': 'Bearer ' + localStorage.getItem("token")
		},
		body : JSON.stringify(updatedUser)
		})
		.then(response=>response.json())
		.then(data=>{
			if (data.success){
				setUsername(updatedUser.username)
				setEmail(updatedUser.email)
				
				localStorage.setItem("user", updatedUser.username);
				localStorage.setItem("email", updatedUser.email);
				localStorage.setItem("password", updatedUser.password);
				setNotification("user was updated successfully")
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
		<div className="mt4" >
			<div className="flex w-60 center" >
				<article class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
				  <div class="tc">
				    <img src={profileIcon} class="br-100 h4 w4 dib ba b--black-05 pa2" title="Photo of the user"/>
				    <h1 class="f3 mb2"> {username} </h1>
				    <h2 class="f5 fw4 gray mt0"> {email} </h2>
				  </div>
				</article>
				<article class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
				  <div class="tc">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
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
						        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						        <input 
							        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							        type="email" 
							        name="email" 
							        id="email_create"
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
				    	<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib hover-white hover-bg-green" type="submit" value="Update" 
			      			onClick={ ()=> updateUser(id)}
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
