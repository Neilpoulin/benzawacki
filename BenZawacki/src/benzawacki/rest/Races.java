package benzawacki.rest;

import javax.ws.rs.Path;

import benzawacki.dao.Race;

@Path("/races")
public class Races extends AbstractRest<Race> {

		public Races(){
			super(Race.class);
		}
}
