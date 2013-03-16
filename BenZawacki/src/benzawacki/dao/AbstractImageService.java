package benzawacki.dao;

import java.util.List;

import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;

public class AbstractImageService<T extends AbstractDAO<T>> extends AbstractDAO<T> {

	ImagesService imagesService = ImagesServiceFactory.getImagesService();
	
	
	
	@Override
	public void save() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<T> fetchAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public T fetch(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<T> fetchByAttribute(String property, Object value) {
		// TODO Auto-generated method stub
		return null;
	}

}
