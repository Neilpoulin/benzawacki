package benzawacki.dao;

import java.text.DateFormat;
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
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public abstract class AbstractDAO<T> {
	protected Long id;
	protected Date createdDate;
	protected Date updatedDate;
	protected User createdBy;
	protected User updatedBy;
	private static String KIND;
	private static Class<?> clazz;
	
	public static Gson gson = new GsonBuilder().setDateFormat(DateFormat.LONG).create();
	protected static DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	
	public AbstractDAO(String kind, Class<T> clazz){		
		initialize();
		AbstractDAO.KIND = kind;
		AbstractDAO.clazz = clazz;
	}
	
	public void initialize(){
		Date date = new Date();
		User user = UserServiceFactory.getUserService().getCurrentUser();
		this.createdDate = date;
		this.updatedDate = date;
		this.createdBy = user;
		this.updatedBy = user;
		this.id = date.getTime();
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public User getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(User updatedBy) {
		this.updatedBy = updatedBy;
	}
	
	public static Key getKey(Long id){
		return KeyFactory.createKey(KIND, id);
	}
	
	public static void delete(Long id){
		datastore.delete(getKey(id));		
	}
	
	public void delete(){
		delete(getId());
	}
	
	public static Entity fetchEntity(Long id){
		Entity entity = null;
		try {
			entity = datastore.get(getKey(id));			
		} catch (EntityNotFoundException e) {}
		return entity;
	}
	
//	public abstract T fetch(Long id);
	
	@SuppressWarnings("unchecked")
	public static <T> T fetch(Long id){
		T obj = null;				
		Entity entity = fetchEntity(id);
		if (entity != null){
			obj = (T) gson.fromJson(((Text)entity.getProperty("json")).getValue(), clazz);			
		}
		 
		return obj;
	}
	
//	public abstract List<T> fetchAll();
	
	@SuppressWarnings("unchecked")
	public static <T> List<T> fetchAll(){
		List<T> objects = new ArrayList<T>();
		Query query = new Query(KIND);
		PreparedQuery pq = datastore.prepare(query);
		for (Entity result : pq.asIterable()){
			if (result != null && result.getProperty("json") != null){
				objects.add((T) gson.fromJson(((Text)result.getProperty("json")).getValue(), clazz));
			}
		}
		return objects;
	}
	
	public void save() {
		this.updatedDate = new Date();
		Entity entity = null;
		
		entity = Article.fetchEntity(this.id);
		if (entity == null){
			entity = new Entity("Articles", this.id);
		}			
							
		entity.setProperty("json", new Text(this.toJson()));
		datastore.put(entity);
	}
	
	@SuppressWarnings("unchecked")
	public static <T> T fromJson(String json){
		return (T)gson.fromJson(json, clazz);
	}
	
	public String toJson(){
		return gson.toJson(this);
	}
	
}
