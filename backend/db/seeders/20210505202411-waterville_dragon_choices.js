'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Choices', [
      { // 1
        body: 'Turn back',
        sceneId: 1,
        nextSceneId: 2,
        isWinning: false,
        killsPlayer: false
      },
      { // 2
        body: 'Enter the castle',
        sceneId: 1,
        nextSceneId: 3,
        isWinning: null,
        killsPlayer: false
      },
      { // 3
        body: 'Knock on the gate',
        sceneId: 3,
        nextSceneId: 4,
        isWinning: null,
        killsPlayer: false
      },
      { // 4
        body: 'Climb the gate',
        sceneId: 3,
        nextSceneId: 6,
        isWinning: null,
        killsPlayer: false
      },
      { // 5
        body: 'Fight!',
        sceneId: 4,
        nextSceneId: 5,
        isWinning: null,
        killsPlayer: false
      },
      { // 6
        body: 'Run away!',
        sceneId: 4,
        nextSceneId: 7,
        isWinning: false,
        killsPlayer: false
      },
      { // 7
        body: 'Continue on',
        sceneId: 5,
        nextSceneId: 10,
        isWinning: null,
        killsPlayer: false
      },
      { // 8
        body: 'Sneak attack!',
        sceneId: 6,
        nextSceneId: 8,
        isWinning: null,
        killsPlayer: false
      },
      { // 9
        body: 'Sneak around!',
        sceneId: 6,
        nextSceneId: 9,
        isWinning: null,
        killsPlayer: false
      },
      { // 10
        body: 'Continue on',
        sceneId: 8,
        nextSceneId: 10,
        isWinning: null,
        killsPlayer: false
      },
      { // 11
        body: 'Continue on',
        sceneId: 9,
        nextSceneId: 10,
        isWinning: null,
        killsPlayer: false
      },
      { // 12
        body: 'Charge!!',
        sceneId: 10,
        nextSceneId: 11,
        isWinning: null,
        killsPlayer: false
      },
      { // 13
        body: 'Find a way to turn it all off',
        sceneId: 10,
        nextSceneId: 12,
        isWinning: null,
        killsPlayer: false
      },
      { // 14
        body: `You've seen this before. Use your wits`,
        sceneId: 10,
        nextSceneId: 13,
        isWinning: null,
        killsPlayer: false
      },
      { // 15
        body: `Is that a door?`,
        sceneId: 10,
        nextSceneId: 14,
        isWinning: null,
        killsPlayer: false
      },
      { // 16
        body: `Into the lair...`,
        sceneId: 11,
        nextSceneId: 15,
        isWinning: null,
        killsPlayer: false
      },
      { // 17
        body: `Into the lair...`,
        sceneId: 12,
        nextSceneId: 15,
        isWinning: null,
        killsPlayer: false
      },
      { // 18
        body: `Into the lair...`,
        sceneId: 13,
        nextSceneId: 15,
        isWinning: null,
        killsPlayer: false
      },
      { // 19
        body: `Into the lair...`,
        sceneId: 14,
        nextSceneId: 15,
        isWinning: null,
        killsPlayer: false
      },
      { // 20
        body: `Kill the beast`,
        sceneId: 15,
        nextSceneId: 16,
        isWinning: false,
        killsPlayer: true
      },
      { // 21
        body: `Ask about the trophies`,
        sceneId: 15,
        nextSceneId: 17,
        isWinning: null,
        killsPlayer: false
      },
      { // 22
        body: `Ask about the trophies`,
        sceneId: 15,
        nextSceneId: 20,
        isWinning: null,
        killsPlayer: false
      },
      { // 23
        body: `Arm wrestle the dragon`,
        sceneId: 17,
        nextSceneId: 18,
        isWinning: null,
        killsPlayer: false
      },
      { // 24
        body: `Convince the dragon to stop pillaging Waterville in exchange for trophies`,
        sceneId: 17,
        nextSceneId: 19,
        isWinning: null,
        killsPlayer: false
      },
      { // 25
        body: `Run away`,
        sceneId: 17,
        nextSceneId: 20,
        isWinning: false,
        killsPlayer: false
      },
      { // 26
        body: `And then...`,
        sceneId: 18,
        nextSceneId: 21,
        isWinning: true,
        killsPlayer: false
      },
      { // 27
        body: `And then...`,
        sceneId: 19,
        nextSceneId: 21,
        isWinning: true,
        killsPlayer: false
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Choices', null, {});
  }
};
