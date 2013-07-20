;//server side config
var socketPort = 
    (typeof process !== 'undefined' && 
     typeof process.BAE !== 'undefined') ?
    80 : 8082;
var clientSocketServer = typeof location !== 'undefined' ? 
        location.hostname + ':' + socketPort + '/socket/' : '';

clientSocketServer = clientSocketServer.replace('.duapp.com', '.sx.duapp.com'); 

sumeru.config({
	httpServerPort: 8080,
	sumeruPath: '/../sumeru',
	soketPort: socketPort,
	clientSocketServer : clientSocketServer
});
;sumeru.router.add(
	{
		pattern: '/index',
		action : 'App.index'
	}
);

sumeru.router.setDefault('App.index');

App.index = sumeru.controller.create(function(env, session){
	var getMsgs = function(){       
		session.messages = env.subscribe('pub-message', function(msgCollection){
			//manipulate synced collection and bind it to serveral view blocks.
            session.bind('event-hall', {
            	data    :   msgCollection.find(),
            });              

        });
	};	

	// onload is respond for handle all data subscription
	env.onload = function(){            
		return [getMsgs];
	};

	//sceneRender is respond for handle view render and transition
	env.onrender = function(doRender){
		doRender('index', ['push', 'left']);
	};

	//onready is respond for event binding and data manipulate
	env.onready = function(){			
		session.event('event-hall', function(){     
			var newEventButton = document.getElementById('newEventButton');
			newEventButton.addEventListener('click', newEvent); 
        });
	};

	var newEvent = function(){
		env.redirect('/event_new');
		env.refresh();
	}		
});;sumeru.router.add(
	{
		pattern: '/event_new',
		action : 'App.event_new'
	}
);

App.event_new = sumeru.controller.create(function(env, session){
	var getMsgs = function(){       
		session.messages = env.subscribe('pub-message', function(msgCollection){
			//manipulate synced collection and bind it to serveral view blocks.
            session.bind('event-hall', {
            	data    :   msgCollection.find(),
            });              

        });
	};	

	// onload is respond for handle all data subscription
	env.onload = function(){            
		return [getMsgs];
	};

	//sceneRender is respond for handle view render and transition
	env.onrender = function(doRender){
		doRender('event_new', ['push', 'left']);
	};

	//onready is respond for event binding and data manipulate
	env.onready = function(){			
		session.event('event_new', function(){     
			var submitEventButton = document.getElementById('submitEventButton');
			submitEventButton.addEventListener('click', submitEvent); 
        });
	};

	var submitEvent = function(){
		var input = document.getElementById('desc'),
        	inputVal = input.value.trim();		
       	if (inputVal == '') {
           return false; 
       	};
       	session.messages.add({
           content : inputVal,         
       	});
       	session.messages.save();
       	
       	// return the index page
       	env.redirect('/index');
		env.refresh();
        
	};

});;sumeru.router.add(
	{
		pattern: '/hall',
		action : 'App.hall'
	}
);

// sumeru.router.setDefault('App.hall');

App.hall = sumeru.controller.create(function(env, session){
	var getMsgs = function(){       
		session.messages = env.subscribe('pub-message', function(msgCollection){
			//manipulate synced collection and bind it to serveral view blocks.
            session.bind('message-hall', {
            	data    :   msgCollection.find(),
            });              

        });
	};	

	// onload is respond for handle all data subscription
	env.onload = function(){            
		return [getMsgs]; 
	};

	//sceneRender is respond for handle view render and transition
	env.onrender = function(doRender){
		doRender('hall', ['push', 'left']);
	};

	//onready is respond for event binding and data manipulate
	env.onready = function(){			
		session.event('message-hall', function(){     
			var messageubmitButton = document.getElementById('messageSubmit');
			var clearHistoryButton = document.getElementById('clearHistory');
     		messageubmitButton.addEventListener('click', submitMessage); 
     		clearHistoryButton.addEventListener('click',clearHistory);                             
        });
	};

	var submitMessage = function(){
		var input = document.getElementById('messageInput'),
        	inputVal = input.value.trim();		
       	if (inputVal == '') {
           return false; 
       	};
       	session.messages.add({
           content : inputVal,         
       	});
       	session.messages.save();
       	input.value = '';          
	};

	var clearHistory = function(){
		session.messages.destroy();
		session.messages.save();
	}		
});;Model.event = function(exports){	
	exports.config = {		
		fields : [
			{name: 'title', type: 'string'},
			{name: 'desc', type: 'text'},
			{name: 'address', type: 'string'},
			{name: 'time', type: 'datetime',defaultValue: 'now()'}
		]
	};
};
;Model.message = function(exports){	
	exports.config = {		
		fields : [
			{name: 'content', type: 'text'},
			{name: 'time', type: 'datetime',defaultValue: 'now()'}
		]
	};
};
