/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    //sends this socket id so it can be subscribed at the controller
    io.socket.get('/user/watchUser', function(resData, jwres) {
                                          console.log(resData);
                                        });
     
    //adds listener and what to do once receives event notification
    io.socket.on('user',function(obj){
        //if(obj.verb === 'created'){
        console.log('chat event is '+ JSON.stringify(obj));
        $("#user-list").append('<li>' + obj.data.name +' say: '+ obj.data.msg+ '</li>');
    });
     
    $("#go-data").click( function() {
        console.log("Go Data Button Pressed");
        io.socket.post('/user/createpub/',{name:$("#name").val(),msg:$("#msg").val()});
        $("#msg").val("");//reset input to null
    });
    $("#test").click(function(){
        io.socket.get('/user/myTest',function(data,jwres){
            console.log("Test Data = ",JSON.stringify(data));
        });
    });