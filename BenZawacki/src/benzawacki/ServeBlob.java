package benzawacki;

import java.io.IOException;
import java.util.Iterator;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;


public class ServeBlob extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();

	public void doGet(HttpServletRequest req, HttpServletResponse res)
	    throws IOException {
	        BlobKey blobKey = new BlobKey(req.getParameter("blobKey"));
	        
	        BlobInfoFactory blobInfoFactory = new BlobInfoFactory();
	        Iterator<BlobInfo> blobInfoList = blobInfoFactory.queryBlobInfos();
	       
	        boolean match = false;        
	        	while (blobInfoList.hasNext() && match == false){
	        		if (blobInfoList.next().getBlobKey().equals(blobKey)){
	        			match = true;
	        		}
		        }
	        
	        
	        //if (req.getParameter("blobKey") != ""){
	        if (match){
	        	blobstoreService.serve(blobKey, res); 	
	        } else{
	        	System.out.println("fail");
	        }
	        
	    }
}
