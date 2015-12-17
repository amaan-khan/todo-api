var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.get('/', function (request,response, next) {
	response.send('ToDo API root');
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
})