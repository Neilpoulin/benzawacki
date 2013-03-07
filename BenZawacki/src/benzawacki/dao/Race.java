package benzawacki.dao;

public class Race extends AbstractDatastore<Race>{
	
	public static final String KIND = "Races";
	
	public Race(){
		super(Race.class, KIND);
	}
}
