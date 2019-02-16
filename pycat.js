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
  for(var i = 0; i < textcleanremoved.length; i++){
    var replace = textcleanremoved[i];
    var re = new RegExp(replace, "g");
    textclean = textclean.replace(re, "");
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
    var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
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

}
