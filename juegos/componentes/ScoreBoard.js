

//clase para llevar el marcador del juego:
export class ScoreBoard{
    constructor(scene){
this.relatedScene=scene;
this.score=0;
    }


    create(){
        //Añadimos texto al marcador
        this.scoreText=this.relatedScene.add.text(16,16,'PUNTOS:0',{
            fontSize:'20px',
            fill:'#fff',
            fontFamily:'verdana,arial,sans-serif'
        });
    }

    incrementPoints(points){
        this.score+=points;
        this.scoreText.setText('PUNTOS: '+this.score);
    }
    
}