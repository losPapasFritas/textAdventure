    let allMain = `<section>Choose a character! <br><br> <button class="paul">Paul the Knight</button> <button class="hannah">Hannah the Magician</button> <button class="mathew">Mathew the Tamer</button></section>`
let char = `none`,
    saveState = `none`,
    currentEs = [],
    enemy1,
    enemy2,
    enemy3,
    enemy4,
    pMagicDmg = 1,
    pDmg = 1,
    pBlockDef = 10,
    pBlockBuff = 10,
    pLvl = 1,
    pSpells = [],
    pHp = 100;
class enemy {
    constructor(e, eHp, eDmg, eLvl, eDef, magicDmg = 0) {
        this.e = e;
        this.eHp = eHp;
        this.maxEHp = eHp;
        this.eDmg = eDmg;
        this.eLvl = eLvl;
        this.eDef = eDef;
        this.dotLength = 0;
        this.dot = 0;
        this.magicDmg = magicDmg;
    }
    get hpPercent() {
        return this.eHp / this.maxEHp
    }
}
let enemies = [`goblin`, `immortal worm`, `bandit`, `imp`, `mud man`, `walking fish`, `stone golem`, `cyclopes`];
let eHpAll = [25, 1000, 40];
let eDmgAll = [10, 1, 15];
let eLvlAll = [1, 50, 7];
let eDefAll = [10, 99.99999999, 10];
let itemList = [{name:`Enchanted Golden Apple`, hp:10000, def:10000, dmg: 100, magic:19}]
let pItems = [];
let allPSpellType = [
    `fire`,
    `water`,
    `earth`]
let allPSpells = [
    `Fireball`,
    `Healing Spring`,
    `Stone Bullet`];
let allFireDotLength = [
    5
];
let allFireDot = [
    3
];
let pSpellDmg = [
    10,
    20,
    5];
let pSpellAttkMax = [
    1,
    1,
    5];
let pSpellAttkNum = [
    1,
    1,
    2]

class buffItem {
    constructor(itemName, hpBuff, defBuff, dmgBuff, magicBuff) {
        this.itemName = itemName;
        this.hpBuff = hpBuff;
        this.defBuff = defBuff;
        this.dmgBuff = dmgBuff;
        this.magicBuff = magicBuff;
    }
    use() {
        pHp+= this.hpBuff;
        pBlockDef+=this.defBuff;
        pDmg += this.dmgBuff;
        pMagicDmg += this.magicBuff;
        pItems.splice(pItems.indexOf(this),1);
    }
}

class debuffItem {
    constructor(itemName, hpDebuff, defDebuff, dmgDebuff, targetNum = 1) {
        this.itemName = itemName;
        this.hpDebuff = hpDebuff;
        this.defDebuff = defDebuff;
        this.dmgDebuff = dmgDebuff;
        this.targetNum = targetNum;
    }
    use() {
        pHp+= this.hpBuff;
        pBlockDef+=this.defBuff;
        pDmg += this.dmgBuff;
        pMagicDmg += this.magicBuff;
        pItems.splice(pItems.indexOf(this),1);
    }
}

function givePlayerItem(itemNum = -1) {
    if (itemNum === -1) {
        let itemNum = getRandomInt(0,itemList.length);
        if (itemNum < 5) {
            pItems.push(new buffItem(itemList[itemNum].name,itemList[itemNum].hp,itemList[itemNum].def,itemList[itemNum].dmg,itemList[itemNum].magic));
        }
        else{
            pItems.push(new debuffItem(itemList[itemNum].name,itemList[itemNum].hp,itemList[itemNum].def,itemList[itemNum].dmg,itemList[itemNum].targets));
        }
    }
}

function end() {
    document.getElementById(`main`).innerHTML = allMain
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
function aOrAn(firstLetter) {
    let firstAlpha = firstLetter[0];
    let phrase = `a`;
    switch (firstAlpha) {
        case `a`:
            phrase = `an`;
            break;
        case `e`:
            phrase = `an`;
            break;
        case `i`:
            phrase = `an`;
            break;
        case `o`:
            phrase = `an`;
            break;
        case `u`:
            phrase = `an`;
            break;
    }
    return phrase;
}

function hannahSelect() {
    char = `h`
    pMagicDmg = 1.5;
    pSpells = [`Fireball`, `Healing Spring`, `Stone Bullet`];
    allMain += `<br><br><br><br><section id="hannahDesc" class="visible">The noble yet troublesome apprentice of the Grand Wizard Master Kobain. She has an immense desire to obtain the powers of the world's elements, however she has a long and dangerous road if she wants to achieve this magnitude of power. Her conscience and belief in the Grand Wizard repels her from the most desperate bargains of terrible evils.  <br><br> <button id="hannahSelect">Select this character</button> <button>Paul the Knight</button> <button>Mathew the Tamer</button></section> `
    allMain += `<br><br><br><br><section class="visible">You take the vessel of Hannah, the noble yet troublesome apprentice of the Grand Wizard Master Kobain. She has an immense desire to obtain the powers of the world's elements, however she has a long and dangerous road if she wants to achieve this magnitude of power. Her conscience and belief in the Grand Wizard repels her from the most desperate bargains of terrible evils.  <br><br></section>`;
    allMain += `<section>Violence was never a rarity in the Eastern Slums, but matters have only further deteriorated from the threat of the Dragon's wrath in this past month.  You remember that night with defining clarity.<br><br>  <button onclick="han0()">--&gt;</button></section>`;
    end();
}

function han0() {
    allMain += `<br><br><br><br><section>Night was overtaken by the fury from the monsters beneath the land. Great cracks manifested their way from the ground with unknown creatures seeping out of them. Disturbed from their long slumber, the inherent violence of the tangible beings ran rampant throughout the streets of the town. <br><br><button onclick="han1()">Next.</button></section>`;
    end();
}
function han1() {
    allMain += `<br><br><br><br><section>You are in the dusty unpaved town square. Before you is a dimly lit alley.<br><br><button onclick="han2()">Go in the alley.</button></section>`;
    end();
}
function han2() {
    allMain += `<br><br><br><br><section>Large wax candles hang from rusted metal poles that do a terrible job at illuminating the pathway. In the distance of the dark, flickering orange expanse emerges a gruffled shape.<br><br><button onclick="combatSetup(1,0)">Fight Engage.</button></section>`
    saveState = `han3`
    end();
}
function han3() {
allMain +=`<br><br><br><br><section>Footsteps appear right behind you as there were no one there previously. "That was a fine victory young lass, now just who are you?"<br><br><button onclick="han4()"</button></section>`
end();
}
function han4() {
    allMain += `<br><br><br><br><section>It is the famous Grand Wizard Kobain, the legendary sorcerer and last defender of the Eastern Slums!<br><br><button onclick="han5()">Share praise enthusiastically</button></section>`
    end();
}
function han5() {
    allMain += `<br><br><br><br><section>You enthusiatically share your praises, maybe too much. The keen interest Kobain has in your abilities lead him to enlist you as his apprentice, you are eager to learn from him<br><br><button onclick="han6()">--&gt;</button></section>`
    end();
}
function han6() {
    allMain += `<br><br><br><br><section> Since that night, life was never the same again. You absolutely hated it.<br><br><button onclick="han7()">:/</button></section>`
    end();
}
function han7() {
    allMain += `<br><br><br><br><section>template<br><br><button onclick="han()">action</button></section>`
    end();
}


function combatSetup(setCombat = 0, eIndx = 1) {
    if (setCombat === 0) {
        for (let i = 0; i < 4; i++) {
            if (Math.round(Math.random * 5) >= 1) {
                eIndx = getRandomInt[0, enemies.length];
                enemy1 = new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx])
                currentEs.push(enemy1);
            }
            if (Math.round(Math.random * 5) >= 2) {
                eIndx = getRandomInt[0, enemies.length];
                enemy2 = new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx])
                currentEs.push(enemy2);
            }
            if (Math.round(Math.random * 5) >= 3) {
                eIndx = getRandomInt[0, enemies.length];
                enemy3 = new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx])
                currentEs.push(enemy3);
            }
            if (Math.round(Math.random * 5) === 4) {
                eIndx = getRandomInt[0, enemies.length];
                enemy4 = new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx])
                currentEs.push(enemy4);
            }
        }
        if (currentEs.length == 0) {
            eIndx = getRandomInt[0, enemies.length];
            currentEs.push(new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx]));
        }
    }
    else if (setCombat === 1) {
        currentEs.push(new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx]));
    }
    console.log(enemies[0].e)
    let aOrAn1 = aOrAn(currentEs[0].e);
    let aOrAn2 = aOrAn(currentEs[currentEs.length - 1].e);

    allMain += `<br><br><br><br><section>You encounter ${aOrAn1} ${currentEs[0].e}`
    if (currentEs.length == 4) {
        allMain += `, ${currentEs[1].e}, ${currentEs[2].e},`;
    }
    else if (currentEs.length == 3) {
        allMain += `, ${currentEs[0].e},`
    }
    if (currentEs.length >= 2) {
        allMain += ` and ${aOrAn2} ${currentEs[currentEs.length - 1].e}`
    }
    allMain += `.<br><br>`
    if (char = `h`) {
        allMain += `<button onclick="magicAttkNames()">Magic</button> `
    }
    else {
        allMain += `<button onclick="generalAttk()">Fight</button> `
    }
    allMain += `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="items()">Inventory</button> <button onclick="run()">Run</section>`
    end();
}

function items(){
    allMain+=`<br><br><br><br><section>`
    if(pItems.length > 1){
    for(item of pItems){
        allMain+=`<button onclick='useItems(${pItems.indexOf[item]})'>${item.itemName}</button>`
    }
    allMain+=`<button onclick="combatContinue()">Cancel</button>`
}
    else{
        allMain+=`You have no items<br><br><button onclick="combatContinue()">Cancel</button>`
    }
    allMain+=`</section>`
    end();
}



function blockE() {
    pBlockDef += pBlockBuff;
    allMain+=`<br><br><br><br><section>You blocked</section>`
    enemyTurn();
}

function inspect() {
    allMain += `<br><br><br><br><section>`
    let iteratorNum = 0;
    for (item of currentEs) {
        if (iteratorNum > 0) {
            allMain += `<br>`;
        }
        if (item.hpPercent > 0.75) {
            allMain += `The ${item.e} looks very healthy`;
        }
        else if (item.hpPercent > 0.5) {
            allMain += `The ${item.e} looks a little hurt`;
        }
        else if (item.hpPercent > 0.25) {
            allMain += `The ${item.e} looks like it will collapse`;
        }
        else if (item.hpPercent > 0) {
            allMain += `The ${item.e} looks like it's hanging on by a thread`;
        }
        if (item.eLvl + 2 < pLvl) {
            allMain += ` and it looks much weaker than you.`;
        }
        else if (item.eLvl < pLvl) {
            allMain += ` and it looks a little weaker than you.`;
        }
        else if (item.eLvl === pLvl) {
            allMain += ` and it looks to be about as strong as you.`;
        }
        else if (item.eLvl - 2 < pLvl) {
            allMain += ` and it looks a little stronger than you.`;
        }
        else if (item.eLvl > pLvl) {
            allMain += ` and it looks much stonger than you.`;
        }
        if (item.dotLength > 0) {
            allMain += ` It also seems to be taking more damage as time goes on.`
        }
        iteratorNum++;
    }
    allMain += `<br>Would you like to do an in depth inspection?<br><br> <button onclick="deepInspect()">Yes</button><button onclick="combatContinue()">No</button></section>`
    end();
}

function deepInspect() {
    allMain += `<br><br><br><br><section>`
    let iteratorNum = 0;
    for (item of currentEs) {
        if (iteratorNum > 0) {
            allMain += `<br>`;
        }
        allMain += `The ${item.e}'s health is ${item.eHp}, and its level is ${item.eLvl}.`
        if (item.dotLength > 0) {
            allMain += ` It should be taking ${item.dot} damage for ${item.dotLength} more `
            if (item.dotLength != 1) {
                allMain += `turns.`
            }
            else {
                allMain += `turn.`
            }
        }
    }
    allMain += `</section>`
    end();
    enemyTurn();
}

function run() {
    allMain += `<br><br><br><br><section>Would you like to run from this encounter?<br><br> <button onclick="pleaseRun()">Yes</button><button onclick="combatContinue()">No</button></section>`
    end();
}

function magicAttkNames() {
    allMain += `<br><br><br><br><section>Your current spells :<br><br>`;
    for (item of pSpells) {
        allMain += `<button onclick='magicAttkAction("${item}")'>${item}</button> `
    }
    allMain += `<button onclick="combatContinue()">Cancel</button></section>`
    end();
}

function magicAttkAction(spell) {
    let castSpellIndx = allPSpells.indexOf(spell);
    let dmgToE = 0;
    let attkMiss = false;
    let attkChance = 0.8;
    let hitNum = 0;
    while (!attkMiss && hitNum < pSpellAttkNum[castSpellIndx]) {
        if (Math.random() < attkChance) {
            dmgToE += pSpellDmg[castSpellIndx];
            attkChance -= 0.1;
            hitNum++;
        }
        else {
            attkMiss = true;
        }
    }
    if (`earth` === allPSpellType[castSpellIndx]) {
        pMagicDmg += 0.25
    }
    else if (`water` === allPSpellType[castSpellIndx]) {
        dmgToE *= pMagicDmg;
        dmgToE = Math.round(dmgToE);
        pHp += dmgToE;

        return undefined;
    }
    dmgToE *= pMagicDmg;
    dmgToE = Math.round(dmgToE);
    if (pSpellAttkNum[castSpellIndx] > 1) {
        for (item of currentEs) {
            if (`fire` === allPSpellType[castSpellIndx]) {
                if (item.dot < allFireDot[castSpellIndx]) {
                    item.dot = allFireDot[castSpellIndx];
                }
                item.dotLength += allFireDotLength[castSpellIndx];
            }
            item.eHp -= Math.round(dmgToE * (1- (item.eDef/100)));
            console.log(`run`)
        }
        allMain += `<br><br><br><br><section>You dealt ${dmgToE} damage to the enemies.</section>`
    }
    else {
        dmgToE = Math.round(dmgToE * (1 - (currentEs[0].eDef/100)));
        currentEs[0].eHp -= dmgToE;
        allMain += `<br><br><br><br><section>You dealt ${dmgToE} damage to the enemy.</section>`
    }
    for (let i = 0; i < currentEs.length; i++) {
        if (currentEs[i].eHp <= 0) {
            currentEs.splice(i, 1);
            i--;
        }
    }
    if (currentEs.length == 0) {
        combatEnd();
    }
    else {
        enemyTurn();
    }
}

function combatContinue() {
    end();
    allMain += `<br><br><br><br> <section>Select an action<br><br>`
    if (char = `h`) {
        allMain += `<button onclick="magicAttkNames()">Magic</button> `
    }
    else {
        allMain += `<button onclick="generalAttk()">Fight</button> `
    }
    allMain += `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="items()">Inventory</button> <button onclick="run()">Run</section>`
    end();
}

function enemyTurn() {
    if(pBlockDef > 100){
        pBlockDef = 100;
    }
    let dmgToP = 0;
    let randomDmg = 0;
    for (item of currentEs) {
        while (randomDmg < 0.75) {
            randomDmg = Math.random();
        }
        dmgToP += Math.round(item.eDmg * randomDmg);
        randomDmg = 0;
    }
    dmgToP = Math.round(dmgToP * (1- (pBlockDef/100)));
    pHp -= dmgToP;
    allMain += `<br><br><br><br> <section>The ${currentEs[0].e}`
    if (currentEs.length == 4) {
        allMain += `, ${currentEs[1].e}, ${currentEs[2].e},`;
    }
    else if (currentEs.length == 3) {
        allMain += `, ${currentEs[0].e},`
    }
    if (currentEs.length >= 2) {
        allMain += ` and ${currentEs[currentEs.length - 1].e}`
    }
    allMain += ` dealt ${dmgToP} damage to you.`
    for (item of currentEs) {
        if (item.dotLength > 0) {
            item.eHp -= item.dot;
            item.dotLength--;
            allMain += ` The ${item.e} took ${item.dot} damage right now.`
        }
    }
    for (let i = 0; i < currentEs.length; i++) {
        if (currentEs[i].eHp <= 0) {
            currentEs.splice(i, 1);
            i--;
        }
    }
    if (currentEs.length == 0) {
        combatEnd();
    }
    allMain += `</section>`
    end();
    combatContinue();
}

function combatEnd() {
    allMain += `<br><br><br><br><section>You win(The demo)</section>`;
    allMain+=`<br><br><br><br><section><button onclick='${saveState}()'>Continue</button></section>`
    end();
}

//similar to combat end
function pleaseRun() {
    currentEs = [];
    allMain += `<br><br><br><br><section>You literally ran from the only enemy. I have no words.</section>`
    end();
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