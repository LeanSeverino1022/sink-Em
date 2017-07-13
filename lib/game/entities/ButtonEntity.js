// A Button Entity for Impact.js

ig.module( 'game.entities.ButtonEntity' )
.requires(  'game.entities.buttons' )

.defines(function() {

   ButtonEntity = Buttons.extend({
      size: { x: 68, y: 42 },
    
      name: 't',
      text: [],
      textPos: { x: 5, y: 5 },
      textAlign: ig.Font.ALIGN.LEFT,
      flagAnim: null,
    
      font: null,
      animSheet: new ig.AnimationSheet( 'media/use/Button_flags.png', 68, 42 ),   

      init: function( x, y, settings ){
          this.parent(x,y, settings);
          
          this.addAnim( 'idle', 10, [this.flagAnim + 0] );
          this.addAnim( 'active', 10, [this.flagAnim+ 1] );   
      }, 
     
      pressedDown: function() {
         // console.log('pressedDown');
      },

      pressed: function() {
          // console.log('pressed');
      },

      pressedUp: function() {
         // console.log('pressedUp');        
      },      

  }); /*ButtonEntity = Buttons.extend() */

 }); //defines(function()