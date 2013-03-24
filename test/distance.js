var assert = require('assert')
var Distance = require('../src/distance.js').Distance

describe("Distance", function(){
	it("should return a new instance of itself", function(){
		assert.equal(true, Distance() instanceof Distance)
	})
})