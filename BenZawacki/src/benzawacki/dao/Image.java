package benzawacki.dao;

import java.util.Date;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import com.google.gson.annotations.Expose;

public class Image extends AbstractDatastore<Image>{
	public static final String KIND = "Images";
	
	@Expose private String url;
	@Expose private boolean showOnHomePage = false;
	@Expose private String blobKey;
	
	private static final ImagesService imagesService = ImagesServiceFactory.getImagesService();
	
	public Image(){
		super(Image.class, KIND);
	}
	
	public Image(String blobKey){
		super(Image.class, KIND);
		BlobKey key = new BlobKey(blobKey);
		this.blobKey = blobKey;				
		ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(key);		
		this.url = imagesService.getServingUrl(options);
		this.id = String.valueOf(new Date().getTime());				
	}
	
	public Image(BlobKey blobKey){
		this(blobKey.getKeyString());				
	}
	
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public boolean isShowOnHomePage() {
		return showOnHomePage;
	}

	public void setShowOnHomePage(boolean showOnHomePage) {
		this.showOnHomePage = showOnHomePage;
	}

	public String getBlobKey() {
		return blobKey;
	}

	public void setBlobKey(String blobKey) {
		this.blobKey = blobKey;
	}

}

