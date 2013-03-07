package benzawacki.rest;

import benzawacki.dao.AbstractDatastore;

public class RestDatastore<T extends AbstractDatastore<T>> extends AbstractRest<T>{
	public RestDatastore(Class<T> clazz, String kind){
		super( new AbstractDatastore<T>(clazz, kind), clazz);
	}
}