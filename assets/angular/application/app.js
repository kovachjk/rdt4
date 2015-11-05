/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('reditApp',['ui.router','compareTo','toastr']);

//From http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html
angular.module('reditApp').run(function ($rootScope) {
    $rootScope.user = {
        hashPath:'zz',
        actionLevel:10
    };
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams,fromState, fromParams) {
        
        console.log('I have reached $statechangestart');
        if($rootScope.user.hashPath == 'zz'){
            console.log("You have permisson to proceed!");
        }
    });
});

angular.module('reditApp').config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    //this router implements the redit project @ https://github.com/angular-ui/ui-router
    
    $urlRouterProvider.otherwise('/');
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.url();
        console.log('Patch = ',path);
    });



$stateProvider        
    // HOME STATES AND NESTED VIEWS ========================================
    .state('/', {
        url: '/',
        templateUrl: 'angular/application/partial_appSplash.ejs'
    })
    .state('userLogin',{
        url: '/login',
        controller: 'UserCntrl',
        templateUrl: 'angular/application/partial_userLogin.ejs'        
    })
    .state('userCreate',{
        url: '/newUser',
        templateUrl: 'angular/application/partial_userCreate.ejs'        
    })
    // nested list with custom controller
    .state('home.list', {
        url: '/list',
        templateUrl: 'partial-home-list.html',
        controller: function($scope) {
            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        }
    })

    // nested list with just some random string data
    .state('home.paragraph', {
        url: '/paragraph',
        template: 'I could sure use a drink right now.'
    })

    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('about', {
        url: '/about',
        views: {
            '': { templateUrl: 'partial-about.html' },
            'columnOne@about': { template: 'Look I am a column!' },
            'columnTwo@about': { 
                templateUrl: 'table-data.html',
                controller: 'scotchController'
            }
        }

    });
        
        
}]);


