import {useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, Link} from "react-router-dom";
import './index.css'
import deleteIcon from './../../images/deleteIcon-64.png'
import updateIcon from './../../images/updateIcon-64.png'
import addIcon from './../../images/addUser.png'
import profileIcon from './../../images/profile.png'
import Navigation from './../navigation/Navigation'

const Index = ()=> {
	const [employees, setEmployees] = useState([])
	const [user, setUser] = useState('')
	const [error, setError] = useState("")
	const [notification, setNotification] = useState('')
	const [idUser, setIdUser] = useState('')
	const [currentUser, setCurrentUser] = useState({
		id: '',
		first_name: '',
		last_name: '',
		email: '',
		age: '',
		grade: '',
		degree: '',
		grade_seniority: '',
		social_situation: ''
	})
	const [newUser, setNewUser] = useState({
		first_name: '',
		last_name: '',
		email: '',
		age: '',
		grade: '',
		degree: '',
		grade_seniority: '',
		social_situation: ''
	})
	let history = useHistory();

	const onInputChange = (e)=>{
		setCurrentUser(Object.assign(currentUser, {[e.target.name]: e.target.value}))
	}
	const onInputChange_create = (e)=>{
		setNewUser(Object.assign(newUser, {[e.target.name]: e.target.value}))
	}

	//Create Employee------------------------------------------------------------
	const onSubmitCreate = (status)=>{
		const selectValue = document.getElementById("social_situation").value
		Object.assign(newUser, {'social_situation': selectValue})
		fetch("http://localhost:5000/employee", {
		method : 'post',
		headers : {
			'Content-Type' : 'application/json', 
			'Authorization': 'Bearer ' + localStorage.getItem("token")
		},
		body : JSON.stringify(newUser)
		})
		.then(response=>response.json())
		.then(data=>{
			if (data.success){
				getAllEmpl()
				if (status)
					window.location.reload(false);
				setNotification("employe created successfully")
				const article =  document.getElementById("article-create");
				const notif = document.getElementById("notif");
				article.style.display = "none";
				notif.style.display = "block"
				setTimeout(function(){ notif.style.display = "none" }, 3000);
			}
			else
				setError("unable to create employe")
		})
		.catch( err=> {
			console.log(err);
			setError(err.message)
		} )
	}
	const openCreateForm = ()=>{
		const article_create = document.getElementById("article-create");
		const article_update = document.getElementById("article-update");
		
		article_update.style.display = "none";
		article_create.style.display = "block";
	}
	const openCreateFirstForm = ()=>{
		const article = document.getElementById("article-create-first");
		article.style.display = "block";
	}

	//Update Employee------------------------------------------------------------
	const onSubmitUpdate = ()=>{
		const {first_name,last_name,email,age,grade,degree,grade_seniority,social_situation} = currentUser;
		fetch(`http://localhost:5000/employee/${currentUser.id}`, {
		method : 'put',
		headers : {
			'Content-Type' : 'application/json', 
			'Authorization': 'Bearer ' + localStorage.getItem("token")
		},
		body : JSON.stringify({first_name,last_name,email,age,grade,degree,grade_seniority,social_situation})
		})
		.then(response=>response.json())
		.then(data=>{
			if (data.success){
				getAllEmpl()
				setNotification("employe updated successfully")
				const article = document.getElementById("article-update");
				const notif = document.getElementById("notif");
				article.style.display = "none";
				notif.style.display = "block"
				setTimeout(function(){ notif.style.display = "none" }, 3000);
			}
			else
				setError("unable to update employe")
		})
		.catch( err=> console.log(err) )
	}
	const openUpdateForm = (id,first_name,last_name,email,age,grade,degree,grade_seniority,social_situation)=> {
		setCurrentUser({id,first_name,last_name,email,age,grade,degree,grade_seniority,social_situation})
		const article_update = document.getElementById("article-update");
		const article_create = document.getElementById("article-create");
		
		article_create.style.display = "none";
		article_update.style.display = "block";
	}

	//Delete Employee--------------------------------------------------------------
	const deleteEmpl = ()=>{
		fetch(`http://localhost:5000/employee/${idUser}`, {
		method : 'delete',
		headers : {
			'Content-Type' : 'application/json', 
			'Authorization': 'Bearer ' + localStorage.getItem("token")
		},})
		.then(response=>response.json())
		.then(data=>{
			if (data.success){
				getAllEmpl()
				setNotification("employe was deleted successfully")
				const notif = document.getElementById("notif");
				notif.style.display = "block"
				setTimeout(function(){ notif.style.display = "none" }, 3000);
			}
			else
				setError("unable to delete employe")
		})
		.catch( err=> console.log(err) )
		setOpen(false);
	}
	const [open, setOpen] = useState(false);

 	const handleClickOpen = (id) => {
 		setIdUser(id)
    	setOpen(true);
  	};

	const handleClose = () => {
	    setOpen(false);
  	};

	//Get All Employee--------------------------------------------------------------
	const getAllEmpl = ()=>{
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
	}

	useEffect(() => {
		getAllEmpl();
	}, [])

if (!employees.length)
	return (
		<div>
			<h1 className='f1 tc'>LOADING...</h1>
			<h2>if data does not load try to add employees</h2>
			<img onClick={ ()=> openCreateFirstForm()} className="hover-bg-green br-100 center mt0 pt0 pa2 pointer" src={addIcon} alt="add employe"/>
			<article id="article-create-first" className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			    <main className="pv0 ph4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <div className="mt1">
					        <label className="db fw6 lh-copy f6" htmlFor="name">First name</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="first_name"  
						        id="first_name_create"
						        onChange={ (e)=> onInputChange_create(e)}  
						     />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="last_name">Last name</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="last_name"
						        id="last_name_create"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="email" 
						        name="email" 
						        id="email_create"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Age</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="number" 
						        name="age"  
						        id="age_create"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Grade</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="grade"  
						        id="grade"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Degree</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="degree"  
						        id="degree"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Grade seniority</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="number" 
						        name="grade_seniority"  
						        id="grade_seniority"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Social situation</label>
					        <select id="social_situation" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" name="social_situation">
								  <option value=""></option>
								  <option label="célibataire" value="célibataire">Célibataire</option>
								  <option label="marié " value="marié">Marié</option>
							</select>
					      </div>
				    </fieldset>
				    <div className="">
				      	<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Create" 
				      		onClick={ ()=> onSubmitCreate(true)}
				      	/>
				    </div>
				    <div className="lh-copy mt3">
				    </div>
				  </div>
				  <div> <p className="f6 dim red db" > {error} </p> </div>
				</main>
			</article>
		</div>
		)
else
	return (
		<div>
		<Navigation path="/" />
		<div className="w-90 center" >
			<h1>Welcome <span className='i green' >{user} ...</span></h1>
			<span>
				<img onClick={ ()=> openCreateForm()} className="hover-bg-green br-100 fr mt0 pt0 pa2 pointer" src={addIcon} alt="add employe"/>
				<img onClick={ ()=> history.push("/profile")} className=" hover-bg-green br-100 fl mt0 pt0 pa2 pointer" src={profileIcon} alt="add employe"/>
			</span>
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
			  				<td className="w2" onClick={ ()=> openUpdateForm(employe.uid,employe.first_name,employe.last_name,employe.email,employe.age)} ><img className="w-90 pointer" src={updateIcon} alt="delete employe"/> </td>
			  				<td className="w2"  >
		  						<img onClick={ ()=> handleClickOpen(employe.uid)} className="w-90 pointer" src={deleteIcon} alt="delete employe"/> 
						      	<Dialog
							        open={open}
							        onClose={handleClose}
							        aria-labelledby="alert-dialog-title"
							        aria-describedby="alert-dialog-description"
							      >
							        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
							        <DialogContent>
							          <DialogContentText id="alert-dialog-description">
							            are you sure you want to delete this employe?
							          </DialogContentText>
							        </DialogContent>
							        <DialogActions>
							          <Button onClick={handleClose} color="primary">
							            Disagree
							          </Button>
							          <Button onClick={ ()=> deleteEmpl()} color="primary" autoFocus>
							            Agree
							          </Button>
							        </DialogActions>
							      </Dialog>
			  				</td>
			  			</tr>
			  		})
			  	}
			  </tbody>
			</table>
			<p id="notif" className="white bg-green" > {notification} </p>
			<article id="article-update" className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			    <main className="pv0 ph4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="name">First name</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="first_name"  
						        
						        id="first_name"
						        onChange={ (e)=> onInputChange(e)}  
						     />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="last_name">Last name</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="last_name"
						        
						        id="last_name"
						        onChange={onInputChange} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="email" 
						        name="email" 
						        
						        id="email"
						        onChange={onInputChange} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Age</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="number" 
						        name="age"  
						        
						        id="age"
						        onChange={onInputChange} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Grade</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="grade"  
						        id="grade"
						        onChange={onInputChange} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Degree</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="degree"  
						        id="degree"
						        onChange={onInputChange} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Grade seniority</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="number" 
						        name="grade_seniority"  
						        id="grade_seniority"
						        onChange={onInputChange} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Social situation</label>
					        <select id="social_situation" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" name="social_situation">
								  <option value=""></option>
								  <option label="célibataire" value="célibataire">Célibataire</option>
								  <option label="marié " value="marié">Marié</option>
							</select>
					      </div>
				    </fieldset>
				    <div className="">
				      	<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Update employe" 
				      		onClick={onSubmitUpdate}
				      	/>
				    </div>
				    <div className="lh-copy mt3">
				    </div>
				  </div>
				  <div> <p className="f6 dim red db" > {error} </p> </div>
				</main>
			</article>
		{/*----------Create Empl--------------------------*/}
			<article id="article-create" className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			    <main className="pv0 ph4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <div className="mt1">
					        <label className="db fw6 lh-copy f6" htmlFor="name">First name</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="first_name"  
						        id="first_name_create"
						        onChange={ (e)=> onInputChange_create(e)}  
						     />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="last_name">Last name</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="last_name"
						        id="last_name_create"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="email" 
						        name="email" 
						        id="email_create"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Age</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="number" 
						        name="age"  
						        id="age_create"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Grade</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="grade"  
						        id="grade"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Degree</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="degree"  
						        id="degree"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Grade seniority</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="number" 
						        name="grade_seniority"  
						        id="grade_seniority"
						        onChange={onInputChange_create} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Social situation</label>
					        <select id="social_situation" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" name="social_situation">
								  <option value=""></option>
								  <option label="célibataire" value="célibataire">Célibataire</option>
								  <option label="marié " value="marié">Marié</option>
							</select>
					      </div>
				    </fieldset>
				    <div className="">
				      	<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Create" 
				      		onClick={ ()=> onSubmitCreate(false)}
				      	/>
				    </div>
				    <div className="lh-copy mt3">
				    </div>
				  </div>
				  <div> <p className="f6 dim red db" > {error} </p> </div>
				</main>
			</article>
		</div>
		</div>
	)
}

export default Index