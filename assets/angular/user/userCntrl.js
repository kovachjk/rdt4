/* 
 * * Created 9/29/15 by John Kovach
 * Source Inspiration: 
 * http://irlnathan.github.io/sailscasts/blog/2015/01/20/building-an-angular-application-in-sails-ep3-understanding-asset-delivery-options-in-our-signup-page/
 * @Time: 8:59
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//ToDo: Add method for alerting to duplicate emails


angular.module('reditApp').controller('UserCntrl',
    ['$scope','$http','$log','toastr','$state', '$timeout' ,
        function($scope,$http,$log,toastr,$state,$timeout){
    $scope.signupForm = {
        loading:false,
        myName:'jkk',
        myPartial:"/angular/application/partial_appSplash.ejs",
        myLastPartial:""
    };
    $scope.getLastPartial = function(){
        $log.debug("In getLastPartials");
        $scope.signupForm.myName = 'JKK2';
        $log.debug("LastPartial = ", $scope.signupForm.myLastPartial);
        $scope.signupForm.myPartial = $scope.signupForm.myLastPartial;      
    };
    $scope.getPartial = function(pName){
        $log.debug("In getPartials");
        $scope.signupForm.myName = 'JKK1';
        $scope.signupForm.myLastPartial = $scope.signupForm.myPartial; 
        $scope.signupForm.myPartial = "/angular/application/"+ pName;
    };
    $scope.showSignupForm = function(){
        $log.debug("In showSignupForm");
        $scope.signupForm.myName = 'JKK';
        $scope.signupForm.myPartial = "/angular/user/goodbye.ejs"
    };
    $scope.showLoginForm = function(){
        
        $scope.todos[2].action = "Sell Running Shoes";
    };
    $scope.todos = [
        { action: "Get groceries", complete: false },
        { action: "Call plumber", complete: false },
        { action: "Buy running shoes", complete: true },
        { action: "Buy flowers", complete: false },
        { action: "Call family", complete: false }];
  
    $scope.submitLoginForm = function(){
        console.log('login Button Pressed \r password = ', $scope.loginForm.password,'\r email = ',$scope.loginForm.email);
        //userCan.sayHello();
        $http({url:'/user/login', method:"GET", params:{
            email:$scope.loginForm.email,
            password: $scope.loginForm.password}
        })                                                                                          
        .then(function onSuccess(sailsResponse){
            $log.debug('Response = ',sailsResponse.data);
            $timeout(function(){
                console.log('About to call /newUser');
                $state.go('userCreate');
            },2000)
            toastr.success('You are now logged In');  
            
        })
        .catch(function onError(sailsResponse){
            // Handle known error type(s).
            // If using sails-disk adpater -- Handle Duplicate Key
           // console.info('Response Test');
            //console.info('Response Error = ',sailsResponse);
            var emailAddressAlreadyInUse = sailsResponse.status == 409;
            console.info("User Msg",sailsResponse);
            if (emailAddressAlreadyInUse) {
   
                toastr.error('That email address has already been taken, please try again.');
                return;
            }
        })
        .finally(function eitherWay(){
            $scope.signupForm.loading = false;
        });
    };
    $scope.submitSignupForm = function(){
        console.log('Button for new user Pressed');
        // Set the loading state (i.e. show loading spinner)
        $scope.signupForm.loading = true;
        // Submit request to Sails.
        $http.post('/user', {
            userName: $scope.signupForm.name,
            title: $scope.signupForm.title,
            email: $scope.signupForm.email,
            password: $scope.signupForm.password
        })                                                                                          
        .then(function onSuccess(sailsResponse){
            
             $log.debug('Response = ',sailsResponse.data);  
            //$console.info('Response = ',sailsResponse);            
                //window.location = '/';
        })
        .catch(function onError(sailsResponse){
            // Handle known error type(s).
            // If using sails-disk adpater -- Handle Duplicate Key
            var emailAddressAlreadyInUse = sailsResponse.status == 409;

            if (emailAddressAlreadyInUse) {
                toastr.error('That email address has already been taken, please try again.', 'Error');
                return;
            }
        })
        .finally(function eitherWay(){
            $scope.signupForm.loading = false;
        });
    };   
}]);

 