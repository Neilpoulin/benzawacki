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
		System.out.println(raceJSON);
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Key raceDataKey = KeyFactory.createKey("RaceDataKey", raceSeason);
		Query query = new Query("Schedule", raceDataKey);
		Entity raceEntity = datastore.prepare(query).asSingleEntity();
		
		if (raceEntity == null){
			Entity race = new Entity("Schedule", raceDataKey);		
			race.setProperty("raceJSON", raceJSONText);
			datastore.put(race);	
			System.out.println("added new race entity." );
		}else{
			raceEntity.setProperty("raceJSON", raceJSONText);
			datastore.put(raceEntity);
			System.out.println("updated race entity." );
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
			System.out.println("No race entity." );
		}else{
			String raceJSON = ((Text)raceEntity.getProperty("raceJSON")).getValue();	
			System.out.println("Got race entity." );
			resp.getWriter().println(raceJSON);
		}	
	}
}
