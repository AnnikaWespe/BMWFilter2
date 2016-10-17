var columns = {
    bmwSach: "BMW_x002d_Sach_x002d_Nr_x002e__x0020__x0028_BMW_x0020_part_x0020_number_x0029_"
};
$(document).ready(function() {
    $SP().list("Prüfberichte").info(function(fields) {
        var nameDisplaynameMap = {};
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i]["Name"];
            var value = fields[i]["DisplayName"];
            nameDisplaynameMap[key] = value;
        };
        console.log("nameDisplaynameMap: " + nameDisplaynameMap.BMW_x002d_Sach_x002d_Nr_x002e__x0020__x0028_BMW_x0020_part_x0020_number_x0029_);
        //console.log(fields[i]["Name"] + ": " + fields[i]["DisplayName"]);
    });

    $SP().list("Prüfberichte").view("Alle Dokumente", function(data, viewID) {
        for (var i = 0; i < data.fields.length; i++)
        /*console.log("Column " + i + ": " + data.fields[i]["DisplayName"]);
                console.log("And the GUI for this view is :" + viewID);*/
            console.log(data.fields[0]);
    });

});