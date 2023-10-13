import Phaser from "phaser";
import sky from "./assets/sky.png";
import birdImage from "./assets/bird1.png";
import upperpipeImage from "./assets/upperPipe.png";
import belowpipeImage from "./assets/belowPipe.jpg";
import pause from "./assets/pause.png";
import birdFly from "./assets/birdAnimation.png";
import axios from "axios";

class GameScene extends Phaser.Scene {
  isPaused = false;
  pauseButton = null;
  resumeButton = null;
  bird = null;
  pipes = null;
  score = 0;
  scoreText = "";
  pipeHorizontalDistanceRange = [300, 400];
  PIPES_RENDER = 3;
  pipeHorizontalDistance = 0;
  flapVelocity = 130;
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("sky", sky);
    this.load.image("bird", birdImage);
    this.load.image("upperPipe", upperpipeImage);
    this.load.image("belowPipe", belowpipeImage);
    this.load.image("pause", pause);
    this.load.spritesheet("birdFly", birdFly, {
      frameWidth: 350,
      frameHeight: 300,
    });
  }

  create() {
    const width = this.sys.game.config.width;
    const height = this.sys.game.config.height;

    this.add.image(0, 0, "sky").setOrigin(0);

    this.createBird(width, height);

    this.createPipe();

    this.input.on("pointerdown", this.flap);
    this.input.keyboard.on("keydown-SPACE", this.flap);

    this.createCollider();

    this.createScore();

    this.createPause();
  }

  update() {
    if (
      this.bird.getBounds().bottom >= this.sys.game.config.height ||
      this.bird.y <= 0
    ) {
      this.gameOver(this);
    }
    this.recyclePipes();
  }

  createBird(height, width) {
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("birdFly", { start: 0, end: 8 }),
      frameRate: 12,
      repeat: -1,
    });
    this.bird = this.physics.add
      .sprite(width / 10, height / 2, "birdFly")
      .play("fly")
      .setOrigin(0.5)
      .setScale(0.15);
    this.bird.setSize(this.bird.width * 0.7, this.bird.height * 0.7);
    this.bird.body.gravity.y = 200;
    this.bird.setCollideWorldBounds(true);
  }

  createPipe() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < this.PIPES_RENDER; i++) {
      this.pipeHorizontalDistance += 100;
      const upperPipe = this.pipes
        .create(0, 0, "upperPipe")
        .setOrigin(0, 1)
        .setImmovable(true)
        .setScale(0.2);
      const belowPipe = this.pipes
        .create(0, 0, "belowPipe")
        .setOrigin(0, 0)
        .setImmovable(true)
        .setScale(0.2);
      this.placePipe(upperPipe, belowPipe);
    }
    this.pipes.setVelocityX(-150);
  }

  placePipe(uPipe, lPipe) {
    const rightMostX = this.getRightMostPipe();

    let pipeVerticalPosition = Phaser.Math.Between(
      20,
      this.sys.game.config.height - 100
    );
    let pipeHorizontalDistance = Phaser.Math.Between(
      ...this.pipeHorizontalDistanceRange
    );
    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;
    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + 80;
  }

  recyclePipes() {
    const tempPipes = [];
    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
          this.increaseScore();
        }
      }
    });
  }

  createCollider() {
    this.physics.add.collider(
      this.bird,
      this.pipes,
      () => this.gameOver(this),
      null,
      this
    );
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem("bestScore");
    this.scoreText = this.add.text(16, 16, `Score: ${0}`, {
      fontSize: "24px",
      fill: "#000",
    });
    this.add.text(16, 52, `Best score: ${bestScore || 0}`, {
      fontSize: "16px",
      fill: "#000",
    });
  }

  createPause() {
    this.pauseButton = this.add
      .image(
        this.sys.game.config.width - 10,
        this.sys.game.config.height - 10,
        "pause"
      )
      .setOrigin(1)
      .setScale(0.05)
      .setInteractive();
    this.pauseButton.on("pointerdown", () => {
      if (!this.isPaused) {
        this.pipes.getChildren().forEach((pipe) => {
          pipe.body.moves = false;
        });
        this.bird.body.moves = false;
      } else {
        this.pipes.getChildren().forEach((pipe) => {
          pipe.body.moves = true;
        });
        this.bird.body.moves = true;
      }
      this.isPaused = !this.isPaused;
    });
  }

  getRightMostPipe() {
    let rightMostX = 0;
    this.pipes.getChildren().forEach((pipe) => {
      rightMostX = Math.max(pipe.x, rightMostX);
    });
    return rightMostX;
  }

  gameOver(scene) {
    scene.physics.pause();
    let bestScore;
    const bestScoreText = localStorage.getItem("bestScore");
    if (bestScoreText) {
      bestScore = parseInt(bestScoreText);
    }
    if (!bestScore || this.score > bestScore) {
      localStorage.setItem("bestScore", this.score);
      axios.post(`${process.env.REACT_APP_BASE_URL}/users/update-score`, {
        bestScore: this.score,
        email: localStorage.getItem("email"),
      });
    }
    scene.time.addEvent({
      delay: 1000,
      callback: () => {
        scene.scene.restart();
      },
      loop: false,
    });
  }

  flap = () => {
    this.bird.body.velocity.y = -this.flapVelocity;
  };

  increaseScore() {
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`);
  }
}

export default GameScene;
