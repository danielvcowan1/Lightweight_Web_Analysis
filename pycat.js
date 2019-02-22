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
function countUniqueVisitors(weblog){
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
  sorted_pages.sort();
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
  Uses previous functions getPages() and countUniqueVisitors() to find the average pages per visit
*/

function averagePagePerVisit(weblog){
  pages = getPages(weblog);
  uniquevisitors = countUniqueVisitors(weblog);
  average = pages.length/uniquevisitors.length;
  return average;
}

/////////////////////////////////////////////////////////////////////
///////     DISPLAY FUNCTIONS BELOW   //////////////////////////////
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv//


// function for displaying number of views once user hits the Numver of Views button
function displayViews(numviews){
  output = "<table><tr><td>" + "Total number of views: " + "</td><td>" + numviews + "</td>";
  document.getElementById("numViews").innerHTML = output;
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
