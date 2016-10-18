var columns = {
    bmwSach: "BMW_x002d_Sach_x002d_Nr_x002e__x0020__x0028_BMW_x0020_part_x0020_number_x0029_"
};
$(document).ready(function() {
    $SP().list("Prüfberichte").info(function(fields) {
        var nameDisplaynameMap = {};
        var displaynameNameMap = {};
        var displayedColumns = [];
        var valuesForDropDown = {};
        var displayNameColumnNumberMap = {};
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i]["Name"];
            var value = fields[i]["DisplayName"];
            nameDisplaynameMap[key] = value;
            displaynameNameMap[value] = key;
            valuesForDropDown[key] = [];
        };

        $SP().list("Prüfberichte").view("Alle Dokumente", function(dataView, viewID) {
            var numberOfColumns = dataView.fields.length;
            for (var i = 0; i < numberOfColumns; i++) {
                var currentColumn = dataView.fields[i];
                var currentDisplayName = nameDisplaynameMap[currentColumn];
                displayedColumns.push(currentDisplayName);
                displayNameColumnNumberMap[currentDisplayName] = i;
                console.log("displayNameColumnNumberMap:" + displayNameColumnNumberMap[currentDisplayName]);
            };
            for (var i = 0; i < numberOfColumns; i++) {
                $("#table").find("thead").find("tr").append('<th><select name="' + displayedColumns[i] + '" multiple></th>');
            };
            $SP().list("Prüfberichte").get(function(data) {
                var numberOfRows = data.length;
                for (var i = 0; i < numberOfRows; i++) {
                    var $tablebody = $("#table").find("tbody");
                    $tablebody.append("<tr>");
                    for (var j = 0; j < dataView.fields.length; j++) {
                        var currentColumnName = dataView.fields[j];
                        var currentEntry = data[i].getAttribute(currentColumnName);
                        if (currentColumnName == "LinkFilename") {
                            $tablebody.append('<td><a href="/sites/GWTZ/Prfberichte/' + currentEntry + '">' + currentEntry + "</a></td> ");
                        } else {
                            $tablebody.append("<td>" + currentEntry + "</td>");
                        };
                        if (valuesForDropDown[currentColumnName].indexOf(currentEntry) == -1) {
                            valuesForDropDown[currentColumnName].push(currentEntry);
                        };
                    };
                    $tablebody.append("</tr>");
                };
                $("select").each(function(index, value) {
                    var currentColumnDisplayName = $(this).attr('name');
                    var currentColumnName = displaynameNameMap[currentColumnDisplayName];
                    var currentDropDownValues = valuesForDropDown[currentColumnName];
                    var numberOfOptions = currentDropDownValues.length;
                    for (var i = 0; i < numberOfOptions; i++) {
                        $(this).append('<option value="' + currentDropDownValues[i] + '">' + currentDropDownValues[i] + '</option>')
                    }

                });
                $("#filter").click(function() {
                    var filterBy = {};
                    var selectedProperties = [];
                    $("select").each(function() {
                        var selectedValues = $(this).val();
                        var propertyName = $(this).attr('name');
                        var columnNumber = displayNameColumnNumberMap[propertyName];
                        console.log(selectedValues);
                        if (selectedValues !== null) {
                            filterBy[columnNumber] = selectedValues;
                            selectedProperties.push(columnNumber);
                        }
                    });
                    var numberOfProperties = selectedProperties.length;
                    if (numberOfProperties == 0) {
                        alert("Bitte wählen Sie mindestens ein Filterkriterium aus!\n\nPlease select at least one property to filter by!")
                    } else {
                        for (var i = 0; i < numberOfProperties; i++) {
                            console.log(filterBy[selectedProperties[i]] + "und die Spaltennummer ist" + selectedProperties[i]);
                            $("#table").find("td:nth-child(1)").each(function() {
                                console.log("hey!");
                            });
                        }
                    }
                })
            });
        });
    });
});