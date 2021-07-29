import * as React from 'react';
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom';

import Home from './views/Home';
import Details from './views/Details';
import CreateEdit from './views/CreateEdit';

const App = (props: AppProps) => {
	return (
			<BrowserRouter>
				<nav className="navbar sticky-top navbar-dark bg-info p-3 mb-5">
					<div className="container-fluid">
						<Link to="/" className="navbar-brand">🐦 Chirper</Link>
						<div className="d-flex">
							<Link to="/create" className="btn btn-warning">Chirp</Link>
						</div>
					</div>
				</nav>				
				<main className="container my-5">			
					<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/details/:id">
								<Details />
							</Route>
							<Route exact path="/create">
								<CreateEdit isEdit={false}  />
							</Route>
							<Route exact path="/edit/:id">
								<CreateEdit isEdit={true}  />
							</Route>
					</Switch>
				</main>				
			</BrowserRouter>
	);
};

interface AppProps {}

export default App;