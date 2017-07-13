ig.module (
    'game.entities.EnemyShipSteel'
)

.requires (    
    'game.entities.enemyShips'
)

.defines(function(){
    EntityEnemyShipSteel = EntityEnemyShips.extend({      

       
    animSheet: new ig.AnimationSheet ( 'media/use/ship_3.png', 50, 36),
    bulletType: "ShipSteel",
    speed: 25,
    health: 30,
    dmg: 30,
    reloadSpeed: 3,

});

});




