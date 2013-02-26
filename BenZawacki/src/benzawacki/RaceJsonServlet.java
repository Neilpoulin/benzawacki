package benzawacki;

import com.google.appengine.api.datastore.*;
import javax.servlet.http.*;
import java.io.IOException;

public class RaceJsonServlet extends HttpServlet {
	static final long serialVersionUID = 1;
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {	

		String raceSeason = req.getParameter("raceSeason");		
		String raceJSON = req.getParameter("raceJSON");
		Text raceJSONText = new Text(raceJSON);
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Key raceDataKey = KeyFactory.createKey("RaceDataKey", raceSeason);
		Query query = new Query("Schedule", raceDataKey);
		Entity raceEntity = datastore.prepare(query).asSingleEntity();
		
		if (raceEntity == null){
			Entity race = new Entity("Schedule", raceDataKey);		
			race.setProperty("raceJSON", raceJSONText);
			datastore.put(race);	
		}else{
			raceEntity.setProperty("raceJSON", raceJSONText);
			datastore.put(raceEntity);
		}	
	}

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
	throws IOException {
		String raceSeason = req.getParameter("raceSeason");		
		
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Key raceDataKey = KeyFactory.createKey("RaceDataKey", raceSeason);
		Query query = new Query("Schedule", raceDataKey);
		Entity raceEntity = datastore.prepare(query).asSingleEntity();
		
		if (raceEntity == null){
			resp.getWriter().println("{\"fail\":\"entity does not exist\"}");
		}else{
			String raceJSON = ((Text)raceEntity.getProperty("raceJSON")).getValue();	
			resp.getWriter().println(raceJSON);
		}	
	}
}
