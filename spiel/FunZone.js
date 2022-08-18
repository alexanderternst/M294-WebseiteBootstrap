// Spielfigur variablen 
var spielfigur = new Image();
let x = 0;
let y = 0;
let richtung = 39;

/////////////////////////////////////////////////////////////////////////////////////////////////

//algemeine variablen
let meter = 0;
let leben = 3;
let takten = 30;
let gegenstaendeBewegung = 2;
let schwierigkeit;
let i = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////

//Stein variablen muss man für jeden stein angeben
var stein = new Image();
let steinx = Math.floor(Math.random() * 18) * 18 + 20;
let steiny = 600;

var stein2 = new Image();
let stein2x = Math.floor(Math.random() * 21) * 16 + 20;
let stein2y = 500;

var stein3 = new Image();
let stein3x = Math.floor(Math.random() * 13) * 23 + 20;
let stein3y = 700;

var stein4 = new Image();
let stein4x = Math.floor(Math.random() * 5) * 30 + 20;
let stein4y = 400;

var stein5 = new Image();
let stein5x = 100;
let stein5y = 300;

/////////////////////////////////////////////////////////////////////////////////////////////////

//Stein variablen muss man für jeden stein angeben
var baum = new Image();
let baumx = 300
let baumy = 200;

var baum2 = new Image();
let baum2x = Math.floor(Math.random() * 19) * 20 + 20;
let baum2y = 100;

var baum3 = new Image();
let baum3x = Math.floor(Math.random() * 18) * 18 + 20;
let baum3y = 550;

var baum4 = new Image();
let baum4x = Math.floor(Math.random() * 20) * 15 + 20;
let baum4y = 450;

var baum5 = new Image();
let baum5x = Math.floor(Math.random() * 15) * 22 + 20;
let baum5y = 50;

/////////////////////////////////////////////////////////////////////////////////////////////////

let schneeboden1 = new Image();
let boden1y = 0;
let boden1x = 0;

let schneeboden2 = new Image();
let boden2y = 1800;
let boden2x = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////

//Wen alles geladen is wird diese es losgehen
$(document).ready(function () {

    // gibt es canavas als 2 d spielfeld an
    let spielbrett = document.getElementById('leinwand');
    spielfeld = spielbrett.getContext('2d');

    spielanfang = window.setInterval(anfang, 10);
    // wen man auf Spielen Drückt fängt das game an
    $("#go").click(function () {
        schwierigkeiten();
        $("#go").hide();
        $("#schwierigkeitEinstllen").hide();
        $("#leben").show();
        $("#meter").show();
        $("#rechts").show();
        $("#links").show();
        richtung = 37;

        // die Taktung wird hier ausgeben
        takt = window.setInterval(taktung, takten);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////

function schwierigkeiten(){
    //Value von Schwierigkeit wird ausgelessen
    schwierigkeit = document.querySelector('input[name=schwierigkeit]:checked').value;

    //Die Schwierigkeit wird anhaand des Value geändert
    console.log(schwierigkeit);
    switch(schwierigkeit){
        case "1":
            console.log("1")
            leben = 5;
            takten = 30;
            gegenstaendeBewegung = 1;
        break;
        case "2":
            console.log("2")
            leben = 3;
            takten = 30;
            gegenstaendeBewegung = 2;
        break;
        case "3":
            console.log("3")
            leben = 3;
            takten = 30;
            gegenstaendeBewegung = 3;
        break;
        case "4":
            console.log("4")
            leben = 3;
            takten = 10;
            gegenstaendeBewegung = 4;
        break;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

function anfang(){
    //fügt die Spielfigur ein
    spielfeld.drawImage(spielfigur, x, y);
    zeichneZielfeldSpielfigur();

    //boden(schneeboden1, boden1x, boden1y);
    //boden(schneeboden2, boden2x, boden2y);

    //Zeichnet alle baume ein muss immer für jeden einzelnen angeben werden
    zeichneZielfeldBaum(baum, baumx, baumy);
    zeichneZielfeldBaum(baum2, baum2x, baum2y);
    zeichneZielfeldBaum(baum3, baum3x, baum3y);
    zeichneZielfeldBaum(baum4, baum4x, baum4y);
    zeichneZielfeldBaum(baum5, baum5x, baum5y);

    //Zeichnet alle steine ein muss immer für jeden einzelnen angeben werden
    zeichneZielfeldStein(stein, steinx, steiny);
    zeichneZielfeldStein(stein2, stein2x, stein2y);
    zeichneZielfeldStein(stein3, stein3x, stein3y);
    zeichneZielfeldStein(stein4, stein4x, stein4y);
    zeichneZielfeldStein(stein5, stein5x, stein5y);

    x += 1;
    y += 1;
    if(i >= 190){
        x = 190;
        richtung = 0;
    }
    zeichneZielfeldSpielfigur();
    spielfeld.clearRect(0, 0, 400, 700);
    if(i == 200){
        clearInterval(spielanfang);
        $("#go").show();
    }
    i++;
}

/////////////////////////////////////////////////////////////////////////////////////////////////

//Hier werden die Baume/Steine bewegt mit einem Array weil ich 2 returns brauche
function gegenstaendePlay(objecty, objectx) {
    objecty -= gegenstaendeBewegung;
    if (objecty == -20) {
        objecty = 700;
        objectx = Math.floor(Math.random() * 20) * 19 + 20;
    }
    return [objecty, objectx];
}

/////////////////////////////////////////////////////////////////////////////////////////////////

//Prüft ob ein Baum/Stein den Spielfigur berürht
function zielfelderreicht() {
    checkLosseLive(baumx, baumy);
    checkLosseLive(baum2x, baum2y);
    checkLosseLive(baum3x, baum3y);
    checkLosseLive(baum4x, baum4y);
    checkLosseLive(baum5x, baum5y);

    checkLosseLive(steinx, steiny);
    checkLosseLive(stein2x, stein2y);
    checkLosseLive(stein3x, stein3y);
    checkLosseLive(stein4x, stein4y);
    checkLosseLive(stein5x, stein5y);
}

/////////////////////////////////////////////////////////////////////////////////////////////////

//Wen das 0 leben hat wird das Ausgeführt
function spielende() {
    clearInterval(takt);
    $("#rechts").hide();
    $("#links").hide();
    $('#TryAgain').show();
    $('#TryAgain').click(function () {
    window.location.reload();
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////

//prüft ob man ein Leben verloren hat
function checkLosseLive(objectx, objecty) {
    for (let i = -20; i <= 20; i++) {
        let checkx = x + i;
        let checky = y + i;
        if ((checkx == objectx) && (checky == objecty)) {
            document.getElementById("leinwand").style.borderColor = "red";
            // Leben Verloren!
            leben--;
            console.log(`Leben Verloren x: ${checkx} objectx: ${objectx}  y: ${y} objecty: ${objecty} `);
            $('#leben').val(`Leben: ${leben}`);
            if (leben == 0) {
                spielende();
            }
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

//gibt die meter an
function meterangabe() {
    if (baumy % 20 == 0) {
        meter++
        //console.log(meter);
        $('#meter').val(`Meter: ${meter}`);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

//zeichnet der Baum auf das Spielfeld
function zeichneZielfeldBaum(object, objectx, objecty) {
    object.src = "bilder/baum.png";
    object.onload = function () {
        spielfeld.drawImage(object, objectx, objecty);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

//zeichnet der Spielfigrauf das Spielfeld
function zeichneZielfeldSpielfigur() {
    spielfigur.src = "bilder/Spielfigur" + + richtung + ".png";
    spielfigur.onload = function () {
        spielfeld.drawImage(spielfigur, x, y);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

//zeichnet der Stein auf das Spielfeld
function zeichneZielfeldStein(object, objectx, objecty) {
    object.src = "bilder/stein.png";
    object.onload = function () {
        spielfeld.drawImage(object, objectx, objecty);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

// Die Taktung wird angeben das es überhaubt bewegt
function taktung() {

    document.getElementById("leinwand").style.borderColor = "blue";
    zeichnen();
    spielfeld.drawImage(spielfigur, x, y);
    zielfelderreicht();
    meterangabe();
    spielfeld.clearRect(0, 0, 400, 700);
}

/////////////////////////////////////////////////////////////////////////////////////////////////

// wen man pfeil links und rechts bewegt
$(document).bind('keydown', function (evt) {
    // console.log(evt.keyCode);
    if (evt.keyCode == 37) {
        x -= 10;
        if (y >= 680) {
            y = 680;
        }
        if (x <= 0) {
            x = 0;
        }
        richtung = 37;
        zeichneZielfeldSpielfigur();
    } else if (evt.keyCode == 39) {
        x += 10;
        if (y >= 680) {
            y = 680;
        }
        if (x >= 400) {
            x = 380;
        }
        richtung = 39;
        zeichneZielfeldSpielfigur();
    } 
});

/////////////////////////////////////////////////////////////////////////////////////////////////

//Wen linker button drückt
$("#links").click(function () {
    x -= 10;
    if (y >= 680) {
        y = 680;
    }
    if (x <= 0) {
        x = 0;
    }
    richtung = 37;
    zeichneZielfeldSpielfigur();
});

/////////////////////////////////////////////////////////////////////////////////////////////////

//rechter Button drückt
$("#rechts").click(function () {
    x += 10;
    if (y >= 680) {
        y = 680;
    }
    if (x >= 400) {
        x = 380;
    }
    richtung = 39;
    zeichneZielfeldSpielfigur();
});


/////////////////////////////////////////////////////////////////////////////////////////////////////

//Zeichne Spielfeld
function boden (object, objectx, objecty){
    object.src = "bilder/Skipiste.png";
    object.onload = function () {
        spielfeld.drawImage(object, objectx, objecty);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function zeichnen(){

    //boden(schneeboden1, boden1x, boden1y);
    //let bodenkord1 = bodenPlay(boden1y, boden1x)
    //boden1y = bodenkord1[0];
    //boden1x = bodenkord1[1];

    //boden(schneeboden2, boden2x, boden2y);
    //let bodenkord2 = bodenPlay(boden2y, boden2x)
    //boden2y = bodenkord2[0];
    //boden2x = bodenkord2[1];

    zeichneZielfeldSpielfigur();

    zeichneZielfeldBaum(baum, baumx, baumy);
    let baumkord1 = gegenstaendePlay(baumy, baumx)
    baumy = baumkord1[0];
    baumx = baumkord1[1];

    zeichneZielfeldBaum(baum2, baum2x, baum2y);
    let baumkord2 = gegenstaendePlay(baum2y, baum2x)
    baum2y = baumkord2[0];
    baum2x = baumkord2[1];

    zeichneZielfeldBaum(baum3, baum3x, baum3y);
    let baumkord3 = gegenstaendePlay(baum3y, baum3x)
    baum3y = baumkord3[0];
    baum3x = baumkord3[1];

    zeichneZielfeldBaum(baum4, baum4x, baum4y);
    let baumkord4 = gegenstaendePlay(baum4y, baum4x)
    baum4y = baumkord4[0];
    baum4x = baumkord4[1];

    zeichneZielfeldBaum(baum5, baum5x, baum5y);
    let baumkord5 = gegenstaendePlay(baum5y, baum5x)
    baum5y = baumkord5[0];
    baum5x = baumkord5[1];


    zeichneZielfeldStein(stein, steinx, steiny);
    let steinkord1 = gegenstaendePlay(steiny, steinx);
    steiny = steinkord1[0];
    steinx = steinkord1[1];

    zeichneZielfeldStein(stein2, stein2x, stein2y);
    let steinkord2 = gegenstaendePlay(stein2y, stein2x);
    stein2y = steinkord2[0];
    stein2x = steinkord2[1];

    zeichneZielfeldStein(stein3, stein3x, stein3y);
    let steinkord3 = gegenstaendePlay(stein3y, stein3x);
    stein3y = steinkord3[0];
    stein3x = steinkord3[1];

    zeichneZielfeldStein(stein4, stein4x, stein4y);
    let steinkord4 = gegenstaendePlay(stein4y, stein4x);
    stein4y = steinkord4[0];
    stein4x = steinkord4[1];

    zeichneZielfeldStein(stein5, stein5x, stein5y);
    let steinkord5 = gegenstaendePlay(stein5y, stein5x);
    stein5y = steinkord5[0];
    stein5x = steinkord5[1];

}

///////////////////////////////////////////////////////////////////////////////////

function bodenPlay(objecty, objectx) {
    objecty -= gegenstaendeBewegung;
    if (objecty == -1800) {
        objecty = 1800;

    }
    return [objecty, objectx];
}