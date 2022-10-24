// Definieren aller Variablen
let date;
let date_server;
let date_html;
let pickupdate_server;
let pickupdate_html;

let prioritaet;
let kundenname;
let email;
let telefon;
let dienstleistung;

let prioritaetPreis;
let Preis;
let tage;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Funktion alert um Erfolg oder Fehler auszugebene mit Funktionvariablen message und type
function alert(message, type) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Funktionen Formular (für Submit) und Reset (für Reset) aufrufen
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    
    $("#kundenname").val(localStorage.getItem('Kundenname'));
    $("#mail").val(localStorage.getItem('Email'));
    $("#tel").val(localStorage.getItem('Telefon'));

    // $("#Prioritaet").val(localStorage.getItem(''));
    // $("#tel").val(localStorage.getItem(''));

    localStorage.clear();

    Formular();
    Reset();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Reset Button konfigurieren
function Reset() {
    $("#reset").click(function () {
        $("#AusgabeTitel").html("");
        $("#AusgabeParagraph").html("");
    });

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Berechne Datum
function Formular() {
    //Rufe function(e) auf wenn Formular Submitted wird
    $("#Formular").submit(function (event) {
        //Submite das Formular nicht (führe die action des Formulars nicht aus)
        event.preventDefault();

        //Rufe Funktionen aus
        Datum();
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Aktuelles Datum und Abholdatum ausrechnen
function Datum() {

    // Methode date kreieren
    date = new Date();
    // aktuelles datum speichern

    date_server = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
    date_html = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    // Speichere die prioritaet in Variable prioritaet
    prioritaet = $("#Prioritaet").val();

    // Rechne das Abholdatum aus
    switch (prioritaet) {
        case "Tief":
            // Anzahl Tage des Auftrags speichern
            tage = 12;
            // Preis der Priorität speichern
            prioritaetPreis = 0;
            break;

        case "Standard":
            tage = 7;
            prioritaetPreis = 10;
            break;

        case "Express":
            tage = 5;
            prioritaetPreis = 15;
            break;
        default:
            break;
    }
    pickupdate_server = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + tage) + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
    pickupdate_html = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + tage);
    Eingabe();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Eingaben in Variablen speichern
function Eingabe() {
    // Speichere kundenname, email, telefon und dienstleistung
    kundenname = $("#kundenname").val().trim();
    email = $("#mail").val().trim();
    telefon = $("#tel").val().trim();
    dienstleistung = $("#Service").val();
    Verify();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Datenfelder überprüfen und wenn nötig Fehlermeldung ausgeben, sonst Daten Ausgeben und zum Server schicken
function Verify() {
    if (email == '') {
        alert("Email ist unvollständig", "danger");
        $("#AusgabeTitel").html('');
        $("#AusgabeParagraph").html('');
        return false;
    }
    else if (kundenname == '') {
        alert("Kundenname ist unvollständig", "danger");
        $("#AusgabeTitel").html('');
        $("#AusgabeParagraph").html('');
        return false;
    }
    else if (telefon == '') {
        alert("Telefon ist unvollständig", "danger");
        $("#AusgabeTitel").html('');
        $("#AusgabeParagraph").html('');
        return false;
    }
    else if (dienstleistung == '') {
        alert("Dienstleistung ist nicht angegeben", "danger");
        $("#AusgabeTitel").html('');
        $("#AusgabeParagraph").html('');
        return false;
    }
    else if (prioritaet == '') {
        alert("Priorität ist nicht angegeben", "danger");
        $("#AusgabeTitel").html('');
        $("#AusgabeParagraph").html('');
        return false;
    }
    else {
        Preisberechnung();
        return false;
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Preisberechnung je nach Priorirät und Dienstleistung
function Preisberechnung() {
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Ausgabe in HTML
function AusgabeHTML() {
    localStorage.setItem('Kundenname', kundenname);
    localStorage.setItem('Email', email);
    localStorage.setItem('Telefon', telefon);
    localStorage.setItem('Dienstleistung', dienstleistung);
    localStorage.setItem('Prioritaet', prioritaet);
    localStorage.setItem('Preis', Preis);

    localStorage.setItem('HeutigDatum', date_html);
    localStorage.setItem('Abholdatum', pickupdate_html);
    
    localStorage.setItem('HeutigDatum_server', date_server);
    localStorage.setItem('Abholdatum_server', pickupdate_server);

    console.log("test");

    window.location = 'confirm.html';
}