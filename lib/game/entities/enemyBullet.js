ig.module (
	'game.entities.enemyBullet'
)

.requires (
	'game.entities.enemyShips'
)

.defines( function() {
		
		EntityEnemyBullet = ig.Entity.extend({
		
		size: { x: 34, y: 26 },
        offset: {x: 2, y: 2},
        animSheet: new ig.AnimationSheet( 'media/use/ship_1_canon.png', 34, 26 ),
        gravityFactor: 0,
        damagePts: 0,
 
        //setup collision detection
         type: ig.Entity.TYPE.B, //if you want our bullet to collide with enemy bullet
        //type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        maxVel: { x: 150, y: 200 },

        init: function(x, y, settings) {

            this.parent( x + ( settings.flip ? -4 : 7), y, settings );
            this.vel.x = ( settings.flip ? -this.maxVel.x : this.maxVel.x );
            this.vel.y = -(150 + (Math.random() * 100));

            // ig.game.bulletCount++;
           
            // EntityPlayer)[0] is our player
            var Eplayer = ig.game.getEntitiesByType(EntityPlayer)[0];

            if( Eplayer == undefined ) {
                console.log("Eplayer is undefined!");
            }
            else if( Eplayer != undefined ){

                if( Eplayer.pos.x > 320 )
                {
                    this.parent( x + ( settings.flip ? 7 : -4), y, settings );
                    this.vel.x = this.maxVel.x ;
                    this.vel.y = -(150 + (Math.random() * 100));
                    this.flip = false;
                }
                else
                {
                    this.parent( x + ( settings.flip ? -4 : 7), y, settings );
                    this.vel.x =  -this.maxVel.x ;
                    this.vel.y = -(150 + (Math.random() * 100));
                    this.flip = true;
                }      
            }          
                        
            this.addAnim( 'idle', 0.2, [0,1] );
        },

        update: function() {

            var player = ig.game.getEntitiesByType(EntityPlayer)[0];     

            if( this.isOutOfBounds() )
            {
                this.kill();
            } 

            this.currentAnim.flip.x = this.flip;
            this.parent();
        },

        handleMovementTrace: function( res ){
             this.parent( res );
            // if( res.collision.x || res.collision.y ) {
            //     //only bounce 3x
            //    this.kill();
            // }
        },

        check( other ) {
            other.receiveDamage( this.damagePts, this);

             var player = ig.game.getEntitiesByType(EntityPlayer)[0];

             // typeof player != "undefined"  or player != null
            if( player ) {
                var x = player.pos.x - (160 - player.animSheet.width) / 2;
                var y = ( player.pos.y - (120 - player.animSheet.height) - 10) ; // -10: little adjustment                


                ig.game.spawnEntity(EntityEnemyCannonExplosion, x, y);
            }        
            else {
                console.log("player is undefined")
            }

            this.kill();  
        },          

        kill: function(){
                    
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

}) // defines