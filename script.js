
function User (obj){
  this.id = obj.id || null;
  this.name = obj.name || "";
	this.todos= obj.todo || [];
  this.posts = obj.posts || [];

	this.url =  function(){
		return `https://jsonplaceholder.typicode.com/users/${ this.id }`;
	};
	this.todosUrl = function(){
		return `${ this.url() }/todos`;
	};
  this.postsUrl = function(){
    return `${ this.url() }/posts`;
  };
	this.fetch = function(){
		return fetch(this.url())
		.then(response => response.json())
		.then(data => {
			this.name = data.name;
			return Promise.resolve(this);
		})
		 };
	this.loadTodos = function(){
		return fetch(this.todosUrl())
		.then(response => response.json())
		.then(data => {
			this.todos = data.map(todo => new Todo(this,todo));
			return Promise.resolve(this);
		});
  };
	  this.loadPosts = function(){
 		return fetch(this.postsUrl())
 		.then(response => response.json())
 		.then(data => {
 			this.posts = data.map(post => new Post(this,post));
 			return Promise.resolve(this);
 		});
 };
};

// post constructor

function Post (user, obj){
	this.user = user;
	this.id = obj.id || null;
	this.title = obj.title || "";
	this.body = obj.body || "";
}

let leanne = new User({id : 1});
leanne
.fetch() // load the data
.then(() => leanne.loadTodos()) // load the todos
.then(() => leanne.loadPosts())
.then(() => console.log("Leanne with todos:", leanne));

let ervin = new User({id : 2});
ervin
.fetch() // load the data
.then(() => ervin.loadTodos()) // load the todos
.then(() => ervin.loadPosts())
.then(() => console.log("Ervin with todos:", ervin));

function Todo (user, obj){
	// properties, with default values
	this.user = user;
	this.id = obj.id || null;
	this.title = obj.title || "";
	this.completed = obj.completed || false;

	// method
	this.isCompleted = function(){
		if(this.completed)
			return `Todo id ${this.id} of user ${this.user.id} is completed.`;
		else
			return `Todo id ${this.id} of user ${this.user.id} is incomplete.`;
	}
}
