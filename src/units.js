/* - units.js
 * -----------------------
 * - Converts units of length
 * - needs to extend boolean
 */

(function(exports){

  // Units Constructs
  // this handles a few unit types and stores
  // raw values so that the unit can be converted multiple times

  var Units = function(base){
    if(!(this instanceof Units)){
      return new Units(base); // magic
    }

    var that = this;
    this.base = parseFloat(base);

    // Unit object
    // allows for easy access to conversion fuctions

    this.units = {};
    this.units.kilometer = function(){
      return that.base;
    };
    this.units.miles = function(){
      return that.base * 0.621371;
    };
    this.units.feet = function(){
      return that.base * 3280.84;
    };

  };

  // private attach function
  // attaches units constructor and passes in
  // raw value

  var attach = function(that){
    that._convertUnit = Units(that.valueOf());
  };

  // Extending the Number prototype

  Number.prototype.unit = function(unit){
    if(!this._convertUnit){
      attach(this); // if not attached yet, attach it
    }
    return this._convertUnit.units[unit]();
  };

  // extending array prototype

  Array.prototype.unit = function(unit){
    var result = [];
    for(var i = 0; i < this.length; i += 1){
      result.push(parseFloat(this[i]).unit(unit)); // instead lets loop through
    }
    return result;
  };

}(this));