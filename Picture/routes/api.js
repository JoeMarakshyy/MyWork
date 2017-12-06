var mongoose = require('mongoose');
var User = mongoose.model('User');
var Gallery = mongoose.model('Gallery');
var Images = mongoose.model('Images');
var express = require('express');
var passport = require('passport');
var async = require('async');
var crypto = require('crypto');
var bCrypt = require('bcrypt-nodejs');

var router = express.Router();


function isAuthenticated(req, res, next) {
    if (req.method === "GET") {
        return next();
    }
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/#login');
};

var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

router.route('/users')
    //gets all users
    .get(function(req, res) {
        User.find(function(err, user) {
            if (err) {
                return res.writeHead(500, err);
            }
            return res.send(user);
        });
    });


router.route('/gallery')

.get(function(req, res) {
    Gallery.find(function(err, gallery) {
        if (err) {
            return res.writeHead(500, err);
        }
        return res.send(gallery);
    });
})

.post(function(req, res) {
    var newGallery = new Gallery();
    newGallery.galleryName = req.body.galleryName;
    newGallery.galleryAdmin = req.body.galleryAdmin;
    newGallery.save(function(err, newGallery) {
        if (err) {
            return res.send(500, err);
        }
        return res.send(JSON.stringify(newGallery));
    });
})

.delete(function(req, res) {
    Gallery.remove({}, function(err) {
        if (err)
            res.send(err);
        res.json("All galleries deleted");
    });
});



router.route('/images')

.get(function(req, res) {
    Images.find(function(err, images) {
        if (err) {
            return res.writeHead(500, err);
        }
        return res.send(images);
    });
})

.post(function(req, res) {
    var newImage = new Images();
    newImage.imageName = req.body.imageName;
    newImage.imageURL = req.body.imageURL;
    newImage.galleryID = req.body.galleryID;
    newImage.save(function(err, newImage) {
        if (err) {
            return res.send(500, err);
        }
        return res.send(JSON.stringify(newImage));
    });
})


.delete(function(req, res) {
    Images.remove({}, function(err) {
        if (err)
            res.send(err);
        res.json("All Images deleted");
    });
});



router.route('/users/:id')

.delete(function(req, res) {
    User.remove({
        _id: req.params.id
    }, function(err) {
        if (err)
            res.send(err);
        res.json("User deleted");
    });
});

router.route('/gallery/:id')

.get(function(req, res) {
    Gallery.findById(req.params.id, function(err, gallery) {
        if (err)
            res.send(err);
        res.json(gallery);
    });
})

.put(function(req, res) {
    Gallery.findById(req.params.id, function(err, gallery) {
        if (err)
            res.send(err);

        gallery.galleryName = req.body.galleryName;
        gallery.galleryAdmin = req.body.imageName;

        gallery.save(function(err, gallery) {
            if (err)
                res.send(err);

            res.json(gallery);
        });
    });
})

.delete(function(req, res) {
    Gallery.remove({
        _id: req.params.id
    }, function(err) {
        if (err)
            res.send(err);
        res.json("Gallery deleted");
    });
});


router.route('/images/:id')

.get(function(req, res) {
    Images.find({
        galleryID: req.params.id
    }, function(err, image) {
        if (err)
            res.send(err);
        res.json(image);
    });
})

.put(function(req, res) {
    Images.findById(req.params.id, function(err, image) {
        if (err)
            res.send(err);

        image.imageName = req.body.imageName;
        image.imageURL = req.body.imageName;
        image.galleryID = req.body.galleryID;
        image.save(function(err, image) {
            if (err)
                res.send(err);

            res.json(image);
        });
    });
})

.delete(function(req, res) {
    Images.remove({
        _id: req.params.id
    }, function(err) {
        if (err)
            res.send(err);
        res.json("Image deleted");
    });
});

module.exports = router;