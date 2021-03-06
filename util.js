let priority = {
    [TOUGH]: 10,
    [CARRY]: 9,
    [WORK]: 8,
    [MOVE]: 7,
    [ATTACK]: 6,
    [RANGED_ATTACK]: 5,
    [HEAL]: 4,
    [CLAIM]: 3
};
let cost = {
    [TOUGH]: 10,
    [CARRY]: 50,
    [WORK]: 100,
    [MOVE]: 50,
    [ATTACK]: 80,
    [RANGED_ATTACK]: 150,
    [HEAL]: 250,
    [CLAIM]: 600
}
function bodyCost (body) {
    return body.reduce(function(cost, part) {
        return cost + BODYPART_COST[part];
    }, 0);
};

let util = module.exports;
util.goClaim = function(home,target) {
    let result = -1;
    let spawns = Game.rooms[home].find(FIND_MY_SPAWNS);
    let i = 0;
    let body = [TOUGH,CLAIM,WORK,WORK,MOVE,MOVE,MOVE,MOVE];
    while(result != OK && i < spawns.length) {
        result = spawns[i].spawnCreep(
            body,
            "claimer-"+home,
            { memory: { home: home, role: "claimer", targetRoom: target } }
        );
        if(result == OK) {
            console.log(spawns[0].room.name + ": birthed claimer-" + home + ", [" + body + "]");
            Memory.roomData[home].claiming = target;
            break;
        }
        i++;
    }
    return result;
};
util.pickupEnergyInRange = function(creep,range,minAmount=25) {
    let t = creep.pos.findInRange(FIND_DROPPED_RESOURCES, range, {
        filter: (r) => r.resourceType == RESOURCE_ENERGY});
    if(t.length > 0 && t[0].amount > minAmount) {
        creep.pickup(t[0])
        creep.moveTo(t[0]);
        return true;
    }
    return false;
};
util.pickupResourceInRange = function(creep,range,minAmount=0) {
    let t = creep.pos.findInRange(FIND_DROPPED_RESOURCES, range, {
        filter: (r) => r.resourceType != RESOURCE_ENERGY});
    if(t.length > 0 && t[0].amount > minAmount) {
        creep.pickup(t[0])
        creep.moveTo(t[0]);
        return true;
    }
    return false;
};
util.getDate = function() {
    let offset = -5;
    return new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace('GMT', 'CST' ); 
};
util.fixTerminals = function(spawn1,creep) {
    let term = spawn1.room.terminal;
    if(term && (_.sum(term.store) > 280000)) {
        for(let rss in term.store) {
            if(rss == RESOURCE_ENERGY) continue;
            let take =  _.sum(term.store) - 280000;
            if(take > creep.carryCapacity) take = creep.carryCapacity;
            if(creep.withdraw(term, rss, take) != OK) {
                creep.moveTo(term);
            } 
            creep.drop(rss);
        }
        return true;
    }
    return false;
}
util.getSum = function(arr,attr="amt") {
    let sum = 0;
    for(let b in arr) {
        sum += arr[b][attr];
    }
    return sum; 
};
util.bodyCost = function(body) {
    return body.reduce(function(cost, part) {
        return cost + BODYPART_COST[part];
    }, 0);
};
util.initializeRoomData = function(spawns, r) {
    if(!Memory.roomData[r.name]) Memory.roomData[r.name] = { travelData: {}, sourceData: {} };
    if(!Memory.roomData[r.name].sourceData || _.values(Memory.roomData[r.name].sourceData).length == 0) {
        Memory.roomData[r.name].sourceData = {};
        r.find(FIND_SOURCES).forEach(function(s) {
            if(!Memory.roomData[r.name].sourceData[s.id]) {
                let c = PathFinder.search(s.pos,spawns[0].pos).path[0];
                Memory.roomData[r.name].sourceData[s.id] = {
                    container: JSON.stringify({x:c.x,y:c.y,room:c.roomName}),
                    harvester: ""
                }
            }
        });
    }
};
util.processTickData = function() {
    let t = new Date().getTime() / 1000;
    Memory.tickData.ticks++;
    if(t >= Memory.tickData.time + 10) {
        Memory.tickData.rate = Math.round((Memory.tickData.ticks / (t - Memory.tickData.time)) * 1000.0) / 1000.0;
        Memory.tickData.ticks = 0;
        Memory.tickData.time = t;
    }
    global.displays.push("Average tick rate: " + Memory.tickData.rate + " ticks/s");
    global.displays.push("Tick % 100 = " + Game.time % 100);
    global.displays.push("CPU Bucket: " + Game.cpu.bucket);
};
util.setupRoomData = function() {
    if(!Memory.roomData) Memory.roomData = {};
    delete Memory.tickData;
    Memory.tickData = { time: new Date().getTime() / 1000, ticks: 0, rate: "Calculating"};
};
util.isWalkable = function(x, y, room, terrain) {
    if(terrain.get(x,y) == TERRAIN_MASK_WALL) // terrain is an unwalkable wall tile
        return false;
    let data = room.lookAt(x,y);
    let walkable = true;
    data.forEach(function(o) {
        if(walkable == false) return;
        if(o.type == 'structure') {
            if(o.structure.structureType != STRUCTURE_CONTAINER && o.structure.structureType != STRUCTURE_ROAD) {
                walkable = false;
            }
        }
    });
    return walkable;
};
util.randomIntFromInterval = function(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};