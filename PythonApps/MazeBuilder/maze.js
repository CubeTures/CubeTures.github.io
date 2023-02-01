document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let maze = [];
    let solution = [];
    let solutionShowing = false;
    let mazeComplete = true;

    let height = 0;
    let width = 0;

    function setOnClick(id, funct) {
        let btn = document.getElementById(id);
        btn.addEventListener('click', funct);
    }
    
    //setOnClick('guess', (evt) => {})

    function createMaze(retry = false) {
        if(mazeComplete || retry) {
            mazeComplete = false;
            solutionShowing = false;
            let btn = document.getElementById('solve');
            btn.textContent = solutionShowing ? 'Clear' : 'Solve';

            canvas.height = 751;
            canvas.width = 751;
            height = parseInt(document.getElementById("hSlider").value);
            width = parseInt(document.getElementById("lSlider").value);
            
            for(let i = 0; i < height; i++) {
                let row = [];
                for(let j = 0; j < width; j++) {
                    //console.log(i + " " + j);
                    tile = new Tile(i, j, (height > width ? height : width));
                    if(i == 0 && j == 0) {
                        tile.left = true;
                    }
                    else if(i + 1 == height && j + 1 == width) {
                        tile.right = true;
                    }
                    row[j] = tile;
                }
                maze[i] = row;
            }

            generatePath();
        }
    }

    async function generatePath() {
        let stack = [];
        let visited = [];
        solution = []

        stack.push(maze[0][0]);
        visited.push(maze[0][0]);

        while(stack.length > 0) {
            let tile = getNearby(stack[stack.length - 1], visited);
            if(tile == null) {
                tile = stack.pop();
            }
            else {
                stack.push(tile);
                visited.push(tile);

                if(solution.length == 0 && tile.x == height - 1 && tile.y == width - 1) {
                    clone(solution, stack.reverse());
                }
            }
        }

        if(solution.length == 0) {
            console.log("Retrying");
            createMaze(true);
        }
        else {
            console.log("Finsihed")
            paintMaze(visited);
        }
    }
    function getNearby(tile, visited) {
        let pos = [0, 1, 2, 3];
        let dir = pos.splice(Math.floor(Math.random() * pos.length), 1)[0];

        while(!validSpace(tile, visited, dir) && pos.length > 0) {
            dir = pos.splice(Math.floor(Math.random() * pos.length), 1)[0];
        }
        if(pos.length > 0) {
            let next = getTile(tile, dir);
            tile.join(next);
            return next;
        }

        return null;
    }
    function validSpace(tile, visited, dir) {
        let next = getTile(tile, dir);
        if(next != null && !visited.includes(next)) {
            return true;
        }

        return false;
    }
    function getTile(tile, dir) {
        //0: up; 1: right; 2:down; 3: left

        if(dir == 0) {
            if(tile.y > 0) {
                return maze[tile.x][tile.y - 1];
            }
        }
        else if(dir == 1) {
            if(tile.x < height - 1) {
                return maze[tile.x + 1][tile.y];
            }
        }
        else if(dir == 2) {
            if(tile.y < width - 1) {
                return maze[tile.x][tile.y + 1];
            }
        }
        else if(dir == 3) {
            if(tile.x > 0) {
                return maze[tile.x - 1][tile.y];
            }
        }

        return null;
    }
    
    async function paintMaze(list) {
        for(let i = 0; i < list.length; i++) {
            list[i].paint(ctx);
            await sleep(5);
        }
        mazeComplete = true;
    }
    function solve() {
        if(mazeComplete) {
            solutionShowing = !solutionShowing;
            let btn = document.getElementById('solve');
            btn.textContent = solutionShowing ? 'Clear' : 'Solve';
            let prev = null;
            let iter = [];
            clone(iter, solution);
            while(iter.length > 0) {
                let temp = iter.pop();
                if(prev != null) {
                    temp.select(ctx, prev, solutionShowing);
                }

                prev = temp;
            }
        }
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function clone(to, from) {
        for(let x = 0; x < from.length; x++) {
            to[x] = from[x];
        }
    }

    setOnClick("generate", (evt) => createMaze());
    //paintMaze();
    setOnClick("solve", (evt) => solve());
})

class Tile {
    constructor(x, y, scalar) {
        this.scale = 750 / scalar;
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        this.x = x;
        this.y = y;
    }

    join(other) {
        if(other.x > this.x) {
            other.left = true;
            this.right = true;
        }
        else if(other.x < this.x) {
            other.right = true;
            this.left = true;
        }
        else if(other.y > this.y) {
            other.up = true;
            this.down = true;
        }
        else if(other.y < this.y) {
            other.down = true;
            this.up = true;
        }
    }

    paint(ctx) {
        if(!this.up) {
            ctx.fillRect(this.x * this.scale, this.y * this.scale, this.scale, 1);
        }
        if(!this.down) {
            ctx.fillRect(this.x * this.scale, this.y * this.scale + this.scale, this.scale + 1, 1);
        }

        if(!this.left) {
            ctx.fillRect(this.x * this.scale, this.y * this.scale, 1, this.scale);
        }
        if(!this.right) {
            ctx.fillRect(this.x * this.scale + this.scale, this.y * this.scale, 1, this.scale);
        }
    }

    selectOne(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x * this.scale + (this.scale * .4), this.y * this.scale + (this.scale * .4), this.scale * .2, this.scale * .2);
        ctx.fillStyle = "black";
    }
    select(ctx, prev, show) {
        ctx.fillStyle = "red";
        if(prev.x < this.x) {
            this.line(ctx, prev, true, show);
        }
        else if(prev.y < this.y) {
            this.line(ctx, prev, false, show);
        }
        else if(prev.x > this.x) {
            this.line(ctx, this, true, show);
        }
        else {
            this.line(ctx, this, false, show);
        }
        ctx.fillStyle = "black";
    }

    line(ctx, leftmost, isHor, show) {
        if(show) {
            ctx.fillRect(leftmost.x * this.scale + (.4 * this.scale), leftmost.y * this.scale + (.4 * this.scale), this.scale * (isHor ? 1.2 : .2), this.scale * (!isHor ? 1.2 : .2));
        }
        else {
            ctx.clearRect(leftmost.x * this.scale + (.3 * this.scale), leftmost.y * this.scale + (.3 * this.scale), this.scale * (isHor ? 1.6 : .6), this.scale * (!isHor ? 1.6 : .6));
        }
    }
}