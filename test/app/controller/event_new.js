sumeru.router.add(
	{
		pattern: '/event_new',
		action : 'App.event_new'
	}
);

App.event_new = sumeru.controller.create(function(env, session){
	var getMsgs = function(){       
		session.events = env.subscribe('pub-event', function(eventCollection){
			//manipulate synced collection and bind it to serveral view blocks.
            session.bind('event-hall', {
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
		doRender('event_new', ['push', 'left']);
	};

	//onready is respond for event binding and data manipulate
	env.onready = function(){			
		session.event('event_new', function(){     
			var submitEventButton = document.getElementById('submitEventButton');
			submitEventButton.addEventListener('click', submitEvent); 
        });
	};

	env.destroy = function(){
		this.destroy();
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
       	
       	env.redirect('/index');
	};

});