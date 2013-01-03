package benzawacki;

import java.io.IOException;


import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.*;

public class UploadBlob extends HttpServlet{
	private static final long serialVersionUID = 1L;
	private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();

	    public void doPost(HttpServletRequest req, HttpServletResponse res)
	        throws ServletException, IOException {
			
	    	Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(req);
	        List<BlobKey> blobKey = blobs.get("articleImg");
	        BlobKey uploadedBlob = (BlobKey) blobKey.get(0);
	        
	        if (uploadedBlob == null) {
	            res.sendRedirect("/offline.jsp");
	        } else {
	        	res.getWriter().println(((BlobKey) blobKey.get(0)).getKeyString());
	        }
	    }
	    
	    public void doGet(HttpServletRequest req, HttpServletResponse res)
	    	throws ServletException, IOException {
	    	
	    	String url = blobstoreService.createUploadUrl("/upload");
	    	res.getWriter().println(url);
	    }
}
