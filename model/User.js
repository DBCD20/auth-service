const mongoose      = require('mongoose');
const bcrypt        = require('bcryptjs');
const SALT_FACTOR   = process.env.SALT_FACTOR;


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 7,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    jobPost: {
        type: String,
        enum: [ "Scrum Master", "Project Owner", "Project Manager" ],
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

// ====== HASH THE PASSWORD BEFORE SAVING ===========
UserSchema.pre('save', async function( next ){
    try {
        if(!this.isModified( 'password' )){ return next() }
        this.password = await bcrypt.hash(this.password, parseInt(SALT_FACTOR));
        return next();
    }
    catch( err ){
        return next( err )
    }
})

// ===== ADD A COMPARE PASSWORD METHOD ==============
UserSchema.methods.comparePassword = async function( candidatePassword ){
    let isMatch = await bcrypt.compare( candidatePassword, this.password );
    return isMatch;
    
}

const User = mongoose.model( "User", UserSchema );

module.exports = User;