(function(exports){

	var Distance = function(max){
		if(!(this instanceof Distance)){
			return new Distance(max);
		}
		this.distance = max;
		this.earthRadius = 6371;
	};

	Distance.prototype.Radius = function(interger){
		return interger * Math.PI / 180;
	};

	Distance.prototype.Int = function(interger){
		return parseFloat(interger);
	};

	Distance.prototype.from = function(position){
		this.start = position;
	};

	Distance.prototype.to = function(position){
		this.destination = position;
	};

	Distance.prototype.near = function(position){
		this.anchor = position;
	};

	Distance.prototype.unit = function(unit){
		this.unit = unit;
	};

}(this));