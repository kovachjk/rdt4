/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    userName: {
        type: 'string',
        required: true
    },

    // The user's title at their job (or something)
    // e.g. Genius
    title: {
        type: 'string'
    },

    // The user's email address
    // e.g. nikola@tesla.com
    email: {
        type: 'email',
        required: true,
        unique: true
    },
    //The highest site level this user can reach
    //No requested site hashed can be different or shorter(higher up) 
    topLevelHash:{
        type:'string',
        defaultsTo:'zz'
    },
    // The encrypted password for the user
    // e.g. asdgh8a249321e9dhgaslcbqn2913051#T(@GHASDGA
    encryptedPassword: {
        type: 'string',
        required: true
    },
    //10 different access level for the user
    //Viewer = 0, User= 1-5, Manager = 6-8,   Admin = 9, superUser = 69
    userAccessLevel:{
        type: 'integer',
        defaultsTo: '0'//0=client/viewer 5=super user in server have an array of random number 
    },
    // The timestamp when the the user last logged in
    // (i.e. sent a username and password to the server)
    lastLoggedIn: {
        type: 'date',
        required: true,
        defaultsTo: new Date(0)
    },
  }
};

