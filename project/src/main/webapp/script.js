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
  const commentCount = document.getElementById('maxcomments');
  console.log(commentCount.value)
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
  const commentCount = document.getElementById('maxcomments');
  console.log(commentCount.name)
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
  const sort = document.getElementById('sort');
  console.log(sort.value)
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

  const titleElement = document.createElement('span');
  titleElement.innerText = entry.title;

  const nameElement = document.createElement('span');
  if (entry.name === undefined || entry.name === "") {
    nameElement.innerHTML = "-- Anonymous".italics().bold();
  } else {
    nameElement.innerHTML = ("--" + entry.name).italics().bold();
  }
  nameElement.style.marginLeft = "15px"

  const emailElement = document.createElement('span');
  if (entry.displayemail === "on") {
    emailElement.innerHTML = "(" + entry.email + ")";
  } else {
    emailElement.innerHTML = "(Hidden email)"
  }
  emailElement.style.margin = "2px";

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


  entryElement.appendChild(titleElement);
  entryElement.appendChild(nameElement);
  entryElement.appendChild(emailElement);
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

