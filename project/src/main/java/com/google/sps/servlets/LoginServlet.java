
package com.google.sps.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/logins")
public class LoginServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("text/html");

    UserService userService = UserServiceFactory.getUserService();
    if (userService.isUserLoggedIn()) {
      String userEmail = userService.getCurrentUser().getEmail();
      String urlToRedirectToAfterUserLogsOut = "/";
      String logoutUrl = userService.createLogoutURL(urlToRedirectToAfterUserLogsOut);

      response.getWriter().println("<p>Welcome " + userEmail + "!</p>");
      response.getWriter().println("<p>Feel free to Logout <a href=\"" + logoutUrl + "\"><button style=\"padding:0px 3px 0px 3px\" class=\"button button_blue hoverable valign-container z-depth-1\"><p class=\"valign\"> <i>Logout</i> </p></button></a></p>");
    } else {
      String urlToRedirectToAfterUserLogsIn = "/";
      String loginUrl = userService.createLoginURL(urlToRedirectToAfterUserLogsIn);

      response.getWriter().println("<p>Please <a href=\"" + loginUrl + "\"><button style=\"padding:0px 3px 0px 3px\" class=\"button button_blue hoverable valign-container z-depth-1\"><p class=\"valign\"> <i>Login</i> </p></button></a> to Login.</p>");
    }
  }
}