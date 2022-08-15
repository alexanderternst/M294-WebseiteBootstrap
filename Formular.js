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

//Funktionn Datum aufrufen
$(document).ready(function () {
    Datum();
    reset();
});

// Berechne Datum
function Datum() {
    //Rufe function(e) auf wenn Formular Submitted wird
    $("#Formular").submit(function (e) {
        //Submite das Formular nicht (führe die action des Formulars nicht aus)
        e.preventDefault();
        // methode date kreieren
        date = new Date();
        // aktuelles datum speichern

        output = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
        //console.log(output);
        //Rufe Funktion Berechnung auf
        Berechnung();
    });
}

//Reset Button konfigurieren
function reset() {
    $("#reset").click(function () {
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
        case "Tief":
            newDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 12) + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
            //alert(newDate);
            prioritaetPreis = 0;
            break;

        case "Standard":
            newDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 7) + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
            //alert(newDate);
            prioritaetPreis = 10;
            break;

        case "Express":
            newDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 5) + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
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
function Ausgabe() {
    // Speichere kundenname, email, telefon und dienstleistung
    kundenid = $("#kundenid").val().trim();
    kundenname = $("#kundename").val().trim();
    email = $("#mail").val().trim();
    telefon = $("#tel").val().trim();
    dienstleistung = $("#Service").val();
    verify();
}


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
    else {
        Preisberechnung();
    }

}

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

//Ausgabe
function AusgabeHTML() {
    // Gebe Werte des Formulars in vorher kreiertenm Heading und Paragraph aus (überprüfung fehlt noch)
    $("#AusgabeTitelFehler").html('');
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
    EingabeServer();
};

function EingabeServer() {
    const post = {
        id: kundenid,
        name: kundenname,
        email: email,
        phone: telefon,
        priority: prioritaet,
        service: dienstleistung,
        create_date: output,
        pickup_date: newDate
    };

    fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: post.id,
            name: post.name,
            email: post.email,
            phone: post.phone,
            priority: post.priority,
            service: post.service,
            create_date: post.create_date,
            pickup_date: post.pickup_date
        })
    }).then((response) => response.json())
        .then((json) => finish(json))
        .catch((error) => {
            alert("Post konnte nicht eingefügt werden. " + error, "danger");
            return false;
        })

    return true;

};
function finish(data) {
    alert('Post wurde erfolgreich eingefügt. id=' + data.id, 'success');
}
