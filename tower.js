function Tower(icon, attack, speed, range, fee, skills = [])
{
	this.icon = icon;
	this.attack = attack;
	this.speed = speed;
	this.range = range;
	this.fee = fee;
	this.skills = skills;
	this.x;
	this.y;
	this.active = false;
	this.timeoutID;

	this.init = function(x, y)
	{
		this.x = x * loaded_map.logical_size + Math.floor(loaded_map.logical_size / 2);
		this.y = y * loaded_map.logical_size + Math.floor(loaded_map.logical_size / 2);
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
		for (let e of enemies)
		{
			if (Math.pow(obj.x - e.x, 2) + Math.pow(obj.y - e.y, 2) <= Math.pow(obj.range, 2))
			{
				e.HP -= obj.attack;
				if (e.HP <= 0)
				{
					e.deactivate();
					money += e.reward;
					enemies.splice(enemies.indexOf(e), 1);
				}
				break;
			}
		}
		for (let s of obj.skills) s(-1, obj);
		obj.activate();
	}

	this.draw = function()
	{
		let x = Math.round(this.x * loaded_map.block_size / loaded_map.logical_size);
		let y = Math.round(this.y * loaded_map.block_size / loaded_map.logical_size);
		ctx.drawImage(this.icon, x - Math.floor(loaded_map.block_size / 2), y - Math.floor(loaded_map.block_size / 2), loaded_map.block_size, loaded_map.block_size);
		if (Math.floor(this.x / loaded_map.logical_size) == Math.floor(clickX / loaded_map.block_size) && Math.floor(this.y / loaded_map.logical_size) == Math.floor(clickY / loaded_map.block_size))
		{
			ctx.save();
			ctx.lineWidth = 2;
			ctx.strokeStyle = "green";
			ctx.beginPath();
			ctx.arc(x, y, range * loaded_map.block_size / loaded_map.logical_size, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.restore();
		}
	}
}

let pic_tower01 = new Image();
pic_tower01.src = "resources/tower01.png";
function tower01() /* Basic attack tower */
{
	let ret = new Tower(pic_tower01, 20, 20, 29, 75);
	return ret;
}

let pic_tower02 = new Image();
pic_tower02.src = "resources/tower02.png";
function tower02() /* Basic magic tower */
{
	let ret = new Tower(pic_tower02, 50, 3, 25, 125);
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
					}, 1500, e, e.speed);
					break;
				}
			}
		}
	});
	return ret;
}

function build(str, X, Y)
{
	var t;
	switch (str)
	{
		case null:
			break;
		case "01":
			t = new tower01();
			break;
		case "02":
			t = new tower02();
			break;
		default:
			ex_build(str, X, Y);
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
