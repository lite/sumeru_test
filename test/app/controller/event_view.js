sumeru.router.add(
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

});