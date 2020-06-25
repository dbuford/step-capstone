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

package com.google.sps.servlets;

import java.io.IOException;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;
import javax.script.*;
import java.io.PrintWriter;
import java.util.Collections;

@WebServlet("/info")
public class addScholarshipServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String title= getParameter(request,"scholarship-title", "");
    String description=getParameter(request,"scholarship-description","");
    String deadline= getParameter(request,"scholarship-deadline","");
    String url=getParameter(request,"scholarship-link","");

   String[] empty={"none"};
    String[] race=request.getParameterValues("race");
    List racelist= race!=null ? Arrays.asList(race): Arrays.asList(empty);
   


    String[] gender=request.getParameterValues("gender");
    List genderlist= gender!=null ? Arrays.asList(gender): Arrays.asList(empty);
    

    String[] income=request.getParameterValues("income");
    List incomelist= income!=null ? Arrays.asList(income): Arrays.asList(empty);


    String[] major=request.getParameterValues("major");
    List majorlist= major!=null ? Arrays.asList(major): Arrays.asList(empty);


    long timestamp = System.currentTimeMillis();

    //check if any Scholarship details is empty

    if(title.isEmpty()|| description.isEmpty()|| deadline.isEmpty()|| url.isEmpty()){
        response.setContentType("text/html");
        response.getWriter().println("Please fill out all Scholarship information");
        return;
    }
    
    Entity scholarshipEntity=new Entity("Scholarship");
    scholarshipEntity.setProperty("title",title);
    scholarshipEntity.setProperty("description",description);
    scholarshipEntity.setProperty("deadline",deadline);
    scholarshipEntity.setProperty("url",url);
    scholarshipEntity.setProperty("timestamp", timestamp);
    scholarshipEntity.setProperty("race",racelist);
    scholarshipEntity.setProperty("gender", genderlist);
    scholarshipEntity.setProperty("income", incomelist);
    scholarshipEntity.setProperty("major", majorlist);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(scholarshipEntity);

    response.setContentType("text/html");
    
     /* Redirect back to the HTML page.*/
    response.sendRedirect("displayScholarships.html");
  }

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }

}