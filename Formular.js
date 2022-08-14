// Definieren aller Variablen
let date;
let output;
let prioritaet;
let newDate;

let kundenname;
let email = null;
let telefon;
let dienstleistung;

let prioritaetPreis;
let Preis;

//Funktionn Datum aufrufen
$(document).ready(function () {
    Datum();
    reset();
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

function reset() {
    $("#reset").click(function (){
        $("#AusgabeTitel").html("");
        $("#AusgabeParagraph").html("");
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
            prioritaetPreis = 0;
            break;

        case "normal":
            newDate = (date.getDate() + 7) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            //alert(newDate);
            prioritaetPreis = 5;
            break;

        case "express":
            newDate = (date.getDate() + 5) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            //alert(newDate);
            prioritaetPreis = 10;
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
    verify();
}

function verify() {
    if ((email == "") || (kundenname == "") || (telefon == "") || (dienstleistung == "") || (prioritaet == "")){
        $("#AusgabeTitel").html('<br>Fehlerhafte eingabe');
        $("#AusgabeParagraph").html("");
    }else {
        Preisberechnung();
    }
    
}

function Preisberechnung(){
    switch (dienstleistung) {
        case "Kleiner-Service":
            Preis = 30 + prioritaetPreis;
            break;
    
        case "Grosser-Service":
            Preis = 60 + prioritaetPreis;
            break;

        
        case "Rennski-Service":
            Preis = 70 + prioritaetPreis;
            break;

        
        case "Bindung-montieren-und-einstellen":
            Preis = 15 + prioritaetPreis;
            break;

        case "Fell-zuschneiden":
            Preis = 15 + prioritaetPreis;
            break;

        case "Heisswachsen":
            Preis = 15 + prioritaetPreis;
            break;
        
        default:
            break;
    }
    AusgabeHTML();
}

function AusgabeHTML(){
    // Gebe Werte des Formulars in vorher kreiertenm Heading und Paragraph aus (überprüfung fehlt noch)
    $("#AusgabeTitel").html('Auswahl');
    $("#AusgabeParagraph").html(
        ` <br> Kundename: ${kundenname} <br>
        Email: ${email} <br>
        Telefon: ${telefon} <br>
        Dienstleistung: ${dienstleistung} <br>
        Priorität: ${prioritaet} <br>
        Heutiges Datum: ${output} <br>
        Abholdatum: ${newDate} <br>
        Totalpreis: ${Preis} CHF
        `)
};
