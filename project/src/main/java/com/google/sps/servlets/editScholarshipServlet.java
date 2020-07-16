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
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.EntityNotFoundException;


@WebServlet("/edit-scholarship")
public class editScholarshipServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String title= getParameter(request,"new-title", "");
    String deadline= getParameter(request,"new-deadline","");
    String url=getParameter(request,"new-url","");
    String description=getParameter(request,"new-description","");
    long timestamp = System.currentTimeMillis();
    String amount=getParameter(request,"new-amount","");
    if(amount.equals("")){
        amount="not specified";
    }
    else{
        amount= amount;
    }

    /*String userEmail;

    UserService userService = UserServiceFactory.getUserService();
    if (userService.isUserLoggedIn()) {
      userEmail = userService.getCurrentUser().getEmail();
    }
    else{
        userEmail="none";
    }*/

     String[] empty={"none"};
    String[] racearray=request.getParameterValues("new-race");
    String race= racearray!=null ? String.join(" ",racearray): String.join(" ",empty);
   


    String[] genderarray=request.getParameterValues("new-gender");
    String gender= genderarray!=null ? String.join(" ",genderarray): String.join(" ",empty);
    

    String[] incomearray=request.getParameterValues("new-income");
    String income= incomearray!=null ? String.join(" ",incomearray): String.join(" ",empty);


    String[] majorarray=request.getParameterValues("new-major");
    String major= majorarray!=null ? String.join(" ", majorarray): String.join(" ",empty);

    String[] gradearray=request.getParameterValues("new-grade");
    String grade= gradearray!=null ? String.join(" ", gradearray): String.join(" ",empty);

    String[] statearray=request.getParameterValues("new-state");
    String state= statearray!=null ? String.join(" ",statearray): String.join(" ",empty);

    long id=Long.parseLong(request.getParameter("new-id"));
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();


     try {
        Key scholarshipEntityKey = KeyFactory.createKey("Scholarship", id);
        System.out.println(scholarshipEntityKey);
        Entity scholarshipEntity=datastore.get(scholarshipEntityKey);
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
        /*scholarshipEntity.setProperty("userEmail",userEmail);*/
        datastore.put(scholarshipEntity);

        }catch (EntityNotFoundException e) {
		throw new RuntimeException("scholarship not found.");
        }

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