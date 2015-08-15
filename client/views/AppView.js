var AppView = Backbone.View.extend({
	initialize: function() {
		this.headerView = new HeaderView({model: this.model.get("header")});
		this.dopplerView = new DopplerView({model: this.model.get("doppler")});
	},

	className: "container",

	render: function() {
		return this.$el.html([
			this.headerView.$el,
			this.dopplerView.$el
		]);
	}
});