# Distance.js

This is just a shell of a repo right now for planning a build

A Small Utility to calulate distance from a latitude and longitude points.

```javascript
Distance().from([lat, lng]).to([lat, lng]).unit('miles'));
//returns distance in specified unit
Distance(unit).from([lat, lng],[lat, lng]]).near([lat, lng]); 
// return array of objects
Distance(unit).from([lat, lng]).to([lat, lng])
// returns boolean
```

##### Subject to change

## Development

Install packages

```shell
npm intall
```

Build script

```shell
grunt build
```
Test build

```shell
grunt test
```

production build

```shell
grunt build --minify
```


