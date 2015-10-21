/**
* Site.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    idSite:{
      type:'integer',
        "autoIncrement": true,
        "primaryKey": true,
        "unique": true
    },
    idParent:{
      type:'integer'
    },
    siteHash:{
      type:'string',
      lowercase:true
    },
    siteLevel:{
      type:'string'
    },
    siteType:{
      type:'string'
    },
    siteName:{
      type:'string',
      required: true
    },
    siteDesc:{
      type:'string'
    }
  }
};

