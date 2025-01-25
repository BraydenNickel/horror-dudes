import React from 'react';
import HorrorMovies from "../components/horrorMovies";

function Home() {
    return (
        <div>
            <h1>Welcome to Horror Dudes</h1>
            <p>Browse the latest horror and thriller movies below.</p>
            <HorrorMovies />
        </div>
    );
}

export default Home;