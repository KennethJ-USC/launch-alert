// Script to orchestrate the intake and integration of data.


// Example: To return launches after August 20th, 2015:
//      > https://launchlibrary.net/1.4/launch/2015-08-20

function launchAlertData() {
    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    var ll_rooturl = "https://launchlibrary.net/1.4/launch/";
    
    console.log(oneWeekAgo);
}