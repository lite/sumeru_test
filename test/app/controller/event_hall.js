sumeru.router.add(
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
			var newEventButton = document.getElementById('newEventButton');
			newEventButton.addEventListener('click', newEvent); 
        });
	};

	env.destroy = function(){
		this.destroy();
	};
	
	var newEvent = function(){
		env.redirect('/event_new');
		// env.redirect('/event',{id:'51eab8f007d17c15c0000000'});	
	}		
});