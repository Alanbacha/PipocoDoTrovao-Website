import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.png";

import flagBrazilImg from "../../assets/flag-brazil.svg";
import flagFranceImg from "../../assets/flag-france.svg";
import flagUsaImg from "../../assets/flag-usa.svg";

const math = require("mathjs");

export default function Game() {
	const suits = ["hearts", "spades", "clubs", "diamonds"];

	const [cards, setCards] = useState([]);
	const [cardName, setCardName] = useState("");
	const [suitName, setSuitName] = useState("");
	const [language, setLanguage] = useState("pt-br");

	useEffect(() => {
		loadCards();
	}, [null]);

	function loadCards() {
		api.get("cards").then((res) => {
			console.log(0);
			setCards(res.data);

			const card = res.data[math.randomInt(res.data.length)];
			getCardName(card);
		});
	}

	function getCardName(card) {
		console.log(1);
		setCardName(card.name);

		setSuitName(getSuitRandom());
	}

	function handleNewCard() {
		console.log(2);
		const card = cards[math.randomInt(cards.length)];
		getCardName(card);
	}

	function getSuitRandom() {
		return suits[math.randomInt(suits.length)];
	}

	function handleChangeLanguage(value) {
		setLanguage(value);
	}

	return (
		<div className="container">
			<header>
				<img src={logoImg} alt="Pipoco do Trovao" />
				<Link className="link" to="/about">
					Sobre {suitName}
				</Link>
			</header>

			<div className={`content ${language}`}>
				<section>
					<ul className={`playing-cards playing-cards-${cardName} cards-suit-${suitName}`}>
						{cards.map((card) => (
							<li key={card.id} className={`playing-card playing-card-${card.name}`}>
								<div className="playing-card-container">
									{suits.map((name) => (
										<button key={`${card.id}-${name}`} className={`card-suit card-suit-${name}`} onClick={handleNewCard}>
											handleNewCard-{name}
										</button>
									))}
								</div>

								<ul className="description">
									<li className="language pt-br">
										<strong>Descrição</strong>
										<p>{card.description_PtBr}</p>
									</li>

									<li className="language en-ca">
										<strong>Description</strong>
										<p>{card.description_EnCa}</p>
									</li>

									<li className="language fr-ca">
										<strong>Description</strong>
										<p>{card.description_FrCa}</p>
									</li>
								</ul>
							</li>
						))}
					</ul>

					<ul className="languages">
						<li className="lang-pt-br">
							<button type="button" className="button" onClick={() => handleChangeLanguage("pt-br")}>
								<img height={25} src={flagBrazilImg} alt="Português" />
							</button>
						</li>
						<li className="lang-en-ca">
							<button type="button" className="button" onClick={() => handleChangeLanguage("en-ca")}>
								<img height={25} src={flagUsaImg} alt="English" />
							</button>
						</li>
						<li className="lang-fr-ca">
							<button type="button" className="button" onClick={() => handleChangeLanguage("fr-ca")}>
								<img height={25} src={flagFranceImg} alt="Français" />
							</button>
						</li>
					</ul>
				</section>
			</div>
		</div>
	);
}
