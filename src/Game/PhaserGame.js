import Phaser from "phaser";
import { useEffect } from "react";
import sky from "./assets/sky.png";
import birdImage from "./assets/bird1.png";
import upperpipeImage from "./assets/upperPipe.png";
import belowpipeImage from "./assets/belowPipe.jpg";

function PhaserGame() {
  let bird = null;
  let upperPipe = null;
  let belowPipe = null;
  let totalDelta = null;
  const pipeVerticalDistanceRange = [150, 250];
  const PIPES_RENDER = 20;
  let pipeHorizontalDistance = 0;
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 500,
      height: 400,
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
          // gravity: { y: 200 },
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
      this.load.image("upperPipe", upperpipeImage);
      this.load.image("belowPipe", belowpipeImage);
    }

    let flapVelocity = 130;

    const initialPosition = { x: config.width / 10, y: config.height / 2 };

    function create() {
      this.add.image(0, 0, "sky").setOrigin(0);

      bird = this.physics.add
        .sprite(config.width / 10, config.height / 2, "bird")
        .setOrigin(0.5)
        .setScale(0.1);
      bird.body.gravity.y = 200;

      for (let i = 0; i < PIPES_RENDER; i++) {
        pipeHorizontalDistance +=500
        let pipeVerticalDistance = Phaser.Math.Between(
          pipeVerticalDistanceRange[0],
          pipeVerticalDistanceRange[1]
        );

        let pipeVerticalPosition = Phaser.Math.Between(
          0 + 30,
          config.height - 30 - pipeVerticalDistance
        );
        upperPipe = this.physics.add
          .sprite(pipeHorizontalDistance, pipeVerticalPosition, "upperPipe")
          .setOrigin(0, 1)
          .setScale(0.2);

        belowPipe = this.physics.add
          .sprite(pipeHorizontalDistance, upperPipe.y + 100, "belowPipe")
          .setOrigin(0, 0)
          .setScale(0.2);

          upperPipe.setVelocityX(-200)
          belowPipe.setVelocityX(-200)
      }

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
      bird.body.velocity.y = 0;
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
