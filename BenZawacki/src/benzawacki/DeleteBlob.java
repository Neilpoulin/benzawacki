package benzawacki;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.*;

public class DeleteBlob  extends HttpServlet{
	private static final long serialVersionUID = 1L;
	private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();

	public void doGet(HttpServletRequest req, HttpServletResponse res)
	    throws IOException {
	        BlobKey blobKey = new BlobKey(req.getParameter("blobKey"));
//	        BlobInfoFactory blobInfoFactory = new BlobInfoFactory();
//	        BlobInfo blobInfo = blobInfoFactory.loadBlobInfo(blobKey);
	       	        
	        if (req.getParameter("blobKey") != ""){
	        	blobstoreService.delete(blobKey); 	
	        }
	        
	    }
}