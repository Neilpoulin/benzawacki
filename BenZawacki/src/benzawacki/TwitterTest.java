package benzawacki;

import net.unto.twitter.*;
import net.unto.twitter.TwitterProtos.Status;


public class TwitterTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
			System.out.println("testing");
			Api api = Api.builder().build();
			for (Status status : api.publicTimeline().build().get()) {
				System.out.println(String.format("%s wrote '%s'", status.getUser().getName(), status.getText()));
			}
	}

}
