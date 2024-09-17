var direcao;
var exibeCanvas;
var context;
var imagemMapeada;
var mapaLinhas;
var mapaColunas;
var Mapa;
//1
var tank1Frames;
var tank1Index;
var tank1Rotation;
var tank1X;
var tank1Y;
//2
var tank2Frames;
var tank2Index;
var tank2Rotation;
var tank2X;
var tank2Y;

var bandeira;
var bandeiraIndex;
var bandeiraX;
var bandeiraY;

var pontosjog = 0;
var pontoscomput = 0;

var som;
var som2;

window.addEventListener('load', canvasApl, false);

function canvasApl() {
    exibeCanvas = document.getElementById("canvas");
    exibeCanvas.addEventListener('click', eventoClick, false);
    context = exibeCanvas.getContext("2d");
    imagemMapeada = new Image();
    imagemMapeada.addEventListener('load', iniciar, false);
    imagemMapeada.src="images/tanks.png";

    mapaLinhas = 15;
    mapaColunas = 15;
    Mapa = [
        [0,20,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,20,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,20,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,20,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [20,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,20,0,0],
        [0,0,0,0,0,0,20,0,0,0,0,0,0,0,0],
    ];
    tank1Frames=[1,2,3,4,5,6,7,8];
    tank1Index = 0;
    tank1Rotation = 90;
    tank1X = Math.floor(Math.random()* 400);
    tank1Y = Math.floor(Math.random()* 400);

    tank2Frames = [9,10,11,12,13,14,15,16];
    tank2Index = 0;
    tank2Rotation = 90;
    tank2X = Math.floor(Math.random()* 400);
    tank2Y = Math.floor(Math.random()* 400);

    bandeira = [0,21,21,21,21,0];
    bandeiraIndex = 0;
    bandeiraX = Math.floor(Math.random()* 400);
    bandeiraY = Math.floor(Math.random()* 400);

    direcao = 1;

    som = document.getElementById("som");
    som2 = document.getElementById("som2");
}

function iniciar() {
    setInterval(gameLoop, 50);
}


function desenhaTela() {
    for (var linha= 0; linha<mapaLinhas; linha++){
        for (var coluna = 0; coluna<mapaColunas; coluna++){
            var mapaId = Mapa[linha][coluna];
            var sourceX = Math.floor(mapaId % 8) * 32;
            var sourceY = Math.floor(mapaId / 8) * 32;
            context.drawImage(imagemMapeada, sourceX, sourceY, 32, 32, coluna*32, linha * 32, 32, 32);
        }
    }
}

function desenhaTank() {
    var angleInRadians = tank1Rotation * Math.PI / 180;
    context.translate(tank1X+16, tank1Y+16);
    context.rotate(angleInRadians);
    var sourceX = Math.floor(tank1Frames[tank1Index]% 8)* 32;
    var sourceY = Math.floor(tank1Frames[tank1Index]/ 8)* 32;
    context.drawImage(imagemMapeada, sourceX, sourceY,32,32,-16,-16,32,32)
    context.setTransform(1,0,0,1,0,0);

    tank1Index++;
    if (tank1Index == tank1Frames.length) {
        tank1Index = 0;
    }
  }


function eventoClick() {
    direcao++;

    if (direcao == 5) {
        direcao = 1;
    }
  }

function atualizarTank1() {
    if (direcao == 1) {
        tank1Rotation = 90;
        tank1X = tank1X+2;
    } else if (direcao==2) {
        tank1Rotation = 180;
        tank1Y = tank1Y+2;
    } else if (direcao==3) {
        tank1Rotation = 270;
        tank1X = tank1X-2;
    } else if (direcao==4) {
        tank1Rotation = 0;
        tank1Y = tank1Y-2;
    }

    if (tank1X>=416)
        direcao=3;
    else if (tank1X<=0)
        direcao=1;

    if (tank1Y<=0)
        direcao=2;
    else if (tank1Y>=416)
        direcao=4;
  }

function desenhaInimigo() {
    var angleInRadians2 = tank2Rotation * Math.PI / 180;
    context.translate(tank2X + 16, tank2Y + 16);
    context.rotate(angleInRadians2);

    var InimigoX = Math.floor(tank2Frames[tank2Index]% 8)* 32;
    var InimigoY = Math.floor(tank2Frames[tank2Index]/ 8)* 32;

    context.drawImage(imagemMapeada, InimigoX, InimigoY,32,32,-16,-16,32,32);
    context.setTransform(1,0,0,1,0,0);
    
    tank2Index++;
    if (tank2Index == tank2Frames.length) {
        tank2Index = 0;
    }
  }

function desenhaBandeira() {
    context.translate(bandeiraX + 16, bandeiraY + 16);
    var BandeiraX = Math.floor(bandeira[bandeiraIndex]% 8)* 32;
    var BandeiraY = Math.floor(bandeira[bandeiraIndex]/ 8)* 32;

    context.drawImage(imagemMapeada, BandeiraX, BandeiraY,32,32,-16,-16,32,32);
    context.setTransform(1, 0, 0, 1, 0, 0);
    
    bandeiraIndex++;
    if (bandeiraIndex == bandeira.length) {
        bandeiraIndex = 0;
    }
}

function atualizarInimigo() {
    if (tank2X>bandeiraX) {
        tank2X -= 1;
        tank2Rotation = 270;
    } else if (tank2X<bandeiraX) {
        tank2X += 1;
        tank2Rotation = 90;
    } else if (tank2Y>bandeiraY) {
        tank2Y -= 1;
        tank2Rotation = 0;
    } else if (tank2Y<bandeiraY) {
        tank2Y += 1;
        tank2Rotation = 180;
    } 

    if (tank2X>bandeiraX) {
        tank2X -= 1;
    } else if (tank2Y<bandeiraY) {
        tank2Y += 1;
    }
}

function detectColisBandeira() {
    if (Math.abs(bandeiraX - tank2X) < 16 && Math.abs(bandeiraY - tank2Y) < 16) {
        bandeiraX = Math.floor(Math.random()* 400);
        bandeiraY = Math.floor(Math.random()* 400);
        pontoscomput++;
    }
    

    if (Math.abs(bandeiraX - tank1X) < 16 && Math.abs(bandeiraY - tank1Y) < 16) {
        bandeiraX = Math.floor(Math.random()* 400);
        bandeiraY = Math.floor(Math.random()* 400);
        pontosjog++;
    }
}

function desenhaTexto() {
    context.fillStyle = "rgb(250, 250, 250)";
    context.font = "16px Arial";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("Jogador: " + pontosjog, 5, 5);
    context.fillText("Computador: " + pontoscomput, 340, 5);
}

function gameOver() {
    if (pontosjog == 5) {
        som.play(); 
        alert ("Parabéns você ganhou!");
        pontosjog = 0;
        window.location.reload();
    } else if (pontoscomput == 5) {
        som2.play();
        alert ("O computador ganhou!");
        pontoscomput = 0;
        window.location.reload();
    }
}

function gameLoop() {
    desenhaTela();
    atualizarTank1();
    atualizarInimigo();
    detectColisBandeira();
    desenhaTank();
    desenhaInimigo();
    desenhaBandeira();
    desenhaTexto();
    
    gameOver();
}