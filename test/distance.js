var assert = require('assert')
var Distance = require('../src/distance.js').Distance

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
	})
	describe(".to()", function(){
		it("should return a number if from is called before", function(){
			assert.equal("number", typeof Distance().from([12312,1212312]).to([234234,23423]))
		})
	})
})