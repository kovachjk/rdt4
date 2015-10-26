/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var password = require('machinepack-passwords');
module.exports = {
    index:function(req,res,next){
        res.locals.layout = 'layouts/publicLayout';//Found in config/views.layout and spcifies what layout.ejs to use
        res.view('appMain');
    },
    demo:function(req,res,next){
        res.locals.layout = 'layouts/publicLayout';//Found in config/views.layout and spcifies what layout.ejs to use
        res.view('homepageDemo');
    },
    home:function(req,res,next){
        res.locals.layout = 'layouts/publicLayout';//Found in config/views.layout and spcifies what layout.ejs to use
        res.view('login');
    },
    sendText: function(req,res,next){
        res.locals.layout=false;
        res.view('about.ejs');
    },
    login:function(req,res,next){
        console.log('L10 In userController.login');
        var param = req.query;
        console.info("L16 Params PW = ",param.password);
        console.log("L17 Params email = ",param.email);
        User.find()
            .where({email:param.email})
            .where({password:param.password})
            .exec(function(err,results){
                console.info('Results Are: ', results);
                if(err){
                    console.log("Error = "+ err);
                    return res.notFound();
                }    
                if(results.length == 0 ){
                    console.log('L27 UserController: No results Returned');
                    //res.render('409',{error:'User not found'});  
                    res.status(404);                 
                    res.json({status:'404', error:"User not found"});
                    //return res.render('404',{error:'User not found'});
                    return;
                }
                console.log('L35 User Login Response = ',JSON.stringify(results));
                
                res.json(results);
                return;
            }); 
    },
    logout: function(){
        
    },
    /** Shows the new user sign in page  when url = get/signup */
    signup:function(req,res,next){
        console.log('L45 In userController.signup');
        res.locals.layout = 'layouts/publicLayout';//Found in config/views.layout and spcifies what layout.ejs to use
        res.view('user/signup');
    },
    createUser: function(req, res, next){   
        
        var param = req.body;
        console.log('In userController.create');
        if(req.xhr === true) console.log("Using AJAX in userCreate");
        
        password.encryptPassword({password:param.password, difficulty:10,}).exec({
            error:function(err){
                console.log('EncryptPassword Error: ', err);
                return res.negotiate(err);
            },
            success:function(result){
                console.info("L61 Password Encrypt result = ",result);
                param.encryptedPassword = result;
                param.lastLoggedIn = new Date(0);
                console.log("64 Params All = ",param);
                console.log("L65 Params email = ",param.email);
                User.create(req.body,function(err, user){   
                    if(err){   
                        //Check to see if someone is trying to use the same email address
                        if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                            && err.invalidAttributes.email[0].rule === 'unique'){
                            console.log('Duplicate Email Error');
                            return res.emailAddressInUse();
                        };
                        console.info("err: ", err);
                        return res.negotiate(err);
                    };
                    console.log("New User Created = ", user);            
                    res.status(201);
                    res.json(user);
                });
            }     
         });  
    }
};

