/* - units.js
 * -----------------------
 * - Converts units of length
 * - needs to extend boolean
 */

(function(exports){

  var Units = function(base){
    if(!(this instanceof Units)){
      return new Units(base);
    }
    var that = this;
    this.base = parseFloat(base);

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

  var attach = function(that){
    that._convertUnit = Units(that.valueOf());
  };

  Number.prototype.unit = function(unit){
    if(!this._convertUnit){
      attach(this);
    }
    return this._convertUnit.units[unit]();
  };

  Array.prototype.unit = function(unit){
    var result = [];
    for(var i = 0; i < this.length; i += 1){
      result.push(parseFloat(this[i]).unit(unit));
    }
    return result;
  };

}(this));