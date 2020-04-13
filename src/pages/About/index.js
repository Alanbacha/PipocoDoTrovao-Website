import React, { useState, useEffect } from "react";
//import { Link, useHistory } from "react-router-dom";
//import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.png";

export default function About() {
	//const history = useHistory();

	const [cards, setcards] = useState([]);

	useEffect(() => {
		loadcards();
	});

	function loadcards() {
		api.get("cards").then((res) => {
			setcards(res.data);
		});
	}

	return (
		<div className="container">
			<header>
				<img src={logoImg} alt="Pipoco do Trovao" />
			</header>

			<ul>
				{cards.map((card) => (
					<li key={card.id}>
						<strong>Name:</strong>
						<p>{card.name}</p>

						<strong>Descrição:</strong>
						<p>{card.description_PtBr}</p>

						<strong>Description:</strong>
						<p>{card.description_EnCa}</p>

						<strong>Descripcion:</strong>
						<p>{card.description_FrCa}</p>

						{/* <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
							<FiTrash2 size={20} color="#a8a8b3" />
						</button> */}
					</li>
				))}
			</ul>
		</div>
	);
}
