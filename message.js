class Message {
   constructor(name, commands) {
      this.name = name;
      if (!name) {
         throw Error('Needs a message name.');
       }
       this.commands = commands;
   }
}

module.exports = Message;