$(document).ready(function() {
    $SP().list("Prüfberichte").info(function(fields) {
        var nameDisplaynameMap = {};
        var displaynameNameMap = {};
        var displayedColumns = [];
        var valuesForDropDown = {};
        var displayNameColumnNumberMap = {};
        var valuesBerichtsNr = [];
        var filterAlreadyClicked;
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
                var columnsEnterVonBis = ["Berichts-Nr.", "km-Stand (Mileage)", "Prod.-Datum Fzg. (Production date)"];
                var placeholder = {};
                placeholder["Berichts-Nr."] = "yyyy_xxxx-yyyy_xxxx";
                placeholder["km-Stand (Mileage)"] = "Eingabe ohne (.) und (,) / Enter without (.) or (,)";
                placeholder["Prod.-Datum Fzg. (Production date)"] = "dd.mm.yyyy-dd.mm.yyyy";
                displayedColumns.push(currentDisplayName);
                displayNameColumnNumberMap[currentDisplayName] = i;
                if (columnsEnterVonBis.indexOf(currentDisplayName) !== -1) {
                    $("#selectBox").append('<div class="col-md-3" id="column' + i + '"><label for="inputVonBis' +
                        displayedColumns[i] + '">' + displayedColumns[i] + '</label><input class="inputVonBis" id="inputVonBis' +
                        displayedColumns[i] + '" placeholder="' + placeholder[displayedColumns[i]] + '" name="' +
                        displayedColumns[i] + '" type = "text"></div>');
                } else {
                    $("#selectBox").append('<div class="col-md-3" id="column' + i + '"><label for="select' + displayedColumns[i] +
                        '">' + displayedColumns[i] + '</label><select id="select' + displayedColumns[i] +
                        '" data-placeholder="auswählen / select" name="' + displayedColumns[i] +
                        '" multiple class="chosen-select"></select></div>');
                };
                $("#table").find("thead").find("tr").append('<th id="column' + i + '">' + currentDisplayName + '</th>');
            };
            $("#column0").hide();
            $SP().list("Prüfberichte").get(function(data) {
                //fill in the data 
                var numberOfRows = data.length;
                var $tablebody = $("#table").find("tbody");
                for (var i = 0; i < numberOfRows; i++) {
                    var stringToAppend = '<tr id="row' + i + '" class = "tablerow">';
                    for (var j = 0; j < dataView.fields.length; j++) {
                        var currentColumnName = dataView.fields[j];
                        var currentEntry = data[i].getAttribute(currentColumnName);
                        var currentLinkToFile;
                        var nameAndLinkArray;
                        var currentPosition = "row" + i + "column" + j;
                        //make Berichts-Nr. appear as a link 
                        if (j == 1 && currentEntry) {
                            if (currentEntry.indexOf(",")) {
                                var helperArray;
                                nameAndLinkArray = currentEntry.split(",");
                                currentEntry = nameAndLinkArray[1];
                                currentLinkToFile = nameAndLinkArray[0];
                                stringToAppend += '<td id="' + currentPosition + '">' + '<a href="' + currentLinkToFile + '">' + currentEntry + '</a></td>';
                                helperArray = currentEntry.split("_");
                                currentEntry = helperArray[0] + helperArray[1];
                                valuesBerichtsNr[i] = currentEntry;
                                console.log(i + valuesBerichtsNr[i]);
                            }
                        } else {
                            if (j == 1 && currentEntry) {
                                currentEntry = Math.floor(currentEntry)
                            };
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
                        width: "100%"
                    });
                });
                $("#filter").click(function() {
                    var filterBy = {};
                    var selectedProperties = [];
                    var numberOfProperties = selectedProperties.length;
                    if (checkMileage() && checkDatum() && checkBerichtsNr()) {
                        alert("all is clear")
                    }
                    $("select").each(function() {
                        var selectedValues = $(this).val();
                        var propertyName = $(this).attr('name');
                        var columnNumber = displayNameColumnNumberMap[propertyName];
                        if (selectedValues !== null) {
                            filterBy[columnNumber] = selectedValues;
                            selectedProperties.push(columnNumber);
                        }
                    });
                    if (numberOfProperties == 0) {
                        alert("Bitte wählen Sie mindestens ein Filterkriterium aus!\n\nPlease select at least one property to filter by!")
                    } else {
                        //makes it possible to readjust filter after filter already clicked once
                        if (filterAlreadyClicked) {
                            $("[id*='row']").show();
                            $("#numberOfResults").html("Anzahl Ergebnisse");
                        }
                        for (var i = 0; i < numberOfProperties; i++) {
                            for (var j = 0; j < numberOfRows; j++) {
                                if (filterBy[selectedProperties[i]].indexOf($("#row" + j + "column" + selectedProperties[i]).html()) == -1) {
                                    $("#row" + j).hide();
                                }
                            }
                        }
                        var numberOfRowsjQuery = $(".tablerow:visible").not('[style *= "display:none"]').length;
                        $("#numberOfResults").append(": " + numberOfRowsjQuery);
                        filterAlreadyClicked = 1;
                    };
                });
                $("#filterReset").click(function() {
                    $("[id*='row']").show();
                    $(".search-choice-close").click();
                    $("[id*='column0']").hide();
                    $("#numberOfResults").html("Anzahl Ergebnisse");
                    $(".inputVonBis").val('');
                    filterAlreadyClicked = 0;
                });
                $("#inputVonBisBerichts-Nr\\.").focusout(checkBerichtsNr);
                $("#inputVonBisProd\\.\\-Datum\\ Fzg\\.\\ \\(Production\\ date\\)").focusout(checkDatum);
                $("#inputVonBiskm\\-Stand\\ \\(Mileage\\)").focusout(checkMileage);
            });
        });
    });
    var checkBerichtsNr = function() {
        var inputToBeChecked = $("#inputVonBisBerichts-Nr\\.").val();
        if (inputToBeChecked != '') {
            var testRegExp = /\d\d\d\d_\d\d\d\d-\d\d\d\d_\d\d\d\d/;
            var res = testRegExp.test(inputToBeChecked);
            if (!res) {
                alert("Bitte geben Sie den Bereich für die Berichts-Nr. ohne Leerzeichen ein." +
                    "\nPlease enter the range for the report number w/o blanks.\n\nExample:\n\n2016_0001-2017_0001\n\n2017_1234-2017_1234");
            }
        }
    }
    var checkDatum = function() {
        var inputToBeChecked = $("#inputVonBisProd\\.\\-Datum\\ Fzg\\.\\ \\(Production\\ date\\)").val();
        if (inputToBeChecked != '') {
            var testRegExp = /\d\d\.\d\d\.\d\d\d\d\-\d\d\.\d\d\.\d\d\d\d/;
            var res = testRegExp.test(inputToBeChecked);
            if (!res) {
                alert("Bitte geben Sie Start- und Enddatum im Format tt.mm.jjjj ein." +
                    "\nPlease enter the start and end date in the format dd.mm.yyyy\n\nExamples:\n\n01.01.2016-01.01.2017");
            }
        }
    }
    var checkMileage = function() {
        var inputToBeChecked = $("#inputVonBiskm\\-Stand\\ \\(Mileage\\)").val();
        var testRegExp = /^\d+$/;
        var res = testRegExp.test(inputToBeChecked);
        if (inputToBeChecked != '') {
            if (!res) {
                alert("Bitte geben Sie eine ganze Zahl ohne (.) oder (,) ein\nPlease enter a whole number (no decimals) without (.) or (,)")
                return false;
            }
        }
    }
});