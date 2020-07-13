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

@WebServlet("/edit-profile")
public class editProfileServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.

    long id=Long.parseLong(request.getParameter("new-id"));


    Key entryEntityKey = KeyFactory.createKey("Info", id);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.delete(entryEntityKey);

    System.out.println(id);

    String userEmail;

    // Must be logged in to add info
    String title = request.getParameter("title");
    String name = request.getParameter("name");
    String age = request.getParameter("age");
    long timestamp = System.currentTimeMillis();
   // String email = userService.getCurrentUser().getEmail();
    
    String[] empty={"none"};
    String[] racearray=request.getParameterValues("race");
    String race= racearray!=null ? String.join(" ",racearray): String.join(" ", empty);


    String[] genderarray=request.getParameterValues("gender");
    String gender= genderarray!=null ? String.join(" ",genderarray): String.join(" ", empty);
    

    String[] incomearray=request.getParameterValues("income");
    String income= incomearray!=null ? String.join(" ",incomearray): String.join(" ", empty);


    String[] majorarray=request.getParameterValues("major");
    String major= majorarray!=null ? String.join(" ",majorarray): String.join(" ", empty);

    String[] gradearray=request.getParameterValues("grade");
    String grade= gradearray!=null ? String.join(" ",gradearray): String.join(" ", empty);


    String[] locationarray=request.getParameterValues("location");
    String location= locationarray!=null ? String.join(" ",locationarray): String.join(" ", empty);


    Entity entryEntity = new Entity("Info");
    entryEntity.setProperty("title", title);
    entryEntity.setProperty("name", name);
    entryEntity.setProperty("timestamp", timestamp);
    //entryEntity.setProperty("email", email);
    entryEntity.setProperty("age", age);
    entryEntity.setProperty("race",race);
    entryEntity.setProperty("gender", gender);
    entryEntity.setProperty("income", income);
    entryEntity.setProperty("major", major);
    entryEntity.setProperty("grade", grade);
    entryEntity.setProperty("location", location);
    datastore.put(entryEntity);

    response.setContentType("text/html");
    
     /* Redirect back to the HTML page.*/
    response.sendRedirect("Profile.html");
  }

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}