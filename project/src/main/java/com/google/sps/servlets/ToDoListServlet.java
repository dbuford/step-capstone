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
import java.util.Comparator;
import java.util.Collections;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.text.DateFormat;
import java.text.ParseException;
import java.time.LocalDate;


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
    idList.add(Long.valueOf(1));
    idList.add(newId);

    ArrayList<Long> idList2 = new ArrayList<Long>();
    idList2.add(Long.valueOf(1));

    ArrayList<Long> idList3 = new ArrayList<Long>();
    idList3.add(Long.valueOf(1));

    ArrayList<String> idPriority=new ArrayList<String>();
    idPriority.add("none");
    idPriority.add("none");

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query("ToDoListScholarship");

    PreparedQuery results = datastore.prepare(query);


    ArrayList<ArrayList<Object>> scholarships = new ArrayList<>();
    boolean user_exist = false;
    for (Entity entity : results.asIterable()){
      if(entity.getProperty("user").equals(userEmail)){
        ArrayList <Long> currentIds=(ArrayList)entity.getProperty("scholarshipIdList");

        ArrayList <Long> currentIds2=(ArrayList)entity.getProperty("completedscholarshipIdList");

        ArrayList <Long> currentIds3 = (ArrayList)entity.getProperty("expiredList");

        ArrayList <String> currentIdPriority=(ArrayList)entity.getProperty("idPriorityList");
        if(!currentIds.contains(newId)){

        currentIds.add(newId);
        currentIdPriority.add("none");
        entity.setProperty("scholarshipIdList",currentIds);

        entity.setProperty("completedscholarshipIdList",currentIds2);

        entity.setProperty("expiredList", currentIds3);

        entity.setProperty("idPriorityList",currentIdPriority);

        datastore.put(entity);
        }
        user_exist = true;
        break;
      }
    }
      if (user_exist == false){
        Entity userToDoList = new Entity("ToDoListScholarship");
        userToDoList.setProperty("user", userEmail);
        userToDoList.setProperty("scholarshipIdList", idList);

        userToDoList.setProperty("completedscholarshipIdList", idList2);

        userToDoList.setProperty("expiredList", idList3);

        userToDoList.setProperty("idPriorityList",idPriority);

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
    ArrayList<Long> getIds=new ArrayList<Long>();


    ArrayList<Long> getIds2=new ArrayList<Long>();

    ArrayList<Long> getIds3 = new ArrayList<Long>();

    ArrayList<String> getPriority=new ArrayList<String>();
    long entityId=0;

    for (Entity entity : results.asIterable()){
        if(entity.getProperty("user").equals(currentUser)){
            getIds=(ArrayList)entity.getProperty("scholarshipIdList");

            getIds2=(ArrayList)entity.getProperty("completedscholarshipIdList");

            getIds3=(ArrayList)entity.getProperty("expiredList");

            getPriority=(ArrayList) entity.getProperty("idPriorityList");
            entityId = entity.getKey().getId();

            break;
        }
    }
    if(getIds!=null){
        for(int i=0;i<getIds.size();i++){
            if(getIds.get(i)!=1){
            Long idLong=getIds.get(i);
            long id=idLong.longValue();
            try{
            Key scholarshipEntityKey = KeyFactory.createKey("Scholarship", id);
            Entity scholarshipEntity=datastore.get(scholarshipEntityKey);
            String title = (String) scholarshipEntity.getProperty("title");
            String description= (String) scholarshipEntity.getProperty("description");
            String deadline= (String) scholarshipEntity.getProperty("deadline");
            LocalDate currentDate = LocalDate.now();
            LocalDate scholarshipDate = LocalDate.parse(deadline);

            
            if(scholarshipDate.compareTo(currentDate) < 0){
              Key ToDoListScholarshipKey = KeyFactory.createKey("ToDoListScholarship", entityId);
              System.out.println(ToDoListScholarshipKey);
              Entity entity=datastore.get(ToDoListScholarshipKey);
              /*getIds.remove(id);*/
              if(!getIds3.contains(id)){
              getIds3.add(id);

              }
              entity.setProperty("scholarshipIdList", getIds);
              entity.setProperty("expiredList", getIds3);
              datastore.put(entity);
            }
            
            String url= (String) scholarshipEntity.getProperty("url");
            String amount=(String) scholarshipEntity.getProperty("amount");
            List race=(ArrayList) scholarshipEntity.getProperty("race");
            List gender=(ArrayList) scholarshipEntity.getProperty("gender");
            List income=(ArrayList) scholarshipEntity.getProperty("income");
            List major=(ArrayList) scholarshipEntity.getProperty("major");
            List grade=(ArrayList) scholarshipEntity.getProperty("grade");
            List state=(ArrayList) scholarshipEntity.getProperty("state");
            String priority=(String)getPriority.get(i);

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
            info.add(priority);
            info.add(id);
            info.add(entityId);
            info.add(getIds);
            info.add(getIds2);
            info.add(getIds3);
        
            scholarships.add(info);
            }catch (EntityNotFoundException e) {
		        throw new RuntimeException("scholarship not found.");
            };

        }
        }

    }

    scholarships.sort(new Comparator<ArrayList>() {
    @Override
    public int compare(ArrayList l1, ArrayList l2) {
        int l1priority=0;
        int l2priority=0;

        String l1priorityString=l1.get(11).toString();
        String l2priorityString=l2.get(11).toString();

        if(l1priorityString.equals("high")){
            l1priority=3;
        }
        if(l2priorityString.equals("high")){
            l2priority=3;
        }
        if(l1priorityString.equals("medium")){
            l1priority=2;
        }
        if(l2priorityString.equals("medium")){
            l2priority=2;
        }
        if(l1priorityString.equals("low")){
            l1priority=1;
        }
        if(l2priorityString.equals("low")){
            l2priority=1;
        }

        return(-l1priority+l2priority);

    }
    });

    
    
    
  
      String json=convertToJsonUsingGson(scholarships);

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