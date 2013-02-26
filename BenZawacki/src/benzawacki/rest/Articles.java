package benzawacki.rest;

import javax.ws.rs.Path;

import benzawacki.dao.Article;

@Path("/articles")
public class Articles extends AbstractRest<Article>{	

	public Articles(){
		super(Article.class);
	}
}
