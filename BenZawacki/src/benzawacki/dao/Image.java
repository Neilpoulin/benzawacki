package benzawacki.dao;

import java.util.Date;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Text;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import com.google.gson.annotations.Expose;

public class Image extends AbstractDatastore<Image>{
	public static final String KIND = "Images";
	
	@Expose private String url;
	@Expose private boolean showOnHomePage = false;
	@Expose private boolean showInGallery = false;
	@Expose private boolean isSponsor = false;
	@Expose private String caption;
	@Expose private String title;
	@Expose private String blobKey;
	@Expose private String hyperlink;
	
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
	
	public boolean isShowInGallery() {
		return showInGallery;
	}

	public void setShowInGallery(boolean showInGallery) {
		this.showInGallery = showInGallery;
	}

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public boolean isSponsor() {
		return isSponsor;
	}

	public void setSponsor(boolean isSponsor) {
		this.isSponsor = isSponsor;
	}

	public String getHyperlink() {
		return hyperlink;
	}

	public void setHyperlink(String hyperlink) {
		this.hyperlink = hyperlink;
	}

	@Override
	public void save() {
		this.updatedDate = new Date();
		Entity entity = null;
		
		entity = fetchEntity(this.id);
		if (entity == null){
			entity = new Entity(getKind(), this.id);
		}			
		entity.setProperty("showOnHomePage", this.showOnHomePage);	
		entity.setProperty("showInGallery", this.showInGallery);
		entity.setProperty("isSponsor", this.isSponsor);
		entity.setProperty("json", new Text(this.toJson()));
		datastore.put(entity);
	}
}

