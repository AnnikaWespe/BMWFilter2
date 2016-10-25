$(document).ready(function() {
    var clientContext;
    var website;
    var myList;
    var items;
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);

    function sharePointReady() {
        clientContext = SP.ClientContext.get_current();
        website = clientContext.get_web();
        clientContext.load(website);
        clientContext.executeQueryAsync(onRequestSucceeded, onRequestFailed);
    }

    function onRequestSucceeded() {
        alert(website.get_url());
        myList = website.get_lists().getByTitle("Prüfberichte");
        var query = '<View><RowLimit>100</RowLimit></View>';
        camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(query);
        items = myList.getItems(camlQuery);
        console.log("ITEMS: ", items);
        clientContext.load(items, 'Include(Id, DisplayName, HasUniqueRoleAssignments)');
        clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    }

    function onRequestFailed(sender, args) {
        alert('Error: ' + args.get_message());
    }

    function onQuerySucceeded(sender, args) {

        var listItemInfo = '';
        var listItemEnumerator = items.getEnumerator();

        while (listItemEnumerator.moveNext()) {
            var oListItem = listItemEnumerator.get_current();
            listItemInfo += '\nID: ' + oListItem.get_id() +
                '\nDisplay name: ' + oListItem.get_displayName() +
                '\nUnique role assignments: ' + oListItem.get_hasUniqueRoleAssignments();
        }

        alert(listItemInfo.toString());
    }

    function onQueryFailed(sender, args) {

        alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }
})