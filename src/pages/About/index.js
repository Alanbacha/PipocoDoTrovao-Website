import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import logoImg from "../../assets/logo.png";

import flagBrazilImg from "../../assets/flag-brazil.svg";
import flagFranceImg from "../../assets/flag-france.svg";
import flagUsaImg from "../../assets/flag-usa.svg";

export default function Game() {
	const [language, setLanguage] = useState("pt-br");

	function handleChangeLanguage(value) {
		setLanguage(value);
	}

	return (
		<div className={`container ${language}`}>
			<header>
				<img src={logoImg} alt="Pipoco do Trovao" />
				<Link className="link" to="/">
					<span className="language pt-br">Jogar</span>
					<span className="language en-ca">Play</span>
					<span className="language fr-ca">Jouez</span>
				</Link>
			</header>

			<div className="content">
				<section>
					<ul className="about-content">
						<li className="language pt-br">
							<strong>Sobre</strong>
							<p>Este jogo foi desenvolvido por Alan Bacha.</p>
						</li>

						<li className="language en-ca">
							<strong>About</strong>
							<p>This game was developed by Alan Bacha.</p>
						</li>

						<li className="language fr-ca">
							<strong>À propos</strong>
							<p>Ce jeu a été développé par Alan Bacha.</p>
						</li>
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
