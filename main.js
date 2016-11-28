var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function() {

	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

	if (harvesters.length < 3) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
			role: 'harvester'
		});
		console.log('Spawning new harvester: ' + newName);
	}

	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

	if (upgraders.length < 5) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE], undefined, {
			role: 'upgrader'
		});
		console.log('Spawning new upgrader: ' + newName);
	}

	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

	if (builders.length < 0) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
			role: 'builder'
		});
		console.log('Spawning new builder: ' + newName);
	}
	
	var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

	if (repairers.length < 3) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
			role: 'repairer'
		});
		console.log('Spawning new repairer: ' + newName);
	}
	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		if (creep.memory.role == 'harvester') {
			roleHarvester.run(creep);
		}
		if (creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep);
		}
		if (creep.memory.role == 'builder') {
			roleBuilder.run(creep);
		}
		if (creep.memory.role == 'repairer') {
			roleRepairer.run(creep);
		}
	}
}
