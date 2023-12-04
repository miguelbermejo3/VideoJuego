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
        this.load.image('bluebrick','images/brickBlue.png');
        this.load.image('blackbrick','images/brickBlack.png');
        this.load.image('greenbrick','images/brickGreen.png');
        this.load.image('orangebrick','images/brickOrange.png');
        this.load.image('congratulations','images/congratulations.png');
    }

    create(){
        //seteamos el sistema físico de bordes de rebote
        this.physics.world.setBoundsCollision(true,true,true,false);
        this.add.image(400,250,'background');
        //imagen GameOver:
        this.gameOverImage=this.add.image(400,90,'gameover');
        this.gameOverImage.visible=false;
        //imagen Congratulations
        this.congratsImage=this.add.image(400,90,'congratulations');
        this.congratsImage.visible=false;


        //llamamos al método que coloca el marcador
        this.scoreboard.create();

        //colocamos los grupos de brick
        this.bricks=this.physics.add.staticGroup({
            key:['bluebrick','greenbrick','orangebrick','blackbrick'],
                frameQuantity:1,
                gridAlign:{
                    width:10,
                     height:4,
                    cellWidth:67,
                    cellHeight:34,
                    x:112,
                    y:100
                            }

             });


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

        this.physics.add.collider(this.ball,this.bricks,this.brickImpact,null,this);
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
            this.bricks.setvisible(false);
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

//metodo que se llama cuando se ejecuta ua colisión entre la bola y los ladrillos.
        brickImpact(ball,brick){ 
    //eliminamos brick:
    brick.disableBody(true,true);
    //aumentamos marcador:
    this.scoreboard.incrementPoints(10);

    //comprobamos si el número de elementos de ladrillos ha llegado a cero:
    if(this.bricks.countActive()==0){
this.congratsImage.visible=true;
this.scene.pause();
    }

}


}