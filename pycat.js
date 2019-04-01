/*
PyCat Routines
Michael Bigrigg
*/

/* removeWords()

   This function is will remove any words from the text to be processed that the user specified.
   If there are no words to be removed, then simply return the original input.
   A regular expression will be made to remove words in textclean[] for each entry in textcleanremoved[].
*/



function removeWords(textclean, textcleanremoved){
  if (textcleanremoved == "" ) {
    return textclean;
  }
  var replace = "";
  for(var i = 0; i < textcleanremoved.length; i++){
    if (i > 1)  //if its not the first word we need to make sure it's matching the whole word, with a space @ the front and back
    {
      replace = " " + textcleanremoved[i] + " ";
    }
    else //if this is the first word, only check for a space after the word
    {
      replace = textcleanremoved[i] + " ";
    }
    var re = new RegExp(replace, "g");
    textclean = textclean.replace(re, " ");

  }
  return textclean;
}

/* getDataLists()

   The following function is repsonisble for returning an array of lists consisting of strings that meet certain criteria (being a phone number, url, etc).
   The function relies heavily on regular expressions to determine if a given string belongs in any of the lists.
   A for loop will go through every single entry in wordlistsymbols resulting in an O(n) runtime.

*/

function getDataLists(wordlistsymbols){

  //emptying the arrays here so that any old data lists are removed
  hashtaglist = [];
  mentionslist = [];
  phonenumberslist = [];
  urlslist = [];
  emailslist = [];
  ipaddresslist = [];
  dateslist = [];
  timeslist = [];
  currencylist = [];

  for (i=0;i<wordlistsymbols.length;i++) {
    var phonenumber = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;
    var url = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var ipaddress = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var date = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    var time = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
    var currency = /^\$?[0-9]+(\.[0-9][0-9])?$/;
    if(wordlistsymbols[i].charAt(0) == '#'){
      if (hashtagslist.length == 0){
        label = "<td>Hashtags:</td>";
        hashtagslist.push(label);
      }
      x = "<td>" + wordlistsymbols[i] + "</td>";
      hashtagslist.push(x);
    }
    else if(wordlistsymbols[i].charAt(0) == '@'){
      if (mentionslist.length == 0){
        label = "<td>Mentions:</td>";
        mentionslist.push(label);
      }
      x = "<td>" + wordlistsymbols[i] + "</td>";
      mentionslist.push(x);
    }
    else if(wordlistsymbols[i].match(phonenumber)){
      if (phonenumberslist.length == 0){
        label = "<td>Phone Numbers:</td>";
        phonenumberslist.push(label);
      }
      x = "<td>" + wordlistsymbols[i] + "</td>";
      phonenumberslist.push(x);
    }
    else if(wordlistsymbols[i].match(url)){
      if (urlslist.length == 0){
        label = "<td>URLs:</td>";
        urlslist.push(label);
      }
      x = "<td>" + wordlistsymbols[i] + "</td>";
      urlslist.push(x);
    }
    else if(wordlistsymbols[i].match(email)){
      if (emailslist.length == 0){
        label = "<td>E-Mails:</td>";
        emailslist.push(label);
      }
      x = "<td>" + wordlistsymbols[i] + "</td>";
      emailslist.push(x);
    }
    else if(wordlistsymbols[i].match(ipaddress)){
      if (ipaddresslist.length == 0){
        label = "<td>IP Addresses:</td>";
        ipaddresslist.push(label);
      }
      x = "<td>" + wordlistsymbols[i] + "</td>";
      ipaddresslist.push(x);
    }
    else if(wordlistsymbols[i].match(date)){
      if (dateslist.length == 0){
        label = "<td>Dates:</td>";
        dateslist.push(label);
      }
      var parts = wordlistsymbols[i].split("/");
      var day = parseInt(parts[1], 10);
      var month = parseInt(parts[0], 10);
      var year = parseInt(parts[2], 10);
      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)){  //determine leap year
        monthLength[1] = 29;
      }
      if (day > 0 && day <= monthLength[month - 1] && year > 0 && month > 0 && month <= 12){
        x = "<td>" + wordlistsymbols[i] + "</td>";
        dateslist.push(x);
      }
    }
    else if(wordlistsymbols[i].match(time)){
      if (timeslist.length == 0){
        label = "<td>Times:</td>";
        timeslist.push(label);
      }
      x = "<td>" + wordlistsymbols[i] + "</td>";
      timeslist.push(x);
    }
    else if(wordlistsymbols[i].match(currency)){
      if (currencylistslist.length == 0){
        label = "<td>Times:</td>";
        currencylist.push(label);
      }
      x = "<td>" + wordlistsymbols[i] + "</td>";
      currencylist.push(x);
    }
  }
  return [hashtagslist, mentionslist, phonenumberslist, urlslist, emailslist, ipaddresslist, dateslist, timeslist, currencylist];
}


function prepare(intext)
{
<!-- replace the carriage return with a blank space -->
intext = intext.replace(/\n/g," ");
return intext;
}

function removeBracket(intext)
{
  for (var i=0;i<intext.length;i++){
    str = intext[i];
    str = str.replace(/\]/g,'');
    str = str.replace(/\[/g,'');
    intext[i] = str
  }
  return intext;
}

function lower(intext)
{
return intext.toLowerCase();
}

function removesymbols(textclean)
{
<!-- all symbols become spaces to split words -->
textclean = textclean.replace(/\./g," ");
textclean = textclean.replace(/\,/g," ");
textclean = textclean.replace(/\"/g," ");
textclean = textclean.replace(/\'/g," ");
textclean = textclean.replace(/\+/g," ");
textclean = textclean.replace(/\(/g," ");
textclean = textclean.replace(/\)/g," ");
textclean = textclean.replace(/\//g," ");
textclean = textclean.replace(/\-/g," ");
textclean = textclean.replace(/\?/g," ");
textclean = textclean.replace(/\:/g," ");
return textclean;
}

function removenoise(textclean)
{
<!-- remove all noise words and replace by blank -->
textclean = textclean.replace(/ and /g," ");
textclean = textclean.replace(/ or /g," ");
textclean = textclean.replace(/ a /g," ");
textclean = textclean.replace(/ an /g," ");
textclean = textclean.replace(/ the /g," ");
textclean = textclean.replace(/ your /g," ");
textclean = textclean.replace(/ to /g," ");
textclean = textclean.replace(/ which /g," ");
textclean = textclean.replace(/ of /g," ");
textclean = textclean.replace(/ is /g," ");
textclean = textclean.replace(/ in /g," ");
textclean = textclean.replace(/ on /g," ");
return textclean;
}

function subcompound(textclean)
{
<!-- substitute compound concepts -->
textclean = textclean.replace(/ first aid /g," first_aid ");
return textclean;
}

function addSampleData()
{
  document.getElementById('myTextarea').value = 'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.' +
                     'Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. '+
                     'We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. '+
                     'But, in a larger sense, we can not dedicate -- we can not consecrate -- we can not hallow -- this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power '+
                     'to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work ' +
                     'which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that '+
                     'cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- '+
                     'and that government of the people, by the people, for the people, shall not perish from the earth.';

}

// Removes commas that were appearing in datalists
function removeCommas(output_with_commas){
  output_without_commas = output_with_commas.replace(/\,/g," ");
  return output_without_commas;
}

function displayDataLists(wordlistsymbols)
{
  /* DATA LISTS

       The following code will first check to ensure that the user has checked the box for data lists.
       A function getDataLists() in pycat.js is called to generate the different lists and they are placed in an array of lists called datalists.
       Lastly, the function createDataListDisplay() is called for each entry in the datalists array to display to the user.

    */

      var datalists = [];
      datalists = getDataLists(wordlistsymbols);

      console.log(datalists);
      output = "<table>";
  		for(i=0;i<datalists.length;i++){
  			if (datalists[i].length != 0) output += "<tr>" + datalists[i] + "</tr>";
  		}
      console.log(output);
  		output += "</table>";
      output = removeCommas(output);
  		document.getElementById("dlists").innerHTML = output;
}


// function for adding number of views
function countViews(weblog){
  var numviews = 0;
  numviews = (weblog.match(/GET/g) || []).length;
  return numviews;
}

//function that will return unique IP addresses in uniquevisitors[]. Duplicates will be excluded.
function getUniqueVisitors(weblog){
    visitors = getVisitorsWithDuplicates(weblog);
    var no_dups = [...new Set(visitors)];

    return no_dups.length
}


/*
    This function will return an array of every ip address including duplcicates
*/
function getVisitorsWithDuplicates(weblog){
    let visitors = [];
    for (var i = 0;i<weblog.length;i++){
      let split_entry = weblog[i].split(" ");
      visitors.push(split_entry[0])
    }
    return visitors;
}

/*
   The function pageAccessCount() will use the same code that counts words in the keywords program to sort by view count
*/
function pageAccessCount(weblog){
  pages = getPages(weblog);
  pages.sort();
  var count = 1;
  var old = "";
  var sorted_pages = [];
  for (var i=0;i<pages.length;i++) {
    if (pages[i].length>0) {
      if (pages[i] != old) {
        if ((old.length>0)
          && (old.charCodeAt(0) != 13)
          && (old != "")) {
            sorted_pages.push(count.toString()+" "+old);
        }
        count = 1;
      }
      else {
        count = count + 1;
      }
      old = pages[i];

    }
    else {
    }
    if (i == pages.length - 1){
      sorted_pages.push(count.toString()+" "+old);
    }
  }
  sorted_pages.sort(customSort);
  sorted_pages.reverse();
  return sorted_pages;
}

/*
   The function getPages() will return a list of all web addresses that were accessed, including Duplicates
   Takes a weblog that has been split at the spaces as a parameter
*/
function getPages(weblog){
  pages = [];
  for (let i = 0; i<weblog.length;i++){
    let split_entry = weblog[i].split(" ");
    if(split_entry[5] == "\"GET" && split_entry.length >= 11){
      if (split_entry[10] != "\"-\""){
        pages.push(split_entry[10].replace(/['"]+/g, ''));
      }
      else{
        pages.push(split_entry[6]);
      }
    }
  }
  return pages;
}

function getFiles(weblog){
  files = [];
  for (let i = 0; i<weblog.length;i++){
    let split_entry = weblog[i].split(" ");
    if(split_entry[5] == "\"GET" && split_entry.length >= 11){
        files.push(split_entry[6]);
    }
  }
  return files;
}

/*
  Uses previous functions getPages() and countVisits() to find the average pages per visit
*/

function averagePagePerVisit(weblog){
  pageCount = getPages(weblog);
  visits = countVisits(weblog);
  average = pages.length/visits;
  return average.toFixed(2);
}

/* maximumPagesPerVisit() will return the max number of pages that were visited in a single visit.
    Uses the same process as countVisits()

    Iyanna - come back to this once you've added function to scan the page and grab all the IP addresses and timestamps
*/

function maximumPagesPerVisit(weblog){
  weblog.sort();
  var pages = 0;
  var maxpages = 0;
  var ip = "";
  var oldip = "";
  var new_timestamp = "";
  var old_timestamp = "";
  var timestamp_difference = 0;
  var minutes = 0;
  var date = "";
  var time = "";

  for (var i = 0; i<weblog.length;i++){
    line = weblog[i].split(" ");
    ip = line[0];
    if (ip == oldip && line.length >= 4){
      pages++;
      new_timestamp = line[3];
      new_timestamp = new_timestamp.substring(1);
      date = new_timestamp.substring(0, 11);
      time = new_timestamp.substring(12, 20);
      new_timestamp = new Date(date + " " + time);
      timestamp_difference = old_timestamp - new_timestamp;
      minutes = Math.floor(timestamp_difference / 60) % 60;
      if (minutes > 30){
        pages = 1;
      }
    }
    else {
      pages = 1;
    }
    oldip = ip;
    old_timestamp = new_timestamp

    if (pages > maxpages){
      maxpages = pages;
    }
  }
  return maxpages;
}

/* The function countVisits() will count the number of times that either a new ipaddress accesses the site or
   a past visitor return after a length of over 30 minutes.
   */

function countVisits(weblog){
    weblog.sort();
    var visits = 0;
    var ip = "";
    var oldip = "";
    var new_timestamp = "";
    var old_timestamp = "";
    var timestamp_difference = 0;
    var minutes = 0;
    var date = "";
    var time = "";

    /* for loop explanation

        the following code will loop through every entry in the sorted web access log. Each entry will be split by spaces.
        The ipaddress will be extracted. If the ip has changed then the visit count will be raised on one. If it is the
        same then we must compare the timestamps. The timestamp is extracted and it must be reformatted to perform
        timestamp subtraction. If the amount of minutes is greater than 30, the visit count is increased by 1.
    */

    for (var i = 0; i<weblog.length;i++){
      line = weblog[i].split(" ");
      ip = line[0];
      if (ip == oldip && line.length >= 4){
        new_timestamp = line[3];
        new_timestamp = new_timestamp.substring(1);
        date = new_timestamp.substring(0, 11);
        time = new_timestamp.substring(12, 20);
        new_timestamp = new Date(date + " " + time);
        timestamp_difference = old_timestamp - new_timestamp;
        minutes = Math.floor(timestamp_difference / 60) % 60;
        if (minutes > 30){
          visits = visits + 1;
        }
      }
      else {
        visits = visits + 1;
      }
      oldip = ip;
      old_timestamp = new_timestamp
    }
    return visits;
}

function getUniquePageErrorlog(weblog){
  var website_arr = getPages(weblog);
  var no_duplicates = [...new Set(website_arr)];
  output = "<table><tr><td>" + "Number of unique page errors: " + "</td><td>" + no_duplicates.length + "</td>";
  document.getElementById("unique_pages").innerHTML = output;
}


//changed to fit new standards of the program. Now uses getPages function. -Matt

function getUniquePageViews(weblog)
{

  let website_arr = getPages(weblog);
  console.log(website_arr);
 /*;
 * i split the data up by double commas in order to get the website.
 * the website of each request starts in the third position of the array,
 * and then every 6 spots afterwards, hence the i = 3 and i = i +6
 */


  let no_duplicates = [...new Set(website_arr)]; //technique to get rid of duplicates in an array
  //alert(no_duplicates);
  return no_duplicates.length;
}

var customSort = function (a, b) {
  return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])));
}

var customIPSort = function (a, b) {
  splita = a.split(" ");
  splitb = b.split(" ");
  ipa = splita[0];
  ipb = splitb[0];
  const num1 = Number(ipa.split(".").map((num) => (`000${num}`).slice(-3) ).join(""));
  const num2 = Number(ipb.split(".").map((num) => (`000${num}`).slice(-3) ).join(""));
  return num1 - num2;
}

function getBounce(weblog){
  num_visits = countVisits(weblog);
  weblog.sort();
  var ip = "";
  var oldip = "";
  var count = 0;
  var one_visit_count = 0;

  for (var i = 0;i<weblog.length;i++){
    line = weblog[i].split(" ");
    ip = line[0];
    if (ip != oldip && count == 1){
      one_visit_count = one_visit_count + 1;
      count = 0;
    }
    else if(ip != oldip){
      count = 0;
    }
    oldip = ip;
    count = count + 1;
  }
  console.log(one_visit_count);
  console.log(num_visits);
  return one_visit_count/num_visits;
}

function getTotalTagsWithoutEnd(parsed_html){
  let tagList = getListOfTags(parsed_html);
  var tag = /^\//;
  let x = [];
  let tagsMissingEnd = [];
  for (let i = 0;i<tagList.length;i++){
    if(tagList[i].match(tag)){
      let start_tag = x.pop();
      let end_tag = tagList[i].substring(1);
      while (start_tag != end_tag && x.length != 0){
        tagsMissingEnd.push(start_tag);
        start_tag = x.pop();
      }
    }
    else {
      x.push(tagList[i]);
    }
  }
  return tagsMissingEnd.length;
}

function getListOfTags(parsed_html){
  x = [];
  for (let i = 0;i<parsed_html.length;i++){
    let subs = parsed_html[i].substring(0, parsed_html[i].indexOf('>'));
    let subss = subs.split(" ");
    subss = subss[0];
    x.push(subss);
  }
  return x;
}

function getImportantTags(parsed_html, important_tags){
  let tagList = getListOfTags(parsed_html);
  let x = 0;
  for (let i = 0;i< tagList.length; i++){
    if (important_tags.includes(tagList[i])){
      x++;
    }
  }
  return x;
}

function getStartsAndEnds(parsed_html){
  let tagList = getListOfTags(parsed_html);
  var tag = /^\//;
  let x = [0, 0];
  for (let i = 0;i< tagList.length; i++){
    if (tagList[i].match(tag)){
      x[1]++;
    }
    else{
      x[0]++;
    }
  }
  console.log(x);
  return x;
}

//this function will retrieve all of the edge lists from the graph and return those vertexes that have more than one uique edge

function getDecisionPoints(graph){
  let decisionpoints = [];
  let keys = graph.adjacentList.keys();
  for (let i of keys){
    let values = graph.adjacentList.get(i);
    if (values.length >= 2){
      decisionpoints.push(i);
    }
  }

  return decisionpoints;
}


/*
  this is a helper function that gets the IP address and timestamp of each visit, and
  organizes it into an object structure
  it looks like this:
  ip_array = {"111.11.1111: [12:30, 1:20, 4:20], "222.22.2222: [12:15, 2:30, 3:12]}  ETC"
*/

function get_timestamps(weblog)
{
  var ip_catalog = {}
  for (let i = 0; i < weblog.length; i++)
  {
    let split_entry = weblog[i].split(" ");
    var ip_addr = split_entry[0];
    var timestamp = split_entry[3];

    if (ip_addr in ip_catalog)
    {
      ip_catalog[ip_addr].push(timestamp);
    }
    else
    {
      ip_catalog[ip_addr] = [timestamp];
    }
  }

  document.write(ip_catalog);
}

function getCommonPaths(graph){
  let commonpaths = [];
  let keys = graph.adjacentList.keys();
  for (let i of keys){
    let values = graph.adjacentList.get(i);
    values.sort();
    let count = 1;
    let newplace = "";
    let oldplace = "";
    for(let j = 0; j<values.length;j++){
      newplace = values[j];
      if (oldplace != newplace){
        if (count >= 2){
          commonpaths.push(count.toString() + " " + i + " " + "-->" + " " + oldplace);
        }
        oldplace=newplace
        count = 1;
      }
      else{
        count++;
        oldplace = newplace;
      }
    }
  }
  commonpaths.sort(customSort);
  commonpaths.reverse();
  return commonpaths;
}
/*
  DISPLAY FUNCTIONS BELOW HERE
  ||||||||||||||||||||||||||||
  vvvvvvvvvvvvvvvvvvvvvvvvvvvv
*/

function displayCommonPaths(commonpaths){
  conceptlist = "Common Paths \n <table>";
  for(i=0;i<commonpaths.length;i++){
    printable = commonpaths[i].split(" ");
    console.log(printable);
    conceptlist += "<tr><td>"
          +printable[0]
          +"</td><td>"
          +printable[1]
          +"</td><td>"
          +printable[2]
          +"</td><td>"
          +printable[3]
          +"</td><td>";
  }
  conceptlist += "</table>";
  document.getElementById("commonPathsDisplay").innerHTML = conceptlist;
}

function displayEndingPoints(endingpoints){
  let sorted = endingpoints.sort();
  console.log(sorted);
  let sorted_points = [];
  let newpage = "";
  let oldpage = "";
  let count = 1;
  for (let i = 0; i < sorted.length; i++){
    newpage = sorted[i];
    if (newpage == oldpage){
      count = count + 1;
    }
    else {
      if (oldpage != ""){
        sorted_points.push(count.toString() + " " + oldpage);
        count = 1;
      }
    }
    if (i + 1 == sorted.length){
        sorted_points.push(count.toString() + " " + newpage);
    }
    oldpage = newpage;
  }
  sorted_points.sort(customSort);
  sorted_points.reverse();

  conceptlist = "Ending Points \n <table>";
  for(i=0;i<sorted_points.length;i++){
    printable = sorted_points[i].split(" ");
    conceptlist += "<tr><td>"
          +printable[0]
          +"</td><td>"
          +printable[1]
          +"</td><td>";
  }
  conceptlist += "</table>";
  document.getElementById("endingPointsDisplay").innerHTML = conceptlist;
}


function displayStartingPoints(startingPoints){
  let sorted = startingPoints.sort();
  let sorted_points = [];
  let newpage = "";
  let oldpage = "";
  let count = 1;
  for (let i = 0; i < sorted.length; i++){
    newpage = sorted[i];
    if (newpage == oldpage){
      count = count + 1;
    }
    else {
      if (oldpage != ""){
        sorted_points.push(count.toString() + " " + oldpage);
        count = 1;
      }
    }
    if (i + 1 == sorted.length && count > 1){
        sorted_points.push(count.toString() + " " + oldpage);
    }
    oldpage = newpage;
  }
  sorted_points.sort(customSort);
  sorted_points.reverse();

  conceptlist = "Starting Points \n <table>";
  for(i=0;i<sorted_points.length;i++){
    printable = sorted_points[i].split(" ");
    conceptlist += "<tr><td>"
          +printable[0]
          +"</td><td>"
          +printable[1]
          +"</td><td>";
  }
  conceptlist += "</table>";
  document.getElementById("startingPointsDisplay").innerHTML = conceptlist;
}

function displayDecisionPoints(decisionPoints){
  conceptlist = "Decision Points \n <table>";
  for(let i=0;i<decisionPoints.length;i++){
    printable = decisionPoints[i];
    conceptlist += "<tr><td>"
          +printable
          +"</td><td>"
  }
  conceptlist += "</table>";
  document.getElementById("decisionPointsDisplay").innerHTML = conceptlist;
}

function displayPageAccessCount(sorted_pages){
  conceptlist = "<table>";
  for(i=0;i<sorted_pages.length;i++){
    printable = sorted_pages[i].split(" ");
    conceptlist += "<tr><td>"
          +printable[0]
          +"</td><td>"
          +printable[1]
          +"</td><td>";
  }
  conceptlist += "</table>";
  document.getElementById("page_access_count").innerHTML = conceptlist;
}

/*
  display functions have been refactored to one function, displayStats.
  params:
  tag - the html tag that holds the string (parameter that gets passed in needs to be in quotes)
  printed text - the text you want to display (also passed in as quotes)
  result - calculation that you want to display
*/
function displayStats(tag, printedText, result)
{
  output = "<table><tr><td>" + printedText + "</td><td>" + result + "</td>";
  document.getElementById(tag).innerHTML = output;
}

function displayCoref(sorted){
  output = "<table>"
  for (i=0;i<sorted.length;i++) {
    printable = sorted[i].split(" ");
    output += "<tr><td>"+printable[0]+"</td><td>"+printable[1]+" "+printable[2]+"</td></tr>";
  }
  output +="</table>"
  document.getElementById("corefDisplay").innerHTML = output;
}
