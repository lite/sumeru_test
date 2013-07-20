sumeru.router.add(
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

	env.destroy = function(){
		this.destroy();
	};
	
	var newEvent = function(){
		env.redirect('/event_new');
	}		
});