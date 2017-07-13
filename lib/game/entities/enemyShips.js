ig.module (
    'game.entities.enemyShips'
)

.requires (
    // 'impact.entity',
    'game.entities.island',
    'game.entities.player'

)

.defines(function(){
    EntityEnemyShips = ig.Entity.extend({      

        sndExplode: new ig.Sound('media/use/sounds/ShipExplodes.ogg'),

        bulletType: null,
        animSheet: null,
        size: { x: 50, y: 36 },
        // offset: {x: 4, y: 2},
        maxVel: { x: 800, y: 800 },
        flip: false,
        friction: { x: 150, y: 0 },
        gravityFactor: 0,
        speed: 10,
        reloadSpeed: 2,
        dmg: 0,
        health: 10,

        //for collision detection
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE, 
           
        init: function( x, y, settings ){
            this.parent( x, y, settings );
            this.addAnim('normal', .1, [0]);     

            this.fireTimer = new ig.Timer();     
            this.sndExplode.volume = 10;  
        },

        update: function() {                      

            if( this.pos.x > 640+180 || this.pos.x < -180 ) {
                 console.log( "ship pos.x" + this.pos.x );
            }      
     
            this.checkFlip(); //flip if should filp

             //ship movement and flipping
            var xdir = this.flip ? -1 : 1;

            // // this.speed depends on the ship
            this.vel.x = this.speed * xdir;

            this.currentAnim.flip.x = this.flip;

            //fire every this.reloadSpeed seconds AND ONLY IF bullet is inside the screen
            if ( this.fireTimer.delta() > this.reloadSpeed &&  !this.isOutOfBounds() ) {

                if( this.bulletType === "ShipNormal" ) {
                    ig.game.spawnEntity('EntityEnemyBullet', (this.pos.x + this.size.x/2) - 13, this.pos.y + 10, { flip: this.flip,  damagePts: this.dmg, 
                    animSheet: new ig.AnimationSheet ( 'media/use/ship_1_canon.png', 34, 26) });
                }
                else if( this.bulletType === "ShipHard"){
                    ig.game.spawnEntity('EntityEnemyBullet', (this.pos.x + this.size.x/2) - 13 , this.pos.y + 10, { flip: this.flip,  damagePts: this.dmg, 
                    animSheet: new ig.AnimationSheet ( 'media/use/ship_2_canon.png', 34, 26) });
                } 
                else {
                    ig.game.spawnEntity('EntityEnemyBullet', (this.pos.x + this.size.x/2) - 13, this.pos.y + 10, { flip: this.flip,  damagePts: this.dmg, 
                    animSheet: new ig.AnimationSheet ( 'media/use/ship_3_canon.png', 34, 26) });
                }

                this.fireTimer.reset();
            }      

            this.parent();       
 
        },

        handleMovementTrace: function( res ) {
            this.parent( res );
               //collisin with a wall? return!

            if(res.collision.x) {   
                   //uncomment if i decided to put boundary blocks  
                  // this.flip = !this.flip;               
            }
        },        

        kill: function() {
           if( this.sndExplode ) { this.sndExplode.play(); }
          
           this.parent();
        },      

        checkFlip: function() {

            //check if enemyships are out of bounds and if the ship is facing the direction away from the screen
            if( ( this.pos.x > ig.system.width && this.flip == false )  || ( this.pos.x < 0 && this.flip == true ) ){
                this.flip = !this.flip;
            }                       
        },

        isOutOfBounds: function() {
            //check if ships are out of bounds
            if( this.pos.x > ig.system.width  || this.pos.x < 0 ||                 
                this.pos.y > ig.system.height || this.pos.y < 0)
            {
                return true;
            }
            else 
            {
                false;
            }
        },
        

    });  

       


});




