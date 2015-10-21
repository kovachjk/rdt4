/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
 *This is from Ep5 -6 of SailsCasts and is used by createUser in api/controllers/UserController
 * */


module.exports = function emailAddressInUse (){

  // Get access to `res`
  // (since the arguments are up to us)
  //var res = this.res;
  console.log('L15 File: /responses/emailAddress in Use Error')
  return this.res.send(409, 'Email address is already in use.');
};