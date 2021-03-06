import React, { useState, useContext } from "react";
import "./Profile.scss";
import Alert from "../Alert";
import { handleDelete } from "../../api/users";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Context";
import Loading from "../utils/loading";

const Profile = ({ history }) => {
	const [success] = useState(false);

	const { profile, handleAlert } = useContext(UserContext);

	const handleDeleteUser = () => {
		handleDelete()
			.then(response => {
				handleAlert(
					"success",
					"Your account has been delete , you'll not be able to connect again ,until you create a new account"
				);
				setTimeout(() => {
					history.push("/"); // retour à la page SignUp
				}, 5000);
				localStorage.clear();
			})
			.catch(error => handleAlert("danger", error.response.data.error));
	};

	return (
		<>
			{profile ? (
				<div className="card welcome">
					{success ? <Alert /> : null}
					<div className="card-body">
						<h5 className="card-title text-primary">Hello ! {profile.username}</h5>
						<p className="card-text">
							Bienvenue sur le réseau social Groupomania : Si vous cliquez sur le boutton Home
							vous accèderez à tous les posts déjà existants.
						</p>
					</div>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">Email : {profile.email}</li>
						<li className="list-group-item">Username : {profile.username}</li>
						<li className="list-group-item">
							Administrator :{JSON.stringify(profile.isAdmin)}
						</li>
					</ul>
					<div className="card-body">
						<button
							type="button"
							onClick={handleDeleteUser}
							className="btn btn-danger"
						>
							Delete your account
						</button>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};

export default withRouter(Profile);
