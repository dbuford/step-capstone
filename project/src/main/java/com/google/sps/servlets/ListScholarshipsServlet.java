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
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URL; 

/** Servlet responsible for listing tasks. */
@WebServlet("/list-scholarships")
public class ListScholarshipsServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    
    Query query = new Query("Scholarship").addSort("timestamp", SortDirection.DESCENDING);

    PreparedQuery results = datastore.prepare(query);


    ArrayList<ArrayList> scholarships = new ArrayList<>();

    for (Entity entity : results.asIterable()){
        String title = (String) entity.getProperty("title");
        String description= (String) entity.getProperty("description");
        String deadline= (String) entity.getProperty("deadline");
        String url= (String) entity.getProperty("url");
        String race=(String) entity.getProperty("race");
        String gender=(String) entity.getProperty("gender");
        String income=(String) entity.getProperty("income");
        String major=(String) entity.getProperty("major");

        ArrayList<String> info=new ArrayList<>();
        info.add(title);
        info.add(description);
        info.add(deadline);
        info.add(url);
        info.add(race);
        info.add(gender);
        info.add(income);
        info.add(major);
        

        scholarships.add(info);
    }
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