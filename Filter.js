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
        var valuesBerichtsNr = [];
        //creating maps so we can get SP name of column from displayed name and vice versa
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i]["Name"];
            var value = fields[i]["DisplayName"];
            nameDisplaynameMap[key] = value;
            displaynameNameMap[value] = key;
            valuesForDropDown[key] = [];
        };

        $SP().list("Prüfberichte").view("Alle Dokumente", function(dataView, viewID) {
            //create the array to fill the select fields and table head
            var numberOfColumns = dataView.fields.length;
            for (var i = 0; i < numberOfColumns; i++) {
                var currentColumn = dataView.fields[i];
                var currentDisplayName = nameDisplaynameMap[currentColumn];
                var columnsEnterVonBis = ["Berichts-Nr."]
                displayedColumns.push(currentDisplayName);
                displayNameColumnNumberMap[currentDisplayName] = i;
                if (columnsEnterVonBis.indexOf(currentDisplayName) !== -1) {
                    $("#selectBox").append('<div class="col-md-3" id="column' + i + '"><input class="inputVonBis" placeholder="' + displayedColumns[i] + ' (von-bis)" name="' + displayedColumns[i] + '" type = "text" id="berichtsNrInput"></div>');
                } else {
                    $("#selectBox").append('<div class="col-md-3" id="column' + i + '"><select data-placeholder="' + displayedColumns[i] + '" name="' + displayedColumns[i] + '" multiple class="chosen-select"></select></div>');
                };
                $("#table").find("thead").find("tr").append('<th id="column' + i + '">' + currentDisplayName + '</th>');
            };
            $("#column0").hide();
            $SP().list("Prüfberichte").get(function(data) {
                //fill in the data 
                var numberOfRows = data.length;
                var $tablebody = $("#table").find("tbody");
                for (var i = 0; i < numberOfRows; i++) {
                    var stringToAppend = '<tr>';
                    for (var j = 0; j < dataView.fields.length; j++) {
                        var currentColumnName = dataView.fields[j];
                        var currentEntry = data[i].getAttribute(currentColumnName);
                        var currentLinkToFile;
                        var nameAndLinkArray;
                        var currentPosition = "row" + i + "column" + j;
                        if (j == 1 && currentEntry) {
                            if (currentEntry.indexOf(",")) {
                                var helperArray;
                                nameAndLinkArray = currentEntry.split(",");
                                currentEntry = nameAndLinkArray[1];
                                currentLinkToFile = nameAndLinkArray[0];
                                stringToAppend += '<td id="' + currentPosition + '">' + '<a href="' + currentLinkToFile + '">' + currentEntry + '</a></td>';
                                helperArray = currentEntry.split("_");
                                currentEntry = helperArray[0] + helperArray[1];
                                console.log(currentEntry);
                                valuesBerichtsNr[i] = currentEntry;
                            }
                        } else {
                            stringToAppend += '<td id="' + currentPosition + '">' + currentEntry + "</td>";
                        };
                        if (valuesForDropDown[currentColumnName].indexOf(currentEntry) == -1) {
                            valuesForDropDown[currentColumnName].push(currentEntry);
                        };
                    };
                    stringToAppend += '</tr>';
                    $tablebody.append(stringToAppend);
                };
                $("[id*='column0']").hide();
                $("select").each(function(index, value) {
                    //create dropdown menus for each element in table head
                    var currentColumnDisplayName = $(this).attr('name');
                    var currentColumnName = displaynameNameMap[currentColumnDisplayName];
                    var currentDropDownValues = valuesForDropDown[currentColumnName];
                    var numberOfOptions = currentDropDownValues.length;
                    for (var i = 0; i < numberOfOptions; i++) {
                        $(this).append('<option value="' + currentDropDownValues[i] + '">' + currentDropDownValues[i] + '</option>')
                    };
                    $(this).chosen({
                        width: "98%"
                    });
                });
                $("#filter").click(function() {
                    var filterBy = {};
                    var selectedProperties = [];
                    $("select").each(function() {
                        var selectedValues = $(this).val();
                        var propertyName = $(this).attr('name');
                        var columnNumber = displayNameColumnNumberMap[propertyName];
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
                            for (var j = 0; j < numberOfRows; j++) {
                                if (filterBy[selectedProperties[i]].indexOf($("#row" + j + "column" + selectedProperties[i]).html()) == -1) {
                                    $("[id*='row" + j + "']").hide();
                                }
                            }
                        }
                    };
                    var berichtsNrInput = $('#berichtsNrInput').val();
                });
                $("#filterReset").click(function() {
                    $("[id*='row']").show();
                    $(".search-choice-close").click();
                    $("[id*='column0']").hide();
                })
            });
        });
    });
});