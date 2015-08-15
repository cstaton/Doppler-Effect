var HeaderView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		return this.$el.html("<h1>"+ this.model.get("title") + "</h1>");
	}
})