2// document.getElementById("guide").innerHTML = "New text!";

ig.module ( 'game.entities.player')

.requires ( 
    'impact.entity'
)

// 

.defines( function(){

        EntityPlayer = ig.Entity.extend({

            //load 216 * 72 image
            animSheet: new ig.AnimationSheet( 'media/use/player.png', 72, 72 ),
            sound: new ig.Sound('media/use/sounds/fire_cannon.ogg'),
            hitSound: new ig.Sound('media/use/sounds/player_is_hit.ogg'),


            size: { x: 72, y: 72 },
            offset: { x: 0, y: 23 },
            name: 'EntityPlayer',

            //Adding Simple Physics
            mSpeed: 100, 
            accel: {x: 0, y: 0},
            maxVel: {x: 350, y: 150},
            friction: {x:700, y:0},
            accelGround: 100,                              
            gravityFactor: 0,
            zIndex: 1,
            maxHealth: 200,
            health: 100, 

            type: ig.Entity.TYPE.A,
            CheckAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.PASSIVE,          
            mTimer: null,

            mCountry: null,

            init: function( x, y, settings) {
                this.parent( x, y, settings );

                this.addAnim('idle', 1, [0] );

                this.addAnim('fire', .15, [0,1,2,3,] ); 

                this.currentAnim = this.anims.idle; 
                this.mTimer = new ig.Timer();      
                this.mCountry= null;             
            },

            update: function() {
       
                // since can't do this.mCountry = ig.game.mCountry in init(), i'll do it here!
                //for now, works for 1st level only:
                if(!this.mCountry) {
                    this.mCountry = ig.game.mCountry;

                    //china = +speed, Taiwan= +health , Hk + ?
                    if( this.mCountry === "China") {
                        this.mSpeed = this.mSpeed * 2; 
                    }
                    else if( this.mCountry === "Taiwan" ){
                        this.health = this.health + this.health * .50
                    }
                    else { //hk
                        ig.game.numSpecialAttack += 1;
                    }
                }                  

                 //move left or right
                if( ig.input.state('left') && this.pos.x > 0 ) {
                    // this.accel.x = -this.mSpeed;
                     this.vel.x = -this.mSpeed;
                    this.flip = true;
                } else if ( ig.input.state('right') && this.pos.x < (ig.system.width - this.size.x) ) {
                    // this.accel.x = this.mSpeed;
                    this.vel.x = this.mSpeed;
                    this.flip = false;
                } else {
                    this.accel.x = 0;
                }         

                //attack
                if( ig.input.pressed('shoot')) {

                    ig.game.spawnEntity( 'EntityBullet', this.pos.x + this.size.x/2, (this.pos.y - this.offset.y) + 38, { flip: this.flip } );
                    this.currentAnim = this.anims.fire;  
                    this.mTimer.reset();

                    if( this.sound ) { this.sound.play(); }              
                }

                //disable firing animation when it its not actually firing
                if(this.mTimer.delta() > .2 && this.currentAnim == this.anims.fire || ig.input.released( 'shoot') ) {
                    this.currentAnim = this.anims.idle;
                }                  

                //special attack
                if( ig.input.pressed('special')) { 
                    if( ig.game.numSpecialAttack > 0 ) {
                        if( this.sound ) { this.sound.play(); }              

                        for(var offset = -80 ; offset <= 80 ; offset+=20){
                            ig.game.spawnEntity( 'EntityBullet', this.pos.x + this.size.x/2 - offset, this.pos.y + 35, { flip: this.flip, randomVelY: ig.game.seededRandom(400,300) } );
                        }

                        for(var offset = -80 ; offset <= 80 ; offset+=20){
                            ig.game.spawnEntity( 'EntityBullet', this.pos.x + this.size.x/2 - offset, this.pos.y + 35, { flip: this.flip, randomVelY: ig.game.seededRandom(400,300) } );
                        }

                        ig.game.numSpecialAttack -= 1;
                    }
                }                      
           
                this.currentAnim.flip.x = this.flip; 

                this.parent();
            },   

            receiveDamage: function( amount, from ) {
                this.hitSound.play();
                this.health -= amount;
                if( this.health <= 0 ) {  
                     ig.game.gameOver = true;
                }
            },

        });

      

        
});