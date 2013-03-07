package benzawacki.rest;

import java.io.IOException;
import java.text.DateFormat;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import benzawacki.dao.AbstractDAO;

import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class AbstractRest<T extends AbstractDAO<T>> {
	public static Gson gson = new GsonBuilder()
		.setDateFormat(DateFormat.LONG)
		.excludeFieldsWithoutExposeAnnotation()
		.serializeNulls()
		.create();
	public AbstractDAO<T> dao;
	
	@Context
	HttpServletResponse _currentResponse;
	@Context
	HttpServletRequest _currentRequest;
	@Context
	ServletContext _context;
	
	private Class<T> clazz;
	
	public AbstractRest(AbstractDAO<T> dao, Class<T> clazz){
		this.clazz = clazz;
		this.dao = dao;
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
	public String post(String json) throws ServletException{
		String id = null;
		try{
			T obj = gson.fromJson(json, clazz);
			obj.initialize();
			id = obj.getId();
		}catch(Exception e){
			throw new ServletException(e);
		}
		
		return id;
	}
	
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public void postData(String arg){
		String uploadURL = BlobstoreServiceFactory.getBlobstoreService().createUploadUrl("/upload");
		System.out.println(uploadURL);
		try {
			_currentResponse.sendRedirect(uploadURL);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@DELETE
	@Path("{id}")
	public void delete(@PathParam("id")Long id) throws ServletException{
		try{
			dao.delete(id);
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
			json = gson.toJson( dao.fetch(id));
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
			List<T> result = dao.fetchAll();
			if (result != null){
				json = gson.toJson(result);
			}
		}catch (Exception e){
			throw new ServletException(e);
		}
		return json;
	}

}
