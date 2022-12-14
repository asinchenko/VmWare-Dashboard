import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';
import jwt from'jsonwebtoken';
const secret = "secret";

const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        trim: true,
        minlength: 4,
        lowercase: true,
        index: true,
        hash: String,
        salt: String,
    },
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true},
},{
    timestamps: true,
});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
      let today = new Date();
      let exp = new Date(today);
      exp.setDate(today.getDate() + 60);
      return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
      }, secret);
    };

userSchema.methods.toAuthJSON = function(){
      return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
      };
    };

const User = mongoose.model('User', userSchema);
export default User;