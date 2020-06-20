const User=require('../model/user');

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){ // instead of fineById() you had fineOne() which is wrong
           if(user){
               return res.render('user_profile',{
                   title:"User Profile",
                   user:  user
               });
            }
            return res.redirect('/users/sign-in'); // this statements was missing
        });

    }else{
        return res.redirect('/users/sign-in');
    }
}



module.exports.signUp= function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/user/profile');

    }
    return res.render('user_sign_up',{
        title:"codeial|Sign Up"
    })
}
module.exports.signIn= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
 
     }
    return res.render('user_sign_in',{
        title:"codeial|Sign In"
    })
}
//get the sign data show the error
//bro show me the error ye error aah rha h

module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in finding user in signing up'); return}
                 return res.redirect('/users/sign-in');
            })
            
            
        }else{
            return res.redirect('back');
        }
    });
}




module.exports.createSession = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}
        

        if (user){
            if(user.password!=req.body.password){
                return res.redirect('/users/sign-in');
            }
            res.cookie('user_id', user.id); // there was a typing mistake, instead of user.id you had user_id
            console.log('cookie set');
            return res.redirect('/users/profile');
        }else{
            return res.redirect('back');
        }

    });
}
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}