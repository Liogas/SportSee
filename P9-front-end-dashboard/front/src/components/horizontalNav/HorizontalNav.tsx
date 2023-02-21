import React from "react";

// images 
import logo from '../../images/logo.png';

// css 
import style from './horizontalNav.module.css';

export const HorizontalNav: React.FC = () => {
    return (
        <>
        <div className={style.horizontalNav}>
            <img alt='SportSee' src={logo}/>
            <nav>
                <a href="/#">Accueil</a>
                <a href="/#">Profil</a>
                <a href="/#">Réglage</a>
                <a href="/#">Communauté</a>
            </nav>
        </div>
        </>
    );
}