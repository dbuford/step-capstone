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






async function getData() {
  console.log('Getting Data');
  const response = await fetch('/data');
  const data = await response.text();
  console.log(data)
  document.getElementById('data-container').innerText = data;
}

function loadEntries() {
  fetch('/data').then(response => response.json()).then((entries) => {
    const entryListElement = document.getElementById('entry-list');
    entries.forEach((entry) => {
      console.log(entry.title)
      entryListElement.appendChild(createEntryElement(entry));
    })
  });
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




function loadPage() {
	add_info();
}


function loadInfo() {
	loadEntries();
}

// scholarships functions


// scholarships functions

function getUserScholarships(){
    fetch("current-user").then(response => response.json()).then((email) => {
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
                    getScholarships(entry.race,entry.gender,entry.major,entry.income);  
                }
                else{
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
function getScholarships(race,gender,major,income) {
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
                                scholarships.push(response[i]);
                                console.log(response[i]);
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
            

            const circleElement= document.createElement('div');
            circleElement.setAttribute('class','circle');
            containerElement.appendChild(circleElement);
            circleElement.onclick = function() { // Note this is a function
            console.log("blabla");
            const formElement=document.createElement('div');
            formElement.setAttribute('class','form-popup');
            formElement.setAttribute('id','form-popup');
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
                document.getElementById('form-popup').remove();
                const checkMark=document.createElement('span');
                checkMark.innerHTML='&#x2714;';
                circleElement.appendChild(checkMark);

            };

            const closeButton=document.createElement('button');
            closeButton.innerText='Close';
            formElement.appendChild(closeButton);
            closeButton.onclick=function(){
                document.getElementById('form-popup').remove();
                console.log("close button");
            };
           

            containerElement.appendChild(formElement);
            };
            

            var urlElement=document.createElement('a');
            var linkText=document.createTextNode(scholarship[0]);
            urlElement.appendChild(linkText);
            
            urlElement.title=scholarship[0];
            urlElement.setAttribute('href', scholarship[3]);
            urlElement.setAttribute('target', '_blank');
            divElement.appendChild(urlElement);
            

            const descriptionElement=document.createElement("p");
            descriptionElement.innerText=scholarship[1];
            divElement.appendChild(descriptionElement);

            const deadlineElement=document.createElement("h4");
            deadlineElement.innerText="DEADLINE: "+ scholarship[2];
            divElement.appendChild(deadlineElement);

            const requirementElement=document.createElement("p");
            requirementElement.innerText="Requirements: race/ethnicity:"+ scholarship[4]+", gender identity:"+scholarship[5]+", income:"+ scholarship[6]+", major:"+ scholarship[7];
            divElement.appendChild(requirementElement);
            

            containerElement.appendChild(divElement); 
            
            return containerElement;
            }


   