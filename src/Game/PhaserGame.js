import Phaser from "phaser";
import { useEffect } from "react";
import sky from "./assets/sky.png";
import birdImage from "./assets/bird1.png";
import upperpipeImage from "./assets/upperPipe.png";
import belowpipeImage from "./assets/belowPipe.jpg";
import pause from "./assets/pause.png";

function PhaserGame() {
  let bird = null;
  let pipes = null;
  let score = 0;
  let scoreText = "";
  const pipeHorizontalDistanceRange = [300, 400];
  const PIPES_RENDER = 3;
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
      this.load.image("pause",pause)
    }

    let flapVelocity = 130;

    function create() {
      this.add.image(0, 0, "sky").setOrigin(0);

      bird = this.physics.add
        .sprite(config.width / 10, config.height / 2, "bird")
        .setOrigin(0.5)
        .setScale(0.07);
      bird.body.gravity.y = 200;
      bird.setCollideWorldBounds(true);

      pipes = this.physics.add.group();

      for (let i = 0; i < PIPES_RENDER; i++) {
        pipeHorizontalDistance += 100;

        const upperPipe = pipes
          .create(0, 0, "upperPipe")
          .setOrigin(0, 1)
          .setImmovable(true)
          .setScale(0.2);

        const belowPipe = pipes
          .create(0, 0, "belowPipe")
          .setOrigin(0, 0)
          .setImmovable(true)
          .setScale(0.2);

        placePipe(upperPipe, belowPipe);
      }
      pipes.setVelocityX(-150);

      this.input.on("pointerdown", flap);
      this.input.keyboard.on("keydown-SPACE", flap);
      createCollider(this);
      createScore(this);
      createPause(this);
    }

    function update(time, delta) {
      if (bird.getBounds().bottom >= config.height || bird.y <= 0) {
        gameOver(this);
      }
      recyclePipes();
    }

    function placePipe(uPipe, lPipe) {
      const rightMostX = getRightMostPipe();

      let pipeVerticalPosition = Phaser.Math.Between(
        20,
        config.height - 20 - 100
      );
      let pipeHorizontalDistance = Phaser.Math.Between(
        ...pipeHorizontalDistanceRange
      );
      uPipe.x = rightMostX + pipeHorizontalDistance;
      uPipe.y = pipeVerticalPosition;

      lPipe.x = uPipe.x;
      lPipe.y = uPipe.y + 100;
    }

    function recyclePipes() {
      const tempPipes = [];
      pipes.getChildren().forEach((pipe) => {
        if (pipe.getBounds().right <= 0) {
          tempPipes.push(pipe);
          if (tempPipes.length === 2) {
            placePipe(...tempPipes);
            increaseScore();
          }
        }
      });
    }

    function createCollider(scene) {
      scene.physics.add.collider(
        bird,
        pipes,
        () => gameOver(scene),
        null,
        scene
      );
    }

    function createScore(scene) {
      score = 0;
      const bestScore = localStorage.getItem("bestScore");
      scoreText = scene.add.text(16, 16, `Score: ${0}`, {
        fontSize: "24px",
        fill: "#000",
      });
      scene.add.text(16, 52, `Best score: ${bestScore || 0}`, {
        fontSize: "16px",
        fill: "#000",
      });
    }
    function createPause(scene){
      const pauseButton = scene.add.image(scene.sys.game.config.width-10, scene.sys.game.config.height-10,'pause').setOrigin(1).setScale(0.05).setInteractive();
      pauseButton.on('pointerdown',()=>{
        scene.physics.pause();
        scene.scene.pause();
      })
    }

    function getRightMostPipe() {
      let rightMostX = 0;
      pipes.getChildren().forEach(function (pipe) {
        rightMostX = Math.max(pipe.x, rightMostX);
      });
      return rightMostX;
    }

    function gameOver(scene) {
      scene.physics.pause();
      let bestScore;
      const bestScoreText = localStorage.getItem("bestScore");
      if (bestScoreText) {
        bestScore = parseInt(bestScoreText);
      }
      if (!bestScore || score > bestScore) {
        localStorage.setItem("bestScore", score);
      }
      scene.time.addEvent({
        delay: 1000,
        callback: () => {
          scene.scene.restart();
        },
        loop: false,
      });
    }

    function flap() {
      bird.body.velocity.y = -flapVelocity;
    }

    function increaseScore() {
      score++;
      scoreText.setText(`Score: ${score}`);
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-container"></div>;
}

export default PhaserGame;
