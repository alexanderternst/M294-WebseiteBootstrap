// Definieren aller Variablen
let date;
let output;
let prioritaet;
let newDate;

let kundenname;
let email;
let telefon;
let dienstleistung;

//Funktionn Datum aufrufen
$(document).ready(function () {
    Datum();
});


function Datum(){
    //Rufe function(e) auf wenn Formular Submitted wird
    $("#Formular").submit(function(e){
        //Submite das Formular nicht (führe die action des Formulars nicht aus)
        e.preventDefault();
        // methode date kreieren
        date = new Date();
        // aktuelles datum speichern
        output = String(date.getDate()) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        //alert(output);
        //Rufe Funktion Berechnung auf
        Berechnung();
    });
}

function Berechnung() {
    // Speichere die prioritaet
    prioritaet = $("#Prioritaet").val();
    // Rechne das Abholdatum aus
    switch (prioritaet) {
        case "tief":
            newDate = (date.getDate() + 12) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            //alert(newDate);
            break;

        case "normal":
            newDate = (date.getDate() + 7) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            //alert(newDate);
            break;

        case "express":
            newDate = (date.getDate() + 5) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            //alert(newDate);
            break;
    
        default:
            break;
    }
    // Rufe Funktion Ausgabe auf
    Ausgabe();
}

function Ausgabe(){
    // Speichere kundenname, email, telefon und dienstleistung
    kundenname = $("#kundename").val();
    email = $("#mail").val();
    telefon = $("#tel").val();
    dienstleistung = $("#Service").val();

    // Gebe Werte des Formulars in vorher kreiertenm Heading und Paragraph aus (überprüfung fehlt noch)
    $("#AusgabeTitel").html('Auswahl');
    $("#AusgabeParagraph").html(
        ` <br> Kundename ${kundenname} <br>
        Email ${email} <br>
        Telefon ${telefon} <br>
        Dienstleistung ${dienstleistung} <br>
        Priorität ${prioritaet} <br>
        Heutiges Datum ${output} <br>
        Abholdatum ${newDate}
        `
    );

}

// Test, Goal: wenn man cards drückt wählt es direkt den richtigen Service an
function Landingpage1() {
    //$("#klein").click($("#Service").val("Kleiner-Service"));
    //$("#gross").click($("#Service").val("Grosser-Service"));
    //$("#renn").click($("#Service").val("Rennski-Service"));
    //$("#bind").click($("#Service").val("Bindung-montieren-und-einstellen"));
    //$("#fell").click($("#Service").val("Fell-zuschneiden"));
    //$("#heiss").click($("#Service").val("Heisswachsen"));
    
}