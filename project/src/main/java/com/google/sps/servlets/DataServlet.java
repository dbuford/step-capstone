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


/** Servlet that returns some example content. TODO: modify this file to handle comments data */
package com.google.sps.servlets;
import com.google.gson.Gson;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
// import com.google.sps.data.Task;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.util.*;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  /** Data holder for each individual email */
  public class Info {
    public long id;
    public String title;
    public long timestamp;
    public String name;
    public String email;
    public String age;
    public String major;


    public Info(long id, String title, long timestamp, String name, String email, String age, String major) {
      this.id = id;
      this.title = title;
      this.timestamp = timestamp;
      this.name = name;
      this.email = email;
      this.age = age;
      this.major =  major;
    }

    public long getId() {
      return id;
    }
    
    public String getTitle() {
      return title;
    }

    public long getTimestamp() {
      return timestamp;
    }

    public String getName() {
      return name;
    }

    public String getEmail() {
      return email;
    }
	
    public String getAge() {
        return age;
    }

    public String getMajor() {
        return major;
    }


  }


  // all options: "newest (descending), oldest (ascending)
  public String sort = "newest";
  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  

  /** Responds with a JSON array containing comments data. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    if (!(request.getParameter("sort") == null)) {
      sort = request.getParameter("sort");
    }
    Query query;
    if (sort.equals("newest")) {
      query = new Query("Info").addSort("timestamp", SortDirection.DESCENDING);
    } else if (sort.equals("oldest")) {
      query = new Query("Info").addSort("timestamp", SortDirection.ASCENDING);
    } else {
      query = new Query("Info").addSort("name", SortDirection.DESCENDING);
    }
    PreparedQuery results = datastore.prepare(query);
    int count = 0;

   // if (!(request.getParameter("maxcomments") == null)) {
 //     maxcount = Integer.parseInt(request.getParameter("maxcomments"));
    ///}

    

    List<Info> information = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String title = (String) entity.getProperty("title");
      long timestamp = (long) entity.getProperty("timestamp");
      String name = (String) entity.getProperty("name");
      String email = (String) entity.getProperty("email");
      String age = (String) entity.getProperty("age");
      String major = (String) entity.getProperty("major");
      Info entry = new Info(id, title, timestamp, name, email, age, major);
      information.add(entry);

    }

    response.setContentType("application/json;");
    Gson gson = new Gson();
    String json = gson.toJson(information);
    response.getWriter().println(json);
  }

  private String convertToJsonUsingGson(ArrayList<String> lst) {
    Gson gson = new Gson();
    String json = gson.toJson(lst);
    return json;
  }

  // A simple HTTP handler to extract text input from submitted web form and respond that context back to the user.
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    UserService userService = UserServiceFactory.getUserService();
    
    // Must be logged in to add info
    String title = request.getParameter("title");
    String name = request.getParameter("name");
    String age = request.getParameter("age");
	String major = request.getParameter("major");
    long timestamp = System.currentTimeMillis();
    String email = userService.getCurrentUser().getEmail();
    
    

    Entity entryEntity = new Entity("Info");
    entryEntity.setProperty("title", title);
    entryEntity.setProperty("name", name);
    entryEntity.setProperty("timestamp", timestamp);
    entryEntity.setProperty("email", email);
    entryEntity.setProperty("age", age);
    entryEntity.setProperty("major", major);
    datastore.put(entryEntity);

    response.sendRedirect("/response.html"); // could possibly add a redirect page ?
    
  }

  //public void updateCount(HttpServletRequest request, HttpServletResponse response) throws IOException {
   // if (!(request.getParameter("maxcomments") == null)) {
    //  maxcount = Integer.parseInt(request.getParameter("maxcomments"));
  //  }
  
  //}
}