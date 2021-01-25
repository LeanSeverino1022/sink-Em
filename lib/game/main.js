window.gShowOnlyForMobileMsg = false;

ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.sample',
	'game.entities.island',
	'game.entities.player',
	'game.entities.ButtonEntity',
	'game.entities.playerBullet',
	'game.entities.enemyBullet',
	'game.entities.enemyShips',
	'game.entities.EnemyShipSteel',
	'game.entities.EnemyShipHard'

)
.defines(function(){

gCountrySelected = "";
gIsGameBeat: false,


MyGame = ig.Game.extend({
	
	// Load a font
	message: [
	"Special Used Already", //0
	"Max MuzzleVelocity reached!", //1
	"Minimum MuzzleVelocity reached!" //2

	],

	font: new ig.Font( 'media/h30.font.png'),
	background: new ig.Image('media/use/title_screen_bg.png'),
	blankBG: new ig.Image('media/use/blankBG.png'),

	imgMuzzleVelocity: new ig.Image('media/use/muzzleVelocity.png'),
    imgMuzzleVelocityBar: new ig.Image('media/use/muzzleVelocityBar.png'),

	HPicon: new ig.Image('media/use/hp_icon.png'),	

	gravity: 500,
	seed: 0,
	mCountry: null,

	Level: 1,
	ShipsList: ['EntityEnemyShipNormal', 'EntityEnemyShipHard', 'EntityEnemyShipSteel'],   

	listHTML: '',
	randomTestingHTML: '',

	muzzleVelocity: 50,//added velocity to playerBullet's notmal vel.x

	levelBreak: false,
	gamePaused: false,	
	showInstructions: false, // select screen popup	

    numSpecialAttack: 1,
    gameOver: false,
   	
	spawnTimer: null,
	init: function() {	

		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.SPACE, 'shoot' );
		ig.input.bind( ig.KEY.ESC, 'pause' );
		ig.input.bind( ig.KEY.S, 'special' );

		// debug keys
		ig.input.bind( ig.KEY._1, 'key1' );
		ig.input.bind( ig.KEY._2, 'key2' );
		ig.input.bind( ig.KEY._3, 'key3' );
		ig.input.bind( ig.KEY._4, 'key4' );
		ig.input.bind( ig.KEY._5, 'key5' );

		this.loadLevel(LevelSample); /*from LevelSample=JSON[*/	

		this.breakTimer = new ig.Timer();
		this.spawnTimer = new ig.Timer();

		ig.music.add('media/use/sounds/inGameMsc.ogg', 'inGame');
		ig.music.play('inGame');

		this.mCountry = gCountrySelected;
		this.gameOver = false;

		this.levelBreak = false;
		this.gamePaused = false;	
		this.showInstructions = false;

		gIsGameBeat = false;
	},
	
	update: function() {
		if(!this.gameOver) {

			this.listHTML =
			"<p> country selected: " + this.getEntitiesByType(EntityPlayer)[0].mCountry + "</p>" +
			"<p> player speed: " + this.getEntitiesByType(EntityPlayer)[0].mSpeed + "</p>" +
			"<p> player health: " + this.getEntitiesByType(EntityPlayer)[0].health + "</p>" +
			// "<p> country selected: " + this.getEntitiesByType(EntityPlayer)[0].mCountry + "</p>" +
	 		"<p>this.getEntitiesByType(EntityEnemyShips).length : " +   this.getEntitiesByType(EntityEnemyShips).length + "</p>" +
	 		"<p>Player Bullets created: " + this.getEntitiesByType(EntityBullet).length + "</p>" +
			 "<p> muzzleVelocity: " + this.muzzleVelocity + "</p>" +
			"<p> seed: " + this.seed + "</p>" +
			"<p> num of special attacks: " + this.numSpecialAttack+ "</p>";


			if( ig.input.pressed('key3') ) {   
	               this.print();            
	         }	      
		
			// muzzleVelocity stuff
			if( ig.input.state('up') ) {			
				this.muzzleVelocity < 300 ?  this.muzzleVelocity += 4 : console.log(ig.game.message[1]);
			}	

			if( ig.input.state('down') ) {			
				this.muzzleVelocity > 0 ?  this.muzzleVelocity -= 4 : console.log(ig.game.message[2]);
			}	


			/*********************
				Level 1 - 6
			*********************/

			this.isLvlClear( 1, 4); // pass level 1; spawn 4 ships for level 2 
			this.isLvlClear( 2, 9);
			this.isLvlClear( 3, 12);
			this.isLvlClear( 4, 15);
			this.isLvlClear( 5, 18);
			this.isLvlClear( 6, 21); // pass level 6; spawn 21 ships for level 7

						
			/*********************
				Level 7 clear : 
			*********************/

			if( this.Level === 7 && ig.game.getEntitiesByType(EntityEnemyShips).length <= 0 || ig.input.pressed('key5') ) {
				document.getElementById("guide").innerHTML = "WINNER! You passed all levels! ";
			
				ig.music.stop();
				ig.system.setGame(GameOverScreen);
				gIsGameBeat = true;
			}
					
			if(this.levelBreak)
			{
				this.gamePaused = true;

				if(this.breakTimer.delta() > 2) {
					this.levelBreak = false;
					this.gamePaused = false;	
				}				
		    }
		} // this.gameover

		else if(this.gameOver) {
			ig.system.setGame(GameOverScreen);
			ig.music.stop();
 
		}

		if(ig.input.pressed('pause') ) {
			this.gamePaused = !this.gamePaused; //switch on/off  
		}

	 	if( !this.gamePaused ) {
			this.parent();
        }

	},

	draw: function() {

		// Draw all entities and backgroundMaps
		
		this.background.draw ( 0 , 0, -1, -1, 640, 480);
		this.parent();

		var playerPos = { 
			x: this.getEntitiesByType(EntityPlayer)[0].pos.x , 
			y: this.getEntitiesByType(EntityPlayer)[0].pos.y 
		};

		this.imgMuzzleVelocityBar.draw(playerPos.x - 11, playerPos.y - 23);
		this.imgMuzzleVelocity.draw(playerPos.x - 11, playerPos.y - 23, 0, 0, this.muzzleVelocity * (this.imgMuzzleVelocityBar.width / 300) + 1,20 ); //300 = max MuzzleVelocity


		if(this.levelBreak)
		{	
			var passedLevel = this.Level - 1;
			this.blankBG.draw( 45 , 10);

			text = 'LEVEL ' + passedLevel + ' complete! \n Get ready for the next level!'
			this.font.draw( text, 90, 150, ig.Font.ALIGN.LEFT );			
		}
		else {
			 this.renderHUD(); 		
		}

	},

	spawnShips: function(numShips) {
	
		//any seed value is ok(even 0), doesn't matter as long as its != undefined - 			
		//https://jsfiddle.net/puyih88/oupcdc2m/1/
		this.seed = Math.random() * 10; 	

		var screenOffsetX = 220; // 220 max outside distance from the screen...

		var startPosY = [320, 370, 420];	

		this.randomTestingHTML += "<p>"

		for( var count = 0, index = 0; count < numShips; count++, index++) 
		{
			startPosX = this.seededRandom(1,0) * screenOffsetX + ig.system.width;

			//each batch has 6 ships, we don't want them to load at altogether at the same locatione.  this makes level difficult to pass even w/ special
	
			for( var x = 5, y = 1 ; y <= 3; x+=6, y++ ) { 
				if( count > x && count <= x+6) { //6-11, 12-17, 18-23 6 ships/batch
					startPosX = this.seededRandom(1,0) * screenOffsetX + ig.system.width + 270 * y; 
				} 
			}		
			

			if(index >= this.ShipsList.length) //startposy also 3 values so i'll just use this
			{
				index = 0;
			}		

			// load enemyship from  or right...
			if( count % 2 === 0 ) 
			{ 
				//left
				ig.game.spawnEntity( this.ShipsList.random(), -startPosX + ig.system.width, startPosY[index]); 

				// Array.random() Returns a random element from an array. : http://impactjs.com/documentation/class-reference/ig-core
			} 
			else if ( count % 2 !== 0 ) 
			{
				//right
				ig.game.spawnEntity( this.ShipsList.random(), startPosX, startPosY[index]);
			}
		}

		 this.randomTestingHTML += "<p>"	
		 document.getElementById("guide").innerHTML = this.randomTestingHTML;
		
		
		
	},

	renderHUD: function() {

		this.HPicon.draw( ig.system.width - this.HPicon.width - 100, 10); 
	
		this.font.draw(' = ' + ig.game.getEntityByName('EntityPlayer').health, 
		ig.system.width - this.HPicon.width - 60 , 8, ig.Font.ALIGN.LEFT );

		this.font.draw('Level: ' + this.Level, 305, 10 );
		this.font.draw('Special Atck: ' + this.numSpecialAttack, 5, 10);

		this.font.draw('Enemies left: ' + this.getEntitiesByType(EntityEnemyShips).length, 5, 35);
		this.font.draw('Country: ' + this.getEntitiesByType(EntityPlayer)[0].mCountry, 305, 440);

		if( this.gamePaused ) {
			this.font.draw("GAME PAUSED! ESC key to resume game.", 10, 240);
			
		}

	},

	seededRandom: function(max, min) {
    	// in order to work 'this.seed' must NOT be undefined,
		// so in any case, you HAVE to provide a this.seed
		max = max || 1;
   		min = min || 0;

   	 	this.seed = (this.seed * 9301 + 49297) % 233280;
    	var rnd = this.seed / 233280;

	    return min + rnd * (max - min);
	},

	isLvlClear: function( level, numShipsToSpawn ) {		

		if(this.Level == level && ig.game.getEntitiesByType(EntityEnemyShips).length <= 0 ) {

			document.getElementById("guide").innerHTML = "LEVEL " + level + "complete! WOW!";
			this.levelBreak = true;
			this.breakTimer.reset();

			this.spawnShips( numShipsToSpawn );		

			this.Level += 1;

			//reset some values
			ig.game.getEntitiesByType(EntityPlayer)[0].health = 100;
			this.numSpecialAttack = 1;

			if( ig.game.getEntitiesByType(EntityPlayer)[0].mCountry === "Hongkong" ){
			 	this.numSpecialAttack = this.numSpecialAttack + 1;
			}

			if( ig.game.getEntitiesByType(EntityPlayer)[0].mCountry === "Taiwan" ){
			 	ig.game.getEntitiesByType(EntityPlayer)[0].health = ig.game.getEntitiesByType(EntityPlayer)[0].health * 1.5;
			}
		}		
	},		
	

 print: function( ){
	document.getElementById("log").innerHTML = this.listHTML;            	
},


});




StartScreen = ig.Game.extend({

	instructText: new ig.Font('media/04b03.font.png'),
	background: new ig.Image('media/use/title_screen_bg.png'),
	title: new ig.Image('media/use/title.png'),

	init: function() {
		ig.input.bind( ig.KEY.SPACE, 'start');
	},


	update: function() {
		if( ig.input.pressed('start') ) {
			ig.system.setGame(SelectTeamScreen);
		}
		this.parent();
	},


	draw: function() {
		this.parent();
		
		this.background.draw(0,0);
		this.title.draw(0, 0);	
	},

});


GameOverScreen = ig.Game.extend({

	instructText: new ig.Font('media/h30.font.png'),
	title: new ig.Image('media/use/title.png'),
	seed: 1,
	currentClearColor: null,   

	init: function() {
		ig.input.bind( ig.KEY.R, 'restart');

		this.currentClearColor = ig.game.clearColor;

		ig.game.clearColor = 'white';	

		gFont = new ig.Font('media/h30.font.png');
	},

	update: function() {
		if( ig.input.pressed('restart') ) {			
			
			ig.game.clearColor = this.currentClearColor;

			ig.system.setGame(SelectTeamScreen);
		}

		this.parent();
	},

	

	random: function() {
    	var x = Math.sin(this.seed++) * 10000;
    	return x - Math.floor(x);
	},

	draw: function() {
		
		this.parent();		

		var x = ( ( ig.system.width - this.title.width ) / 2);

		this.title.draw( x, 0);		


		if( gIsGameBeat ) {
			this.instructText.draw( "You're a WINNER!! \nPress \'R\' key to play again!", 320, 200, ig.Font.ALIGN.CENTER );
		}
		else {
			this.instructText.draw( "GAME OVER \nPress \'R\' key to play again!", 320, 200, ig.Font.ALIGN.CENTER );
		}
		// this.instructText.draw( '', 320, 300, ig.Font.ALIGN.CENTER );			
	},

});


SelectTeamScreen = ig.Game.extend({

	popUp: new ig.Image('media/use/instructions.jpg'),
	font: new ig.Font('media/04b03.font.png'),
	
	flagEnum: { China: 0, Hongkong: 3, Taiwan: 6},
	showInstructions: false,

	init: function() {
		ig.input.bind( ig.KEY.MOUSE1, 'click');

		ig.game.spawnEntity( 'ButtonEntity', 291, 73, { 
			flagAnim: this.flagEnum.China,
			pressedUp() {
        		ig.game.showInstructions = true;
        		gCountrySelected = "China";   
			} 
		} );

		ig.game.spawnEntity( 'ButtonEntity', 291, 205, { 
			flagAnim: this.flagEnum.Hongkong,
			pressedUp() {
       		 	ig.game.showInstructions = true;        
        		gCountrySelected = "Hongkong";        	  
      		} 
		} );

		ig.game.spawnEntity( 'ButtonEntity', 291, 335, { 
			flagAnim: this.flagEnum.Taiwan, 
			pressedUp() {
         		ig.game.showInstructions = true;
        		gCountrySelected = "Taiwan";  				            
			} 
		} );
		
		ig.input.bind( ig.KEY.SPACE, 'PlayGame' );
	},

	update: function() {
		ig.game.clearColor ="#ffffff";
		// this.font.height = 30;
		this.parent();

		if( ig.game.showInstructions ) {

			for(var i = 0; i <ig.game.getEntitiesByType('Buttons').length; i++) {
				ig.game.getEntitiesByType('Buttons')[i].currentAnim.alpha = 0;
			}

			if( ig.input.pressed('PlayGame') ) {
				ig.system.setGame( MyGame ); 
				ig.game.showInstructions = false;
			}
		}	
		
	},

	draw: function() {
		// this.background.draw(0, 0);
		this.parent();			

		if( ig.game.showInstructions ) { 
			this.popUp.draw(0, 0);
			
		} 
		else if(!ig.game.showInstructions) {
			this.font.draw("Choose a Country!",235, 10);		
			this.font.draw("CHINA: Extra speed! Speed is twice as fast as normal ", 55, 120);		
			this.font.draw("Hong Kong: You get 1 additional special attack per level!", 50, 260);
			this.font.draw("TAIWAN:Extra HP! HP is 50% more than normal ", 90, 390);
		}

	},

});

// Start the Game with 60fps, a resolution of 320x240, 

if( ig.ua.mobile) {

	//if device is mobile, disable  sound  because it causes issues onload on mobile devices
	ig.Sound.enabled = false;

	//show message "game not playable on mobile" and hide the controls ui
	document.querySelector('.onlyForDesktopMsg').classList.toggle('hidden', false)
	document.querySelector('.game-controls-guide').classList.toggle('hidden', true)

	
}

ig.main( '#canvas', SelectTeamScreen, 60, 640, 480, 1);

});

window.addEventListener('DOMContentLoaded', _=> {
	
	

})




