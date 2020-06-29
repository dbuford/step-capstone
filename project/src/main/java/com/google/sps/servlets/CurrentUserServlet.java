package com.google.sps.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;


@WebServlet("/current-user")
public class CurrentUserServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
      String userEmail;

      UserService userService = UserServiceFactory.getUserService();
    if (userService.isUserLoggedIn()) {
      userEmail = userService.getCurrentUser().getEmail();
      
    }
    else{
        userEmail="none";
    }

     String json=convertToJsonUsingGson(userEmail);     

    // Send the JSON as the response

    response.setContentType("application/json;");
    response.getWriter().println(json);
    
  }

 private String convertToJsonUsingGson(String email) {
    Gson gson = new Gson();
    String json = gson.toJson(email);
    return json;
  }
  }