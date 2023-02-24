import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Switch,
} from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
	return (
		<Router>
			<div className="App">
				<header>
					<img src={logo} className="App-logo" alt="logo" />
					<div align="center">
						<NavLink exact to="/" activeClassName="active-link">
							Home
						</NavLink>
						<NavLink to="/otherpage" activeClassName="active-link">
							Other Page
						</NavLink>
					</div>
				</header>
				<div>
					<Switch>
						<Route exact path="/" component={Fib} />
						<Route path="/otherpage" component={OtherPage} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
