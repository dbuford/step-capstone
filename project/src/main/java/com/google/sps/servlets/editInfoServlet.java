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


@WebServlet("/edit-Info")
public class editInfoServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {


    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();


    String[] empty={"none"};



       // Get the input from the form.
    String title= getParameter(request,"title", "");
    String name= getParameter(request,"name","");
    String age=getParameter(request,"age","");
    long timestamp = System.currentTimeMillis();


    String[] racearray=request.getParameterValues("race");
    List<String> race= racearray!=null ? Arrays.asList(racearray): Arrays.asList(empty);
    race = new ArrayList<>(race);

    race.add("none");
   


    String[] genderarray=request.getParameterValues("gender");
    List<String> gender= genderarray!=null ? Arrays.asList(genderarray): Arrays.asList(empty);
    gender = new ArrayList<>(gender);
    gender.add("none");
    

    String[] incomearray=request.getParameterValues("income");
    List<String> income= incomearray!=null ? Arrays.asList(incomearray): Arrays.asList(empty);
    income = new ArrayList<>(income);
    income.add("none");

    String[] emailarray = request.getParameterValues("userEmail");
    String userEmail=emailarray!=null ? String.join(", ",emailarray): String.join(" ", empty);


    String[] majorarray=request.getParameterValues("major");
    List<String> major= majorarray!=null ? Arrays.asList(majorarray): Arrays.asList(empty);
    major = new ArrayList<>(major);
    major.add("none");


    String[] gradearray=request.getParameterValues("grade");
    List<String> grade= gradearray!=null ? Arrays.asList(gradearray): Arrays.asList(empty);
    grade = new ArrayList<>(grade);
    grade.add("none");


    String[] locationarray=request.getParameterValues("location");
    List<String> location= locationarray!=null ? Arrays.asList(locationarray):Arrays.asList(empty);
    location = new ArrayList<>(location);
    location.add("none");

      Query query = new Query("Info").addSort("timestamp",SortDirection.DESCENDING);

      PreparedQuery results = datastore.prepare(query);
      for (Entity entity : results.asIterable()){
          if (entity.getProperty("email").equals(userEmail)){
              long id = entity.getKey().getId();
              System.out.println(id);
        
                try {
                    Key entryEntityKey = KeyFactory.createKey("Info", id); 
                    System.out.println(entryEntityKey);
                    Entity entryEntity=datastore.get(entryEntityKey);
                    entryEntity.setProperty("title",title);
                    entryEntity.setProperty("name",name);
                    entryEntity.setProperty("age",age);
                
                    entryEntity.setProperty("race",race);
                    entryEntity.setProperty("gender", gender);
                    entryEntity.setProperty("income", income);
                    entryEntity.setProperty("major", major);
                    entryEntity.setProperty("grade",grade);
                    entryEntity.setProperty("location",location);
                    datastore.put(entryEntity);

                    }catch (EntityNotFoundException e) {
                    throw new RuntimeException("user not found.");
                    } 

              break;
            

          }
      }

   




    response.setContentType("text/html");
    
     /* Redirect back to the HTML page.*/
    //response.sendRedirect("Profile.html");
  }

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}