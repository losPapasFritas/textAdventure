let allMain = `<section>Choose a character! <br><br> <button class="paul">Paul the Knight</button> <button class="hannah">Hannah the Magician</button> <button class="mathew">Mathew the Tamer</button></section>`
let char = `none`,
    currentE = `none`,
    eHp = 0,
    maxEHp = 0,
    eDef = 0,
    pMagicDmg = 0,
    pBlockDef = 0,
    pHp = 50;

let enemies = [`goblin`,`immortal worm`,`bandit`,`imp`,`mud man`, `walking fish`,`stone golem`,`cyclopes`];
let enemyHp = [];
function hannahSelect() {
    char = `h`
    allMain+=`<br><br><br><br><section id="hannahDesc" class="visible">You take the vessel of Hannah, the noble yet troublesome apprentice of the Grand Wizard Master Kobain. She has an immense desire to obtain the powers of the world's elements, however she has a long and dangerous road if she wants to achieve this magnitude of power. Her conscience and belief in the Grand Wizard repels her from the most desperate bargains of terrible evils.  <br><br> <button id="hannahSelect">Select this character</button> <button class="paul">Paul the Knight</button> <button class="mathew">Mathew the Tamer</button></section>`;
    allMain+=`<br><br><br><br><section>ur mum</section>`;
    document.getElementById(`main`).innerHTML = allMain
}

function combatSetup(enemy){
    currentE = enemy
    let aOrAn = `a`;
    switch (enemy[0]){
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
    allMain+=`<br><br><br><br><section>You encounter ${aOrAn} ${enemy}.<br><br>`
    if(char = `h`){
        allMain+= `<button onclick="magicAttk()">Magic</button> `
    }
    else{
        allMain+=`<button onclick="generalAttk()">Fight</button> `
    }
    allMain+= `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="items()">Inventory</button> <button onclick="run()">Run</section>`
    document.getElementById(`main`).innerHTML = allMain;    
}

function inspect(){
    // allMain+=
}

function run(){
    allMain+=`<br><br><br><br><section>Would you like to run from this encounter?<br><br> <button onclick="pleaseRun()">Yes</button><button onclick="combatContinue()">No</button></section>`
    document.getElementById(`main`).innerHTML = allMain;
}

function combatContinue(){
    allMain+=`<br><br><br><br> <section>Select an action</section><br><br>`
    if(char = `h`){
        allMain+= `<button onclick="magicAttk()">Magic</button> `
    }
    else{
        allMain+=`<button onclick="generalAttk()">Fight</button> `
    }
    allMain+= `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="items()">Inventory</button> <button onclick="run()">Run</section>`
    document.getElementById(`main`).innerHTML = allMain;
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