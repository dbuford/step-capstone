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
/** */


var CLIENT_ID = '376440599760-5dpjdtasspucoc2petrcgct7uslso8nb.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyAedVIc7Rqof96Rwz4kg9G8hybDOYm_578';

    
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";


      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
          console.log("working");
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
          console.log("works");
          if(document.getElementById("authorize_button")!=null){
            document.getElementById("authorize_button").onclick = handleAuthClick;
            document.getElementById("signout_button").onclick = handleSignoutClick;

          }
          console.log("works");
          console.log("works");
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        console.log("working");
        if (isSignedIn) {
          var userEmail2 = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
          localStorage.setItem("userEmail",JSON.stringify(userEmail2));
          console.log(localStorage.getItem("userEmail")); 
          if (document.getElementById('login') !=null) {
              
          document.getElementById('login').value = localStorage.getItem("userEmail");
          loadPage();
          console.log(document.getElementById('login').value);
         // const params = new URLSearchParams();
          //  params.append('email', email);
          //  fetch('/logins', {method: 'POST', body: params})
          console.log("working");
          document.getElementById("authorize_button").style.display = 'none';
          console.log("working also");
          document.getElementById("signout_button").style.display = 'block';
          console.log("working");
          document.getElementById("addcomm").style.display = 'block';
        } 

        
        if(document.getElementById('login')==null){
            listUpcomingEvents();
        }
        } else {
            if(document.getElementById('login') !=null){
                document.getElementById("authorize_button").style.display = 'block';
                document.getElementById("signout_button").style.display = 'none';
                console.log("working");
                localStorage.removeItem("userEmail");
                document.getElementById("addcomm").style.display = 'none';
            }
            else{
                handleAuthClick();
            }


        }
      
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        console.log("line 133 not logged in");

        gapi.auth2.getAuthInstance().signIn();

        console.log("line 136 not logged in");

      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
        const loginElement = document.getElementById('loginel');
        loginElement.innerHTML = "Feel free to Login";

        localStorage.removeItem("userEmail");

      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }













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
     const loginElement = document.getElementById('loginel');
     loginElement.innerHTML = ("Welcome " + document.getElementById('login').value);
     console.log(document.getElementById('login').value);
     console.log("works");
}


function updateCount() {
  location.replace("Profile.html")
}

function createEntryElement(entry) {
  const entryElement = document.createElement('li');
  entryElement.className = 'entry collection-item';

  const imageElement=document.createElement("img");
  imageElement.src="/images/person.jpg";
    


  const nameElement = document.createElement('span');
  if (entry.name === undefined || entry.name === "") {
    nameElement.innerHTML = "-- Anonymous".italics().bold();
  } else {
    nameElement.innerHTML = ("Name: " + entry.name).italics().bold();
  }
  nameElement.style.marginLeft = "15px"

  const emailElement = document.createElement('span');
  emailElement.innerHTML = ("Email: " + entry.email);
  

  const ageElement = document.createElement('span');
  ageElement.innerText = ("Age: " + entry.age);


  const majorElement = document.createElement('span');
  majorElement.innerText = ("Major: " + entry.major.toString());

  const genderElement = document.createElement('span');
  genderElement.innerText = ("Gender: " + entry.gender.toString());

  const incomeElement = document.createElement('span');
  incomeElement.innerText = ("Income: " + entry.income.toString());

  const raceElement = document.createElement('span');
  raceElement.innerText = ("Race: " + entry.race.toString());

  const gradeElement = document.createElement('span');
  gradeElement.innerText = ("Grade Level: " + entry.grade.toString());

  const locationElement = document.createElement('span');
  locationElement.innerText = ("Location: " + entry.location.toString());

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

  entryElement.appendChild(imageElement);
  const breakElement9=document.createElement("br");
  entryElement.appendChild(breakElement9);
  entryElement.appendChild(nameElement);
  const breakElement=document.createElement("br");
  entryElement.appendChild(breakElement);
  entryElement.appendChild(emailElement);
  const breakElement2=document.createElement("br");
  const breakElement3=document.createElement("br");
  const breakElement4=document.createElement("br");
  const breakElement5=document.createElement("br");
  const breakElement6=document.createElement("br");
  const breakElement7=document.createElement("br");
  const breakElement8=document.createElement("br");
  entryElement.appendChild(breakElement2);
  entryElement.appendChild(ageElement);
  entryElement.appendChild(breakElement3);
  entryElement.appendChild(majorElement);
  entryElement.appendChild(breakElement6);
  entryElement.appendChild(incomeElement);
  entryElement.appendChild(breakElement4);
  entryElement.appendChild(raceElement);
  entryElement.appendChild(breakElement5);
  entryElement.appendChild(gradeElement);
  entryElement.appendChild(breakElement7);
  entryElement.appendChild(locationElement);
  
  
  return entryElement;
}

function deleteEntry(entry) {
  const params = new URLSearchParams();
  params.append('id', entry.id);
  fetch('/delete', {method: 'POST', body: params});
}



// create function for user info
function getUserInfo(){
    console.log(localStorage.getItem("userEmail"));
        if(localStorage.getItem("userEmail") == null){
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
                if(entry.email== localStorage.getItem("userEmail")){
                    const entryListElement = document.getElementById('entry-list');
                    entryListElement.appendChild(createEntryElement(entry));
                    console.log(entry.email);
                    console.log(localStorage.getItem("userEmail"));
    

            
                    
                }

    })
  });

        }


}


function loadPage() {
	login();
}


function loadInfo() {
    getUserInfo();
}




/* scholarships functions*/
// Client ID and API key from the Developer Console

      var date;
      var calendarTitle;
      var currentUserEmail;



function getUserScholarships(){
    if(localStorage.getItem('userEmail')!=null){
        currentUserEmail=localStorage.getItem('userEmail');
    }
        if(localStorage.getItem('userEmail')==null){
            const divElement=document.createElement('div');
                const titleElement=document.createElement("h2");
                titleElement.innerText="Please Sign In and Fill Out Form on Home Page";
                divElement.appendChild(titleElement);
                const scholarshipList = document.getElementById('scholarship-list');
                scholarshipList.appendChild(divElement);
        }
        else{
            fetch('/data').then(response => response.json()).then((entries) => {
                var foundEmail=false;
                var foundEntry;
            entries.forEach((entry) => {
                if(entry.email==currentUserEmail){
                    foundEmail=true;
                    foundEntry=entry;
                    }
                })

                if(foundEmail==true){
                    getScholarships(foundEntry.race,foundEntry.gender,foundEntry.major,foundEntry.income,foundEntry.grade,foundEntry.location); 
                }
                else{
                if(!document.body.contains(document.getElementById('please-fill'))){
                    const divElement=document.createElement('div');
                    const titleElement=document.createElement("h2");
                    titleElement.innerText="Please Fill Out Form on Home Page";
                    titleElement.setAttribute('id','please-fill');
                    divElement.appendChild(titleElement);
                    const scholarshipList = document.getElementById('scholarship-list');
                    scholarshipList.appendChild(divElement);
                }
                
                
                }


  });

        }

}
function getScholarships(race,gender,major,income,grade,state,sort) {
    if(localStorage.getItem('userEmail')!=null){
        currentUserEmail=localStorage.getItem('userEmail');

    }
    const params = new URLSearchParams();
    params.append('sort', sort);

   fetch("/list-scholarships", {method: 'POST', body: params}).then(response => response.json()).then((response) => {
       var scholarships=[];
       console.log(response);
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
                titleElement.innerText="No Scholarships Currently Match You";
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

            //check if scholarship deadline is expired
            var currentDate=new Date();
            var scholarshipDate=new Date(scholarship[2]);
            if(scholarshipDate<currentDate){
                containerElement.style.display="none";
            }

            
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

                const params = new URLSearchParams();
                params.append('id', scholarship[12]);
                params.append('email', localStorage.getItem("userEmail"));
                fetch('/display-ToDoList', {method: 'POST', body: params});
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

            if(currentUserEmail==scholarship[11]){
                //create form if user chooses to edit their scholarship entry
                var editButton=document.createElement("button");
                editButton.innerText="edit";
                titleContainer.appendChild(editButton);
                var deleteButton=document.createElement("button");
                deleteButton.innerText='delete';
                deleteButton.style.float="right";
                divElement.appendChild(deleteButton);
                deleteButton.onclick=function(){
                    const params = new URLSearchParams();
                    params.append('id', scholarship[12]);
                    fetch('/delete-scholarship', {method: 'POST', body: params});
                    containerElement.remove();
                }


                editButton.onclick=function(){
                    if(editButton.innerText=="edit"){
                        editButton.innerText="Close";

                    
                    urlElement.style.display="none";
                    deadlineContainer.style.display="none";
                    amountContainer.style.display="none";
                    moreDetails.style.display="none";
                
                    formDiv1=document.createElement("div");
                    formDiv1.setAttribute("class","edit-form1");

                    formDiv2=document.createElement("div");
                    formDiv2.setAttribute("class","edit-form2");


                    formElement2=document.createElement("form");
                    formElement2.setAttribute("class","edit-form-parent");
                    formElement2.action="/edit-scholarship";
                    formElement2.method="POST";
                    formElement2.setAttribute('id','form-element-2'+scholarship[0]);
                    


                    var newTitle=document.createElement("h4");
                    newTitle.innerText='Title: ';
                    formDiv1.appendChild(newTitle);

                    var newTitleInput=document.createElement("input");
                    newTitleInput.value=scholarship[0];
                    newTitleInput.name="new-title";
                    formDiv1.appendChild(newTitleInput);

                    var newUrl=document.createElement("h4");
                    newUrl.innerText='Url: ';
                    formDiv1.appendChild(newUrl);

                    var newUrlInput=document.createElement("input");
                    newUrlInput.type="url";
                    console.log(scholarship[3]);
                    newUrlInput.value=new URL(scholarship[3]);
                    newUrlInput.name="new-url";
                    formDiv1.appendChild(newUrlInput);

                    var newDeadline=document.createElement("h4");
                    newDeadline.innerText='Deadline: ';
                    formDiv1.appendChild(newDeadline);

                    var newDeadlineInput=document.createElement("input");
                    newDeadlineInput.type="date";
                    newDeadlineInput.value=scholarship[2];
                    newDeadlineInput.name="new-deadline"
                    formDiv1.appendChild(newDeadlineInput);

                    var newAmount=document.createElement("h4");
                    newAmount.innerText='Amount: ';
                    formDiv1.appendChild(newAmount);

                    var newAmountInput=document.createElement("input");
                    newAmountInput.type="number";
                    console.log(scholarship[9]);
                    newAmountInput.value=Number(scholarship[9]);
                    console.log(newAmountInput.value);
                    newAmountInput.name="new-amount";
                    formDiv1.appendChild(newAmountInput);

                    var scholarshipId=document.createElement("input");
                    scholarshipId.value=scholarship[12];
                    scholarshipId.style.display="none";
                    scholarshipId.name="new-id";
                    formDiv1.appendChild(scholarshipId);  

                    var newDescription=document.createElement("h4");
                    newDescription.innerText='Description: ';
                    formDiv1.appendChild(newDescription);

                    var newDescriptionInput=document.createElement("input");
                    newDescriptionInput.value=scholarship[1];
                    newDescriptionInput.name="new-description";
                    formDiv1.appendChild(newDescriptionInput) ;

                /*create input boxes for race*/

                    var newRace=document.createElement("h4");
                    newRace.innerText='Race/Ethnicity: ';
                    formDiv2.appendChild(newRace);

                    var newRaceContainer=document.createElement("div");
                    newRaceContainer.setAttribute("class","scrollbox");

                    for(let i=1;i<document.getElementById("race").length;i++){
                        var x=document.getElementById("race").options;
                        
                        var newRaceElement=document.createElement("input");
                        setAttributes(newRaceElement,{"value":x[i].value,"type":"checkbox","name":"new-race"},scholarship[4]);
                        if(i!=1){
                        newRaceContainer.appendChild(document.createElement("br"));
                        }

                        newRaceContainer.appendChild(newRaceElement);
                        newRaceContainer.appendChild(document.createTextNode(x[i].text));
                    }

                    formDiv2.appendChild(newRaceContainer);

               
                /*create input for gender identity*/

                    var newGender=document.createElement("h4");
                    newGender.innerText='Gender Identity: ';
                    formDiv2.appendChild(newGender);

                    var newGenderContainer=document.createElement("div");
                    newGenderContainer.setAttribute("class","scrollbox");

                    for(let i=2;i<document.getElementById("gender").length;i++){
                        var x=document.getElementById("gender").options;
                        
                        var newGenderElement=document.createElement("input");
                        setAttributes(newGenderElement,{"value":x[i].value,"type":"checkbox","name":"new-gender"},scholarship[5]);
                        if(i!=2){
                        newGenderContainer.appendChild(document.createElement("br"));
                        }

                        newGenderContainer.appendChild(newGenderElement);
                        newGenderContainer.appendChild(document.createTextNode(x[i].text));
                    }

                    formDiv2.appendChild(newGenderContainer);


            /*create input for income level*/

                    var newIncome=document.createElement("h4");
                    newIncome.innerText='Income Level: ';
                    formDiv2.appendChild(newIncome);

                    var newIncomeContainer=document.createElement("div");
                    newIncomeContainer.setAttribute("class","scrollbox");

                    for(let i=2;i<document.getElementById("income").length;i++){
                        var x=document.getElementById("income").options;
                        
                        var newIncomeElement=document.createElement("input");
                        setAttributes(newIncomeElement,{"value":x[i].value,"type":"checkbox","name":"new-income"},scholarship[6]);
                        if(i!=2){
                        newIncomeContainer.appendChild(document.createElement("br"));
                        }

                        newIncomeContainer.appendChild(newIncomeElement);
                        newIncomeContainer.appendChild(document.createTextNode(x[i].text));
                    }

                    formDiv2.appendChild(newIncomeContainer);

            /*create input for major*/
                    var newMajor=document.createElement("h4");
                    newMajor.innerText='Major: ';
                    formDiv2.appendChild(newMajor);

                    var newMajorContainer=document.createElement("div");
                    newMajorContainer.setAttribute("class","scrollbox");

                    for(let i=2;i<document.getElementById("major").length;i++){
                        var x=document.getElementById("major").options;
                        
                        var newMajorElement=document.createElement("input");
                        setAttributes(newMajorElement,{"value":x[i].value,"type":"checkbox","name":"new-major"},scholarship[7]);
                        if(i!=2){
                        newMajorContainer.appendChild(document.createElement("br"));
                        }

                        newMajorContainer.appendChild(newMajorElement);
                        newMajorContainer.appendChild(document.createTextNode(x[i].text));
                    }

                    formDiv2.appendChild(newMajorContainer);
                
                    

            /*create input for gradelevel*/
                    var newGrade=document.createElement("h4");
                    newGrade.innerText='Grade Level: ';
                    formDiv2.appendChild(newGrade);

                    var newGradeContainer=document.createElement("div");
                    newGradeContainer.setAttribute("class","scrollbox");

                    for(let i=2;i<document.getElementById("grade").length;i++){
                        var x=document.getElementById("grade").options;
                        
                        var newGradeElement=document.createElement("input");
                        setAttributes(newGradeElement,{"value":x[i].value,"type":"checkbox","name":"new-grade"},scholarship[8]);
                        if(i!=2){
                        newGradeContainer.appendChild(document.createElement("br"));
                        }

                        newGradeContainer.appendChild(newGradeElement);
                        newGradeContainer.appendChild(document.createTextNode(x[i].text));
                    }

                    formDiv2.appendChild(newGradeContainer);

            /*input for state location*/
                    var newState=document.createElement("h4");
                    newState.innerText='State: ';
                    formDiv2.appendChild(newState);

                var newStateContainer=document.createElement("div");
                    newStateContainer.setAttribute("class","scrollbox");

                    for(let i=2;i<document.getElementById("state").length;i++){
                        var x=document.getElementById("state").options;
                        
                        var newStateElement=document.createElement("input");
                        setAttributes(newStateElement,{"value":x[i].value,"type":"checkbox","name":"new-state"},scholarship[10]);
                        if(i!=2){
                        newStateContainer.appendChild(document.createElement("br"));
                        }

                        newStateContainer.appendChild(newStateElement);
                        newStateContainer.appendChild(document.createTextNode(x[i].text));
                    }

                    formDiv2.appendChild(newStateContainer);


                    var submitButton=document.createElement("button");
                    submitButton.innerHTML="Submit";
                    submitButton.style.float="left";
                    formElement2.appendChild(formDiv2);
                    formElement2.appendChild(formDiv1);
                    formElement2.appendChild(submitButton);
                    
                    containerElement.appendChild(formElement2);
                    }
                    else{
                    editButton.innerText="edit"
                    
                    document.getElementById('form-element-2'+scholarship[0]).remove();
                    
                    urlElement.style.display="inline";
                    deadlineContainer.style.display="block";
                    amountContainer.style.display="block";
                    moreDetails.style.display="block";

                    }


                     
                

                }
                
            }
            
            const votingContainer=document.createElement("div");
            votingContainer.setAttribute('class','voting-container');
            const thumbsup=document.createElement("i");
            thumbsup.setAttribute('class','fa fa-thumbs-up');
            thumbsup.innerText=scholarship[13];
            const thumbsdown=document.createElement("i");
            thumbsdown.setAttribute('class','fa fa-thumbs-down');
            thumbsdown.innerText=scholarship[14];
            var userUpClicked=false;
            var userDownClicked=false;
            if(scholarship[15].includes(localStorage.getItem("userEmail"))){
                        console.log("INCLUDES");
                        userUpClicked=true;
                        thumbsup.style.color="green";
                    }
            if(scholarship[16].includes(localStorage.getItem("userEmail"))){
                        console.log("INCLUDES");
                        userDownClicked=true;
                        thumbsdown.style.color="green";
                    }
            thumbsup.onclick=function(){
            //check if user is signed in to allow them to vote
            if(localStorage.getItem("userEmail")!=null){

                    
                    //allow upvote if user does not have upvote active
                    if(userUpClicked==false&&!scholarship[15].includes(localStorage.getItem("userEmail"))){
                        thumbsup.style.color="green";
                        scholarship[13]=scholarship[13]+1;
                        thumbsup.innerText=scholarship[13];
                        console.log(scholarship[13]);
                        userUpClicked=true;
                       scholarship[15].push(localStorage.getItem("userEmail"));
                       console.log(scholarship[15]);
                    //change downvote to upvote if downvote is active
                    if(userDownClicked==true && scholarship[14]!=0){
                        thumbsdown.style.color='black';
                        scholarship[14]=scholarship[14]-1;
                        thumbsdown.innerText=scholarship[14];
                        userDownClicked=false;
                        //remove email from downVotelist
                        const emailLocation=scholarship[16].indexOf(localStorage.getItem("userEmail"));
                        if (emailLocation > -1) {
                             scholarship[16].splice(emailLocation, 1);
                            }
                    }
                }
                    //take away  upvote if button is clicked and upvote is active
                    else{
                        scholarship[13]=scholarship[13]-1;
                        thumbsup.innerText=scholarship[13];
                        userUpClicked=false;
                        thumbsup.style.color='black';
                        //remove email from upVoteList
                        const emailLocation=scholarship[15].indexOf(localStorage.getItem("userEmail"));
                        if (emailLocation > -1) {
                             scholarship[15].splice(emailLocation, 1);
                            }
                    }
                
                    
                  const params = new URLSearchParams();
                    params.append('id', scholarship[12]);
                    console.log(scholarship[12]);
                    params.append('thumbsup',scholarship[13]);
                    params.append('thumbsdown',scholarship[14]);
                    params.append('thumbsUpList',scholarship[15]);
                    params.append('thumbsDownList',scholarship[16]);
                    fetch('/update-vote', {method: 'POST', body: params});
            }
                
                //alert user that they are not logged in and cannot vote
                else{window.alert("Please log in to vote");}
                }
            votingContainer.appendChild(thumbsup);

            thumbsdown.onclick=function(){
            //check if user is signed in to allow them to vote
            if(localStorage.getItem("userEmail")!=null){

                //allow downvote if user does not have downvote active
                if(userDownClicked==false&&!scholarship[16].includes(localStorage.getItem("userEmail"))){
                    thumbsdown.style.color="green";
                    scholarship[14]=scholarship[14]+1;
                    thumbsdown.innerText=scholarship[14];
                    console.log(scholarship[13]);
                    userDownClicked=true;
                    scholarship[16].push(localStorage.getItem("userEmail"));


                //change upvote to downvote if upvote is active
                if(userUpClicked==true&& scholarship[13]!=0){
                    thumbsup.style.color='black';
                    scholarship[13]=scholarship[13]-1;
                    thumbsup.innerText=scholarship[13];
                    userUpClicked=false;
                    //remove email from upVotelist
                    const emailLocation=scholarship[15].indexOf(localStorage.getItem("userEmail"));
                        if (emailLocation > -1) {
                             scholarship[15].splice(emailLocation, 1);
                            }
                }
            }
            //take away  downvote if button is clicked and downvote is active
            else{
                scholarship[14]=scholarship[14]-1;
                thumbsdown.innerText=scholarship[14];
                userDownClicked=false;
                thumbsdown.style.color='black';
                //remove email from downVotelist
                const emailLocation=scholarship[16].indexOf(localStorage.getItem("userEmail"));
                if (emailLocation > -1) {
                    scholarship[16].splice(emailLocation, 1);
                    }
            }
            const params = new URLSearchParams();
                params.append('id', scholarship[12]);
                console.log(scholarship[12]);
                params.append('thumbsup',scholarship[13]);
                params.append('thumbsdown',scholarship[14]);
                params.append('thumbsUpList',scholarship[15]);
               params.append('thumbsDownList',scholarship[16]);
                fetch('/update-vote', {method: 'POST', body: params});
            }
            //alert user that they are not logged in and cannot vote
                else{window.alert("Please log in to vote");}
                }
                
            votingContainer.appendChild(thumbsdown);
            containerElement.appendChild(votingContainer);


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
            amountValue.innerText='$'+thousands_separators(scholarship[9]);
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
            requirementElement.innerText="Requirements: race/ethnicity:"+ scholarship[4]+", gender identity:"+scholarship[5]+", income:"+ scholarship[6]+", major:"+ scholarship[7]+ ", grade:"+scholarship[8]+", location:"+scholarship[10];
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
        function setAttributes(el, attrs,current) {
            for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
                }
            if(current.includes(el.value)){
                el.checked=true;
            }

        }
        function thousands_separators(num){
            var num_parts = num.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return num_parts.join(".");
        }
        function accessCalendar(){
           handleClientLoad();
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

function toDoListDisplay(type) {
    console.log(type);
    var newType=type;
    console.log(newType);
    const toDoListDiv=document.getElementById('to-do-list');
    const alertMessage=document.createElement('h2');

  if(localStorage.getItem('userEmail')==null){
      alertMessage.innerText='Please Sign in to View To-Do-List';
      toDoListDiv.appendChild(alertMessage);
      
  }
  else{
        currentUserEmail=localStorage.getItem('userEmail');

    

    const params = new URLSearchParams();
   params.append('userEmail',currentUserEmail);

   fetch("/display-ToDoList", {method: 'POST', body: params}).then(response => response.json()).then((response) => {
       if(response.length==0){
           alertMessage.innerText='No Scholarships Currently in To Do List';
        }
        else{
            const scholarshipList = document.getElementById('to-do-list-list');
                scholarshipList.innerHTML="";
                for(let i=0;i<response.length;i++){
                    //check to display only active scholarships
                    if(type=='active'&& response[i][14].includes(response[i][12])&&!response[i][15].includes(response[i][12])){
                scholarshipList.appendChild(createToDoListElement(response[i],newType));
                }
                //check to display only complete scholarships
                else if(type=='completed'&& response[i][15].includes(response[i][12])){
                scholarshipList.appendChild(createToDoListElement(response[i],newType));

                }
                }
            

        }
            
       });
  
}
}
function createToDoListElement(scholarship,type){
    console.log(type);
    console.log("line1191");
    const containerElement=document.createElement('div');
    containerElement.setAttribute('class','container');

    //display title and link to scholarship
    var urlElement=document.createElement('a');
    var linkText=document.createTextNode(scholarship[0]);
    urlElement.appendChild(linkText);
    var titleContainer=document.createElement("div");
    titleContainer.setAttribute('class','scholarship-title');
    urlElement.setAttribute('class','scholarship-title-design');
    urlElement.title=scholarship[0];
    urlElement.setAttribute('href', scholarship[3]);
    urlElement.style.fontWeight="bold";
    urlElement.style.fontSize="20px";
    urlElement.setAttribute('target', '_blank');
    titleContainer.appendChild(urlElement);
    containerElement.appendChild(titleContainer);

    //display deadline for scholarship
    var deadlineContainer=document.createElement("div");
    deadlineContainer.setAttribute('class','scholarship-info');
    var deadlineValue=document.createElement("a");
    deadlineValue.innerText="Deadline: "+scholarship[2];
    deadlineContainer.appendChild(deadlineValue);
    containerElement.appendChild(deadlineContainer);

    //display amount for scholarship
    var amountContainer=document.createElement("div");
    amountContainer.setAttribute('class','scholarship-info');
    var amountValue=document.createElement("a");
    amountValue.innerText="Amount: $"+thousands_separators(scholarship[9]);
    amountContainer.appendChild(amountValue);
    containerElement.appendChild(amountContainer);

    //display priority level for scholarship
    containerElement.appendChild(createPriority(scholarship[0],scholarship[11],scholarship[12],scholarship[13]));

    
    //done button for scholarship
    var doneButton=document.createElement("button");

    //only append to container if type is active
    if(type=="active"){
    doneButton.setAttribute('class','done-button');
    doneButton.innerText="mark as complete";
    containerElement.appendChild(doneButton);
    }
    //active button for scholarship
    var activeButton=document.createElement("button");

    //only append to container if type is completed
    if(type=="completed"){
        activeButton.setAttribute('class','done-button');
        activeButton.innerText='mark as active';
        containerElement.appendChild(activeButton);
    }


  
    
    doneButton.onclick=function(){
        console.log("this is working");
        const params = new URLSearchParams();
        params.append('scholarshipId', scholarship[12]);
        console.log(scholarship[12]);
        params.append('entityId',scholarship[13]);
        fetch('/completed', {method: 'POST', body: params});
        location.reload();

    }
    activeButton.onclick=function(){
        console.log("this is working");
        const params = new URLSearchParams();
        params.append('scholarshipId', scholarship[12]);
        console.log(scholarship[12]);
        params.append('entityId',scholarship[13]);
        fetch('/active', {method: 'POST', body: params});
        location.reload();
    }
    return containerElement;
    }




function createPriority(title,priority,scholarshipId,entityId){
    var selectContainer=document.createElement("select");
    selectContainer.setAttribute('class','scholarship-info');
    selectContainer.setAttribute('id','priority'+title);
    selectContainer.setAttribute('name','priority');
    selectContainer.onchange=function(){
        const params = new URLSearchParams();
        params.append('scholarshipId', scholarshipId);
        params.append('entityId',entityId);
        params.append('priorityValue',document.getElementById('priority'+title).value);
        fetch('/change-priority', {method: 'POST', body: params});

    }

    var noOption=document.createElement("option");
    noOption.value="none";
    noOption.innerText="Select Priority";
    selectContainer.appendChild(noOption);


    var highOption=document.createElement("option");
    highOption.value="high";
    highOption.innerText="High Priority";
    highOption.setAttribute('class','high-priority');
    selectContainer.appendChild(highOption);

     var mediumOption=document.createElement("option");
    mediumOption.value="medium";
    mediumOption.innerText="Medium Priority";
    selectContainer.appendChild(mediumOption);

    var lowOption=document.createElement("option");
    lowOption.value="low";
    lowOption.innerText="Low Priority";
    selectContainer.appendChild(lowOption);

    selectContainer.value=priority;

    return selectContainer;

}
