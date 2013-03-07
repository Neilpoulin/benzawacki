package benzawacki.rest;

import javax.ws.rs.Path;

import benzawacki.dao.Article;

@Path("/articles")
public class Articles extends RestDatastore<Article>{	
	public Articles(){
		super(Article.class, Article.KIND);
	}
}
