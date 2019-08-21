const mongoose      = require('mongoose');
const User          = require('./User');

mongoose.Promise = Promise;
mongoose.set("debug", true);

let counter = 0;

const DBconnect = function(){
    if(counter > 0) console.log(`\nReconnecting on the (${counter}) time.`);
    mongoose.connect("mongodb://localhost/delex", {
    useNewUrlParser: true,
    keepAlive: true
})
.then(err => {
    console.log("CONNECTED TO THE DATABASE")
    counter=0;
    return
})
.catch(err => {
    console.log("\nCan't connect to the database.")
    if(counter <= 5) {
        console.log('\nReconnect attempt will start after 10 seconds...')
        setTimeout(DBconnect, 10000)
        counter++;
        return
    }
    console.log('MAX CONNECTION ATTEMPTS HAS REACHED');
    return

})
}

// START THE DATABASE CONNECTION
DBconnect();

module.exports.User = User;