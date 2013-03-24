var EditArticle = Backbone.View.extend({
	template: templates.articles.editArticle,	
	initialize: function(){
		this.collection = this.options.collection;
		this.listView = this.options.listView;
		this.$el.addClass("active");
		this.imageCollection = this.options.imageCollection;		
		this.titleImagePicker = new ImagePicker({model: this.imageCollection});
		this.articleImagePicker = new ImagePicker({model: this.imageCollection, multi: true});
		this.selectedImages = [];
	},
	edit: function(model){
		this.model = model;
		this.render();
	},
	render: function(){
		var article = this;
		var $el = this.$el;
		this.$el.html(this.template( this.model.toJSON() ));
		
		this.titleImagePicker.setElement($el.find(".titleImagePicker"));
		this.articleImagePicker.setElement($el.find(".articleImagePicker"));
		this.titleImagePicker.render();
		this.articleImagePicker.render();
		
		$el.find(".btn.submit").on("click", function(){
			article.submit();
		});
		
		$el.find(".btn.cancel").on("click", function(){
			article.cancel();
		});
		
		this.$el.find(".datepicker").datepicker({
			closeText: "Cancel",
			dateFormat: "yy-mm-dd",
			defaultDate: 0,
			duration: "fast",	
		});
		
		$(".article").on('keyup', function(){
			article.convertInput($(this)); 
		});
		
		$(".article").trigger("keyup");
		
		this.$el.find(".btn.addContentImg").button().click(function(){
			$el.find(".articleImagePickerContainer").modal({show: true});
		});
		
		$el.find(".articleImagePickerContainer").on("hide", function(){
			article.selectedImages = article.articleImagePicker.getSelected();
			article.addImages();
		});
		
		this.$el.find(".btn.addTitleImg").button().click(function(){
			$el.find(".titleImagePickerContainer").modal({show: true});
		});
		
		$el.find(".titleImagePickerContainer").on("hide", function(){
			var image = article.titleImagePicker.getSelected();
			article.addTitleImage(image);
			article.model.set("titleImageKey", image.get("blobKey"));
		});
	},
	addTitleImage: function(image){
		if (image != undefined){
			this.model.set("titleImageKey", image.get("blobKey"));
			this.$el.find(".articleImage img").attr("src", "/serve?blobKey=" + image.get("blobKey"));
		}
	},
	addImages: function(){
		var view = this;
		var images = this.selectedImages;
		this.$el.find(".availableImages").empty();
		for (var i=0; i< images.length; i++){
			var image = images[i];
			var data = image.toJSON();
			data.tag = "img" + (i + 1);
			view.$el.find(".availableImages").append(templates.articles.selectedImagesButtonSet( data ));
			view.$el.find(".availableImages li[data-id='" + image.id + "'] button.active").each(function(i, obj){
				$btn = $(obj);
				image.set($btn.attr("data-field"), $btn.val());
			});
		}	
		
		view.$el.find(".availableImages li button").each(function(index, obj){
			$btn = $(obj);
			var img = view.imageCollection.get($btn.attr("data-image-id"));
			$btn.on("click", function(){				 
				img.set($(this).attr("data-field"), $(this).val());
				$("#articleSummary").trigger("keyup");
				$("#articleContent").trigger("keyup");
			});
		});
	},	
	submit: function(){
		$el = this.$el;
		var articleId = $el.find(".article.id").val();
		
		var values = {
			blobKey: $el.find(".converted.blobKey").val(),
			title: $el.find(".converted.title").val(),
			summary: $el.find(".converted.summary").val(),
			content: $el.find(".converted.content").val(),
			displayDate: $el.find(".article.displayDate").val(),
			tags: $el.find(".article.tags").val().toLowerCase(),
			location: $el.find(".converted.location").val()
		} 
		
		if (articleId != ""){
			values.id = articleId;
		}

		var model = this.model.set(values);
		this.collection.add(model);
		console.log("saving....");
		console.log(model);
		model.save();
		this.model = new Article();
		this.render();
	}, 
	cancel: function(){
		this.model = new Article();
		this.render();
	},	
	convertInput: function($obj){
		var input = $obj.val();
		var type = $obj.attr("data-type");
		var $out = $(".converted." + type );
		var convertedInput = this.getConvertedInput(input, $obj);
		$out.val(convertedInput);
		this.$el.find(".preview").find("."+type).html(convertedInput);
	},
	getConvertedInput: function(content, $input){	
		content = content.replace(/(\r\n|\n|\r)/gm,"<br>");
		content = content.replace(/"/gm, '\\\"');
		var images = this.selectedImages;
		var imgReg = /\u003Cimg(\d|\d\d)\u003E/mg;
		var count = 0;
		var match = content.match(imgReg);
		if (match!= null){	
			for (var i =0; i< match.length; i++){
				var req = match[i].split("<img")[1];
				req = req.split(">")[0];
				req = Number(req);
				var pos = req;
				for (var j=1; j <= images.length + 1; j++){
					if (match[i] == "<img" + j + ">"){
						pos = j-1;
						break;
					}
				}
				var newStr = "<img";
				if (images[pos] != undefined && images[pos] != null){
					newStr = templates.articles.contentImage(images[pos].toJSON());	
				} else {					
					var tmp = $input.val();
					tmp = tmp.replace(match[i], newStr);
					$input.val(tmp);
					content = tmp;
					alert("Image <img" + req + "> is not a vaild reference to a selected image.");
				}
				content = content.replace(match[i], newStr);
			}
		}
		return content;
	}

	
});


