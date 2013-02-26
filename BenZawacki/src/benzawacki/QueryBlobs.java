package benzawacki;

import java.io.IOException;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.*;
import com.google.appengine.api.datastore.*;

public class QueryBlobs extends HttpServlet{
	private static final long serialVersionUID = 1L;


	@SuppressWarnings("deprecation")
	public void doGet(HttpServletRequest req, HttpServletResponse res)
	    throws IOException {
			
			String query = req.getParameter("query");
			String num = req.getParameter("num");
			//System.out.println("NUM: " + num);
			
			DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
			//BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
			BlobInfoFactory blobInfoFactory = new BlobInfoFactory();
			Iterator<BlobInfo> blobInfoList = blobInfoFactory.queryBlobInfos();
			
			
			Query q = new Query("__BlobInfo__");
			List<Entity> blobsEntity = datastore.prepare(q).asList(FetchOptions.Builder.withDefaults());
			
			String images = "";
			String json = "[";
			String blobDetails = "";
			
			int qy = 0;
			query = query.toLowerCase();
			
			if (query.equals("all")){
				qy = 1;
			} else if (query.equals("add")){
				qy = 2;
			} else if (query.equals("delete")){
				qy = 3;
			} else if (query.equals("refresh")){
				qy = 4;
			}
			
			int index = 0;
			switch (qy){
				case 1: //all
					index = 0;
					while (blobInfoList.hasNext()){
						BlobInfo blobInfo = blobInfoList.next();
						Date uploadDate = blobInfo.getCreation();
						Calendar calendar = Calendar.getInstance();
						calendar.setTime(uploadDate);
						
						DateFormat df = new SimpleDateFormat("yyy-MM-dd@HH:mm:ss.SSS");
						String formattedDate = df.format(uploadDate);
						//System.out.println(formattedDate);
						
						String jsonData = "{" 
							+ "\"blobKey\" : " + "\"" + blobInfo.getBlobKey().getKeyString() + "\","
							+ "\"fileName\" : " + "\"" + blobInfo.getFilename() + "\","
							+ "\"contentType\" : " + "\"" + blobInfo.getContentType() + "\","
							+ "\"creationDate\" : " + "\"" + formattedDate + "\","
							+ "\"size\" : " + "\"" + blobInfo.getSize() + "\","
							+ "\"error\" : " + "\"" + "none" + "\""
							+ "}";
						if (index == 0){
							json += jsonData;
						} else {
							json += "," + jsonData;
						}
							
						images += "<img src=\"/serve?blobKey=" + blobInfo.getBlobKey().getKeyString() + "\" width='200' class=\"imgPreview\">";
	
						blobDetails += blobInfo.getBlobKey().getKeyString() + " - " 
							+ blobInfo.getFilename() + " (" + blobInfo.getContentType() + ", " + ((Long)blobInfo.getSize()).toString() + " bytes) on " 
							+ uploadDate.getYear() + "-" + uploadDate.getMonth() + "-" + uploadDate.getDate() 
						  	+ "@" + uploadDate.getHours() + ":" + uploadDate.getMinutes() + ":" + uploadDate.getSeconds() + "<br>"; 
						index++;
					}
					break;
				
				case 2: //add
					Calendar calendar = Calendar.getInstance();//(1990, 1, 1);
					calendar.setTime(((Date)blobsEntity.get(0).getProperty("creation")));
					Date newestDate = calendar.getTime(); 
					Entity newestBlob = blobsEntity.get(0);
					
					boolean again = true;
					BlobInfo addedBlob = blobInfoList.next();
					while (blobInfoList.hasNext() && again){
						BlobInfo nextInfo = blobInfoList.next();
						if (req.getParameter("key").equals(nextInfo.getBlobKey().getKeyString())){
							addedBlob = nextInfo;
							again = false;
						}
					
					}
					
					for (Entity blob : blobsEntity){
						calendar.setTime(((Date)blob.getProperty("creation")));
						Date currentDate = calendar.getTime();
	
						if (currentDate.compareTo(newestDate) == 1){
							newestDate = currentDate;
							newestBlob = blob;
						}
						
					}
					BlobInfo blobInfo = blobInfoFactory.createBlobInfo(newestBlob);
					String jsonData = "";
					
					if (blobInfo.equals(addedBlob)){
						Date uploadDate = blobInfo.getCreation();
						DateFormat df = new SimpleDateFormat("yyy-MM-dd@HH:mm:ss.SSS");
						String formattedDate = df.format(uploadDate);
						
						jsonData = "{" 
							+ "\"blobKey\" : " + "\"" + blobInfo.getBlobKey().getKeyString() + "\","
							+ "\"fileName\" : " + "\"" + blobInfo.getFilename() + "\","
							+ "\"contentType\" : " + "\"" + blobInfo.getContentType() + "\","
							+ "\"creationDate\" : " + "\"" + formattedDate + "\","
							+ "\"size\" : " + "\"" + blobInfo.getSize() + "\","
							+ "\"error\" : " + "\"" + "none" + "\""
							+ "}";

					}
					else {
						
						jsonData = "{" 
								+ "\"error\" : " + "\"" + "not available" + "\""
								+ "}";
					}
					
					json += jsonData;
					break;
				case 3: //delete
					break;
					
				case 4: //refresh
					while (blobInfoList.hasNext()){
						index++;
					}
//					System.out.println("REFRESH: num blobs =" + index);
					break;
					
			}
			json += "]";
			
			String outString = "</b><br><br>" + "<table><tr><td>";
			
			outString = outString + blobDetails + "</td><td></tr></table>";
			outString += images + "<br><br>" + json;
			
			//res.setContentType("text/plain");
			//res.getWriter().println(outString);
			res.getWriter().println(json);
			
			if (num.equals("yes")){
//				System.out.println("Number of Blobs: " + index );
				res.getWriter().println("\n\nNumber of Blobs: " + index );
			}

	    }
}
