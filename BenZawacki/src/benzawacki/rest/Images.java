package benzawacki.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import benzawacki.dao.Image;

@Path("/images")
public class Images extends RestDatastore<Image> {
	public Images(){
		super(Image.class, Image.KIND);
	}	
	
	@Path("/carousels/main")
	@GET
	public String getImages(){
		List<Image> images = dao.fetchByAttribute("showOnHomePage", true);
		return gson.toJson(images);
	}
	
	@Path("/galleries/photoPage")
	@GET
	public String getPhotoGallery(){
		List<Image> images = dao.fetchByAttribute("showInGallery", true);
		return gson.toJson(images);
	}
	
	@Path("/sponsors")
	@GET
	public String getSponsorImages(){
		List<Image> images = dao.fetchByAttribute("isSponsor", true);
		return gson.toJson(images);
	}
}
