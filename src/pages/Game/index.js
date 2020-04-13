import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.png";

import flagBrazilImg from "../../assets/flags/flag-brazil.svg";
import flagFranceImg from "../../assets/flags/flag-france.svg";
import flagUsaImg from "../../assets/flags/flag-usa.svg";

const math = require("mathjs");

export default function Game() {
	const suits = ["hearts", "spades", "clubs", "diamonds"];

	const [cards, setCards] = useState([]);
	const [cardName, setCardName] = useState("A");
	const [suitName, setSuitName] = useState("hearts");
	const [language, setLanguage] = useState("pt-br");

	useEffect(() => {
		loadCards();
	}, []);

	function loadCards() {
		api.get("cards").then((res) => {
			setCards(res.data);

			const card = res.data[math.randomInt(res.data.length)];
			getCardName(card);
		});
	}

	function getCardName(card) {
		setCardName(card.name);

		setSuitName(getSuitRandom());
	}

	function handleNewCard() {
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
		<div className={`container ${language}`}>
			<header>
				<img src={logoImg} alt="Pipoco do Trovao" />
				<Link className="link" to="/about">
					<span className="language pt-br">Sobre</span>
					<span className="language en-ca">About</span>
					<span className="language fr-ca">À propos</span>
				</Link>
			</header>

			<div className="content">
				<section>
					<ul className={`playing-cards playing-cards-${cardName} cards-suit-${suitName}`}>
						{cards.map((card) => (
							<li key={card.id} className={`playing-card playing-card-${card.name}`}>
								<div className="playing-card-container">
									<img className="button" onClick={handleNewCard} src={require(`../../assets/cards/${card.name.toUpperCase()}${suitName.substring(0, 1).toUpperCase()}.png`)} alt={`${card.name} of ${suitName.toLowerCase()}`} />
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
