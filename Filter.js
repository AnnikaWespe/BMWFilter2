$(document).ready(function() {
    $SP().list("Prüfberichte").get(function(items) {
        console.log(items);
        console.log(items[2].getAttribute("Name"));
    });
});