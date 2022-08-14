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

// Berechne Datum
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

//Reset Button konfigurieren
function reset() {
    $("#reset").click(function (){
        $("#AusgabeTitel").html("");
        $("#AusgabeParagraph").html("");
    });
    
}

// Abholdatum ausrechnen
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
            prioritaetPreis = 10 ;
            break;

        case "express":
            newDate = (date.getDate() + 5) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            //alert(newDate);
            prioritaetPreis = 15;
            break;
    
        default:
            break;
    }
    // Rufe Funktion Ausgabe auf
    Ausgabe();
}

// Values in Variablen speichern
function Ausgabe(){
    // Speichere kundenname, email, telefon und dienstleistung
    kundenname = $("#kundename").val();
    email = $("#mail").val();
    telefon = $("#tel").val();
    dienstleistung = $("#Service").val();
    verify();
}


// Datenfelder überprüfen
function verify() {
    if ((email == "") || (kundenname == "") || (telefon == "") || (dienstleistung == "") || (prioritaet == "")){
        $("#AusgabeTitel").html('<br>Fehlerhafte eingabe');
        $("#AusgabeParagraph").html("");
    }else {
        Preisberechnung();
    }
    
}

// Preisberechnung mit priorität und Preis
function Preisberechnung(){
    switch (dienstleistung) {
        case "Kleiner-Service":
            Preis = 70 + prioritaetPreis;
            break;
    
        case "Grosser-Service":
            Preis = 140 + prioritaetPreis;
            break;

        
        case "Rennski-Service":
            Preis = 150 + prioritaetPreis;
            break;

        
        case "Bindung-montieren-und-einstellen":
            Preis = 40 + prioritaetPreis;
            break;

        case "Fell-zuschneiden":
            Preis = 40 + prioritaetPreis;
            break;

        case "Heisswachsen":
            Preis = 40 + prioritaetPreis;
            break;
        
        default:
            break;
    }
    AusgabeHTML();
}

//Ausgabe
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