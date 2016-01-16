[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/) [![Build Status](https://secure.travis-ci.org/cameronhunter/flight-battery.svg)](http://travis-ci.org/cameronhunter/flight-battery)

# flight-battery

A [Flight](https://github.com/twitter/flight) component making use of the [HTML5 Battery API](https://developer.mozilla.org/en-US/docs/WebAPI/Battery_Status).

## Installation

```bash
bower install --save flight-battery
```

## Example

```javascript
define(['flight-battery'], function(Battery) {

  Battery.attachTo(document, {
    lowLevel: 10
  });

  // Listen for battery status updates
  $(document).on('battery-status', function(e, status) {
    console.log(e, status);
  });

  // Listen for (configured) battery low status
  $(document).on('battery-status-low', function(e, status) {
    console.error(e, status);
  });

  // Listen for battery charging updates
  $(document).on('battery-charging battery-discharging', function(e, status) {
    console.log(e, status);
  });
});
```

## Development

Development of this component needs [Bower](http://bower.io), and ideally
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```
