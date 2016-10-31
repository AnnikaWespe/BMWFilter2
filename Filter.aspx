<!DOCTYPE html>
<html>
	<head>
		<title></title>
		
		<script src="/sites/GWTZ/scripts/jquery-1.12.4.min.js" type="text/javascript"></script>
		<script src="/sites/GWTZ/scripts/chosen.jquery.js" type="text/javascript"></script>
		<script src="/sites/GWTZ/scripts/moment-with-locales.js" type="text/javascript"></script>
		<script src="/sites/GWTZ/scripts/bootstrap.min.js"></script>
		<script src="/sites/GWTZ/scripts/sharepointplus-3.13.min.js" type="text/javascript"></script>
		<script src="/sites/GWTZ/scripts/Filterfunktion/Filter.js" type="text/javascript"></script>
		<link href="/sites/GWTZ/scripts/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="/sites/GWTZ/scripts/chosen.css" rel="stylesheet">
		<link href="/sites/GWTZ/scripts/Filterfunktion/Filter.css" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<div class="row" id="selectBox">
		</div>
		<button class="btn btn-primary active" id="filter">Filter anwenden/Apply Filter</button>
		<button class="btn btn-primary active" id="filterReset">Filter reset</button>
		<button class="btn btn-primary disabled_special" disabled id="numberOfResults">Anzahl Ergebnisse</button>
		<button class="btn btn-primary active export" id="export">Ergebnisse als pdf exportieren / export results</button>
		<table class="table table-striped" id="table">
			<thead>
			<tr></tr>
		</thead>
		<tbody>
		</table>
	</body>
</html>