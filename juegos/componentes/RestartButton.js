export class RestartButton{

//Se le manda el parámetro de la escena en la que se quiere pintar el botón
constructor(scene){
this.relatedScene=scene;

}

//Precargamos el botón
preload(){
    this.relatedScene.load.spritesheet('button','images/restart.png',{frameWidth:190,frameHeight:49});

}
//crear el botón precargando la escena:
create(){
    this.startButton=this.relatedScene.add.sprite(400,230,'button').setInteractive();
    //definiendo efectos del movimiento del ratón por el botón:
    this.startButton.on('pointerover',() =>{
        this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout',() =>{
        this.startButton.setFrame(0);
    });
    //añadiendo el click del botón
    this.startButton.on('pointerdown',() =>{
        console.log("pasa por aquí");
        this.relatedScene.scene.start('game');
    })
}











}