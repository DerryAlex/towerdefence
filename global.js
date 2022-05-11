let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let round_label = document.getElementById("round");
let money_label = document.getElementById("money");

let clicked = false;
let clickX = 0;
let clickY = 0;
let pressed = false;
let pressKey = "";

let game_over = false;
let game_pause = true;
let round = 0;
let money;
let loaded_map;
let enemies = [];
let towers = [];
let drawID;

function draw()
{
	round_label.innerHTML = round;
	money_label.innerHTML = money;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	loaded_map.draw();
	for (let e of enemies) e.draw();
	for (let t of towers) t.draw();
}

function animation()
{
	draw();
	drawID = window.setTimeout(animation);
}

function pause_game()
{
	game_pause = true;
	window.clearTimeout(drawID);
	for (let t of towers) t.deactivate();
	for (let e of enemies) e.deactivate();
}

function continue_game()
{
	animation();
	for (let t of towers)
		if (t.active == false) t.activate();
	for (let e of enemies)
		if (e.active == false) e.activate();
	game_pause = false;
}

function processor()
{
	window.setTimeout(processor);
	if (pressed == true)
	{
		pressed = false;
		if (pressKey == " ") alert("暂停");
		if (pressKey == "R" || pressKey == "r")
		{
			for (let t of towers)
			{
				if (Math.abs(t.x * loaded_map.block_size / loaded_map.logical_size - clickX) <= loaded_map.block_size / 2 && Math.abs(t.y * loaded_map.block_size / loaded_map.logical_size - clickY) <= loaded_map.block_size / 2)
				{
					money += Math.floor(t.fee * 0.5);
					t.deactivate();
					towers.splice(towers.indexOf(t), 1);
				}
			}
		}
	}
	if (clicked == true)
	{
		clicked = false;
		for (let e of enemies)
		{
			if (Math.abs(e.x * loaded_map.block_size / loaded_map.logical_size - clickX) <= loaded_map.block_size / 2 && Math.abs(e.y * loaded_map.block_size / loaded_map.logical_size - clickY) <= loaded_map.block_size / 2)
			{
				alert("生命:" + e.HP + ";速度:" + e.speed);
				return;
			}
		}
		if (game_over == true) return;
		for (let t of towers)
		{
			if (Math.abs(t.x * loaded_map.block_size / loaded_map.logical_size - clickX) <= loaded_map.block_size / 2 && Math.abs(t.y * loaded_map.block_size / loaded_map.logical_size - clickY) <= loaded_map.block_size / 2) return;
		}
		if (loaded_map.data[Math.floor(clickX / loaded_map.block_size)][Math.floor(clickY / loaded_map.block_size)] == map_frontline && enemies.length == 0)
		{
			round += 1;
			gen_enemy();
		}
		if (loaded_map.data[Math.floor(clickX / loaded_map.block_size)][Math.floor(clickY / loaded_map.block_size)] == map_tower)
		{
			let type = window.prompt("你想要建造的塔的类型？");
			build(type, Math.floor(clickX / loaded_map.block_size), Math.floor(clickY / loaded_map.block_size));
		}
	}
}
