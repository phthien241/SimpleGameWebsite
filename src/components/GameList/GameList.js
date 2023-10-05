import React from "react";
import "./GameList.scss";
import pong from "./../../assets/images/pong.jpg";

function GameList() {
  return (
    <>
      <div class="container">
        <div>
          <div class="game-list">
            <img src={pong} alt="" />
            <div class="relative country-description w-full">
              <a>Name</a>
              <div class="country-description-sub">Game</div>
              <button class="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameList;
