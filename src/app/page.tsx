'use client';

import { useState } from "react";
import Main from "./components/Main";
import Game from "./components/Game";

export default function Home() {
    const [play, setPlay] = useState(false);

    const onPlayClick = () => {
        setPlay(true);
    }

    return (
        <div>
            { play ? <Game /> : <Main onPlayClick={ onPlayClick } /> }
        </div>
    );
}