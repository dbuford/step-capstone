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
import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
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
    public long timestamp;
    public String name;
    public String email;
    public String age;
    public String major;
    public String race;
    public String gender;
    public String income;
    public String grade;
    public String location;
    public String uploadUrl;
	
    
    public Info(long id, long timestamp, String name, String email, String age, String major, String gender, String race, String income, String grade, String location, String uploadUrl) {
      this.id = id;
      this.timestamp = timestamp;
      this.name = name;
      this.email = email;
      this.age = age;
      this.major =  major;
      this.race = race;
      this.gender = gender;
      this.income = income;
      this.grade = grade;
      this.location = location;
      this.uploadUrl = uploadUrl;
    }

    public long getId() {
      return id;
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
    public String getRace() {
        return race;
    }

    public String getIncome() {
        return income;
    }

    public String getGender() {
        return gender;
    }

    public String getGrade() {
        return grade;
    }

    public String getLocation() {
        return location;
    }
   

  }

  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  

  /** Responds with a JSON array containing comments data. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException { 

    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    
    String uploadUrl = blobstoreService.createUploadUrl("/my-form-handler");

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    

    Query query = new Query ("Info");

    PreparedQuery results = datastore.prepare(query);

    List<Info> information = new ArrayList<>();


    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      long timestamp = (long) entity.getProperty("timestamp");
      String name = (String) entity.getProperty("name");
      String email = (String) entity.getProperty("email");
      String age = (String) entity.getProperty("age");
      String major = (String) entity.getProperty("major");
      String gender = (String) entity.getProperty("gender");
      String race = (String) entity.getProperty("race");
      String income = (String) entity.getProperty("income");
      String grade = (String) entity.getProperty("grade");
      String location = (String) entity.getProperty("location");
      String url= (String) entity.getProperty("image");
      Info entry = new Info(id, timestamp, name, email, age, major, gender, race, income, grade, location, url);
      information.add(entry);
      System.out.println("working");

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
    
    String[] emailarray = request.getParameterValues("userEmail");

    System.out.println(emailarray);

    
   // Get the URL of the image that the user uploaded to Blobstore.
   // String imageUrl = getUploadedFileUrl(request, "image");
    
    // Must be logged in to add info
    String title = request.getParameter("title");
    String name = request.getParameter("name");
    String age = request.getParameter("age");
    String idname = request.getParameter("idname");
    long timestamp = System.currentTimeMillis();
    //String email = userService.getCurrentUser().getEmail();
    
    String[] empty={"none"};
    String[] racearray=request.getParameterValues("race");
    String race= racearray!=null ? String.join(" ",racearray): String.join(" ", empty);


    String[] genderarray=request.getParameterValues("gender");
    String gender= genderarray!=null ? String.join(" ",genderarray): String.join(" ", empty);
    
    String email=emailarray!=null ? String.join(" ",emailarray): String.join(" ", empty);
    

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
    entryEntity.setProperty("email", email);
    entryEntity.setProperty("age", age);
    entryEntity.setProperty("race",race);
    entryEntity.setProperty("gender", gender);
    entryEntity.setProperty("income", income);
    entryEntity.setProperty("major", major);
    entryEntity.setProperty("grade", grade);
    entryEntity.setProperty("location", location);
    //entryEntity.setProperty("image", url);
   // entryEntity.setProperty("image", imageUrl);
    datastore.put(entryEntity);

    response.sendRedirect("/response.html"); // could possibly add a redirect page ?
    
  }

  //public void updateCount(HttpServletRequest request, HttpServletResponse response) throws IOException {
 //   if (!(request.getParameter("maxcomments") == null)) {
  //   maxcount = Integer.parseInt(request.getParameter("maxcomments"));
 //  }
  
  //}

    /** Returns a URL that points to the uploaded file, or null if the user didn't upload a file. */
 /* private String getUploadedFileUrl(HttpServletRequest request, String formInputElementName) {
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
    List<BlobKey> blobKeys = blobs.get("image");

    // User submitted form without selecting a file, so we can't get a URL. (dev server)
    if (blobKeys == null || blobKeys.isEmpty()) {
      return null;
    }

    // Our form only contains a single file input, so get the first index.
    BlobKey blobKey = blobKeys.get(0);

    // User submitted form without selecting a file, so we can't get a URL. (live server)
    BlobInfo blobInfo = new BlobInfoFactory().loadBlobInfo(blobKey);
    if (blobInfo.getSize() == 0) {
      blobstoreService.delete(blobKey);
      return null;
    }

    // We could check the validity of the file here, e.g. to make sure it's an image file
    // https://stackoverflow.com/q/10779564/873165

    // Use ImagesService to get a URL that points to the uploaded file.
    ImagesService imagesService = ImagesServiceFactory.getImagesService();
    ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(blobKey);

    // To support running in Google Cloud Shell with AppEngine's devserver, we must use the relative
    // path to the image, rather than the path returned by imagesService which contains a host.
    try {
      URL url = new URL(imagesService.getServingUrl(options));
      return url.getPath();
    } catch (MalformedURLException e) {
      return imagesService.getServingUrl(options);
    }
  } */

}



