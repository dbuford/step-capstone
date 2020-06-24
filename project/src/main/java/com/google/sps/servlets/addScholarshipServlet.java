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

@WebServlet("/info")
public class addScholarshipServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String title= getParameter(request,"scholarship-title", "");
    String description=getParameter(request,"scholarship-description","");
    String deadline= getParameter(request,"scholarship-deadline","");
    String url=getParameter(request,"scholarship-link","");

    //check if title is empty

    if(title.isEmpty()){
        response.setContentType("text/html");
        response.getWriter().println("Please enter a valid Scholarship Title");
        return;
    }
    //check if description is empty
        if(description.isEmpty()){
        response.setContentType("text/html");
        response.getWriter().println("Please enter a valid Scholarship Description");
        return;
    }
    //check if deadline is empty
        if(deadline.isEmpty()){
        response.setContentType("text/html");
        response.getWriter().println("Please enter a valid Scholarship Deadline");
        return;
    }
    //check if url is empty
        if(url.isEmpty()){
        response.setContentType("text/html");
        response.getWriter().println("Please enter a valid Scholarship Link");
        return;
    }
    
    Entity scholarshipEntity=new Entity("Scholarship");
    scholarshipEntity.setProperty("title",title);
    scholarshipEntity.setProperty("description",description);
    scholarshipEntity.setProperty("deadline",deadline);
    scholarshipEntity.setProperty("url",url);

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