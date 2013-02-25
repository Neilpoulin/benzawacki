package benzawacki;

import java.util.List;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Text;

public class HtmlGenerator {
	
	static int count = 0;
	
	public HtmlGenerator(){
		
	}
	
	public String generateHtml(String id){
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();		
		Key getKey = KeyFactory.createKey("Articles", id);			
		String result = null;
		try {
			Entity article = datastore.get(getKey);
			result = "{\"info\":" + getJson(article) + ", \"html\": " + getHtml(article) + "}";
//			datastore.delete(getKey);	
		} catch (EntityNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	

	public  String generateHtml(String num, String start, String direction){
		String html = "[";
		
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		
		Query.SortDirection sortDir = Query.SortDirection.DESCENDING;
		if (direction.equals("ascending")){
			sortDir = Query.SortDirection.ASCENDING; 
		}
		
		Query query = new Query("Articles");
		
		
		FetchOptions opts = FetchOptions.Builder.withDefaults();
		if (num.equals("all")){
			query.addSort("index", sortDir);
		} else if( num.equals("single")){
			query.addFilter("index", FilterOperator.EQUAL, Integer.parseInt(start));			
		} else {	
			int aNum = Integer.parseInt(num);
			int aStart = Integer.parseInt(start);
			opts = FetchOptions.Builder.withLimit(aNum).offset(aStart);
			query.addSort("index", sortDir);
		}
		
		List<Entity> articlesList = datastore.prepare(query).asList(opts);
		
		String entry = "";
		String out = "[";
		int index = 0;

		for (Entity article: articlesList){ // for loop to build html from query results
			if (index != 0){
				html += ",\"";
			} else {
				html += "\"";
			}
			
			//initialize article variables from query results
			String title = (String) article.getProperty("title");
			String content = ((Text) article.getProperty("content")).getValue();
			String summary = (String) article.getProperty("summary");
			String blobKey = (String) article.getProperty("blobKey");
			String tags = (String) article.getProperty("tags");
			String postDate = (String) article.getProperty("postDate");
			String uploadDate = (String) article.getProperty("uploadDate");
			String location = (String) article.getProperty("location");
			String articleIndex = (String) article.getProperty("index");
			String shortUrl = (String) article.getProperty("shortUrl");
			String articleId = (String) article.getProperty("articleId");
			entry = "{"
					+ "\"title\" : " + "\"" + title + "\", " 
					+ "\"content\" : " + "\"" + content + "\", "
					+ "\"summary\" : " + "\"" + summary + "\", "
					+ "\"blobKey\" : " +  "\"" + blobKey + "\", "
					+ "\"tags\" : " + "\"" + tags + "\", "
					+ "\"postDate\" : " + "\"" + postDate + "\", "
					+ "\"uploadDate\" : " + "\"" + uploadDate + "\","
					+ "\"index\" : " + "\"" + articleIndex + "\","
					+ "\"shortUrl\" : " + "\"" + shortUrl + "\","
					+ "\"location\" : " + "\"" + location + "\","
					+ "\"articleId\" : " + "\"" + articleId + "\""
					+ "}";
			
			String taghtml = "";
			if (tags.length() > 0){
				taghtml = "<p class='tag'>tags:";
			}
			
			String[] tagList = tags.split(",", -1);
			for (int j=0; j < tagList.length; j++){
				taghtml += "<span class='tag'>" + tagList[j] + "</span>";
				if (j != tagList.length-1){
					taghtml += ", ";
				}
			}
			taghtml += "</p>";
			
			String img = "";
			if (! blobKey.equals("")){
				img = "<img class='thumb article title"+ "'src='/serve?blobKey="+ blobKey + "'/>";
			}
			
			String href = "/article.jsp?num=1&amp;index=" + articleIndex + "&amp;dir=descending";
			String url = "http://www.benzawacki.com" + href;
			String shorturl = shortUrl; 
			
			html += img
					+ "<h2>"+ title + "</h2>"
					+ "<p class='date'>" + postDate + " | "+ location +"</p>"
					+ taghtml;
					
			if (summary.equals("") ){
				html += "<div class='summary nodisplay'> " + summary + "</div>";
			} else{
				html += "<div class='summary'> " + summary + "</div>";
			}
					
			if (content.equals("") ){
				html += 	
					 "<div class='clear'></div>"
					+ "<div class='content nodisplay'>" + "</div>"
					+ "<div class='fb-comments' data-href='"+ shorturl +"' data-num-posts='7' data-width='400'></div>";
			} else {
				html += 
					"<div class='clear'></div>" 
					+ "<button class='expand'>Toggle Content</button>"
					+ "<div class='clear'></div>"
					+ "<div class='content'>" 
						+ "<div class='clearfix'>" + content + "</div>" 
						+ "<br>"
						+ "<button class='expand clearfix'>Show Less</button>"
						+"<hr>"
						+"<div class='fb-comments' data-href='"+ shorturl +"' data-num-posts='7' data-width='400'></div>"
					+ "</div>";
			}
			
			html += 
					"<div class='socialDIV'>"
							+ "<div class='container-tweet'><a href='https://twitter.com/share?url=" + shorturl + "&text=" + "'Check out this article from Ben Zawacki\'s website"+"&via=benzawacki' class='twitter-share-button' data-url='" + shorturl + "' data-text='Check out this article from Ben Zawacki's website' data-via='BenZawacki' data-size='medium' data-lang='en'  data-counturl='" + url + "'>Tweet</a></div>"
							+ "<div class='container-plusone'><div class='g-plusone' data-size='medium' data-href='" + shorturl + "'></div></div>"
							+ "<div class='fb-like' data-href='" + shorturl + "' data-send='true' data-layout='button_count' data-width='150' data-show-faces='false'></div>"
					+"</div>";
		
		
			if (index == 0){
				out += entry;
			} else {
				out += ", " + entry;	
			}
			index++;
			html+= "\"";
		} //end for loop
		html += "]";
		out += "]";
		
		
		String result = "{\"info\":" + out + ", \"html\": " + html + "}";
		//System.out.println(result);
		return result;
	}
	
	
	private String getHtml(Entity article){
		String html = "[\"";		

		//initialize article variables from query results
		String title = (String) article.getProperty("title");
		String content = ((Text) article.getProperty("content")).getValue();
		String summary = (String) article.getProperty("summary");
		String blobKey = (String) article.getProperty("blobKey");
		String tags = (String) article.getProperty("tags");
		String postDate = (String) article.getProperty("postDate");
		String uploadDate = (String) article.getProperty("uploadDate");
		String location = (String) article.getProperty("location");
		String articleIndex = (String) article.getProperty("index");
		String shortUrl = (String) article.getProperty("shortUrl");
		String articleId = (String) article.getProperty("articleId");

		String taghtml = "";
		if (tags.length() > 0){
			taghtml = "<p class='tag'>tags:";
		}
		
		String[] tagList = tags.split(",", -1);
		for (int j=0; j < tagList.length; j++){
			taghtml += "<span class='tag'>" + tagList[j] + "</span>";
			if (j != tagList.length-1){
				taghtml += ", ";
			}
		}
		taghtml += "</p>";
		
		String img = "";
		if (! blobKey.equals("")){
			img = "<img class='thumb article title"+ "'src='/serve?blobKey="+ blobKey + "'/>";
		}
		
		String href = "/article.jsp?num=1&amp;index=" + articleIndex + "&amp;dir=descending";
		String url = "http://www.benzawacki.com" + href;
		String shorturl = shortUrl; 
		
		html += img
				+ "<h2>"+ title + "</h2>"
				+ "<p class='date'>" + postDate + " | "+ location +"</p>"
				+ taghtml;
				
		if (summary.equals("") ){
			html += "<div class='summary nodisplay'> " + summary + "</div>";
		} else{
			html += "<div class='summary'> " + summary + "</div>";
		}
				
		if (content.equals("") ){
			html += 	
				 "<div class='clear'></div>"
				+ "<div class='content nodisplay'>" + "</div>"
				+ "<div class='fb-comments' data-href='"+ shorturl +"' data-num-posts='7' data-width='400'></div>";
		} else {
			html += 
				"<div class='clear'></div>" 
				+ "<button class='expand'>Toggle Content</button>"
				+ "<div class='clear'></div>"
				+ "<div class='content'>" 
					+ "<div class='clearfix'>" + content + "</div>" 
					+ "<br>"
					+ "<button class='expand clearfix'>Show Less</button>"
					+"<hr>"
					+"<div class='fb-comments' data-href='"+ shorturl +"' data-num-posts='7' data-width='400'></div>"
				+ "</div>";
		}
		
		html += 
				"<div class='socialDIV'>"
						+ "<div class='container-tweet'><a href='https://twitter.com/share?url=" + shorturl + "&text=" + "'Check out this article from Ben Zawacki\'s website"+"&via=benzawacki' class='twitter-share-button' data-url='" + shorturl + "' data-text='Check out this article from Ben Zawacki's website' data-via='BenZawacki' data-size='medium' data-lang='en'  data-counturl='" + url + "'>Tweet</a></div>"
						+ "<div class='container-plusone'><div class='g-plusone' data-size='medium' data-href='" + shorturl + "'></div></div>"
						+ "<div class='fb-like' data-href='" + shorturl + "' data-send='true' data-layout='button_count' data-width='150' data-show-faces='false'></div>"
				+"</div>\"]";
		
		return html;
	}
	
	private String getJson(Entity article){
		String entry = "";		
		//initialize article variables from query results
		String title = (String) article.getProperty("title");
		String content = ((Text) article.getProperty("content")).getValue();
		String summary = (String) article.getProperty("summary");
		String blobKey = (String) article.getProperty("blobKey");
		String tags = (String) article.getProperty("tags");
		String postDate = (String) article.getProperty("postDate");
		String uploadDate = (String) article.getProperty("uploadDate");
		String location = (String) article.getProperty("location");
		String articleIndex = (String) article.getProperty("index");
		String shortUrl = (String) article.getProperty("shortUrl");
		String articleId = (String) article.getProperty("articleId");
		entry = "[{"
				+ "\"title\" : " + "\"" + title + "\", " 
				+ "\"content\" : " + "\"" + content + "\", "
				+ "\"summary\" : " + "\"" + summary + "\", "
				+ "\"blobKey\" : " +  "\"" + blobKey + "\", "
				+ "\"tags\" : " + "\"" + tags + "\", "
				+ "\"postDate\" : " + "\"" + postDate + "\", "
				+ "\"uploadDate\" : " + "\"" + uploadDate + "\","
				+ "\"index\" : " + "\"" + articleIndex + "\","
				+ "\"shortUrl\" : " + "\"" + shortUrl + "\","
				+ "\"location\" : " + "\"" + location + "\","
				+ "\"articleId\" : " + "\"" + articleId + "\""
				+ "}]";
		
		return entry;
	}
}










