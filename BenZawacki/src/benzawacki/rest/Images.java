package benzawacki.rest;

import java.io.IOException;

import javax.ws.rs.POST;
import javax.ws.rs.Path;

import benzawacki.dao.Image;

import com.google.appengine.api.blobstore.BlobstoreServiceFactory;

@Path("/images")
public class Images extends RestDatastore<Image> {
	public Images(){
		super(Image.class, Image.KIND);
	}
	
	
	
	

//	public void post(){
//		try {
//			String uploadURL = BlobstoreServiceFactory.getBlobstoreService().createUploadUrl("/api/images/upload");
//			_currentResponse.sendRedirect(uploadURL);
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
//	
//	@Path("/upload")
//	@POST
//	public void upload(String req){
////		List<String> blobKeys = AbstractBlobstore.saveAll(_currentRequest, "images");
//		System.out.println(req);
////		return gson.toJson(blobKeys); 
//	}
	
//	@GET
//	public String getUploads(){
////		List<String> blobKeys = AbstractBlobstore.saveAll(_currentRequest, "images");		
////		return gson.toJson(blobKeys);  
//	}
}
