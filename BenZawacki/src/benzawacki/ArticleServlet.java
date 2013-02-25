package benzawacki;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Text;
//import javax.servlet.ServletException;


public class ArticleServlet extends HttpServlet{
	private static final long serialVersionUID = 1L;
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
		throws IOException {
		
		String action = req.getParameter("action");
		String blobKey = req.getParameter("blobKey");
		String title = req.getParameter("title");
		String summary = req.getParameter("summary");
		String content = req.getParameter("content");
		String location = req.getParameter("location");
		Text contentText = new Text(content);
		String shortUrl = req.getParameter("shortUrl");
		String articleId = req.getParameter("articleId").replaceAll(" ", "").replaceAll(":", "");
		String tags = req.getParameter("tags");
		String postDate = req.getParameter("postDate");
		
		Date uploadDate = new Date();
		String uploadDateString = uploadDate.toString();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(uploadDate);
		DateFormat df = new SimpleDateFormat("yyy-MM-dd@HH:mm:ss.SSS");
		
		@SuppressWarnings("unused")
		String formattedDate = df.format(uploadDate);
		
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query query = new Query("Articles").setKeysOnly();
		PreparedQuery pq = datastore.prepare(query);
		int count = pq.countEntities(FetchOptions.Builder.withDefaults());
		String sCount = Integer.toString(count);
		if (action.equals("add")){
//			System.out.println("content: " + content);
			Entity article = new Entity("Articles", (title+uploadDateString).replaceAll(" ", "").replaceAll(":", ""));
				article.setProperty("blobKey", blobKey);
				article.setProperty("title", title);
				article.setProperty("summary", summary);
				article.setProperty("content", contentText);
				article.setProperty("tags", tags);
				article.setProperty("postDate", postDate);
				article.setProperty("uploadDate", uploadDateString);
				article.setProperty("location", location);
				article.setProperty("index", sCount);
				article.setProperty("shortUrl", shortUrl);
				article.setProperty("articleId", (title+uploadDateString).replaceAll(" ", "").replaceAll(":", ""));
				
				datastore.put(article);					
				
		} else if(action.equals("delete")){
			String k = (title+req.getParameter("uploadDate")).replaceAll(" ", "").replaceAll(":", "");
			Key getKey = KeyFactory.createKey("Articles", k);			
			try {
				@SuppressWarnings("unused")
				Entity get = datastore.get(getKey);
				datastore.delete(getKey);	
			} catch (EntityNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (action.equals("update")){
			Key key = KeyFactory.createKey("Articles", articleId);
			try {
				Entity article = datastore.get(key);	
				article.setProperty("blobKey", blobKey);
				article.setProperty("title", title);
				article.setProperty("summary", summary);
				article.setProperty("content", contentText);
				article.setProperty("tags", tags);
				article.setProperty("postDate", postDate);
				article.setProperty("uploadDate", uploadDateString);
				article.setProperty("location", location);
				article.setProperty("index", sCount);
				article.setProperty("shortUrl", shortUrl);
				datastore.put(article);	
			} catch (EntityNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	} //end doPost
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {	
		String id = req.getParameter("id");
		HtmlGenerator htmlGenerator = new HtmlGenerator();
		String json = null;
		if (id != null && id != "" && id!="undefined"){
			json = htmlGenerator.generateHtml(id);
		}else{
			String num = req.getParameter("num");
			String start = req.getParameter("start");
			String direction = req.getParameter("direction");
			direction = direction.toLowerCase();
			json = htmlGenerator.generateHtml(num, start, direction);
		}
				
		resp.getWriter().println(json);
		
	} //end doGet	
} //end ArticleServlet
