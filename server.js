var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
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
	var body = _.pick(request.body, 'description', 'completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return response.status(400).send();
	}

	body.description = body.description.trim();
	body.id = todoNext++;					// add id field
	todos.push(body);						// push to array
	console.log('description '  + body.description);
	response.json(body);
})

app.get('/todos/:id', function (request,response) {
	var todoId = parseInt(request.params.id, 10);
	var matchedtodo = _.findWhere(todos, {id:todoId});			// find by id, id as object
	if(matchedtodo){
		response.json(matchedtodo);
	}else{
		response.status(404).send();
	}
});

app.delete('/todos/:id', function (request, response) {
	var todoId = parseInt(request.params.id, 10);
	var matchedtodo = _.findWhere(todos, {id:todoId});			// find by id, id as object
	if(matchedtodo){
		_.without(todos, matchedtodo);
		console.log("deleted: " + matchedtodo);
		response.json( {
			"message":  "Deleted todo with id: " + todoId
		} ); 
	}
	else{
		console.log("Todo not found");
		response.json({
			"error": "no todo with id "+ todoId
		})
		response.status(200).send();
	}
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});