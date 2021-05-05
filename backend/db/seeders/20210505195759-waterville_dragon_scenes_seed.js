'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Scenes', [
      { // 1
        storyId: 1,
        title: `Waterville's Dragon Problem`,
        body: `Recently, a dragon has been terrorizing the lands around Waterville. The local populace has hired you to take care of the situation. After a day's ride, you've arrived at the abandoned castle where the dragon's lair is said to be. What do you do?`,
        backgroundImg: null,
      },
      { // 2
        storyId: 1,
        title: `Turn back`,
        body: `Wait, a dragon? No one told you there would be a dragon! And even if they did, what were you possibly thinking when you took on this quest? Deciding that you're too cowardly for this, you turn back. You are shamed in front of the entire population of Waterville, but at least you have your life.`,
        backgroundImg: null,
      },
      { // 3
        storyId: 1,
        title: `Enter the castle`,
        body: `You approach the front gates of the castle. They loom high above you. If you're dexterous enough, you might be able to climb them.`,
        backgroundImg: null,
      },
      { // 4
        storyId: 1,
        title: `Knock on the gate`,
        body: `As soon as you knock on the gate, you hear chattering, and the gate opens. As you begin to step inside, three goblins jump out and confront you!`,
        backgroundImg: null,
      },
      { // 5
        storyId: 1,
        title: `Fight!`,
        body: `Dropping to a fighting stance, you engage the goblins. They are at first loud and annoying, poking you with their sharpened sticks, but soon lay dead.`,
        backgroundImg: null,
      },
      { // 6
        storyId: 1,
        title: `Climb the gate`,
        body: `You beging to scale the large gate. It's actually quite easy, with many footholds for you to utilize, and it helps even more that the top is broken, with enough room for you to slip through. As you descend, you hear chattering - it sounds like goblins. You might be able to avoid them if you're dexterous enough.`,
        backgroundImg: null,
      },
      { // 7
        storyId: 1,
        title: `Run away!`,
        body: `Goblins with sharp sticks? What are you suppose to do, murder them? You don't know how to handle this. You quickly sprint away, never to be seen by them again.`,
        backgroundImg: null,
      },
      { // 8
        storyId: 1,
        title: `Sneak attack!`,
        body: `You run up behind the goblins, who seem to be roasting a rabbit and chatting about how much they love roasting rabbits, and you attack full force. One of them manages to pick up one of their roasting sticks and stabs you, but they are no match for you in the end.`,
        backgroundImg: null,
      },
      { // 9
        storyId: 1,
        title: `Sneak around!`,
        body: `Quietly avoiding the goblins, you manage to sneak around them, leaving everyone (including yourself) unharmed.`,
        backgroundImg: null,
      },
      { // 10
        storyId: 1,
        title: `Continue on`,
        body: `You enter the castle, walking down the halls. After some time, you come to a corridor filled with an immense amount of traps - spikes, flailing death balls, and caltrops galore. Going through this will be difficult to say the least.`,
        backgroundImg: null,
      },
      { // 11
        storyId: 1,
        title: `CHARGE!!`,
        body: `What is pain but an illusion? At least that's what you tell yourself as you dive into the mess of contraptions that sever your flesh`,
        backgroundImg: null,
      }, { // 12
        storyId: 1,
        title: `Find a way to turn it all off`,
        body: `Looking around, you notice one of the stones loose. You pry it off of the wall to find a crevice with a small device in it. Tinkering with it a little, you manage to shut down all of the traps. You now have free passage to continue.`,
        backgroundImg: null,
      },
      { // 13
        storyId: 1,
        title: `You've seen this before. Use your wits`,
        body: `Dodging traps is nothing new to you. Expertly, you manage to move through most of the contraptions with ease, although you do take a few hits here and there.`,
        backgroundImg: null,
      },
      { // 14
        storyId: 1,
        title: `Is that a door?`,
        body: `It is a door, hidden in the stone! After messing with it a little, you find a stone that easily opens the door. Stepping through, you find that the passage completely bypasses all of the traps and leads you to the other side unharmed.`,
        backgroundImg: null,
      },
      { // 15
        storyId: 1,
        title: `Into the lair...`,
        body: `The dragon's lair is dark and expansive, and does not contain nearly as much gold as you were hoping for. As you enter, you see it - the beast, laying on a pile of cheap plastic trophies.`,
        backgroundImg: null,
      },
      { // 16
        storyId: 1,
        title: `Kill the beast`,
        body: `Unfortunately, it's not easy to kill a dragon, even one who apparently hordes cheap plastic trophies. As you charge, the dragon lets out a breath of fire, and the flames engulf you, killing you nearly instantly.`,
        backgroundImg: null,
      },
      { // 17
        storyId: 1,
        title: `Ask about the trophies`,
        body: `"These? These are my arm wrestling trophies. I am renown throughout the lands north of here as the local arm wrestling champion. However, they ran out of trophies to give me, so I burned their towns down and moved down here."`,
        backgroundImg: null,
      },
      { // 18
        storyId: 1,
        title: `Arm wrestle the dragon`,
        body: `This is the moment you've been waiting for your entire life - you get to arm wrestle a dragon. The dragon, clearly bored, accepts your proposal. The two of you set yourselves up, and grasp each other's hands (or rather you grasp his claw). The dragon obviously beats you pretty quickly, but is impressed with how well you held yourself. He accepts that maybe a local arm wrestling league could be set up here, and if it was then he would have no reason to terrorize the local population. You gladly run back to Waterville and let everyone know.`,
        backgroundImg: null,
      },
      { // 19
        storyId: 1,
        title: `Convince the dragon to stop pillaging Waterville in exchange for trophies`,
        body: `You try to convince the dragon to stop pillaging Waterville in exchange for more plastic trophies. This debate goes on for about 20 minutes, discussing things such as atheletic integrity, the meaning of sportsmanship, and how they can possibly make those tropies look so shiney. Eventually, the dragon relents, and does agree that the shininess of the trophies is the most import aspect, and he really just got into arm wrestling to get cheap and available shiney things. He says he will stop terrorizing the local population if they bring him offerings of plastic trophies. You gladly run back to Waterville and let everyone know.`,
        backgroundImg: null,
      },
      { // 20
        storyId: 1,
        title: `Run away`,
        body: `Okay, three goblins and a thousand traps are fine, but you draw the line at a dragon sitting on a horde of plastic trophies. You turn around and book it out of there, never to return.`,
        backgroundImg: null,
      },
      { // 21
        storyId: 1,
        title: `And then...`,
        body: `The people of Waterville, while not incredibly pleased with a dragon now living next door to them, are at least content in the fact that they can continue to live their lives in relative peace, as long as they appease the dragon in the way he wants. They give you your payment and thank you for your services.`,
        backgroundImg: null,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Scenes', null, {});
  }
};
