var ImageGallery = Backbone.View.extend({
	template: templates.images.adminGallery,
	initialize: function(){
		if (this.options.template != undefined && this.options.template != null){
			this.template = this.options.template;
		}
		if (this.options.model != undefined){
			this.model = this.options.model;
		}
		
		this.model.on("add", this.render, this);
	},
	render: function(){
		var $el = this.$el;
		var view = this;
		var model = this.model;
		var data = this.model.toJSON();
		data = this.sort(data, "id", true);		
		$el.html( this.template(data) );
		initializePhotoGallery();
		
		$el.find("button.delete").on("click", function(){
			var c = confirm("Are you sure you want to delete this image?");
			if (c){
				model.get($(this).attr("data-id")).destroy();
				var parent = $(this).parent();				
				parent.animate({width: 0, opacity: 0, height: 0, marginLeft: -30}, "slow", function(){
					parent.hide();
//					view.render();
				});
				
			}			
		});
		$el.find("button.save").on("click", function(){
			view.submit(this);
		});
		
		$el.find("select.filter").on("change", function(){
			var attr = $(this).val();
			view.$el.find("ul.gallery li").each(function(i, obj){
				var show = false;
				$obj = $(obj);				
				if (attr == "all"){
					show = true;
				} else{
					var $field = $obj.find("[data-field='" + attr + "']");
					if ( $field.is(":checkbox") ){					
						if ( $field.is(":checked") ){
							show = true;
						}
					}else if ($field.val() != null && $field.val() != "" ){
						show = true;
					}
				}				
				if (show){
					$obj.show();
				}else{
					$obj.hide();
				}
			});
		});
		
		$el.find("input, textarea").on("change", function(){
			view.submit(this);
		});
		
	},
	submit: function(elm){
		var image = this.model.get($(elm).attr("data-id"));
		$("#img" + image.id).find(".attribute").each(function(index, obj){
			$obj = $(obj);
			var attr = $obj.attr("data-field");
			var value = "";
			if ($obj.is("[type='checkbox']")){
				value = $obj.is(":checked");
			}else{
				value = $obj.val();
			}				
			image.set(attr, value);				
		});
		image.save(image.toJSON(),
			{
				success: function(){showAlert(image.id, "Save Successful", "alert-success");}, 
				error: function(){showAlert(image.id, "Save Failed :(", "alert-error");} 
			}
		);
	},
	sort: function (array, field, reverse, primer){
		var sort_by = function(field, reverse, primer){
			   var key = function (x) {return primer ? primer(x[field]) : x[field]};

			   return function (a,b) {
			       var A = key(a), B = key(b);
			       return (A < B ? -1 : (A > B ? 1 : 0)) * [1,-1][+!!reverse];                 
			   }
			}
		array.sort(sort_by(field, reverse, primer));
		return array;
	}
});

function showAlert(id, message, type){
	console.log(message);
	var alert = $("#img" + id).find(".alert");
	alert.addClass(type).addClass("in").html(message).show();
	setTimeout(function(){		
		alert.removeClass("in");		
	}, 2000);
	setTimeout(function(){
		alert.hide();
	},3000);
	
}