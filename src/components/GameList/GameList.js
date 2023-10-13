import React from "react";
import "./GameList.scss";
import flappybird from "./../../assets/images/flappybird.jpg";
import Navbar from "../Navbar/Navbar";
import {Link} from 'react-router-dom'

function GameList() {
  return (
    <>
      <Navbar></Navbar>
      <div class="container">
        <div>
          <div class="game-list">
            <img className="game-img rounded-2xl" src={flappybird} alt="" />
            <div class="relative game-description w-full">
              <a className="font-bold text-3xl">Flappy Bird</a>
              <div class="game-description-sub mt-4">
                Flappy Bird is a simple yet addictive mobile game where players
                control a bird's flight by tapping the screen, navigating it
                through a series of obstacles while aiming for the highest score
                possible.
              </div>
              <Link to="/flappy-bird">
                <button class="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Play
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameList;
