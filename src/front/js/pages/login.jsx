import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useHistory } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	let history = useHistory();

	async function login(event) {
		event.preventDefault();
		const response = await fetch(process.env.BACKEND_URL + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		if (!response.ok) throw Error("There was a problem in the login request");

		if (response.status === 401) {
			throw "Invalid";
		} else if (response.status === 400) {
			throw "Invalid";
		}
		const data = await response.json();
		// save your token in the localStorage
		//also you should set your user into the store using the setStore function
		localStorage.setItem("jwt-token", data.token);
		actions.setUser_token(data.token);

		history.push("/protected");
	}

	return (
		<div className="container">
			<h1>Log in</h1>
			<form onSubmit={login}>
				<div className="form-group">
					<input
						type="email"
						className="form-control"
						placeholder="email"
						onChange={event => setEmail(event.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="password"
						onChange={event => setPassword(event.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
		</div>
	);
};