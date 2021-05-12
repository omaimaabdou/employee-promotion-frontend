import {Link} from "react-router-dom";

function NotFound() {
	return (
			<section class="vh-100 bg-washed-blue baskerville">
			  <header class="tc ph5 lh-copy">
			      <h1 class="f1 f-headline-l code mb3 fw9 dib tracked-tight light-purple">404</h1>
			      <h2 class="tc f1-l fw1">Sorry, we can't find the page you are looking for.</h2>
			  </header>
			  <Link to="/home" class="fw1 i tc mt4 mt5-l f4 f3-l">Return to home page</Link>
			</section>
	)
}

export default NotFound