var Jasmine = require('jasmine');
var jasmine = new Jasmine();
var JasmineConsoleReporter = require('jasmine-console-reporter');

jasmine.loadConfigFile('./config/jasmine.json');

var reporter = new JasmineConsoleReporter({
    colors: 1,
    cleanStack: 1,
    verbosity: 4,
    listStyle: 'indent',
    activity: false
});

jasmine.addReporter(reporter);

jasmine.execute();