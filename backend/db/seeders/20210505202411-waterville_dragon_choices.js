'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Choices', [
      { // 1
        body: 'Turn back',
        sceneId: 1,
        nextSceneId: 2,
        isWinning: false,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0,
      },
      { // 2
        body: 'Enter the castle',
        sceneId: 1,
        nextSceneId: 3,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 3
        body: 'Knock on the gate',
        sceneId: 3,
        nextSceneId: 4,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 4
        body: 'Climb the gate',
        sceneId: 3,
        nextSceneId: 6,
        isWinning: null,
        killsPlayer: false,
        conditionals: '661111',
        changeHealth: 0
      },
      { // 5
        body: 'Fight!',
        sceneId: 4,
        nextSceneId: 5,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: -5
      },
      { // 6
        body: 'Run away!',
        sceneId: 4,
        nextSceneId: 7,
        isWinning: false,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 7
        body: 'Continue on',
        sceneId: 5,
        nextSceneId: 10,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 8
        body: 'Sneak attack!',
        sceneId: 6,
        nextSceneId: 8,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: -2
      },
      { // 9
        body: 'Sneak around!',
        sceneId: 6,
        nextSceneId: 9,
        isWinning: null,
        killsPlayer: false,
        conditionals: '181111',
        changeHealth: 0
      },
      { // 10
        body: 'Continue on',
        sceneId: 8,
        nextSceneId: 10,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 11
        body: 'Continue on',
        sceneId: 9,
        nextSceneId: 10,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 12
        body: 'Charge!!',
        sceneId: 10,
        nextSceneId: 11,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: -10
      },
      { // 13
        body: 'Find a way to turn it all off',
        sceneId: 10,
        nextSceneId: 12,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111651',
        changeHealth: 0
      },
      { // 14
        body: `You've seen this before. Use your wits`,
        sceneId: 10,
        nextSceneId: 13,
        isWinning: null,
        killsPlayer: false,
        conditionals: '181171',
        changeHealth: -4
      },
      { // 15
        body: `Is that a door?`,
        sceneId: 10,
        nextSceneId: 14,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111181',
        changeHealth: 0
      },
      { // 16
        body: `Into the lair...`,
        sceneId: 11,
        nextSceneId: 15,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 17
        body: `Into the lair...`,
        sceneId: 12,
        nextSceneId: 15,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 18
        body: `Into the lair...`,
        sceneId: 13,
        nextSceneId: 15,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 19
        body: `Into the lair...`,
        sceneId: 14,
        nextSceneId: 15,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 20
        body: `Kill the beast`,
        sceneId: 15,
        nextSceneId: 16,
        isWinning: false,
        killsPlayer: true,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 21
        body: `Ask about the trophies`,
        sceneId: 15,
        nextSceneId: 17,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 22
        body: `Run away`,
        sceneId: 15,
        nextSceneId: 20,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 23
        body: `Arm wrestle the dragon`,
        sceneId: 17,
        nextSceneId: 18,
        isWinning: null,
        killsPlayer: false,
        conditionals: '811116',
        changeHealth: 0
      },
      { // 24
        body: `Convince the dragon to stop pillaging Waterville in exchange for trophies`,
        sceneId: 17,
        nextSceneId: 19,
        isWinning: null,
        killsPlayer: false,
        conditionals: '111117',
        changeHealth: 0
      },
      { // 25
        body: `Run away`,
        sceneId: 17,
        nextSceneId: 20,
        isWinning: false,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 26
        body: `And then...`,
        sceneId: 18,
        nextSceneId: 21,
        isWinning: true,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
      { // 27
        body: `And then...`,
        sceneId: 19,
        nextSceneId: 21,
        isWinning: true,
        killsPlayer: false,
        conditionals: '111111',
        changeHealth: 0
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Choices', null, {});
  }
};
