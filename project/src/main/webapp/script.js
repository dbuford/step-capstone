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
function getScholarships() {
   fetch('/list-scholarships').then(response => response.json()).then((scholarships) => {
       if(scholarships.length==0){
                const divElement=document.createElement('div');
                const titleElement=document.createElement("h2");
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
                    pageButton.addEventListener("click",createScholarships(scholarships,pagenum));
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
                        pageButton.addEventListener("click",createScholarships(scholarships,pagenum));
                        if(pagenum===1){
                            pageButton.click();
                        }
                        pagenum++;
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
            const divElement = document.createElement('div');

            const titleElement=document.createElement("h2");
            titleElement.innerText=scholarship[0];
            divElement.appendChild(titleElement);

            const descriptionElement=document.createElement("h5");
            descriptionElement.innerText=scholarship[1];
            divElement.appendChild(descriptionElement);

            const deadlineElement=document.createElement("h5");
            deadlineElement.innerText="deadline "+ scholarship[2];
            divElement.appendChild(deadlineElement);

            var urlElement=document.createElement('a');
            var linkText=document.createTextNode(scholarship[0]+ " link");
            urlElement.appendChild(linkText);
            urlElement.title=scholarship[0]+" link";
            urlElement.setAttribute('href', scholarship[3]);
            urlElement.setAttribute('target', '_blank');
            divElement.appendChild(urlElement);
            console.log(scholarship[3]);


            return divElement;
        }
