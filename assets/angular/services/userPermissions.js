/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Copyright 2015: John Kovach - Stillbright Managment LLC
 * Created: 10/25/15
 * Desc:  This service deals with authorizing users to navigation of the application
 * as long as the user requests page that is under the root hash and security level of his 
 * initial request the authRoute function returns true.
 */
angular.module('reditApp').service('canUser',function($http){
    var userAthority  = {
        userName: 'Jose Hemanis',
        userEmail: 'j@k.com',
        userLevel: 123,
        userHash: 'aabbcc'
        
    };
    this.sayHello = function(){
       alert("My first session function!");
   } ;
   this.userHash = function(newHash){
       if(newHash){
           userAthority.userHash = newHash;
           return userAthority.userHash;
       }
       return userAthority.userHash;   
   };
   this.userName = function(newName){
       if(newName){
           userAthority.userName = newName;
           return userAthority.userName;
       }
       return userAthority.userHash;
   };
   this.userEmail = function(newEmail){
       if(newEmail){
           userAthority.userEmail = newEmail;
           return userAthority.userEmail;
       }
       return userAthority.userEmail;
   };
   this.login = function(email, password,callback){
        console.log('Processing login service request. Email = ',email, ' Password = ', password);
        $http({url:'/user/login', method:"GET", params:{
            email:email,
            password: password}
        })                                                                                          
        .then(function onSuccess(sailsResponse){
            console.log('Response = ',sailsResponse.data);
               callback(sailsResponse.data);
               // console.log('About to call /newUser');
               // $state.go('userCreate');
               // return {result:'loggedin',msg:'Greetings, You are now logged in'};
           // toastr.success('You are now logged In');  
            
        })
        .catch(function onError(sailsResponse){
            // Handle known error type(s).
            // If using sails-disk adpater -- Handle Duplicate Key
           // console.info('Response Test');
            //console.info('Response Error = ',sailsResponse);
            var emailAddressAlreadyInUse = sailsResponse.status == 409;
            console.info("User Msg",sailsResponse);
            if (emailAddressAlreadyInUse) {
   
                //toastr.error('That email address has already been taken, please try again.');
                return {result:'loggedOut',msg:'That email address has already been taken, please try again.'};
            }
        })
        .finally(function eitherWay(){
            $scope.signupForm.loading = false;
        });
    };
});

