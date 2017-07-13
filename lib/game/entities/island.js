ig.module (
    'game.entities.island'    
)

.requires (
    'impact.entity'
    // 'impact.animation'
)

.defines(function(){
    EntityIsland = ig.Entity.extend({
        
        animSheet: new ig.AnimationSheet( 'media/use/island.png', 200, 200 ),

        size: {x: 200, y: 200},   

        name: 'EntityIsland',   
        type: ig.Entity.TYPE.NONE,        
        checkAgainst: ig.Entity.TYPE.A, 
        collides: ig.Entity.COLLIDES.PASSIVE,
        _wmScalable: true,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(196, 255, 0, 0.7)',
        // currentAnim: 'empty',
   
        gravityFactor: 0,

        enumAnimation: [ 'full', 'eighty', 'sixty', 'forty', 'twenty' ],
        animation: 'full',

        init: function( x, y, settings ) {
            this.parent(x, y, settings );        

            //add the animations
            this.addAnim( 'full', 1, [0] );
            this.addAnim('eighty', 1, [1] );
            this.addAnim( 'sixty', 1, [2] );
            this.addAnim( 'forty', 1, [3] );  
            this.addAnim( 'twenty' , 1, [4] );

            this.currentAnim = this.anims.full;               
        },  

        update: function() {

              var player = ig.game.getEntitiesByType(EntityPlayer)[0]; // console.log(myPlayer.health)  
              
            if( player !== null ){          
                if( player.health > 80 )                              this.currentAnim = this.anims.full; 
                else if( player.health <= 80 && player.health > 60 )  this.currentAnim = this.anims.eighty;
                else if( player.health <= 60 && player.health > 40 )  this.currentAnim = this.anims.sixty; 
                else if( player.health <= 40 && player.health > 20 )  this.currentAnim = this.anims.forty; 
                else if( player.health <= 20 )                        this.currentAnim = this.anims.twenty; 
            }

            else if(player === null) {
                console.log("player is null??");
            }     

            this.parent();
   
        },   

    });       

});




