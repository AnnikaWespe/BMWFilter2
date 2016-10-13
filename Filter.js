var columns = {
    bmwSach: "BMW_x002d_Sach_x002d_Nr_x002e__x0020__x0028_BMW_x0020_part_x0020_number_x0029_"
};
$(document).ready(function() {
    $SP().list("Prüfberichte").info(function(fields) {
        var i = 3;
        for (var i = 0; i < fields.length; i++) console.log(fields[i]["Name"] + ": " + fields[i]["Description"]);
        console.log(fields[2]["DisplayName"] + ": " + fields[2]["Description"]);
        //console.log("try nur Name" + fields[2]["Name"] + ": " + fields[2]["Description"]);

    });

    /*$SP().list("Prüfberichte").view("Alle Dokumente", function(data, viewID) {
        for (var i = 0; i < data.fields.length; i++) console.log("Column " + i + ": " + data.fields[i]["DisplayName"]);
        console.log("And the GUI for this view is :" + viewID);
        console.log(data.fields);
    });*/

});