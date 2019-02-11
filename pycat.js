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
  if (textcleanremoved.length == 0){
    return textclean;
  }
  console.log(textclean);
  for(var i = 0; i < textcleanremoved.length; i++){
    var replace = textcleanremoved[i];
    var re = new RegExp(replace, "g");
    textclean = textclean.replace(re, "");
    console.log(textclean);
  }
  return textclean;
}

/* getDataLists()

   The following function is repsonisble for returning an array of lists consisting of strings that meet certain criteria (being a phone number, url, etc).
   The function relies heavily on regular expressions to determine if a given string belongs in any of the lists.
   A for loop will go through every single entry in wordlistsymbols resulting in an O(n) runtime.

*/

function getDataLists(wordlistsymbols){
  var hashtagslist = [];
  var mentionslist = [];
  var phonenumberslist = [];
  var urlslist = [];
  var emailslist = [];
  var ipaddresslist = [];
  var dateslist = [];
  var timeslist = [];
  var currencylist = [];
  for (i=0;i<wordlistsymbols.length;i++) {
    var phonenumber = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;
    var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var ipaddress = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var date = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    var time = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
    var currency = /^\$?[0-9]+(\.[0-9][0-9])?$/;
    if(wordlistsymbols[i].charAt(0) == '#'){
      hashtagslist.push(wordlistsymbols[i]);
    }
    else if(wordlistsymbols[i].charAt(0) == '@'){
      mentionslist.push(wordlistsymbols[i]);
    }
    else if(wordlistsymbols[i].match(phonenumber)){
      phonenumberslist.push(wordlistsymbols[i]);
    }
    else if(wordlistsymbols[i].match(url)){
      urlslist.push(wordlistsymbols[i]);
    }
    else if(wordlistsymbols[i].match(email)){
      emailslist.push(wordlistsymbols[i]);
    }
    else if(wordlistsymbols[i].match(ipaddress)){
      ipaddresslist.push(wordlistsymbols[i]);
    }
    else if(wordlistsymbols[i].match(date)){
      var parts = wordlistsymbols[i].split("/");
      var day = parseInt(parts[1], 10);
      var month = parseInt(parts[0], 10);
      var year = parseInt(parts[2], 10);
      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)){  //determine leap year
        monthLength[1] = 29;
      }
      if (day > 0 && day <= monthLength[month - 1] && year > 0 && month > 0 && month <= 12){
        dateslist.push(wordlistsymbols[i]);
      }
    }
    else if(wordlistsymbols[i].match(time)){
      timeslist.push(wordlistsymbols[i]);
    }
    else if(wordlistsymbols[i].match(currency)){
      currencylist.push(wordlistsymbols[i]);
    }
  }
  return [hashtagslist, mentionslist, phonenumberslist, urlslist, emailslist, ipaddresslist, dateslist, timeslist, currencylist];
}

function createDataListDisplay(list, head){
  for(i=0;i<list.length;i++){
    head += list[i] + ", ";
  }
  if(list.length == 0){
    head += "None";
  }
  return head;
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
