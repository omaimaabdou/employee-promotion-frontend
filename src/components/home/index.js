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
import Form from './../forms'

const Index = ()=> {

	/*---*/
	const [employees, setEmployees] = useState([])
	const [user, setUser] = useState('')
	const [error, setError] = useState("")
	const [notification, setNotification] = useState('')
	const [idUser, setIdUser] = useState('')
	const [open, setOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState({
		first_name: '',
		last_name: '',
		email: '',
		age: '',
		grade: '',
		degree: '',
		grade_seniority: '',
		entry_date:'',
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
		entry_date:'',
		social_situation: ''
	})
	let history = useHistory();

	const onInputChange = (e)=>{
		setCurrentUser(Object.assign(currentUser, {[e.target.name]: e.target.value}))
	}

	//Create Employee------------------------------------------------------------
	const onSubmitCreate = (newEmpl)=>{
		console.log(newEmpl)

		fetch("http://localhost:5000/employee", {
		method : 'post',
		headers : {
			'Content-Type' : 'application/json', 
			'Authorization': 'Bearer ' + localStorage.getItem("token")
		},
		body : JSON.stringify(newEmpl)
		})
		.then(response=>response.json())
		.then(data=>{
			if (data.success){
				getAllEmpl()
				/*if (status == "first_creation")
					window.location.reload(true);*/
				setNotification("employe created successfully")
				const article =  document.getElementById("article");
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
			setError(err.message+". Please enter your info")
		} )
	}
	const openCreateForm = ()=>{
		const article = document.getElementById("article");
		article.style.display = "block";
	}

	//Delete Employee--------------------------------------------------------------
	const deleteEmpl = ()=>{
		console.log("delete",idUser)
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
			else{
				setNotification("unable to delete employe")
				const notif = document.getElementById("notif");
				notif.style.display = "block"
				setTimeout(function(){ notif.style.display = "none" }, 3000);
			}
		})
		.catch( err=> {
			console.log(err)
			setNotification("unable to delete employe")
			const notif = document.getElementById("notif");
			notif.style.display = "block"
			setTimeout(function(){ notif.style.display = "none" }, 3000);
		} )
		setOpen(false);
	}

 	const handleClickOpen = (id) => {
 		console.log("open",id)
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


return (
	<>
		<Form onSubmitCreate={onSubmitCreate} error={error} />
		{!employees.length ? (
				<div>
					<h1 className='f1 tc'>LOADING...</h1>
					<h2>if data does not load try to add employees</h2>
					<img onClick={openCreateForm} className="hover-bg-green br-100 center mt0 pt0 pa2 pointer" src={addIcon} alt="add employe"/>
				</div>
			)
		: (
			<div>
		<Navigation path="/" />
		<div className="w-90 center" >
			<h1>Welcome <span className='i green' >{user} ...</span></h1>
			<span>
				<img onClick={openCreateForm} className="hover-bg-green br-100 fr mt0 pt0 pa2 pointer" src={addIcon} alt="add employe"/>
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
			  				<td>{new Date(employe.entry_date).toDateString()}</td>
			  				<td>{employe.created_at.slice(0,10)}</td>
			  				<td>{employe.updated_at.slice(0,10)}</td>
			  				<td className="w2" onClick={ ()=> handleClickOpen(employe.uid)} ><img className="w-90 pointer" src={updateIcon} alt="delete employe"/> </td>
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

		</div>
		</div>
		)

		}
	</>
)
}
export default Index



/*if (!employees.length)
	return (
		<div>
			<h1 className='f1 tc'>LOADING...</h1>
			<h2>if data does not load try to add employees</h2>
			<img onClick={openCreateForm} className="hover-bg-green br-100 center mt0 pt0 pa2 pointer" src={addIcon} alt="add employe"/>
			<Form onSubmitCreate={onSubmitCreate} error={error} />
		</div>
		)
else
	return (
		<div>
		<Navigation path="/" />
		<div className="w-90 center" >
			<h1>Welcome <span className='i green' >{user} ...</span></h1>
			<span>
				<img onClick={openCreateForm} className="hover-bg-green br-100 fr mt0 pt0 pa2 pointer" src={addIcon} alt="add employe"/>
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
			  				<td className="w2" onClick={ ()=> handleClickOpen(employe.uid)} ><img className="w-90 pointer" src={updateIcon} alt="delete employe"/> </td>
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

			
			
		</div>
		</div>
	)*/