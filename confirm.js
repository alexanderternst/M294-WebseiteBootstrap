let kundenname = localStorage.getItem('Kundenname');
let email = localStorage.getItem('Email');
let telefon = localStorage.getItem('Telefon');
let dienstleistung = localStorage.getItem('Dienstleistung');
let prioritaet = localStorage.getItem('Prioritaet');
let preis = localStorage.getItem('Preis');

let date_html = localStorage.getItem('HeutigDatum');
let pickupdate_html = localStorage.getItem('Abholdatum');

let date_server = localStorage.getItem('HeutigDatum_server');
let pickupdate_server = localStorage.getItem('Abholdatum_server');

const post = {
    name: kundenname,
    email: email,
    phone: telefon,
    priority: prioritaet,
    service: dienstleistung,
    price: preis,

    create_date: date_html,
    pickup_date: pickupdate_html,

    create_date_server: date_server,
    pickup_date_server: pickupdate_server
};

$("#kundenname").html(post.name);
$("#email").html(post.email);
$("#telefon").html(post.phone);
$("#prioritaet").html(post.priority);
$("#dienstleistung").html(post.service);
$("#preis").html(post.price + " CHF");

$("#HeutigDatum").html(post.create_date);
$("#AbholDatum").html(post.pickup_date);

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

$(document).ready(function () {
    Formular();
    Back();
});

function Back() {

    $("#back").click(function (event) {
        window.location.href = 'formular.html';
    });
}

function Formular() {
    $("#form").submit(function (event) {
        event.preventDefault();
        SubmitForm();
    });
}

function SubmitForm(){
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
           "create_date": post.create_date_server,
           "pickup_date": post.pickup_date_server
       }),
    })
    // Schicke Daten zu der Funktion finish oder fange einen Error und gebe Error aus
        .then((response) => response.json())
        .then((json) => finish(json))
        .catch((error) => {
            alert("Verbindung mit Server konnte nicht hergestellt werden. " + error, "danger");
            window.location = 'Formular.html';
            return false;       
        });
   return true;
};

// Gebe Erfolgsmeldung aus
function finish(data) {
    alert('Eingabe wurde erfolgreich in Server eingefügt. Kundenid = ' + data.id, 'success');

    window.location = 'success.html';
};