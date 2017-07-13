ig.module (
    'game.entities.playerBullet'
)

.requires (    
     'game.entities.player'
)

.defines(function(){

     EntityBullet = ig.Entity.extend({
            size: { x: 12, y: 12},
            offset: {x: 2, y: 2},
            animSheet: new ig.AnimationSheet( 'media/use/canon_ball.png', 12, 12 ),
            sndExplode: new ig.Sound('media/use/sounds/CannonExplode.ogg'),
            gravityFactor: 1,
            maxVel: { x: 600, y:400 },
            vel: { x:100, y:-200 },

            randomVelY: null,

            //setup collision detection
            type: ig.Entity.NONE,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.PASSIVE,

            //enable our grenade nto move and bounce 
           
            // bounciness: .6,
            // bounceCounter: 0,

            init: function(x, y, settings) {
                this.parent( x + ( settings.flip ? -4 : 7), y, settings );

                if( ig.game.muzzleVelocity ) {                    
                    var currentVelocity = this.vel.x + ig.game.muzzleVelocity;

                    this.vel.x = ( settings.flip ? -currentVelocity : currentVelocity);
                } 
                else { 
                    this.vel.x = ( settings.flip ? -this.vel.x : this.vel.x );
                }

                if( this.randomVelY != null) //if true, means special weapon was activated
                {
                    this.vel.y = -this.randomVelY; 
                    this.vel.x = ( settings.flip ? -10 : 10 );
                }

                this.addAnim( 'idle', 0.2, [0,1] );

                ig.game.bulletCount++;                    

            },


            update: function() {

                if( this.isOutOfBounds() ) { this.kill(); }

                this.parent();
            },

            handleMovementTrace: function( res ){
                this.parent( res );
                if( res.collision.x || res.collision.y ) {
                   this.kill();
                }
            },

            check( other ) {
                other.receiveDamage( 10, this);
                
                //explode if an enemyship is hit
                this.sndExplode.play();

                this.kill();
            },

             kill: function(){
               ig.game.spawnEntity(EntityCannonExplosion, this.pos.x-55, this.pos.y-75);
                   ig.game.bulletDestroyed++;
                this.parent();
            },

             isOutOfBounds: function() {
                //check if bullets are out of bounds
                if( this.pos.x > ig.system.width  || this.pos.x < 0 ||                 
                    this.pos.y > ig.system.height || this.pos.y < 0)
                {
                    return true;
                }
                else 
                {
                    false;
                }
            }

        });   

        EntityCannonExplosion = ig.Entity.extend({
            size: {x: 160, y: 120},
            maxVel: {x: 160, y: 200},
            lifetime: .6,
            fadetime: 1,

            animSheet: new ig.AnimationSheet( 'media/use/explosion.png', 160, 120 ),

            gravityFactor: 0,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
     
                this.idleTimer = new ig.Timer();
     
                this.addAnim( 'idle', .1, [0,1,2,3,4,5] );

            },


            update: function() {
                 if( this.idleTimer.delta() > this.lifetime ) {
                     this.kill();
                     return;
                 }
                
                this.parent();
            },
        }); 

        EntityEnemyCannonExplosion =  EntityCannonExplosion.extend({

            animSheet: new ig.AnimationSheet( 'media/use/explosion2.png', 160, 120 ),

        })
	
});




