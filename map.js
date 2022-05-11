const map_empty = 0;
const map_tower = 1;
const map_path = 2;
const map_frontline = 3;
const map_base = 4;

const fx = [[-1,0],[1,0],[0,-1],[0,1]];

let pic_tower = new Image();
pic_tower.src = "resources/tower.png";
let pic_path = new Image();
pic_path.src = "resources/path.png";
let pic_frontline = new Image();
pic_frontline.src = "resources/frontline.png";
let pic_base = new Image();
pic_base.src = "resources/base.png";

function Map(width, height, data, logical_size = 20)
{
	this.map_width = width;
	this.map_height = height;
	this.data = data;
	this.logical_size = logical_size;
	this.block_size;
	this.paths = [];

	this.__vis = [];
	this.__tmp_path = [];
	for (let i = 0;i < this.map_width;i++)
	{
		let tmp = [];
		for (let j = 0;j < this.map_height;j++) tmp.push(false);
		this.__vis.push(tmp);
	}

	this.init = function()
	{
		this.block_size = Math.max(Math.min(Math.floor(canvas.width / this.map_width),Math.floor((canvas.height - status_height) / this.map_height)), 25);
		for (let i = 0;i < this.map_width;i++)
			for (let j = 0;j < this.map_height;j++)
				if (this.data[i][j] == map_frontline) this.__gen_path(i, j);
	}

	this.__gen_path = function(x, y)
	{
		this.__vis[x][y] = true;
		this.__tmp_path.push([x,y]);
		if (this.data[x][y] == map_base)
		{
			var tmp_path = [];
			for (let i = 0;i < this.__tmp_path.length;i++) tmp_path.push(this.__tmp_path[i]);
			this.paths.push(tmp_path);
			this.__vis[x][y] = false;
			this.__tmp_path.pop();
			return;
		}
		for (let i = 0;i < fx.length;i++)
		{
			let x2 = x + fx[i][0];
			let y2 = y + fx[i][1];
			if (0 <= x2 && x2 < this.map_width && 0 <= y2 && y2 < this.map_height && this.__vis[x2][y2] == false && (this.data[x2][y2] == map_path || this.data[x2][y2] == map_base)) this.__gen_path(x2, y2);
		}
		this.__vis[x][y] = false;
		this.__tmp_path.pop();
	}

	this.draw = function()
	{
		for (let i = 0;i < this.map_width;i++)
			for (let j = 0;j < this.map_height;j++)
			{
				switch (this.data[i][j])
				{
					case map_empty:
						/* nothing */
						break;
					case map_tower:
						ctx.drawImage(pic_tower, i * this.block_size, j * this.block_size, this.block_size, this.block_size);
						break;
					case map_path:
						ctx.drawImage(pic_path, i * this.block_size, j * this.block_size, this.block_size, this.block_size);
						break;
					case map_frontline:
						ctx.drawImage(pic_frontline, i * this.block_size, j * this.block_size, this.block_size, this.block_size);
						break;
					case map_base:
						ctx.drawImage(pic_base, i * this.block_size, j * this.block_size, this.block_size, this.block_size);
						break;
					default:
						console.log("Invalid map data");
						break;
				}
			}
	}
}
