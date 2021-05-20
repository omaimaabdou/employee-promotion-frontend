import React,{useState} from 'react'
import closeIcon from './../../images/close-icons-48.png'
import './form.css';

function Index({onSubmitCreate,error}) {
	const [newEmployee, setNewEmployee] = useState({})

	const onInputChange = (e)=>{
		setNewEmployee(Object.assign(newEmployee, { [e.target.name]: e.target.value }))
	}
	const onSelectChange = ()=>{
		let socialSituation = document.getElementById("social_situation").value;
		Object.assign(newEmployee, {"social_situation": socialSituation })
	}
	const closeForm = ()=> {
		let form = document.getElementById("article");
		form.style.display = "none";
	}

	return (
		<article id="article" className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			    <main className="pv0 ph4 black-80">
				  <div className="measure">
				  	<img onClick={closeForm} className="pointer form-close" src={closeIcon} alt="close window"/>
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <div className="mt1">
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
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="email" 
						        name="email" 
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
						        id="age"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Grade</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="grade"  
						        id="grade"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Degree</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="degree"  
						        id="degree"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Grade seniority</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="number" 
						        name="grade_seniority"  
						        id="grade_seniority"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
						  <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="entry_date">Entry date</label>
					        <input 
						        className="pa2 input-reset ba center bg-transparent hover-bg-black hover-white w5" 
						        type="date" 
						        name="entry_date"  
						        id="entry_date"
						        onChange={ (e)=> onInputChange(e)} 
					        />
					      </div>
					      <div className="mv0">
					        <label className="db fw6 lh-copy f6" htmlFor="age">Social situation</label>
					        <select id="social_situation" onChange={onSelectChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" name="social_situation">
								  <option value="inconnue"></option>
								  <option label="célibataire" value="célibataire">Célibataire</option>
								  <option label="marié " value="marié">Marié</option>
							</select>
					      </div>
				    </fieldset>
				    <div className="">
				      	<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Create" 
				      		onClick={ ()=> onSubmitCreate(newEmployee)}
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

export default Index