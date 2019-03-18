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

function removeCommonAdjectives(textclean)
{
  textclean = removeWords(textclean, adj_words);
  return textclean;
}

function removeCommonAdverbs(textclean)
{
  textclean = removeWords(textclean, adv_words);
  return textclean;
}

function removeCommonVerbs(textclean)
{
  textclean = removeWords(textclean, verb_words);
  return textclean;
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
    visitors.sort();
    uniquevisitors = [];
    var old = "";
    var count = 0;
    for (var i = 0;i<visitors.length;i++){
      if (visitors[i]) {
        if (visitors[i] != old) {
          if ((old.length>0)
            && (old.charCodeAt(0) != 13)
            && (old != "")) {
              uniquevisitors.push(old);
          }
          count = 1;
        }
        else {
          count = count + 1;
        }
        old = visitors[i];

      }
      else {
      }
      if (i == visitors.length - 1){
        uniquevisitors.push(visitors[i]);
      }
    }
    return uniquevisitors;
}


/*
    This function will return an array of every ip address including duplcicates
*/
function getVisitorsWithDuplicates(weblog){
    var ipaddress = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var visitors = [];
    for (var i = 0;i<weblog.length;i++){
      if (weblog[i].match(ipaddress)){
        visitors.push(weblog[i])
      }
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
    if (count == 1 && i == pages.length - 1){
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
  var url = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  pages = [];
  for (var i = 0; i<weblog.length;i++){
    if(weblog[i].match(url)){
      pages.push(weblog[i]);
    }
  }
  return pages;
}

/*
  Uses previous functions getPages() and countVisits() to find the average pages per visit
*/

function averagePagePerVisit(weblog, visit_text){
  pageCount = getPages(weblog);
  visits = countVisits(visit_text);
  average = pages.length/visits;
  return average;
}

/* maximumPagesPerVisit() will return the max number of pages that were visited in a single visit.
    Uses the same process as countVisits()
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
    if (ip == oldip){
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
      if (ip == oldip){
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

function getUniquePageViews(weblog)
{

  var lines = weblog.split(/"(.*?)"/);
  var i;
  var website_arr = [];

 /*
 * i split the data up by double commas in order to get the website.
 * the website of each request starts in the third position of the array,
 * and then every 6 spots afterwards, hence the i = 3 and i = i +6
 */
  for(i =3; i < lines.length ; i = i + 6)
  {
    website_arr.push(lines[i]);
  }

  var no_duplicates = [...new Set(website_arr)]; //technique to get rid of duplicates in an array
  output = "<table><tr><td>" + "Number of unique pages viewed: " + "</td><td>" + no_duplicates.length + "</td>";
  document.getElementById("unique_pages").innerHTML = output;
}

var customSort = function (a, b) {
  return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])));

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
  return tagsMissingEnd;
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

/*
  DISPLAY FUNCTIONS BELOW HERE
  ||||||||||||||||||||||||||||
  vvvvvvvvvvvvvvvvvvvvvvvvvvvv
*/

function displayStartsAndEnds(startsAndEnds){
  output = "<table><tr><td>" + "Total number of starts: " + "</td><td>" + startsAndEnds[0] + "</td>";
  output = output + "<table><tr><td>" + "Total number of ends: " + "</td><td>" + startsAndEnds[1] + "</td>";
  document.getElementById("startsAndEndsDisplay").innerHTML = output;
}

function displayTotalTagsWithoutEnd(tagsWithoutEnd){
  output = "<table><tr><td>" + "Tags without ends: " + "</td><td>" + tagsWithoutEnd + "</td>";
  document.getElementById("tagsWithoutEndDisplay").innerHTML = output;
}

function displayTotalTags(totalTags){
  output = "<table><tr><td>" + "Total number of tags: " + "</td><td>" + totalTags + "</td>";
  document.getElementById("totalTagsDisplay").innerHTML = output;
}
// function for displaying number of views once user hits the Numver of Views button
function displayViews(numviews){
  output = "<table><tr><td>" + "Total number of views: " + "</td><td>" + numviews + "</td>";
  document.getElementById("numViews").innerHTML = output;
}

function displayErrors(numErrors){
  output = "<table><tr><td>" + "Total number of errors: " + "</td><td>" + numErrors + "</td>";
  document.getElementById("numErrors").innerHTML = output;
}

function displayUniqueVisitorCount(uniquevisitors){
  output = "<table><tr><td>" + "Number of unique vistors: " + "</td><td>" + uniquevisitors.length + "</td>";
  document.getElementById("unique_visitor_count").innerHTML = output;
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

function displayAveragePagePerVisit(average){
  average = average.toFixed(4);
  output = "<table><tr><td>" + "Average number of pages per visit: " + "</td><td>" + average + "</td>";
  document.getElementById("average_pages_per_visit").innerHTML = output;
}

function displayMaximumPagesPerVisit(max){
  output = "<table><tr><td>" + "Maxmimum Pages Per Visit: " + "</td><td>" + max + "</td>";
  document.getElementById("maximum_pages_per_visit").innerHTML = output;
}

function displayVisits(visit_count){
  output = "<table><tr><td>" + "Visit Count: " + "</td><td>" + visit_count + "</td>";
  document.getElementById("count_visits").innerHTML = output;
}

function displayBounce(bounce_rate){
  output = "<table><tr><td>" + "Bounce Rate: " + "</td><td>" + bounce_rate + "</td>";
  document.getElementById("count_visits").innerHTML = output;
}
