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
            valuesForDropDown[value] = [];
        };

        $SP().list("Prüfberichte").view("Alle Dokumente", function(dataView, viewID) {
            for (var i = 0; i < dataView.fields.length; i++) {
                var displayedColumn = dataView.fields[i];
                console.log(displayedColumn);
                displayedColumns.push(nameDisplaynameMap[displayedColumn]);
            };

            /*<select name="cars" multiple>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>*/

            var lengthDisplayedColumns = displayedColumns.length;
            for (var i = 0; i < lengthDisplayedColumns; i++) {
                $("#table").find("thead").find("tr").append('<th><select name="' + displayedColumns[i] + '" multiple><option value="volvo">Volvo</option></th>');
            };
            $SP().list("Prüfberichte").get(function(data) {
                var numberOfRows = data.length;
                for (var i = 0; i < numberOfRows; i++) {
                    var $tablebody = $("#table").find("tbody");
                    var numberOfColumns = dataView.fields.length;
                    $tablebody.append("<tr>");
                    for (var j = 0; j < numberOfColumns; j++) {
                        var currentColumnName = dataView.fields[j];
                        var currentEntry = data[i].getAttribute(currentColumnName);
                        if (currentColumnName == "LinkFilename") {
                            $tablebody.append('<td><a href="/sites/GWTZ/Prfberichte/' + currentEntry + '">' + currentEntry + "</a></td> ");
                        } else {
                            $tablebody.append("<td>" + currentEntry + "</td>");
                        };
                        if (valuesForDropDown[currentColumnName].indexOf(currentEntry) == -1) {
                            valuesForDropDown[nameDisplaynameMap[currentColumnName]].push(nameDisplaynameMap[currentEntry]);
                        };
                    };
                    $tablebody.append("</tr>");
                };
                $("select").each(function(index, value) {
                    var $currentName = $(this).attr('name');
                    var currentDropDownValues = valuesForDropDown[$currentName];
                    var currentDropDownValuesLength = currentDropDownValues.length;
                    for (var i = 0; i < currentDropDownValuesLength; i++) {
                        $(this).append('<option value="' + currentDropDownValues[i] + '">' + currentDropDownValues[i] + '</option>')
                    }
                })
            });
        });
    });
});