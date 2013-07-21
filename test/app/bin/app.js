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
		pattern: '/event_hall',
		action : 'App.event_hall'
	}
);

sumeru.router.setDefault('App.event_hall');

App.event_hall = sumeru.controller.create(function(env, session){
	var getMsgs = function(){       
		session.events = env.subscribe('pub-events', function(eventCollection){
			//manipulate synced collection and bind it to serveral view blocks.
            session.bind('event_hall', {
            	data    :   eventCollection.find(),
            });              

        });
	};	

	// onload is respond for handle all data subscription
	env.onload = function(){            
		return [getMsgs];
	};

	//sceneRender is respond for handle view render and transition
	env.onrender = function(doRender){
		doRender('event_hall', ['push', 'left']);
	};

	//onready is respond for event binding and data manipulate
	env.onready = function(){			
		session.event('event-hall', function(){     
			// var newEventButton = document.getElementById('newEventButton');
			// newEventButton.addEventListener('click', newEvent); 
        });
	};

	env.destroy = function(){
		this.destroy();
	};
	
	var newEvent = function(){
		env.redirect('/event_new');
		// env.redirect('/event',{id:'51eab8f007d17c15c0000000'});	
	}		
});;sumeru.router.add(
	{
		pattern: '/event_view',
		action : 'App.event_view'
	}
);

App.event_view = sumeru.controller.create(function(env, session, param){
	// console.log("param.a" + param.a);
	var getMsgs = function(){       
		session.events = env.subscribe('pub-events', function(eventCollection){
			//manipulate synced collection and bind it to serveral view blocks.
			session.bind('event_view', {
            	data : eventCollection.find({'smr_id': param.a}),
            });              

        });
	};	

	// onload is respond for handle all data subscription
	env.onload = function(){  
		return [getMsgs];
	};

	//sceneRender is respond for handle view render and transition
	env.onrender = function(doRender){
		doRender('event_view', ['push', 'left']);
	};

	//onready is respond for event binding and data manipulate
	env.onready = function(){			
		session.event('event_view', function(){     
        });
	};

	env.destroy = function(){
		this.destroy();
	};

	var backHome = function(){
		env.redirect('/event_hall');
	};

});;sumeru.router.add(
	{
		pattern: '/event_new',
		action : 'App.event_new'
	}
);

App.event_new = sumeru.controller.create(function(env, session){
	var getMsgs = function(){       
		session.events = env.subscribe('pub-events', function(eventCollection){

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
		var event_title = document.getElementById('event_title');
		event_title = event_title.value.trim();	
		if (event_title == '') {
           return false; 
       	};
       	
		var event_time = document.getElementById('event_time');
		event_time = event_time.value.trim();	
		var event_address = document.getElementById('event_address');
		event_address = event_address.value.trim();	
		var event_desc = document.getElementById('event_desc');
		event_desc = event_desc.value.trim();	
       	
       	session.events.add({
       		title : event_title,         
       		time : event_time,         
       		address : event_address,         
           	desc : event_desc,         
       	});
       	session.events.save();
       	
       	env.redirect('/event_hall');
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
