/*~ SCRIPT BY SHINO / MICKEY / EMIKO ~*/
/* Usable Sysbols ◎●←↑→↓↖↗↘↙ */

const format = require('./format.js');
const mapID = [9735, 9935];						// MAP ID to input [ Normal Mode , Hard Mode ]
const HuntingZn = [735, 935]; 					// Add in your own Hunting Zone [ Normal Mode , Hard Mode ] 
const BossID = [1000, 2000, 3000]; 				// Add in Boss Template ID [ 1st boss , 2nd Boss, 3rd Boss ]
												// Leave value at 0 if you do not require Hardmode/1st Boss/2nd Boss
												// Ex. [735, 0] [0, 0, 3000];

const FirstBossActions = {						// First Boss Attack Actions Input here with desired call out Messages
	1189020954: {msg: 'Incoming Summon'},		// Actions placed here are universal and will be called out disregard to your class or job
	1189020760: {msg: 'BACK ATTACK'},
	1189021759: {msg: 'BACK ATTACK'},
	1189021760: {msg: 'BACK ATTACK'},
	1189020759: {msg: 'BACK ATTACK'},
	1189020952: {msg: 'GET OUT ↓'},
	1189020953: {msg: 'GET IN ↑'},
	1189020756: {msg: 'GET OUT ↓'},
	1189021756: {msg: 'GET OUT ↓'},
	1189020957: {msg: 'ROCKET!'},
	1189020955: {msg: 'PULL'},
};

const FirstBossActionsTank = {					// First Boss Actions call out for TANKS
	1189020752: {msg: 'Dodge Stun'},			// Actions will only be called out if you have TANK MODE Enabled
	1189021752: {msg: 'Dodge Stun'},
};

const SecondBossActions = {						// Second Boss Attack Actions
	1189020952: {msg: 'GET OUT ↓'},
};

const SecondBossActionsTank = {					// Second Boss Actions for TANKS
	1189020750: {msg: 'FRONT DODGE'},
	1189021750: {msg: 'FRONT DODGE'},
};

const ThirdBossActions = {						// Third Boss Attack Actions
	1189020969: {msg: 'SHIELD!'},
	1189020972: {msg: 'GET OUT ↓'},
	1189020764: {msg: 'RIGHT →↘'},
	1189021764: {msg: 'RIGHT →↘'},
	1189020767: {msg: 'RIGHT →↘'},
	1189021767: {msg: 'RIGHT →↘'},
	1189020765: {msg: 'LEFT ←↙'},
	1189021765: {msg: 'LEFT ←↙'},
	1189020766: {msg: 'LEFT ←↙'},
	1189021766: {msg: 'LEFT ←↙'},
};

const ThirdBossActionsTank = {					// Third Boss Actions for TANKS

};

//FOR HARD MODE INPUT BELOW HERE//

const FirstBossActionsHM = {
	1202128154: {msg: 'Incoming Summon'},
	1202127960: {msg: 'BACK ATTACK'},
	1202128960: {msg: 'BACK ATTACK'},
	1202127959: {msg: 'BACK ATTACK'},
	1202128959: {msg: 'BACK ATTACK'},
	1202128152: {msg: 'GET OUT ↓'},
	1202128153: {msg: 'GET IN ↑'},
	1202127956: {msg: 'GET OUT ↓'},
	1202128956: {msg: 'GET OUT ↓'},
	1202128157: {msg: 'ROCKET!'},
	1202128155: {msg: 'PULL'},
	1202128167: {msg: 'Safe front right ↑↗'},
	1202128163: {msg: 'Safe front right ↑↗'},
	1202129167: {msg: 'Safe front right ↑↗'},
	1202129163: {msg: 'Safe front right ↑↗'},
	1202128172: {msg: 'Safe right back →↘'},
	1202129172: {msg: 'Safe right back →↘'},
	1202128159: {msg: 'Safe right front →↗'},
	1202129159: {msg: 'Safe right front →↗'},
	1202128173: {msg: 'Safe left back ←↙'},
	1202129173: {msg: 'Safe left back ←↙'},
	1202128166: {msg: 'Safe left front ←↖'},
	1202129166: {msg: 'Safe left front ←↖'},
	1202128169: {msg: 'Safe back left ↓↙'},
	1202129169: {msg: 'Safe back left ↓↙'},
	1202128164: {msg: 'Safe back right ↓↘'},
	1202129164: {msg: 'Safe back right ↓↘'},
	1202128053: {msg: 'Wind'},
	
};

const FirstBossActionsTankHM = {
	1202127952: {msg: 'Dodge Stun'},
	1202128952: {msg: 'Dodge Stun'},
};

const SecondBossActionsHM = {
	1202128152: {msg: 'GET OUT ↓'},
};

const SecondBossActionsTankHM = {
	
};

const ThirdBossActionsHM = {
	1202128169: {msg: 'SHIELD!'},
	1202128172: {msg: 'GET OUT ↓'},
	1202127964: {msg: 'RIGHT →↘'},
	1202128964: {msg: 'RIGHT →↘'},
	1202127967: {msg: 'RIGHT →↘'},
	1202128967: {msg: 'RIGHT →↘'},
	1202127965: {msg: 'LEFT ←↙'},
	1202128965: {msg: 'LEFT ←↙'},
	1202127966: {msg: 'LEFT ←↙'},
	1202128966: {msg: 'LEFT ←↙'},
	//1202128153: {msg: 'action'},
	//1202128156: {msg: 'IN'}, 1202128155 WAVE 1202128154 OUT
	//1202128157: {msg: 'OUT'}, 1202128155 WAVE 1202128154 IN
	//1202128158: {msg: 'wave'}, 1202128154 IN 1202128154 OUT
};

const ThirdBossActionsTankHM = {
	
};

module.exports = function rk9guide(dispatch) {
	let firstskill = 0,
		secondskill = 0,
		isInv = 0,
		uid = 999999999,
		time = 9000,
		cid,
		name,
		boss,
		bosshp,
		model,
		zone,
		location,
		mode,
		dungeonmsg,
		job = -1,
		whichboss = 0,
		whichmode = 0,
		isTank = false,
		warned = false,
		warning = false,
		insidezone = false,
		insidemap = false,
		sendToParty = false,
		enabled = true,
		enabletp = false,
		enablebombtp = false;
		
	// DO NOT EDIT IF UN-SURE
	dispatch.hook('S_LOAD_TOPO', 1, (event) => {				// Welcome Message upon entering dungeon
        zone = event.zone;										// Edit Message if neccessary
		if (zone === mapID[0]) {								
			insidemap = true;
			whichmode = 1; //1 = NM
			dungeonmode();
			initialize();
			systemMessage('<br> Welcome to RK-9 Normal Mode <br> Type !help for more info <br>');
			return;
			} else if (zone === mapID[1]) {
			insidemap = true;
			whichmode = 2; //2 = HM
			dungeonmode();
			initialize();
			systemMessage('<br> Welcome to RK-9 Hard Mode <br> Type !help for more info <br>');
			return;
			} else insidemap = false;
    });
	
	dispatch.hook('S_LOGIN', 2, (event) => {
        ({
            cid,
            model,
            name
        } = event);
		job = model % 100
		if (job === 2 || job === 11) isTank = true;				// Check if class = Lancer / Brawler
		else isTank = false;
		setTimeout(function(){
			if (zone === mapID[0]) {								
			insidemap = true;
			whichmode = 1; //1 = NM
			dungeonmode();
			initialize();
			systemMessage('<br> Welcome to RK-9 Normal Mode <br> Type !help for more info <br>');
			return;
			} else if (zone === mapID[1]) {
			insidemap = true;
			whichmode = 2; //2 = HM
			dungeonmode();
			initialize();
			systemMessage('<br> Welcome to RK-9 Hard Mode <br> Type !help for more info <br>');
			return;
			} else insidemap = false;
		}, 15000);
	});
	
	const chatHook = event => {									// For Inputing commands, Toggle functions ETC
	let command = format.stripTags(event.message).split(' ');	// Edit Input Commands if neccessary
	if(insidemap) {												// DO NOT EDIT IF UN-SURE
		if (['!rk9'].includes(command[0].toLowerCase())) {
			toggleModule();
			return false;
		} else if (['!party'].includes(command[0].toLowerCase())) {
			toggleSentMessages();
			return false;
		} else if (['!bomb'].includes(command[0].toLowerCase())) {
			togglebombTP();
			return false;
		} else if (['!rocket'].includes(command[0].toLowerCase())) {
			togglerocketTP();
			return false;
		} else if (['!tank'].includes(command[0].toLowerCase())) {
			toggletank();
			return false;
		} else if (['!info'].includes(command[0].toLowerCase())) {
			systemMessage(mode + '<br> Boss notice: ' + enabled + '<br> Bomb TP: ' + enablebombtp + '<br> Rocket TP: ' + enabletp + '<br> Party Notice: ' + sendToParty + '<br> Tank Mode: ' + isTank + '<br>');
			return false;
		} else if (['!help'].includes(command[0].toLowerCase())) {
			systemMessage('<br>ALL TP ARE DISABLED BY DEFAULT <br> - !rk9 to toggle module <br> - !party to toggle party call out <br> - !bomb to toggle Bomb Tele NOT AVAILABLE IN HM <br> - !rocket to toggle Rocket Tele NOT TESTED <br> - !info to show Enabled or Disabled <br> - !tank to toggle Tank Mode <br>');
			return false;
		} else if (['!debug'].includes(command[0].toLowerCase())) {
			systemMessage('<br> InsideZone ' + insidezone + '<br> InsideMap ' + insidemap + '<br> Whichmode ' + whichmode + '<br> WhichBoss ' + whichboss);
			return false;
		}
	}
	}

	dispatch.hook('C_CHAT', 1, chatHook)	
	dispatch.hook('C_WHISPER', 1, chatHook)
	dispatch.hook('C_PLAYER_LOCATION', 1, (event) => {
        location = event;
    });
	
	dispatch.hook('S_DUNGEON_EVENT_MESSAGE', 1, (event) => {	
		if (!enabled || whichboss === 0) return;
		let msgId = parseInt(event.message.replace('@dungeon:', ''));
		if (isInv === 0) {
			if (msgId === 9935302) {
				firstskill = 'IN';
			} else if (msgId === 9935303) {
				firstskill = 'OUT'
			} else if (msgId === 9935304) {
				firstskill = 'WAVE'
			}
		} else if (isInv === 1) {
			if (msgId === 9935302) {
				secondskill = 'IN';
			} else if (msgId === 9935303) {
				secondskill = 'OUT'
			} else if (msgId === 9935304) {
				secondskill = 'WAVE'
			}
		}
	})
	
	// NEED MORE TESTING 
	// FOR WARRIOR / ZERK TANK MODE
	
	/*dispatch.hook('S_ABNORMALITY_BEGIN', 2, (event) => {
		if (!enabled) return;
		if(job === 1 || job === 2 || job === 4 || job === 11) {
		if(event.id === 100200 || event.id === 100202 || event.id === 100203) {
			isTank = true;
			systemMessage('Tank Mode: ' + isTank);
		}
		}
	});
	dispatch.hook('S_ABNORMALITY_END', 1, event => {
		if (!enabled) return;
		if(job === 1 || job === 2 || job === 4 || job === 11) {
		if(event.id === 100200 || event.id === 100202 || event.id === 100203) {
			isTank = false;
			systemMessage('Tank Mode: ' + isTank);
		}
		}
	});*/
	
	dispatch.hook('S_BOSS_GAGE_INFO', 3, (event) => {					// DO NOT EDIT IF UN-SURE
		if (!enabled) return;
		bosshp = event.curHp / event.maxHp;
		if(whichboss != 0) {
		if (bosshp <= 0)
		{
			whichboss = 0;
			warned = false;
			return;
		}
		}
		if(event.huntingZoneId === HuntingZn[0]) {
			whichmode = 1; //NM
			insidezone = true;
			if(event.templateId === BossID[0]) {
				whichboss = 1;
				boss = event.id;
				return;
			} else if(event.templateId === BossID[1]) {
				whichboss = 2;
				boss = event.id;
				return;
			} else if(event.templateId === BossID[2]) {
				whichboss = 3;
				boss = event.id;
				return;
			} else return false;
		} else if(event.huntingZoneId === HuntingZn[1]) {
			whichmode = 2; //HM
			insidezone = true;
			if(event.templateId === BossID[0]) {
				whichboss = 1;
				boss = event.id;
				return;
			} else if(event.templateId === BossID[1]) {
				whichboss = 2;
				boss = event.id;
				return;
			} else if(event.templateId === BossID[2]) {
				whichboss = 3;
				boss = event.id;
				if(bosshp <= 0.70 && !warned) {
					warned = true;
					sendMessage('Boss 70%');
				}
				return;
			} else return false;
		} else insidezone = false;
		})
	 
	 dispatch.hook('S_QUEST_BALLOON', 1, (event) => {
		if(!enabled) return;
		if(insidezone && insidemap) {
			isInv = 0; // TEMPORARY EASY MODE
			dungeonmsg = parseInt(event.message.replace('@monsterBehavior:', ''));
			if ( firstskill === 0 ) {
				if(dungeonmsg === 935301) {
					firstskill = 'IN'
				} else if(dungeonmsg === 935302) {
					firstskill = 'OUT'
				} else if(dungeonmsg === 935303) {
					firstskill = 'WAVE'
				}	
			} else if ( secondskill === 0 ) {
				if(dungeonmsg === 935301) {
					secondskill = 'IN'
				} else if(dungeonmsg === 935302) {
					secondskill = 'OUT'
				} else if(dungeonmsg === 935303) {
					secondskill = 'WAVE'
				}
			}
			if(dungeonmsg === 'standardorder') { //STANDARD 
				isInv = 0;
				firstskill = secondskill;
				secondskill = 0;
				sendMessage ('Next: ' + firstskill + ' + ' + secondskill); 
			} else if (dungeonmsg === 'reverseorder') { //REVERSE
				isInv = 1;
				secondskill = firstskill;
				firstskill = 0;
				sendMessage ('Next: ' + firstskill + ' + ' + secondskill); 
			}
			return;
		}
		return;
	 });
	 
	 
	 dispatch.hook('S_ACTION_STAGE', 1, (event) => {								// DO NOT EDIT IF UN-SURE
		 if(!enabled) return;														// Main script for calling out attacks
		 if(insidezone && insidemap) {
			bossCurLocation = {x: event.x,y: event.y,z: event.z,w: event.w};
			if(event.stage === 0) {
			if(whichmode === 1) {
				if(whichboss === 1) {
						if (FirstBossActions[event.skill]) {
							sendMessage(FirstBossActions[event.skill].msg);
						}
						if(isTank)
						{
							if (FirstBossActionsTank[event.skill]) {
							sendMessage(FirstBossActionsTank[event.skill].msg);
							}
						}
					if(event.skill === 1189020954) //Bomb TP
					{
						if (!enablebombtp) return;
						setTimeout(function(){
						location.z1 += 280;
						dispatch.toServer('C_PLAYER_LOCATION', 1, location);
						dispatch.toClient('S_SPAWN_ME', 1, {
						target: cid,
						x: location.x1,
						y: location.y1,
						z: location.z1,
						alive: 1,
						unk: 0
						});
						}, 11500);
						return;
					}
					if(event.skill === 1189020957) //Rocket TP
					{
						setTimeout(function(){
							sendMessage('JUMP!');
						}, 12000);
						if (enabletp) {
						setTimeout(function(){
						location.z1 += 1400;
						dispatch.toServer('C_PLAYER_LOCATION', 1, location);
						dispatch.toClient('S_SPAWN_ME', 1, {
						target: cid,
						x: location.x1,
						y: location.y1,
						z: location.z1,
						alive: 1,
						unk: 0
						});
						}, 13500);
						return;
						}
					}
				} else if (whichboss === 2) {
						if (SecondBossActions[event.skill]) {
							sendMessage(SecondBossActions[event.skill].msg);
						}
						if(isTank)
						{
							if (SecondBossActionsTank[event.skill]) {
							sendMessage(SecondBossActionsTank[event.skill].msg);
							}
						}
				} else if (whichboss === 3) {
						if (ThirdBossActions[event.skill]) {
							sendMessage(ThirdBossActions[event.skill].msg);
						}
						if(isTank)
						{
							if (ThirdBossActionsTank[event.skill]) {
							sendMessage(ThirdBossActionsTank[event.skill].msg);
							}
						}
				} else return;
		} else if (whichmode === 2) { //HARD MODE
			if(whichboss === 1) {
					if (FirstBossActionsHM[event.skill]) {
						sendMessage(FirstBossActionsHM[event.skill].msg);
					}
					if(isTank)
					{
						if (FirstBossActionsTankHM[event.skill]) {
						sendMessage(FirstBossActionsTankHM[event.skill].msg);
						}
					}
					if(event.skill === 1202128167) { //Safe front right
						setTimeout(Safefrontright, 6000, 559);
					} else if (event.skill === 1202128163) { //Safe front right
						setTimeout(Safefrontright, 6000, 559);
					} else if (event.skill === 1202129167) { //Safe front right
						setTimeout(Safefrontright, 6000, 559);
					} else if (event.skill === 1202129163) { //Safe front right
						setTimeout(Safefrontright, 6000, 559);
					} else if (event.skill === 1202128172) { //Safe right back
						setTimeout(Saferightback, 6000, 559);
					} else if (event.skill === 1202129172) { //Safe right back
						setTimeout(Saferightback, 6000, 559);
					} else if (event.skill === 1202128159) { //Safe right front
						setTimeout(Saferightfront, 6000, 559);
					} else if (event.skill === 1202129159) { //Safe right front
						setTimeout(Saferightfront, 6000, 559);
					} else if (event.skill === 1202128173) { //Safe left back
						setTimeout(Safeleftback, 6000, 559);
					} else if (event.skill === 1202129173) { //Safe left back
						setTimeout(Safeleftback, 6000, 559);
					} else if (event.skill === 1202128166) { //Safe left front
						setTimeout(Safeleftfront, 6000, 559);
					} else if (event.skill === 1202129166) { //Safe left front
						setTimeout(Safeleftfront, 6000, 559);
					} else if (event.skill === 1202128169) { //Safe back left
						setTimeout(Safebackleft, 6000, 559);
					} else if (event.skill === 1202129169) { //Safe back left
						setTimeout(Safebackleft, 6000, 559);
					} else if (event.skill === 1202128164) { //Safe back right
						setTimeout(Safebackright, 6000, 559);
					} else if (event.skill === 1202129164) { //Safe back right
						setTimeout(Safebackright, 6000, 559);
					}
				if(event.skill === 1202128157)
				{
					setTimeout(function(){
						sendMessage('JUMP!');
					}, 12000);
					if (enabletp) {
					setTimeout(function(){
					location.z1 += 1400;
					dispatch.toServer('C_PLAYER_LOCATION', 1, location);
					dispatch.toClient('S_SPAWN_ME', 1, {
					target: cid,
					x: location.x1,
					y: location.y1,
					z: location.z1,
					alive: 1,
					unk: 0
					});
					}, 13500);
					}
				}
			} else if (whichboss === 2) {
					if (SecondBossActionsHM[event.skill]) {
						sendMessage(SecondBossActionsHM[event.skill].msg);
					}
					if(isTank)
					{
						if (SecondBossActionsTankHM[event.skill]) {
						sendMessage(SecondBossActionsTankHM[event.skill].msg);
						}
					}
			} else if (whichboss === 3) {
					if (ThirdBossActionsHM[event.skill]) {
						sendMessage(ThirdBossActionsHM[event.skill].msg);
					}
					if(isTank)
					{
						if (ThirdBossActionsTankHM[event.skill]) {
						sendMessage(ThirdBossActionsTankHM[event.skill].msg);
						}
					}
					if(event.skill === 1202128153) {
						setTimeout(function(){
							sendMessage(firstskill + ' + ' + secondskill);
							if(isInv = 0) {
								firstskill = secondskill;
								secondskill = 0;
							} else if (isInv = 1) {
								secondskill = firstskill;
								firstskill = 0;
							}
							setTimeout(function(){
							sendMessage('Next: '  + firstskill + ' + ' + secondskill);
							}, 6500);
						}, 500);
					}
			} else return;
		}
		} else if (event.stage === 3) {
			if(whichmode != 0 && whichboss === 3) {
				if(event.skill === 1189020764 || event.skill === 1189021764 || event.skill === 1189020767 || event.skill === 1189021767) {
					ThirdBossRight(559);
				} else if (event.skill === 1189020765 || event.skill === 1189021765 || event.skill === 1189020766 || event.skill === 1189021766) {
					ThirdBossLeft(559);
				} else if(event.skill === 1202127964 || event.skill === 1202128964 || event.skill === 1202127967 || event.skill === 1202128967) {
					ThirdBossRight(559);
				} else if (event.skill === 1202127965 || event.skill === 1202128965 || event.skill === 1202127966 || event.skill === 1202128966) {
					ThirdBossLeft(559);
				}
			}
		}
		}
		
	})
	 
	 function sendMessage(msg) {
			if (sendToParty) {
			dispatch.toServer('C_CHAT', 1, {
				channel: 21, //21 = p-notice, 1 = party
				message: msg
			});
		} else {
			dispatch.toClient('S_CHAT', 1, {
				channel: 21, //21 = p-notice, 1 = party
				authorName: 'DG-Guide',
				message: msg
			});
		}
	
	}
	function systemMessage(msg) {
			dispatch.toClient('S_CHAT', 1, {
				channel: 24, //system channel
				authorName: '',
				message: ' (Dungeon Guide) ' + msg
			});
	}

	function toggleModule() {
		enabled = !enabled;
		systemMessage((enabled ? 'enabled' : 'disabled'));
	}

	function toggleSentMessages() {
		sendToParty = !sendToParty;
		systemMessage((sendToParty ? 'Messages will be sent to the party' : 'Only you will see messages'));
	}	
	
	function togglebombTP() {
		enablebombtp = !enablebombtp;
		systemMessage((enablebombtp ? 'Bomb TP Enabled' : 'Bomb TP Disabled'));
	}
	
	function togglerocketTP() {
		enabletp = !enabletp;
		systemMessage((enabletp ? 'Rocket TP Enabled' : 'Rocket TP Disabled'));
	}
	
	function toggletank() {
		isTank = !isTank;
		systemMessage((isTank ? 'Tank Enabled' : 'Tank Disabled'));
	}
	
	function dungeonmode() {
		if(whichmode === 1) mode = 'NORMAL MODE'
		else if(whichmode === 2) mode = 'HARD MODE'
	}
	
	function initialize() {
		enabled = true;
		sendToParty = false;
		enablebombtp = false;
		enabletp = false;
		firstskill = 0;
		secondskill = 0;
		isInv = 0;
	}		
	
	function SpawnThing(position,item){
		dispatch.toClient('S_SPAWN_COLLECTION', 1, {
			uid : uid,
			item : item,
			amount : 1,
			x : position.x,
			y : position.y,
			z : bossCurLocation.z,
			unk1 : 0,
			unk2 : 0
		});
		setTimeout(Despawn, time,uid)
		uid--;
	}
	
	function SpawnThing2(position,item){
		dispatch.toClient('S_SPAWN_COLLECTION', 1, {
			uid : uid,
			item : item,
			amount : 1,
			x : position.x,
			y : position.y,
			z : bossCurLocation.z,
			unk1 : 0,
			unk2 : 0
		});
		setTimeout(Despawn, 3000,uid)
		uid--;
	}
	
	function Despawn(uid){
	dispatch.toClient('S_DESPAWN_COLLECTION', 1, {
			uid : uid,
			unk : 0
		});
	}
	
	function SpawnLoc(degrees, radius) {
	let r = null, rads = null, finalrad = null, spawnx = null, spawny = null, pos = null;
	r = (bossCurLocation.w / 0x8000) * Math.PI;
	rads = (degrees * Math.PI/180);
	finalrad = r - rads;
	spawnx = bossCurLocation.x + radius * Math.cos(finalrad);
    spawny = bossCurLocation.y + radius * Math.sin(finalrad);
	pos = {x:spawnx,y:spawny};
		return pos;
	}
	
	function Safefrontright(item){
		SpawnThing(SpawnLoc(338,330),item);
	}
	function Safefrontleft(item){
		SpawnThing(SpawnLoc(23,330),item);
	}
	function Safebackright(item){
		SpawnThing(SpawnLoc(203,330),item);
	}
	function Safebackleft(item){
		SpawnThing(SpawnLoc(158,330),item);
	}
	function Saferightfront(item){
		SpawnThing(SpawnLoc(293,330),item);
	}
	function Saferightback(item){
		SpawnThing(SpawnLoc(248,330),item);
	}
	function Safeleftfront(item){
		SpawnThing(SpawnLoc(68,330),item);
	}
	function Safeleftback(item){
		SpawnThing(SpawnLoc(113,330),item);
	}
	function ThirdBossLeft(item){
		SpawnThing2(SpawnLoc(170,200),item);
		SpawnThing2(SpawnLoc(350,200),item);
	}
	function ThirdBossRight(item){
		SpawnThing2(SpawnLoc(190,200),item);
		SpawnThing2(SpawnLoc(10,200),item);
	}
}