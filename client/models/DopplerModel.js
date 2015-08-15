var DopplerModel = Backbone.Model.extend({
	initialize: function() {
		this.set("starImage", this.loadStar());
	},

	loadStar: function() {
		var test = new Image();
		test.src = "assets/star-star-small.png";
		return test;
	},

	addContext: function(){
		this.set("context", this.get("canvas").getContext("2d"));
	},

	colorChanger: function(val) {
		// Changes color of star and resizes it to give doppler effect
		val = parseInt(val);

		var starImage = this.get("starImage");
		var context = this.get("context");
		var cWidth = this.get("canvas").width;
		var cHeight = this.get("canvas").height;

		// Clears old star and draws a new resized version
		context.clearRect(0, 0, cWidth, cHeight);
		context.drawImage(starImage, 0, 0,  cWidth - (val*4) - 100, cHeight - (val*3) - 75);
			
		var starData = context.getImageData(0, 0, cWidth, cHeight);

		// Loops through canvas data and changes pixel colors
		for (var i = 0; i < starData.data.length; i+=4) {
			var r = starData.data[i] + val;

			if (val > 0) {
				var g = starData.data[i + 1] - val;				
			} else {
				var g = starData.data[i + 1] + (val/2);
			}

			var b = starData.data[i + 2] - val - 30;
			var a = starData.data[i + 3];

			r = Math.min(255, r);
			g = Math.min(255, g);
			b = Math.min(255, b);

			starData.data[i] = r;
			starData.data[i + 1] = g;
			starData.data[i + 2] = b;
			starData.data[i + 3] = a;
		}

		context.putImageData(starData, 0, 0);

		this.set("context", context);

	}
});