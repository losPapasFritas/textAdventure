let allMain = `<section>Choose a character! <br><br> <button class="paul">Paul the Knight</button> <button class="hannah">Hannah the Magician</button> <button class="mathew">Mathew the Tamer</button></section>`
let char = `none`,
    saveState = `none`,
    currentEs = [],
    enemy1,
    enemy2,
    enemy3,
    enemy4,
    pMagicDmg = 1.25,
    pBaseMagicDmg = 1.25,
    pDmg = 1,
    pBaseDmg = 1,
    pBaseDef = 10,
    pBlockDef = 10,
    pBlockBuff = 10,
    pIsBlocking = false,
    pLvl = 1,
    pSpells = [],
    pSpellType = `none`,
    pHp = 100,
    pMaxHp = 100,
    statA = 0,
    statB = 0,
    statC = 0,
    statD = 0,
    waterBuff = 0,
    earthBuff = 0,
    fireDotBuff = 0,
    pAbilities = [],
    turnCounter = 5,
    phoenixUsed = false,
    quadHitActivated = false;
//mudman is first dungeon boss
let enemies = [`goblin`, `immortal worm`, `bandit`, `imp`, `walking fish`, `mud man`, `stone golem`, `cyclopes`, `Thysiusdagurontescipiusdebduteustharidonxocemonthemonbatrius(Tyler for short)`];
let eHpAll = [70, 10000, 100, 85, 30, 1200, 1200, 1300, 5460];
let eDmgAll = [10, 1, 15, 13, 20, 40, 45, 50, 70];
let eLvlAll = [1, 500, 7, 5, 6, 10, 12, 10, 24];
let eDefAll = [10, 99.99999999, 10, 10, 3, 0, 10, 5, 50];
let itemList = [{ name: `Enchanted Golden Apple`, hp: 10000, def: 10000, dmg: 100, magic: 19 }]
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
    2];
class enemy {
    constructor(e, eHp, eDmg, eLvl, eDef) {
        this.e = e;
        this.eHp = eHp;
        this.maxEHp = eHp;
        this.eDmg = eDmg;
        this.eLvl = eLvl;
        this.eDef = eDef;
        this.dotLength = 0;
        this.dot = 0;
    }
    get hpPercent() {
        return this.eHp / this.maxEHp
    }
}

class buffItem {
    constructor(itemName, hpBuff, defBuff, dmgBuff, magicBuff) {
        this.itemName = itemName;
        this.hpBuff = hpBuff;
        this.defBuff = defBuff;
        this.dmgBuff = dmgBuff;
        this.magicBuff = magicBuff;
    }
    use() {
        pHp += this.hpBuff;
        pBlockDef += this.defBuff;
        pDmg += this.dmgBuff;
        pMagicDmg += this.magicBuff;
        allMain+=`<br><br><br><br><section>`
        if(this.hpBuff > 0){
            allMain+=`The ${this.itemName} healed you by ${this.hpBuff} dammage!<br> `
        }
        if(this.defBuff > 0){
            allMain+=`The ${this.itemName} increased your defense by ${this.defBuff}%!<br> `
        }
        if(this.dmgBuff > 0){
            allMain+=`The ${this.itemName} increased your physical damage by ${this.dmgBuff} times!<br> `
        }
        if(this.magicBuff > 0){
            allMain+=`The ${this.itemName} increased your magic damage by ${this.magicBuff} times! `
        }
        allMain+=`</section>`
        pItems.splice(pItems.indexOf(this), 1);
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
        currentEs[0].eHp -= this.hpDebuff;
        currentEs[0].eDef -= this.defDebuff;
        currentEs[0].eDmg -= this.dmgDebuff;
        allMain+=`<br><br><br><br><section>`
        if(currentEs[0].eHp <= 0){
            allMain+=`The ${this.itemName} killed ${currentEs[0].e}!<br> `
        }
        else if(this.hpDebuff > 0){
            allMain+=`The ${this.itemName} damaged ${currentEs[0].e} by ${this.hpDebuff} dammage!<br> `
        }
        if(this.defDebuff > 0){
            allMain+=`The ${this.itemName} reduced ${currentEs[0].e}'s defense by ${this.defDebuff}%!<br> `
        }
        if(this.dmgDebuff > 0){
            allMain+=`The ${this.itemName} reduced ${currentEs[0].e}'s damage by ${this.dmgDebuff}! `
        }
        allMain+=`</section>`
        pItems.splice(pItems.indexOf(this), 1);
    }
}

function givePlayerItem(itemNum = -1) {
    if (itemNum === -1) {
        let itemNum = getRandomInt(0, itemList.length);
        if (itemNum < 5) {
            pItems.push(new buffItem(itemList[itemNum].name, itemList[itemNum].hp, itemList[itemNum].def, itemList[itemNum].dmg, itemList[itemNum].magic));
        }
        else {
            pItems.push(new debuffItem(itemList[itemNum].name, itemList[itemNum].hp, itemList[itemNum].def, itemList[itemNum].dmg, itemList[itemNum].targets));
        }
    }
    else {
        if (itemNum < 5) {
            pItems.push(new buffItem(itemList[itemNum].name, itemList[itemNum].hp, itemList[itemNum].def, itemList[itemNum].dmg, itemList[itemNum].magic));
        }
        else {
            pItems.push(new debuffItem(itemList[itemNum].name, itemList[itemNum].hp, itemList[itemNum].def, itemList[itemNum].dmg, itemList[itemNum].targets));
        }
    }
    allMain += `<br><br><section>You recieved a(n) ${pItems[0].itemName}!`
}

function end() {
    document.getElementById(`main`).innerHTML = allMain
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    let temp = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    if (temp === max) {
        temp--;
    }
    return temp// The maximum is exclusive and the minimum is inclusive
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

function paulSelect() {
    char = `paul`;
    pDmg = 1.5;
    pBlockDef += 10;
    pBaseDef += 10;
    pHp += 15;
    pMaxHp += 15
}

function hannahSelect() {
    char = `han`
    pMagicDmg = 1.5;
    pSpellType = `all`;
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
    allMain += `<br><br><br><br><section>Footsteps appear right behind you as there were no one there previously. "That was a fine victory young lass, now just who are you?"<br><br><button onclick="han4()"</button></section>`
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
    allMain += `<br><br><br><br><section> Learning new magic skills has been completely nonexistent and the mediocrity of the tower's tight walls have only generated complete and utter boredom.<br><br><button onclick="han8()">--&gt;</button></section>`
    end();
}
function han8() {
    allMain += `<br><br><br><br><section> You have completed notes on the latest scroll shipment from South Polend and took no happiness in scribing out each situation. Even amateurs could transcribe these “magical” occurrences and crimes throughout the kingdom.<br><br><button onclick='han9()'>--&gt;</button></section>`
    end();
}
function han9() {
    allMain += `<br><br><br><br><section> You notice a pattern in the recent scrolls, all in relation to ancient relics described by old fairy tales. Polend has been dramatically more fanatic since dragons have been proven to be real and creatures of bygone eras rising from extinction. <br><br><button onclick="han10()"></button></section>`
    end();
}
function han10() {
    allMain += `<br><br><br><br><section> Regardless of your trust in Kobain's decision in putting you here, you could no longer sit here and scrawl footnotes on meaningless reports. You are in your living quarters.<br><br><button onclick="han11()">[Inspect desk.]</button> <button onclick="han13()">[Go Downstairs.]</button> <button onclick="han12()">[Inspect the bookshelf.]</button></section>`
    end();
}
function han11() {
    allMain += `<br><br><br><br><section>Your desk is a sleek, wooden table, unorganized with messy parchments and a feather quill carelessly placed off to the side. A dribble of ink slowly moves its way to the edge of the desk. In other words, nothing important. <br><br><button onclick="han13()">[Go Downstairs.]</button> <button onclick="han12()">[Inspect the bookshelf.]</button></section>`
    end();
}
function han12() {
    allMain += `<br><br><br><br><section>A shelf containing many books of the histories, legends, and culture of  the world. You pertain no interest in any of these topics.<br><br><button onclick="han11()">[Inspect desk.]</button> <button onclick="han13()">[Go downstairs.]</button></section>`
    end();
}
function han13() {
    allMain += `<br><br><br><br><section> You descend down the aged wooden steps cylindrically built to wrap around the area of the tower. As you walk, a faintly growing scent of pipe-smoke and the crackle of an active fireplace becomes clearer as you enter the main quarters.<br><br><button onclick="han14()">--&gt;</button></section>`
    end();
}
function han14() {
    allMain += `<br><br><br><br><section>Grand Wizard Kobain sits leisurely in his study with an indistinctly amorphous orb generating a cascade of colors, humanoid shapes can be seen within it's shapeless center. Hugging the corner of the wall between the stairway and the main quarters sits a lone display table, pristinely detailed as it is delicate. The table is used by an expensive vial collection of moaning toad souls, each one dreadfully muted by the confines of their vial.<br><br><button onclick="han15()">[Make your presence known.]</button> <button onclick="han17()">[Ask Kobain to finally teach a new spell.]</button></section>  `
    end();
}
function han15() {
    allMain += `<br><br><br><br><section> As you exit the stairway, you trip and stumble into the foot of the pristine table. The legs bend and snap as they collapse, generating a castrophany of an auditorily vivid smash of split wood, broken glass, staining ectoplasm, and moaning toad souls rampantly flying around. Kobain takes notice without looking back.<br><br><button onclick="han16()">--&gt;</button></section>`
    end();
}
function han16() {
    allMain += `<br><br><br><br><section>“Good morning Hannah, I see you have a keen interest in learning new and fantastic ways to destroy the furniture here.”<br><br><button onclick="han17()">[Ask Kobain to finally teach a spell.]</button></section>`
    end();
}
function han17() {
    allMain += `<br><br><br><br><section> As you exit the hallway, you approach Kobain with a proposition to end your boredom. The orb's shape fades as you close in to get a better look at the shapes.<br><br><button onclick="han18()">--&gt;</button></section>`
    end();
}
function han18() {
    allMain += `<br><br><br><br><section> “Hm, it seems this orb is particularly shy to reveal its contents. Ah, hello Hannah. Have you finished today's scroll shipment?” The curiously inquisitive wizard turns his attention towards you. <br><br><button onclick="han19()">--&gt;</button></section>`
    end();
}
function han19() {
    allMain += `<br><br><br><br><section> Full of enthusiasm, you tell Kobain about a distinct oddity from the scroll shipments of the past week. Constant robberies and crimes linking to a connected ulterior motive. Many have heard the legend of the Dragon's relics, so there is no need to repeat such redundant stories.<br><br><button onclick="han20()">--&gt;</button></section>`
    end();
}
function han20() {
    allMain += `<br><br><br><br><section>The legend has motivated citizens and monsters alike to search for these safeguarded relics. You tell Kobain that if you could retrieve these relics before any other adventurers then the King would favor Kobain's endeavors of helping the Eastern Slums become safer and more habitable.<br><br><button onclick="han21()">--&gt;</button></section>`
    end();
}
function han21() {
    allMain += `<br><br><br><br><section>“Thank you for bringing this to my attention. But Hannah, you are no near strong enough to take on a quest like this. It is a treacherous journey and it isn't worth the risk of losing a generation of magical knowledge. As you may know, it is a complete rarity for anyone to be capable of using magic let alone dedicating time to the upkeep of our knowledge”<br><br><button onclick="han22()">[I totally didn't know any of that.]</button></section>`
    end();
}
function han22() {
    allMain += `<br><br><br><br><section>“You are a dying breed, we simply cannot risk the importance of your life for rumors.”<br><br><button onclick="han23()">--&gt;</button></section>`
    end();
}
                                                                                                                                                         //hanx() is skilltree 
function han23() {                                                                                                                                  
    allMain += `<br><br><br><br><section> You return to your living quarters hours later with a book binding under your arm. <br><br><button onclick="hanx()">[Read its contents.] </button> <button onclick="han24()">[Don't do anything like that at all.]</button></section>`
    end();
}
function han24() {
    allMain += `<br><br><br><br><section>You forgot you really, really hate reading, so you toss it into your sack of wielding as a way to procrastinate.<br><br><button onclick="han25()">--&gt;</button></section>`
    end();
}
function han25() {
    allMain += `<br><br><br><br><section>template<br><br><button onclick="han()">action</button></section>`
    end();
}
function han26() {
    allMain += `<br><br><br><br><section>template<br><br><button onclick="han()">action</button></section>`
    end();
}
function han27() {
    allMain += `<br><br><br><br><section>template<br><br><button onclick="han()">action</button></section>`
    end();
}
function combatSetup(setCombat = 0, eIndx = 1) {
    if (pHp > pMaxHp) {
        pHp = pMaxHp;
    }
    pIsBlocking = false;
    currentEs = []
    if (setCombat === 0) {
        let randomNum = getRandomInt(1, 5)
        //for (let i = 0; i < 4; i++) {
        if (randomNum >= 1) {
            eIndx = getRandomInt(0, 5);
            enemy1 = new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx])
            currentEs.push(enemy1);
        }
        if (randomNum >= 2) {
            eIndx = getRandomInt(0, 5);
            enemy2 = new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx])
            currentEs.push(enemy2);
        }
        if (randomNum >= 3) {
            eIndx = getRandomInt(0, 5);
            enemy3 = new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx])
            currentEs.push(enemy3);
        }
        if (randomNum === 4) {
            eIndx = getRandomInt(0, 5);
            enemy4 = new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx])
            currentEs.push(enemy4);
        }
        //}
        if (currentEs.length == 0) {
            eIndx = getRandomInt(0, 5);
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
    if (char == `han`) {
        allMain += `<button onclick="magicAttkNames()">Magic</button> `
    }
    else {
        allMain += `<button onclick="generalAttk()">Fight</button> `
    }
    allMain += `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="listItems()">Inventory</button> <button onclick="run()">Run</section>`
    end();
}

function listItems() {
    allMain += `<br><br><br><br><section>`
    if (pItems.length > 0) {
        for (let i = 0; i < pItems.length; i++) {
            allMain += `<button onclick='useItems(${i})'>${pItems[i].itemName}</button> `
        }
        allMain += `<button onclick="combatContinue()">Cancel</button>`
    }
    else {
        allMain += `You have no items<br><br><button onclick="combatContinue()">Cancel</button>`
    }
    allMain += `</section>`
    end();
}

function useItems(itemIndx) {
    allMain += `<br><br><br><br><section>You used ${pItems[itemIndx].itemName}!`;
    pItems[itemIndx].use();
    end();
    enemyTurn();
}


function blockE() {
    pBlockDef += pBlockBuff;
    if(pAbilities.indexOf(`blockDmgUp`) > -1){
        pDmg += (pDmg*0.02)
    }
    pIsBlocking = true;
    allMain += `<br><br><br><br><section>You blocked</section>`
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
        pMagicDmg += (0.25 + earthBuff)
    }
    else if (`water` === allPSpellType[castSpellIndx]) {
        dmgToE *= (pMagicDmg + waterBuff);
        dmgToE = Math.round(dmgToE);
        pHp += dmgToE;
        allMain += `<br><br><br><br><section>You healed ${dmgToE} health.</section>`
        enemyTurn();
        return undefined;
    }
    dmgToE *= pMagicDmg;
    if(pAbilities.indexOf(`quadHit`) > -1){
        if(Math.random() < (pLvl-1)/25){
            dmgToE*=4
        }
    }
    dmgToE = Math.round(dmgToE);
    if (pSpellAttkNum[castSpellIndx] < 1) {
        for (item of currentEs) {
            if (`fire` === allPSpellType[castSpellIndx]) {
                if (item.dot < allFireDot[castSpellIndx]) {
                    item.dot = allFireDot[castSpellIndx];
                }
                item.dotLength += (allFireDotLength[castSpellIndx] + fireDotBuff);
            }
            item.eHp -= Math.round(dmgToE * (1 - (item.eDef / 100)));
            console.log(`run`)
        }
        allMain += `<br><br><br><br><section>You dealt ${dmgToE} damage to the enemies.`
    }
    else {
        dmgToE = Math.round(dmgToE * (1 - (currentEs[0].eDef / 100)));
        currentEs[0].eHp -= dmgToE;
        allMain += `<br><br><br><br><section>You dealt ${dmgToE} damage to the enemy.`
    }
    if(quadHitActivated){
        allMain+=` Your earth ability also increased this damage by 4x!</section>`
    }
    else{
        allMain+=`</section>`
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
    pMagicDmg = pBaseMagicDmg;
    pDmg = pBaseDmg;
}

function combatContinue() {
    if (pHp > pMaxHp) {
        pHp = pMaxHp;
    }
    pIsBlocking = false;
    end();
    allMain += `<br><br><br><br> <section>Select an action<br><br>`
    if (char == `han`) {
        allMain += `<button onclick="magicAttkNames()">Magic</button> `
    }
    else {
        allMain += `<button onclick="generalAttk()">Fight</button> `
    }
    allMain += `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="listItems()">Inventory</button> <button onclick="run()">Run</section>`
    end();
}

function enemyTurn() {
    if(pAbilities.indexOf(`firebomb`) != -1 && turnCounter >= 5){
        if(Math.random() < (pLvl-1)/25){
            allMain+=`<br><br><br><section>Your firebomb activated and dealt ${40} damage</section>`
            turnCounter = -1;
            for(item of currentEs){
                item.eHp -= 40;
            }
        }
    }
    if (pHp > pMaxHp) {
        pHp = pMaxHp;
    }
    if (pBlockDef > 100) {
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
    dmgToP = Math.round(dmgToP * (1 - (pBlockDef / 100)));
    if(pIsBlocking && pAbilities.indexOf(`blockImmunity`) > -1){
        let hitChance = getRandomInt(0,4);
        if (hitChance == 0){
            dmgToP = 0;
        }
        if(pAbilities.indexOf(`parry`) > -1){
            dmgToP = 0;
        }
        if(pAbilities.indexOf(`fireBlock`) > -1){
            if (item.dot < 3) {
                item.dot = 3;
            }
            item.dotLength += (2 + fireDotBuff);
        }
    }
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
    allMain += ` dealt ${dmgToP} damage to you. You have ${pHp} health remaining. `
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
    if((pAbilities.indexOf(`phoenix`) != -1) && (pHp <= 0)){
        if(!phoenixUsed){
            pHp = pMaxHp/2;
            phoenixUsed = true;
        }
    }
    pBlockDef = pBaseDef;
    end();
    combatContinue();
}

function combatEnd() {
    allMain += `<br><br><br><br><section>You win</section>`;
    givePlayerItem();
    allMain += `<br><br><br><br><section><button onclick='${saveState}()'>Continue</button></section>`
    end();
}

//similar to combat end
function pleaseRun() {
    currentEs = [];
    allMain += `<br><br><br><br><section>You literally ran from the only enemy. I have no words.</section>`
    allMain += `<br><br><br><br><section><button onclick='${saveState}()'>Continue</button></section>`
    end();
}

function lvlUp(){
    allMain =`<br><br><br><br><section>Select an Upgrade!<br><br><section class='skillColumn'>`
    if(statA == 0){
        allMain+=`<button onevent='buffStat("def",${5})'>Block Def Up</button>`
    }
    else if(statA == 1){
        allMain+=`<button>Block Def Up</button> <button onevent='addAbility("blockDmgUp")'>Blocking increses dmg by a small percent for the next turn</button>`
    }
    else if(statA == 2){
        allMain+=`<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button onevent='buffStat("def",${5})'>Block Def Up</button>`
    }
    else if(statA == 3){
        allMain+=`<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button onevent='addAbility("blockImmunity")'>While blocking, have a 25% chance to not take dmg</button>`
    }
    else if(statA == 4){
        allMain+=`<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button>While blocking, have a 25% chance to not take dmg</button> <button onevent='buffStat("def",${5})'>Block Def Up</button>`
    }
    else if(statA == 5){
        allMain+=`<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button>While blocking, have a 25% chance to not take dmg</button> <button>Block Def Up</button> <button onevent='addAbility("parry")'>You no longer take damage while blocking</button>`
    }
    else if(statA == 6){
        allMain+=`<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button>While blocking, have a 25% chance to not take dmg</button> <button>Block Def Up</button> <button>You no longer take damage while blocking</button>`
    }
    allMain+=`</section><section class='skillColumn'>`

    switch (pSpellType){
        case `all`:
            break;
        default:
            switch(pSpellType){
                case `fire`:
                    if(statB == 0){
                        allMain+=`<button onevent='buffStat("fireDotBuff",${1})'>Fire DOT Length Up</button>`
                    }
                    else if(statB == 1){
                        allMain+=`<button>Fire DOT Length Up</button> <button onevent='addAbility("fireBlock")'>Blocking deals fire damage to enemy</button>`
                    }
                    else if(statB == 2){
                        allMain+=`<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button onevent='buffStat("fireDotBuff",${1})'>Fire DOT Length Up</button>`
                    }
                    else if(statB == 3){
                        allMain+=`<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button onevent='addAbility("firebomb")'>Every turn has ${(pLvl-1)/25*100}% chance to cast a firebomb, cooldown is 5 turns</button>`
                    }
                    else if(statB == 4){
                        allMain+=`<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button>Every turn has ${(pLvl-1)/25*100}% chance to cast a firebomb, cooldown is 5 turns</button> <button onevent='buffStat("fireDotBuff",${1})'>Fire DOT Length Up</button>`
                    }
                    else if(statB == 5){
                        allMain+=`<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button>Every turn has ${(pLvl-1)/25*100}% chance to cast a firebomb, cooldown is 5 turns</button> <button>Fire DOT Length Up</button> <button onevent='addAbility("phoenix")'>If your Hp drops to 0, regain half hp</button>`
                    }
                    else if(statB == 6){
                        allMain+=`<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button>Every turn has ${(pLvl-1)/25*100}% chance to cast a firebomb, cooldown is 5 turns</button> <button>Fire DOT Length Up</button> <button>If your Hp drops to 0, regain half hp</button>`
                    }
                    break;
                case `water`:
                    if(statB == 0){
                        allMain+=`<button onevent='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
                    }
                    else if(statB == 1){
                        allMain+=`<button>Healing Power Up</button> <button onevent='addAbility("coolDown")'>You can remove DOT afflictions using an ability</button>`
                    }
                    else if(statB == 2){
                        allMain+=`<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button onevent='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
                    }
                    else if(statB == 3){
                        allMain+=`<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button onevent='addAbility("waterShield")'>Healing increases defense by a moderate amount for a turn</button>`
                    }
                    else if(statB == 4){
                        allMain+=`<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button onevent='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
                    }
                    else if(statB == 5){
                        allMain+=`<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button>Healing Power Up</button> <button onevent='addAbility("quickHeal")'>You can attack and heal in the same turn</button>`
                    }
                    else if(statB == 6){
                        allMain+=`<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button>Healing Power Up</button> <button>You can attack and heal in the same turn</button>`
                    }
                    break;
                case `earth`:
                    if(statB == 0){
                        allMain+=`<button onevent='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
                    }
                    else if(statB == 1){
                        allMain+=`<button>Earth Dmg Up</button> <button onevent='addAbility("doubleEarth")'>Earth attacks can hit twice</button>`
                    }
                    else if(statB == 2){
                        allMain+=`<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button onevent='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
                    }
                    else if(statB == 3){
                        allMain+=`<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button onevent='addAbility("instaKill")'>Adds ability to defeat any enemy whose hp is under 10%</button>`
                    }
                    else if(statB == 4){
                        allMain+=`<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button onevent='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
                    }
                    else if(statB == 5){
                        allMain+=`<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button>Earth Dmg Up</button> <button onevent='addAbility("quadHit")'>All attacks have a ${(pLvl-1)/25*100}% chance to hit 4 times</button>`
                    }
                    else if(statB == 6){
                        allMain+=`<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button>Earth Dmg Up</button> <button>All attacks have a ${(pLvl-1)/25*100}% chance to hit 4 times</button>`
                    }
                    break;
            }
            break;
    }
}
function addAbility(abilityName){
    pAbilities.push(abilityName);
    stat++;
}

function buffStat(stat, amount){
    switch(stat){
        case `def`:
            pBaseDef += amount;
            pBlockDef += amount;
            break;
        case `fireDotBuff`:
            fireDotBuff+=amount;
            break;
        case `waterBuff`:
            waterBuff+=amount;
            break;
        case `earthBuff`:
            earthBuff+=amount;
            break;
        case `pDmg`:
            pDmg+= amount;
            pBaseDmg +=amount;
            break;
        case `pMagicDmg`:
            pMagicDmg += amount;
            pBaseMagicDmg +=amount;
            break;
    }
    stat++;
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