let date;
let output;
let prioritaet;
let newDate;

let kundenname;
let email;
let telefon;
let dienstleistung;

$(document).ready(function () {
    Datum();
});


function Datum(){
    $("#Formular").submit(function(e){
        e.preventDefault();
        date = new Date();
        output = String(date.getDate()) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        //alert(output);
        Berechnung();
    });
}

function Berechnung() {
    prioritaet = $("#Prioritaet").val();
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
    Ausgabe();
}

function Ausgabe(){
    kundenname = $("#kundename").val();
    email = $("#mail").val();
    telefon = $("#tel").val();
    dienstleistung = $("#Service").val();

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

function Landingpage1() {
    //$("#klein").click($("#Service").val("Kleiner-Service"));
    //$("#gross").click($("#Service").val("Grosser-Service"));
    //$("#renn").click($("#Service").val("Rennski-Service"));
    //$("#bind").click($("#Service").val("Bindung-montieren-und-einstellen"));
    //$("#fell").click($("#Service").val("Fell-zuschneiden"));
    //$("#heiss").click($("#Service").val("Heisswachsen"));
    
}


// Daten an Server schicken
// Telefon und Email validieren