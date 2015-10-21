/**
 * Created by johnk on 6/19/2015.
 * This file holds helper routines for manipulating
 * the sites DB in api/controllers/SiteController.js file
 *
 */

var bcString = "x",
    SiteTypeName = ['Home', 'Company', 'Plant or Area', 'Area or Machine', 'Machine', 'Component', 'TestPoint','Acquisition'],
    SitesTypeName = ['Site', 'Companies', 'Plants', 'Areas', 'Machines', 'Components', 'TestPoints','Acquisitions'],
    currentSiteName = 'Home',
    currentSiteID = '0',
    currentSiteLevel = '0',//Used on listSites and configSites to enhance page
    currentSiteType = 'Home',

bcArray = [{
        Name:'Home',
        ID:'1',
        Level:'0'
    }],
typeOptions = {},
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
function buildBreadCrumbs() {
    bcString = "<a href='/site/sites/" + bcArray[0].ID +"?level="+bcArray[0].Level+"&name="+bcArray[0].Name +"'>/"+ bcArray[0].Name+"</a>";
    console.log("L29 in assets/js/public/siteScripts.js: x = "+x+" array.Length = "+ bcArray.length);
    for(var x = 1; x < bcArray.length; x++ ){
        bcString  += "<a href='/sites/'" + bcArray[x].ID +"?level="+bcArray[x].Level+"&name="+bcArray[x].Name +"'>/"+ bcArray[x].Name+"</a>";
    }
    console.log("L33  aBREADCRUMB"+ bcString);
    console.log("L34 Just before return bcString - x = "+x+" Length = "+ bcArray.length);
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
module.exports = {

    test: function(name){
        return "Hello "+name;
    },
    /**
     * Changes all the names used on view pages based on site level
     * @param {type} Level
     * @returns {siteTypeName}
     */
    resetSiteTypeNames: function(Level){
      siteTypeName.parentSingular = SiteTypeName[Level];
      siteTypeName.childSingular = SiteTypeName[parseInt(Level, 10) +1];
      siteTypeName.childPlural = SitesTypeName[parseInt(Level, 10) +1];
      return siteTypeName
    },
    siteTypeName: siteTypeName, // acts as aggregate for lables used on view page
    /**
 * Build an array of strings which controls what kind of child can be added to a parent.
 * @param {type} level - Level of parent which controls what type of child can be created
 * @returns {Object} - Returns an object which contains an array of strings 
 */
    buildSiteOptionsList: function (level) {
        console.log("In build options");
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
    buildBreadCrumbs: function(Name, id, level){
        console.log("In Update BD: Level = "+ level +" CSL = "+currentSiteLevel );
        if(level > currentSiteLevel){
            console.log("******* In  > GT >******");
            addBreadCrumb(Name, id, level);
            currentSiteName = Name;
            currentSiteID = id;
            currentSiteLevel = level;

           // return buildBreadCrumbs();
       }
       if(level < currentSiteLevel){
           console.log("******* In updateBreadCrumbs < LT <******");
            trimBreadCrumb(id);
            currentSiteName = Name;
            currentSiteID = id;
            currentSiteLevel = level;

           // 
       }
       return buildBreadCrumbs();
    },
    /**
     * 
     * @param {number} Site Level
     * @returns {string} name of the site level
     */
    getSiteTypeName: function(Level){
        return SiteTypeName[Level];
    },
    currentType: SiteTypeName[currentSiteLevel],
    currentName: currentSiteName,
    currentLevel:currentSiteLevel,
    currentBCString:buildBreadCrumbs(),
    isNumeric: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    /**
     * Deletes not only selected site, but also all decendants and the data
     * associcated with the sites.
     * @param {String} HashCode
     * @returns {Boolean}
     */
    deleteSite: function(HashCode){
        
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
    incrementHashStr: function(str){
        var strEnd = str.length - 1,
        tempStr = str.charCodeAt(strEnd);// Find the value of the last char   
        if( tempStr >= 120){
            //if char at strEnd is 'x' then:
            strEnd--;// move the char pointer the the previous char
            // increment the value of the previous char
            // and add an 'a' to it.
            tempStr = String.fromCharCode((str.charCodeAt(strEnd) + 1), 97);
            //trim last two char off of str and add tempStr
            tempStr = str.substr(0, strEnd) + tempStr
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
    }

};
