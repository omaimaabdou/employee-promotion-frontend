import React from 'react';
import {Link} from "react-router-dom";
import Logo from "./../../images/logo_v1.png"

const Navigation = ({path})=>{
	if (path == '/') {
		return(
			<nav className='' style={{display : 'flex',justifyContent:'space-between'}}>
				<div className="" style={{'marginTop':'2px', 'lineHeight': '0.2',display : 'flex',justifyContent:'space-between','width':'52%','padding':'0 4px','margin':'0px','alignItems':'center'}} >
					<div className="logo-div"> <img src={Logo} alt=""/> </div>
					<div>
						<p>Royaume de Maroc</p>
						<p>Ministère du Tourisme, de l'Artisanat, du Transport Aérien et de l'Economie Sociale</p>
					</div>
				</div>
				<Link to="/signin" >
					<p className='f3 link dim black underline pa3 pointer'
					onClick={()=> localStorage.clear()}
					>Sign Out</p>
				</Link>
			</nav>
		)
	}else if( path == "register" ){
		return <nav className='' style={{display : 'flex',justifyContent:'flex-end'}}>
			<Link to="/signin" >
				<p className='f3 link dim black underline pa3 pointer'>Sign In</p>
			</Link>
		</nav>
	}
	else
		return <div className="" style={{'marginTop':'2px', 'lineHeight': '0.2'}} >
			<div className="logo-div"> <img src={Logo} alt=""/> </div>
			<div>
				<p>Royaume de Maroc</p>
				<p>Ministère du Tourisme, de l'Artisanat, du Transport Aérien et de l'Economie Sociale</p>
			</div>
		</div>
	/*else{
		return(
		<nav className='' style={{display : 'flex',justifyContent:'flex-end'}}>
			<Link to="/signin" >
				<p className='f3 link dim black underline pa3 pointer'>Sign In</p>
			</Link>
			<Link to="/register" >
				<p className='f3 link dim black underline pa3 pointer'>Register</p>
			</Link>
		</nav>
	)
	}*/
}
export default Navigation