package benzawacki;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import benzawacki.dao.AbstractDAO;
import benzawacki.dao.Image;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;

public class UploadBlob extends HttpServlet{
	private static final long serialVersionUID = 1L;
	private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();

	    public void doPost(HttpServletRequest req, HttpServletResponse res)
	        throws ServletException, IOException {
			
	    	Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(req);
	        
	    	/**
	    	 * Get Blobs uploaded from the "upload article Image" form, currently on ImageData.jsp. 
	    	 */
//	    	List<BlobKey> blobKey = blobs.get("articleImg");
	    	
	    	List<BlobKey> imageBlobs = blobs.get("articleImg");
	    	List<Image> images = new ArrayList<Image>();
	        if (images != null){
	        	int i = 0;
	        	for (BlobKey key : imageBlobs){	        		
	        		Image img = new Image(key);
	        		img.setId(String.valueOf(new Date().getTime() + i));
	        		img.save();
	        		images.add(img);
	        		i++;
	        	}
	        }
	    	res.getWriter().println(AbstractDAO.toJson(images));
//	        BlobKey uploadedBlob = (BlobKey) blobKey.get(0);	        
//	        if (uploadedBlob == null) {
//	            res.sendRedirect("/offline.jsp");
//	        } else {
//	        	res.getWriter().println(((BlobKey) blobKey.get(0)).getKeyString());
//	        }
	    }
	    
	    public void doGet(HttpServletRequest req, HttpServletResponse res)
	    	throws ServletException, IOException {
	    	
	    	String url = blobstoreService.createUploadUrl("/upload");
	    	res.getWriter().println(url);
	    }
}
