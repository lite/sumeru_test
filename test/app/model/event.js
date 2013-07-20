Model.event = function(exports){	
	exports.config = {		
		fields : [
			{name: 'title', type: 'string'},
			{name: 'desc', type: 'text'},
			{name: 'address', type: 'string'},
			{name: 'time', type: 'datetime',defaultValue: 'now()'}
		]
	};
};
