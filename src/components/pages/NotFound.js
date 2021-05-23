import {Link} from "react-router-dom";

function NotFound() {
	return (
			<section className="vh-100 bg-washed-blue baskerville">
			  <header className="tc ph5 lh-copy">
			      <h1 className="f1 f-headline-l code mb3 fw9 dib tracked-tight light-purple">404</h1>
			      <h2 className="tc f1-l fw1">Désolé, nous ne trouvons pas la page que vous recherchez.</h2>
			  </header>
			  <Link to="/" className="fw1 i tc mt4 mt5-l f4 f3-l">Retour à la page d'accueil</Link>
			</section>
	)
}

export default NotFound