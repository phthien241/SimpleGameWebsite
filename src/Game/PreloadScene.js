import Phaser from "phaser";
import play from "./assets/play.png"
import sky from "./assets/sky.png"

class PreloadScene extends Phaser.Scene{
    play = null;
    constructor(){
        super({key:"PreloadScene"})
    }
    preload(){
        this.load.image("sky",sky)
        this.load.image('play',play);
    }
    create(){
        this.add.image(0,0,'sky').setOrigin(0);
        const startButton = this.add.image(this.sys.game.config.width/2,this.sys.game.config.height/2,'play').setOrigin(0.5).setScale(0.2)
        startButton.setInteractive();
        startButton.on('pointerup',()=>{
            this.scene.start('GameScene')
        })
    }
}

export default PreloadScene;