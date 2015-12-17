var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNext = 1;

app.use(bodyParser.json());

app.get('/', function (request,response) {
	response.send('ToDo API root');
});

app.get('/todos', function (request,response) {
	response.json(todos);
});

app.post('/todos' , function (request, response) {
	var body = request.body;
	body.id = todoNext++;
	todos.push(body);
	console.log('description '  + body.description);
	response.json(body);
})

app.get('/todos/:id', function (request,response) {
	var todoId = parseInt(request.params.id, 10);
	var matchedtodo;
	todos.forEach(function (todo) {
		if(todoId === todo.id){
			matchedtodo=todo;
		}
	});
	if(matchedtodo){
		response.json(matchedtodo);
	}else{
		response.status(404).send();
	}
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});