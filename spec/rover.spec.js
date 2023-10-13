const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  //test 7
  test("constructor sets position and default values for mode and generatorWatts", function(){
    let testRover = new Rover(685);
    //expect(testRover).toEqual(new Rover(685)); //Not sure if this is the syntax that the assignment is expecting but I'll leave this in to show that I attempted it. 
    //Going to use multiple expect().toBe() statements to check default values instead. 
    expect(testRover.position).toBe(685);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110); 
  });

  //test 8
  test("response returned by receiveMessage contains the name of the message", function(){
    let commands = [new Command('testCommand0', 0), new Command('testCommand1', 1)]; // adding a commands array to message for this to function. Come back and fix later.
    let testRover = new Rover(555);
    let testMessage = new Message('Hello', commands); 
    expect(testRover.receiveMessage(testMessage).message).toBe('Hello');
  });

  //test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('testCommand0', 0), new Command('testCommand1', 1)];
    let testMessage = new Message('Hello', commands)
    let testRover = new Rover(444);
    let response = testRover.receiveMessage(testMessage);
    expect(response.results.length).toBe(commands.length);
  });

  //test 10
  test("responds correctly to the status check command", function(){
    let commands = [new Command('STATUS_CHECK')]; //initializing a command with STATUS_CHECK as the commandType
    let testMessage = new Message('Checking Status', commands); //initializing a message to pass to receiveMessage
    let testRover = new Rover(333); //initializing a new Rover object
    let response = testRover.receiveMessage(testMessage);
    expect(typeof response.results[0].roverStatus).toBe('object');
    expect(response.results[0].roverStatus.generatorWatts).toBe(testRover.generatorWatts);
    expect(response.results[0].roverStatus.mode).toBe(testRover.mode);
    expect(response.results[0].roverStatus.position).toBe(testRover.position);
  });
  
  //test 11
  test("responds correctly to the mode change command", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')]; //initializing a command that changes the mode to low power from the initial value
    let testMessage = new Message('Cycling Power Modes', commands); //initializing a message to pass to receiveMessage
    let testRover = new Rover(111); //initializing a new Rover object
    let response = testRover.receiveMessage(testMessage); //passing the message to the rover
    expect(testRover.mode).toBe('LOW_POWER');
  })

  //test 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 15000)]; //initializing a command that changes the mode to low power then attempts to move the rover
    let testMessage = new Message('Attepmting to Move with Low Power', commands); //initializing a message to pass to receiveMessage
    let testRover = new Rover(99); //initializing a new Rover object
    let response = testRover.receiveMessage(testMessage); //passing the message to the rover
    expect(response.results[1].completed).toBe(false);
    expect(testRover.position).toBe(99);
  });

  //test 13
  test("responds with the position for the move command", function(){
    let commands = [new Command('MOVE', 15000)]; //initializing a command that changes the position of the rover
    let testMessage = new Message('Going Far!', commands); //initializing a message to pass to receiveMessage
    let testRover = new Rover(10); //initializing a new Rover object
    let response = testRover.receiveMessage(testMessage); //passing the message to the rover
    expect(testRover.position).toBe(15000);
  });
});
