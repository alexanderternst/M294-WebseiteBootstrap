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

//Funktionn Datum aufrufen
$(document).ready(function () {
    Formular();
    reset();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Berechne Datum
function Formular() {
    //Rufe function(e) auf wenn Formular Submitted wird
    $("#Formular").submit(function (event) {
        //Submite das Formular nicht (führe die action des Formulars nicht aus)
        event.preventDefault();

        //Rufe Funktionen aus
        Berechnung();
        reset();
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Reset Button konfigurieren
function reset() {
    $("#reset").click(function () {
        $("#AusgabeTitel").html("");
        $("#AusgabeParagraph").html("");
    });

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Abholdatum ausrechnen
function Berechnung() {

    // methode date kreieren
    date = new Date();
    // aktuelles datum speichern

    output = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
    //console.log(output);

    // Speichere die prioritaet
    prioritaet = $("#Prioritaet").val();
    // Rechne das Abholdatum aus
    switch (prioritaet) {
        case "Tief":
            tage = 12;
            //alert(newDate);
            prioritaetPreis = 0;
            break;

        case "Standard":
            tage = 7;
            //alert(newDate);
            prioritaetPreis = 10;
            break;

        case "Express":
            tage = 5;
            //alert(newDate);
            prioritaetPreis = 15;
            break;
        default:
            break;
    }
    newDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + tage) + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
    Ausgabe();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Values in Variablen speichern
function Ausgabe() {
    // Speichere kundenname, email, telefon und dienstleistung
    kundenname = $("#kundename").val().trim();
    email = $("#mail").val().trim();
    telefon = $("#tel").val().trim();
    dienstleistung = $("#Service").val();
    verify();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Datenfelder überprüfen
function verify() {
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
    else if (kundenid == '') {
        alert("Kundenid ist unvollständig", "danger");
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
    else{
        Preisberechnung();
        return false;
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Preisberechnung mit priorität und Preis
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

//Ausgabe
function AusgabeHTML() {
    // Gebe Werte des Formulars in vorher kreiertenm Heading und Paragraph aus (überprüfung fehlt noch)
    $("#AusgabeTitelFehler").html('');
    $("#AusgabeTitel").html('Auswahl');
    $("#AusgabeParagraph").html(`
        <br> Kundename: ${kundenname} <br>
        Email: ${email} <br>
        Telefon: ${telefon} <br>
        Dienstleistung: ${dienstleistung} <br>
        Priorität: ${prioritaet} <br>
        Heutiges Datum: ${output} <br>
        Abholdatum: ${newDate} <br>
        Totalpreis: ${Preis} CHF
        `)
        EingabeServer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function EingabeServer() {
    const post = {
        name: kundenname,
        email: email,
        phone: telefon,
        priority: prioritaet,
        service: dienstleistung,
        create_date: output,
        pickup_date: newDate
    };

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
        .then((response) => response.json())
        .then((json) => finish(json))
        .catch((error) => {
            alert("Post konnte nicht eingefügt werden. " + error, "danger");
            return false;
        });
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function finish(data) {
    alert('Post wurde erfolgreich eingefügt. id=' + data.id, 'success');
    console.log("test");
}
