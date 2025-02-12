let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fight = 0;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterName = document.querySelector('#monsterName');
const monsterStat = document.querySelector('#monsterStat');
const monsterHealthText = document.querySelector('#monsterHealth');
const weapons = [
    {
        name: "baseball bat",
        power: 5
    },
    {
        name: "machete",
        power: 30
    },
    {
        name: "chainsaw",
        power: 50
    },
    {
        name: "shotgun",
        power: 100
    }
];

const monsters = [
    {
        name: "zombie",
        level: 2,
        health: 15
    },
    {
        name: "Alien",
        level: 8,
        health: 60
    },
    {
        name: "demon",
        level: 15,
        health: 100
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

const locations = [
    {
        name: "village",
        "button text": ["Go to Store", "Go to Cave", "Go to Castle"],
        "button functions": [goStore, goCave, goCastle],
        text: "You are in the center of the village and you see three signs: \"to the Store\", \"to the cave\", \"to the Castle\"."
    },
    {
        name: "store",
        "button text": ["Buy Health (10 gold)", "Buy Weapon (30 gold)", "Go to Village"],
        "button functions": [buyHealth, buyWeapon, goVillage],
        text: "You are now in the store."
    },
    {
        name: "cave",
        "button text": ["Fight zombie", "Fight alien", "Go Village"],
        "button functions": [fightZombie, fightAlien, goVillage],
        text: "You enter the cave and you see some monsters"
    },
    {
        name: "castle",
        "button text": ["Fight demon", "Fight dragon", "Go Village"],
        "button functions": [fightDemon, fightDragon, goVillage],
        text: "You have entered the castle, be careful, you could be in danger."
    },
    {
        name: "fighting",
        "button text": ["Attack", "Avoid", "Run"],
        "button functions": [attack, avoid, goVillage],
        text: "You are fighting a monster."
    },
    {
        name: "Killing monster",
        "button text": ["Go Village", "Go Village", "Secret Box?"],
        "button functions": [goVillage, goVillage, easterEgg],
        text: "You killed the monster, also you gain experience points and find some gold."
    },
    {
        name: "lose",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You die because you are weak."
    },
    {
        name: "win",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button function": [restart, restart, restart],
        text: "You killed the dragon!!! YOU WIN THE GAME!!!"
    },
    {
        name: "easter egg",
        "button text": ["3", "7", "Go to Village?"],
        "button functions": [pickThree, pickSeven, goVillage],
        text: "You find a mysterious box, you have two numbers to open it, 3 and 7, if the number you choose matches the box, you will win a prize."
    }
];



// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = goCastle;

function update(location) {
    monsterStat.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goVillage() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function goCastle() {
    update(locations[3]);
}
function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else {
        text.innerText = "You do not have enough gold to buy health."
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length -1) {
    if (gold >= 30) {
        gold -=30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You now have a " + newWeapon + ".";
        inventory.push(newWeapon);
        text.innerText += " In your inventory you have: " + inventory;
    }
    else {
        text.innerText = "You do not have enough gold to buy a weapon.";
    }
}
else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
}
}

function sellWeapon () {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + inventory + ".";
        text.innerText = " In your inventory you have: " + inventory;
    }
    else {
        text.innerText = "Do not sell your only weapon!";
    }
}

function fightZombie() {
    fight = 0;
    goFight();
}
function fightAlien() {
    fight = 1;
    goFight();
}

function fightDemon() {
    fight = 2;
    goFight();
}

function fightDragon() {
    fight = 3;
    goFight();
}
function goFight() {
    update(locations[4]);
    monsterHealth = monsters[fight].health;
    monsterStat.style.display = 'block';
    monsterName.innerText = monsters[fight].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack () {
    text.innerText = "The " + monsters[fight].name + " attacks.";
    text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";
    health -= monstersAttackValue(monsters[fight].level);
    if (ifMonsterHit) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp + 1);
    }
    else {
        text.innerText += "You miss.";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    }
    else if (monsterHealth <= 0) {
        defeatMonster();
        if (fight === 3) {
            winGame();
        }
        else {
            defeatMonster();
        }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText = "Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function ifMonsterHit () {
    return Math.random() > .2 || health < 20;
}

function monstersAttackValue (level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}

function avoid () {
    text.innerText = "You avoid the attack from the " + monsters[fight].name;
}

function lose () {
    update(locations[6]);
}

function winGame() {
    update(locations[7]);
}

function defeatMonster () {
    gold += Math.floor(monsters[fight].level * 4.5);
    xp += monsters[fight].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[5]);
    monsterStat.style.display = "none";
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goVillage();
}

function easterEgg () {
    update(locations[8]);
}
function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers: \n";
    for (let i = 0; i < 10; i++) {
        text.innerHTML = numbers[i] + "\n";
    }
    if (numbers.includes(guess)) {
        text.innerText = "Right! You win 50 gold!!!"
        gold =+ 50;
        goldText.innerText = gold;
    }
    else {
        text.innerText = "Wrong! A disgusting creature called Nicolas Maduro appears and steals 10 health from you!"
        health -= 10;
        healthText.innerText = health;
    }
}
function pickThree() {
    pick(3);
}
function pickSeven() {
    pick(7);
}