/**
 * SiteController
 *
 * @description :: Server-side logic for managing sites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var parentHash = '';   
pSite = { //Parent Site of listed, edited, created or deleted
    idSite:0,
    idParent:0,
    siteLevel:0,
    siteHash:'',
    siteName:''
};   
/**
 * Created by johnk on 6/19/2015.
 * This file holds helper routines for manipulating
 * the sites DB in api/controllers/SiteController.js file
 *
 */

var bcString = "x",
    SiteTypeName = ['Home', 'Company or Plants', 'Plant or Area', 'Area or Machine', 'Machine', 'Component', 'TestPoint','Acquisition'],
    SitesTypeName = ['Home', 'Companies & Plants', 'Plants or Areas', 'Areas', 'Machines', 'Components', 'TestPoints','Acquisitions'],
    currentSiteName = 'Home',
    currentSiteID = '0',
    currentSiteLevel = '0',//Used on listSites and configSites to enhance page
    currentSiteType = 'Home',

bcArray = [{
        Name:'Home',
        ID:'0',
        Level:'0'
    }],
typeOptions = {},//used in drop down  selectors to choose the type of site
siteTypeName = {
    parentSingular:'',
    childSingular:'',
    childPlural:''
};
function breadCrumbObj( Name, id, Level){
    this.Name = Name;
    this.ID = id;
    this.Level = Level;
}
function buildBreadCrumbStr() {
    bcString = "<a href='/site/sites/?idParent=" + bcArray[0].ID +"&level="+bcArray[0].Level+"&name="+bcArray[0].Name +"'>/"+ bcArray[0].Name+"</a>";
    console.log("L49 in api/controllers/SiteController.js: BC_Array.Length = " ,bcArray.length);
    for(var x = 1; x < bcArray.length; x++ ){
        bcString  += "<a href='/sites/?idParent='" + bcArray[x].ID +"&level="+bcArray[x].Level+"&name="+bcArray[x].Name +"'>/"+ bcArray[x].Name+"</a>";
    }
    console.log("L53  New BREADCRUMB = ", bcString);
    console.log("L54 New Length = ", bcArray.length);
    return bcString;
}
 /**
    * param: siteObj
    * Adds the site object to an array then,
    * returns: html string that can be used by 6e site view
    */
    function addBreadCrumb(siteName,siteID,siteLevel){
        var bcObj = new breadCrumbObj(siteName, siteID, siteLevel);
        //  bcObj.siteName = siteName;
        // bcObj.childID2Lookup = siteID;
        // bcObj.siteType = siteTypeName[siteLevel];
        console.log("In Site Scripts - Name: "+bcObj.Name +" ID: "+ bcObj.ID +" Level: "+bcObj.Level);
        bcArray.push(bcObj);
        console.log("In Site Scripts - Name: "+bcArray[siteLevel].Name +" ID: "+ bcArray[siteLevel].ID +" Level: "+bcArray[siteLevel].Level);

    }
    /**
    * param: idSite
    * Find the index of the site object in the siteArray associated with the idSite
    * then sets the length of the site array to that index + 1
    * returns: html string that can be used by the site view
    */
    function trimBreadCrumb(idSite){
      for(x = 0; x < bcArray.length; x++){
        if(bcArray[x].ID == idSite){
          bcArray.length = x+1;
        }
      }
    }
    /**
     * 
     * @param {type} siteName
     * @param {type} siteID
     * @param {type} siteLevel
     * @returns {undefined}
     * This function is used when there is a tree control and the user
     * clicks on a different branch or a branch several levels back 
     */
    function changeExistingBreadCrumb(siteName, siteID, siteLevel){
        //find the item at the same level as siteLevel and change it.
        
    }


    var test = function(name){
        return "Hello "+name;
    },
    /**
     * Changes all the names used on view pages based on site level
     * @param {type} Level
     * @returns {siteTypeName}
     */
    resetSiteTypeNames = function(Level){
      siteTypeName.parentSingular = SiteTypeName[Level];
      siteTypeName.childSingular = SiteTypeName[parseInt(Level, 10) +1];
      siteTypeName.childPlural = SitesTypeName[parseInt(Level, 10) +1];
      return siteTypeName
    },
    siteTypeName = siteTypeName, // acts as aggregate for lables used on view page
    /**
 * Build an array of strings which controls what kind of child can be added to a parent.
 * @param {type} level - Level of parent which controls what type of child can be created
 * @returns {Object} - Returns an object which contains an array of strings 
 */
    buildSiteOptionsList = function (level) {
        console.log("L121 In build options, Level = ",level);
    //if level = 0 (Home) then the only option is a company
      if (level == '0') { //Home Parent
        typeOptions = [
                {"name": "Company", "value": 0}
            ];
      }
      if (level == '0') { //Home Parent
        typeOptions = [
                {"name": "Company", "value": "1"}
            ];
      }
      if (level == '1') { //Company Parent
        typeOptions = [
                {"name": "Plant", "value": "2"}, 
                {"name": "Area", "value": "3"}
            ];
      }
      if (level == '2') { //Plant Parent
        typeOptions = [
                {"name": "Area", "value": "3"}, 
                {"name": "Machine", "value": "4"}
            ];
      }
      if (level == '3') { //Area Parent
        typeOptions = [
              {"name": "Machine", "value": "4"}, 
              {"name": "Component", "value": "5"}
          ];
      }
      if (level == '4') { //Machine Parent
        typeOptions = [
                {"name": "Component", "value": "5"}
            ];
      }
      if (level == '5') { //Component Parent
        typeOptions =  [
                {"name": "Acquisition", "value": "6"}
            ];
      }
      if (level == '6') { //Acquisition  Parent
        typeOptions = [
                {"name": "Test", "value": "6"}
            ];
      }
      if (level == '7') { //Test Parent

      }
      return typeOptions;
    },
    buildBreadCrumbs = function(Name, id, level){
        console.log("L172 In siteController.buildBreadCrumbs: Name = ", Name, " Level = "+ level +" CSL = "+ currentSiteLevel );
        if(level > currentSiteLevel){
            console.log("******* In  > GT >******");
            addBreadCrumb(Name, id, level);
       }
        if(level < currentSiteLevel){
            console.log("******* In updateBreadCrumbs < LT <******");
            trimBreadCrumb(id);
       }
        currentSiteName = Name;
        currentSiteID = id;
        currentSiteLevel = level;
        return buildBreadCrumbStr();
    },
    /**
     * 
     * @param {number} Site Level
     * @returns {string} name of the site level
     */
    getSiteTypeName = function(Level){
        return SiteTypeName[Level];
    },
    currentType = SiteTypeName[currentSiteLevel],
    currentName = currentSiteName,
    currentLevel =currentSiteLevel,
    currentBCString =buildBreadCrumbs(),
    isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    /**
     * Deletes not only selected site, but also all decendants and the data
     * associcated with the sites.
     * @param {String} HashCode
     * @returns {Boolean}
     */
    deleteSite = function(HashCode){
        
        return false;  // doesn't do anything yet
    },
    /**
     * IncrementHaashStr - Takes a hash string and increments the last, and if 
     * greater than 'w', the second to last char. This allow for 626 items
     * at any child site level 
     * 10/3/15: Completed but untested
     * @param {String} str - The string that has the char to increment
     * @returns {String}
     */
    incrementHashStr = function(str){
        var strEnd = str.length - 1,
        tempStr = str.charCodeAt(strEnd);// Find the value of the last char   
        if( tempStr >= 120){
            //if char at strEnd is 'x' then:
            strEnd--;// move the char pointer the the previous char
            // increment the value of the previous char
            // and add an 'a' to it.
            tempStr = String.fromCharCode((str.charCodeAt(strEnd) + 1), 97);
            //trim last two char off of str and add tempStr
            tempStr = str.substr(0, strEnd) + tempStr;
            console.log('Start: ',str,' End: ',tempStr);
            return tempStr;
        }
        else{
            tempStr = String.fromCharCode((str.charCodeAt(strEnd) + 1));
            //trim last char off of str and add tempStr
            tempStr = str.substr(0, strEnd) + tempStr;
            console.log('Start: ',str,' End: ',tempStr);
            return tempStr;
        }
    };




module.exports = {
    /**
     * Gets a list of child sites base on the parent site selected
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    sites:function(req, res){
        if(req.xhr === true){
            console.log("Using AJAX in create");
            res.view('site/siteAngular',{title:'List Sites', angApp:'siteApp'});
        };
        pSite.siteLevel = req.param('level');
        pSite.idParent = req.param('idParent');
        typeOptions = buildSiteOptionsList(pSite.siteLevel);
        pSite.siteName = req.param('name');// the updated Name of the site
        breadCrumbString = buildBreadCrumbs(pSite.siteName, pSite.idParent, pSite.siteLevel);
        typeOptions = buildSiteOptionsList(pSite.siteLevel);
        resetSiteTypeNames(pSite.siteLevel);
        console.log("L261 In SiteController.sites: idParent = ", pSite.idParent," pLevel= ", pSite.siteLevel, " Name: ",pSite.siteName);
        console.log("typeOptions: ",JSON.stringify(typeOptions));
        //rows = [{idName:'myName',idSite:'1'}];
        if(pSite.idParent ){
            //console.log("L95 idParent = "+ idParent);
            if(!isNumeric(pSite.idParent)){
                console.log("267 SiteController.Sites: about to send a parent ID is not a number error");
                res.render('404',{error:'parentID is not a number'});
                return;
            }
            //if for some reason the first call to this function is not Home,
            //Make sure there is a parentHash to work with
            if(pSite.siteHash === ''){ 
                Site.find({where:{idParent:pSite.idParent,select:['siteHash']}})
                .exec(function(err,rows){
                    if(err){
                        console.log("Error = "+ err);
                        return res.notFound();
                    }    
                    if(rows[0] === null){
                        console.log('L288 SiteController.if(parentHash: No rows Returned');
                        return res.render('404',{error:'No parentHash found'});
                    }
                    pSite.siteHash = rows['1']['siteHash'];
                    console.log('parentHash L292 = ',pSite.siteHash);
                });
            }
               // data = Site.find();
            Site.find()
            .where({idParent:pSite.idParent})
            .exec(function(err,rows){
                if(err){
                    console.log("Error = "+ err);
                    return res.notFound();
                }    
                if(rows[0] === null){
                    console.log('L43 SiteController.Sites: No rows Returned');
                    return res.render('404',{error:'No Sites found'});
                }
                console.log('L307 SiteController About to run.res.view(), typeOptions = ',JSON.stringify(typeOptions));
                console.log('L308 Rows Data = ',JSON.stringify(rows));
                res.view('site/configSites3',{title:'List Sites', angApp:'siteApp', parentSite:pSite, data:rows, options:typeOptions,  
                    siteTypeStrings:resetSiteTypeNames(pSite.siteLevel), breadCrumbs:breadCrumbString});
                console.log('L311 About to run.res.view()');
                return;
            });       
        }
    },
    create: function(req, res, next){       
        if(req.xhr === true) console.log("Using AJAX in create");
        console.log('site Name = '+ req.param('userName'));
        var sLevel = req.param('SiteLevel'),
        newSiteDesc = req.param('SiteDesc'),
        newSiteName = req.param('SiteName'),
        pHash = req.param('parentHash');
                
        console.log('level = ', sLevel);
        console.log('Description = ', newSiteDesc);
        console.log("Params All = ",req.body);
        req.body.siteHash = 'aa'; //seed the hash 
        req.body.siteType = site.getSiteTypeName(sLevel);
   //     https://github.com/balderdashy/waterline/issues/73 - How to use select IN WATERLINE
        Site.find({where:{siteHash:{'startsWith':'aa'},siteLevel:1}, select:['siteHash']}) //Get all the hashes for this parent
        //Site.find()
        //.where({siteLevel:1})
        //.where({ siteHash: { startsWith: 'aa' }})
        //.select('siteID')
        .exec(function(err,rows){
            var nextCharPair = 'aa', // seed the search
            numRows = 0;
            if(err){
                console.log("Error = "+ err);
                return res.notFound();
            }    
            if(rows === undefined){
                console.log('L107 SiteController.find: Bad Search Request');
                return res.render('404',{error:'Bad Search Request for Hash Number in SiteController'});
            }
             //res.view('site/configSites',{title:'List Sites',data:rows, options:typeOptions, 
                //siteTypeStrings:siteTypeNames,siteName:parentName,parentID:idParent, breadCrumbs:breadCrumbString});
            
            numRows = rows.length;
            console.log('Row Length = ',numRows, ' Example: ',jkText[2]['siteHash'] );
            if(numRows == 0){
                
            }
            for(var x = 0; x < rows.length; x++){   // find last(largest) hash                                 
                var temp = rows[x].siteHash;
                //ToDo: If a hash has been deleted(skipped) set x = row.length;
                if(nextCharPair < temp){ nextCharPair = temp};                                     
            }
            console.log('Largest Hash = ',nextCharPair); //should now be the last and largest hash
            req.body.siteHash = site.incrementHashStr(nextCharPair);
            console.log('reg.body = ',req.body);

            res.status(201);
            res.json(site);
        });                 
    },
    aSite:function(req, res, next){
        console.log("In sails.SiteController.aSite");
        res.view('site/siteAngular',{title:'List Sites', angApp:'siteApp'});
    },
    pData:function(req, res, next){
        
    }
};

