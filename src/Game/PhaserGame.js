import Phaser from "phaser";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import GameScene from "./GameScene";
import PreloadScene from "./PreloadScene";
import "./styles.scss";

function PhaserGame() {
  useEffect(() => {
    const config = {
      // autoCenter: true,
      type: Phaser.AUTO,
      width: 500,
      height: 400,
      parent: "phaser-game",
      physics: {
        default: "arcade",
        arcade: {
          // debug: true,
        },
      },
      scene: [PreloadScene, GameScene],
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <canvas className="block mx-auto"></canvas>
    </div>
  );
}

export default PhaserGame;
