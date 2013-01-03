<!DOCTYPE>
<HTML>

	<body id="">
		<script charset="utf-8" src="http://widgets.twimg.com/j/2/widget.js"></script>
		<script>
			new TWTR.Widget({
			  version: 2,
			  type: 'faves',
			  rpp: 15,
			  interval: 30000,
			  title: 'Ben\'s Twitter Feed',
			  subject: 'Tweets of Interest',
			  width: 'auto',
			  height: '600',
			  theme: {
			    shell: {
			      background: '#2190c0',
			      color: '#eaf5f7'
			    },
			    tweets: {
			      background: '#fcfdfd',
			      color: '#222222',
			      links: '#026890'
			    }
			  },
			  features: {
			    scrollbar: false,
			    loop: false,
			    live: true,
			    behavior: 'all'
			  }
			}).render().setUser('benzawacki').start();
		</script>				
	</body>
</html>