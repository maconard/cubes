module.exports = {
    buildTarget: "",
    upgradeTarget: "",
    spawnEnergy: { 0: 300, 1: 300, 2: 550, 3: 800, 4: 1000, 5: 1200, 6: 1500, 7: 1800, 8: 4000},
    energyShareThreshold: 300000,
    count: {
        override: {
            MAX_HARVESTER:      0,
            MAX_BUILDER:        0,
            MAX_UPGRADER:       0,
            MAX_REPAIRMEN:      0,
            MAX_COURIER:        0,
            MAX_GUARDS:         0,
            MAX_INVADERS:       0,
            MAX_MINER:          0  
        },
        1: {
            MAX_HARVESTER:      2,
            MAX_BUILDER:        0,
            MAX_UPGRADER:       1,
            MAX_REPAIRMEN:      0,
            MAX_COURIER:        1,
            MAX_GUARDS:         0,
            MAX_INVADERS:       0,
            MAX_MINER:          0
        },
        2: {
            MAX_HARVESTER:      2,
            MAX_BUILDER:        2,
            MAX_UPGRADER:       1,
            MAX_REPAIRMEN:      0,
            MAX_COURIER:        1,
            MAX_GUARDS:         0,
            MAX_INVADERS:       0,
            MAX_MINER:          0
        },
        3: {
            MAX_HARVESTER:      2,
            MAX_BUILDER:        2,
            MAX_UPGRADER:       2,
            MAX_REPAIRMEN:      0,
            MAX_COURIER:        2,
            MAX_GUARDS:         0,
            MAX_INVADERS:       0,
            MAX_MINER:          0
        },
        4: {
            MAX_HARVESTER:      2,
            MAX_BUILDER:        2,
            MAX_UPGRADER:       2,
            MAX_REPAIRMEN:      1,
            MAX_COURIER:        2,
            MAX_GUARDS:         0,
            MAX_INVADERS:       0,
            MAX_MINER:          0
        },
        5: {
            MAX_HARVESTER:      2,
            MAX_BUILDER:        2,
            MAX_UPGRADER:       2,
            MAX_REPAIRMEN:      1,
            MAX_COURIER:        2,
            MAX_GUARDS:         0,
            MAX_INVADERS:       0,
            MAX_MINER:          0
        },
        6: {
            MAX_HARVESTER:      2,
            MAX_BUILDER:        2,
            MAX_UPGRADER:       2,
            MAX_REPAIRMEN:      1,
            MAX_COURIER:        2,
            MAX_GUARDS:         0,
            MAX_INVADERS:       0,
            MAX_MINER:          1
        },
        7: {
            MAX_HARVESTER:      2,
            MAX_BUILDER:        1,
            MAX_UPGRADER:       2,
            MAX_REPAIRMEN:      0,
            MAX_COURIER:        2,
            MAX_GUARDS:         0,
            MAX_INVADERS:       0,
            MAX_MINER:          1
        },
        8: {
            MAX_HARVESTER:      2,
            MAX_BUILDER:        1,
            MAX_UPGRADER:       1,
            MAX_REPAIRMEN:      0,
            MAX_COURIER:        2,
            MAX_GUARDS:         0,
            MAX_INVADERS:       0,
            MAX_MINER:          1
        },
    }
};