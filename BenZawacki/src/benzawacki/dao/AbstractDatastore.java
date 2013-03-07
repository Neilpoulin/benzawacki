package benzawacki.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Text;

public class AbstractDatastore<T extends AbstractDAO<T>> extends AbstractDAO<T>{
	private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	protected static String KIND;
	
	public AbstractDatastore(Class<T> clazz, String kind) {
		super(clazz);
		KIND = kind; 
	}
	
	public String getKind(){
		return KIND;
	}
	
	public Key getKey(Long id){
		return KeyFactory.createKey(getKind(), id);
	}
	
	public Key getKey(String id){
		return KeyFactory.createKey(getKind(), id);
	}
	
	public void delete(Long id){
		delete(String.valueOf(id));		
	}
	
	public void delete(String id){
		datastore.delete(getKey(id));
	}
	
	public Entity fetchEntity(String id){
		Entity entity = null;
		try {
			entity = datastore.get(getKey(id));			
		} catch (EntityNotFoundException e) {}
		return entity;
	}
	
	public Entity fetchEntity(Long id){
		return fetchEntity(String.valueOf(id));
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T fetch(String id){
		T obj = null;				
		Entity entity = fetchEntity(id);
		if (entity != null){
			obj = (T) gson.fromJson(((Text)entity.getProperty("json")).getValue(), clazz);			
		}
		 
		return obj;
	}
	
	@SuppressWarnings("unchecked")
	public List<T> fetchAll(){
		List<T> objects = new ArrayList<T>();
		Query query = new Query(getKind());
		PreparedQuery pq = datastore.prepare(query);
		for (Entity result : pq.asIterable()){
			if (result != null && result.getProperty("json") != null){
				objects.add((T) gson.fromJson(((Text)result.getProperty("json")).getValue(), clazz));
			}
		}
		return objects;
	}
	
	@Override
	public void save() {
		this.updatedDate = new Date();
		Entity entity = null;
		
		entity = fetchEntity(this.id);
		if (entity == null){
			entity = new Entity(getKind(), this.id);
		}			
							
		entity.setProperty("json", new Text(this.toJson()));
		datastore.put(entity);
	}

}
