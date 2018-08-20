var mongoose = require('mongoose');
try{
    mongoose.connect('mongodb://127.0.0.1:27017/securing-rest-apis-with-jwt', function(err, connection){
            console.log("connected : ");
        
    });
} catch(e){

    console.log(e)
}
