// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */


/**
 * Adds a random greeting to the page.
 */






async function getData() {
  console.log('Getting Data');
  const response = await fetch('/data');
  const data = await response.text();
  console.log(data)
  document.getElementById('data-container').innerText = data;
}


function add_info() {
	fetch('/logins').then(response => response.text()).then((txt) => {
     var form = document.getElementById("addcomm");
    if (txt.includes("Please")) {
      form.style.display = "none";
      document.getElementById("error").innerHTML = "<i>" + txt + "</i>";
    } else{
      document.getElementById("error").innerHTML = "<i>" + txt + "</i>";
    }});
}

function login() {
  fetch('/logins').then((response) => {
     const loginElement = document.getElementById('loginel');
     console.log(response)
     loginElement.innerHTML = response;
  });
}

function getMessages() {
  document.getElementById('entry-list').innerHTML = "";
  fetch('/data?maxcomments=' + commentCount.value).then(response => response.json()).then((entries) => {
    const entryListElement = document.getElementById('entry-list');
    entries.forEach((entry) => {
      console.log(entry.title)
      entryListElement.appendChild(createEntryElement(entry));
    })
  });
}

function sortComments() {
  document.getElementById('entry-list').innerHTML = "";
  fetch('/data?sort=' + sort.value).then(response => response.json()).then((entries) => {
    const entryListElement = document.getElementById('entry-list');
    entries.forEach((entry) => {
      console.log(entry.title)
      entryListElement.appendChild(createEntryElement(entry));
    })
  });
}

function updateCount() {
  location.replace("Profile.html")
}

function createEntryElement(entry) {
  const entryElement = document.createElement('li');
  entryElement.className = 'entry collection-item';

  const nameElement = document.createElement('span');
  if (entry.name === undefined || entry.name === "") {
    nameElement.innerHTML = "-- Anonymous".italics().bold();
  } else {
    nameElement.innerHTML = ("--" + entry.name).italics().bold();
  }
  nameElement.style.marginLeft = "15px"

  const emailElement = document.createElement('span');
  emailElement.innerHTML = "(" + entry.email + ")";
  

  const ageElement = document.createElement('span');
  ageElement.innerText = entry.age;


  const majorElement = document.createElement('span');
  majorElement.innerText = entry.major.toString();

  const genderElement = document.createElement('span');
  genderElement.innerText = entry.gender.toString();

  const incomeElement = document.createElement('span');
  incomeElement.innerText = entry.income.toString();

  const raceElement = document.createElement('span');
  raceElement.innerText = entry.race.toString();

  const timeElement = document.createElement('span');
  var date = new Date(entry.timestamp);
  timeElement.innerText = date.toString().slice(0,24);
  timeElement.style.float = "right";
  timeElement.style.marginRight = "10px";

  var deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.style.float = "right";
  deleteButtonElement.addEventListener('click', () => {
    deleteEntry(entry);

    // Remove the entry from the DOM.
    entryElement.remove();
  });


  entryElement.appendChild(nameElement);
  entryElement.appendChild(emailElement);
  entryElement.appendChild(ageElement);
  entryElement.appendChild(majorElement);
  entryElement.appendChild(incomeElement);
  entryElement.appendChild(raceElement);
  entryElement.appendChild(genderElement);
  entryElement.appendChild(deleteButtonElement);
  entryElement.appendChild(timeElement);
  return entryElement;
}

function deleteEntry(entry) {
  const params = new URLSearchParams();
  params.append('id', entry.id);
  fetch('/delete', {method: 'POST', body: params});
}

// create function for user info

function getUserInfo(){
    fetch("/current-user").then(response => response.json()).then((email) => {
        if(email=="none"){
            const divElement=document.createElement('div');
                const titleElement=document.createElement("h2");
                titleElement.innerText="Please Sign In and Fill Out Form on Home Page";
                divElement.appendChild(titleElement);
                const entryListElement = document.getElementById('entry-list');
                entryListElement.appendChild(divElement);
        }
        else{
            fetch('/data').then(response => response.json()).then((entries) => {
            entries.forEach((entry) => {
                if(entry.email==email){
                    const entryListElement = document.getElementById('entry-list');
                    console.log(entry.title)
                    entryListElement.appendChild(createEntryElement(entry));
                    console.log(entry.email);
                    console.log(email);
            
                    
                }

    })
  });

        }

         });

}


function loadPage() {
	add_info();
}


function loadInfo() {
    getUserInfo();
}




/* scholarships functions*/
// Client ID and API key from the Developer Console
      var CLIENT_ID = '376440599760-5dpjdtasspucoc2petrcgct7uslso8nb.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyAedVIc7Rqof96Rwz4kg9G8hybDOYm_578';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');

      var date;
      var calendarTitle;
      var userEmail;



function getUserScholarships(){
    fetch("current-user").then(response => response.json()).then((email) => {
        console.log(email);
        document.getElementById('')
        if(email=="none"){
            const divElement=document.createElement('div');
                const titleElement=document.createElement("h2");
                titleElement.innerText="Please Sign In and Fill Out Form on Home Page";
                divElement.appendChild(titleElement);
                const scholarshipList = document.getElementById('scholarship-list');
                scholarshipList.appendChild(divElement);
        }
        else{
            fetch('/data').then(response => response.json()).then((entries) => {
            entries.forEach((entry) => {
                if(entry.email==email){
                    getScholarships(entry.race,entry.gender,entry.major,entry.income,"none","none");  
                }
                else{
                    console.log(entry.email);
                    console.log(email);
                const divElement=document.createElement('div');
                const titleElement=document.createElement("h2");
                titleElement.innerText="Please Fill Out Form on Home Page";
                divElement.appendChild(titleElement);
                const scholarshipList = document.getElementById('scholarship-list');
                scholarshipList.appendChild(divElement);
                }

    })
  });

        }

         });

}
function getScholarships(race,gender,major,income,grade,state) {
    fetch("current-user").then(response => response.json()).then((email) => {
        userEmail=email;
        console.log(userEmail);
    });
   fetch("/list-scholarships").then(response => response.json()).then((response) => {
       var scholarships=[];
       if(response.length==0){
                const divElement=document.createElement('div');
                const titleElement=document.createElement("h2");
                titleElement.innerText="No Scholarships Currently Available";
                divElement.appendChild(titleElement);
                const scholarshipList = document.getElementById('scholarship-list');
                scholarshipList.appendChild(divElement);
            }
            else{   
            for(let i=0;i<response.length;i++){
                if(race=="none" || response[i][4].includes(race)||response[i][4]=="none"){
                    if(gender=="none"||response[i][5].includes(gender)||response[i][5]=="none"){
                        if(major=="none"||response[i][7].includes(major)||response[i][7]=="none"){
                            if(income=='none'||response[i][6].includes(income)||response[i][6]=="none"){
                                if(grade=='none'||response[i][8].includes(grade)||response[i][8]=="none"){
                                    if(state=='none'||response[i][10].includes(state)||response[i][10]=="none"){

                                    scholarships.push(response[i]);
                                    console.log(response[i]);
                                    }
                                }   
                            }  
                        }
                    } 
                } 
            }
            if(scholarships.length==0){
                const divElement=document.createElement('div');
                const titleElement=document.createElement("h2");
                titleElement.style.textAlign="center";
                titleElement.innerText="No Scholarships Currently Available";
                divElement.appendChild(titleElement);
                const scholarshipList = document.getElementById('scholarship-list');
                scholarshipList.appendChild(divElement);
            }
            else{
                const pageList=document.getElementById('page-number');
                var pagenum=1;
                if(scholarships.length%5==0){
                    for(let k=0; k<Math.floor(scholarships.length/5);k++){
                    const pageButton=document.createElement("button");
                    pageButton.innerText=pagenum.toString();
                    pageList.appendChild(pageButton);
                    pageButton.onclick=createScholarships(scholarships,pagenum);
                    if(pagenum===1){
                       pageButton.click();
                     }
                    pagenum++;
                }
                }
                else{
                    for(let k=0; k<Math.floor(scholarships.length/5)+1;k++){
                        const pageButton=document.createElement("button");
                        pageButton.innerText=pagenum.toString();
                        pageList.appendChild(pageButton);
                        pageButton.onclick=createScholarships(scholarships,pagenum);

                        if(pagenum===1){
                            pageButton.click();
                        }
                        pagenum++;
                    }
                    }    
           }
            }
        });
        }
        
          function createScholarships(scholarships,pagenum){
            return function(){
                 const scholarshipList = document.getElementById('scholarship-list');
                scholarshipList.innerHTML="";
                for(let i=pagenum*5-5;i<5*pagenum;i++){
                scholarshipList.appendChild(createScholarshipElement(scholarships[i]));
                }
            }
        }

        /** Creates a list element to display the comment */
        function createScholarshipElement(scholarship) {
            const containerElement=document.createElement('div');
            containerElement.setAttribute('class','container');
            const divElement = document.createElement('div');
            divElement.setAttribute('class','regular');

            
            const calendarElement=document.createElement("h4");
            calendarElement.innerText=scholarship[2];
            calendarElement.style.display="none";
            divElement.appendChild(calendarElement);

            const titleElement =document.createElement("h4");
            titleElement.innerText=scholarship[0];
            titleElement.style.display="none";
            divElement.appendChild(titleElement);

            const circleElement= document.createElement('div');
            circleElement.setAttribute('class','circle');
            containerElement.appendChild(circleElement);
            circleElement.onclick = function() { // Note this is a function
            
            const formElement=document.createElement('div');
            formElement.setAttribute('class','form-popup');
            formElement.setAttribute('id','form-popup'+scholarship[0]);
            formElement.style.display="block";

            const title=document.createElement('h3');
            title.innerText="Add?";
            formElement.appendChild(title);

            const message=document.createElement('p');
            message.innerText="Click to add Scholarship to To-Do List /Calendar";
            formElement.appendChild(message);

            const yesButton=document.createElement('button');
            yesButton.innerText='Add Scholarship';
            formElement.appendChild(yesButton);
            yesButton.onclick=function(){
                console.log(calendarElement.innerText);
                date=calendarElement.innerText;
                calendarTitle=titleElement.innerText;
                console.log(date);
                console.log(calendarTitle);
                accessCalendar();
                document.getElementById('form-popup'+scholarship[0]).remove();
                const checkMark=document.createElement('span');
                checkMark.innerHTML='&#x2714;';
                circleElement.appendChild(checkMark);
            };

            const closeButton=document.createElement('button');
            closeButton.innerText='Close';
            formElement.appendChild(closeButton);
            closeButton.onclick=function(){
                document.getElementById('form-popup'+scholarship[0]).remove();
                console.log("close button");
            };
           

            containerElement.appendChild(formElement);
            };
            

            var urlElement=document.createElement('a');
            var linkText=document.createTextNode(scholarship[0]);
            urlElement.appendChild(linkText);
            
            var titleContainer=document.createElement("div");
            titleContainer.setAttribute('class','scholarship-title');
            urlElement.title=scholarship[0];
            urlElement.setAttribute('href', scholarship[3]);
            urlElement.setAttribute('target', '_blank');
            titleContainer.appendChild(urlElement);
            containerElement.appendChild(titleContainer);

            if(userEmail==scholarship[11]){
                //create form if user chooses to edit their scholarship entry
                var editButton=document.createElement("button");
                editButton.innerText="Edit";
                titleContainer.appendChild(editButton);


                editButton.onclick=function(){
                    if(editButton.innerText=="Edit"){
                        editButton.innerText="Close";

                    
                    urlElement.style.display="none";
                    deadlineContainer.style.display="none";
                    amountContainer.style.display="none";
                    moreDetails.style.display="none";
                
                    formElement2=document.createElement("form");
                    formElement2.action="/edit-scholarship";
                    formElement2.method="POST";
                    formElement2.setAttribute('id','form-element-2'+scholarship[0]);
                    


                    var newTitle=document.createElement("h4");
                    newTitle.innerText='Title: ';
                    formElement2.appendChild(newTitle);

                    var newTitleInput=document.createElement("input");
                    newTitleInput.value=scholarship[0];
                    newTitleInput.name="new-title";
                    formElement2.appendChild(newTitleInput);

                    var newUrl=document.createElement("h4");
                    newUrl.innerText='Url: ';
                    formElement2.appendChild(newUrl);

                    var newUrlInput=document.createElement("input");
                    newUrlInput.type="url";
                    console.log(scholarship[3]);
                    newUrlInput.value=new URL(scholarship[3]);
                    newUrlInput.name="new-url";
                    formElement2.appendChild(newUrlInput);

                    var newDeadline=document.createElement("h4");
                    newDeadline.innerText='Deadline: ';
                    formElement2.appendChild(newDeadline);

                    var newDeadlineInput=document.createElement("input");
                    newDeadlineInput.type="date";
                    newDeadlineInput.value=scholarship[2];
                    newDeadlineInput.name="new-deadline"
                    formElement2.appendChild(newDeadlineInput);

                    var newAmount=document.createElement("h4");
                    newAmount.innerText='Amount: ';
                    formElement2.appendChild(newAmount);

                    var newAmountInput=document.createElement("input");
                    newAmountInput.type="number";
                    console.log(scholarship[9]);
                    newAmountInput.value=Number(scholarship[9]);
                    console.log(newAmountInput.value);
                    newAmountInput.name="new-amount";
                    formElement2.appendChild(newAmountInput);

                    var scholarshipId=document.createElement("input");
                    scholarshipId.value=scholarship[12];
                    scholarshipId.style.display="none";
                    scholarshipId.name="new-id";
                    formElement2.appendChild(scholarshipId);  

                    var newDescription=document.createElement("h4");
                    newDescription.innerText='Description: ';
                    formElement2.appendChild(newDescription);

                    var newDescriptionInput=document.createElement("input");
                    newDescriptionInput.value=scholarship[1];
                    newDescriptionInput.name="new-description";
                    formElement2.appendChild(newDescriptionInput) ;

                    var newRaceInput=document.createElement("input");
                    newRaceInput.value=scholarship[4];
                    newRaceInput.style.display="none";
                    newRaceInput.name="new-race";
                    formElement2.appendChild(newRaceInput) ;

                    var newGenderInput=document.createElement("input");
                    newGenderInput.value=scholarship[5];
                    newGenderInput.name="new-gender";
                    newGenderInput.style.display="none";
                    formElement2.appendChild(newGenderInput) ;

                    var newIncomeInput=document.createElement("input");
                    newIncomeInput.value=scholarship[6];
                    newIncomeInput.name="new-income";
                    newIncomeInput.style.display="none";
                    formElement2.appendChild(newIncomeInput) ;

                    var newMajorInput=document.createElement("input");
                    newMajorInput.value=scholarship[7];
                    newMajorInput.name="new-major";
                    newMajorInput.style.display="none";
                    formElement2.appendChild(newMajorInput);

                    var newGradeInput=document.createElement("input");
                    newGradeInput.value=scholarship[8];
                    newGradeInput.name="new-grade";
                    newGradeInput.style.display="none";
                    formElement2.appendChild(newGradeInput) ;

                    var newStateInput=document.createElement("input");
                    newStateInput.value=scholarship[10];
                    newStateInput.name="new-state";
                    newStateInput.style.display="none";
                    formElement2.appendChild(newStateInput) ;


                    var submitButton=document.createElement("button");
                    submitButton.innerHTML="Submit";
                    formElement2.appendChild(submitButton);

                    containerElement.appendChild(formElement2);
                    }
                    else{
                    editButton.innerText="Edit"
                    
                    document.getElementById('form-element-2'+scholarship[0]).remove();
                    
                    urlElement.style.display="inline";
                    deadlineContainer.style.display="block";
                    amountContainer.style.display="block";
                    moreDetails.style.display="block";

                    }


                     
                

                }
                
            }
            


            const deadlineContainer=document.createElement("div");
            deadlineContainer.setAttribute('class','deadline-container');
            const deadlineTitle=document.createElement("h4");
            deadlineTitle.innerText="DEADLINE: ";
            const deadlineValue=document.createElement("h4");
            deadlineValue.innerText=scholarship[2];
            deadlineContainer.appendChild(deadlineTitle);
            deadlineContainer.appendChild(deadlineValue);
            containerElement.appendChild(deadlineContainer);

            const amountContainer=document.createElement("div");
            amountContainer.setAttribute('class','amount-container');
            const amountTitle=document.createElement("h4");
            amountTitle.innerText="AMOUNT: ";
            const amountValue=document.createElement("h4");
            amountValue.innerText='$'+scholarship[9];
            amountContainer.appendChild(amountTitle);
            amountContainer.appendChild(amountValue);
            containerElement.appendChild(amountContainer);

            const moreDetails=document.createElement("div");
            moreDetails.setAttribute('class','more-details');
            moreDetails.innerHTML="Scholarship Details: ";
            
            const downArrow=document.createElement("i");
            downArrow.setAttribute('class','arrow down');
            moreDetails.appendChild(downArrow);

            const detailsElement=document.createElement("div");
            detailsElement.style.display="none";

            const descriptionElement=document.createElement("p");
            descriptionElement.innerText="Description: "+ scholarship[1];
            detailsElement.appendChild(descriptionElement);

            const requirementElement=document.createElement("p");
            requirementElement.innerText="Requirements: race/ethnicity:"+ scholarship[4]+", gender identity:"+scholarship[5]+", income:"+ scholarship[6]+", major:"+ scholarship[7];
            detailsElement.appendChild(requirementElement);

            

            moreDetails.appendChild(detailsElement);
            

            moreDetails.onclick=function(){
                if(detailsElement.style.display=="none"){
                detailsElement.style.display="block";
                downArrow.classList.remove("down");
                downArrow.classList.add("up");
                }
                else{
                    detailsElement.style.display="none";
                    downArrow.classList.remove("up");
                    downArrow.classList.add("down");
                }
                
                }
            

            containerElement.appendChild(divElement); 
            containerElement.appendChild(moreDetails);
            
            return containerElement;
            }
        function accessCalendar(){
            handleClientLoad();
        }

            /**
       *  On load, called to load the auth2 library and API client library.*/
       
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.*/
       
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          handleAuthClick();
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.*/
       
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          listUpcomingEvents();
        } 
      }

      /**
       *  Sign in the user upon button click.*/
       
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.*/
       
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.*/
       
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.*/
       
      function listUpcomingEvents() {
          var event = {
  'summary': calendarTitle+' Deadline',
  'description': calendarTitle+ ' is due today! Make sure to submit it on time',
  'start': {
    'date': date,
    'timeZone': 'America/Chicago'
  },
  'end': {
    'date':date,
    'timeZone': 'America/Chicago'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=1'
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 48 * 60},
      {'method': 'popup', 'minutes': 30}
    ]
  }
};

var request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': event
});

request.execute(function(event) {
  appendPre('Event created: ' + event.htmlLink);
});
      }