/* Example extension file */

let ex_map = new Map(10,7,[[map_empty,map_empty,map_path,map_frontline,map_path,map_empty,map_empty],[map_empty,map_empty,map_path,map_empty,map_path,map_empty,map_empty],[map_path,map_path,map_path,map_tower,map_path,map_path,map_path],[map_path,map_tower,map_empty,map_empty,map_empty,map_tower,map_path],[map_path,map_empty,map_tower,map_empty,map_tower,map_empty,map_path],[map_path,map_path,map_path,map_path,map_path,map_path,map_path],[map_empty,map_tower,map_path,map_tower,map_path,map_tower,map_empty],[map_empty,map_empty,map_path,map_tower,map_path,map_empty,map_empty],[map_empty,map_empty,map_path,map_empty,map_path,map_empty,map_empty],[map_empty,map_empty,map_base,map_empty,map_base,map_empty,map_empty]]);

let pic_ex_enemy01 = new Image();
pic_ex_enemy01.src = "resources/ex_enemy01.png";
function ex_enemy01()
{
	var ret = new Enemy(pic_ex_enemy01, 500, 60, 50);
	return ret;
}

/* load map & set initial money */
function ex_main()
{
	loaded_map = ex_map;
	loaded_map.init();
	money = 600;
}

/* build towers provided by ex.js */
function ex_build(str, X, Y)
{
	var t;
	switch (str)
	{
		/* no ex-tower in this example extension file */
		default:
			alert("不存在 '" + str + "' 类型的塔");
			break;
	}
	if (t !== undefined)
	{
		if (money < t.fee) alert("经济不足");
		else
		{
			money -= t.fee;
			t.init(X, Y);
			towers.push(t);
			if (game_pause == false) t.activate();
		}
	}
}

/* generate enemies for each round */
function gen_enemy()
{
	switch (round)
	{
		case 1:
			window.setTimeout(function(){
				var e = new enemy01();
				e.init();
				e.activate();
				enemies.push(e);
			});
			break;
		case 2:
			window.setTimeout(function(){
				var e = new ex_enemy01();
				e.init();
				e.activate();
				enemies.push(e);
			});
			break;
		case 3:
			for (let i = 0;i < 5;i++) window.setTimeout(function(){
				var e = new enemy01();
				e.init(1);
				e.activate();
				enemies.push(e);
			}, i * 200);
			for (let i = 0;i < 5;i++) window.setTimeout(function(){
				var e = new enemy01();
				e.init(3);
				e.activate();
				enemies.push(e);
			}, i * 200);
			break;
		case 4:
			for (let i = 0;i < 5;i++) window.setTimeout(function(){
				var e = new ex_enemy01();
				e.init(0);
				e.activate();
				enemies.push(e);
			}, i * 200);
			for (let i = 0;i < 5;i++) window.setTimeout(function(){
				var e = new ex_enemy01();
				e.init(2);
				e.activate();
				enemies.push(e);
			}, i * 200);
			break;
		case 5:
			for (let i = 0;i < 20;i++) window.setTimeout(function(){
				var e;
				if (Math.random() < 0.6) e = new enemy01();
				else e = new ex_enemy01();
				e.init();
				e.activate();
				enemies.push(e);
			}, i * 200);
			break;
		case 6:
			for (let i = 0;i < 40;i++) window.setTimeout(function(){
				var e;
				if (Math.random() < 0.7) e = new enemy01();
				else e = new ex_enemy01();
				e.init();
				e.activate();
				enemies.push(e);
			}, i * 200);
			break;
		default:
			if (game_over == false)
			{
				pause_game();
				game_over = true;
				alert("获胜!");
			}
	}
}
