let pic_ex_tower01 = new Image();
pic_ex_tower01.src = "resources/ex_tower01.png";
function ex_tower01() /* Advance Attack towee */
{
	var ret = new Tower(pic_ex_tower01, 20, 40, 30, 150);
	return ret;
}

let pic_ex_tower02 = new Image();
pic_ex_tower02.src = "resources/ex_tower02.png";
function ex_tower02() /* Advanced Magic tower */
{
	let ret = new Tower(pic_ex_tower02, 50, 5, 29, 300);
	ret.skills.push(function (type, obj){ /* Slow down ! */
		if (type == 1)
		{
			for (let e of enemies)
			{
				if (Math.pow(obj.x - e.x, 2) + Math.pow(obj.y - e.y, 2) <= Math.pow(obj.range, 2))
				{
					if (e.slowed == true) continue;
					e.speed *= 0.5;
					e.slowed = true;
					window.setTimeout(function(obj, val){
						obj.speed += val;
						obj.slowed = false;
					}, 3000, e, e.speed);
					break;
				}
			}
		}
	});
	return ret;
}

let pic_ex_tower03 = new Image();
pic_ex_tower03.src = "resources/ex_tower03.png";
function ex_tower03() /* More Advance Attack towee */
{
	var ret = new Tower(pic_ex_tower03, 18, 60, 35, 250);
	return ret;
}

/* load map & set initial money */
function ex_main()
{
	loaded_map = new Map(9,7,[[map_empty, map_path, map_path, map_frontline, map_path, map_path, map_empty],[map_empty, map_path, map_empty, map_path, map_empty, map_path, map_empty],[map_tower, map_path, map_tower, map_path, map_tower, map_path, map_tower],[map_tower, map_path, map_tower, map_path, map_tower, map_path, map_tower],[map_empty, map_path, map_empty, map_path, map_empty, map_path, map_empty],[map_tower, map_path, map_tower, map_path, map_tower, map_path, map_tower],[map_tower, map_path, map_tower, map_path, map_tower, map_path, map_tower],[map_empty, map_path, map_empty, map_path, map_empty, map_path, map_empty],[map_empty, map_path, map_path, map_base, map_path, map_path, map_empty]]);
	loaded_map.init();
	money = 300;
}

/* build towers provided by ex.js */
function ex_build(str, X, Y)
{
	var t;
	switch (str)
	{
		case "03":
			t = new ex_tower01();
			break;
		case "04":
			t = new ex_tower02();
			break;
		case "05":
			t = new ex_tower03();
			break;
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
	for (let i = 0;i < Math.pow(2, round - 1);i++)
	{
		window.setTimeout(function(){
			var e = new enemy01();
			e.HP = Math.round(e.HP * (1 + Math.random() * Math.floor(round / 2)));
			e.init();
			e.activate();
			enemies.push(e);
		}, i * 200);
	}
}
