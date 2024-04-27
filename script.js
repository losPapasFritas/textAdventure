
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
    forcedCombat = false,
    currentCity = -1;
money = 10,
    givenMoney = 0,
    bossRushIndx = 5,
    currentDungeon = -1,
    totalDefReduction = 0;
let playerY = 0;
let playerX = 0;
let map = `@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@.............................................................@##################################################################################@((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@...............................................DDD........@@@##################################################################################@(((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.........CCCCCCCCC..................................@@@@@@##################################################################################@((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.........CCCCCCCCC.............................@@@@@###################################################################################@@@@@((((((((((((((((((((((((((((((((((((((((CCCCCCCC(((((((((((@
@.........CCCCCCCCC...........................@@####################################################################################@@@@(((((((((((((((((((((((((((((((((((((((((((((CCCCCCCC(((((((((((@
@...........................................@@#################################################################################@@@@@((((((((((((((((((((((((((((((((((((((((((((((((((((((DDDDD(((((((((@
@.......................................@@@@################################################################################@@@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((DDDDD(((((((((@
@.....................................@@###############################################################################@@@@@((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@....................................@############################################################################@@@@@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.......................DDDD........@######################################* *..*********************************@ /((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.......................DDDD.......@################################********************************************@ /(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@................................ @################@@@@@@@@@@@@@@@@@@@*******************************************@@@@@@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@............................... @#####@@@@@@@@@@@@...................@************************************************@@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.............................. .@@@@@@...............................@**************************************************@DDDDD@@@@. .((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.......................... ( ........................DDDDD........ .@***************************************************@DDDDD@***@@@ (((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@....................... . ((( . .....................DDDDD.........@*****************************************************@@@@@*******@@@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@................... ((((((. ..................................... @****************************************************************@@((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.......... ((((((((((((((( ....................................* @@@@@@**********************************************************.@((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((((((((((((. . ................................../.@***********************************************************@@./((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((((((((((((( . ...................................@************************ ......... **************************@/(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((DDDDD((((((( . ................................./ @********************* ................ *********************@@@ (((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((DDDDD((((((((. ...................................@******************. ................... **********************@*(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((((((((((((((((*. ..................................@******************* .....................********************@..((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((((((((((((((((( ................................. @***************** ......................**********************@((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@((((((((((((((((((((((((((((((((((((*. ................................ @*****************. .................... **********************@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@((((((((((((((((((((((((((((((((((((. ...................................@****************** ................. ***********************@ (((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@((((((((((((((((((((((((((((((((((((. ................................. /@********************* ........... .*************************@/(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((((((((DDD((((((/ .................................. .@***************************...****************************@.... ./((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@/(((((((((((((((/(((((((((((((((((((/. .................................. @*********************************************************@........................ .*(((((((((((((((((((((((((((((((((((((((@
@###############.(((((((((((((((((((( .........DD...................... .. @@@@*****************************************************@................................... *(/(((((((((((((((((((((((((((.@
@################(((((((((((((((((((( . ....................... .............. @****************************************************@....................................... ########%%*. ./(((((((((((.@
@################### *((((((((((((((. .......... .......................... ...@****************************************************@...................................*.#DDDD########################.@
@####################/.((((((((((((( ....................................DDD...@*****************************************************@.................................... ############################*@
@#####################(.((((((((((((( ..........................................@@@*************************************************@.................................... #############################*@
@#######################/(((((((((((((.. ..........................................@@@@@@@**************************************@@@@.................................. ################################*@
@###,,,,,,,,,,,#########((((((((((((( . ..................................................@@@@@*******************@@@@@@@@@@@@@@ ((((. ............................ %##################################*@
@###,,,,,,,,,,,###########(((((((((((((( ......................................................@@@@@@@@@@@@@@@@@@@######*##### (((((((( ....................... .######################################*@
@## ,,,,,,,,,,,###########((((((((((((((( ................................CCCC.................... DDDDDD#######################DDDD## (((((((((((* .................. %###############################*@
@#########################(((((((((((((((/ ...............................CCCC.....................DDDDDD############################### ((((((DD((((((( ............. %###############################*@
@########################((((((((((((((((((. ...................................................... *#################################### (((((((((((((((((( ........ #################################*@
@#######################.(((((((((((((((((((( ..................................................... *####################################% ((((((((((((((((((((((. .###################################*@
@######################(((((((((((((((((((((((((((....................................... *#####################################*.((((((((((((((((((((((((((( %##########%.########CCCCCCCCCC##########*@
@####################((((((((((((((((((((((((((((((((((((((((((((( . .............................. (###################################### (((((((((((((((((((((DD(((((( #########CCCCCCCCCC##########*@
@##############(%(((((((((((((((((((((((((((((((((((((((((((((((((((.* ............................. ######################################.*((((((((((((((((((((((((((((( %#######CCCCCCCCCC##########*@
@#########((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( ............................ %##############CCCCCCCC##(#############% ((((((((((((((((((((((((((((((..%##########################*@
@*(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( ............................ %#############CCCCCCCC################## (((((((((((((((((((((((((((((((( .########################*@
@((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( ............................. #############CCCCCCCC################### /(((((((((((((((((((((((((((((((((/ #####################*@
@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( ............................. ########################################.*((((((((((((((((((((((((((((((((((((/ (##################*@
@((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( / .............................. ########################################( (((((((((((((((((((((((((((((((((((((((( (#############*@
@((((((((((((((((((((DDD((((((((((((((((((((((((((((((((((((((((((./. ............................... ########################################% ((((((((((((((((((((((((((((((((((((((((((. ###########*@
@((((((((((((((((((((((((((((((CC((((((((((((DDDD(((((((((((((((( . ..........DDD..........DDD....... ######################################### ((((((((((((((((((((((((((((((((((((((((((((( .########*@
@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((% .................................. %######################################## (((DDD(((((((((((((((((((((((((((((((DD((((((((( .######*@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`
let map2 =
    `@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@.............................................................@##################################################################################@((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@...............................................DDD........@@@##################################################################################@(((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.........CCCCCCCCC..................................@@@@@@##################################################################################@((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.........CCCCCCCCC.............................@@@@@###################################################################################@@@@@((((((((((((((((((((((((((((((((((((((((CCCCCCCC(((((((((((@
@.........CCCCCCCCC...........................@@####################################################################################@@@@(((((((((((((((((((((((((((((((((((((((((((((CCCCCCCC(((((((((((@
@...........................................@@#################################################################################@@@@@((((((((((((((((((((((((((((((((((((((((((((((((((((((DDDDD(((((((((@
@.......................................@@@@################################################################################@@@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((DDDDD(((((((((@
@.....................................@@###############################################################################@@@@@((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@....................................@############################################################################@@@@@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.......................DDDD........@###############################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ /((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.......................DDDD.......@##############################@@********************************************* /(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@................................ @################@@@@@@@@@@@@@@@@****************************************************(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@............................... @#####@@@@@@@@@@@@....................**************************************************(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.............................. .@@@@@@................................***************************************************DDDDD((((. .((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.......................... ( ........................DDDDD........ ..****************************************************DDDDD****((( (((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@....................... . ((( . .....................DDDDD..........*****************************************************************((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@................... ((((((. ..................................... .****************************************************************((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@.......... ((((((((((((((( ....................................* ......**********************************************************.(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((((((((((((. . ................................../..***********************************************************((./((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((((((((((((( . ....................................************************ ......... **************************(/(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((DDDDD((((((( . ................................./ .********************* ................ *********************((( (((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((DDDDD((((((((. ....................................******************. ................... ***********************((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((((((((((((((((*. ...................................******************* .....................********************(..((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((((((((((((((((( ................................. .***************** ......................**********************(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@((((((((((((((((((((((((((((((((((((*. ................................ .*****************. .................... **********************((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@((((((((((((((((((((((((((((((((((((. ....................................****************** ................. ***********************( (((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@((((((((((((((((((((((((((((((((((((. ................................. /.********************* ........... .*************************(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@(((((((((((((((((((((((((((DDD((((((/ .................................. ..***************************...****************************..... ./((((((((((((((((((((((((((((((((((((((((((((((((((((((((((@
@/(((((((((((((((/(((((((((((((((((((/. .................................. .*********************************************************......................... .*(((((((((((((((((((((((((((((((((((((((@
@###############.(((((((((((((((((((( .........DD...................... .. ....*****************************************************.................................... *(/(((((((((((((((((((((((((((.@
@################(((((((((((((((((((( . ....................... .............. .****************************************************........................................ ########%%*. ./(((((((((((.@
@################### *((((((((((((((. .......... .......................... ....****************************************************....................................*.#DDDD########################.@
@####################/.((((((((((((( ....................................DDD....*****************************************************..................................... ############################*@
@#####################(.((((((((((((( .............................................*************************************************..................................... #############################*@
@#######################/(((((((((((((.. .................................................**************************************((((.................................. ################################*@
@###,,,,,,,,,,,#########((((((((((((( . .......................................................*******************#############( ((((. ............................ %##################################*@
@###,,,,,,,,,,,###########(((((((((((((( .........................................................######################*##### (((((((( ....................... .######################################*@
@## ,,,,,,,,,,,###########((((((((((((((( ................................CCCC.................... DDDDDD#######################DDDD## (((((((((((* .................. %###############################*@
@#########################(((((((((((((((/ ...............................CCCC.....................DDDDDD############################### ((((((DD((((((( ............. %###############################*@
@########################((((((((((((((((((. ...................................................... *#################################### (((((((((((((((((( ........ #################################*@
@#######################.(((((((((((((((((((( ..................................................... *####################################% ((((((((((((((((((((((. .###################################*@
@######################(((((((((((((((((((((((((((....................................... *#####################################*.((((((((((((((((((((((((((( %##########%.########CCCCCCCCCC##########*@
@####################((((((((((((((((((((((((((((((((((((((((((((( . .............................. (###################################### (((((((((((((((((((((DD(((((( #########CCCCCCCCCC##########*@
@##############(%(((((((((((((((((((((((((((((((((((((((((((((((((((.* ............................. ######################################.*((((((((((((((((((((((((((((( %#######CCCCCCCCCC##########*@
@#########((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( ............................ %##############CCCCCCCC##(#############% ((((((((((((((((((((((((((((((..%##########################*@
@*(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( ............................ %#############CCCCCCCC################## (((((((((((((((((((((((((((((((( .########################*@
@((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( ............................. #############CCCCCCCC################### /(((((((((((((((((((((((((((((((((/ #####################*@
@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( ............................. ########################################.*((((((((((((((((((((((((((((((((((((/ (##################*@
@((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((( / .............................. ########################################( (((((((((((((((((((((((((((((((((((((((( (#############*@
@((((((((((((((((((((DDD((((((((((((((((((((((((((((((((((((((((((./. ............................... ########################################% ((((((((((((((((((((((((((((((((((((((((((. ###########*@
@((((((((((((((((((((((((((((((CC((((((((((((DDDD(((((((((((((((( . ..........DDD..........DDD....... ######################################### ((((((((((((((((((((((((((((((((((((((((((((( .########*@
@(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((% .................................. %######################################## (((DDD(((((((((((((((((((((((((((((((DD((((((((( .######*@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`
let pMap = ``;
// let mapSplice = map.split(`/n`);
// let mapBroken = mapSplice.map(mapSplice => mapSplice + '<br>');
// map = mapBroken.join(``);
let allDungeonInfo = [
    { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }, { numberOfRooms: 5, currentRoom: 0, completed: false, bossIndx: 5 }]
//mudman is first dungeon boss
let enemies = [`goblin`, `immortal worm`, `bandit`, `imp`, `walking fish`, `mud man`, `stone golem`, `cyclopes`, `Thysiusdagurontescipiusdebduteustharidonxocemonthemonbatrius(Tyler for short)`];
let eHpAll = [70, 10000, 100, 85, 30, 120, 120, 130, 546];
let eDmgAll = [5, 1, 13, 11, 15, 17, 19, 20, 25];
let eLvlAll = [1, 500, 7, 5, 6, 10, 12, 10, 24];
let eDefAll = [10, 99.99999999, 10, 10, 3, 0, 10, 5, 50];
let keyItems = [];
let buffItemList = [
    { name: `Enchanted Golden Apple`, hp: 10000, def: 10000, dmg: 100, magic: 19 }, { name: `Potion of Minor Healing`, hp: 40, def: 0, dmg: 0, magic: 0 }, { name: `Pot of Healing`, hp: 70, def: 0, dmg: 0, magic: 0 }, { name: `Cauldron of Major Healing`, hp: 100, def: 0, dmg: 0, magic: 0 }, { name: `Coffee`, hp: 25, def: 0, dmg: 0.25, magic: 0.5 }, { name: `Hornet Honey`, hp: 30, def: 5 / 8, dmg: 0, magic: 0.5 }]
let offenseItemList = [{ name: `Magic Metal Stick`, hp: 50, def: 20, dmg: 0 }, { name: `Fish`, hp: 9999999, def: 99, dmg: 0 }, { name: `Fire Whip`, hp: 69, def: 0.69, dmg: 0 }, { name: `Twig`, hp: 1, def: 1, dmg: 1 }, { name: `Perfectly shaped stick`, hp: 0, def: 0, dmg: 0 }]
let allCityInfo = [{ type: `dungeon`, items: [0, 6, 5], cityDungeon: `matx`, localDialogue: `"Well, whatt'ya want then?!"`, cityDesc: `Murky water layers itself underneath the plywood boards that the buildings rest upon. You question how structurally sound this place is.`, dungeonComplete: false }, { type: `normal`, items: [5, 8, 9], cityDungeon: `none`, localDialogue: `You came a long way, didn't you`, cityDesc: `This place, it's unreal. The golden glimmer of the vast fields in the distance remind you of sunshine mixed with your favorite childhood memories. The surrounding buildings are detailed by historical glyphs.` }, { type: `normal`, items: [6, 3, 8], cityDungeon: `none`, localDialogue: `"Welcome to our humble town."`, cityDesc: `The city is upkept by its minimalistic features, ran by simple people.` }, { type: `dungeon`, items: [1, 5, 9], cityDungeon: `paulx`, localDialogue: `"Well, hello there"`, cityDesc: `The main square is bustling with life, trade, and business. A pleasant aroma flows through the streets.`, dungeonComplete: false }, { type: `dungeon`, items: [10, 7, 4], cityDungeon: `hanx`, localDialogue: `"I sell fairy dust on the weekends by the pouch."`, cityDesc: `The urban style of the city is unmatched. Or, would be if the King gave further funding here.`, dungeonComplete: false }, { type: `normal`, items: [5, 2, 8], cityDungeon: `none`, localDialogue: `"Lol XD lmao" X3`, cityDesc: `You are in a silly place.` }];
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
    let itemType = Math.random();
    if (itemNum === -1) {
        if (itemType < 0.5) {
            let itemNum = getRandomInt(0, buffItemList.length);
            pItems.push(new buffItem(buffItemList[itemNum].name, buffItemList[itemNum].hp, buffItemList[itemNum].def, buffItemList[itemNum].dmg, buffItemList[itemNum].magic));
        }
        else {
            let itemNum = getRandomInt(0, offenseItemList.length);
            pItems.push(new debuffItem(offenseItemList[itemNum].name, offenseItemList[itemNum].hp, offenseItemList[itemNum].def, offenseItemList[itemNum].dmg, offenseItemList[itemNum].targets));
        }
    }
    else {
        if (itemNum < buffItemList.length) {
            pItems.push(new buffItem(buffItemList[itemNum].name, buffItemList[itemNum].hp, buffItemList[itemNum].def, buffItemList[itemNum].dmg, buffItemList[itemNum].magic));
        }
        else {
            itemNum -= buffItemList.length;
            pItems.push(new debuffItem(offenseItemList[itemNum].name, offenseItemList[itemNum].hp, offenseItemList[itemNum].def, offenseItemList[itemNum].dmg, offenseItemList[itemNum].targets));
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

function skipTutorial() {
    allMain += `<br><br><section>Would you like to skip the tutorial?`
    if (char = `han`) {
        allMain += `<button onclick='han63()'>Yes</button>`
    }
    else if (char = `paul`) {
        allMain += `<button onclick='displayPlayerPos()'>Yes</button>`
    }
    else if (char = `mat`) {
        allMain += `<button onclick='displayPlayerPos()'>Yes</button>`
    }
    allMain += ` <button onclick='${saveState}()'>No</button></section>`
    end();
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

function paul0() {
    allMain = `<br><br><br><br><section>You take the vessel of Paul, the one-of-a-kind apprentice of the Great Knight Frusciante. He was appointed after proving tremendous bravery against the destruction wrought by the dragon's ancient flames. His skills in combat have the potential to be unmatched, given the right spark.<br><br><button onclick="paul1()">[--&gt;]</button></section>`;
    end();
}
function paul0() {
    allMain = `<br><br><br><br><section>South Polend is the heart of the entire Kingdom. As such, history's largest events happened here. The First King banished a great evil and built his empire over the buried carcass of the monstrosity. This however, did not last.<br><br><button onclick="paul1()">[--&gt;]</button></section>`;
    end();
}
function paul1() {
    allMain = `<br><br><br><br><section>Evil never dies, it hibernates until the perfect time to strike. And when it strikes, it kills.<br><br><button onclick="paul2()">[--&gt;]</button></section>`;
    end();
}
function paul2() {
    allMain = `<br><br><br><br><section>It's mid day, the sun shines proudly over our gracious kingdom. The smell of baked bread and the current of an artificial water stream fill the main court. You are on your way to the barracks to visit Great Knight Frusciante's chambers. <br><br><button onclick="paul3()">[--&gt;]</button></section>`;
    end();
}
function paul3() {
    allMain = `<br><br><br><br><section>You traverse the mighty hallways of the regally crafted chambers and enter the meeting room for the knight's enclave. You see Frusciante playing a mandolin his recreational wears. He is off duty and is swooning a crowd of fair maidens.<br><br><button onclick="paul4()">[--&gt;]</button> <button>[Make your prescence known.]</button></section>`;
    end();
}
function paul4() {
    allMain = `<br><br><br><br><section>You bump into a nearby table. This acheives three things. 1. You stub your toe and it hurts. 2. You break the table's leg and tosses all of the valuable items onto the floor. Orbs shattering, vials breaking, and experimental items falling. 3. The maidens have a new reputation for you. <br><br><button onclick="paul5()">[Wince in embarrassment.]</button></section>`;
    end();
}
function paul5() {
    allMain = `<br><br><br><br><section>Whateverz<br><br><button onclick="paul?()">[--&gt;]</button></section>`;
    end();
}
function paul0() {
    allMain = `<br><br><br><br><section>Whateverz<br><br><button onclick="paul?()">[--&gt;]</button></section>`;
    end();
}
function paul0() {
    allMain = `<br><br><br><br><section>Whateverz<br><br><button onclick="paul?()">[--&gt;]</button></section>`;
    end();
}
function paul0() {
    allMain = `<br><br><br><br><section>Whateverz<br><br><button onclick="paul?()">[--&gt;]</button></section>`;
    end();
}
function paul0() {
    allMain = `<br><br><br><br><section>Whateverz<br><br><button onclick="paul?()">[--&gt;]</button></section>`;
    end();
}
function paul0() {
    allMain = `<br><br><br><br><section>Whateverz<br><br><button onclick="paul?()">[--&gt;]</button></section>`;
    end();
}
//Nothing has been the same since the dragon showed up. Er yeah, that's right. A friggin' dragon. Hi, I'm Paul. And this is my game.


function hannahSelect() {
    char = `han`
    playerY = 42;
    playerX = 183
    pMagicDmg = 1.5;
    pSpellType = `all`;
    pSpells = [`Fireball`, `Healing Spring`, `Stone Bullet`];
    // allMain = `<br><br><br><br><section id="hannahDesc" class="visible">The noble yet troublesome apprentice of the Grand Wizard Master Kobain. She has an immense desire to obtain the powers of the world's elements, however she has a long and dangerous road if she wants to achieve this magnitude of power. Her conscience and belief in the Grand Wizard repels her from the most desperate bargains of terrible evils.  <br><br> <button id="hannahSelect">Select this character</button> <button>Paul the Knight</button> <button>Mathew the Tamer</button></section> `
    allMain = `<br><br><br><br><section class="visible">You take the vessel of Hannah, the noble yet troublesome apprentice of the Grand Wizard Master Kobain. She has an immense desire to obtain the powers of the world's elements, however she has a long and dangerous road if she wants to achieve this magnitude of power. Her conscience and belief in the Grand Wizard repels her from the most desperate bargains of terrible evils.  <br><br></section>`;
    allMain += `<section>Violence was never a rarity in the Eastern Slums, but matters have only further deteriorated from the threat of the Dragon's wrath in this past month.  You remember that night with defining clarity.<br><br>  <button onclick="han0()">[--&gt;]</button></section>`;
    end();
}

function han0() {
    allMain = `<br><br><br><br><section>Night was overtaken by the fury from the monsters beneath the land. Great cracks manifested their way from the ground with unknown creatures seeping out of them. Disturbed from their long slumber, the inherent violence of the tangible beings ran rampant throughout the streets of the town. <br><br><button onclick="han1()">[--&gt;]</button></section>`;
    end();
}
function han1() {
    allMain = `<br><br><br><br><section>You are in the dusty unpaved town square. Before you is a dimly lit alley.<br><br><button onclick="han2()">[Go in the alley.]</button></section>`;
    end();
}
function han2() {
    allMain = `<br><br><br><br><section>Large wax candles hang from rusted metal poles that do a terrible job at illuminating the pathway. In the distance of the dark, flickering orange expanse emerges a gruffled shape.<br><br><button onclick="combatSetup(1,0)">[Fight Engage.]</button></section>`
    saveState = `han3`
    end();
}
function han3() {
    allMain = `<br><br><br><br><section>Footsteps appear right behind you as there were no one there previously. "That was a fine victory young lass, now just who are you?"<br><br><button onclick="han4()">--&gt;</button></section>`
    end();
}
function han4() {
    allMain = `<br><br><br><br><section>It is the famous Grand Wizard Kobain, the legendary sorcerer and last defender of the Eastern Slums!<br><br><button onclick="han5()">Share praise enthusiastically</button></section>`
    end();
}
function han5() {
    allMain = `<br><br><br><br><section>You enthusiatically share your praises, maybe too much. The keen interest Kobain has in your abilities lead him to enlist you as his apprentice, you are eager to learn from him<br><br><button onclick="han6()">--&gt;</button></section>`
    end();
}
function han6() {
    allMain = `<br><br><br><br><section> Since that night, life was never the same again. You absolutely hated it.<br><br><button onclick="han7()">:/</button></section>`
    end();
}
function han7() {
    allMain = `<br><br><br><br><section> Learning new magic skills has been completely nonexistent and the mediocrity of the tower's tight walls have only generated complete and utter boredom.<br><br><button onclick="han8()">--&gt;</button></section>`
    end();
}
function han8() {
    allMain = `<br><br><br><br><section> You have completed notes on the latest scroll shipment from South Polend and took no happiness in scribing out each situation. Even amateurs could transcribe these “magical” occurrences and crimes throughout the kingdom.<br><br><button onclick='han9()'>--&gt;</button></section>`
    end();
}
function han9() {
    allMain = `<br><br><br><br><section> You notice a pattern in the recent scrolls, all in relation to ancient relics described by old fairy tales. Polend has been dramatically more fanatic since dragons have been proven to be real and creatures of bygone eras rising from extinction. <br><br><button onclick="han10()">--&gt;</button></section>`
    end();
}
function han10() {
    allMain = `<br><br><br><br><section> Regardless of your trust in Kobain's decision in putting you here, you could no longer sit here and scrawl footnotes on meaningless reports. You are in your living quarters.<br><br><button onclick="han11()">[Inspect desk.]</button> <button onclick="han13()">[Go Downstairs.]</button> <button onclick="han12()">[Inspect the bookshelf.]</button></section>`
    end();
}
function han11() {
    allMain = `<br><br><br><br><section>Your desk is a sleek, wooden table, unorganized with messy parchments and a feather quill carelessly placed off to the side. A dribble of ink slowly moves its way to the edge of the desk. In other words, nothing important. <br><br><button onclick="han13()">[Go Downstairs.]</button> <button onclick="han12()">[Inspect the bookshelf.]</button></section>`
    end();
}
function han12() {
    allMain = `<br><br><br><br><section>A shelf containing many books of the histories, legends, and culture of  the world. You pertain no interest in any of these topics.<br><br><button onclick="han11()">[Inspect desk.]</button> <button onclick="han13()">[Go downstairs.]</button></section>`
    end();
}
function han13() {
    allMain = `<br><br><br><br><section> You descend down the aged wooden steps cylindrically built to wrap around the area of the tower. As you walk, a faintly growing scent of pipe-smoke and the crackle of an active fireplace becomes clearer as you enter the main quarters.<br><br><button onclick="han14()">--&gt;</button></section>`
    end();
}
function han14() {
    allMain = `<br><br><br><br><section>Grand Wizard Kobain sits leisurely in his study with an indistinctly amorphous orb generating a cascade of colors, humanoid shapes can be seen within it's shapeless center. Hugging the corner of the wall between the stairway and the main quarters sits a lone display table, pristinely detailed as it is delicate. The table is used by an expensive vial collection of moaning toad souls, each one dreadfully muted by the confines of their vial.<br><br><button onclick="han15()">[Make your presence known.]</button> <button onclick="han17()">[Ask Kobain to finally teach a new spell.]</button></section>  `
    end();
}
function han15() {
    allMain = `<br><br><br><br><section> As you exit the stairway, you trip and stumble into the foot of the pristine table. The legs bend and snap as they collapse, generating a castrophany of an auditorily vivid smash of split wood, broken glass, staining ectoplasm, and moaning toad souls rampantly flying around. Kobain takes notice without looking back.<br><br><button onclick="han16()">--&gt;</button></section>`
    end();
}
function han16() {
    allMain = `<br><br><br><br><section>“Good morning Hannah, I see you have a keen interest in learning new and fantastic ways to destroy the furniture here.”<br><br><button onclick="han17()">[Ask Kobain to finally teach a spell.]</button></section>`
    end();
}
function han17() {
    allMain = `<br><br><br><br><section> As you exit the hallway, you approach Kobain with a proposition to end your boredom. The orb's shape fades as you close in to get a better look at the shapes.<br><br><button onclick="han18()">--&gt;</button></section>`
    end();
}
function han18() {
    allMain = `<br><br><br><br><section> “Hm, it seems this orb is particularly shy to reveal its contents. Ah, hello Hannah. Have you finished today's scroll shipment?” The curiously inquisitive wizard turns his attention towards you. <br><br><button onclick="han19()">--&gt;</button></section>`
    end();
}
function han19() {
    allMain = `<br><br><br><br><section> Full of enthusiasm, you tell Kobain about a distinct oddity from the scroll shipments of the past week. Constant robberies and crimes linking to a connected ulterior motive. Many have heard the legend of the Dragon's relics, so there is no need to repeat such redundant stories.<br><br><button onclick="han20()">--&gt;</button></section>`
    end();
}
function han20() {
    allMain = `<br><br><br><br><section>The legend has motivated citizens and monsters alike to search for these safeguarded relics. You tell Kobain that if you could retrieve these relics before any other adventurers then the King would favor Kobain's endeavors of helping the Eastern Slums become safer and more habitable.<br><br><button onclick="han21()">--&gt;</button></section>`
    end();
}
function han21() {
    allMain = `<br><br><br><br><section>“Thank you for bringing this to my attention. But Hannah, you are no near strong enough to take on a quest like this. It is a treacherous journey and it isn't worth the risk of losing a generation of magical knowledge. As you may know, it is a complete rarity for anyone to be capable of using magic let alone dedicating time to the upkeep of our knowledge”<br><br><button onclick="han22()">[I totally didn't know any of that.]</button></section>`
    end();
}
function han22() {
    allMain = `<br><br><br><br><section>“You are a dying breed, we simply cannot risk the importance of your life for rumors.”<br><br><button onclick="han23()">--&gt;</button></section>`
    end();
}
//hanx() is skilltree 
function han23() {
    allMain = `<br><br><br><br><section> You return to your living quarters hours later with a book binding under your arm. <br><br><button onclick="lvlUp()">[Read its contents.]</button></section>`
    saveState = `han25`;
    end();
}
function han24() {
    allMain = `<br><br><br><br><section>You forgot you really, really hate reading, so you toss it into your sack of wielding as a way to procrastinate.<br><br><button onclick="han25()">--&gt;</button></section>`
    end();
}
function han25() {
    allMain = `<br><br><br><br><section>A new scroll is delivered to your window by a dove-hawk, this message directly from the king.<br><br><button onclick="han26()">Open the scroll</button></section>`
    end();
}
function han26() {
    allMain = `<br><br><br><br><section>The scroll reads: <br> Hannah N. Chicago, I send you this letter in desperation and severity. You are the only known capable magic-user in the Country and I require your services. If you could, please meet my messenger in front of the Eastern Dungeon Memorial the moment you receive this message.
    Best regards, 
    King Geedorah
    <br><br><button onclick="han27()">[Tell Kobain about the letter.]</button></section>`
    end();
}
function han27() {
    allMain = `<br><br><br><br><section>Scroll in hand, you run downstairs to tell Kobain the news, but he is nowhere to be found. The front door of the tower is ajar, wind blowing the hinges back and forth. A non distinct trail of beard dander trails into the distance.<br><br><button onclick="han28()">[Follow the trail of wizard dust.]</button></section>`
    end();
}
function han28() {
    allMain = `<br><br><br><br><section>You take the path that the (dust) trail left behind. Beyond a tiled path leads to the exit gate surrounding the tower's perimeter. A short stairwell going up, the steps in the shape of smooth, hollowed stone from the center of large boulders. 
    <br><br><button onclick="han29()">[--&gt;]</button></section>`
    end();
}
function han29() {
    allMain = `<br><br><br><br><section>Reaching the summit of the short stairwell, you see the dander-trail go straight before abruptly shifting its path into a nearby alley.<br><br><button onclick="han30()">[--&gt;]</button></section>`
    end();
}
function han30() {
    allMain = `<br><br><br><br><section>This alley is subtly different from the rest of the city, the changes lie in the fact that the cheaply cobbled gravel road smoothes out into some other form of stones, these stones lead into two separate hallways.<br><br><button onclick="han31()">[--&gt;]</button></section>`
    end();
}
function han31() {
    allMain = `<br><br><br><br><section>On the right, the hall is seemingly mundane apart from its natural stillness. The right hall seems to be naturally tranquil, even beckoning you to step through its' entryway<br><br><button onclick="han32()">[--&gt;]</button></section>`
    end();
}
function han32() {
    allMain = `<br><br><br><br><section>Strangulated in its design, the architecture of this hall is oddly disturbing. The further you look down, the darker and more abyss-like it becomes. Akin to an illusion, it feels impossible for a simple hallway to look so morbidly bizarre. You feel compelled to abandon the following of the trail.<br><br><button onclick="han33()">[Keep following.]</button><button onclick="han1B()">[Abandon the trail.]</button></section>`
    end();
}
function han1B() {
    allMain = `<br><br><br><br><section>You walk into the pleasantly mundane hallway, giving in to the less stressful alternative. Out of seemingly nowhere, the light of the hallway fades to the deepest black, rendering all surroundings to disappear completely. You feel the walls tighten against you as they constrict claustrophobically, and then you die. <br><br><button onclick="han32()">[Let's Try Again...]</button></section>`
    end();
}
function han33() {
    allMain = `<br><br><br><br><section>You stray from the suspiciously placed dust trail, instead walking through the stress inducing hall to the left. The entryway whispers an unintelligible {sound} as you make your first steps beyond it.<br><br><button onclick="han34()">[--&gt;]</button></section>`
    end();
}
function han34() {
    allMain = `<br><br><br><br><section>Light leaves your surroundings gradually, with each echoing step as you cross it. Light. Dim. Dark. Black. <br><br><button onclick="han35()">[--&gt;]</button></section>`
    end();
}
function han35() {
    allMain = `<br><br><br><br><section>You try to hug the walls of the walkway, nothing is within your grasp, as if there were no walls in the first place.<br><br><button onclick="han36()">[Blink in the darkness.]</button><button onclick="han36()">[Cry because you are screwed.]</button></section>`
    end();
}
function han36() {
    allMain = `<br><br><br><br><section>You blink in the blinding void. As soon as you do, the illusion ends and you are on the other side of the hallway, now looking as mundane as the other. The dander trail picks up and leads to the Eastern Dungeon Memorial.<br><br><button onclick="han37()">[Follow trail inside.]</button></section>`
    end();
}
function han37() {
    allMain = `<br><br><br><br><section>You try to open the entrance door for the Eastern Dungeon Memorial, to no avail. The door is locked.<br><br><button onclick="han38()">[Find a way inside.]</button></section>`
    end();
}
function han38() {
    allMain = `<br><br><br><br><section>You pace along the memorial's perimeter, finding an opening to the roof shaping into a ramp-esque ledge.<br><br><button onclick="han39()">[--&gt;]</button></section>`
    end();
}
function han39() {
    allMain = `<br><br><br><br><section>A ladder leans on another building adjacent to the Memorial. In order to grab it, you have to push it off from the other building's roof. An unlocked gate is between you and the other building.<br><br><button onclick="han40()">[Open the gate, enter the building.]</button></section>`
    end();
}
function han40() {
    allMain = `<br><br><br><br><section>You enter the building, it appears to be an abandoned smithy. Graffiti is painted along the walls of the forgotten forge, old rusted metal and unfinished armors lay sprawled around the chambers.<br><br><button onclick="han41()">[--&gt;]</button></section>`
    end();
}
function han41() {
    allMain = `<br><br><br><br><section>The furnace, now unused and neglected, proven by the visible layer of dust blanketing it. On a nearby countertop, the shape of a large hammer imprints itself against the dust layer. <br><br><button onclick="han43()">[Locate the rooftop stairway.]</button>
    </section>`
    end();
}
function han43() {
    allMain += `<br><br><br><br><section>You explore the structure of the forge, looking for a pathway to reach the rooftop. You hear a crackle in the far left corner of the forge, a thimble of burning light flickers in the distance.<br><br><button onclick="han44()">[Fight Engage.]</button></section>`
    end();
}
function han44() {
    allMain = `<br><br><br><br><section>Behind the smithing enthusiast is a stairway leading to the rooftop.<br><br><button onclick="han45()">[--&gt;]</button></section>`
    end();
}
function han45() {
    allMain = `<br><br><br><br><section>You exit the forge and spot the ladder, pushing it off the wall and dropping it against the opening in the memorial's roof opening.<br><br><button onclick="han46()">[Enter the Eastern Dungeon Memorial.]</button> </section>`
    end();
}
function han46() {
    allMain = `<br><br><br><br><section>You go inside the Memorial building from the rooftop door, you appear to be inside the attic.<br><br><button onclick="han47()">[Leave the attic.]</button> <button onclick="han47B()">[Look around.]</button></section>`
    end();
}
function han46B() {
    allMain = `<br><br><br><br><section>Stale dust and old parchments litter around the shelves and tables. The scent is a cross of an eons-old library and a mausoleum, you sneeze in response.<br><br><button onclick="han39()">[Cool.]</button></section>`
    end();
}
function han47() {
    allMain = `<br><br><br><br><section>The interior of the Memorial building is anciently beautiful. You begin on the second floor, looking down from the protective railing. The hall along the way showcases various arrangements of armor suits through the eras of Polend's history.<br><br><button onclick="han48()">[--&gt;]</button></section>`
    end();
}
function han48() {
    allMain = `<br><br><br><br><section>The display begins with a highly advanced armor designed for mobility dubbed the &quot;Blitzkreig&quot; proudly poses at the end of the arrangement, with the opposite end showing a modestly proportioned plate armor, primitive in nature yet still striking awe and dominance. It was dubbed, &quot;The Cypress&quot;<br><br><button onclick="han49()">[Go down the stairs.]</button></section>`
    end();
}
function han49() {
    allMain = `<br><br><br><br><section>Descending the elegant stairway leads into the atrium, the expansive room is filled by the light coming down from the glass ceiling. You hear a murmur of speech in one of the nearby rooms.<br><br><button onclick="han50()">[--&gt;]</button> <button onclick="han50B()">[Look around.]</button></section>`
    end();
}
function han50B() {
    allMain = `<br><br><br><br><section>You see a large linen material covering a doorway, you feel that it's best to give it it's privacy.<br><br><button onclick="han50()">[--&gt;]</button> <button onclick="han50B2()">[Er, no.]</button></section>`
    end();
}
function han50B2() {
    allMain = `<br><br><br><br><section>You uncover the linen. Behind it is a humanoid figure, wrapped up in a tied, woven sack. They seem to be unconcious.<br><br><button class="red" onclick="han50()">[You really shouldn't have done that, a fella like this needs his privacy.]</button></section>`
    end();
}
function han50() {
    allMain = `<br><br><br><br><section>You enter what looks like an exhibit room, dedicated to a myth about an ancient ice-deity of some kind. You don't really care about that, ice is a particularly stupid thing to think about. Hannah finds a jolly Grand Wizard Cobain speaking to a friendly stranger.<br><br><button onclick="han51()">[--&gt;]</button></section>`
    end();
}
function han51() {
    allMain = `<br><br><br><br><section>“Ah, Hannah, good to finally see you. I was hoping you would show up here eventually!”<br><br><button onclick="han52()">[Grand Wizard! Where have you been?]</button></section>`
    end();
}
function han52() {
    allMain = `<br><br><br><br><section>“There has been a, complication since we last spoke. I had to leave very urgently due to.. Well, you're here now, and I require your assistance!”<br><br><button onclick="han53B()">[Who's the mummy?]</button> <button onclick="han53()">[ok &colon; &rpar;]</button></section>`
    end();
}
function han53B() {
    allMain = `<br><br><br><br><section>You size up the oddly cloth-covered man. All facial details are omitted by the wrap around his head, he wears a traveler's apparel save for the oddly patterned fabric hanging from around his neck and worn messenger's bag around his right shoulder. <br><br><button onclick="han53B2()">[--&gt;]</button></section>`
    end();
}
function han53B2() {
    allMain = `<br><br><br><br><section>“This is the messenger of course, he comes directly from King Geedorah!” The messenger stares blankly at a fireplace on the opposite wall of the room. “Hm.”<br><br><button onclick="han53()">[I can help you now.]</button></section>`
    end();
}
function han53() {
    allMain = `<br><br><br><br><section>“Fantastic! Over here, over here.”<br><br><button onclick="han54()">[--&gt;]</button></section>`
    end();
}
function han54() {
    allMain = `<br><br><br><br><section>Grand Wizard Cobain leads you to a humble corridor near the exhibit room. The messenger follows behind.<br><br><button onclick="han55()">[--&gt;]</button> </section>`
    end();
}
function han55() {
    allMain = `<br><br><br><br><section>Cobain stops at a thin creased line between the smooth marble wall, then makes an unintelligible chant.<br><br><button onclick="han56()">[--&gt;]</button></section>`
    end();
}
function han56() {
    allMain = `<br><br><br><br><section>The creased line slides open with a rough skidding sound, revealing a torch lit stairway.<br><br><button onclick="han57()">[--&gt;]</button></section>`
    end();
}
function han57() {
    allMain = `<br><br><br><br><section>“This is the real memorial, Hannah. Within it, lies an ancient relic unbeknownst to most inhabitants of Polend. There are things that wish to obtain it before we, which is why we must retrieve it first. Do you understand?”<br><br><button onclick="han58()">[Of course.]</button> <button onclick="han58B()">[Er, no.]</button></section>`
    end();
}
function han58B() {
    allMain = `<br><br><br><br><section>“Huh? What?”<br><br><button onclick="han58B()">[Huh. What?]</button> <button onclick="han58()">[I understand.]</button></section>`
    end();
}
function han58() {
    allMain = `<br><br><br><br><section>“Fantastic! The messenger will guide you to the first chamber, he knows it better than I”<br><br><button onclick="han59()">[--&gt;]</button></section>`
    end();
}
function han59() {
    allMain = `<br><br><br><br><section>You descend the stairway with the messenger, Cobain stays up at the entrance.<br><br><button onclick="han60()">[--&gt;]</button></section>`
    end();
}
function han60() {
    allMain = `<br><br><br><br><section>The walk is long and silent, the messenger has the resemblance of a lone wanderer, content with the serenity of silence. You find the silence deafening.<br><br><button onclick="han61()">[Why were you here with Kobain?]</button></section>`
    end();
}
function han61() {
    allMain = `<br><br><br><br><section>“Hm… Kobain. He is up there.”<br><br><button onclick="han62()">[He <em>is</em> up there.]</button></section>`
    end();
}
function han62() {
    allMain = `<br><br><br><br><section>You arrive at the entrance for the original Eastern Dungeon. “There are things here you are not expecting, Hannah. Things you are subconsciously aware of.”<br><br><button onclick="han63B()">[What does that mean?]</button> <button onclick="han63()">Enter the <strong>Dungeon</strong>.</button></section>`
    end();
}
function han63B() {
    allMain = `<br><br><br><br><section>“...”<br><br><button onclick="han63BB()">[--&gt;]</button> <button onclick="han63()">Enter the <strong>Dungeon</strong>.</button></section>`
    end();
}
function han63BB() {
    allMain = `<br><br><br><br><section>*---*<br><br><button onclick="han63BB()">[--&gt;]</button> <button onclick="han63()">Enter the <strong>Dungeon</strong>.</button></section>`
    end();
}
function han63() {
    allMain = `<br><br><br><br><section>You find yourself inside a cubelike room. Simple in nature, with clear details.<br><br><button onclick="han64()">[--&gt;]</button></section>`
    end();
}
function han64() {
    allMain = `<br><br><br><br><section>The walls are made of aged mausoleum stone, in a state of cracks and crumbles along its once perfect smoothness. Vines grow out through the larger cracks, slumping their large extremities on the corner of the floor. Across from you is a stone wall of a door, a plaque carved next to it. <br><br><button onclick="han65B()">[Inspect vines.]</button> <button onclick="han65()">[Inspect the stone door.]</button></section>`
    end();
}
function han65B() {
    allMain = `<br><br><br><br><section>The ends of the vines all collect into this corner, they seem to be blocking something.<br><br><button onclick="han65()">[Inspect stone door.]</button></section>`
    end();
}
function han65C() {
    allMain += `<br><br><br><br><section>Nature still perserveres despite the living conditions, a true testament to life.<br><br><button onclick="han65B()">[Inspect vines.]</button> <button onclick="han67()">[Deeply inspect the walls.]</button></section>`
    end();
}
function han65() {
    allMain = `<br><br><br><br><section>The plaque says, “A stone unturned is a chance forgotten.”<br><br><button onclick="han67()">[Deeply inspect the walls.]</button> <button onclick="han65B()">[Inspect vines.]</button></section>`
    end();
}
function han67() {
    allMain = `<br><br><br><br><section>Upon deeper inspection, there is an unfastened stone sticking out from the wall's crevice. Pushing it in causes a deep click to resonate through the room, making the stone door slowly rise, opening the hallway. The hallway branches into two paths.<br><br> <button onclick="han68B()">[Left.]</button> <button onclick="han68C()">[Right.]</button></section>`
    end();
}
// 
// 
function han68B() {
    allMain = `<br><br><br><br><section>Amidst a patch of long dead shrubbery, lies a perfectly shaped stick.<br><br><button onclick="han69B()">[Inspect the stick.]</button></section>`
    end();
}
function han69B() {
    allMain = `<br><br><br><br><section>To call this a stick would be an understatement. In it's immaculate beauty and natural shape, it looks more like a well crafted staff, designed in the Heavens and sent down to be picked up by a true hero. Ah yes, this is obviously the greatest stick to ever be discovered. This right here is what you need to be the coolest warlock in Polend<br><br><button onclick="han70B()">[The stick is in your inventory.]</button> <button onclick="han74B()">[--&gt;]</button></section>`
    end();
}
function han68C() {
    allMain = `<br><br><br><br><section>You walk through the stone esophageal hall. Within the dimly lit section leads into a thin waterfall, the water ran orange from mixing with rust and sediment. It emanates a vile stench that completely repulses you.<br><br><button onclick="han69C()">[Drink the water.]</button> <button onclick="han70C">[Continue on.]</button></section>`
    end();
}
function han69C() {
    allMain = `<br><br><br><br><section>No, you do not want that.<br><br><button onclick="han69CC()">[Try to drink more water.]</button></section>`
    end();
}
function han69CC() {
    allMain = `<br><br><br><br><section>NO! You really, really do not want that!<br><br><button onclick="han70C()">[Continue on.]</button></section>`
    end();
}
function han70C() {
    allMain = `<br><br><br><br><section>You take a hearty swig out of the gross goopy pool of water. Refreshed and revitalized, you descend deeper through the cavernous chambers.<br><br><button onclick="han71C()">[--&gt;]</button></section>`
    end();
}
function han71C() {
    allMain = `<br><br><br><br><section>The chamber reaches a dead end, in a corner of the sculpted wall is an old magic metal stick. Concentrated magic that fires for one shot.<br><br><button onclick="han72C()">[Put it into your inventory.]</button></section>`
    end();
}
function han72C() {
    allMain = `<br><br><br><br><section>You recieved the magic metal stick.<br><br><button onclick="han73C()">[--&gt;]</button></section>`
    end();
}
function han73C() {
    allMain = `<br><br><br><br><section>You backtrack and find original hallway branches.<br><br><button onclick="han74()">[Magically find your way through the dungeon via funny music montage.]</button></section>`
    end();
}
function han74() {
    allMain = `<br><br><br><br><section>The funny music montage sends you through the harrowing venture through the dungeon's trials and you are now staring down the precipice of a cool, slanted hallway.<br><br><button onclick="han75()">[Shiver in response.]</button></section>`
    end();
}
function han74B() {
    allMain = `<br><br><br><br><section>You fall down a steep cliff hidden within the shrubbery, you fall into another hallway. You are now staring down the precipice of a cool, slanted hallway.<br><br><button onclick="han75()">[Brr...]</button></section>`
    end();
}
function han75() {
    allMain = `<br><br><br><br><section>You shiver as you walk down the hallway, there is an obvious pressure plate trap in the middle of the path.<br><br><button onclick="han76()">[Accidentally step on the only obstacle in your way.]</button></section>`
    end();
}
function han76() {
    allMain = `<br><br><br><br><section>The hall eminates a large click and a boulder from the entry of the precipice drops a large boulder, rolling faster and faster in your direction.<br><br><button onclick="han77()">[Haha, no good.]</button></section>`
    end();
}
function han77() {
    allMain = `<br><br><br><br><section>With the gooberish tomfoolery of this situation fresh in your mind, you run down the slanted hallway as fast as you can. You see light at the end of the passage.<br><br><button onclick="han78()">[Jump through the door.]</button></section>`
    end();
}
function han78() {
    allMain = `<br><br><br><br><section>You narrowly miss the boulder. It slams perfectly into your exit, interlocking with its spherical shape.<br><br><button onclick="han79()">[--&gt;]</button></section>`
    end();
}
function han79() {
    allMain = `<br><br><br><br><section>You are inside a roughly crafted arena, an aged sycamore tree resides along the perimeter. It looks as though the builder's knew any carvings or detail would be smashed and destroyed in here. In the middle of the arena is a large cube like structure with gridlines in various shapes wrapping across its limestone surface. If this object were personified, you would say it was at peace.<br><br><button onclick="han80()">[Poke it with a stick.]</button></section>`
    end();
}
function han80() {
    allMain = `<br><br><br><br><section>You poke the ominous structure with the stick like an absolute dunderhead, the structure immediately responds by glowing orange along its lines and carvings. <br><br><button onclick="han81()">[Uh oh.]</button></section>`
    end();
}
function han81() {
    allMain = `<br><br><br><br><section>the structure moves gruffly and sluggishly changes its shape, sliding against its once petrified resting position and morphing into a humanoid shape.<br><br><button onclick="han82()">[UH OH.]</button></section>`
    end();
}
function han82() {
    allMain = `<br><br><br><br><section>Out of its growing arm shape forms an aesthetically pleasing fist, its defined edges make sharp points. It's face gains structure, it's eyes red with fury and intent of death.<br><br><button onclick="combatSetup(1,5)">[Whoops.]</button></section>`
    saveState = `han83`
    end();
}
function han83() {
    allMain = `<br><br><br><br><section>The golem collapses into itself, collapsing its marbled streaks into themselves. The stone structure becomes a lump of misshapen and destroyed features and joints. A gloriously angelic light jabs itself through the surrounding holes of the stone pile, throwing the stone gibs astray and tossing about rubble. The orbicular source ascends beyond the battered debris.<br><br><button onclick="han84()">[Examine the source.]</button></section>`
    end();
}
function han84() {
    allMain = `<br><br><br><br><section>You know what this is. It's a Forgo orb, the power and knowledge of the defeated slump of sediment lie within its visceral center. All one would have to do is touch it and they would gain an equivalent exchange of knowledge.
    <br><br><button onclick="han85()">[Touch it.]</button> <button onclick="han84B()">[Poke it with a stick.]</button></section>`
    end();
}
function han84B() {
    allMain = `<br><br><br><br><section>You use your perfect stick to interact with the perfect sphere, a perfect combo for a perfectly cool magician. The orb pops away from reality, the angelically iridescent light disappears, and you think about how cool your stick is. Your brain forms ideas you've never had before. You think about sticks as well.<br><br><button onclick="lvlUp()">[Go to skill tree.]</button></section>`
    end();
}
function han85() {
    allMain = `<br><br><br><br><section>You walk up to it like you have seen the love of your life for the first time. This is an experience most magical intellects would only dream of encountering. You put your hand against it and it gently pops away from reality, the angelically vivid light fades, and you feel ideas in your brain, thoughts you've never had before.
    <br><br><button onclick="lvlUp()">[Increase a skill.]</button></section>`
    saveState = `han86`;
    end();
}
function han86() {
    allMain = `<br><br><br><br><section> An adjacent doorway reveals itself and opens up, it is an upward stairway.<br><br><button onclick="han86B()">[Leave the dungeon.]</button> <!--></section>`
    end();
}
//<button onclick="han87()">[Moving on.]</button>

function han86B() {
    allMain = `<br><br><br><br><section> "OH HEY HEY HEY, I uh. I just wanted to say you should probably go to the left side of the map to the Dragon Temple" (it's the rectangle made of commas surrounded by the hastag symbols.) said the messenger, popping his head out of a dark unseeable corner. "Yeah no, that's it. Uh yeah so, have fun and stuff." <br><br><button onclick="displayPlayerPos()">[Whatever dude.]</button></section>`
    end();
}
function han87() {
    allMain = `<br><br><br><section><br>You return to the main hall of the memorial display and find Cobain waiting for you.<br><br><button onclick="han88()">[Tell him what happened.]</button></section>`
    end();
}
function han88() {
    allMain = `<br><br><br><br>What a harrowing quest, but now it is over. I want you to take this to South Polend's city and deliver it to the King, this is what he asked for. Be sure to return home after you finish, we shan't risk any more with this perilous fighting.<section><br><br><button onclick="displayPlayerPos()">[Take a journey.]</button> <button onclick="eastSlums()">[Go to the marketland.]</button></section>`
    end();
}

function eastSlums() {
    allMain = `<br><br><br><section>You are in the market of the Eastern Slums, &quot;it's not as bad as it looks,&quot; said the rotten towel vendor<br><br><button onclick='()'>Find a merchant.</button> <button onclick="displayPlayerPos()">Go to the map.</button> <button>Talk to the Locals</button></section>`
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
            givenMoney = eLvlAll[eIndx] * 5;
        }
        if (randomNum >= 2) {
            eIndx = getRandomInt(0, 5);
            enemy2 = new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx])
            currentEs.push(enemy2);
            givenMoney += eLvlAll[eIndx] * 5;
        }
        if (randomNum >= 3) {
            eIndx = getRandomInt(0, 5);
            enemy3 = new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx])
            currentEs.push(enemy3);
            givenMoney += eLvlAll[eIndx] * 5;
        }
        // if (randomNum === 4) {
        //     eIndx = getRandomInt(0, 5);
        //     enemy4 = new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx])
        //     currentEs.push(enemy4);
        //     givenMoney += eLvlAll[eIndx] * 5;
        // }
        //}
        if (currentEs.length == 0) {
            eIndx = getRandomInt(0, 5);
            currentEs.push(new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx]));
            givenMoney = eLvlAll[eIndx] * 5;
        }
    }
    else if (setCombat === 1) {
        currentEs.push(new enemy(enemies[eIndx], eHpAll[eIndx], eDmgAll[eIndx], eLvlAll[eIndx], eDefAll[eIndx]));
        givenMoney = eLvlAll[eIndx] * 5;
    }
    console.log(enemies[0].e)
    let aOrAn1 = aOrAn(currentEs[0].e);
    let aOrAn2 = aOrAn(currentEs[currentEs.length - 1].e);

    allMain = `<br><br><br><br><section>You encounter ${aOrAn1} ${currentEs[0].e}`
    // if (currentEs.length == 4) {
    //     allMain += `, ${currentEs[1].e}, ${currentEs[2].e},`;
    // }
    if (currentEs.length == 3) {
        allMain += `, ${currentEs[1].e},`
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
    allMain += `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="listItems()">Inventory</button> <button onclick='abilityList()'>Abilities</button>`
    if(forcedCombat){
        allMain+=`</section>`
    }
    else{
        allMain+=` <button onclick="run()">Run</button></section>`
    }
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
        allMain += `<button onclick='allySelect(${item})'>${item.name}</button> `
    }
    allMain += `<button onclick='combatContinue()'>Cancel</button></section>`
    end();
}

function allySelect(allyObj) {
    allMain += `<br><br><br><section>Choose a target:<br><br>`
    for (item of currentEs) {
        allMain += `<button onclick='allyAttk(${allyObj},${currentEs.indexOf(item)})'>${item.e}</button> `
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
        allMain += `<button onclick='meleeAttk(${currentEs.indexOf(item)})'>${item.e}</button> `
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
    allMain = `<section>You used ${pItems[itemIndx].itemName}!`;
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
    allMain = `<section>You blocked</section>`
    enemyTurn();
}

function inspect() {
    allMain = `<section>`
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
    allMain = `<br><br><br><br><section>`
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
    allMain += `<br><br><br><br><section>Would you like to run from this encounter?<br><br> <button onclick="pleaseRun()">Yes</button> <button onclick="combatContinue()">No</button></section>`
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
    allMain = ``;
    if (pAbilities.indexOf(`highMelee`) != - 1) {
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
        dmgToE = dmgToE * (pMagicDmg + waterBuff);
        dmgToE = Math.ceil(dmgToE);
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
            let dmgToCurrentE = dmgToE
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
            dmgToCurrentE = Math.round(dmgToE * (1 - (item.eDef / 100)))
            item.eHp -= dmgToCurrentE;
            totalDmgDealt += dmgToCurrentE;
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
    allMain += `<button onclick="inspect()">Inspect Enemy</button> <button onclick="blockE()">Block</button> <button onclick="listItems()">Inventory</button> <button onclick='abilityList()'>Abilities</button>`
    if(forcedCombat){
        allMain+=`</section>`
    }
    else{
        allMain+=` <button onclick="run()">Run</button></section>`
    }
    end();
}

function enemyTurn() {
    for (let i = 0; i < currentEs.length; i++) {
        if (!(currentEs[i].eHp > 0)) {
            currentEs.splice(i, 1);
            i--;
        }
    }
    if (currentEs.length == 0) {
        combatEnd();
        return undefined;
    }
    for (item of currentEs) {
        if (item.eDef < 0) {
            item.eDef = 0;
        }
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
    if (givenMoney == 0) {
        givenMoney = 30
    }
    allMain += `<section>You gained ${givenMoney} dollars!</section>`
    money += givenMoney;
    givenMoney = 0;
    if (currentDungeon != -1) {
        if (allDungeonInfo[currentDungeon].numberOfRooms == (allDungeonInfo[currentDungeon].currentRoom - 1)) {
            allDungeonInfo[currentDungeon].completed = true;
            currentDungeon = -1;
            saveState = `lvlUp`;
            allMain += `<br><br><br><br><section><button onclick='lvlUp()'>Level Up!</button></section>`
        }
        else {
            allMain += `<br><br><br><br><section><button onclick='${saveState}()'>Continue</button></section>`
        }
    }
    else {
        allMain += `<br><br><br><br><section><button onclick='${saveState}()'>Continue</button></section>`
    }
    end();
}

function playerLost() {
    allMain = `You lost<br>Refresh the page to play again`
    end();
}

//similar to combat end
function pleaseRun() {
    currentEs = [];
    allMain = `<br><br><br><br><section>Fine then, be that way. See if I care. XP</section>`
    allMain += `<br><br><br><br><section><button onclick='${saveState}()'>Continue</button></section>`
    end();
}

function bossRushIntro() {
    allMain = `<section>WARNING!!! Once you enter the temple, you may not leave until you finish your task. Enter temple?<br><br><button onclick='bossRushContinue()'>Yes</button> <button onclick='displayPlayerPos()'>No</button></section>`
    end();
}

function bossRushContinue() {
    if (bossRushIndx < enemies.length - 1) {
        forcedCombat = true;
        combatSetup(1, bossRushIndx);
        bossRushIndx++
        saveState = `bossRushContinue`;
    }
    else {
        allMain = `<section>You have killed all of the guardians of the temple and have unlocked access to the mountain.<br> <button onclick='displayPlayerPos()'>Return to the map</button></section>`
        saveState = `displayPlayerPos`
        map = map2;
        keyItems.push(`completeBosses`)
    }
    end();
}

function lvlUp() {
    allMain = `<section>Select an Upgrade!<br><br><section class='allSkills'><section class='skillColumn'>`
    if (statA == 0) {
        allMain += `<button onclick='buffStat("def",${5})'>Block Def Up</button>`
    }
    else if (statA == 1) {
        allMain += `<button>Block Def Up</button> <button onclick='addAbility("blockDmgUp")'>Blocking increses dmg by a small percent for the next turn</button>`
    }
    else if (statA == 2) {
        allMain += `<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button onclick='buffStat("def",${5})'>Block Def Up</button>`
    }
    else if (statA == 3) {
        allMain += `<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button onclick='addAbility("blockImmunity")'>While blocking, have a 25% chance to not take dmg</button>`
    }
    else if (statA == 4) {
        allMain += `<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button>While blocking, have a 25% chance to not take dmg</button> <button onclick='buffStat("def",${5})'>Block Def Up</button>`
    }
    else if (statA == 5) {
        allMain += `<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button>While blocking, have a 25% chance to not take dmg</button> <button>Block Def Up</button> <button onclick='addAbility("parry")'>You no longer take damage while blocking</button>`
    }
    else if (statA == 6) {
        allMain += `<button>Block Def Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Block Def Up</button> <button>While blocking, have a 25% chance to not take dmg</button> <button>Block Def Up</button> <button>You no longer take damage while blocking</button>`
    }
    allMain += `</section><section class='skillColumn'>`

    switch (pSpellType) {
        case `all`:
            if (statB == 0) {
                allMain += `<button onclick='buffStat("fireDotBuff",${1})'>Fire Damage Over Time Length Up</button>`
            }
            else if (statB == 1) {
                allMain += `<button>Fire Damage Over Time Length Up</button> <button onclick='addAbility("fireBlock","fire")'>Blocking deals fire damage to enemy</button>`
            }
            else if (statB == 2) {
                allMain += `<button>Fire Damage Over Time Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button onclick='buffStat("fireDotBuff",${1})'>Fire Damage Over Time Length Up</button>`
            }
            else if (statB == 3) {
                allMain += `<button>Fire Damage Over Time Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire Damage Over Time Length Up</button> <button onclick='addAbility("firebomb","fire")'>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button>`
            }
            else if (statB == 4) {
                allMain += `<button>Fire Damage Over Time Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire Damage Over Time Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button onclick='buffStat("fireDotBuff",${1})'>Fire Damage Over Time Length Up</button>`
            }
            else if (statB == 5) {
                allMain += `<button>Fire Damage Over Time Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire Damage Over Time Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button>Fire Damage Over Time Length Up</button> <button onclick='addAbility("phoenix","fire")'>If your Hp drops to 0, regain half hp</button>`
            }
            else if (statB == 6) {
                allMain += `<button>Fire Damage Over Time Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire Damage Over Time Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button>Fire Damage Over Time Length Up</button> <button>If your Hp drops to 0, regain half hp</button>`
            }
            allMain += `</section><section class='skillColumn'>`
            if (statC == 0) {
                allMain += `<button onclick='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
            }
            else if (statC == 1) {
                allMain += `<button>Healing Power Up</button> <button onclick='addAbility("coolDown","water",coolDown)'>You can remove DOT afflictions using an ability</button>`
            }
            else if (statC == 2) {
                allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button onclick='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
            }
            else if (statC == 3) {
                allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button onclick='addAbility("waterShield","water")'>Healing increases defense by a moderate amount for a turn</button>`
            }
            else if (statC == 4) {
                allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button onclick='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
            }
            else if (statC == 5) {
                allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button>Healing Power Up</button> <button onclick='addAbility("quickHeal","water")'>You can attack and heal in the same turn</button>`
            }
            else if (statC == 6) {
                allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button>Healing Power Up</button> <button>You can attack and heal in the same turn</button>`
            }
            allMain += `</section><section class='skillColumn'>`
            if (statD == 0) {
                allMain += `<button onclick='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
            }
            else if (statD == 1) {
                allMain += `<button>Earth Dmg Up</button> <button onclick='addAbility("doubleEarth","earth")'>Earth attacks can hit twice</button>`
            }
            else if (statD == 2) {
                allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button onclick='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
            }
            else if (statD == 3) {
                allMain += (`<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button>
                <button onclick='addAbility("InstaKill","earth", instaKill'>Adds ability to defeat any enemy whose hp is under 10%</button>`)
            }
            else if (statD == 4) {
                allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button onclick='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
            }
            else if (statD == 5) {
                allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button>Earth Dmg Up</button> <button onclick='addAbility("quadHit","earth")'>All attacks have a ${(pLvl - 1) / 25 * 100}% chance to hit 4 times</button>`
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
                        allMain += `<button onclick='buffStat("fireDotBuff",${1})'>Fire Damage Over Time Length Up</button>`
                    }
                    else if (statB == 1) {
                        allMain += `<button>Fire Damage Over Time Length Up</button> <button onclick='addAbility("fireBlock","fire")'>Blocking deals fire damage to enemy</button>`
                    }
                    else if (statB == 2) {
                        allMain += `<button>Fire Damage Over Time Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button onclick='buffStat("fireDotBuff",${1})'>Fire Damage Over Time Length Up</button>`
                    }
                    else if (statB == 3) {
                        allMain += `<button>Fire Damage Over Time Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire Damage Over Time Length Up</button> <button onclick='addAbility("firebomb","fire")'>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button>`
                    }
                    else if (statB == 4) {
                        allMain += `<button>Fire Damage Over Time Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire Damage Over Time Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button onclick='buffStat("fireDotBuff",${1})'>Fire Damage Over Time Length Up</button>`
                    }
                    else if (statB == 5) {
                        allMain += `<button>Fire Damage Over Time Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire Damage Over Time Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button>Fire Damage Over Time Length Up</button> <button onclick='addAbility("phoenix","fire")'>If your Hp drops to 0, regain half hp</button>`
                    }
                    else if (statB == 6) {
                        allMain += `<button>Fire Damage Over Time Length Up</button> <button>Blocking increses dmg by a small percent for the next turn</button> <button>Fire Damage Over Time Length Up</button> <button>Every turn has ${(pLvl - 1) / 25 * 100}% chance to cast a firebomb, cooldown is 5 turns</button> <button>Fire Damage Over Time Length Up</button> <button>If your Hp drops to 0, regain half hp</button>`
                    }
                    break;
                case `water`:
                    if (statB == 0) {
                        allMain += `<button onclick='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
                    }
                    else if (statB == 1) {
                        allMain += `<button>Healing Power Up</button> <button onclick='addAbility("coolDown","water",coolDown)'>You can remove DOT afflictions using an ability</button>`
                    }
                    else if (statB == 2) {
                        allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button onclick='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
                    }
                    else if (statB == 3) {
                        allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button onclick='addAbility("waterShield","water")'>Healing increases defense by a moderate amount for a turn</button>`
                    }
                    else if (statB == 4) {
                        allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button onclick='buffStat("waterBuff",${0.25})'>Healing Power Up</button>`
                    }
                    else if (statB == 5) {
                        allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button>Healing Power Up</button> <button onclick='addAbility("quickHeal","water")'>You can attack and heal in the same turn</button>`
                    }
                    else if (statB == 6) {
                        allMain += `<button>Healing Power Up</button> <button>You can remove DOT afflictions using an ability</button> <button>Healing Power Up</button> <button>Healing increases defense by a moderate amount for a turn</button> <button>Healing Power Up</button> <button>You can attack and heal in the same turn</button>`
                    }
                    break;
                case `earth`:
                    if (statB == 0) {
                        allMain += `<button onclick='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
                    }
                    else if (statB == 1) {
                        allMain += `<button>Earth Dmg Up</button> <button onclick='addAbility("doubleEarth","earth")'>Earth attacks can hit twice</button>`
                    }
                    else if (statB == 2) {
                        allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button onclick='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
                    }
                    else if (statB == 3) {
                        allMain += (`<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button>
                        <button onclick='addAbility("InstaKill","earth", instaKill)'>Adds ability to defeat any enemy whose hp is under 10%</button>`)
                    }
                    else if (statB == 4) {
                        allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button onclick='buffStat("earthBuff",${0.25})'>Earth Dmg Up</button>`
                    }
                    else if (statB == 5) {
                        allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button>Earth Dmg Up</button> <button onclick='addAbility("quadHit","earth")'>All attacks have a ${(pLvl - 1) / 25 * 100}% chance to hit 4 times</button>`
                    }
                    else if (statB == 6) {
                        allMain += `<button>Earth Dmg Up</button> <button>Earth attacks can hit twice</button> <button>Earth Dmg Up</button> <button>Adds ability to defeat any enemy whose hp is under 10%</button> <button>Earth Dmg Up</button> <button>All attacks have a ${(pLvl - 1) / 25 * 100}% chance to hit 4 times</button>`
                    }
                    break;
            }
            switch (char) {
                case `paul`:
                    if (statC == 0) {
                        allMain += `<button onclick='buffStat("pDmg",${0.25})'>Sword Dmg Up</button>`
                    }
                    else if (statC == 1) {
                        allMain += `<button>Sword Dmg Up</button> <button onclick='addAbility("defReduction","p1", eDefReduction)'>Adds ability which reduces enemy defense</button>`
                    }
                    else if (statC == 2) {
                        allMain += `<button>Sword Dmg Up</button> <button>Adds ability which reduces enemy defense</button> <button onclick='buffStat("pDmg",${0.25})'>Sword Dmg Up</button>`
                    }
                    else if (statC == 3) {
                        allMain += (`<button>Sword Dmg Up</button> <button>Adds ability which reduces enemy defense</button> <button>Sword Dmg Up</button>
                        <button onclick='addAbility("multiHit","p1")'>A non-magic infused attack has a chance to hit ${(pLvl * 5 / 25)} times</button>`)
                    }
                    else if (statC == 4) {
                        allMain += `<button>Sword Dmg Up</button> <button>Adds ability which reduces enemy defense</button> <button>Sword Dmg Up</button> <button>A non-magic infused attack has a chance to hit ${(pLvl * 5 / 24)} times</button> <button onclick='buffStat("pDmg",${0.25})'>Sword Dmg Up</button>`
                    }
                    else if (statC == 5) {
                        allMain += `<button>Sword Dmg Up</button> <button>Adds ability which reduces enemy defense</button> <button>Sword Dmg Up</button> <button>A non-magic infused attack has a chance to hit ${(pLvl * 5 / 24)} times</button> <button>Sword Dmg Up</button> <button onclick='addAbility("highMelee","p1")'>For every 50 damage you deal, your damage increases by ${pLvl * 10 / 25}%</button>`
                    }
                    else if (statC == 6) {
                        allMain += `<button>Sword Dmg Up</button> <button>Adds ability which reduces enemy defense</button> <button>Sword Dmg Up</button> <button>A non-magic infused attack has a chance to hit ${(pLvl * 5 / 24)} times</button> <button>Sword Dmg Up</button> <button>For every 50 damage you deal, your damage increases by ${pLvl * 10 / 24}%</button>`
                    }

                    if (statD == 0) {
                        allMain += `<button onclick='buffStat("pMagicDmg",${0.25})'>Magic Dmg Up</button>`
                    }
                    else if (statD == 1) {
                        allMain += `<button>Magic Dmg Up</button> <button onclick='addAbility("Melee Infusion","p2",infuseMelee)'>All melee attacks can be infused with selected magic attribute</button>`
                    }
                    else if (statD == 2) {
                        allMain += `<button>Magic Dmg Up</button> <button>All melee attacks can be infused with selected magic attribute</button> <button onclick='buffStat("pMagicDmg",${0.25})'>Magic Dmg Up</button>`
                    }
                    else if (statD == 3) {
                        allMain += `<button>Magic Dmg Up</button> <button>All melee attacks can be infused with selected magic attribute</button> <button>Magic Dmg Up</button>
                        <button onclick='addAbility("enemyWeakener,"p2")'>Repeated melee attacks weakens the enemy</button>`
                    }
                    else if (statD == 4) {
                        allMain += `<button>Magic Dmg Up</button> <button>All melee attacks can be infused with selected magic attribute</button> <button>Magic Dmg Up</button> <button>Repeated melee attacks weakens the enemy</button> <button onclick='buffStat("pMagicDmg",${0.25})'>Magic Dmg Up</button>`
                    }
                    else if (statD == 5) {
                        allMain += `<button>Magic Dmg Up</button> <button>All melee attacks can be infused with selected magic attribute</button> <button>Magic Dmg Up</button> <button>Repeated melee attacks weakens the enemy</button> <button>Magic Dmg Up</button> <button onclick='addAbility("maxInfusion","p2")'>Melee attacks can be infused with all elements</button>`
                    }
                    else if (statD == 6) {
                        allMain += `<button>Magic Dmg Up</button> <button>All melee attacks can be infused with selected magic attribute</button> <button>Magic Dmg Up</button> <button>Repeated melee attacks weakens the enemy</button> <button>Magic Dmg Up</button> <button>Melee attacks can be infused with all elements</button>`
                    }
                    break;
                case `mat`:
                    if (statC == 0) {
                        allMain += `<button onclick='buffStat("allyDmg",${0.25})'>Ally Dmg Up</button>`
                    }
                    else if (statC == 1) {
                        allMain += `<button>Ally Dmg Up</button> <button onclick='addAbility("Ally Infusion","m1",infuseMelee)'>You can infuse  infuse allies with your elemental attribute</button>`
                    }
                    else if (statC == 2) {
                        allMain += `<button>Ally Dmg Up</button> <button>You can infuse  infuse allies with your elemental attribute</button> <button onclick='buffStat("allyDmg",${0.25})'>Ally Dmg Up</button>`
                    }
                    else if (statC == 3) {
                        allMain += (`<button>Ally Dmg Up</button> <button>You can infuse  infuse allies with your elemental attribute</button> <button>Ally Dmg Up</button>
                        <button onclick='addAbility("allyHeal","m1", allyHeal())'>You can heal all allies ${pLvl / 25 * 35}% of their health</button>`)
                    }
                    else if (statC == 4) {
                        allMain += `<button>Ally Dmg Up</button> <button>You can infuse  infuse allies with your elemental attribute</button> <button>Ally Dmg Up</button> <button>You can heal all allies ${pLvl / 25 * 35}% of their health</button> <button onclick='buffStat("allyDmg",${0.25})'>Ally Dmg Up</button>`
                    }
                    else if (statC == 5) {
                        allMain += `<button>Ally Dmg Up</button> <button>You can infuse  infuse allies with your elemental attribute</button> <button>Ally Dmg Up</button> <button>You can heal all allies ${pLvl / 25 * 35}% of their health</button> <button>Ally Dmg Up</button> <button onclick='addAbility("allyBonusAction","m1")'>You can do an extra action while your ally attacks</button>`
                    }
                    else if (statC == 6) {
                        allMain += `<button>Ally Dmg Up</button> <button>You can infuse  infuse allies with your elemental attribute</button> <button>Ally Dmg Up</button> <button>You can heal all allies ${pLvl / 25 * 35}% of their health</button> <button>Ally Dmg Up</button> <button>You can do an extra action while your ally attacks</button>`
                    }

                    if (statD == 0) {
                        allMain += `<button onclick='buffStat("allyNum",${0.25})'>Max Ally Num Up</button>`
                    }
                    else if (statD == 1) {
                        allMain += `<button>Max Ally Num Up</button> <button onclick='addAbility("allyChanceUp","m2")'>Recruiting an ally is more successful</button>`
                    }
                    else if (statD == 2) {
                        allMain += `<button>Max Ally Num Up</button> <button>Recruiting an ally is more successful</button> <button onclick='buffStat("allyNum",${0.25})'>Max Ally Num Up</button>`
                    }
                    else if (statD == 3) {
                        allMain += `<button>Max Ally Num Up</button> <button>Recruiting an ally is more successful</button> <button>Max Ally Num Up</button>
                        <button onclick='addAbility("allyStrengthen,"m2")'>Allies have higher stats when recruited</button>`
                    }
                    else if (statD == 4) {
                        allMain += `<button>Max Ally Num Up</button> <button>Recruiting an ally is more successful</button> <button>Max Ally Num Up</button> <button>Allies have higher stats when recruited</button> <button onclick='buffStat("allyNum",${0.25})'>Max Ally Num Up</button>`
                    }
                    else if (statD == 5) {
                        allMain += `<button>Max Ally Num Up</button> <button>Recruiting an ally is more successful</button> <button>Max Ally Num Up</button> <button>Allies have higher stats when recruited</button> <button>Max Ally Num Up</button> <button onclick='addAbility("stInNumbers","m2")'>If player has the max number of allies, all allies deal increased damage</button>`
                    }
                    else if (statD == 6) {
                        allMain += `<button>Max Ally Num Up</button> <button>Recruiting an ally is more successful</button> <button>Max Ally Num Up</button> <button>Allies have higher stats when recruited</button> <button>Max Ally Num Up</button> <button>If player has the max number of allies, all allies deal increased damage</button>`
                    }
                    break;
            }
            break;
    }
    pMaxHp += 10;
    pHp += 10;
    pLvl += 1;
    pDmg += 0.05;
    pBaseDmg += 0.05;
    pBlockBuff += 0.1;
    pBaseDef += 0.05;
    pMagicDmg += 0.05;
    pBaseMagicDmg += 0.05
    allMain += `</section>`
    if (saveState == `lvlUp`) {
        saveState = `displayPlayerPos`
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
    if (path != `none`) {
        postLvlUp()
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
    //stat++;
    postLvlUp()

}

function postLvlUp() {
    allMain = `<section>You leveled up! This action cannot be undone<br><br><button onclick='${saveState}()'>Continue</button></section>`
    end();
}

function displayPlayerPos() {
    pMap = map.split(``);
    pMap[playerX + playerY * 202] = `P`;
    pMap = pMap.join(``);
    printMap();
}
function randomCombat() {
    if (Math.random() <= 0.15) { 
        combatSetup();
    }
    else {
        displayPlayerPos()
    }
}
function checkForThings() {

    if ((playerY >= 36) && (playerY <= 38) && (playerX >= 4) && (playerX <= 15)) {
        if (keyItems.indexOf(`completeBosses`) != -1) {
            allMain = `<section>The temple collapsed after you had left, making the enterance inaccessable.<br><br> <button onclick='displayPlayerPos'>Return to map</button></section>`
        }
        else {
            bossRushIntro();
        }
    }
    else if (!dungeonCheck() && !cityCheck()) {
        randomCombat()
        // displayPlayerPos()
    }
    else if (dungeonCheck()) {
        switch (dungeonCheck()) {
            case `dungeon1`:
                currentDungeon = 0;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon2`:
                currentDungeon = 1;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon3`:
                currentDungeon = 2;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon4`:
                currentDungeon = 3;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon5`:
                currentDungeon = 4;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon6`:
                currentDungeon = 5;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon7`:
                currentDungeon = 6;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon8`:
                currentDungeon = 7;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon9`:
                currentDungeon = 8;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon10`:
                currentDungeon = 9;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon11`:
                currentDungeon = 10;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon12`:
                currentDungeon = 11;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon13`:
                currentDungeon = 12;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon14`:
                currentDungeon = 13;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon15`:
                currentDungeon = 14;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon16`:
                currentDungeon = 15;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon17`:
                currentDungeon = 16;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon18`:
                currentDungeon = 17;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon19`:
                currentDungeon = 18;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
            case `dungeon20`:
                currentDungeon = 19;
                if (!allDungeonInfo[currentDungeon].completed) {
                    saveState = `displayPlayerPos`
                    dungeonContinue();
                    forcedCombat = true;
                }
                else {
                    currentDungeon = -1;
                    displayPlayerPos();
                }
                break;
        }
    }
    else if (cityCheck()) {
        switch (cityCheck()) {
            case `city1`:
                currentCity = 0;
                citySetup();
                //dungeon city
                break;
            case `city2`:
                currentCity = 1;
                citySetup();
                break;
            case `city3`:
                currentCity = 2;
                citySetup();
                break;
            case `city4`:
                currentCity = 3;
                citySetup();
                //dungeon city
                break;
            case `city5`:
                currentCity = 4;
                citySetup();
                //dungeon city
                break;
            case `city6`:
                currentCity = 5;
                citySetup();
                break;
        }
    }
}
function moveNorth() {
    playerY--;
    checkForThings()
}
function moveSouth() {
    playerY++;
    checkForThings()
}
function moveEast() {
    playerX++;
    checkForThings()
}
function moveWest() {
    playerX--;
    checkForThings()
}
function displayMovementOptions() {
    pMap = map.split(``);
    saveState = `displayPlayerPos`
    allMain += `<br><br><section>`
    if (pMap[playerX + (playerY - 1) * 202] != `@`) {
        allMain += `<button onclick='moveNorth()'>Move North</button> `
    }
    if (pMap[playerX + (playerY + 1) * 202] != `@`) {
        allMain += `<button onclick='moveSouth()'>Move South</button> `
    }
    if (pMap[playerX - 1 + playerY * 202] != `@`) {
        allMain += `<button onclick='moveWest()'>Move West</button> `
    }
    if (pMap[playerX + 1 + playerY * 202] != `@`) {
        allMain += `<button onclick='moveEast()'>Move East</button> `
    }

    allMain += `</section>`
    end();
}
function printMap() {
    allMain = `<section class='map'><p>` + pMap + `</p></section><br><section>P : Player || D : Dungeon || C : City || @ : Magic Barrier || , : Dragon Temple</section>`;
    displayMovementOptions();
    end();
}

function citySetup() {
    allMain = `<section>` + allCityInfo[currentCity].cityDesc + `<br><br><button onclick='setShop()'>Go to a shop</button> <button onclick='talking()'>Talk to the locals</button>`

    if ((allCityInfo[currentCity].type == `dungeon`) && (allCityInfo[currentCity].dungeonComplete == false)) {
        allMain += ` <button onclick='${allCityInfo[currentCity].cityDungeon}'>Go to the dungeon</button>`
    }
    allMain += ` <button onclick='displayPlayerPos()'>Leave the city</button></section>`
    end();
}

function talking() {
    allMain = `<section>You decide to talk to some of the locals. <br><br>${allCityInfo[currentCity].localDialogue} <br><br>...<br><br>You decide to leave the locals alone.<br><br><button onclick='citySetup()'>Return to city</button></section>`
    end()
}

function setShop() {
    allMain = `<section>You enter the city's shop, looking for some items to buy<br><br>`
    for (let i = 0; i < allCityInfo[currentCity].items.length; i++) {
        allMain += ` <button onclick='purchase(${allCityInfo[currentCity].items[i]})'>Buy `
        if (allCityInfo[currentCity].items[i] < buffItemList.length) {
            allMain += `${buffItemList[allCityInfo[currentCity].items[i]].name}!</button>`
        }
        else {
            allMain += `${offenseItemList[allCityInfo[currentCity].items[i] - buffItemList.length].name}!</button>`
        }
    }
    allMain += ` <button onclick='citySetup()'>Leave shop</button>`
    end();
}

function purchase(itemIndx) {
    let cost = 0;
    let itemName = ``;
    if (itemIndx < buffItemList.length) {
        cost = Math.ceil(buffItemList[itemIndx].hp / 10 + buffItemList[itemIndx].def / 10 + buffItemList[itemIndx].dmg / 10);
        itemName = buffItemList[itemIndx].name;
    }
    else {
        cost = Math.ceil(offenseItemList[itemIndx - buffItemList.length].hp / 10 + offenseItemList[itemIndx - buffItemList.length].def / 10 + offenseItemList[itemIndx - buffItemList.length].dmg / 10);
        itemName = offenseItemList[itemIndx - buffItemList.length].name;
    }
    if (money < cost) {
        allMain = `<section>You could not purchase the item as you have too little money!<br><br><button onclick='setShop()'>Try to buy another item</button></section>`
    }
    else {
        money -= cost;
        allMain = `<section>You purchased the ${itemName} from the shop.<br><br><button onclick='setShop()'>Try to buy another item</button> <button onclick='citySetup()'>Return to city</button></section>`
    }
    end()
}

function dungeonContinue() {
    if (allDungeonInfo[currentDungeon].numberOfRooms == allDungeonInfo[currentDungeon].currentRoom) {
        combatSetup(1, allDungeonInfo[currentDungeon].bossIndx);
        allDungeonInfo[currentDungeon].currentRoom++
        saveState = `displayPlayerPos`;
    }
    else {
        saveState = `dungeonContinue`;
        allDungeonInfo[currentDungeon].currentRoom++
        combatSetup();
    }
}

function cityCheck() {
    if ((10 <= playerX) && (playerX <= 18) && (3 <= playerY) && (playerY <= 5)) {

        return `city1`;
    }
    else if ((181 <= playerX) && (playerX <= 188) && (4 <= playerY) && (playerY <= 5)) {

        return `city2`;
    }
    else if ((74 <= playerX) && (playerX <= 77) && (38 <= playerY) && (playerY <= 39)) {

        return `city3`;
    }
    else if ((179 <= playerX) && (playerX <= 188) && (42 <= playerY) && (playerY <= 44)) {

        return `city4`;
    }
    else if ((114 <= playerX) && (playerX <= 121) && (45 <= playerY) && (playerY <= 47)) {

        return `city5`;
    }
    else if ((31 <= playerX) && (playerX <= 32) && (51 <= playerY) && (playerY <= 51)) {

        return `city6`;
    }
}

function dungeonCheck() {
    if ((48 <= playerX) && (playerX <= 50) && (playerY == 2)) {

        return `dungeon1`;
    }
    else if ((186 <= playerX) && (playerX <= 190) && (6 <= playerY) && (playerY <= 7)) {

        return `dungeon2`;
    }
    else if ((24 <= playerX) && (playerX <= 27) && (10 <= playerY) && (playerY <= 11)) {

        return `dungeon3`;
    }
    else if ((122 <= playerX) && (playerX <= 126) && (14 <= playerY) && (playerY <= 15)) {

        return `dungeon4`;
    }
    else if ((54 <= playerX) && (playerX <= 58) && (15 <= playerY) && (playerY <= 16)) {

        return `dungeon5`;
    }
    else if ((22 <= playerX) && (playerX <= 26) && (21 <= playerY) && (playerY <= 22)) {

        return `dungeon6`;
    }
    else if ((28 <= playerX) && (playerX <= 30) && (28 <= playerY) && (playerY <= 28)) {

        return `dungeon7`;
    }
    else if ((47 <= playerX) && (playerX <= 48) && (30 <= playerY) && (playerY <= 30)) {

        return `dungeon8`;
    }
    else if ((171 <= playerX) && (playerX <= 174) && (32 <= playerY) && (playerY <= 32)) {

        return `dungeon9`;
    }
    else if ((73 <= playerX) && (playerX <= 75) && (33 <= playerY) && (playerY <= 33)) {

        return `dungeon10`;
    }
    else if ((99 <= playerX) && (playerX <= 104) && (38 <= playerY) && (playerY <= 39)) {

        return `dungeon11`;
    }
    else if ((128 <= playerX) && (playerX <= 131) && (38 <= playerY) && (playerY <= 38)) {

        return `dungeon12`;
    }
    else if ((143 <= playerX) && (playerX <= 144) && (39 <= playerY) && (playerY <= 39)) {

        return `dungeon13`;
    }
    else if ((161 <= playerX) && (playerX <= 162) && (43 <= playerY) && (playerY <= 43)) {

        return `dungeon14`;
    }
    else if ((21 <= playerX) && (playerX <= 23) && (50 <= playerY) && (playerY <= 50)) {

        return `dungeon15`;
    }
    else if ((45 <= playerX) && (playerX <= 48) && (51 <= playerY) && (playerY <= 51)) {

        return `dungeon16`;
    }
    else if ((78 <= playerX) && (playerX <= 80) && (51 <= playerY) && (playerY <= 51)) {

        return `dungeon17`;
    }
    else if ((91 <= playerX) && (playerX <= 93) && (51 <= playerY) && (playerY <= 51)) {

        return `dungeon18`;
    }
    else if ((146 <= playerX) && (playerX <= 148) && (52 <= playerY) && (playerY <= 52)) {

        return `dungeon19`;
    }
    else if ((180 <= playerX) && (playerX <= 181) && (52 <= playerY) && (playerY <= 52)) {

        return `dungeon20`;
    }
    else {
        return false
    }
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
