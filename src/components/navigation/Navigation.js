import React from 'react';
import {Link} from "react-router-dom";

const Navigation = ({onRouteChange,isSignin})=>{
	if (isSignin) {
		return(
			<nav className='' style={{display : 'flex',justifyContent:'flex-end'}}>
				<Link to="/register" >
					<p className='f3 link dim black underline pa3 pointer'
					onClick={onRouteChange}
					>Sign Out</p>
				</Link>
			</nav>
		)
	}else{
		return(
		<nav className='' style={{display : 'flex',justifyContent:'flex-end'}}>
			<Link to="/" >
				<p className='f3 link dim black underline pa3 pointer'>Sign In</p>
			</Link>
			<Link to="/register" >
				<p className='f3 link dim black underline pa3 pointer'>Register</p>
			</Link>
		</nav>
	)
	}
}
export default Navigation