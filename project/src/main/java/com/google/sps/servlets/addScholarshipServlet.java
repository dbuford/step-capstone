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
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@WebServlet("/info")
public class addScholarshipServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String title= getParameter(request,"scholarship-title", "");
    String description=getParameter(request,"scholarship-description","");
    String deadline= getParameter(request,"scholarship-deadline","");
    String url=getParameter(request,"scholarship-link","");
    String amount=getParameter(request,"scholarship-amount","");
    if(amount.equals("")){
        amount="not specified";
    }
    else{
        amount=amount;
    }

   String[] empty={"none"};
    String[] racearray=request.getParameterValues("race");
    List<String> race= racearray!=null ? Arrays.asList(racearray): Arrays.asList(empty);
   


    String[] genderarray=request.getParameterValues("gender");
    List<String> gender= genderarray!=null ? Arrays.asList(genderarray): Arrays.asList(empty);
    

    String[] incomearray=request.getParameterValues("income");
    List<String> income= incomearray!=null ? Arrays.asList(incomearray): Arrays.asList(empty);


    String[] majorarray=request.getParameterValues("major");
    List<String> major= majorarray!=null ? Arrays.asList(majorarray): Arrays.asList(empty);

    String[] gradearray=request.getParameterValues("grade");
    List<String> grade= gradearray!=null ? Arrays.asList(gradearray): Arrays.asList(empty);

    String[] statearray=request.getParameterValues("state");
    List<String> state= statearray!=null ? Arrays.asList(statearray): Arrays.asList(empty);

    long timestamp = System.currentTimeMillis();

    String thumbsup="0";
    String thumbsdown="0";

List<String> upVoteEmails=new ArrayList<String>();
List<String> downVoteEmails=new ArrayList<String>();
upVoteEmails.add("filler");
downVoteEmails.add("filler");


    String[] emailarray = request.getParameterValues("addScholarship-user-email");
    String userEmail=emailarray!=null ? String.join(" ",emailarray): String.join(" ", empty);


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
    scholarshipEntity.setProperty("amount",amount);
    scholarshipEntity.setProperty("timestamp", timestamp);
    scholarshipEntity.setProperty("race",race);
    scholarshipEntity.setProperty("gender", gender);
    scholarshipEntity.setProperty("income", income);
    scholarshipEntity.setProperty("major", major);
    scholarshipEntity.setProperty("grade",grade);
    scholarshipEntity.setProperty("state",state);
    scholarshipEntity.setProperty("userEmail",userEmail);
    scholarshipEntity.setProperty("thumbsup",thumbsup);
    scholarshipEntity.setProperty("thumbsdown",thumbsdown);
    scholarshipEntity.setProperty("upVoteEmails",upVoteEmails);
    scholarshipEntity.setProperty("downVoteEmails",downVoteEmails);

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