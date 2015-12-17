var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet mom at home',
	completed: false
}, {
	id: 2,
	description: 'Call wife',
	completed: false
}];

// GET /todos

app.get('/todos', function (request,response) {
	response.json(todos);
});

// GET /todos/id

app.get('/todos/:id', function (request,response) {
	var todoId = parseInt(request.params.id, 10);
	var matchedtodo;
	
	// iterate over todos
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

app.get('/', function (request,response) {
	response.send('ToDo API root');
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});