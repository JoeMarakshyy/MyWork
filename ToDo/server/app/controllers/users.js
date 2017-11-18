var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),

mongoose = require('mongoose'),
User = mongoose.model('User')
module.exports = function (app, config){

    router.route('/users').get(function(req, res, next){
    logger.log('Get User', 'verbose');
    var query = User.find()
      .sort(req.query.order)
      .exec()
      .then(result => {
           if(result && result.length) {
          res.status(200).json(result);
      } else {
          res.status(404).json({message: 'No users'});
      }
      })
      .catch(err => {
        return next(err);
      });
  })
  router.route('/users/:userId').get(function(req, res, next){
            logger.log('Get user ' + req.params.userId, 'verbose');
    
            User.findById(req.params.userId)
                .then(user => {
                    if(user){
                        res.status(200).json(user);
                    } else {
                        res.status(404).json({message: "No user found"});
                    }
                })
                .catch(error => {
                    return next(error);
                });
        }); 
    router.route('/users/:userId').put(function(req, res, next){
            logger.log('Update user ' + req.params.userId, 'verbose');
        
            User.findOneAndUpdate({_id: req.params.userId}, 		req.body, {new:true, multi:false})
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(error => {
                    return next(error);
                });
        }); 

        router.route('/users/:userId').delete(function(req, res, next){
        logger.log('Delete user ' + req.params.userId, 'verbose');
        
            User.remove({ _id: req.params.userId })
                .then(user => {
                    res.status(200).json({msg: "User Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
        });
    }