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
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.FetchOptions;
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
import java.util.Comparator;
import java.util.Collections;

/** Servlet responsible for listing tasks. */
@WebServlet("/list-scholarships")
public class ListScholarshipsServlet extends HttpServlet {
    String sorting;

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    
    /*long minHeight = 160;
    Filter propertyFilter =new FilterPredicate("amount", FilterOperator.EQUAL, minHeight);*/
    Query query = new Query("Scholarship").addSort("timestamp", SortDirection.DESCENDING);

    

    

    /*query.setFilter(propertyFilter);*/

   

    PreparedQuery results = datastore.prepare(query);


    ArrayList<ArrayList<Object>> scholarships = new ArrayList<>();

    for (Entity entity : results.asIterable()){
        String title = (String) entity.getProperty("title");
        String description= (String) entity.getProperty("description");
        String deadline= (String) entity.getProperty("deadline");
        String url= (String) entity.getProperty("url");
        String amount=(String) entity.getProperty("amount");
        String race=(String) entity.getProperty("race");
        String gender=(String) entity.getProperty("gender");
        String income=(String) entity.getProperty("income");
        String major=(String) entity.getProperty("major");
        String grade=(String) entity.getProperty("grade");
        String state=(String) entity.getProperty("state");
        String userEmail=(String) entity.getProperty("userEmail");
        int thumbsup= Integer.parseInt(entity.getProperty("thumbsup").toString());
        int thumbsdown=Integer.parseInt(entity.getProperty("thumbsdown").toString());
        long myid = entity.getKey().getId();
        Long id=new Long(myid);
        List upVoteEmails=(ArrayList) entity.getProperty("upVoteEmails");
        List downVoteEmails=(ArrayList) entity.getProperty("downVoteEmails");
    
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
        info.add(userEmail);
        info.add(id);
        info.add(thumbsup);
        info.add(thumbsdown);
        info.add(upVoteEmails);
        info.add(downVoteEmails);
        
        

        scholarships.add(info);
    }

scholarships.sort(new Comparator<ArrayList>() {
    @Override
    public int compare(ArrayList l1, ArrayList l2) {
        
        int l1none=0;
        int l2none=0;
        int amount1=0;
        int amount2=0;
        int l1thumbsup=0;
        int l1thumbsdown=0;
        int l2thumbsup=0;
        int l2thumbsdown=0;

        if(sorting.equals("requirements")){
            for(int i=4; i<11; i++){
                if(l1.get(i).equals("none")){
                    l1none++;
                }
                if(l2.get(i).equals("none")){
                    l2none++;
                }
            return l1none-l2none;
            
            }
        }

        if(sorting.equals("amount")){
            if(!l1.get(9).equals("not specified")&&!l2.get(9).equals("not specified")){
                amount1=Integer.parseInt(l1.get(9).toString())*-1;
                amount2=Integer.parseInt(l2.get(9).toString())*-1;
                return amount1-amount2;
            }
            if(!l1.get(9).equals("not specified")){
                return -1;
            }
            if(!l2.get(9).equals("not specified")){
                return 1;
            }
            else{
                return 0;
            }

        }
        if(sorting.equals("likes")){
                l1thumbsup=Integer.parseInt(l1.get(13).toString());
                l1thumbsdown=Integer.parseInt(l1.get(14).toString());

                int l1totalvotes=l1thumbsup+l1thumbsdown;
                int l1percentage;
                //if total votes>0, find percentage of up votes to total votes
                if(l1totalvotes!=0){
                    l1percentage=(int)(l1thumbsup/l1totalvotes);
                }
                //if total votes=0, set it equal to 1 then take percentage
                else{
                    l1totalvotes=1;
                    l1percentage=(int)(l1thumbsup/l1totalvotes);
                }

                l2thumbsup=Integer.parseInt(l2.get(13).toString());
                l2thumbsdown=Integer.parseInt(l2.get(14).toString());

                int l2totalvotes=l2thumbsup+l2thumbsdown;
                int l2percentage;
                //if total votes>0, find percentage of up votes to total votes
                if(l2totalvotes!=0){
                    l2percentage=(int)(l2thumbsup/l2totalvotes);
                }
                //if total votes=0, set it equal to 1 then take percentage
                else{
                    l2totalvotes=1;
                    l2percentage=(int)(l2thumbsup/l2totalvotes);
                }
                //if percentages of upvotes to total votes are equal, tiebreak using number of upvotes
                if(l1percentage-l2percentage==0){
                    return(-l1thumbsup+l2thumbsup);
                }

                return (-l1percentage+l2percentage);



        }
        else{
                   for(int i=4; i<11; i++){
            if(l1.get(i).equals("none")){
            l1none++;
            }
            if(l2.get(i).equals("none")){
            l2none++;
            }
    l1none=5*l1none;
    l2none=5*l2none;

    }
    if(!l1.get(9).equals("not specified")&&!l2.get(9).equals("not specified")){
        amount1=Integer.parseInt(l1.get(9).toString())*-1;
        amount2=Integer.parseInt(l2.get(9).toString())*-1;
    }
    l1thumbsup=2*Integer.parseInt(l1.get(13).toString());
    l1thumbsdown=-2*Integer.parseInt(l1.get(14).toString());

    l2thumbsup=2*Integer.parseInt(l2.get(13).toString());
    l2thumbsdown=-2*Integer.parseInt(l2.get(14).toString());

    int l1total=l1none+amount1+l1thumbsup+l1thumbsdown;
    int l2total=l2none+amount2+l2thumbsup+l2thumbsdown;
    
    
    System.out.println(l1total-l2total);
     return (l1total-l2total);

        }

 
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

@Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

      sorting=request.getParameter("sort");
      System.out.println(sorting);
      doGet(request,response);

}
}