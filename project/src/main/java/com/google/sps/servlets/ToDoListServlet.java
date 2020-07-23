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


@WebServlet("/display-ToDoList")
public class ToDoListServlet extends HttpServlet {
  String currentUser;
  
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    if (request.getParameter("email")!=null){

    long id=Long.parseLong(request.getParameter("id"));
    Long newId = new Long(id);
    String userEmail=request.getParameter("email");

    ArrayList<Long> idList = new ArrayList<Long>();
    idList.add(newId);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query("ToDoListScholarship");

    PreparedQuery results = datastore.prepare(query);


    ArrayList<ArrayList<Object>> scholarships = new ArrayList<>();
    boolean user_exist = false;
    for (Entity entity : results.asIterable()){
      if(entity.getProperty("user").equals(userEmail)){
        ArrayList <Long> currentIds=(ArrayList)entity.getProperty("scholarshipIdList");
        ArrayList <Long> currentIds2=(ArrayList)entity.getProperty("completedscholarshipIdList");
        currentIds.add(newId);
        entity.setProperty("scholarshipIdList",currentIds);
        entity.setProperty("completedscholarshipIdList",currentIds2);
        datastore.put(entity);
        user_exist = true;
        break;
      }
    }
      if (user_exist == false){
        Entity userToDoList = new Entity("ToDoListScholarship");
        System.out.println("USEREXISTISFALSE");
        userToDoList.setProperty("user", userEmail);
        userToDoList.setProperty("scholarshipIdList", idList);
        userToDoList.setProperty("completedscholarshipIdList", idList);
        datastore.put(userToDoList);
      }

    }
    else{
        currentUser=request.getParameter("userEmail");
        doGet(request,response);
    }
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
     

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Query query = new Query("ToDoListScholarship");
    
    PreparedQuery results = datastore.prepare(query);


    ArrayList<ArrayList<Object>> scholarships = new ArrayList<>();
    System.out.println(currentUser);
    ArrayList<Long> getIds=new ArrayList<Long>();

    ArrayList<Long> getIds2=new ArrayList<Long>();
    for (Entity entity : results.asIterable()){
        if(entity.getProperty("user").equals(currentUser)){
            System.out.println("line90");
            getIds=(ArrayList)entity.getProperty("scholarshipIdList");
            getIds2=(ArrayList)entity.getProperty("completedscholarshipIdList");
            break;
        }
    }
    if(getIds!=null){
        for(Long idLong:getIds){
            long id=idLong.longValue();
            try{
            Key scholarshipEntityKey = KeyFactory.createKey("Scholarship", id);
            System.out.println("working part 4");
            System.out.println(scholarshipEntityKey);
            Entity scholarshipEntity=datastore.get(scholarshipEntityKey);
            String title = (String) scholarshipEntity.getProperty("title");
            String description= (String) scholarshipEntity.getProperty("description");
            String deadline= (String) scholarshipEntity.getProperty("deadline");
            String url= (String) scholarshipEntity.getProperty("url");
            String amount=(String) scholarshipEntity.getProperty("amount");
            String race=(String) scholarshipEntity.getProperty("race");
            String gender=(String) scholarshipEntity.getProperty("gender");
            String income=(String) scholarshipEntity.getProperty("income");
            String major=(String) scholarshipEntity.getProperty("major");
            String grade=(String) scholarshipEntity.getProperty("grade");
            String state=(String) scholarshipEntity.getProperty("state");

            ArrayList<Object> info=new ArrayList<>();
            info.add(title);
            info.add(description);
            info.add(deadline);
            info.add(url);
            info.add(race);
            info.add(gender);
            info.add(income);
            info.add(major);
            info.add(grade);
            info.add(amount);
            info.add(state);
        
            scholarships.add(info);
            }catch (EntityNotFoundException e) {
		        throw new RuntimeException("scholarship not found.");
            };

        }

    }
    
    
    
  
      String json=convertToJsonUsingGson(scholarships);
      System.out.println(scholarships.toString());

    // Send the JSON as the response

    response.setContentType("application/json;");
    response.getWriter().println(json);

  }
    
  

 private String convertToJsonUsingGson(ArrayList scholarships) {
    Gson gson = new Gson();
    String json = gson.toJson(scholarships);
    return json;
  }

}