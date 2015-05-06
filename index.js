var _ = require('underscore');
var execTime = require('exec-time');

module.exports = gTester = {};

var _config =  {
  printResponses: true,
  printReport: true,
  printSteps: true,
  name: 'default',
  concurrentPlayers: 10
}

gTester.loadTest = function(config){
  if (!config) throw new Error("Missing argument config");

  	// set default values, if properties not already set
  	_.defaults(config,_config);
    _config = config;

    play(config);
}

gTester.getProfiler = function(){
  var profiler = new execTime(_config.name, _config.printSteps, 'ms');
  return profiler;
}

function play(config,callback){
  var errors = [];
  var results = [];
  _.range(config.players).forEach(function(id){

    config.targetFunction(function(err,data){

      // log result:
       		results.push({
       			requestId: id,
       			success: err ? false : true,
       			response: err || data
       		});
    });
  });
}

function calculateStats(errors,results){

}

function outputReport(report){

}
