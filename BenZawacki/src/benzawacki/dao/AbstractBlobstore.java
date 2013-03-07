package benzawacki.dao;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Path;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;

public class AbstractBlobstore<T extends AbstractDAO<T>> extends AbstractDAO<T> {
		
	private static final BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
	 private static final BlobInfoFactory blobInfoFactory = new BlobInfoFactory();
	
	protected static String KIND;

	public AbstractBlobstore(){
		super();
	}
	
	public static BlobKey getKey(String id){
		 return new BlobKey(id);
	}
	
	public AbstractBlobstore(String kind, Class<T> clazz) {
		super(clazz);
		KIND = kind;
	}
	
	@Path("/uploadUrl")
	
	public static String getUploadUrl(String successUrl){
		BlobstoreService service = BlobstoreServiceFactory.getBlobstoreService();
		return service.createUploadUrl(successUrl);
	}
	
	@Override
	public void save() {
		// TODO Auto-generated method stub
//		blobstoreService.getUploads(request)
		
	}
	
	public static List<String> saveAll(HttpServletRequest request, String name){
		Map<String, List<BlobKey>> uploads = blobstoreService.getUploads(request);
		List<BlobKey> blobKeys = uploads.get(name);
		List<String> result = new ArrayList<String>();
		for (BlobKey key : blobKeys){
			result.add(key.getKeyString());
		}
		return result;
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		
	}

	public static void fetch(String id, HttpServletResponse response){
		BlobKey blobKey = new BlobKey(id);	   
        Iterator<BlobInfo> blobInfoList = blobInfoFactory.queryBlobInfos();
       
        boolean match = false;        
        	while (blobInfoList.hasNext() && match == false){
        		if (blobInfoList.next().getBlobKey().equals(blobKey)){
        			match = true;
        		}
	        }
        
        if (match){
        	try {
				blobstoreService.serve(blobKey, response);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 	
        } 
	}
	
	@Override
	public T fetch(String id) {
//		blobstoreService.f
		return null;
	}

	@Override
	public List<T> fetchAll() {
		// TODO Auto-generated method stub
		return null;
	}

}
