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
        
        userLevel: 123,
        topLevelHash: 'zz'
    
    };
    this.sayHello = function(){
       alert("My first session function!");
    };
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
    //Takes hash of the destination site user requests and compairs it to
    //his top level hash
    this.goTo = function(destHash){
        //length  of hash =  top level of user  
        if(destHash == userAthority.topLevelHash.substr(0,userAthority.topLevelHash.length)){
            return true;
        }else{
            return false;
        };
    };
    /**
     * The following functions will use a lookup table that consists of hashes of 
     * the different actions on different modules that has been configured by an
     * administrator to control the capabilty of users to perform actions
     * @type Arguments
     */
    this.edit = function(module, action){
        
    };
    this.delete = function(module, action){
        
    };
    this.create = function(module, action){
        
    };
    this.view = function(module, action){
        
    };
});

