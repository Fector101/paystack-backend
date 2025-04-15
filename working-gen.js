function findRowOfCubesBox(cube_id) {
    // console.log(nums_list)
    // document.querySelector('p').innerText = typeof nums_list[0]
    // const least_number = nums_list[0]
    console.log()
    const cube = getCube(cube_id)
    const cube_x = cube.dataset.x
    const cube_y = cube.dataset.y
    document.querySelectorAll(`.cube[data-y="${cube_y}"]`).forEach(setColor)
    document.querySelectorAll(`.cube[data-x="${cube_x}"]`).forEach(setColor)
    // for (let i = 0; i < least_number; i++) {
    // const element = array[i];
    // }
}


function findLeft(value) {
    console.log(value - 1);
    return value - 1
}
function findright(value) {
    console.log(value + 1);
    return value + 1
}
function findColumn(value) {
    // 1 --first-column, 2 --second-column, 0 --last-column
    return value % 3
}
function getCube(id) {
    return document.querySelector(`.cube[data-id="${id}"]`)

}
function crossMethod(cube_id) {
    // const col = findColumn(cube_id)
    // let numbers = []
    // if (col === 1) { //first col
    //     const cube_at_right_id = findright(cube_id)
    //     const cube_at_right_right_id = findright(cube_at_right_id)
    //     setColor(getCube(cube_at_right_id))
    //     setColor(getCube(cube_at_right_right_id))
    //     numbers = [cube_id, cube_at_right_id, cube_at_right_right_id]
    // } else if (col === 2) {
    //     const cube_at_left_id = findLeft(cube_id)
    //     const cube_at_right_id = findright(cube_id)
    //     setColor(getCube(cube_at_left_id))
    //     setColor(getCube(cube_at_right_id))
    //     numbers = [cube_id, cube_at_left_id, cube_at_right_id]
    // } else {
    //     const cube_at_left_id = findLeft(cube_id)
    //     const cube_at_left_left_id = findLeft(cube_at_left_id)
    //     setColor(getCube(cube_at_left_id))
    //     setColor(getCube(cube_at_left_left_id))
    //     numbers = [cube_id, cube_at_left_id, cube_at_left_left_id]
    // }
    findRowOfCubesBox(cube_id)
}
function setColor(cube) {
    cube.style.backgroundColor = 'red'
}
const root = document.querySelector("#root")
root.addEventListener('click', function (event) {
    let cube = event.target.closest('.cube')
    if (!cube) return
    setColor(cube)
    crossMethod(parseInt(cube.dataset.id))
})
let no_of_cubes = 0
let matrix_x = 0
let matrix_y = 0
function createCube(x_start, y_start) {
    let cubes = ``
    let no = 0
    for (var i = x_start; i < x_start + 3; i++) {
        let row = ''
        let matrix_value = ''
        let row_ = 'last-row'
        let column = 'last-column'
        // console.log(x_start, y_start)
        for (var j = y_start; j < y_start + 3; j++) {
            no_of_cubes++
            no++
            matrix_x = no_of_cubes
            // if(no_of_cubes <= 9){
            //     matrix_x = 0
            // }

            // if(i <= 21){
            //     matrix_x = 0
            // }

            if (i <= 2) {

                //     row = 'first-row'
            } else if (i <= 5) {
                //     row = 'second-row'
            }

            // if ([0,3,6].includes(i)){
            //     column = 'first-column'
            // }

            // if ([1,4,7].includes(i)){
            //     column = 'second-column'
            // }
            row += `<span data-id="${no_of_cubes}" data-x="${i}" data-y="${j}" class="${row_} ${column} cube">${[i, j]}</span>`
            // row += `<span data-id="${no_of_cubes}" data-x="${i}" data-y="${j}" data-number="${no}" class="${row_} ${column} cube">${no_of_cubes}</span>`
        }
        cubes += row
    }

    return `
            <div class="cubes-box">
            ${cubes}
            </div>
  `
}

let cubes = ``
const box_length = 9
const square_root = box_length ** (1 / 2)
let io = 0

for (var i = 0; i < box_length; i++) {
    let x_start;
    if (i <= (square_root - 1)) {
        x_start = 0
    } else if (i <= ((square_root - 1) + square_root)) {
        x_start = 3
    } else if (i <= ((square_root - 1) + square_root * 2)) {
        x_start = 6
    }
    if (i * box_length * square_root) { }
    if (i % square_root == 0) {
        io = 0
    }
    y_end = io * square_root
    cubes += createCube(x_start, y_end)
    io++
}
root.innerHTML = cubes

// const cubes_array = document.querySelectorAll('.cube')
let stop = 0
function genList() {
    let numbers = Array.from(document.querySelectorAll('.cube')).filter(e => typeof e.dataset.number == 'string').map(e => e.dataset.number)
    console.log(numbers)
}
function insertInPool(y) {
    const cubes_array = document.querySelectorAll(`.cube[data-y="${y}"]`)
    function genRan(range) {
        return Math.floor(Math.random() * range)
    }
    let pool = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    cubes_array.forEach(e => {
        let number = genRan(pool.length)
        e.dataset.number = pool[number]
        e.innerText = pool[number]
        pool.splice(number, 1)
    })
    console.log([...cubes_array].map(e => e.dataset.number))
    cubes_array.forEach(setColor)
}

function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) return false;
        const startRow = 3 * Math.floor(row / 3) + Math.floor(x / 3);
        const startCol = 3 * Math.floor(col / 3) + x % 3;
        if (board[startRow][startCol] === num) return false;
    }
    return true;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
                for (let num of nums) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function generateSudoku() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    solveSudoku(board);
    return board;
}

const sudoku = generateSudoku();
function applyOnColumn(array,y){
    Array.from(document.querySelectorAll(`.cube[data-y="${y}"]`))
    .forEach((each,i)=>{each.innerText=array[i]})
}
sudoku.forEach((each,i)=> {
    applyOnColumn(each,i)
})