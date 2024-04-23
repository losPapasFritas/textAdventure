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
    pAllies = [],
    allyDmgBuff = 1,
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
    dotLengthOnP = 0,
    dotOnP = 0,
    pAbilities = [],
    pActiveAbilities = [],
    turnCounter = 5,
    phoenixUsed = false,
    quickHealUsed = false,
    quadHitActivated = false,
    meleeMagicInfusion = `none`,
    bonusActionUsed = false,
    totalDmgDealt = 0,
    totalDefReduction = 0;
//mudman is first dungeon boss
let enemies = [`goblin`, `immortal worm`, `bandit`, `imp`, `walking fish`, `mud man`, `stone golem`, `cyclopes`, `Thysiusdagurontescipiusdebduteustharidonxocemonthemonbatrius(Tyler for short)`];
let eHpAll = [70, 10000, 100, 85, 30, 1200, 1200, 1300, 5460];
let eDmgAll = [10, 1, 15, 13, 20, 40, 45, 50, 70];
let eLvlAll = [1, 500, 7, 5, 6, 10, 12, 10, 24];
let eDefAll = [10, 99.99999999, 10, 10, 3, 0, 10, 5, 50];
let itemList = [{ name: `Enchanted Golden Apple`, hp: 10000, def: 10000, dmg: 100, magic: 19 }, { name: `Potion of Minor Healing`, hp: 40, def: 0, dmg: 0, magic: 0 }, { name: `Pot of Healing`, hp: 70, def: 0, dmg: 0, magic: 0 },
                { name: `Cauldron of Major Healing`, hp: 100, def: 0, dmg: 0, magic: 0 }, { name: `Coffee`, hp: 25, def: 0, dmg: 0.25, magic: 0.5 }, { name: `Hornet Honey`, hp: 30, def: 5 / 8, dmg: 0, magic: 0.5 },
                { name: `Magic Metal Stick`, hp: 50, def: 20, dmg: 0 }, { name: `Fish`, hp: 9999999, def: 99, dmg: 0 }, { name: `Fire Whip`, hp: 69, def: 0.69, dmg: 0 }, { name: `Twig`, hp: 1, def: 1, dmg: 1 }]
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
        this.baseDef = eDef;
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
        allMain += `<br><br><br><br><section>`
        if (this.hpBuff > 0) {
            allMain += `The ${this.itemName} healed you by ${this.hpBuff} dammage!<br> `
        }
        if (this.defBuff > 0) {
            allMain += `The ${this.itemName} increased your defense by ${this.defBuff}%!<br> `
        }
        if (this.dmgBuff > 0) {
            allMain += `The ${this.itemName} increased your physical damage by ${this.dmgBuff} times!<br> `
        }
        if (this.magicBuff > 0) {
            allMain += `The ${this.itemName} increased your magic damage by ${this.magicBuff} times! `
        }
        allMain += `</section>`
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
        allMain += `<br><br><br><br><section>`
        if (currentEs[0].eHp <= 0) {
            allMain += `The ${this.itemName} killed ${currentEs[0].e}!<br> `
        }
        else if (this.hpDebuff > 0) {
            allMain += `The ${this.itemName} damaged ${currentEs[0].e} by ${this.hpDebuff} dammage!<br> `
        }
        if (this.defDebuff > 0) {
            allMain += `The ${this.itemName} reduced ${currentEs[0].e}'s defense by ${this.defDebuff}%!<br> `
        }
        if (this.dmgDebuff > 0) {
            allMain += `The ${this.itemName} reduced ${currentEs[0].e}'s damage by ${this.dmgDebuff}! `
        }
        allMain += `</section>`
        pItems.splice(pItems.indexOf(this), 1);
    }
}

function instaKill() {
    for (item of currentEs) {
        if (item.hpPercent < 0.1) {
            item.eHp = 0;
            allMain += `<br><br><br><section>Your ability defeated the ${item.e}!</section>`
        }
    }
    end();
    enemyTurn();
}

function allyHeal() {
    for (item of pAllies) {
        item.eHp += (1 - (pLvl / 25 * 35) / 100);
    }
    allMain += `<br><br><br><br><section>You healed your allies ${pLvl / 24 * 35}% of their health</section>`
}

function removeInfusion() {
    meleeMagicInfusion = `none`
}
//Infuse melee skill unlocked by Paul
function infuseMelee() {
    if (pAbilities.indexOf(`maxInfustion`) == -1) {
        switch (pSpellType) {
            case `fire`:
                meleeMagicInfusion = `fire`
                break;
            case `earth`:
                meleeMagicInfusion = `earth`
                break;
            case `water`:
                meleeMagicInfusion = `water`
                break;
        }
    }
    else {
        meleeMagicInfusion = `all`
    }
}

function eDefReduction() {
    for (item of currentEs) {
        item.eDef -= 2.5;
        if (item.eDef < 0) {
            item.eDef = 0;
        }
    }
}

function coolDown() {
    if (dotLengthOnP != 0) {
        dotLengthOnP = 0;
        dotOnP = 0;
        allMain += `<br><br><br><section>You removed the thing dealing damage to you!</section>`
    }
}

function recruitAlly() {
    allMain += `<br><br><br><section>Select an enemy to recruit :<br><br>`
    for (let i = 0; i < currentEs.length; i++) {
        allMain += `<button onclick='recruitAllyEnd(currentEs[${i}])'>${currentEs[i].e}</button> `
    }
    allMain += `<button onclick="combatContinue()">Cancel</button>`
    end();
}

function recruitAllyEnd(selectedE) {
    let recruitChance = 1 - selectedE.hpPercent;
    if (pAbilities.indexOf(`allyChanceUp`) != -1) {
        recruitChance += 0.2
    }
    if (recruitChance > 1) {
        recruitChance = 1;
    }
    if (Math.random() <= recruitChance) {
        pAllies.push(selectedE);
        currentEs.splice(currentEs.indexOf(selectedE), 1);
        if (pAbilities.indexOf(`allyStrengthen`) != -1) {
            pAllies[pAllies.length - 1].eHp = Math.round(1.5 * pAllies[pAllies.length - 1].eHp);
            pAllies[pAllies.length - 1].maxEHp = Math.round(1.5 * pAllies[pAllies.length - 1].maxEHp);
            pAllies[pAllies.length - 1].eDmg = Math.round(1.5 * pAllies[pAllies.length - 1].eDmg);
            pAllies[pAllies.length - 1].eDef = Math.round(1.5 * pAllies[pAllies.length - 1].eDef);
            pAllies[pAllies.length - 1].baseDef = Math.round(1.5 * pAllies[pAllies.length - 1].baseDef);
        }

    }
    else {
        allMain += `<br><br><br><section>You failed to gain the ${selectedE.e} as an ally!</section>`
    }
    end();
    enemyTurn();
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
        if (itemNum < 1) {
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

function mathewSelect() {
    char = `mat`;
    addAbility(`Recruit Ally`, `none`, recruitAlly);
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
    allMain += `<br><br><br><br><section>Footsteps appear right behind you as there were no one there previously. "That was a fine victory young lass, now just who are you?"<br><br><button onclick="han4()">--&gt;</button></section>`
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
    allMain += `<br><br><br><br><section>A new scroll is delivered to your window by a dove-hawk, this message directly from the king.<br><br><button onclick="han26()">action</button></section>`
    end();
}
function han26() {
    allMain += `<br><br><br><br><section>The scroll reads: <br> Hannah N. Chicago, I send you this letter in desperation and severity. You are the only known capable magic-user in the Country and I require your services. If you could, please meet my messenger in front of the Eastern Dungeon Memorial the moment you receive this message.
    Best regards, 
    King Geedorah
    <br><br><button onclick="han27()">[Tell Kobain about the letter.]</button></section>`
    end();
}
function han27() {
    allMain += `<br><br><br><br><section>Scroll in hand, you run downstairs to tell Kobain the news, but he is nowhere to be found. The front door of the tower is ajar, wind blowing the hinges back and forth. A non distinct trail of beard dander trails into the distance.<br><br><button onclick="han28()">[Follow the trail of wizard dust.]</button></section>`
    end();
}
function han28() {
    allMain += `<br><br><br><br><section>You take the path that the (dust) trail left behind. Beyond a tiled path leads to the exit gate surrounding the tower's perimeter. A short stairwell going up, the steps in the shape of smooth, hollowed stone from the center of large boulders. 
    <br><br><button onclick="han29()">[--&gt;]</button></section>`
    end();
}
function han29() {
    allMain += `<br><br><br><br><section>Reaching the summit of the short stairwell, you see the dander-trail go straight before abruptly shifting its path into a nearby alley.<br><br><button onclick="han30()">[--&gt;]</button></section>`
    end();
}
function han30() {
    allMain += `<br><br><br><br><section>This alley is subtly different from the rest of the city, the changes lie in the fact that the cheaply cobbled gravel road smoothes out into some other form of stones, these stones lead into two separate hallways.<br><br><button onclick="han31()">[--&gt;]</button></section>`
    end();
}
function han31() {
    allMain += `<br><br><br><br><section>On the right, the hall is seemingly mundane apart from its natural stillness. The right hall seems to be naturally tranquil, even beckoning you to step through its' entryway<br><br><button onclick="han32()">[--&gt;]</button></section>`
    end();
}
function han32() {
    allMain += `<br><br><br><br><section>Strangulated in its design, the architecture of this hall is oddly disturbing. The further you look down, the darker and more abyss-like it becomes. Akin to an illusion, it feels impossible for a simple hallway to look so morbidly bizarre. You feel compelled to abandon the following of the trail.<br><br><button onclick="han33()">[Keep following.]</button><button onclick="han1B()">[Abandon the trail.]</button></section>`
    end();
}
function han1B() {
    allMain += `<br><br><br><br><section>You walk into the pleasantly mundane hallway, giving in to the less stressful alternative. Out of seemingly nowhere, the light of the hallway fades to the deepest black, rendering all surroundings to disappear completely. You feel the walls tighten against you as they constrict claustrophobically, and then you die. <br><br><button onclick="han32()">[Let's Try Again...]</button></section>`
    end();
}
function han33() {
    allMain += `<br><br><br><br><section>You stray from the suspiciously placed dust trail, instead walking through the stress inducing hall to the left. The entryway whispers an unintelligible {sound} as you make your first steps beyond it.</section><br><br><button onclick="han34()">[--&gt;]</button>`
    end();
}
function han34() {
    allMain += `<br><br><br><br><section>Light leaves your surroundings gradually, with each echoing step as you cross it. Light. Dim. Dark. Black. </section><br><br><button onclick="han35()">[--&gt;]</button>`
    end();
}
function han35() {
    allMain += `<br><br><br><br><section>You try to hug the walls of the walkway, nothing is within your grasp, as if there were no walls in the first place.
    </section><br><br><button onclick="han36()">[Blink in the darkness.]</button><button onclick="han36()">[Cry because you are screwed.]</button>`
    end();
}
function han36() {
    allMain += `<br><br><br><br><section>You blink in the blinding void. As soon as you do, the illusion ends and you are on the other side of the hallway, now looking as mundane as the other. The dander trail picks up and leads to the Eastern Dungeon Memorial.</section><br><br><button onclick="han37()">[Follow trail inside.]</button>`
    end();
}
function han37() {
    allMain += `<br><br><br><br><section>You try to open the entrance door for the Eastern Dungeon Memorial, to no avail. The door is locked. </section><br><br><button onclick="han38()">[Find a way inside.]</button>`
    end();
}
function han38() {
    allMain += `<br><br><br><br><section>You pace along the memorial's perimeter, finding an opening to the roof shaping into a ramp-esque ledge.</section><br><br><button onclick="han39()">[--&gt;]</button>`
    end();
}
function han39() {
    allMain += `<br><br><br><br><section>A ladder leans on another building adjacent to the Memorial. In order to grab it, you have to push it off from the other building's roof. An unlocked gate is between you and the other building.</section><br><br><button onclick="han40()">[Open the gate, enter the building.]</button>`
    end();
}
function han40() {
    allMain += `<br><br><br><br><section>You enter the building, it appears to be an abandoned smithy. Graffiti is painted along the walls of the forgotten forge, old rusted metal and unfinished armors lay sprawled around the chambers.</section><br><br><button onclick="han41()">[--&gt;]</button>`
    end();
}
function han41() {
    allMain += `<br><br><br><br><section>The furnace, now unused and neglected, proven by the visible layer of dust blanketing it. On a nearby countertop, the shape of a large hammer imprints itself against the dust layer. 
    </section><br><br><button onclick="han42()">[Locate the rooftop stairway.]</button>`
    end();
}
function han43() {
    allMain += `<br><br><br><br><section>You explore the structure of the forge, looking for a pathway to reach the rooftop. You hear a crackle in the far left corner of the forge, a thimble of burning light flickers in the distance.</section><br><br><button onclick="han44()">[You <em>encounter</em> a stranger.]</button>`
    end();
}
function han44() {
    allMain += `<br><br><br><br><section>Behind the smithing enthusiast is a stairway leading to the rooftop.</section><br><br><button onclick="han45()">[--&gt;]</button>`
    end();
}
function han45() {
    allMain += `<br><br><br><br><section>You exit the forge and spot the ladder, pushing it off the wall and dropping it against the opening in the memorial's roof opening. </section><br><br><button onclick="han46()">[Enter the Eastern Dungeon Memorial.]</button>`
    end();
}
function han46() {
    allMain += `<br><br><br><br><section>You go inside the Memorial building from the rooftop door, you appear to be inside the attic.</section><br><br><button onclick="han47()">[Leave the attic.]</button> <button onclick="han47B()">[Look around.]</button>`
    end();
}
function han46B() {
    allMain += `<br><br><br><br><section>Stale dust and old parchments litter around the shelves and tables. The scent is a cross of an eons-old library and a mausoleum, you sneeze in response.</section><br><br><button onclick="han39()">[Cool.]</button>`
    end();
}
function han47() {
    allMain += `<br><br><br><br><section>The interior of the Memorial building is anciently beautiful. You begin on the second floor, looking down from the protective railing. The hall along the way showcases various arrangements of armor suits through the eras of Polend's history.</section><br><br><button onclick="han48()">[--&gt;]</button>`
    end();
}
function han48() {
    allMain += `<br><br><br><br><section>The display begins with a highly advanced armor designed for mobility dubbed the &quot;Blitzkreig&quot; proudly poses at the end of the arrangement, with the opposite end showing a modestly proportioned plate armor, primitive in nature yet still striking awe and dominance. It was dubbed, &quot;The Cypress&quot;</section><br><br><button onclick="han49()">[Go down the stairs.]</button>`
    end();
}
function han49() {
    allMain += `<br><br><br><br><section>Descending the elegant stairway leads into the atrium, the expansive room is filled by the light coming down from the glass ceiling. You hear a murmur of speech in one of the nearby rooms. </section><br><br><button onclick="han50()">[--&gt;]</button> <button onclick="han50B">[Look around.]</button>`
    end();
}
function han50B() {
    allMain += `<br><br><br><br><section>You see a large linen material covering a doorway, you feel that it's best to give it it's privacy.</section><br><br><button onclick="han50()">[--&gt;]</button> <button onclick="han50B2()">[Er, no.]</button>`
    end();
}
function han50B2() {
    allMain += `<br><br><br><br><section>You uncover the linen. Behind it is a humanoid figure, wrapped up in a tied, woven sack. They seem to be unconcious.</section><br><br><button class="red" onclick="han50()">[You really shouldn't have done that, a fella like this needs his privacy.]</button>`
    end();
}
function han50() {
    allMain += `<br><br><br><br><section>You enter what looks like an exhibit room, dedicated to a myth about an ancient ice-deity of some kind. You don't really care about that, ice is a particularly stupid thing to think about. Hannah finds a jolly Grand Wizard Kobain speaking to a friendly stranger.</section><br><br><button onclick="han51()">[--&gt;]</button>`
    end();
}
function han51() {
    allMain += `<br><br><br><br><section>“Ah, Hannah, good to finally see you. I was hoping you would show up here eventually!”</section><br><br><button onclick="han52()">[Grand Wizard! Where have you been?]</button>`
    end();
}
function han52() {
    allMain += `<br><br><br><br><section>“There has been a, complication since we last spoke. I had to leave very urgently due to.. Well, you're here now, and I require your assistance!”
    </section><br><br><button onclick="han53B()">[Who's the mummy?]</button> <button onclick="han53()">[ok &colon; &rpar;]</button>`
    end();
}
function han53B() {
    allMain += `<br><br><br><br><section>You size up the oddly cloth-covered man. All facial details are omitted by the wrap around his head, he wears a traveler's apparel save for the oddly patterned fabric hanging from around his neck and worn messenger's bag around his right shoulder. </section><br><br><button onclick="han53B2()">[--&gt;]</button>`
    end();
}
function han53B2() {
    allMain += `<br><br><br><br><section>“This is the messenger of course, he comes directly from King Geedorah!” The messenger stares blankly at a fireplace on the opposite wall of the room. “Hm.”
    </section><br><br><button onclick="han53()">[I can help you now.]</button>`
    end();
}
function han53() {
    allMain += `<br><br><br><br><section>“Fantastic! Over here, over here.”</section><br><br><button onclick="han54()">[--&gt;]</button>`
    end();
}
function han54() {
    allMain += `<br><br><br><br><section>Grand Wizard Cobain leads you to a humble corridor near the exhibit room. The messenger follows behind. </section><br><br><button onclick="han55()">[--&gt;]</button>`
    end();
}
function han55() {
    allMain += `<br><br><br><br><section>Cobain stops at a thin creased line between the smooth marble wall, then makes an unintelligible chant.</section><br><br><button onclick="han56()">[--&gt;]</button>`
    end();
}
function han56() {
    allMain += `<br><br><br><br><section>The creased line slides open with a rough skidding sound, revealing a torch lit stairway.</section><br><br><button onclick="han57()">[--&gt;]</button>`
    end();
}
function han57() {
    allMain += `<br><br><br><br><section>“This is the real memorial, Hannah. Within it, lies an ancient relic unbeknownst to most inhabitants of Polend. There are things that wish to obtain it before we, which is why we must retrieve it first. Do you understand?”
    </section><br><br><button onclick="han58()">[Of course.]</button> <button onclick="han58B">[Er, no.]</button>`
    end();
}
function han58B() {
    allMain += `<br><br><br><br><section>“Huh? What?”</section><br><br><button onclick="han58B()">[Huh. What?]</button> <button onclick="han58()">[I understand.]</button>`
    end();
}
function han58() {
    allMain += `<br><br><br><br><section>“Fantastic! The messenger will guide you to the first chamber, he knows it better than I”</section><br><br><button onclick="han59()">[--&gt;]</button>`
    end();
}
function han59() {
    allMain += `<br><br><br><br><section>You descend the stairway with the messenger, Cobain stays up at the entrance.</section><br><br><button onclick="han60()">[--&gt;]</button>`
    end();
}
function han60() {
    allMain += `<br><br><br><br><section>The walk is long and silent, the messenger has the resemblance of a lone wanderer, content with the serenity of silence. You find the silence deafening.
    </section><br><br><button onclick="han61()">[Why were you here with Kobain?]</button>`
    end();
}
function han61() {
    allMain += `<br><br><br><br><section>“Hm… Kobain. He is up there.”</section><br><br><button onclick="han62()">[He <em>is</em> up there.]</button>`
    end();
}
function han62() {
    allMain += `<br><br><br><br><section>You arrive at the entrance for the original Eastern Dungeon. “There are things here you are not expecting, Hannah. Things you are subconsciously aware of.”
    </section><br><br><button onclick="han63B()">[What does that mean?]</button> <button onclick="han63()">Enter the <strong>Dungeon</strong>.</button>`
    end();
}
function han63B() {
    allMain += `<br><br><br><br><section>“...”</section><br><br><button onclick="han63B()">[--&gt;]</button> <button onclick="han63()">Enter the <strong>Dungeon</strong>.</button>`
    end();
}
function han63() {
    allMain += `<br><br><br><br><section>You find yourself inside a cubelike room. Simple in nature, with clear details.</section><br><br><button onclick="han64()">[--&gt;]</button>`
    end();
}
function han64() {
    allMain += `<br><br><br><br><section>The walls are made of aged mausoleum stone, in a state of cracks and crumbles along its once perfect smoothness. Vines grow out through the larger cracks, slumping their large extremities on the corner of the floor. Across from you is a stone wall of a door, a plaque carved next to it. 
    </section><br><br><button onclick="han65B()">[Inspect vines.]</button> <button onclick="han65()"></button>`
    end();
}
function han65B() {
    allMain += `<br><br><br><br><section>The ends of the vines all collect into this corner, they seem to be blocking something.</section><br><br><button onclick="han65()">[Inspect stone door.]</button>`
    end();
}
function han65() {
    allMain += `<br><br><br><br><section>The plaque says, “A stone unturned is a chance forgotten.”</section><br><br><button onclick="han67()">[Deeply inspect the walls.]</button> <button onclick="han65B()">Inspect vines.</button>`
    end();
}
function han67() {
    allMain += `<br><br><br><br><section>Upon deeper inspection, there is an unfastened stone sticking out from the wall's crevice. Pushing it in causes a deep click to resonate through the room, making the stone door slowly rise, opening the hallway. The hallway branches into three paths.
    </section><br><br><button onclick="han()">[--&gt;]</button>`
    end();
}
function han() {
    allMain += `<br><br><br><br><section>WhateverZ</section><br><br><button onclick="han()">[--&gt;]</button>`
    end();
}
function han() {
    allMain += `<br><br><br><br><section>WhateverZ</section><br><br><button onclick="han()">[--&gt;]</button>`
    end();
}
function han() {
    allMain += `<br><br><br><br><section>WhateverZ</section><br><br><button onclick="han()">[--&gt;]</button>`
    end();
}
function han() {
    allMain += `<br><br><br><br><section>WhateverZ</section><br><br><button onclick="han()">[--&gt;]</button>`
    end();
}
function han() {
    allMain += `<br><br><br><br><section>WhateverZ</section><br><br><button onclick="han()">[--&gt;]</button>`
    end();
}
function han() {
    allMain += `<br><br><br><br><section>WhateverZ</section><br><br><button onclick="han()">[--&gt;]</button>`
    end();
}
function han() {
    allMain += `<br><br><br><br><section>WhateverZ</section><br><br><button onclick="han()">[--&gt;]</button>`
    end();
}
function han() {
    allMain += `<br><br><br><br><section>WhateverZ</section><br><br><button onclick="han()">[--&gt;]</button>`
    end();
}
function combatSetup(setCombat = 0, eIndx = 1) {
    if (pHp > pMaxHp) {
        pHp = pMaxHp;
    }
    totalDefReduction = 0;
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
    allMain += `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="listItems()">Inventory</button> <button onclick="run()">Run</button> <button onclick='abilityList()'>Abilities</button></section> `
    end();
}

function generalAttk() {
    allMain += `<br><br><br><section>Select an action:<br><br>`
    if (char == `paul`) {
        allMain += `<button onclick='magicAttkNames()'>Magic Attack</button> <button onclick='meleeAttkChoose()'>Melee Attack</button> <button onclick='combatContinue()'>Cancel</button></section>`
    }
    else {
        allMain += `<button onclick='magicAttkNames()'>Magic Attack</button> `
        if (!bonusActionUsed) {
            allMain += `<button onclick='familiarAttk()'>Companion Attack</button> <button onclick='combatContinue()'>Cancel</button>`
        }
        allMain += `</section>`
    }
    end();
}

function familiarAttk() {
    allMain += `<br><br><br><section>Select an ally to attack:<br><br>`
    for (item of pAllies) {
        allMain += `<button onevent='allySelect(${item})'>${item.name}</button> `
    }
    allMain += `<button onclick='combatContinue()'>Cancel</button></section>`
    end();
}

function allySelect(allyObj) {
    allMain += `<br><br><br><section>Choose a target:<br><br>`
    for (item of currentEs) {
        allMain += `<button onevent='allyAttk(${allyObj},${currentEs.indexOf(item)})'>${item.e}</button> `
    }
    allMain += `<button onclick='combatContinue()'>Cancel</button></section>`
    end();
}

function allyAttk(allyObj, enemyIndx) {
    let dmgToE = Math.round(allyObj.eDmg * (pDmg + allyDmgBuff));
    switch (meleeMagicInfusion) {
        case `fire`:
            currentEs[enemyIndx].dot = Math.round(10 * pMagicDmg)
            currentEs[enemyIndx].dotLength = 3
            break;
        case `water`:
            pHp += dmgToE;
            break;
        case `earth`:
            dmgToE = Math.round(dmgToE * pMagicDmg);
            break;
    }
    dmgToE = Math.round(dmgToE * (1 - currentEs[enemyIndx].eDef / 100));
    if (pAllies.length == maxAllyNum && pAbilities.indexOf(stInNumbers) != -1) {
        dmgToE = Math.round(dmgToE * 1.5);
    }
    currentEs[enemyIndx].eHp -= dmgToE;
    allMain += `<br><br><br><br><section>You dealt ${dmgToE} damage to the enemy!</section>`
    currentEs[enemyIndx].eDef = currentEs[enemyIndx].baseDef;
    end();
    if (!bonusActionUsed && pAbilities.indexOf(`allyBonusAction`) != -1) {
        allMain += `<br><br><section>You can do an extra action!</section>`
        combatContinue();
    }
    else {
        enemyTurn();
    }
}

function meleeAttkChoose() {
    allMain += `<br><br><br><section>Choose a target:<br><br>`
    for (item of currentEs) {
        allMain += `<button onevent='meleeAttk(${currentEs.indexOf(item)})'>${item.e}</button> `
    }
    allMain += `<button onclick='combatContinue()'>Cancel</button></section>`
    end();
}

function meleeAttk(enemyIndx) {
    let dmgToE = Math.round(500 * (pLvl / 25));
    dmgToE = Math.round(dmgToE * pDmg);
    if (pAbilities.indexOf(`enemyWeakener`) != -1) {
        if (Math.random() >= 0.5) {
            totalDefReduction += 2;
        }
    }
    currentEs[enemyIndx].eDef -= totalDefReduction;
    if (pAbilities.indexOf(`highMelee`) != -1) {
        let dmgBuff = Math.floor(totalDmgDealt / 50) * (pLvl * 10 / 25);
        dmgToE += Math.round(dmgBuff / 100 * dmgToE)
    }
    switch (meleeMagicInfusion) {
        case `fire`:
            currentEs[enemyIndx].dot = Math.round(10 * pMagicDmg)
            currentEs[enemyIndx].dotLength = 3
            break;
        case `water`:
            pHp += dmgToE;
            break;
        case `earth`:
            dmgToE = Math.round(dmgToE * pMagicDmg);
            break;
        case `all`:
            currentEs[enemyIndx].dot = Math.round(10 * pMagicDmg)
            currentEs[enemyIndx].dotLength = 3
            waterInfused = true;
            dmgToE = Math.round(dmgToE * pMagicDmg);
            break;
        case `none`:
            if (pAbilities.indexOf(`multiHit`) != -1) {
                let hitConst = getRandomInt(0, 25);
                if (hitConst <= pLvl) {
                    dmgToE *= 5;
                }
            }
    }
    dmgToE = Math.round(dmgToE * (1 - currentEs[enemyIndx].eDef / 100));
    currentEs[enemyIndx].eHp -= dmgToE;
    totalDmgDealt += dmgToE;
    allMain += `<br><br><br><br><section>You dealt ${dmgToE} damage to the enemy!</section>`
    currentEs[enemyIndx].eDef = currentEs[enemyIndx].baseDef;
    end();
    enemyTurn();
}

function abilityList() {
    allMain += `<br><br><br><br><section>`
    if (pActiveAbilities.length > 0) {
        for (item of pActiveAbilities) {
            allMain += `<button onclick='item.effect.call(this)'>${item.name}</button> `
        }
        allMain += `<button onclick="combatContinue()">Cancel</button>`
    }
    else {
        allMain += `You have no active abilities<br><br><button onclick="combatContinue()">Cancel</button>`
    }
    allMain += `</section>`
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
    if (pAbilities.indexOf(`blockDmgUp`) > -1) {
        pDmg += (pDmg * 0.02)
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
        if (pAbilities.indexOf(`quickHeal`) != -1) {
            if (quickHealUsed && (allPSpellType[allPSpells.indexOf(item)] == `water`)) {
                allMain += ``
            }
            else {
                allMain += `<button onclick='magicAttkAction("${item}")'>${item}</button> `
            }
        }
        else {
            allMain += `<button onclick='magicAttkAction("${item}")'>${item}</button> `
        }
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

    if (pAbilities.indexOf(`highMelee`)) {
        for (let i = 0; i < Math.floor(totalDmgDealt / 50); i++)
            pMagicDmg += (pLvl * 5 / 24).toFixed(2);
    }
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
        if (pAbilities.indexOf(`waterShield`) != -1) {
            pBlockDef += 10;
        }
        if (!quickHealUsed && pAbilities.indexOf(`quickHeal`) != -1) {
            quickHealUsed = true;
            combatContinue();
        }
        else {
            enemyTurn();
        }
        return undefined;
    }
    dmgToE *= pMagicDmg;
    if (pAbilities.indexOf(`quadHit`) > -1) {
        if (Math.random() < (pLvl - 1) / 25) {
            dmgToE *= 4
        }
    }
    dmgToE = Math.round(dmgToE);
    if (pSpellAttkNum[castSpellIndx] > 1) {
        for (item of currentEs) {
            if (`fire` === allPSpellType[castSpellIndx]) {
                if (item.dot < allFireDot[castSpellIndx]) {
                    item.dot = allFireDot[castSpellIndx];
                }
                item.dotLength += (allFireDotLength[castSpellIndx] + fireDotBuff);
            }
            else {
                if (pAbilities.indexOf(`doubleEarth`) != -1) {
                    if (Math.random() < (pLvl - 1) / 25) {
                        allMain += `<section>Your Earth Attack dealt double damage!</section>`
                        dmgToE *= 2;
                    }
                }
            }
            dmgToE = Math.round(dmgToE * (1 - (item.eDef / 100)))
            item.eHp -= dmgToE;
            totalDmgDealt += dmgToE;
        }
        allMain += `<br><br><br><br><section>You dealt ${dmgToE} damage to the enemies.`
    }

    else {
        if (pAbilities.indexOf(`doubleEarth`) != -1) {
            if (Math.random() < (pLvl - 1) / 25) {
                allMain += `<br><br><section>Your Earth Attack dealt double damage!</section>`
                dmgToE *= 2;
            }
        }
        if (`fire` === allPSpellType[castSpellIndx]) {
            if (currentEs[0].dot < allFireDot[castSpellIndx]) {
                currentEs[0].dot = allFireDot[castSpellIndx];
            }
            currentEs[0].dotLength += (allFireDotLength[castSpellIndx] + fireDotBuff);
        }
        dmgToE = Math.round(dmgToE * (1 - (currentEs[0].eDef / 100)));
        currentEs[0].eHp -= dmgToE;
        totalDmgDealt += dmgToE;
        allMain += `<br><br><br><br><section>You dealt ${dmgToE} damage to the enemy.`
    }

    if (quadHitActivated) {
        allMain += ` Your earth ability also increased this damage by 4x!</section>`
    }
    else {
        allMain += `</section>`
    }
    for (let i = 0; i < currentEs.length; i++) {
        if (!(currentEs[i].eHp > 0)) {
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
    allMain += `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="listItems()">Inventory</button> <button onclick="run()">Run</button> <button onclick='abilityList()'>Abilities</button></section> `
    end();
}

function enemyTurn() {
    for (let i = 0; i < currentEs.length; i++) {
        if (!(currentEs[i].eHp > 0)) {
            currentEs.splice(i, 1);
            i--;
        }
        if (currentEs[i].eDef < 0) {
            currentEs[i].eDef = 0;
        }
    }
    if (currentEs.length == 0) {
        combatEnd();
        return undefined;
    }
    if (pAbilities.indexOf(`firebomb`) != -1 && turnCounter >= 5) {
        if (Math.random() < (pLvl - 1) / 25) {
            allMain += `<br><br><br><section>Your firebomb activated and dealt ${40} damage</section>`
            turnCounter = -1;
            for (item of currentEs) {
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

    if (pIsBlocking) {
        if (pAbilities.indexOf(`blockImmunity`) > -1) {
            let hitChance = getRandomInt(0, 4);
            if (hitChance == 0) {
                dmgToP = 0;
            }
        }
        if (pAbilities.indexOf(`parry`) > -1) {
            dmgToP = 0;
        }

        if (pAbilities.indexOf(`fireBlock`) > -1) {
            for (item of currentEs) {
                if (item.dot < 3) {
                    item.dot = 3;
                }
                item.dotLength += (2 + fireDotBuff);
            }
        }
    }
    let hitAlly = getRandomInt(0, pAllies.length + 1);
    if (hitAlly == pAllies.length) {
        dmgToP = Math.round(dmgToP * (1 - (pBlockDef / 100)));
        pHp -= dmgToP;
    }
    else {
        dmgToP = Math.round(dmgToP * (1 - (pAllies[hitAlly].eDef / 100)));
        pAllies[hitAlly].eHp -= dmgToP;
        for (item of hitAlly) {
            if (!(item.eHp > 0)) {
                pAllies.splice(pAllies.indexOf(item), 1);
            }
        }
    }
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
    if (hitAlly == pAllies.length) {
        allMain += ` dealt ${dmgToP} damage to you. You have ${pHp} health remaining.`
    }
    else {
        allMain += ` dealt ${dmgToP} damage to your ${pAllies[hitAlly].e}. Your ally has ${pAllies[hitAlly].eHp} health remaining.`
    }
    for (item of currentEs) {
        if (item.dotLength > 0) {
            item.eHp -= item.dot;
            item.dotLength--;
            allMain += ` The ${item.e} took ${item.dot} damage right now.`
        }
    }
    for (let i = 0; i < currentEs.length; i++) {
        if (!(currentEs[i].eHp > 0)) {
            currentEs.splice(i, 1);
            i--;
        }
    }
    if (currentEs.length == 0) {
        combatEnd();
    }
    allMain += `</section>`
    if ((pAbilities.indexOf(`phoenix`) != -1) && (pHp <= 0)) {
        if (!phoenixUsed) {
            pHp = pMaxHp / 2;
            phoenixUsed = true;
        }
    }
    if (pHp <= 0) {
        playerLost();
        return undefined;
    }
    for (let i = 0; i < currentEs.length; i++) {
        if (currentEs[i].eHp <= 0) {
            currentEs.splice(i, 1);
            i--;
        }
    }
    if (currentEs.length == 0) {
        combatEnd();
        return undefined;
    }
    pBlockDef = pBaseDef;
    quickHealUsed = false
    end();
    combatContinue();
}

function combatEnd() {
    allMain = `<br><br><br><br><section>You win</section>`;
    givePlayerItem();

    allMain += `<br><br><br><br><section><button onclick='${saveState}()'>Continue</button></section>`
    end();
}

function playerLost() {
    allMain = `You lost<br>Refresh the page to play again`
    end();
}

//similar to combat end
function pleaseRun() {
    currentEs = [];
    allMain = `<br><br><br><br><section>You literally ran from the only enemy. I have no words.</section>`
    allMain += `<br><br><br><br><section><button onclick='${saveState}()'>Continue</button></section>`
    end();
}

function lvlUp() {
    allMain = `<br><br><br><br><section>Select an Upgrade!<br><br><section class='skillColumn'>`
    if (statA == 0) {
        allMain += `<button onevent='buffStat("def",${5})'>Block Def Up</button>`
    }
    else if (statA == 1) {
        allMain += `<button>Block Def Up</button> <button onevent='addAbility("blockDmgUp")'>Blocking increses dmg by a small percent for the next turn</button>`
    }
    else if (statA == 2) {
        allMain += `<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button onevent='buffStat("def",${5})'>Block Def Up</button>`
    }
    else if (statA == 3) {
        allMain += `<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button onevent='addAbility("blockImmunity")'>While blocking, have a 25% chance to not take dmg</button>`
    }
    else if (statA == 4) {
        allMain += `<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button>While blocking, have a 25% chance to not take dmg</button> <button onevent='buffStat("def",${5})'>Block Def Up</button>`
    }
    else if (statA == 5) {
        allMain += `<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button>While blocking, have a 25% chance to not take dmg</button> <button>Block Def Up</button> <button onevent='addAbility("parry")'>You no longer take damage while blocking</button>`
    }
    else if (statA == 6) {
        allMain += `<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button>While blocking, have a 25% chance to not take dmg</button> <button>Block Def Up</button> <button>You no longer take damage while blocking</button>`
    }
    allMain += `</section><section class='skillColumn'>`

    switch (pSpellType) {
        case `all`:
            if (statB == 0) {
                allMain += `<button onevent='buffStat("fireDotBuff",${1})'>Fire DOT Length Up</button>`
            }
            else if (statB == 1) {
                allMain += `<button>Fire DOT Length Up</button> <button onevent='addAbility("fireBlock","fire")'>Blocking deals fire damage to enemy</button>`
            }
            else if (statB == 2) {
                allMain += `<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button onevent='buffStat("fireDotBuff",${1})'>Fire DOT Length Up</button>`
            }
            else if (statB == 3) {
                allMain += `<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button onevent='addAbility("firebomb","fire")'>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button>`
            }
            else if (statB == 4) {
                allMain += `<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button onevent='buffStat("fireDotBuff",${1})'>Fire DOT Length Up</button>`
            }
            else if (statB == 5) {
                allMain += `<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button>Fire DOT Length Up</button> <button onevent='addAbility("phoenix","fire")'>If your Hp drops to 0, regain half hp</button>`
            }
            else if (statB == 6) {
                allMain += `<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button>Fire DOT Length Up</button> <button>If your Hp drops to 0, regain half hp</button>`
            }
            allMain += `</section><section class='skillColumn'>`
            if (statC == 0) {
                allMain += `<button onevent='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
            }
            else if (statC == 1) {
                allMain += `<button>Healing Power Up</button> <button onevent='addAbility("coolDown","water",coolDown)'>You can remove DOT afflictions using an ability</button>`
            }
            else if (statC == 2) {
                allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button onevent='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
            }
            else if (statC == 3) {
                allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button onevent='addAbility("waterShield","water")'>Healing increases defense by a moderate amount for a turn</button>`
            }
            else if (statC == 4) {
                allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button onevent='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
            }
            else if (statC == 5) {
                allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button>Healing Power Up</button> <button onevent='addAbility("quickHeal","water")'>You can attack and heal in the same turn</button>`
            }
            else if (statC == 6) {
                allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button>Healing Power Up</button> <button>You can attack and heal in the same turn</button>`
            }
            allMain += `</section><section class='skillColumn'>`
            if (statD == 0) {
                allMain += `<button onevent='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
            }
            else if (statD == 1) {
                allMain += `<button>Earth Dmg Up</button> <button onevent='addAbility("doubleEarth","earth")'>Earth attacks can hit twice</button>`
            }
            else if (statD == 2) {
                allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button onevent='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
            }
            else if (statD == 3) {
                allMain += (`<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button>
                <button onevent='addAbility("InstaKill","earth", instaKill'>Adds ability to defeat any enemy whose hp is under 10%</button>`)
            }
            else if (statD == 4) {
                allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button onevent='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
            }
            else if (statD == 5) {
                allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button>Earth Dmg Up</button> <button onevent='addAbility("quadHit","earth")'>All attacks have a ${(pLvl - 1) / 25 * 100}% chance to hit 4 times</button>`
            }
            else if (statD == 6) {
                allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button>Earth Dmg Up</button> <button>All attacks have a ${(pLvl - 1) / 25 * 100}% chance to hit 4 times</button>`
            }
            allMain += `</section>`
            break;
        default:
            switch (pSpellType) {
                case `fire`:
                    if (statB == 0) {
                        allMain += `<button onevent='buffStat("fireDotBuff",${1})'>Fire DOT Length Up</button>`
                    }
                    else if (statB == 1) {
                        allMain += `<button>Fire DOT Length Up</button> <button onevent='addAbility("fireBlock","fire")'>Blocking deals fire damage to enemy</button>`
                    }
                    else if (statB == 2) {
                        allMain += `<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button onevent='buffStat("fireDotBuff",${1})'>Fire DOT Length Up</button>`
                    }
                    else if (statB == 3) {
                        allMain += `<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button onevent='addAbility("firebomb","fire")'>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button>`
                    }
                    else if (statB == 4) {
                        allMain += `<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button onevent='buffStat("fireDotBuff",${1})'>Fire DOT Length Up</button>`
                    }
                    else if (statB == 5) {
                        allMain += `<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button>Fire DOT Length Up</button> <button onevent='addAbility("phoenix","fire")'>If your Hp drops to 0, regain half hp</button>`
                    }
                    else if (statB == 6) {
                        allMain += `<button>Fire DOT Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire DOT Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button>Fire DOT Length Up</button> <button>If your Hp drops to 0, regain half hp</button>`
                    }
                    break;
                case `water`:
                    if (statB == 0) {
                        allMain += `<button onevent='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
                    }
                    else if (statB == 1) {
                        allMain += `<button>Healing Power Up</button> <button onevent='addAbility("coolDown","water",coolDown)'>You can remove DOT afflictions using an ability</button>`
                    }
                    else if (statB == 2) {
                        allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button onevent='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
                    }
                    else if (statB == 3) {
                        allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button onevent='addAbility("waterShield","water")'>Healing increases defense by a moderate amount for a turn</button>`
                    }
                    else if (statB == 4) {
                        allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button onevent='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
                    }
                    else if (statB == 5) {
                        allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button>Healing Power Up</button> <button onevent='addAbility("quickHeal","water")'>You can attack and heal in the same turn</button>`
                    }
                    else if (statB == 6) {
                        allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button>Healing Power Up</button> <button>You can attack and heal in the same turn</button>`
                    }
                    break;
                case `earth`:
                    if (statB == 0) {
                        allMain += `<button onevent='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
                    }
                    else if (statB == 1) {
                        allMain += `<button>Earth Dmg Up</button> <button onevent='addAbility("doubleEarth","earth")'>Earth attacks can hit twice</button>`
                    }
                    else if (statB == 2) {
                        allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button onevent='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
                    }
                    else if (statB == 3) {
                        allMain += (`<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button>
                        <button onevent='addAbility("InstaKill","earth", instaKill)'>Adds ability to defeat any enemy whose hp is under 10%</button>`)
                    }
                    else if (statB == 4) {
                        allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button onevent='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
                    }
                    else if (statB == 5) {
                        allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button>Earth Dmg Up</button> <button onevent='addAbility("quadHit","earth")'>All attacks have a ${(pLvl - 1) / 25 * 100}% chance to hit 4 times</button>`
                    }
                    else if (statB == 6) {
                        allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button>Earth Dmg Up</button> <button>All attacks have a ${(pLvl - 1) / 25 * 100}% chance to hit 4 times</button>`
                    }
                    break;
            }
            switch (char) {
                case `paul`:
                    if (statC == 0) {
                        allMain += `<button onevent='buffStat("pDmg",${0.25})'>Sword Dmg Up</button>`
                    }
                    else if (statC == 1) {
                        allMain += `<button>Sword Dmg Up</button> <button onevent='addAbility("defReduction","p1", eDefReduction)'>Adds ability which reduces enemy defense</button>`
                    }
                    else if (statC == 2) {
                        allMain += `<button>Sword Dmg Up</button> <button>Adds ability which reduces enemy defense</button> <button onevent='buffStat("pDmg",${0.25})'>Sword Dmg Up</button>`
                    }
                    else if (statC == 3) {
                        allMain += (`<button>Sword Dmg Up</button> <button>Adds ability which reduces enemy defense</button> <button>Sword Dmg Up</button>
                        <button onevent='addAbility("multiHit","p1")'>A non-magic infused attack has a chance to hit ${(pLvl * 5 / 25)} times</button>`)
                    }
                    else if (statC == 4) {
                        allMain += `<button>Sword Dmg Up</button> <button>Adds ability which reduces enemy defense</button> <button>Sword Dmg Up</button> <button>A non-magic infused attack has a chance to hit ${(pLvl * 5 / 24)} times</button> <button onevent='buffStat("pDmg",${0.25})'>Sword Dmg Up</button>`
                    }
                    else if (statC == 5) {
                        allMain += `<button>Sword Dmg Up</button> <button>Adds ability which reduces enemy defense</button> <button>Sword Dmg Up</button> <button>A non-magic infused attack has a chance to hit ${(pLvl * 5 / 24)} times</button> <button>Sword Dmg Up</button> <button onevent='addAbility("highMelee","p1")'>For every 50 damage you deal, your damage increases by ${pLvl * 10 / 25}%</button>`
                    }
                    else if (statC == 6) {
                        allMain += `<button>Sword Dmg Up</button> <button>Adds ability which reduces enemy defense</button> <button>Sword Dmg Up</button> <button>A non-magic infused attack has a chance to hit ${(pLvl * 5 / 24)} times</button> <button>Sword Dmg Up</button> <button>For every 50 damage you deal, your damage increases by ${pLvl * 10 / 24}%</button>`
                    }

                    if (statD == 0) {
                        allMain += `<button onevent='buffStat("pMagicDmg",${0.25})'>Magic Dmg Up</button>`
                    }
                    else if (statD == 1) {
                        allMain += `<button>Magic Dmg Up</button> <button onevent='addAbility("Melee Infusion","p2",infuseMelee)'>All melee attacks can be infused with selected magic attribute</button>`
                    }
                    else if (statD == 2) {
                        allMain += `<button>Magic Dmg Up</button> <button>All melee attacks can be infused with selected magic attribute</button> <button onevent='buffStat("pMagicDmg",${0.25})'>Magic Dmg Up</button>`
                    }
                    else if (statD == 3) {
                        allMain += `<button>Magic Dmg Up</button> <button>All melee attacks can be infused with selected magic attribute</button> <button>Magic Dmg Up</button>
                        <button onevent='addAbility("enemyWeakener,"p2")'>Repeated melee attacks weakens the enemy</button>`
                    }
                    else if (statD == 4) {
                        allMain += `<button>Magic Dmg Up</button> <button>All melee attacks can be infused with selected magic attribute</button> <button>Magic Dmg Up</button> <button>Repeated melee attacks weakens the enemy</button> <button onevent='buffStat("pMagicDmg",${0.25})'>Magic Dmg Up</button>`
                    }
                    else if (statD == 5) {
                        allMain += `<button>Magic Dmg Up</button> <button>All melee attacks can be infused with selected magic attribute</button> <button>Magic Dmg Up</button> <button>Repeated melee attacks weakens the enemy</button> <button>Magic Dmg Up</button> <button onevent='addAbility("maxInfusion","p2")'>Melee attacks can be infused with all elements</button>`
                    }
                    else if (statD == 6) {
                        allMain += `<button>Magic Dmg Up</button> <button>All melee attacks can be infused with selected magic attribute</button> <button>Magic Dmg Up</button> <button>Repeated melee attacks weakens the enemy</button> <button>Magic Dmg Up</button> <button>Melee attacks can be infused with all elements</button>`
                    }
                    break;
                case `mat`:
                    if (statC == 0) {
                        allMain += `<button onevent='buffStat("allyDmg",${0.25})'>Ally Dmg Up</button>`
                    }
                    else if (statC == 1) {
                        allMain += `<button>Ally Dmg Up</button> <button onevent='addAbility("Ally Infusion","m1",infuseMelee)'>You can infuse  infuse allies with your elemental attribute</button>`
                    }
                    else if (statC == 2) {
                        allMain += `<button>Ally Dmg Up</button> <button>You can infuse  infuse allies with your elemental attribute</button> <button onevent='buffStat("allyDmg",${0.25})'>Ally Dmg Up</button>`
                    }
                    else if (statC == 3) {
                        allMain += (`<button>Ally Dmg Up</button> <button>You can infuse  infuse allies with your elemental attribute</button> <button>Ally Dmg Up</button>
                        <button onevent='addAbility("allyHeal","m1", allyHeal())'>You can heal all allies ${pLvl / 25 * 35}% of their health</button>`)
                    }
                    else if (statC == 4) {
                        allMain += `<button>Ally Dmg Up</button> <button>You can infuse  infuse allies with your elemental attribute</button> <button>Ally Dmg Up</button> <button>You can heal all allies ${pLvl / 25 * 35}% of their health</button> <button onevent='buffStat("allyDmg",${0.25})'>Ally Dmg Up</button>`
                    }
                    else if (statC == 5) {
                        allMain += `<button>Ally Dmg Up</button> <button>You can infuse  infuse allies with your elemental attribute</button> <button>Ally Dmg Up</button> <button>You can heal all allies ${pLvl / 25 * 35}% of their health</button> <button>Ally Dmg Up</button> <button onevent='addAbility("allyBonusAction","m1")'>You can do an extra action while your ally attacks</button>`
                    }
                    else if (statC == 6) {
                        allMain += `<button>Ally Dmg Up</button> <button>You can infuse  infuse allies with your elemental attribute</button> <button>Ally Dmg Up</button> <button>You can heal all allies ${pLvl / 25 * 35}% of their health</button> <button>Ally Dmg Up</button> <button>You can do an extra action while your ally attacks</button>`
                    }

                    if (statD == 0) {
                        allMain += `<button onevent='buffStat("allyNum",${0.25})'>Max Ally Num Up</button>`
                    }
                    else if (statD == 1) {
                        allMain += `<button>Max Ally Num Up</button> <button onevent='addAbility("allyChanceUp","m2")'>Recruiting an ally is more successful</button>`
                    }
                    else if (statD == 2) {
                        allMain += `<button>Max Ally Num Up</button> <button>Recruiting an ally is more successful</button> <button onevent='buffStat("allyNum",${0.25})'>Max Ally Num Up</button>`
                    }
                    else if (statD == 3) {
                        allMain += `<button>Max Ally Num Up</button> <button>Recruiting an ally is more successful</button> <button>Max Ally Num Up</button>
                        <button onevent='addAbility("allyStrengthen,"m2")'>Allies have higher stats when recruited</button>`
                    }
                    else if (statD == 4) {
                        allMain += `<button>Max Ally Num Up</button> <button>Recruiting an ally is more successful</button> <button>Max Ally Num Up</button> <button>Allies have higher stats when recruited</button> <button onevent='buffStat("allyNum",${0.25})'>Max Ally Num Up</button>`
                    }
                    else if (statD == 5) {
                        allMain += `<button>Max Ally Num Up</button> <button>Recruiting an ally is more successful</button> <button>Max Ally Num Up</button> <button>Allies have higher stats when recruited</button> <button>Max Ally Num Up</button> <button onevent='addAbility("stInNumbers","m2")'>If player has the max number of allies, all allies deal increased damage</button>`
                    }
                    else if (statD == 6) {
                        allMain += `<button>Max Ally Num Up</button> <button>Recruiting an ally is more successful</button> <button>Max Ally Num Up</button> <button>Allies have higher stats when recruited</button> <button>Max Ally Num Up</button> <button>If player has the max number of allies, all allies deal increased damage</button>`
                    }
                    break;
            }
            break;
    }
    end();
}


function addAbility(abilityName, path, active = false) {
    pAbilities.push(abilityName);
    if (abilityName == `Melee Infusion`) {
        pActiveAbilities.push({ name: `Remove Infusion`, effect: removeInfusion })
    }
    if (active) {
        pActiveAbilities.push({ name: abilityName });
        pActiveAbilities[pActiveAbilities.length - 1].effect = active
    }
    switch (path) {
        case `fire`:
            statB++;
            break;
        case `water`:
            if (pSpellType == `water`) {
                statB++
            }
            else {
                statC++;
            }
            break;
        case `earth`:
            if (pSpellType == `earth`) {
                statB++
            }
            else {
                statD++;
            }
            break;
        case `p1`:
            statC++;
            break;
        case `p2`:
            statD++;
            break;
        case `m1`:
            statC++;
            break;
        case `m2`:
            statD++;
            break;
    }
    //stat++;
}

function buffStat(stat, amount) {
    switch (stat) {
        case `def`:
            pBaseDef += amount;
            pBlockDef += amount;
            break;
        case `fireDotBuff`:
            fireDotBuff += amount;
            statB++;
            break;
        case `waterBuff`:
            waterBuff += amount;
            if (pSpellType == `water`) {
                statB++
            }
            else {
                statC++;
            }
            break;
        case `earthBuff`:
            earthBuff += amount;
            if (pSpellType == `earth`) {
                statB++
            }
            else {
                statD++;
            }
            break;
        case `pDmg`:
            pDmg += amount;
            pBaseDmg += amount;
            statC++;
            break;
        case `pMagicDmg`:
            pMagicDmg += amount;
            pBaseMagicDmg += amount;
            statD++
            break;
        case `allyDmg`:
            allyDmgBuff += amount;
            statC++;
        case `allyNum`:
            maxAllyNum += amount;
            statD++;
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
