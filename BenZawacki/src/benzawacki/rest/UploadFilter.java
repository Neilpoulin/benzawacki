package benzawacki.rest;

import javax.ws.rs.core.UriBuilder;

import benzawacki.dao.AbstractBlobstore;

import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerRequestFilter;

public class UploadFilter implements ContainerRequestFilter {

	@Override
	public ContainerRequest filter(ContainerRequest req) {
		ContainerRequest containerRequest = null;
		if (req.getRequestUri().getPath().equals("/api/images") && req.getMethod().equals("POST")){
			req.setUris(req.getBaseUri(), UriBuilder.fromPath(AbstractBlobstore.getUploadUrl("/upload")).build() );
		}else{
			
		}
		containerRequest = req;
			
//		ContainerRequest cont = new ContainerRequest(req.ge, null, null, null, null, null); 
			
//		req.
//			throw new WebApplicationException(Response.Status.UNAUTHORIZED);
			
		return containerRequest;
	}

}
