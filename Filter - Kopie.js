var columns = {
    bmwSach: "BMW_x002d_Sach_x002d_Nr_x002e__x0020__x0028_BMW_x0020_part_x0020_number_x0029_"
};
$(document).ready(function() {
    $SP().list("Prüfberichte").get(function(items) {
        //console.log(items);
        //console.log(items[2].getAttribute(columns.bmwSach));
    });
    $SP().list("Prüfberichte").view("Alle Dokumente", function(data, viewID) {
        //for (var i = 0; i < data.fields.length; i++) console.log("Column " + i + ": " + data.fields[i]["DisplayName"]);
        console.log("Column 2: " + data.fields[2]["DisplayName"]);
    });
    $SP().list("Prüfberichte").info(function(fields) {
        var i = 3;
        //for (var i = 0; i < fields.length; i++) console.log(fields[i]["DisplayName"] + ": " + fields[i]["Description"]);
        console.log(fields[2]["DisplayName"] + ": " + fields[2]["Description"]);
        console.log(fields[2]);
    });
    $SP().list("Prüfberichte").getContentTypes(function(contentTypes) {
        for (var i = 0; i < contentTypes.length; i++) console.log(contentTypes[i].Name, contentTypes[i].ID, contentTypes[i].Description);
    });
});