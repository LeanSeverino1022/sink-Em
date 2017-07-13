ig.module (
    'game.entities.background'
)

.requires (
    'impact.entity'
)

.defines(function(){
    EntityBackground = ig.Entity.extend({      

        animSheet: new ig.AnimationSheet ( 'media/use/game_bg.png', 640, 480),
        
         size: { x: 640, y: 480 },
         _wmScalable: true,
        _wmDrawBox: true,
        gravityFactor: 0,

      init: function( x, y, settings) {
            this.parent( x, y, settings );

            this.addAnim('idle', 1, [0] );
  
            this.currentAnim = this.anims.idle;
        },


        update: function() {                      

   
        this.parent();       
 
        },
        

    });  

});




