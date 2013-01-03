package benzawacki;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.unto.twitter.Api;
import net.unto.twitter.TwitterProtos.Status;

public class Twitter extends HttpServlet{
	private static final long serialVersionUID = 1L;
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
		throws IOException {
		Api api = Api.builder().build();
		//for (Status status : api.publicTimeline().build().get()) {
		//	//System.out.println(String.format("%s wrote '%s'", status.getUser().getName(), status.getText()));
		//}
			
	
	}	
}
