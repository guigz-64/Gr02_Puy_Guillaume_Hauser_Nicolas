import React, {useState} from 'react';
import axios from 'axios';
import './Registration.css';
import { withRouter } from "react-router-dom";

function Registration(props) {
    const [state , setState] = useState({
        email : "",
        username : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })

    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const sendDetailsToServer = () => {
        if (state.username.length && state.email.length && state.password.length) {
            props.showError(null);
            const payload = {
                "email": state.email,
                "username": state.username,
                "password": state.password,
            }
            
            axios.post(process.env.REACT_APP_API_BASE_URL+'/users/', payload)
                .then((response) => {
                    if (response.status === 201) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Compte créé avec succès, redirection vers la page de connexion'
                        }))
                        localStorage.setItem("user_id", response.data.id);
                        redirectToLogin();
                        props.showError(null);
                    } else {
                        props.showError("Il y a eu une erreur");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            props.showError('Veuillez entrer un identifiant et un mot de passe valide');
        }
    }

    const redirectToLogin = () => {
        props.updateTitle('Login');
        props.history.push('/signin');
    }
    
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer();
        } else {
            props.showError('Passwords do not match');
        }
    }

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrez une adresse email" value={state.email} onChange={handleChange} />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Entrez un username" value={state.username} onChange={handleChange} />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Mot de passe</label>
                    <input type="password" className="form-control" id="password" placeholder="Choisissez un mot de passe" value={state.password} onChange={handleChange} />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirmer Mot de passe</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirmer le mot de passe" value={state.confirmPassword} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-secondary" onClick={handleSubmitClick}>
                    S'inscrire
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Vous avez déjà un compte ? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Se connecter ici</span>
            </div>
        </div>
    )
}

export default withRouter(Registration);