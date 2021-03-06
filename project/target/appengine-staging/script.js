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

    
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest","https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks";


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
          if(document.getElementById("authorize_button")!=null){
            document.getElementById("authorize_button").onclick = handleAuthClick;
            document.getElementById("signout_button").onclick = handleSignoutClick;

          }
        }, function(error) {
          /*appendPre(JSON.stringify(error, null, 2));*/
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          var userEmail2 = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
          localStorage.setItem("userEmail",JSON.stringify(userEmail2).replace(/\"/g, ""));
          if (document.getElementById('login') !=null) {
              
          document.getElementById('login').value = localStorage.getItem("userEmail");
          loadPage();

          document.getElementById("authorize_button").style.display = 'none';
          document.getElementById("signout_button").style.display = 'block';

          //check if user has already filled out form
          var alreadyFilledOut=false;
          var userName;

          fetch('/data').then(response => response.json()).then((entries) => {
          entries.forEach((entry) => {
          if(entry.email== localStorage.getItem("userEmail")){
              alreadyFilledOut=true;
              userName=entry.name;
        }
          })
          if(alreadyFilledOut==false){
            window.location.replace("login.html");

            /*document.getElementById("addcomm").style.display = 'block';
            const loginElement = document.getElementById('loginel');
            loginElement.style.display="block";
            loginElement.style.background="royalblue";
            loginElement.style.color="white";
            loginElement.innerHTML = ("Welcome " + document.getElementById('login').value);*/



          }
          else{
            document.getElementById("addcomm").style.display = 'none';
            const loginElement = document.getElementById('loginel');
            loginElement.style.display="block";
            loginElement.style.background="white";
            loginElement.style.color="black";
            loginElement.innerHTML = ("Welcome, " + userName+"!");

 
          }
          }); 
          }

        
        if(document.getElementById('scholarship-list')!=null){
            listUpcomingEvents();
            FindTaskList();
        }
          

        } else {
            if(document.getElementById('login') !=null){
                document.getElementById("authorize_button").style.display = 'block';
                document.getElementById("signout_button").style.display = 'none';
                localStorage.removeItem("userEmail");
                /*document.getElementById("addcomm").style.display = 'none';*/
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

        gapi.auth2.getAuthInstance().signIn();


      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
        const titleElement=document.getElementById('login/signup');
        titleElement.style.display="block";
        const loginElement = document.getElementById('loginel');
        loginElement.style.display="none";


        localStorage.removeItem("userEmail");

      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
     /* function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }*/













async function getData() {
  const response = await fetch('/data');
  const data = await response.text();
  document.getElementById('data-container').innerText = data;
}


/*function add_info() {
	fetch('/logins').then(response => response.text()).then((txt) => {
     var form = document.getElementById("addcomm");
    if (txt.includes("Please")) {
      form.style.display = "none";
      document.getElementById("error").innerHTML = "<i>" + txt + "</i>";
    } else{
      document.getElementById("error").innerHTML = "<i>" + txt + "</i>";
    }});
}*/



function login() {
  
  /*  const loginElement = document.getElementById('loginel2');
    loginElement.style.display="block";
     loginElement.style.background="royalblue";
     loginElement.style.color="white";
     loginElement.style.fontSize="40px";
     loginElement.innerHTML = ("Welcome " + document.getElementById('login').value);
     console.log(document.getElementById('login').value);*/
}


function updateCount() {
  location.replace("Profile.html")
}

function createEntryElement(entry) {
    const containerElement=document.getElementById('container-div');
  const pictureElement = document.createElement('div');
  pictureElement.className = 'profile-picture-div';

  const imageElement=document.createElement("img");
        if(entry.image == null || entry.image == undefined) { 
            imageElement.src="/images/person.jpg";
        }
        else{
            imageElement.src = entry.image;
        }
    
    const entryElement=document.createElement('div');
    entryElement.className='info-div';
  const nameElement = document.createElement('h3');
  nameElement.style.float='left';
  if (entry.name === undefined || entry.name === "") {
    nameElement.innerHTML = "-- Anonymous".italics().bold();
  } else {
    nameElement.innerText = (entry.name);
  }
const nameLocationElement=document.createElement('div');
nameLocationElement.className='name-location-div';
nameLocationElement.appendChild(nameElement);
const geoTagElement=document.createElement('i');
geoTagElement.className='fas fa-map-marker-alt';
geoTagElement.style.fontSize='24px';
geoTagElement.style.float='left';
nameLocationElement.appendChild(geoTagElement);


const locationElement = document.createElement('p');
locationElement.innerText = (entry.location.splice(0,(entry.location.length)-1).toString());
locationElement.style.float='left';
nameLocationElement.appendChild(locationElement);

const restOfElement=document.createElement('div');
restOfElement.className="rest-div";

const valueElement=document.createElement('div');
valueElement.className="value-div";

const titleElement=document.createElement('div');
titleElement.className="title-div";

  const emailDiv=document.createElement("div");
  emailDiv.className="entire-info-div";
  const emailInfoDiv=document.createElement("div");
  emailInfoDiv.className="left-title-div";
  const emailValueDiv=document.createElement("div");
  emailValueDiv.className="right-value-div";  
  const emailTitleElement=document.createElement('p');
  emailTitleElement.innerText="Email ";
  const emailElement = document.createElement('p');
  emailElement.innerText = (entry.email);
  
  const ageDiv=document.createElement("div");
  ageDiv.className="entire-info-div";
  const ageInfoDiv=document.createElement("div");
  ageInfoDiv.className="left-title-div";
  const ageValueDiv=document.createElement("div");
  ageValueDiv.className="right-value-div"; 
  const ageTitleElement=document.createElement('p');
  ageTitleElement.innerText="Age ";
  const ageElement = document.createElement('p');
  ageElement.innerText = (entry.age);

  const majorDiv=document.createElement("div");
  majorDiv.className="entire-info-div";
  const majorInfoDiv=document.createElement("div");
  majorInfoDiv.className="left-title-div";
  const majorValueDiv=document.createElement("div");
  majorValueDiv.className="right-value-div";
  const majorTitleElement=document.createElement('p');
  majorTitleElement.innerText="Major Interest ";
  const majorElement = document.createElement('p');
  majorElement.innerText = (entry.major.splice(0,(entry.major.length)-1).toString());

  const genderDiv=document.createElement("div");
  genderDiv.className="entire-info-div";
  const genderInfoDiv=document.createElement("div");
  genderInfoDiv.className="left-title-div";
  const genderValueDiv=document.createElement("div");
  genderValueDiv.className="right-value-div";
  const genderTitleElement=document.createElement('p');
  genderTitleElement.innerText="Gender Identity ";
  const genderElement = document.createElement('p');
  genderElement.innerText = (entry.gender.splice(0,(entry.gender.length)-1).toString());

  const incomeDiv=document.createElement("div");
  incomeDiv.className="entire-info-div";
  const incomeInfoDiv=document.createElement("div");
  incomeInfoDiv.className="left-title-div";
  const incomeValueDiv=document.createElement("div");
  incomeValueDiv.className="right-value-div";
  const incomeTitleElement=document.createElement('p');
  incomeTitleElement.innerText="Income Level ";
  const incomeElement = document.createElement('p');
  incomeElement.innerText = (entry.income.splice(0,(entry.income.length)-1).toString());

  const raceDiv=document.createElement("div");
  raceDiv.className="entire-info-div";
  const raceInfoDiv=document.createElement("div");
  raceInfoDiv.className="left-title-div";
  const raceValueDiv=document.createElement("div");
  raceValueDiv.className="right-value-div";
  const raceTitleElement=document.createElement('p');
  raceTitleElement.innerText="Race/Ethnicity ";
  const raceElement = document.createElement('p');
  raceElement.innerText = (entry.race.splice(0,(entry.race.length)-1).toString());

  const gradeDiv=document.createElement("div");
  gradeDiv.className="entire-info-div";
  const gradeInfoDiv=document.createElement("div");
  gradeInfoDiv.className="left-title-div";
  const gradeValueDiv=document.createElement("div");
  gradeValueDiv.className="right-value-div"; 
  const gradeTitleElement=document.createElement('p');
  gradeTitleElement.innerText="Grade Level ";
  const gradeElement = document.createElement('p');
  gradeElement.innerText = (entry.grade.splice(0,(entry.grade.length)-1).toString());



  pictureElement.appendChild(imageElement);
    containerElement.appendChild(pictureElement);

  const breakElement1=document.createElement("div");
  breakElement1.innerText="div";
  breakElement1.style.color="white";

  const breakElement2=document.createElement("div");
  breakElement2.innerText="div";
  breakElement2.style.color="white";


  containerElement.appendChild(nameLocationElement);
  
 emailInfoDiv.appendChild(emailTitleElement);
 emailValueDiv.appendChild(emailElement);
 emailDiv.appendChild(emailInfoDiv);
 emailDiv.appendChild(emailValueDiv);

  ageInfoDiv.appendChild(ageTitleElement);
  ageValueDiv.appendChild(ageElement);
  ageDiv.appendChild(ageInfoDiv);
  ageDiv.appendChild(ageValueDiv);


  raceInfoDiv.appendChild(raceTitleElement);
  raceValueDiv.appendChild(raceElement);
  raceDiv.appendChild(raceInfoDiv);
  raceDiv.appendChild(raceValueDiv);

  genderInfoDiv.appendChild(genderTitleElement);
  genderValueDiv.appendChild(genderElement);
  genderDiv.appendChild(genderInfoDiv);
  genderDiv.appendChild(genderValueDiv);
   
  incomeInfoDiv.appendChild(incomeTitleElement);
  incomeValueDiv.appendChild(incomeElement);
  incomeDiv.appendChild(incomeInfoDiv);
  incomeDiv.appendChild(incomeValueDiv);

 


  majorInfoDiv.appendChild(majorTitleElement);
  majorValueDiv.appendChild(majorElement);
  majorDiv.appendChild(majorInfoDiv);
  majorDiv.appendChild(majorValueDiv);

  gradeInfoDiv.appendChild(gradeTitleElement);
  gradeValueDiv.appendChild(gradeElement);
  gradeDiv.appendChild(gradeInfoDiv);
  gradeDiv.appendChild(gradeValueDiv);

  restOfElement.appendChild(emailDiv);
  restOfElement.appendChild(ageDiv);
  restOfElement.appendChild(breakElement1);
  restOfElement.appendChild(raceDiv);
  restOfElement.appendChild(genderDiv);
  restOfElement.appendChild(incomeDiv);
  restOfElement.appendChild(majorDiv);
  restOfElement.appendChild(gradeDiv);

  entryElement.appendChild(restOfElement);

containerElement.appendChild(entryElement);

  
  
  return containerElement;
}

function deleteEntry(entry) {
  const params = new URLSearchParams();
  params.append('id', entry.id);
  fetch('/delete', {method: 'POST', body: params});
}



// Modifying user info
//function editing_info() {
 //   
//}

//function show_form() {
  //  if (email != emailElement) {
//
  //  }
//}


//function getUserInfoOnce(){
 //   if (entryListElement.in.entry){
     //   if (entryListElement.in.entry){
     //       add_info();
      //  }
  //  }
//}






// create function for user info
function getUserInfo(){
        if(localStorage.getItem("userEmail") == null){
            document.getElementById("myTab").style.display="none";
            const divElement=document.createElement('div');
                const titleElement=document.createElement("h2");
                titleElement.innerText="Please Sign In and Fill Out Form on Home Page";
                divElement.appendChild(titleElement);
                const entryListElement = document.getElementById('container-div');
                entryListElement.appendChild(divElement);

        }
        else{
            var foundData=false;
            document.getElementById("myTab").style.display="block";
            fetch('/data').then(response => response.json()).then((entries) => {
            entries.forEach((entry) => {
                if(entry.email== localStorage.getItem("userEmail")){
                    foundData=true;
                    const entryListElement = document.getElementById('entry-list');
                    entryListElement.appendChild(createEntryElement(entry));
                    const messageForm = document.getElementById('addcomm');
                    messageForm.action = entry.uploadUrl;

                }

    })
    if(foundData==false){
                   document.getElementById("myTab").style.display="none";
                const divElement=document.createElement('div');
                const titleElement=document.createElement("h2");
                titleElement.innerText="Please Fill Out Form on Home Page";
                divElement.appendChild(titleElement);
                const entryListElement = document.getElementById('container-div');
                entryListElement.appendChild(divElement); 
    }
  });

        }


}


function loadPage() {
	login();
}


function loadInfo() {
    getUserInfo();
}


function loadEdit(){
    fetch('/data').then(response => response.json()).then((entries) => {
          entries.forEach((entry) => {
          if(entry.email== localStorage.getItem("userEmail")){
              document.getElementById("nameid").value = entry.name;
              document.getElementById("ageid").value = entry.age;
              genre(document.getElementById("raceid"),entry.race[0]);
              genre(document.getElementById("majorid"),entry.major[0]);
              document.getElementById("locationid").value = entry.location[0];
              document.getElementById("genderid").value = entry.gender[0];
              document.getElementById("gradeid").value = entry.grade[0];
              document.getElementById("incomeid").value = entry.income[0];
          

          }
})
})
}
function genre(sel,current){
    for (var i = 0, len = sel.getElementsByTagName('input').length; i < len; i++ ) {
                opt = sel.getElementsByTagName('input')[i];

                if(current.includes(opt.value)){
                opt.checked=true;
            }
}}


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
                    /*document.getElementById("race").value=foundEntry.race;
                    document.getElementById("gender").value=foundEntry.gender;
                    document.getElementById("major").value=foundEntry.major;
                    document.getElementById("income").value=foundEntry.income;
                    document.getElementById("grade").value=foundEntry.grade;
                    document.getElementById("state").value=foundEntry.location;*/
                    getScholarships(foundEntry.race.toString(),foundEntry.gender,foundEntry.major,foundEntry.income,foundEntry.grade,foundEntry.location,'normal'); 
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
async function getScholarships(race,gender,major,income,grade,state,sort) {
    if(localStorage.getItem('userEmail')!=null){
        currentUserEmail=localStorage.getItem('userEmail');

    }
    const params = new URLSearchParams();
    params.append('sort', sort);
    /*params.append('race',race);
    params.append('gender',gender);
    params.append('major',major);
    params.append('income',income);
    params.append('grade',grade);
    params.append('state',state);*/



   
  (async () => {
      const rawResponse = await fetch("/list-scholarships", {method: 'POST', body: params}, 
      {
          headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
   }
      });
     const response = await rawResponse.json();

      /* }).then(response => response.json()).then((response) => {*/
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
                /*scholarships.push(response[i]);*/
               
                if(race=="none" || response[i][4].includes(race.split(",")[0])||response[i][4][0]==["none"]){
                    if(gender=="none"||response[i][5].includes(gender.split(",")[0])||response[i][5][0]==["none"]){

                        if(major=="none"||response[i][7].includes(major.split(",")[0])||response[i][7][0]==["none"]){

                            if(income=='none'||response[i][6].includes(income.split(",")[0])||response[i][6][0]==["none"]){
                                                    

                                if(grade=='none'||response[i][8].includes(grade.split(",")[0])||response[i][8][0]==["none"]){

                                    if(state=='none'||response[i][10].includes(state.split(",")[0])||response[i][10][0]==["none"]){
                                    scholarships.push(response[i]);
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
        })();
        }
        
           function createScholarships(scholarships,pagenum){
            /*const result = await resolveAfter1Second();*/
            return function(){
                 const scholarshipList = document.getElementById('scholarship-list');
                scholarshipList.innerHTML="";
                for(let i=pagenum*5-5;i<5*pagenum;i++){
                scholarshipList.appendChild(createScholarshipElement(scholarships[i]));
                }
            }
        }
    function resolveAfter1Second() {
        return new Promise(resolve => {
        setTimeout(() => {
      resolve('1');
    }, 10);
  });
}

        /** Creates a list element to display the comment */
        function createScholarshipElement(scholarship) {
            const containerElement=document.createElement('div');
            containerElement.setAttribute('class','container');
            const divElement = document.createElement('div');
            divElement.setAttribute('class','regular');

            const titleElement =document.createElement("h4");
            titleElement.innerText=scholarship[0];
            titleElement.style.display="none";
            divElement.appendChild(titleElement);
            //check if scholarship deadline is expired
           /* var currentDate=new Date();
            var scholarshipDate=new Date(scholarship[2]);
            if(scholarshipDate<currentDate){
                /*containerElement.style.display="none";
                titleElement.innerText=scholarship[0]+':EXPIRED';
                console.log('expired');
        }*/

            
            const calendarElement=document.createElement("h4");
            calendarElement.innerText=scholarship[2];
            calendarElement.style.display="none";
            divElement.appendChild(calendarElement);



            const circleElement= document.createElement('div');
            circleElement.setAttribute('class','circle');
            containerElement.appendChild(circleElement);

           /* var emailInToDoList=false;
            currentUserEmail=localStorage.getItem('userEmail');
            const params = new URLSearchParams();
            params.append('userEmail',currentUserEmail);
            fetch('/display-ToDoList',{method: 'POST', body: params}).then(response => response.json()).then((response) => {
                for(let i=0;i<response.length;i++){
                    if(response[i][12]==(scholarship[12])){
                        const checkMark=document.createElement('span');
                        checkMark.innerHTML='&#x2714;';
                        circleElement.appendChild(checkMark);
                        emailInToDoList=true;
                        console.log(emailInToDoList);
                    }
                }
           
            console.log(emailInToDoList);*/
            /*if(emailInToDoList==false){*/
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
                date=calendarElement.innerText;
                calendarTitle=titleElement.innerText;
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
            };
           

            containerElement.appendChild(formElement);
            };
            /*}
            });*/
            

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
                    newAmountInput.value=Number(scholarship[9]);
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
                        setAttributes(newRaceElement,{"value":x[i].value.split(",")[0],"type":"checkbox","name":"new-race"},scholarship[4]);
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
                        setAttributes(newGenderElement,{"value":x[i].value.split(",")[0],"type":"checkbox","name":"new-gender"},scholarship[5]);
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
                        setAttributes(newIncomeElement,{"value":x[i].value.split(",")[0],"type":"checkbox","name":"new-income"},scholarship[6]);
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
                        setAttributes(newMajorElement,{"value":x[i].value.split(",")[0],"type":"checkbox","name":"new-major"},scholarship[7]);
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
                        setAttributes(newGradeElement,{"value":x[i].value.split(",")[0],"type":"checkbox","name":"new-grade"},scholarship[8]);
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
                        setAttributes(newStateElement,{"value":x[i].value.split(",")[0],"type":"checkbox","name":"new-state"},scholarship[10]);
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
                        userUpClicked=true;
                        thumbsup.style.color="green";
                    }
            if(scholarship[16].includes(localStorage.getItem("userEmail"))){
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
                        userUpClicked=true;
                       scholarship[15].push(localStorage.getItem("userEmail"));
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
            if(scholarship[9]!="not specified"){
                amountValue.innerText='$'+thousands_separators(scholarship[9]);
            }
            else{
                amountValue.innerText=scholarship[9];
            }
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
        /*access users calendar*/
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
});
      }
function FindTaskList(){
    var taskListId;
    //check to see if Scholarship Tasks List exist
       gapi.client.tasks.tasklists.list({
        }).then(function(response) {
          var taskLists = response.result.items;
          if (taskLists && taskLists.length > 0) {
            for (var i = 0; i < taskLists.length; i++) {
              var taskList = taskLists[i];
              if(taskList.title=="My Tasks"){
                  taskListId=taskList.id;
                  console.log(taskListId);
                  createNewTasks(taskListId);
              }
            }
          } 
        });

}
function createNewTasks(id){
    gapi.client.tasks.tasks.insert({'tasklist':id,'title':calendarTitle,'notes':'make sure to get this done on time','due':date+'T12:00:00.000Z'}).then(function(response){});

}

function toDoListDisplay(type) {
    var newType=type;
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
                    if(type=='active'&& response[i][14].includes(response[i][12])&&!response[i][15].includes(response[i][12])&&!response[i][16].includes(response[i][12])){
                scholarshipList.appendChild(createToDoListElement(response[i],newType));
                }
                //check to display only complete scholarships
                else if(type=='completed'&& response[i][15].includes(response[i][12])){
                scholarshipList.appendChild(createToDoListElement(response[i],newType));

                }
                else if(type=="expired"&& response[i][16].includes(response[i][12])){
                    scholarshipList.appendChild(createToDoListElement(response[i],newType));

                }
                }
            

        }
            
       });
  
}
}
function createToDoListElement(scholarship,type){
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
    if(scholarship[9]!="not specified"){
        amountValue.innerText='$'+thousands_separators(scholarship[9]);
        }
    else{
        amountValue.innerText=scholarship[9];
        }
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
        const params = new URLSearchParams();
        params.append('scholarshipId', scholarship[12]);
        params.append('entityId',scholarship[13]);
        fetch('/completed', {method: 'POST', body: params});
        location.reload();

    }
    activeButton.onclick=function(){
        const params = new URLSearchParams();
        params.append('scholarshipId', scholarship[12]);
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