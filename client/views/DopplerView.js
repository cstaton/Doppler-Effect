var DopplerView = Backbone.View.extend({
	initialize: function() {
		var bbone = this;

		this.render();
		this.model.set("canvas", this.$("#star")[0]);
		this.model.addContext();

		$(this.model.get("starImage")).on("load", function() {
			// Listens for the star image to load dynamically and inserts image into canvas
			var cWidth = bbone.model.get("canvas").width;
			var cHeight = bbone.model.get("canvas").height;
			bbone.model.get("context").drawImage(bbone.model.get("starImage"), 0, 0, cWidth, cHeight);
		});
	},

	events: {
		'input #slider': "handleSlider",
		'keyup #velbox': 'handleVel',
		'submit form': "disableSubmit",

	},

	handleSlider: function() {
		var sliderValue = $("#slider").val();
		this.model.colorChanger(sliderValue);
		$("#velbox").val(sliderValue);
		$(".invalid").hide();
	},

	handleVel: function() {
		var val = $("#velbox").val();

		if (val > 100 || val < -100) {
			$(".invalid").show();
		} else if (val !== "") {
			$(".invalid").hide();
			this.model.colorChanger(val);
		}
		$("#slider").val(val);
	},

	disableSubmit: function(event) {
		event.preventDefault();
	},

	render: function() {
		return this.$el.html(
			'<h2>Doppler Effect</h2>\
			<canvas id="star" width="900" height="600"></canvas>\
			<form>\
				<label>Velocity (km/s)</label>\
				<input type="number" value="0" min="-100" max="100" id="velbox" />\
				<input type="range" value="0" step="1" min="-100" max="100" id="slider" />\
			</form>\
			<div class="invalid">Please Enter a value between -100 and 100</div>'
		);
	}
});