import React,{useState,useEffect} from 'react'
import closeIcon from './../../images/close-icons-48.png'
import './form.css';

function UpdateForm({onSubmitUpdate,error,idEmployee}) {
	const [currentEmpl, setCurrentEmpl] = useState({})
	const [currentEmplAllFields, setCurrentEmplAllFields] = useState({})

	const onInputChange = (e)=>{
		setCurrentEmpl({ [e.target.name]: e.target.value })
		setCurrentEmplAllFields(Object.assign(currentEmplAllFields, { [e.target.name]: e.target.value }))
	}
	const onSelectChange = ()=>{
		let socialSituation = document.getElementById("social_situation2").value;
		Object.assign(currentEmplAllFields, {"social_situation": socialSituation })
	}
	const closeUpdateForm = ()=> {
		let form = document.getElementById("article-update");
		form.style.display = "none";
	}

	const getEmplById = ()=>{
		fetch(`http://localhost:5000/employee/${idEmployee}`, {
		method : 'get',
		headers : {
			'Content-Type' : 'application/json', 
			'Authorization': 'Bearer ' + localStorage.getItem("token")
		},
		})
		.then(response=>response.json())
		.then(data=>{
			if (data.success){
				let {first_name,last_name,email,age,grade,degree,grade_seniority,entry_date,social_situation} = data.data
				setCurrentEmpl({first_name,last_name,email,age,grade,degree,grade_seniority,entry_date,social_situation})
				setCurrentEmplAllFields({first_name,last_name,email,age,grade,degree,grade_seniority,entry_date,social_situation})
				console.log("CureentUser =>",data.data)
			}
			else
				console.log("unable to get employe info")
		})
		.catch( err=> {
			console.log(err);
			console.log(err.message)
		} )
	}

	useEffect(() => {
		if (idEmployee) {
			getEmplById();
		}else
			return
	}, [idEmployee])



	return (
		<article id="article-update" className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			    <main className="pv0 ph4 black-80">
				  <div className="measure">
				  	<img onClick={closeUpdateForm} className="pointer form-close" src={closeIcon} alt="close window"/>
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <div className="mt1">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Prénom</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="first_name" 
						        value= {currentEmpl.first_name}
						        id="first_name"
						        onChange={ (e)=> onInputChange(e)}  
						     />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="last_name">Nom</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="last_name"
						        value= {currentEmpl.last_name}
						        id="last_name"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="email" 
						        name="email"
						        value= {currentEmpl.email} 
						        id="email"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Age</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="number" 
						        name="age"  
						        value= {currentEmpl.age}
						        id="age"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Profil</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="grade"  
						        value= {currentEmpl.grade}
						        id="grade"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Niveau</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="degree"  
						        value= {currentEmpl.degree}
						        id="degree"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Niveau d'ancienneté</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="number" 
						        name="grade_seniority" 
						        value= {currentEmpl.grade_seniority} 
						        id="grade_seniority"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
						  <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="entry_date">Date d'entrée</label>
					        <input 
						        className="pa2 input-reset ba center bg-transparent hover-bg-black hover-white w5" 
						        type="date" 
						        name="entry_date"  
						        value= {currentEmpl.entry_date}
						        id="entry_date"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Situation Sociale</label>
					        <select id="social_situation2" onChange={ (e)=> onInputChange(e)} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" name="social_situation">
								  <option value={currentEmpl.social_situation} > {currentEmpl.social_situation} </option>
								  <option value={currentEmpl.social_situation=="marié" ? "célibataire" : "marié"} > {currentEmpl.social_situation=="marié" ? "célibataire" : "marié"} </option>
							</select>
					      </div>
				    </fieldset>
				    <div className="">
				      	<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Modifier" 
				      		onClick={ ()=> onSubmitUpdate(currentEmplAllFields)}
				      	/>
				    </div>
				    <div className="lh-copy mt3">
				    </div>
				  </div>
				  <div> <p className="f6 dim red db" > {error} </p> </div>
				</main>
			</article>
	)
}

export default UpdateForm