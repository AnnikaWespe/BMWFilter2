<!DOCTYPE html>
<html>
	<head>
		<title></title>
		
		<script src="/sites/GWTZ/scripts/jquery-1.12.4.min.js" type="text/javascript"></script>
		<script src="/sites/GWTZ/scripts/chosen.jquery.js" type="text/javascript"></script>
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
		<form>
			<div class="form-group">
				<label for="exampleInputEmail1">Email address</label>
				<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">Password</label>
				<select type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
			</div>
			<div class="form-group">
				<label for="exampleInputFile">File input</label>
				<input type="file" id="exampleInputFile">
				<p class="help-block">Example block-level help text here.</p>
			</div>
			<div class="checkbox">
				<label>
					<input type="checkbox"> Check me out
				</label>
			</div>
			<button type="submit" class="btn btn-default">Submit</button>
		</form>
		<button class="btn btn-primary active" id="filter">Filter anwenden/Apply Filter</button>
		<button class="btn btn-primary active" id="filterReset">Filter reset</button>
		<table class="table" id="table">
			<thead>
			<tr></tr>
		</thead>
		<tbody>
		</table>
	</body>
</html>