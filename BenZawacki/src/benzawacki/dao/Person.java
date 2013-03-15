package benzawacki.dao;

import com.google.appengine.api.users.User;
import com.google.gson.annotations.Expose;

public class Person {
	@Expose private String name;
	@Expose private String email;
	@Expose private String nickname;
	@Expose private String userId;
	@Expose private String federatedId;
	@Expose private String authDomain;
	
	public Person(){
		
	}
	
	public Person(User user){
		this(user, "");
	}

	public Person(User user, String name){
		if (user != null){
			this.email = user.getEmail();
			this.nickname = user.getNickname();
			this.userId = user.getUserId();
			this.federatedId = user.getFederatedIdentity();
			this.authDomain = user.getAuthDomain();
		}
		
		this.name = name;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getFederatedId() {
		return federatedId;
	}

	public void setFederatedId(String federatedId) {
		this.federatedId = federatedId;
	}

	public String getAuthDomain() {
		return authDomain;
	}

	public void setAuthDomain(String authDomain) {
		this.authDomain = authDomain;
	}
	
	
}
