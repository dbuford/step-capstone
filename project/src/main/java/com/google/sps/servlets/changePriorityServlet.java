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
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.EntityNotFoundException;


@WebServlet("/change-priority")
public class changePriorityServlet extends HttpServlet {
  String currentUser;
  
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
      long scholarshipId=Long.parseLong(request.getParameter("scholarshipId"));

      long entityId=Long.parseLong(request.getParameter("entityId"));

      String priorityValue=request.getParameter("priorityValue");

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();



       try {
        Key toDoListEntityKey = KeyFactory.createKey("ToDoListScholarship", entityId);
        Entity toDoListEntity=datastore.get(toDoListEntityKey);
        ArrayList <Long> currentIds=(ArrayList)toDoListEntity.getProperty("scholarshipIdList");
        int scholarshipidx=currentIds.indexOf(scholarshipId);
        ArrayList <String> currentIdPriority=(ArrayList)toDoListEntity.getProperty("idPriorityList");
        currentIdPriority.set(scholarshipidx,priorityValue);

        toDoListEntity.setProperty("idPriorityList",currentIdPriority);
        datastore.put(toDoListEntity);
       }catch (EntityNotFoundException e) {
		throw new RuntimeException("scholarship not found.");
        }

    response.setContentType("text/html");
    
     /* Redirect back to the HTML page.*/
    response.sendRedirect("toDoList.html");
  }

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}

   
