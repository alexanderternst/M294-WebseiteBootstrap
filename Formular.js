// Definieren aller Variablen
let date;
let output;
let prioritaet;
let newDate;

let kundenid;
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

    output = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
    outputHTML = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

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
    newDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + tage) + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
    outputDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + tage);
    Eingabe();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Eingaben in Variablen speichern
function Eingabe() {
    // Speichere kundenname, email, telefon und dienstleistung
    kundenname = $("#kundename").val().trim();
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
    // Gebe Werte des Formulars in Heading und Paragraph aus
    $("#AusgabeTitelFehler").html('');
    $("#AusgabeTitel").html('Eingabe');
    $("#AusgabeParagraph").html(`
        <br> Kundename: ${kundenname} <br>
        Email: ${email} <br>
        Telefon: ${telefon} <br>
        Dienstleistung: ${dienstleistung} <br>
        Priorität: ${prioritaet} <br>
        Heutiges Datum: ${outputHTML} <br>
        Abholdatum: ${outputDate} <br>
        Totalpreis: ${Preis} CHF
        `)
    // Rufe Funktion auf welche Daten zum Server schickt.
    EingabeServer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Schicke Eingaben des Formulars zum Server
function EingabeServer() {
    // Speichere Eingabe in const Variable (Objekt)
    const post = {
        name: kundenname,
        email: email,
        phone: telefon,
        priority: prioritaet,
        service: dienstleistung,
        create_date: output,
        pickup_date: newDate
    };

    // Verbinde mit localhost Server und schicke Daten zum Server
    fetch('http://localhost:5000/api/registration', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": post.name,
            "email": post.email,
            "phone": post.phone,
            "priority": post.priority,
            "service": post.service,
            "create_date": post.create_date,
            "pickup_date": post.pickup_date
        }),
    })
        // Schicke Daten zu der Funktion finish oder fange einen Error und gebe Error aus
        .then((response) => response.json())
        .then((json) => finish(json))
        .catch((error) => {
            alert("Verbindung mit Server konnte nicht hergestellt werden. " + error, "danger");
            return false;
        });
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Gebe Erfolgsmeldung aus
function finish(data) {
    alert('Eingabe wurde erfolgreich in Server eingefügt. Kundenid = ' + data.id, 'success');
}