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

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URL; 
import java.util.Comparator;
import java.util.Collections;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.EntityNotFoundException;

/** Servlet responsible for listing tasks. */
@WebServlet("/update-vote")
public class UpdateVoteServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    long id=Long.parseLong(request.getParameter("id"));
    String thumbsup=request.getParameter("thumbsup");
    String thumbsdown=request.getParameter("thumbsdown");
    String upVoteEmailsString=request.getParameter("thumbsUpList");
    List upVoteEmails=Arrays.asList(upVoteEmailsString.split(","));

    String downVoteEmailsString=request.getParameter("thumbsDownList");
    List downVoteEmails=Arrays.asList(downVoteEmailsString.split(","));



    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        try {
            Key scholarshipEntityKey = KeyFactory.createKey("Scholarship", id);
        Entity scholarshipEntity=datastore.get(scholarshipEntityKey);
        scholarshipEntity.setProperty("thumbsup", thumbsup);
        scholarshipEntity.setProperty("thumbsdown",thumbsdown);
        scholarshipEntity.setProperty("upVoteEmails",upVoteEmails);
        scholarshipEntity.setProperty("downVoteEmails",downVoteEmails);
        datastore.put(scholarshipEntity);

        }catch (EntityNotFoundException e) {
		throw new RuntimeException("scholarship not found.");
        }
    
        

   

       response.setContentType("text/html");
    
     /* Redirect back to the HTML page.*/
    response.sendRedirect("displayScholarships.html"); 
  }
}