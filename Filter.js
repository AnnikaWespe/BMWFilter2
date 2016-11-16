//Strings
var productionDateInputField = "#inputVonBisProd\\.\\-Datum\\ Fzg\\.\\ \\(Production\\ date\\)";
var mileageInputField = "#inputVonBiskm\\-Stand\\ \\(Mileage\\)";
var berichtsNrInputField = "#inputVonBisBerichts-Nr\\.";
var placeholder = {};
var noPropertiesAlert = "Bitte wählen Sie mindestens ein Filterkriterium aus!\n\nPlease select at least one property to filter by!";
var BerichtsNrInputAlert = "Feld Berichts-Nr.:\n\nBitte geben Sie den Bereich für die Berichts-Nr. ohne Leerzeichen ein.\nPlease enter the range for the report number w/o blanks.\n\nExamples:\n\n2016_0001-2017_0001\n\n2017_1234-2017_1234";
var dateAlert = "Feld Produktionsdatum / production date:\n\nBitte geben Sie Start- und Enddatum im Format tt.mm.jjjj ein.\nPlease enter the start and end date in the format dd.mm.yyyy\n\nExample:\n\n01.01.2016-01.01.2017";
var mileageAlert = "Feld km-Stand / mileage: \n\nBeispiel: Wollen Sie Stände von 10 000 - 12 000 km abfragen, geben Sie ein: 10-12\n\nExample: If you want to retrieve the range from 10 000 - 12 000 km, please enter: 10-12";
var imageInfoSignMileage = "  <img src='/sites/GWTZ/scripts/Informationsign.png' height='16px' width='16px' id='kmStandInfo'>"
var kmStandInfoQtipContent = 'Beispiel: Wollen Sie Stände von 10 000 - 12 000 km abfragen, geben Sie ein: 10-12------------------------------------------------------------------------------------------------------ Example: If you want to retrieve the range from 10 000 - 12 000 km, please enter: 10-12'
var columnNameProdDat = "Prod_x002e__x002d_Datum_x0020_Fzg_x002e__x0020__x0028_Production_x0020_date_x0029_";
var columnNameKmStand = "km_x002d_Stand_x0020__x0028_Mileage_x0029_";
var numberOfRows;
var numberOfColumns;
var displayNameColumnNumberMap = {};
placeholder["Berichts-Nr."] = "yyyy_xxxx-yyyy_xxxx";
placeholder["km-Stand (Mileage)"] = "von-bis in Tausend / from-to in thousands";
placeholder["Prod.-Datum Fzg. (Production date)"] = "dd.mm.yyyy-dd.mm.yyyy";
//set time format to German
moment.locale("de");




$(document).ready(function() {
    //indexOf method for IE8
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    };

    $SP().list("Prüfberichte").info(function(fields) {
        var nameDisplaynameMap = {};
        var displaynameNameMap = {};
        var displayedColumns = [];
        var valuesForDropDown = {};
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
            numberOfColumns = dataView.fields.length;
            for (var i = 0; i < numberOfColumns; i++) {
                var currentColumn = dataView.fields[i];
                var currentDisplayName = nameDisplaynameMap[currentColumn];
                var columnsEnterVonBis = ["Berichts-Nr.", "km-Stand (Mileage)", "Prod.-Datum Fzg. (Production date)"];
                displayedColumns.push(currentDisplayName);
                displayNameColumnNumberMap[currentDisplayName] = i;
                //create input fields where necessary
                if (columnsEnterVonBis.indexOf(currentDisplayName) !== -1) {
                    $("#selectBox").append('<div class="col-md-4" id="column' + i + '"><label for="inputVonBis' +
                        displayedColumns[i] + '">' + displayedColumns[i] + '</label><input class="inputVonBis" id="inputVonBis' +
                        displayedColumns[i] + '" placeholder="' + placeholder[displayedColumns[i]] + '" name="' +
                        displayedColumns[i] + '" type = "text"></div>');
                } else { //create select fields where necessary
                    $("#selectBox").append('<div class="col-md-4" id="column' + i + '"><label for="select' + displayedColumns[i] +
                        '">' + displayedColumns[i] + '</label><select id="select' + displayedColumns[i] +
                        '" data-placeholder="auswählen / select" name="' + displayedColumns[i] +
                        '" multiple class="chosen-select"></select></div>');
                };
                $("#table").find("thead").find("tr").append('<th id="column' + i + '">' + currentDisplayName + '</th>');
            };
            $('label[for="inputVonBiskm\\-Stand\\ \\(Mileage\\)"]').append(imageInfoSignMileage);
            $('#kmStandInfo').qtip({
                content: kmStandInfoQtipContent,
                show: 'mouseover',
                hide: 'mouseout'
            });
            $SP().list("Prüfberichte").get(function(data) {
                //fill in the data 
                numberOfRows = data.length;
                var $tablebody = $("#table").find("tbody");
                for (var i = 0; i < numberOfRows; i++) {
                    var stringToAppend = '<tr id="row' + i + '" class = "tablerow">';
                    for (var j = 0; j < numberOfColumns; j++) {
                        var currentColumnName = dataView.fields[j];
                        var currentEntry = data[i].getAttribute(currentColumnName);
                        var currentLinkToFile;
                        var nameAndLinkArray;
                        var currentPosition = "row" + i + "column" + j;
                        //make Berichts-Nr. appear as a link 
                        if (currentColumnName == "Berichts_x002d_Nr_x002e_" && currentEntry) {
                            if (currentEntry.indexOf(",")) {
                                var helperArray;
                                nameAndLinkArray = currentEntry.split(",");
                                currentEntry = nameAndLinkArray[1];
                                currentLinkToFile = nameAndLinkArray[0];
                                stringToAppend += '<td id="' + currentPosition + '">' + '<a href="' + currentLinkToFile + '">' + currentEntry + '</a></td>';
                                helperArray = currentEntry.split("_");
                                currentEntry = helperArray[0] + helperArray[1];
                                valuesBerichtsNr[i] = currentEntry;
                            }
                        } else {
                            if (!currentEntry) {
                                console.log(currentEntry);
                                currentEntry = "";
                            } else if (currentColumnName == columnNameProdDat && currentEntry) {
                                var date = moment(currentEntry);
                                currentEntry = date.format('L')
                            } else if (currentColumnName == columnNameKmStand && currentEntry) {
                                var helperArray = currentEntry.split(".");
                                currentEntry = helperArray[0];
                            }
                            stringToAppend += '<td id="' + currentPosition + '">' + currentEntry + "</td>";
                        };
                        if (valuesForDropDown[currentColumnName].indexOf(currentEntry) == -1) {
                            valuesForDropDown[currentColumnName].push(currentEntry);
                        };
                    };
                    stringToAppend += '</tr>';
                    $tablebody.append(stringToAppend);
                };
                $("#numberOfResults").unbind('mouseenter mouseleave');
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
                    var numberOfProperties;
                    var berichtsNrInput = $(berichtsNrInputField).val();
                    var mileageInput = $(mileageInputField).val();
                    var dateInput = $(productionDateInputField).val();
                    if (checkBerichtsNr() && checkDatum() && checkMileage()) {
                        $("select").each(function() {
                            var selectedValues = $(this).val();
                            var propertyName = $(this).attr('name');
                            var columnNumber = displayNameColumnNumberMap[propertyName];
                            if (selectedValues !== null) {
                                filterBy[columnNumber] = selectedValues;
                                selectedProperties.push(columnNumber);
                            }
                        });
                        numberOfProperties = selectedProperties.length;
                        if (numberOfProperties == 0 && !berichtsNrInput && !dateInput && !mileageInput) {
                            alert(noPropertiesAlert)
                        } else {
                            //makes it possible to readjust filter criteria after filter already clicked once
                            if (filterAlreadyClicked) {
                                $("[id*='row']").show();
                                $("#numberOfResults").html("Anzahl Ergebnisse");
                            }
                            //check for each entry if compatible with the selected criteria
                            if (numberOfProperties) {
                                for (var i = 0; i < numberOfProperties; i++) {
                                    for (var j = 0; j < numberOfRows; j++) {
                                        if (filterBy[selectedProperties[i]].indexOf($("#row" + j + "column" + selectedProperties[i]).html()) == -1) {
                                            $("#row" + j).hide();
                                        }
                                    }
                                }
                            }
                            //Filter by Berichts-Nr.
                            if (berichtsNrInput) {
                                //get input values as raw number format
                                var helperArray = berichtsNrInput.split("-");
                                var berichtsNrInputVon = helperArray[0].split("_");
                                var berichtsNrInputBis = helperArray[1].split("_");
                                var berichtsNrVon = new Number(berichtsNrInputVon[0] + berichtsNrInputVon[1]);
                                var berichtsNrBis = new Number(berichtsNrInputBis[0] + berichtsNrInputBis[1]);
                                for (var i = 0; i < numberOfRows; i++) {
                                    var currentNumber = new Number(valuesBerichtsNr[i]);
                                    if (currentNumber < berichtsNrVon || berichtsNrBis < currentNumber) {
                                        $("#row" + i).hide();
                                    }
                                }
                            }
                            //Filter by mileage
                            if (mileageInput) {
                                var columnNumberMileage = displayNameColumnNumberMap["km-Stand (Mileage)"];
                                var helperArray = mileageInput.split("-");
                                var mileageInputFrom = new Number(helperArray[0] + "000");
                                var mileageInputTo = new Number(helperArray[1] + "000");
                                for (var i = 0; i < numberOfRows; i++) {
                                    var currentNumber = new Number($("#row" + i + "column" + columnNumberMileage).html());
                                    if (currentNumber < mileageInputFrom || mileageInputTo < currentNumber) {
                                        $("#row" + i).hide();
                                    }
                                }
                            };

                            if (dateInput) {
                                var columnNumberDate = displayNameColumnNumberMap["Prod.-Datum Fzg. (Production date)"];
                                var helperArray = dateInput.split("-");
                                var dateFrom = moment(helperArray[0], 'DD.MM.YYYY');
                                var dateTo = moment(helperArray[1], 'DD.MM.YYYY');
                                for (var i = 0; i < numberOfRows; i++) {
                                    var currentEntry = $("#row" + i + "column" + columnNumberDate).html();
                                    var currentDate = moment(currentEntry, 'DD.MM.YYYY');
                                    if (currentDate < dateFrom || dateTo < currentDate) {
                                        $("#row" + i).hide();
                                    }
                                }
                            };

                            var numberOfRowsjQuery = $(".tablerow:visible").not('[style *= "display:none"]').length;
                            $("#numberOfResults").append(": " + numberOfRowsjQuery);
                            filterAlreadyClicked = 1;
                        };
                    }
                });
                $("#filterReset").click(function() {
                    $("[id*='row']").show();
                    $(".search-choice-close").click();
                    //$("[id*='column0']").hide();
                    $("#numberOfResults").html("Anzahl Ergebnisse");
                    $(".inputVonBis").val('');
                    filterAlreadyClicked = 0;
                });
                $("#export").click(getExcel);
                $(berichtsNrInputField).focusout(checkBerichtsNr);
                $(productionDateInputField).focusout(checkDatum);
                $(mileageInputField).focusout(checkMileage);
            });
        });
    });
    var checkBerichtsNr = function() {
        var inputToBeChecked = $(berichtsNrInputField).val();
        if (inputToBeChecked != '') {
            var testRegExp = /\d\d\d\d_\d\d\d\d-\d\d\d\d_\d\d\d\d/;
            var res = testRegExp.test(inputToBeChecked);
            if (!res) {
                alert(BerichtsNrInputAlert);
                return false;
            } else return true;
        } else return true;
    }
    var checkDatum = function() {
        var inputToBeChecked = $(productionDateInputField).val();
        if (inputToBeChecked != '') {
            var testRegExp = /\d\d\.\d\d\.\d\d\d\d\-\d\d\.\d\d\.\d\d\d\d/;
            var res = testRegExp.test(inputToBeChecked);
            if (!res) {
                alert(dateAlert);
                return false;
            } else return true;
        } else return true;
    }
    var checkMileage = function() {
        var inputToBeChecked = $(mileageInputField).val();
        var testRegExp = /d*-d*/;
        var res = testRegExp.test(inputToBeChecked);
        if (inputToBeChecked != '') {
            if (!res) {
                alert(mileageAlert);
                return false;
            } else return true;
        } else return true;
    }

    var getExcel = function() {
        var data = [];
        var headerArray = [];
        var csvContent = "\uFEFF";
        var filename = "Filter" + moment().format('DD_MM_YYYY') + ".csv";
        var dataLength;
        for (var i = 1; i < numberOfColumns; i++) {
            headerArray.push($("th#column" + i).html());
        };
        data.push(headerArray);
        for (var i = 0; i < numberOfRows; i++) {
            var $currentRow = $("#row" + i);
            var columnNumberBerichtsNr = displayNameColumnNumberMap["Berichts-Nr."];
            if ($currentRow.is(':visible')) {
                var currentArray = [];
                for (var j = 1; j < numberOfColumns; j++) {
                    currentArray.push($("#row" + i + "column" + j).text());
                };
                data.push(currentArray);
            };
        };
        dataLength = data.length;
        for (var i = 0; i < dataLength; i++) {
            var dataString = data[i].join(";");
            csvContent += i < dataLength ? dataString + "\n" : dataString;
        };

        if (window.navigator.msSaveBlob) {
            var blob = new Blob([csvContent], {
                type: "data:text/csv;charset=windows-1252"
            });
            navigator.msSaveBlob(blob, filename);
        }
    }
});