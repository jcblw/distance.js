var assert = require('assert')
var Distance = require('../src/distance.js').Distance
require('../src/units.js')

describe("Distance", function(){
	it("should return a new instance of itself", function(){
		assert.equal(true, Distance() instanceof Distance)
	})
	describe(".from()", function(){
		it("should return an instanceof Distance", function(){
			assert.equal(true, Distance().from([12312,1212312]) instanceof Distance)
		})
		it("should set the start to an object", function(){
			assert.equal("object", typeof Distance().from([12312,1212312]).start)
		})
		it("should set the starts first value to the same value as argument", function(){
			assert.equal(12312, Distance().from([12312,1212312]).start[0])
		})
		it("should set the starts second value to the same value as argument", function(){
			assert.equal(1212312, Distance().from([12312,1212312]).start[1])
		})
		it("should set the starts first value to the same value as argument and parse a float", function(){
			assert.equal(123.12, Distance().from(["123.12",1212312]).start[0])
		})
		it("should set the starts second value to the same value as argument and parse a float", function(){
			assert.equal(1212312, Distance().from(["123.12","1212312"]).start[1])
		})
	})
	describe(".to()", function(){
		it("should return an instance of distance if its called before .from()", function(){
			assert.equal(true, Distance().to([234234,23423]) instanceof Distance)
		})
		it("should return a number if .from() is called before", function(){
			assert.equal("number", typeof Distance().from([12312,1212312]).to([234234,23423]))
		})
		it("should set the destinations first value to the same value as argument", function(){
			assert.equal(12312, Distance().to([12312,1212312]).destination[0])
		})
		it("should set the destinations second value to the same value as argument", function(){
			assert.equal(1212312, Distance().to([12312,1212312]).destination[1])
		})
		it("should set the destinations first value to the same value as argument and parse a float", function(){
			assert.equal(123.12, Distance().to(["123.12",1212312]).destination[0])
		})
		it("should set the starts second value to the same value as argument and parse a float", function(){
			assert.equal(1212312, Distance().to(["123.12","1212312"]).destination[1])
		})
		// need to test values of multi locations
		//==========================================================
		it("should return an accurate km distance when from is called before", function(){
			//distance calculated by http://www.nhc.noaa.gov/gccalc.shtml
			// number is rounded
			assert.equal(48, Math.round(Distance().from([33.9533,117.3953]).to([34.1361,117.8644])))
		})
		it("should return an accurate km distance when from is called before, even the second time to is called", function(){
			//distance calculated by http://www.nhc.noaa.gov/gccalc.shtml
			// number is rounded
			var home = Distance().from([33.9533,117.3953]);
			assert.equal(48, Math.round(home.to([34.1361,117.8644])));
			assert.equal(48, Math.round(home.to([34.1361,117.8644])));
		})
		it("should return an array of accurate km distance when from is called before", function(){
			//distance calculated by http://www.nhc.noaa.gov/gccalc.shtml
			// number is rounded
			var result = Distance().from([[33.9533,117.3953]]).to([34.1361,117.8644]);
			assert.equal(48, Math.round(result[0]))
			assert.equal(true, (typeof result === "object" && result.length))
		})

	})
})

describe("Number.prototype", function(){
	describe(".unit()", function(){
		var x = 28
		it("should return the converted units from kilometers to miles accuratly", function(){
			assert.equal(17.398388, x.unit('miles'));
		})
		it("should return the converted units from kilometers to feet accuratly", function(){
			assert.equal(91863.52, x.unit('feet'));
		})
		it("should work with the return of Distance", function(){
			var result = Distance().from([33.9533,117.3953]).to([34.1361,117.8644]);
			assert.equal(29.711075704956006, result.unit('miles'));
		})
	})
})

describe("Array.prototype", function(){
	describe(".unit()", function(){
		it("should return the converted units from kilometers to feet accuratly", function(){
			assert.equal(91863.52, [28].unit('feet')[0]);
		})
		it("should return an array of converted distances", function(){
			var result = Distance().from([[33.9533,117.3953]]).to([34.1361,117.8644]);
			assert.equal(29.711075704956006, result.unit('miles')[0]);
			assert.equal("object", typeof result.unit('miles'));
		})
	})
})