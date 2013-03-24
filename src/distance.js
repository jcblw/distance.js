/* - Distance.js
 * -------------------------
 * - Calculates distance between sets of lat lng
 */

(function(exports){

	var Distance = function(unit){
		if(!(this instanceof Distance)){
			return new Distance(unit);
		}
		this.unit = unit;
		this.earthRadius =  6378.1;
	};

	Distance.prototype.Radius = function(interger){
		return interger * Math.PI / 180;
	};

	Distance.prototype.Int = function(interger){
		return parseFloat(interger);
	};

	Distance.prototype.from = function(position){

		if(typeof position === 'object' && position.length){

			if(position[0].length && typeof position[0] === "object"){

				this.start = [];

				for(var i = 0; i < position.length; i += 1){
					var pos = position[i];
					this.start.push([this.Int(pos[0]), this.Int(pos[1])]);
				}

				this.multi = 1;

			}else{

				this.start = [this.Int(position[0]), this.Int(position[1])];

			}
		
			if(this.destination){
				return this.calculate();
			}

			return this;

		}else{

			throw new Error("Distance.from() arguments need to be an array eg. [lat, lng] or [[lat, lng], [lat, lng]]");
			return null;

		}
	};

	Distance.prototype.to = function(position){

		if(typeof position === 'object' && position.length){
			
			this.destination = [this.Int(position[0]), this.Int(position[1])];
		
			if(this.start){
				return this.calculate();
			}

			return this;

		}else{

			throw new Error("Distance.to() arguments need to be an array eg. [lat, lng]");
			return null;

		}

	};

	Distance.prototype.near = function(position){
		
		this.start = [this.Int(position[0]), this.Int(position[1])];
		return this.calculate();

	};

	Distance.prototype.get = function(start , destination){
	
		var lat = this.Radius(destination[0] - start[0]);
		var lng = this.Radius(destination[1] - start[1]);
		start[0] = this.Radius(start[0]);
		destination[0] = this.Radius(destination[0]);
		var a = Math.pow(Math.sin(lat / 2), 2) + 
				Math.pow(Math.sin(lng / 2), 2) *
        		Math.cos(start[0]) * 
        		Math.cos(destination[0]);
		var c = 2 * 
				Math.atan2(Math.sqrt(a), 
				Math.sqrt(1 - a));
		return this.earthRadius * c;
	};

	Distance.prototype.calculate = function(){
		// calculates the distance
		if(this.multi){
			var result = [];
			// loop through all destinations
			for(var i = 0; i < this.start.length; i += 1){
				result.push(this.get(this.start[i], this.destination));
			}
			return result;
		}else{
			// only one position to compare
			return this.get(this.start, this.destination);
		}
	};

	Distance.prototype.unit = function(unit){
		this.unit = unit;
	};

	exports.Distance = Distance; 

}(this));