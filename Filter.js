var columns = {
    bmwSach: "BMW_x002d_Sach_x002d_Nr_x002e__x0020__x0028_BMW_x0020_part_x0020_number_x0029_"
};
$(document).ready(function() {
    $SP().list("Prüfberichte").info(function(fields) {
        var nameDisplaynameMap = {};
        var displayedColumns = [];
        var valuesForDropDown = {};
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i]["Name"];
            var value = fields[i]["DisplayName"];
            nameDisplaynameMap[key] = value;
            valuesForDropDown[key] = [];
        };

        $SP().list("Prüfberichte").view("Alle Dokumente", function(dataView, viewID) {
            for (var i = 0; i < dataView.fields.length; i++) {
                var displayedColumn = dataView.fields[i];
                console.log(displayedColumn);
                displayedColumns.push(nameDisplaynameMap[displayedColumn]);
            };
            var lengthDisplayedColumns = displayedColumns.length;
            for (var i = 0; i < lengthDisplayedColumns; i++) {
                $("#table").find("thead").find("tr").append("<th>" + displayedColumns[i] + "</th>");
            };
            $SP().list("Prüfberichte").get(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var tablebody = $("#table").find("tbody");
                    tablebody.append("<tr>");
                    for (var j = 0; j < dataView.fields.length; j++) {
                        var currentColumnName = dataView.fields[j];
                        var currentEntry = data[i].getAttribute(currentColumnName);
                        if (currentColumnName == "LinkFilename") {
                            tablebody.append('<td><a href="/sites/GWTZ/Prfberichte/' + currentEntry + '">' + currentEntry + "</a></td> ");
                        } else {
                            tablebody.append("<td>" + currentEntry + "</td>");
                        };
                        if (valuesForDropDown[currentColumnName].indexOf(currentEntry) == -1) {
                            valuesForDropDown[currentColumnName].push(currentEntry)
                        };
                    };
                    tablebody.append("</tr>");
                };

            });
        });
    });
});