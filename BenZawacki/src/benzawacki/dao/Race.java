package benzawacki.dao;

import com.google.gson.annotations.Expose;

public class Race extends AbstractDatastore<Race>{
	
	public static final String KIND = "Races";
	
	@Expose private String name;
	@Expose private String date;
	@Expose private String url;
	@Expose private String street;
	@Expose private String city;
	@Expose private String state;
	@Expose private String country;
	@Expose private String raceLength;
	@Expose private String raceType;
	@Expose private float lat;
	@Expose private float lng;
	@Expose private String description;
	
	public Race(){
		super(Race.class, KIND);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getRaceLength() {
		return raceLength;
	}

	public void setRaceLength(String raceLength) {
		this.raceLength = raceLength;
	}

	public String getRaceType() {
		return raceType;
	}

	public void setRaceType(String raceType) {
		this.raceType = raceType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getLat() {
		return lat;
	}

	public void setLat(float lat) {
		this.lat = lat;
	}

	public float getLng() {
		return lng;
	}

	public void setLng(float lng) {
		this.lng = lng;
	}
	
	
}
