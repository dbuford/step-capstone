
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


@WebServlet("/completed")
public class completedIdServlet extends HttpServlet {
  String currentUser;
  
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
      long scholarshipId=Long.parseLong(request.getParameter("scholarshipId"));

      long entityId=Long.parseLong(request.getParameter("entityId"));


    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();



       try {
        Key toDoListEntityKey = KeyFactory.createKey("ToDoListScholarship", entityId);
        Entity toDoListEntity=datastore.get(toDoListEntityKey);
        ArrayList <Long> currentIds=(ArrayList)toDoListEntity.getProperty("completedscholarshipIdList");
        if (!currentIds.contains(scholarshipId)) {
            currentIds.add(scholarshipId);
        }
        

        toDoListEntity.setProperty("completedscholarshipIdList",currentIds);
        datastore.put(toDoListEntity);
    
     /* Redirect back to the HTML page.*/
    response.sendRedirect("/toDoList.html");

       }catch (EntityNotFoundException e) {
		throw new RuntimeException("scholarship not found.");
        }

   
  }

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}
