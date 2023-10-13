const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(message) {
      let receivedMessage = {
         message: message.name,
         results: []
      };
      //receivedMessage.message = message.name;
      //receivedMessage.results = message.commands;
      for (let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            receivedMessage.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
         } else if (message.commands[i].commandType === 'MODE_CHANGE') {
            this.mode = message.commands[i].value;
            receivedMessage.results.push({completed: true});
         } else if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               receivedMessage.results.push({completed: false});
               this.position = this.position
            } else {
               this.position = message.commands[i].value;
               receivedMessage.results.push({completed: true});
            }
         } else {
            receivedMessage.results.push({completed: false});
         }
      }

      return receivedMessage;
   }
}

let commands = [/*new Command('MODE_CHANGE', 'LOW_POWER'),*/ new Command('STATUS_CHECK'), new Command('MOVE', 15000)];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

//console.log(response.results);

module.exports = Rover;