import React, { useState } from 'react';
import './App.css';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import AlertDisplay from './components/AlertDisplay/AlertDisplay';
import { isLogin } from './utils/is_login';

function App() {
	const [title, updateTitle] = useState(null);
	const [user, setUser] = useState(null);
	const [errorMessage, updateErrorMessage] = useState(null);

	return (
		<Router>
			<div className="App">
				<HeaderComponent title={title} user={user}/>
				<div className="container d-flex align-items-center flex-column">
					<Switch>
						<Route exact path='/' render={props => isLogin() ? <Home {...props} showError={updateErrorMessage} updateTitle={updateTitle} /> : <Redirect to="/signin" />} />
						<Route exact path='/register' render={props => <Registration {...props} showError={updateErrorMessage} updateTitle={updateTitle} />} />
						<Route exact path='/signin' render={props => <Login {...props} showError={updateErrorMessage} updateTitle={updateTitle} onUser={setUser} />} />
					</Switch>
					<AlertDisplay errorMessage={errorMessage} hideError={updateErrorMessage}/>
				</div>
			</div>
		</Router>
	);
}

export default App;