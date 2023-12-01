import { ScoreBoard } from "./componentes/ScoreBoard.js";




export class Game extends Phaser.Scene{
    constructor(){
        super({key:'game'})
    }
    init(){
       this.scoreboard=new ScoreBoard(this);
    }


    preload(){
        this.load.image('background','images/background.png');
        this.load.image('gameover','images/gameover.png');
        this.load.image('platform','images/platform.png');
        this.load.image('ball','images/ball.png')
        this.load.image('bluebrick','images/bluebrick.png');
        this.load.image('blackbrick','images/blackbrick.png');
        this.load.image('greenbrick','images/greenbrick.png');
        this.load.image('orangebrick','images/orangebrick.png');
    }

    create(){
        //seteamos el sistema físico de bordes de rebote
        this.physics.world.setBoundsCollision(true,true,true,false);
        this.add.image(400,250,'background');
        this.gameOverImage=this.add.image(400,90,'gameover');
        this.gameOverImage.visible=false;

        //llamamos al método que coloca el marcador
        this.scoreboard.create();

        this.platform= this.physics.add.image(400,460,'platform').setImmovable();
        this.platform.body.allowGravity=false;
        this.platform.setCollideWorldBounds(true);
        
        
        this.ball=this.physics.add.image(385,430,'ball');
        this.ball.setData('glue',true);
        this.ball.setCollideWorldBounds(true);
        //Añadimos velocidad y dirección aleatoria a la bola
       // let velocity=100*Phaser.Math.Between(1.3,2);
        //if(Phaser.Math.Between(0,10)>5){
         //   velocity=0-velocity;
        //}
        //this.ball.setVelocity(velocity,10)
        //se añade la colisión de la bola
        this.physics.add.collider(this.ball,this.platform,this.platformImpact,null,this);
        //se crea el rebote
        this.ball.setBounce(1);
        //contról de la escucha de los cursores
        this.cursors=this.input.keyboard.createCursorKeys();
        
    }

    update(){
        if(this.cursors.left.isDown){
            this.platform.setVelocityX(-500);
            if(this.ball.getData('glue')){
                this.ball.setVelocityX(-500);
            }
           

        }
        else if(this.cursors.right.isDown){
        this.platform.setVelocityX(500);
        if(this.ball.getData('glue')){
            this.ball.setVelocityX(500);
        }
        
        }
        else{
            this.platform.setVelocityX(0);
            if(this.ball.getData('glue')){
                this.ball.setVelocityX(0);
            }
           
        } 

        //control de fin de partida al escaparse la bola por la pantalla de abajo:
        //500 es la altura de nuestra pantalla configurada en el archivo index.js
        if(this.ball.y>500){
            console.log("fin de la partida...");
            this.gameOverImage.visible=true;
            this.scene.pause();
        }
        if(this.cursors.up.isDown){
            this.ball.setVelocity(-75,-300);
            this.ball.setData('glue',false)
        }
    }

    //método que se llama cuando se ejecuta una colisión entre la bola y la plataforma
    platformImpact(ball,platform){
        this.scoreboard.incrementPoints(1);
        //conseguimos la posición relativa de la colisión entre la bola y la plataforma
        let relativeImpact=ball.x -platform.x;
        if(relativeImpact<0.1&&relativeImpact>-0.1){
            ball.setVelocityX(Phaser.Math.Between(-10,10))
        }
        else{
            ball.setVelocityX(10*relativeImpact);
        }

    }
}