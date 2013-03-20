var SubmitDialog = Backbone.View.extend({
	initialize: function(){
		this.options.template != undefined ? this.template = this.options.template : this.template = null;
		this.options.$trigger != undefined ? this.$trigger = this.options.$trigger : $("<a>");
		this.options.modelType != undefined? this.modelType = this.options.modelType : this.modelType = null;
		this.options.collection != undefined? this.collection = this.options.collection : this.collection = null;
		
		if (this.options.dialog == true){
			this.$el.addClass("modal hide fade")
				.attr("role", "dialog")
				.attr("aria-labelledby", "dialog-title")
				.attr("aria-hidden", "true");
			
			this.$trigger.attr("data-toggle", "modal");
		}
		
		var view = this;
		this.$trigger.on("click", function(){
			view.open();
		});
	},
	render: function(){
		var $el = this.$el;
		var view = this;
		$el.html(this.template( this.model.toJSON() ));
		if (this.options.title != undefined){
			$el.find(".dialog-title").html(this.options.title);
		}
		$el.find(".submit").on("click", function(){
			view.submit($el)
		});
		
		$el.find(".datepicker").datepicker();
	},
	submit: function($el){
		var view = this;
		$el.find(".attribute").each(function(i, obj){
			var $obj = $(obj);
			var field = $obj.attr("data-field");
			var value = "";
			if ($obj.is("[type='checkbox']")){
				value = $obj.is(":checked");
			}else{
				value = $obj.val();
			}
			view.model.set(field, value);
		});
		this.model.save(this.model.toJSON(),
			{
				success: function(){
					view.showAlert("Save Successful", "alert-success");
					view.close();
				}, 
				error: function(){
					view.showAlert("Save Failed :(", "alert-error");
				} 
			}
		);
		if (this.collection != null){
			this.collection.add(this.model);
		}
	},
	showAlert: function(message, type){
		this.$el.find(".alert").attr("class", "alert").addClass(type).addClass("in").alert();
		this.$el.find(".alert-msg").html(message);
		
	},
	open: function(){
		var view = this;
		if (this.model == undefined){
			this.model = new this.modelType();
		}
		this.model.on("invalid", function(model, error){
			view.showAlert(error, "alert-error");
		});
		this.render();
	},
	close: function(){
		this.model = new this.modelType();
		this.$el.modal("hide");
	}

});