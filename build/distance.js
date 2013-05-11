/*
 * Distance.js - 0.0.6 
 * Author : Jacob Lowe <http://jacoblowe.me> 
 */

(function(exports){

  // Distance Constructor
  // creates the Distance object, returns its self `this` and
  // there is a optional param `unit` that currently is functional
  // but will automatically convert the unit to whatever unit you 
  // specify, right now the sphere radius is static but could be changed to
  // allow the calculation between two locations on other planets

  var Distance = function(unit){
    if(!(this instanceof Distance)){
      return new Distance(unit);
    }
    this.unit = unit;
    this.earthRadius =  6378.1;
    return this;
  };

  // Distance::Radius
  // This is a small utitlity that return the radius of a interger

  Distance.prototype.Radius = function(interger){
    return interger * Math.PI / 180;
  };

  // Distance::Int
  // Parses values into intergers if the are strings, also uses
  // floats

  Distance.prototype.Int = function(interger){
    return parseFloat(interger);
  };

  // Distance::from
  // Takes the a latitude and longitude in an array and stores its
  // as a starting point. Also allows for multiple positions to be stored
  // as  start position. Will run calculations if destination is
  // set.

  Distance.prototype.from = function(position){

    if(typeof position === 'object' && position.length){

      if(position[0].length && typeof position[0] === "object"){ // nested arrays

        this.start = [];

        for(var i = 0; i < position.length; i += 1){ // loop through them
          var pos = position[i];
          this.start.push([this.Int(pos[0]), this.Int(pos[1])]); // push into start
        }

        this.multi = 1; // set a flag 

      }else{

        this.start = [this.Int(position[0]), this.Int(position[1])];

      }
    
      if(this.destination){
        return this.calculate(); // run calculate if destination is there
      }

      return this; // chaining

    }else{
      // helpful error if format is incorrect
      throw new Error("Distance.from() arguments need to be an array" + 
        " eg. [lat, lng] or [[lat, lng], [lat, lng]]");

    }
  };

  // Distance::to
  // Takes the a latitude and longitude in an array and stores its
  // as a destination point. If start point is set runs calculate

  Distance.prototype.to = function(position){

    if(typeof position === 'object' && position.length){
      
      this.destination = [this.Int(position[0]), this.Int(position[1])];
    
      if(this.start){
        return this.calculate();
      }

      return this;

    }else{

      throw new Error("Distance.to() arguments need to be an array eg. [lat, lng]");

    }

  };

  //Distance::get
  // This method actually will calculate the distance between two points;
  // it takes two parameters start and destination both arrays that have
  // two items the latitude and longitude of a point

  Distance.prototype.get = function(start , destination){
    // calculate radius stuff
    var lat = this.Radius(destination[0] - start[0]);
    var lng = this.Radius(destination[1] - start[1]);
    var startpos = this.Radius(start[0]);
    destination[0] = this.Radius(destination[0]);
    // do some crazy math ~ the distance formula
    var a = Math.pow(Math.sin(lat / 2), 2) + 
        Math.pow(Math.sin(lng / 2), 2) *
            Math.cos(startpos) * 
            Math.cos(destination[0]);
    var c = 2 * 
        Math.atan2(Math.sqrt(a), 
        Math.sqrt(1 - a));
        
    return this.earthRadius * c; // and assuming we are using two points on earth
  };

  // Distance::calculate
  // does not do any real calculations, should maybe be renamed as `handle`
  // distributes the calls in either a loop for multiple distances
  // or just one call for single ditances

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

  exports.Distance = Distance; // exporting to window, or module.exports in node

}(this));// consume this rather then window for node compatability

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