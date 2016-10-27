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
        //creating maps so we can get SP name of column from displayed name and vice versa
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i]["Name"];
            var value = fields[i]["DisplayName"];
            nameDisplaynameMap[key] = value;
            displaynameNameMap[value] = key;
            valuesForDropDown[key] = [];
        };

        $SP().list("Prüfberichte").view("Alle Dokumente", function(dataView, viewID) {
            //create the array to fill the table head
            var numberOfColumns = dataView.fields.length;
            for (var i = 0; i < numberOfColumns; i++) {
                var currentColumn = dataView.fields[i];
                var currentDisplayName = nameDisplaynameMap[currentColumn];
                var columnHeaderNoDropdown = ["ID", "Bearbeiten"];
                displayedColumns.push(currentDisplayName);
                displayNameColumnNumberMap[currentDisplayName] = i;
                if (columnHeaderNoDropdown.indexOf(displayedColumns[i]) !== -1) {
                    $("#table").find("thead").find("tr").append('<th>' + displayedColumns[i] + '</th>');
                } else {
                    $("#table").find("thead").find("tr").append('<th><select data-placeholder="' + displayedColumns[i] + '" name="' + displayedColumns[i] + '" multiple class="chosen-select"></select></th>');
                }
            };
            $SP().list("Prüfberichte").get(function(data) {
                //fill in the data 
                var numberOfRows = data.length;
                var UrlSnippetForEdit1 = "/sites/GWTZ/Prfberichte/Forms/EditForm.aspx?ID=";
                var UrlSnippetForEdit2 = "&Source=https%3A%2F%2Fvts5%2Ebmwgroup%2Enet%2Fsites%2FGWTZ%2FPrfberichte%2FForms%2FAllItems%2Easpx";
                for (var i = 0; i < numberOfRows; i++) {
                    var $tablebody = $("#table").find("tbody");
                    $tablebody.append("<tr>");
                    for (var j = 0; j < dataView.fields.length; j++) {
                        var currentColumnName = dataView.fields[j];
                        var currentEntry = data[i].getAttribute(currentColumnName);
                        var currentPosition = "row" + i + "column" + j;
                        var currentID;
                        if (currentColumnName == "ID") {
                            currentID = currentEntry;
                        };
                        if (currentColumnName == "LinkFilename") {
                            $tablebody.append('<td id="' + currentPosition + '"><a target="_blank" href="/sites/GWTZ/Prfberichte/' + currentEntry + '">' + currentEntry + "</a></td> ");
                        } else if (currentColumnName == "Edit") {
                            $tablebody.append('<td id="' + currentPosition + '"><a target="_blank" href="' + UrlSnippetForEdit1 + currentID + UrlSnippetForEdit2 + '"> Bearbeiten / Edit </a></td>');
                        } else {
                            $tablebody.append('<td id="' + currentPosition + '">' + currentEntry + "</td>");
                        };
                        if (valuesForDropDown[currentColumnName].indexOf(currentEntry) == -1) {
                            valuesForDropDown[currentColumnName].push(currentEntry);
                        };
                    };
                    $tablebody.append("</tr>");
                };
                $("select").each(function(index, value) {
                    //create dropdown menus for each element in table head
                    var currentColumnDisplayName = $(this).attr('name');
                    var currentColumnName = displaynameNameMap[currentColumnDisplayName];
                    var currentDropDownValues = valuesForDropDown[currentColumnName];
                    if (currentColumnDisplayName == "Name") {
                        currentDropDownValues = valuesForDropDown["LinkFilename"]
                    };
                    var numberOfOptions = currentDropDownValues.length;
                    for (var i = 0; i < numberOfOptions; i++) {
                        $(this).append('<option value="' + currentDropDownValues[i] + '">' + currentDropDownValues[i] + '</option>')
                    };
                    $(this).chosen();
                });
                $("#filter").click(function() {
                    var filterBy = {};
                    var selectedProperties = [];
                    $("select").each(function() {
                        var selectedValues = $(this).val();
                        console.log(selectedValues);
                        var propertyName = $(this).attr('name');
                        console.log(propertyName);
                        var columnNumber = displayNameColumnNumberMap[propertyName];
                        console.log(columnNumber);
                        $(this).chosen();
                        if (selectedValues !== null) {
                            if (currentColumnDisplayName = "Name") {
                                var helperArray = [];
                                for (var i = 0; i < selectedValues.length; i++) {
                                    helperArray.push('<a href="/sites/GWTZ/Prfberichte/' + selectedValues[i] + '" target="_blank">' + selectedValues[i] + '</a>');
                                };
                                selectedValues = helperArray;
                            }
                            filterBy[columnNumber] = selectedValues;
                            selectedProperties.push(columnNumber);
                        }
                    });
                    var numberOfProperties = selectedProperties.length;
                    if (numberOfProperties == 0) {
                        alert("Bitte wählen Sie mindestens ein Filterkriterium aus!\n\nPlease select at least one property to filter by!")
                    } else {
                        for (var i = 0; i < numberOfProperties; i++) {
                            for (var j = 0; j < numberOfRows; j++) {
                                var currentEntryQuery = $("#row" + j + "column" + selectedProperties[i]).html();
                                console.log($("#row" + j + "column" + selectedProperties[i]).html());
                                if (filterBy[selectedProperties[i]].indexOf(currentEntryQuery) == -1) {
                                    $("[id*='row" + j + "']").hide();
                                }
                            }
                        }
                    }
                });
                $("#filterReset").click(function() {
                    $("[id*='row']").show();
                    $(".search-choice-close").click();
                })
            });
        });
    });
});