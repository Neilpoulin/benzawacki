package benzawacki.rest;

import javax.ws.rs.Path;

import benzawacki.dao.Image;

@Path("/images")
public class Images extends AbstractRest<Image> {
	public Images(){
		super(Image.class);
	}
}
