
var express = require('express'),
  router = express.Router(),
  logger = require('../../config/logger'),
mongoose = require('mongoose'),
passport = require('passport');
multer = require('multer'),
Todo = mongoose.model('Todo'),
passport = require('passport'),
mkdirp = require('mkdirp');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {    
    app.use('/api', router);
    



    var storage = multer.diskStorage({
        destination: function (req, file, cb) {      
              var path = config.uploads + req.params.userId + "/";
            mkdirp(path, function(err) {
                if(err){
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.');   
            cb(null, fileName[0] + new Date().getTime() + "." + 				fileName[fileName.length - 1]);
        }
      });
    
      var upload = multer({ storage: storage });
      

      router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
            logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
            
            Todo.findById(req.params.todoId, function(err, todo){
                if(err){ 
                    return next(err);
                } else {     
                    if(req.files){
                        todo.file = {
                            filename : req.files[0].filename,
                            originalName : req.files[0].originalname,
                            dateUploaded : new Date()
                        };
                    }           
                    todo.save()
                        .then(todo => {
                            res.status(200).json(todo);
                        })
                        .catch(error => {
                            return next(error);
                        });
                }
            });
        });
        
         router.route('/todos').get(function(req, res, next){
            logger.log('Get Todo', 'verbose');
            var query = Todo.find()
              .sort(req.query.order)
              .exec()
              .then(result => {
                   if(result && result.length) {
                  res.status(200).json(result);
              } else {
                  res.status(404).json({message: 'No todos'});
              }
              })
              .catch(err => {
                return next(err);
              });
          })
      
    
          router.route('/todos/:todoId').get(function(req, res, next){
                    logger.log('Get todo ' + req.params.todoId, 'verbose');
            Todo.findById(req.params.todoId)
                        .then(todo => {
                            if(todo){
                                res.status(200).json(todo);
                            } else {
                                res.status(404).json({message: "No todo found"});
                            }
                        })
                        .catch(error => {
                            return next(error);
                        });
                }); 
            
    
            router.route('/todos/:todoId').put(function(req, res, next){
                    logger.log('Update todo ' + req.params.todoId, 'verbose');
                Todo.findOneAndUpdate({_id: req.params.todoId}, 		req.body, {new:true, multi:false})
                        .then(todo => {
                            res.status(200).json(todo);
                        })
                        .catch(error => {
                            return next(error);
                        });
                }); 
                
    
                router.route('/todos/:todoId').delete(function(req, res, next){
                    logger.log('Delete todo ' + req.params.todoId, 'verbose');
                Todo.remove({ _id: req.params.todoId })
                        .then(todo => {
                            res.status(200).json({msg: "User Deleted"});
                        })
                        .catch(error => {
                            return next(error);
                        });
                });
                
                
} 

