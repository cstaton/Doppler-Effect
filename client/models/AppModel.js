var AppModel = Backbone.Model.extend({
	initialize: function() {
		this.set("header", new HeaderModel());
		this.set("doppler", new DopplerModel());
	}
});