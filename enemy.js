function Enemy(icon, HP, speed, reward, skills = [])
{
	this.icon = icon;
	this.HP = HP;
	this.speed = speed;
	this.reward = reward;
	this.skills = skills;
	this.way;
	this.__which;
	this.x;
	this.y;
	this.active = false;
	this.timeoutID;

	this.init = function(way = Math.floor(Math.random() * loaded_map.paths.length))
	{
		this.way = way;
		this.__which = 1;
		this.x = loaded_map.paths[this.way][0][0] * loaded_map.logical_size + Math.floor(loaded_map.logical_size / 2);
		this.y = loaded_map.paths[this.way][0][1] * loaded_map.logical_size + Math.floor(loaded_map.logical_size / 2);
	}

	this.activate = function()
	{
		this.timeoutID = window.setTimeout(this.action, 1000 / this.speed, this);
		this.active = true;
	}

	this.deactivate = function()
	{
		this.active = false;
		window.clearTimeout(this.timeoutID);
	}

	this.action = function(obj = this)
	{
		for (let s of obj.skills) s(1, obj);
		if (obj.x < loaded_map.paths[obj.way][obj.__which][0] * loaded_map.logical_size + Math.floor(loaded_map.logical_size / 2)) obj.x++;
		if (obj.x > loaded_map.paths[obj.way][obj.__which][0] * loaded_map.logical_size + Math.floor(loaded_map.logical_size / 2)) obj.x--;
		if (obj.y < loaded_map.paths[obj.way][obj.__which][1] * loaded_map.logical_size + Math.floor(loaded_map.logical_size / 2)) obj.y++;
		if (obj.y > loaded_map.paths[obj.way][obj.__which][1] * loaded_map.logical_size + Math.floor(loaded_map.logical_size / 2)) obj.y--;
		if (obj.x == loaded_map.paths[obj.way][obj.__which][0] * loaded_map.logical_size + Math.floor(loaded_map.logical_size / 2) && obj.y == loaded_map.paths[obj.way][obj.__which][1] * loaded_map.logical_size + Math.floor(loaded_map.logical_size / 2)) obj.__which++;
		for (let s of obj.skills) s(-1, obj);
		if (obj.__which == loaded_map.paths[obj.way].length)
		{
			pause_game();
			game_over = true;
			alert("败北!");
			return;
		}
		obj.activate();
	}

	this.draw = function()
	{
		let x = Math.round(this.x * loaded_map.block_size / loaded_map.logical_size);
		let y = Math.round(this.y * loaded_map.block_size / loaded_map.logical_size);
		ctx.drawImage(this.icon, x - Math.floor(loaded_map.block_size / 4), y - Math.floor(loaded_map.block_size / 4), Math.floor(loaded_map.block_size / 2), Math.floor(loaded_map.block_size / 2));
	}
}

let pic_enemy01 = new Image();
pic_enemy01.src = "resources/enemy01.png";
function enemy01() /* Basic enemy */
{
	let ret = new Enemy(pic_enemy01, 1000, 20, 100);
	return ret;
}
