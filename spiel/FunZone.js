var spielfigur = new Image();
let x = 190;
let y = 200;
let richtung = 39;

let meter = 0;
let leben = 3;
let takten = 30;
let gegenstaendeBewegung = 2;
let schwierigkeitt;

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

$(document).ready(function () {
    let spielbrett = document.getElementById('leinwand');
    spielfeld = spielbrett.getContext('2d');

    spielfigur.src = "bilder/Spielfigur" + + richtung + ".png";
    spielfigur.onload = function () {
        spielfeld.drawImage(spielfigur, x, y);
    }
    console.log("bilder/Spielfigur" + + richtung + ".png");

    zeichneZielfeldBaum(baum, baumx, baumy);
    zeichneZielfeldBaum(baum2, baum2x, baum2y);
    zeichneZielfeldBaum(baum3, baum3x, baum3y);
    zeichneZielfeldBaum(baum4, baum4x, baum4y);
    zeichneZielfeldBaum(baum5, baum5x, baum5y);

    zeichneZielfeldStein(stein, steinx, steiny);
    zeichneZielfeldStein(stein2, stein2x, stein2y);
    zeichneZielfeldStein(stein3, stein3x, stein3y);
    zeichneZielfeldStein(stein4, stein4x, stein4y);
    zeichneZielfeldStein(stein5, stein5x, stein5y);

    $("#go").click(function () {
        $("#go").hide();
        $("#schwierigkeit").hide();
        $("#leben").show();
        $("#rechts").show();
        $("#links").show();
        alert(schwierigkeit)
        switch(schwierigkeit){
            case 1:
                
            break;
            case 2:

            break;
            case 3:

            break;
            case 4:

            break;
        }
        takt = window.setInterval(taktung, takten);
    });

    function gegenstaendePlay(objecty, objectx) {
        objecty -= gegenstaendeBewegung;
        if (objecty == -20) {
            objecty = 700;
            objectx = Math.floor(Math.random() * 20) * 19 + 20;
        }
        return [objecty, objectx];
    }

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

    function spielende() {
        clearInterval(takt);
        $("#rechts").hide();
        $("#links").hide();
        $('#TryAgain').show();
        $('#TryAgain').click(function () {
            window.location.reload();
        });
    }

    function checkLosseLive(objectx, objecty) {
        for (let i = -15; i <= 20; i++) {
            let checkx = x + i;
            let checky = y + i;
            if ((checkx + i == objectx) && (checky + i == objecty)) {
                document.getElementById("leinwand").style.borderColor = "red";
                // Leben Verloren!
                leben--;
                console.log(`Leben Verloren x: ${checkx} objectx: ${objectx}  y: ${y} objecty: ${objecty} `)
                $('#leben').val(`Leben: ${leben}               Meter: ${meter}`);
                if (leben == 0) {
                    spielende();
                }
            }
        }
    }

    function meterangabe() {
        if (baumy % 20 == 0) {
            meter++
            //console.log(meter);
            $('#leben').val(`Leben: ${leben}               Meter: ${meter}`);
        }
    }

    function zeichneZielfeldBaum(object, objectx, objecty) {
        object.src = "bilder/baum.png";
        object.onload = function () {
            spielfeld.drawImage(object, objectx, objecty);
        }
    }

    function zeichneZielfeldSpielfigur() {
        spielfigur.src = "bilder/Spielfigur" + + richtung + ".png";
        spielfigur.onload = function () {
            spielfeld.drawImage(spielfigur, x, y);
        }
        console.log("bilder/Spielfigur" + + richtung + ".png");
    }

    function zeichneZielfeldStein(object, objectx, objecty) {
        object.src = "bilder/stein.png";
        object.onload = function () {
            spielfeld.drawImage(object, objectx, objecty);
        }
    }

    function taktung() {

        document.getElementById("leinwand").style.borderColor = "blue";
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


        spielfeld.drawImage(spielfigur, x, y);
        zielfelderreicht();
        meterangabe();
        spielfeld.clearRect(0, 0, 400, 700);
    }


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
            console.log("links" + x);
        } else if (evt.keyCode == 39) {
            x += 10;
            if (y >= 680) {
                y = 680;
            }
            if (x >= 400) {
                x = 380;
            }
            richtung = 39;
            console.log("rechts" + x);
        } 
    });

    $("#links").click(function () {
        x -= 10;
        if (y >= 680) {
            y = 680;
        }
        if (x <= 0) {
            x = 0;
        }
        richtung = 37;
        console.log("links" + x);
    });

    $("#rechts").click(function () {
        x += 10;
        if (y >= 680) {
            y = 680;
        }
        if (x >= 400) {
            x = 380;
        }
        richtung = 39;
        console.log("rechts" + x);
    });
});