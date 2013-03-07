package benzawacki.rest;

import benzawacki.dao.AbstractBlobstore;

public class RestBlobstore<T extends AbstractBlobstore<T>> extends AbstractRest<T> {
	
	public RestBlobstore(Class<T> clazz){
		super(new AbstractBlobstore<T>(), clazz);
	}
	
}
