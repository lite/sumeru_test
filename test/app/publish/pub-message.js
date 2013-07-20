module.exports = function(fw){
  // sumeru.publish(modelName, publishName,function(callback))
	fw.publish('message', 'pub-message', function(callback){
		var collection = this;
		collection.find({}, {}, function(err, items){
			callback(items);
 		});
	});   
}
