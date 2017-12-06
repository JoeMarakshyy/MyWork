var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var gallerySchema = new mongoose.Schema({
    galleryName: String,
    galleryAdmin: String
});

var imageSchema = new mongoose.Schema({
    galleryID: String,
    imageName: String,
    imageURL: String
})

var userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    contact: Number,
    username: String,
    password: String
});

mongoose.model('User', userSchema);
mongoose.model('Gallery', gallerySchema);
mongoose.model('Images', imageSchema);