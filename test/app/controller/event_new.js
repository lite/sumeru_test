sumeru.router.add(
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

	env.destroy = function(){
		this.destroy();
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
	};

});