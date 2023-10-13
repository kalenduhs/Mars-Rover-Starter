const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    test("throws error if a name is NOT passed into the constructor as the first parameter", function(){
        //let testMessage = new Message();
        expect( function() { new Message();}).toThrow(new Error('Needs a message name.'));
    });

    test("constructor sets name", function(){
        let testMessage = new Message('Zoom');
        expect(testMessage.name).toBe('Zoom');
    });

    test("contains a commands array passed into the constructor as the 2nd argument", function(){
        let commands = [new Command('commandType0', 0), new Command('commandType1', 1), new Command('commandType2')];
        let testMessage = new Message('Placeholder', commands);
        expect(testMessage.commands).toBe(commands);
    });
});
