var EditArticle = Backbone.View.extend({
	template: templates.articles.editArticle,	
	initialize: function(){
		this.collection = this.options.collection;
		this.listView = this.options.listView;
		this.$el.addClass("active");
	},
	edit: function(model){
		this.model = model;
		this.render();
	},
	render: function(){
		var article = this;
		this.$el.html(this.template( this.model.toJSON() ));
		
		this.$el.find(".btn.submit").on("click", function(){
			article.submit();
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
			buildImgPicker($("#addPicDialog"), "insertImg", this.addImages, true);
			$("#addPicDialog").dialog("open");
		});
		
		this.$el.find(".btn.addTitleImg").button().click(function(){
			buildImgPicker($("#imgGallery"), "articleChooseImg", this.addImages, false);
			$("#imgGallery").dialog("open");
		});
		
	},
	addTitleImage: function(){
		
	},
	addImages: function(){
		for (var i=0; i< imgArray.length; i++){
			this.$el.find(".availableImages").append(templates.articles.selectedImagesButtonSet(imgArray[i]));

			$("#selected_" + imgArray[i].tag + " button").each(function(index, obj){
				$btn = $(obj);
				$btn.click(function(){
					var j = Number($(this).attr("data-tag").split("img")[1]) - 1 ;
					
					if ($(this).parent().hasClass("img-size")){
						var size = $(this).val();
						imgArray[j].sizeClass = size;
					}else{
						var position = $(this).val();
						imgArray[j].posClass = position;
					}
					
					imgArray[j].html = "<img src='/serve?blobKey=" + imgArray[j].blobKey + "' class='" + imgArray[j].sizeClass +  " " + imgArray[j].posClass + "' />";
					$("#articleSummary").trigger("keyup");
					$("#articleContent").trigger("keyup");
				});
			});
		}	
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
	convertInput: function($obj){
		var input = $obj.val();
		var type = $obj.attr("data-type");
		var $out = $(".converted." + type );
		var convertedInput = getConvertedInput(input);
		$out.val(convertedInput);
		this.$el.find(".preview").find("."+type).html(convertedInput);
	}
	
});


function getConvertedInput(content){	
	content = content.replace(/(\r\n|\n|\r)/gm,"<br>");
//	content = content.replace(/(\t|^t)/gm, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	content = content.replace(/"/gm, '\\\"');
	
	var imgStr = "$<img";
	var imgReg = /\u003Cimg(\d|\d\d)\u003E/mg;
	var count = 0;
	var match = content.match(imgReg);
	if (match!= null){	
		for (var i =0; i< match.length; i++){
			var req = match[i].split("<img")[1];
			req = req.split(">")[0];
			req = Number(req);
			var pos;
			for (var j=0; j< imgArray.length; j++){
				if (match[i] == "<" + imgArray[j].tag + ">"){
					pos = j;
					break;
				}
			}
			var newStr = "<img";
			if (imgArray[pos] != null){
				newStr = imgArray[pos].html;
//				content = content.replace(match[i], newStr);	
			} else {
				alert("Image <img" + req + "> is not a vaild reference to a selected image.");
				var tmp = $(this).val();
				tmp = tmp.replace(match[i], newStr);
				$(this).val(tmp);
			}
			content = content.replace(match[i], newStr);
		}
	}
	var index = content.indexOf(imgStr);
//	$("#html" + $(this).attr("id").split("article")[1]).val(content);
	return content;
//	$("#preview").html(content);
}
