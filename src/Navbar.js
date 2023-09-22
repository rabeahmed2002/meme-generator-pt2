import React from "react";
import memepng from "./images/memepng.png"

export default function Navbar() {
    return(
        <header className="nav-el">
            <img src={memepng} className="header-img"/>
            <div className="title-el">
                <h2 className="title-el">Meme Generator</h2>
          
            </div>
        </header>
    )
}