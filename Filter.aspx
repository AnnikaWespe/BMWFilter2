<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="ie ie6 lte9 lte8 lte7 no-js"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie ie7 lte9 lte8 lte7 no-js"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie ie8 lte9 lte8 no-js"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie ie9 lte9 no-js"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html class="no-js"> <!--<![endif]-->
<html>
	<head>
		<title></title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
  		<meta name="viewport" content="width=device-width, initial-scale=1">

  		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  		<script src="/sites/GWTZ/scripts/html5shiv.min.js"></script>
  		<script src="/sites/GWTZ/scripts/respond.min.js"></script>

		<script src="/sites/GWTZ/scripts/jquery-1.12.4.min.js" type="text/javascript"></script>
		<script src="/sites/GWTZ/scripts/modernizr-custom.js" type="text/javascript"></script>
		<script src="/sites/GWTZ/scripts/chosen.jquery.js" type="text/javascript"></script>
		<script src="/sites/GWTZ/scripts/moment-with-locales.js" type="text/javascript"></script>
		<script src="/sites/GWTZ/scripts/bootstrap.min.js"></script>
		<script src="/sites/GWTZ/scripts/sharepointplus-3.13.min.js" type="text/javascript"></script>
		<script src="/sites/GWTZ/scripts/jquery.qtip.min.js" type="text/javascript"></script>


		<link href="/sites/GWTZ/scripts/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="/sites/GWTZ/scripts/chosen.css" rel="stylesheet">
		<link href="/sites/GWTZ/scripts/jquery.qtip.min.css" rel="stylesheet">
		<link href="/sites/GWTZ/scripts/Filterfunktion/Filter.css" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<div class="row" id="selectBox">
		</div>
		<button class="btn btn-primary active" id="filter" type="button">Filter anwenden/Apply Filter</button>
		<button class="btn btn-primary active" id="filterReset" type="button">Filter reset</button>
		<button class="btn btn-primary disabled_special" disabled id="numberOfResults">Anzahl Ergebnisse</button>
		<button class="btn btn-primary active export" id="export" type="button">Ergebnisse als Excel-Datei exportieren / export results</button>
		<table class="table table-striped" id="table">
			<thead>
			<tr></tr>
		</thead>
		<tbody>
		</table>
		<script src="/sites/GWTZ/scripts/Filterfunktion/Filter.js" type="text/javascript"></script>
	</body>
</html>