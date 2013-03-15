package benzawacki.dao;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;

public abstract class AbstractDAO<T extends AbstractDAO<T>> {
	
	@Expose public String id;
	@Expose public Date createdDate;
	@Expose public Date updatedDate;
	@Expose public Person createdBy;
	@Expose public Person updatedBy;
	
	@Transient protected transient Class<?> clazz;
	
	protected static Gson gson = new GsonBuilder()
		.setDateFormat(DateFormat.LONG)
		.excludeFieldsWithoutExposeAnnotation()
		.serializeNulls()
		.create();
	
	public AbstractDAO(Class<T> clazz){		
		initialize();
		this.clazz = clazz;
	}
	
	public AbstractDAO(){
		
	}
	
	public void initialize(){
		Date date = new Date();
		User user = UserServiceFactory.getUserService().getCurrentUser();
		if (user != null){
			this.createdBy = new Person(user);
			this.updatedBy = new Person(user);
		}
		this.createdDate = date;
		this.updatedDate = date;
		
		this.id = String.valueOf(date.getTime());
	}
	
	public void update(){
		User user = UserServiceFactory.getUserService().getCurrentUser();
		this.updatedBy = new Person(user);
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
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

	public Person getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Person createdBy) {
		this.createdBy = createdBy;
	}

	public Person getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Person updatedBy) {
		this.updatedBy = updatedBy;
	}
	
	public String toJson(){
		return gson.toJson(this);
	}
	
	public static String toJson(Object obj){
		return gson.toJson(obj);
	}
	
	@SuppressWarnings("unchecked")
	public T fromJson(String json){
		return (T)gson.fromJson(json, clazz);
	}
	
	public abstract void save();
	public abstract void delete(String id);
	
	public void delete(Long id){
		delete(String.valueOf(id));
	}
	
	public abstract T fetch(String id);
	
	public T fetch(Long id){
		return fetch(String.valueOf(id));
	}
	
	public abstract List<T> fetchAll();
	
	public void delete(){
		delete(getId());
	}
	
}
