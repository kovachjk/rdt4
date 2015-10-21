/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    angular.module('siteApp',[]).controller('siteCtlr',['$scope','$http' ,function($scope,$http){
        $scope.greeting = { text: 'Hello',
        yourName:"JKKK"};
        $scope.sites = [];
        $http.get("http://localhost:1337/employee/")
    }]);
    function showHide(){
        var listDiv = document.getElementById('siteList'),
            updateDiv = document.getElementById('siteUpdate'),
            createDiv = document.getElementById('siteCreate')
        
        if (listDiv.style.display !== "none") {
            listDiv.style.display = "none";
            createDiv.style.display = "none";
            updateDiv.style.display = "block";
        }
        else {
            updateDiv.style.display = "none";
            listDiv.style.display = "block";
            createDiv.style.display = "block";
        }
    }
    function saveEdits(idSite,siteDesc,siteName,parentLevel,siteLevel){
    //easier to use #ID's on inputs and selects
        var siteName = siteName,//$("#siteForm input[name=siteName]").val(),
        siteLevel = siteLevel,//$("#siteForm select[name=siteLevel]").val(),
        desc = siteDesc, //$("#siteForm input[name=siteDesc]").val(),
        levelParent = parentLevel;// $("#siteForm input[name=levelParent]").val();
       // console.log("Updatesite Serialized form = "+ $("#siteForm").serialize());
       showHide();
       return;
        if (siteName && siteLevel){
            $.put(
                '/site',
                {siteID:idSite, siteName:siteName,siteLevel:siteLevel,siteDesc:siteDesc,parentLevel:siteLevel},
              //  {siteName: siteName, siteLevel:siteLevel},
                function (site) {
                    console.log("new Site:", site[0])
                    site.index= '55';
                    var html = Handlebars.templates['updateSites'](site); // your template minus the .js
                    //context = events.all(), // your data
                    //console.log("Template = ", template);
                  //ar html = template(data);
                    console.log("New Data = "+ site.siteName);
                    //var text = JSON.parse(data);
                    console.log('html to update',html);
                    
                    $('#tblRows').append(html);
                }
            ).fail(function(res){  
                alert("Error: " + res.getResponseHeader("error"));
            });
        } else {
            alert("A username and password is required");
            alert("Error: " + res.getResponseHeader("results"));
        }  
  }  
  
  function createSite() {
      //easier to use #ID's on inputs and selects
        //var siteName = $("#siteName").val();
       // var siteLevel = $("#siteLevel").val();
        var desc = $("#siteDesc").val();
       // var idParent = $("#idParent").val();
        console.log("siteForm Serialized = "+ $("#formCreateSite").serialize());
        console.log("SiteName:  ", siteName," SiteLevel: ",siteLevel," SiteDesc: ",desc);
        if (siteName && siteLevel) {
            $.post(
                '/site',
                {idParent:idParent, siteHash:'<%=parentHash%>', siteName:siteName,siteLevel:siteLevel,siteDesc:desc},
              //  {siteName: siteName, siteLevel:siteLevel},
                function (site) {
                    console.log("new Site:", site[0]);
                    site.index= '55';
                    var html = Handlebars.templates['updateSites'](site); // your template minus the .js
                    //context = events.all(), // your data
                    //console.log("Template = ", template);
                  //ar html = template(data);
                    console.log("New Data = "+ site.siteName);
                    //var text = JSON.parse(data);
                    console.log('html to update',html);
                    
                    $('#tblRows').append(html);
                }
            ).fail(function(res){  
                alert("Error: " + res.getResponseHeader("error"));
            });
        } else {
            alert("A username and password is required");
           
        }
    };
/*rdt2 working routine
    function saveSite() {
       // alert('At least I made it this far!');
        console.log("in save user");
        $.ajax({
            url: "/site/",
            type: "post",
            data: $("#the-form").serialize(),
            success: function (res) {
                console.log('Saved Edited Data');
                //window.location.href = '/users/';
               // $('#tblRows').append (theTemplate ({data:samples}));
                window.location.reload();
                return false;
            },
            error: function (xhr, status, error) {

                console.log(xhr.responseText);
                var err = '';
                $.each(JSON.parse(xhr.responseText), function (i, item) {

                    err += '<li>' + item.msg + '</li>';
                });
                $(".err-area").html(err);
                return false;
            }

        });
    }
*/
    $('#areaLink').click(function(){ ListAreas(); return false; });
    function ListAreas(){
        alert('At least I made it this far! ');
    }

    $('#newSiteBtn').click( function(){
        //alert("new btn pressed");
        window.location.href='/sites/new/{{title}}/{{siteID}}/{{siteLevel}}'; return false;
    });
    function editSite(){
        showHide();
        
    };

    function deleteSite(site_id){
        
        $.ajax({

            url:"/site/"+site_id,
            type: 'delete',
            success: function(res) {

                window.location.reload();
                return false;
            },
            error:function(xhr, status, error){

                console.log(xhr.responseText);
                alert("Error deleting");
                return false;
            }
        });
    };
    /*TODO: Mouseover
    $('.sName').onmouseover(function(){

    })
*/

