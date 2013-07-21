sumeru.router.add(
	{
		pattern: '/login',
		action : 'App.login'
	}
);

App.login = sumeru.controller.create(function(env, session){
	//sceneRender is respond for handle view render and transition
	env.onrender = function(doRender){
		doRender('login', ['push', 'left']);
	};

	//onready is respond for event binding and data manipulate
	env.onready = function(){			
		session.event('login', function(){     
			var loginButton = document.getElementById('loginButton');
			loginButton.addEventListener('click', login); 
        });
	};
	
	var login = function(){
		var username = document.getElementById('username');
		username = username.value.trim();	
		if (username == '') {
           return false; 
       	};
       	
		var password = document.getElementById('password');
		password = password.value.trim();	
		// sumeru.auth.login({
		//     token: username,
		//     password: password,
		//     callback: function(){ 
		//     	env.redirect('/event_hall');      
		// 	}),
		//     expires: 1000
		// });
	};	
});