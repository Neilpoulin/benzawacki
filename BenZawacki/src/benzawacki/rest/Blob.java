package benzawacki.rest;

import java.io.IOException;
import java.util.Iterator;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;

@Path("/blob")
public class Blob {
	private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
	
	@Context
	HttpServletResponse _currentResponse;
	@Context
	HttpServletRequest _currentRequest;
	@Context
	ServletContext _context;
	
	
	
	@GET
	@Path("/url")	
	public String getUrl(){		
		String url = blobstoreService.createUploadUrl("/upload");
		return url;
	}
	
	@GET
	@Path("/url/{key}")	
	public String getImage(@PathParam("key")String key){		
		return getImageUrl(key);
	}
	
	
	@GET
	@Path("{key}")
	public void getBlob(@PathParam("key")String key){
		BlobKey blobKey = new BlobKey(key);

		BlobInfoFactory blobInfoFactory = new BlobInfoFactory();
		Iterator<BlobInfo> blobInfoList = blobInfoFactory.queryBlobInfos();
		String type = null;
		while (blobInfoList.hasNext()) {
			BlobInfo info = blobInfoList.next();
			if (blobInfoList.next().getBlobKey().equals(blobKey)) {		
				type = info.getContentType();
				break;
			}
		}
//		try {
//			Response.temporaryRedirect(new URI(getImageUrl(key)) ).build();
//		} catch (URISyntaxException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}
		_currentResponse.setContentType(type);
//		_currentResponse.setHeader(arg0, arg1)
		try {
//			blobstoreService.serve(blobKey, _currentResponse);
			_currentResponse.sendRedirect(getImageUrl(key));
		} catch (IOException e) {
			e.printStackTrace();
		}

    }

	public String getImageUrl(String key){
		BlobKey blobKey = new BlobKey(key);
		ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(blobKey);
		ImagesService imagesService = ImagesServiceFactory.getImagesService();
		return imagesService.getServingUrl(options);
	}
}
