/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//adds listener and what to do once receives event notification
    io.socket.on('news',function(response){
            if(response.name === 'blackhawks'){
                 $("#blackhawks").append('<li>' + response.news + '</li>');
            } else {
                    if(response.name === 'lightning'){
                      $("#lightning").append('<li>' + response.news + '</li>');
                    }
            }
     })
     
    //subscribes to Blackhawks messages (code on TeamNewsController.subscribe)
    $("#gohawks").click( function() {
      io.socket.post('/teamnews/joinroom/',{teamName:'blackhawks'});
      alert("subscribed to Hawks news!");
    });
     
    //subscribes to Lightning messages (code on TeamNewsController.subscribe)
    $("#gotampa").click( function() {
      io.socket.post('/teamnews/joinroom/',{teamName:'lightning'});
      alert("subscribed to Lightning news!");
    });
     
    $("#submit").click( function() {
      if ($("#teamNameSelect").val() != "0") {
        io.socket.post('/teamnews/broadcastnews/',{
                                              team:$("#teamNameSelect").val() ,
                                              news:$("#news").val()
                                            });
      }else {
        alert("please select team!");
      }
    });
     
