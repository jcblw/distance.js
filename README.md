# Distance.js [![Build Status](https://travis-ci.org/jcblw/distance.js.svg?branch=master)](https://travis-ci.org/jcblw/distance.js)

A Small Utility to calulate distance from a latitude and longitude points.

```javascript
Distance().from([lat, lng]).to([lat, lng]).unit('miles')
// returns kilometers by default
var home = Distance().from([lat, lng]);
var nearby = [];
var locations = [/*...*/];
for(var i = 0; i < locations.length; i += 1){
  var location = locations[i];
  // use the same instance over and over
  if(home.to(location.center).unit('miles') < 3){
    nearby.push(location)
  }  
}
```

##### Available length units

- kilometers
- miles
- feet

Unit conversion is handled in the prototype of `Number` and is subject to change

#### more methods to be added

## Development

All new features for distance.js must be accompanied by a test to prove feature works. Bug fixes do not need new test but it is recommended.

###### Install packages

[`Install Grunt`](http://gruntjs.com/getting-started)

```shell
npm install
```

###### Grunt methods

```shell
grunt build
grunt test
```

