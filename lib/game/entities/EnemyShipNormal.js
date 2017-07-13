ig.module (
    'game.entities.EnemyShipNormal'
)

.requires (    
    'game.entities.enemyShips'
)

.defines(function(){
    EntityEnemyShipNormal= EntityEnemyShips.extend({      

       
    animSheet: new ig.AnimationSheet ( 'media/use/ship_1.png', 50, 36),

    bulletType: "ShipNormal",
    speed:55,   
    health: 10, 
    dmg: 10,
    reloadSpeed: 2,



});

});




