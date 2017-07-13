ig.module (
    'game.entities.EnemyShipHard'
)

.requires (    
    'game.entities.enemyShips'
)

.defines(function(){
    EntityEnemyShipHard = EntityEnemyShips.extend({      

       
    animSheet: new ig.AnimationSheet ( 'media/use/ship_2.png', 50, 36),
    bulletType: "ShipHard",
  	speed: 40,   
  	health: 20,
  	dmg: 20,
    reloadSpeed: 2.5,



	})
	
});




