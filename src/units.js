/* - units.js
 * -----------------------
 * - Converts units of length
 * - needs to extend boolean
 */

 // needs to be smarter for now this is good tho

(function(exports){

	Number.prototype.kilometer = function(){
		this.converted = true;
		return this.valueOf()
	};

	Number.prototype.miles = function(){
		this.converted = true;
		return this.valueOf() * 0.621371;
	};

	Number.prototype.feet = function(){
		this.converted = true;
		return this.valueOf() * 3280.84;
	};

	Number.prototype.unit = function(unit){
		if(this[unit] && !this.converted){
			return this[unit]();
		}else{
			throw new Error("One one conversion is possible at this time");
			return null;
		}
	};

}(this));