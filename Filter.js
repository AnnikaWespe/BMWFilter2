var columns = {
    bmwSach: "BMW_x002d_Sach_x002d_Nr_x002e__x0020__x0028_BMW_x0020_part_x0020_number_x0029_"
};
$(document).ready(function() {
    console.log("speak, I'm listening");
    $SP().list("Prüfberichte").info(function(fields) {
        var nameDisplaynameMap = {};
        var displayedColumns = [];
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i]["Name"];
            var value = fields[i]["DisplayName"];
            nameDisplaynameMap[key] = value;
        };

        $SP().list("Prüfberichte").view("Alle Dokumente", function(data, viewID) {
            for (var i = 0; i < data.fields.length; i++) {
                var displayedColumn = data.fields[i];
                displayedColumns.push(nameDisplaynameMap[displayedColumn])
            }

        });

        //$("#table").hide();

    });



});