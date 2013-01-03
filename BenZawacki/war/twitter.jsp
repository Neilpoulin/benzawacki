<!DOCTYPE>
<HTML>

	<body>
		<div id="">
			<script charset="utf-8" src="http://widgets.twimg.com/j/2/widget.js"></script>
				<script>
				new TWTR.Widget({
				  version: 2,
				  type: 'profile',
				  rpp: 15,
				  interval: 30000,
				  width: 'auto',
				  height: 600,
				  theme: {
				    shell: {
				      background: '#333333',
				      color: '#ffffff'
				    },
				    tweets: {
				      background: '#ffffff',
				      color: '#010105',
				      links: '#737ae6'
				    }
				  },
				  features: {
				    scrollbar: true,
				    loop: false,
				    live: true,
				    behavior: 'all'
				  }
				}).render().setUser('benzawacki').start();
			</script>
		</div>	
	</body>	
</HTML>


