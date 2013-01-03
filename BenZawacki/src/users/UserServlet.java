package users;

import java.io.IOException;
import javax.servlet.http.*;
import com.google.appengine.api.users.*;

public class UserServlet extends HttpServlet{
	static final long serialVersionUID = 1;
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException{
		UserService userService = UserServiceFactory.getUserService();
		String thisURL = req.getRequestURI();
		
		resp.setContentType("text/html");
		resp.getWriter().println(
			
		);
		if (req.getUserPrincipal() != null){
			//User user = userService.getCurrentUser();
			boolean admin = userService.isUserAdmin();
			if (admin){
				resp.getWriter().println(
					"<h1>Admin Console</h1>"
				);
				resp.getWriter().println(
					"<p>You are logged in as " + req.getUserPrincipal().getName() + 
					". You can <a href=\"" + userService.createLogoutURL(thisURL) + 
					"\">sign out</a>.</p>"+
					"<a href=\"/main.jsp\">back to site</a>" +
					"<br><br>As an admin, you may access the following <i>admin only</i> pages: "+
					"<ul>"+
						"<li><a href=\"/admin/racedata.jsp\">Race Data Entry</a> - Like a \"guestbook\" at this point.</li>"
						
				);
			} else {
				resp.getWriter().println(
						"<p>You are logged in as " + 
						req.getUserPrincipal().getName() + 
						". <a href=\"" + userService.createLogoutURL(thisURL) + 
						"\">sign out</a></p>"+
						"<br><br><a href=\"/main.jsp\">back to site</a>"		
				);
			}
		}
		else {
			/*resp.getWriter().println("<p>Please <a href=\"" +
				userService.createLoginURL(thisURL) + 
				"\">sign in</a>.</p>"
			);
			*/
			resp.sendRedirect(userService.createLoginURL(thisURL));
			
		}
	}
}
