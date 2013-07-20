module.exports = function(fw){
	fw.publish('event', 'pub-event', function(callback){
		var collection = this;
		collection.find({}, {}, function(err, items){
			callback(items);
 		});
	});   
}
