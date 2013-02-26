package benzawacki.rest;

import java.text.DateFormat;

import javax.servlet.ServletException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import benzawacki.dao.AbstractDAO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class AbstractRest<T extends AbstractDAO<?>> {
	
	public static Gson gson = new GsonBuilder().setDateFormat(DateFormat.LONG).create();
	
	private Class<T> clazz;
	
	public AbstractRest(Class<T> clazz){
		this.clazz = clazz;
	}
	
	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public void put(String data) throws ServletException{
		try{
			T obj = gson.fromJson(data, clazz);				
			obj.save();
		}catch(Exception e){
			throw new ServletException(e);
		}
	}
	
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Long post(String json) throws ServletException{
		Long id = null;
		try{
			T obj = gson.fromJson(json, clazz);
			obj.initialize();
			id = obj.getId();
		}catch(Exception e){
			throw new ServletException(e);
		}
		
		return id;
	}
	
	@DELETE
	@Path("{id}")
	public void delete(@PathParam("id")Long id) throws ServletException{
		try{
			T.delete(id);
		}catch(Exception e){
			throw new ServletException(e);
		}
	}
	
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String get(@PathParam("id") Long id) throws ServletException{
		String json = null;
		try{
			json = gson.toJson( T.fetch(id));
		}catch(Exception e){
			throw new ServletException(e);
		}
		return json;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String get() throws ServletException{
		String json = null;
		try{
			json = gson.toJson(T.fetchAll());
		}catch (Exception e){
			throw new ServletException(e);
		}
		return json;
	}
}
