var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';


MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server.");

  var collection = db.collection('newcollection');

  var q = {'$and': [ {a : 3}, {b: {"$gte" : 3} } ] };
  collection.find().toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        for (var i = 0; i < result.length; i++ ) {
        	console.log(JSON.stringify(result[i]));
        }
      } else {
        console.log('No document(s) found !');
      }

      //Close connection... when we are really done working with the DB!
      db.close();
    });
});