ig.module( 'game.levels.sample' )
.requires( 'impact.image','game.entities.background','game.entities.EnemyShipNormal','game.entities.island','game.entities.EnemyShipHard','game.entities.EnemyShipSteel','game.entities.player' )
.defines(function(){
LevelSample=/*JSON[*/{
	"entities": [
		{
			"type": "EntityBackground",
			"x": 0,
			"y": 0
		},
		{
			"type": "EntityEnemyShipNormal",
			"x": -80,
			"y": 384
		},
		{
			"type": "EntityIsland",
			"x": 216,
			"y": 16
		},
		{
			"type": "EntityEnemyShipHard",
			"x": -124,
			"y": 312
		},
		{
			"type": "EntityEnemyShipSteel",
			"x": 336,
			"y": 332
		},
		{
			"type": "EntityPlayer",
			"x": 72,
			"y": 128
		}
	],
	"layer": [
		{
			"name": "collision",
			"width": 16,
			"height": 12,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 40,
			"foreground": false,
			"data": [
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			]
		},
		{
			"name": "main",
			"width": 16,
			"height": 12,
			"linkWithCollision": false,
			"visible": 0,
			"tilesetName": "media/use/tileset.png",
			"repeat": false,
			"preRender": true,
			"distance": "1",
			"tilesize": 40,
			"foreground": false,
			"data": [
				[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
LevelSampleResources=[new ig.Image('media/use/tileset.png')];
});