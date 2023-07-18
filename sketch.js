
//Variáveis da bola
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;


//Variáveis da raquete
let xRaquete =5;
let yRaquete =150;
let raqueteComprimento =10;
let raqueteAltura = 90;

//Variáveis do oponente
let xRaqueteOponente=585;
let yRaqueteOponente=150;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu=false;

//Pontuação
let meusPontos = 0;
let pontosDoOponente =0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha=loadSound("trilha.mp3");
  ponto=loadSound("ponto.mp3");
  raquetada=loadSound("raquetada.mp3");
  
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  trilha.setVolume(0.2);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaBorda();
  mostraRaquete (xRaquete,yRaquete);
  movimentaMinhaRaquete ();
  verificaColisaoRaquete (xRaquete,yRaquete);
  mostraRaquete (xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete (xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  console.log("Chance atual do computador errar:" , chanceDeErrar *2, "%");
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;;
}

function verificaBorda(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio  > height || yBolinha - raio < 0 ){
    velocidadeYBolinha *= -1;
  } 
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 55;
    }
    if (xBolinha + raio > 600){
    xBolinha = 560;
    xBolinha *=1;
}
}

function mostraRaquete (x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete (){
  if (keyIsDown(UP_ARROW)){
    yRaquete-=10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete+=10;
  }
  yRaquete = constrain(yRaquete, 10, 310);
}
function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1;
        raquetada.play();
        if (chanceDeErrar < 40){
          chanceDeErrar += 10;
        }
        else{
          chanceDeErrar = 49;
        }
    }
}


//movimentação automática do oponente
function movimentaRaqueteOponente (){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
}

/*
//Movimentação manual do oponente
function movimentaRaqueteOponente (){
  if (keyIsDown(87)){
    yRaqueteOponente-=10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente+=10;
  
}
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
}
*/
  
function incluiPlacar (){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(148,0,211));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(148,0,211));
  rect(450,10,40,20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}
function marcaPonto (){
  if(xBolinha>595){
    meusPontos++;
    ponto.play();
    chanceDeErrar = 0;
  }
  if(xBolinha<7){
    pontosDoOponente++;
    ponto.play();
    chanceDeErrar = 0;
  }
}





