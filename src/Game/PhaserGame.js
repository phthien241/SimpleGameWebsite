import Phaser from "phaser";
import { useEffect } from "react";
import sky from "./assets/sky.png";
import birdImage from "./assets/bird1.png";

function PhaserGame() {
  let bird = null;
  let totalDelta = null;
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 500,
      height: 400,
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
          gravity: { y: 200 },
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image("sky", sky);
      this.load.image("bird", birdImage);
    }
    const VELOCITY = 200;
    let flapVelocity = 100;
    const initialPosition = { x: config.width / 10, y: config.height / 2 };

    function create() {
      this.add.image(0, 0, "sky").setOrigin(0);
      bird = this.physics.add
        .sprite(config.width / 10, config.height / 2, "bird")
        .setOrigin(0.5)
        .setScale(0.1);
      this.input.on("pointerdown", flap);
      this.input.keyboard.on("keydown_SPACE", flap);
    }

    function update(time, delta) {
      if (bird.y >= config.height || bird.y < 0) {
        restartPlayerPosition();
      }
    }

    function restartPlayerPosition() {
        bird.x = initialPosition.x;
        bird.y = initialPosition.y;
        bird.body.velocity.y=0;
    }

    function flap() {
      bird.body.velocity.y = -flapVelocity;
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-container"></div>;
}

export default PhaserGame;
