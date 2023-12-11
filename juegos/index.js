import {Game} from './escenas/Game.js'
import { Gameover } from './escenas/game-over.js';
import { Congratulations } from './escenas/congratulations.js';


const config={
    type: Phaser.AUTO,
    width:800,
    height:500,
    scene:[Game,Congratulations,Gameover],
    physics:{
        default:'arcade',
        arcade:{
        
         debug:false
}}
}
var game=new Phaser.Game(config);