let taskPower = module.exports;
taskPower.run = function(spawns) {
    let spawn1 = spawns[0];
    let r = spawn1.room;
    let powerBanks = r.find(FIND_STRUCTURES, {
        filter: (s) => (s.structureType == STRUCTURE_POWER_BANK)
    });
    let powerSpawns = r.find(FIND_STRUCTURES, {
        filter: (s) => (s.structureType == STRUCTURE_POWER_SPAWN)
    });
    if(Game.time % 20 == 0) {
        if(powerBanks.length) {
            let msg = r.name + " has power, " + Math.round(100.0*powerBanks[0].hits/powerBanks[0].hitsMax) + "% remaining, " + powerBanks[0].ticksToDecay + " ticks remaining";
            console.log(msg); Game.notify(msg);
        }
    }
    if(powerBanks.length && (!Memory.roomData[r.name].power || !Memory.roomData[r.name].powerAccess)) {
        let powerBank = powerBanks[0];
        Memory.roomData[r.name].power = powerBank.id;
        if(!Memory.roomData[r.name].powerAccess) {
            let terrain = r.getTerrain();
            let x = powerBank.pos.x;
            let y = powerBank.pos.y;
            let access = 0;
            if(terrain.get(x+1,y)==0) access++;
            if(terrain.get(x-1,y)==0) access++;
            if(terrain.get(x,y+1)==0) access++;
            if(terrain.get(x,y-1)==0) access++;
            if(terrain.get(x+1,y+1)==0) access++;
            if(terrain.get(x-1,y-1)==0) access++;
            if(terrain.get(x-1,y+1)==0) access++;
            if(terrain.get(x+1,y-1)==0) access++;
            Memory.roomData[r.name].powerAccess = access;
        }
    } else if(!powerBanks.length && (Memory.roomData[r.name].power || Memory.roomData[r.name].powerAccess)) {
        delete Memory.roomData[r.name].power;
        delete Memory.roomData[r.name].powerAccess;
    }

    if(powerSpawns.length && powerSpawns[0].power >= 1 && powerSpawns[0].energy >= 50) {
        powerSpawns[0].processPower();
        Game.notify(r.name + " processed power, GPL = " + (Game.gpl.level + (Math.round(1000*Game.gpl.progress/Game.gpl.progressTotal)/1000)));
    }
};
taskPower.name = "power";