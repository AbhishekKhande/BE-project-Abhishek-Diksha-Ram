var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: 'COM5' }
  },

  devices: {
    sensor: { driver: 'analog-sensor', pin: 1, lowerLimit: 0, upperLimit: 900 }
  },

  work: function(my) {
    var analogValue = [];
    // let analogArray = analogValue.push(my.sensor.analogRead());
    // console.log(analogArray)
          every((1).second(), function() {
            analogValue.push(my.sensor.analogRead());
            var sum = 0;
            if(analogValue.length == 10){
              // console.log(analogValue);
              for(let i=0;i<analogValue.length;i++){
                sum = sum + analogValue[i]
              }
            var AverageArray = sum/analogValue.length;
              console.log(AverageArray);
              analogValue = []
            }
          });
          
  }
}).start();

<<<<<<< HEAD
exports.MyAnalogValue = ()=>{
=======
export var MyAnalogValue = ()=>{
>>>>>>> 2be1d7f0f45f656610c937446c8b83f663074928
  return analogValue;
}