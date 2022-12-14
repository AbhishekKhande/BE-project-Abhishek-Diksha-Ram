'use strict';

var Cylon = require('cylon');

Cylon.robot({
  name: 'cybot',

  // These are the events that will be registered in the API
  events: ['turned-on', 'turned-off', 'toggle'],

  // These are the commands that will be availble in the API
  // Commands method needs to return an object with the aliases
  // to the robot methods.
  commands: function() {
    return {
      turn_on: this.turnOn,
      turn_off: this.turnOff,
      toggle: this.toggle
    };
  },

  connections: {
    arduino: { adaptor: 'firmata', port: 'COM5' }
  },

  devices: {
    led: { driver: 'led', pin: 8 }
  },

  work: function() {
    after((1).seconds(), function() {
      this.turnOn();
    }.bind(this));

    after((2).seconds(), function() {
      this.turnOff();
    }.bind(this));
  },

  turnOn: function() {
    this.led.turnOn();
    this.emit('turned-on');
  },

  turnOff: function() {
    this.led.turnOff();
    this.emit('turned-off');
  },

  toggle: function() {
    this.led.toggle();
    this.emit('toggle');
    if (this.led.isOn()) {
      this.emit('turned-on');
    } else {
      this.emit('turned-off');
    }
  }
});

// ensure you install the API plugin first:
// $ npm install cylon-api-mqtt
Cylon.api(
  'mqtt',
  {
  broker: 'mqtt://test.mosquitto.org',
  port: '3000'
});

Cylon.start();