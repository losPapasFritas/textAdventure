let allMain = `<section>Choose a character! <br><br> <button class="paul">Paul the Knight</button> <button class="hannah">Hannah the Magician</button> <button class="mathew">Mathew the Tamer</button></section>`
let char = `none`,
    currentE = `none`,
    eHp = 0,
    maxEHp = 0,
    eDef = 0,
    eLvl = 0,
    pMagicDmg = 1,
    pBlockDef = 10,
    pLvl = 1,
    pSpells = [],
    pHp = 100;

let enemies = [`goblin`, `immortal worm`, `bandit`, `imp`, `mud man`, `walking fish`, `stone golem`, `cyclopes`];
let eHpAll = [25];
let eLvlAll = [1];
let eDefAll = [0];
let pItems = [];
let allPSpellType = [`fire`,
                     `water`,
                     `earth`]
let allPSpells = [`Fireball`,
                  `Healing Spring`,
                  `Stone Bullet`];
let pSpellDmg = [10,
                 20,
                 5];
let pSpellAttkMax = [1,
                     1,
                     5];

function hannahSelect() {
    char = `h`
    pMagicDmg = 1.5;
    pSpells = [`Fireball`, `Healing Spring`, `Stone Bullet`];
    allMain+=`<br><br><br><br><section id="hannahDesc" class="visible">The noble yet troublesome apprentice of the Grand Wizard Master Kobain. She has an immense desire to obtain the powers of the world's elements, however she has a long and dangerous road if she wants to achieve this magnitude of power. Her conscience and belief in the Grand Wizard repels her from the most desperate bargains of terrible evils.  <br><br> <button id="hannahSelect">Select this character</button> <button>Paul the Knight</button> <button>Mathew the Tamer</button></section> `
    allMain += `<br><br><br><br><section class="visible">You take the vessel of Hannah, the noble yet troublesome apprentice of the Grand Wizard Master Kobain. She has an immense desire to obtain the powers of the world's elements, however she has a long and dangerous road if she wants to achieve this magnitude of power. Her conscience and belief in the Grand Wizard repels her from the most desperate bargains of terrible evils.  <br><br></section>`;
    allMain += `<section>Violence was never a rarity in the Eastern Slums, but matters have only further deteriorated from the threat of the Dragon's wrath in this past month.  You remember that night with defining clarity. <br><br><button onclick="han0()">Next.</button></section>`;
    document.getElementById(`main`).innerHTML = allMain;
}

function han0() {
    allMain += `<br><br><br><br><section>Night was overtaken by the fury from the monsters beneath the land. Great cracks manifested their way from the ground with unknown creatures seeping out of them. Disturbed from their long slumber, the inherent violence of the tangible beings ran rampant throughout the streets of the town. <br><br><button onclick="han1()">Next.</button></section>`;
    document.getElementById(`main`).innerHTML = allMain
}

function han1() {
    allMain += `<br><br><br><br><section>You are in the dusty unpaved town square. Before you is a dimly lit alley.<br><br><button onclick="han2()">Go in the alley.</button></section>`;
    document.getElementById(`main`).innerHTML = allMain
}

function han2(){
    allMain+=`<br><br><br><br><section>Large wax candles hang from rusted metal poles that do a terrible job at illuminating the pathway. In the distance of the dark, flickering orange expanse emerges a gruffled shape.<br><br><button onclick="combatSetup(enemies[0])">Fight Engage.</button></section>`
    document.getElementById(`main`).innerHTML = allMain
}

function combatSetup(enemy) {
    currentE = enemy
    let eIndx = enemies.indexOf(currentE);
    eHp = eHpAll[eIndx];
    maxEHp = eHpAll[eIndx];
    eDef = eDefAll[eIndx];
    eLvl = eLvlAll[eIndx];
    let aOrAn = `a`;
    switch (enemy[0]) {
        case `a`:
            aOrAn = `an`;
            break;
        case `e`:
            aOrAn = `an`;
            break;
        case `i`:
            aOrAn = `an`;
            break;
        case `o`:
            aOrAn = `an`;
            break;
        case `u`:
            aOrAn = `an`;
            break;
    }
    allMain += `<br><br><br><br><section>You encounter ${aOrAn} ${enemy}.<br><br>`
    if (char = `h`) {
        allMain += `<button onclick="magicAttk()">Magic</button> `
    }
    else {
        allMain += `<button onclick="generalAttk()">Fight</button> `
    }
    allMain += `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="items()">Inventory</button> <button onclick="run()">Run</section>`
    document.getElementById(`main`).innerHTML = allMain
}

function inspect() {
    let hpPercent = eHp / maxEHp;
    if (hpPercent > 0.75) {
        allMain += `<br><br><br><br><section>The ${currentE} looks very healthy`;
    }
    else if (hpPercent > 0.5) {
        allMain += `<br><br><br><br><section>The ${currentE} looks a little hurt`;
    }
    else if (hpPercent > 0.25) {
        allMain += `<br><br><br><br><section>The ${currentE} looks like it will collapse`;
    }
    else if (hpPercent > 0) {
        allMain += `<br><br><br><br><section>The ${currentE} looks like it's hanging on by a thread`;
    }
    if (eLvl + 2 < pLvl) {
        allMain += ` and it looks much weaker than you.`;
    }
    else if (eLvl < pLvl) {
        allMain += ` and it looks a little weaker than you.`;
    }
    else if (eLvl === pLvl) {
        allMain += ` and it looks to be about as strong as you.`;
    }
    else if (eLvl - 2 < pLvl) {
        allMain += ` and it looks a little stronger than you.`;
    }
    else if (eLvl > pLvl) {
        allMain += ` and it looks much stonger than you.`;
    }
    allMain += `<br>Would you like to do a deep inspection?<br><br> <button onclick="deepInspect()">Yes</button><button onclick="combatContinue()">No</button></section>`
    // allMain+=
    document.getElementById(`main`).innerHTML = allMain
}

function run() {
    allMain += `<br><br><br><br><section>Would you like to run from this encounter?<br><br> <button onclick="pleaseRun()">Yes</button><button onclick="combatContinue()">No</button></section>`
    document.getElementById(`main`).innerHTML = allMain
}

function magicAttk(){
    allMain+=`<br><br><br><br><section>Your current spells :<br><br>`;
    for(item of pSpells){
        allMain+=`<button onclick='magicAttkAction("${item}")'>${item}</button> `
    }
    allMain+=`<button onclick="combatContinue()">Cancel</button></section>`
    document.getElementById(`main`).innerHTML = allMain
}

function magicAttkAction(spell){
    let castSpellIndx = allPSpells.indexOf(spell);
    let dmgToE = 0;
    let attkMiss = false;
    let attkChance = 0.8;
    while(!attkMiss){
        if(Math.random() < attkChance){
            dmgToE += pSpellDmg[castSpellIndx];
            attkChance -= 0.1;
        }
        else{
            attkMiss = true;
        }
    }
    if(`fire` === allPSpellType[castSpellIndx]){
        //stuff
    }
    else if(`earth` === allPSpellType[castSpellIndx]){
        pMagicDmg += 0.25
    }
    else{
        pHp += dmgToE;
        return undefined;
    }
    dmgToE *= pMagicDmg;
    eHp -= dmgToE;
}

function combatContinue() {
    allMain += `<br><br><br><br> <section>Select an action<br><br>`
    if (char = `h`) {
        allMain += `<button onclick="magicAttk()">Magic</button> `
    }
    else {
        allMain += `<button onclick="generalAttk()">Fight</button> `
    }
    allMain += `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="items()">Inventory</button> <button onclick="run()">Run</section>`
    document.getElementById(`main`) .innerHTML = allMain
}

document.addEventListener("DOMContentLoaded", function () {
    let paulAll = document.getElementsByClassName(`paul`);
    let hannahAll = document.getElementsByClassName(`hannah`);
    let mathewAll = document.getElementsByClassName(`mathew`);
    for (item of paulAll) {
        item.addEventListener(`click`, function () {
            document.getElementById(`paulDesc`).classList.remove(`hidden`);
            document.getElementById(`paulDesc`).classList.add(`visible`);
            document.getElementById(`hannahDesc`).classList.remove(`visible`);
            document.getElementById(`hannahDesc`).classList.add(`hidden`);
            document.getElementById(`mathewDesc`).classList.remove(`visible`);
            document.getElementById(`mathewDesc`).classList.add(`hidden`);
        });
    }
    for (item of mathewAll) {
        item.addEventListener(`click`, function () {
            document.getElementById(`mathewDesc`).classList.remove(`hidden`);
            document.getElementById(`mathewDesc`).classList.add(`visible`);
            document.getElementById(`hannahDesc`).classList.remove(`visible`);
            document.getElementById(`hannahDesc`).classList.add(`hidden`);
            document.getElementById(`paulDesc`).classList.remove(`visible`);
            document.getElementById(`paulDesc`).classList.add(`hidden`);
        });
    }
    for (item of hannahAll) {
        item.addEventListener(`click`, function () {
            document.getElementById(`hannahDesc`).classList.remove(`hidden`);
            document.getElementById(`hannahDesc`).classList.add(`visible`);
            document.getElementById(`paulDesc`).classList.remove(`visible`);
            document.getElementById(`paulDesc`).classList.add(`hidden`);
            document.getElementById(`mathewDesc`).classList.remove(`visible`);
            document.getElementById(`mathewDesc`).classList.add(`hidden`);
        });
    }
});