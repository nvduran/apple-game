import "./style.css";
import Phaser, { Physics } from "phaser";

const sizes = {
        width: 500,
        height: 500,
};

const speedDown = 300;

class GameScene extends Phaser.Scene {
        constructor() {
                super("scene-game");
                this.player;
                this.cursor;
                this.playerSpeed = speedDown + 50;
        }

        preload() {
                this.load.image("bg", "assets/bg.png");
                this.load.image("basket", "assets/basket.png");
        }

        create() {
                this.add.image(0, 0, "bg").setOrigin(0, 0);
                //added physics to the player
                this.player = this.physics.add.image(0, sizes.height - 100, "basket").setOrigin(0, 0);
                this.player.setImmovable(true);
                this.player.body.allowGravity = false;

                this.cursor = this.input.keyboard.createCursorKeys();
                this.player.setCollideWorldBounds(true);
        }

        update() {
                const { left, right } = this.cursor;

                if (left.isDown) {
                        this.player.setVelocityX(-this.playerSpeed);
                } else if (right.isDown) {
                        this.player.setVelocityX(this.playerSpeed);
                }
        }
}

const config = {
        type: Phaser.WEBGL,
        width: sizes.width,
        height: sizes.height,
        canvas: document.getElementById("gameCanvas"),
        physics: {
                default: "arcade",
                arcade: {
                        gravity: { y: speedDown },
                        debug: false,
                },
        },
        scene: [GameScene],
};

const game = new Phaser.Game(config);
