

// 内存初始化
let memory = []
for (let i = 0; i < 50; i++) {
    memory.push(0)
}

// 这是减法图灵机实现

// 定义初始数据，两段连续的1的个数表示减数和被减数

// 加法数据
// memory[0] = 1
// memory[1] = 1
// memory[2] = 1
// memory[3] = 1
// memory[4] = 1
// memory[5] = 1
// memory[6] = 1


// memory[8] = 1
// memory[9] = 1
// memory[10] = 1


// 复制所用数据
memory[0] = 1
memory[1] = 1
memory[2] = 1




let head = 0

let tulingStatus = 1
//定义指令

// 减法
/*
1 读1 往右 
  读0 写h  转2
2 读0 往右  转2		// 2是纯右
   读1 写0 转3
3 读0 往右 转4
4 读0往左，转5
  若1，则说明右边尚未解决，往左 ，转6
5 若0继续左，
   若1写0停机
6 若0，左，转6
   若1，写0，转2   // 6是纯左
*/

// let codes = [
//     { status: 1, r: 1, c: "r", to: 1 },
//     { status: 1, r: 0, c: "h", to: 2 },
//     { status: 2, r: 1, c: "w0", to: 3 },
//     { status: 2, r: 0, c: "r", to: 2 },
//     { status: 3, r: 0, c: "r", to: 4 },
//     { status: 4, r: 0, c: "l", to: 5 },
//     { status: 4, r: 1, c: "l", to: 6 },
//     { status: 5, r: 0, c: "l", to: 5 },
//     { status: 5, r: 1, c: "w0", to: 's' },
//     { status: 6, r: 0, c: "l", to: 6 },
//     { status: 6, r: 1, c: "w0", to: 2 },
//     { status: 's', },
// ]


// 加法
// let codes=[
//     { status: 1, r: 1, c: "r", to: 1 },
//     { status: 1, r: 0, c: "r", to: 2 },
//     { status: 2, r: 1, c: "w0", to: 3 },
//     { status: 2, r: 0, c: "w0", to: 's' },


//     { status: 3, r: 0, c: "l", to: 3 },
//     { status: 3, r: 1, c: "r", to: 4 },
//     { status: 4, r: 0, c: "w1", to: 1 },
//     { status: 's', },
// ]


// 复制
let codes = [
    { status: 1, r: 1, c: "r", to: 2 },
    { status: 1, r: 0, c: "r", to: 's' },

    { status: 2, r: 0, c: "r", to: 3 },
    { status: 2, r: 1, c: "r", to: 3 },

    { status: 3, r: 0, c: "r", to: 4 },
    { status: 3, r: 1, c: "r", to: 4 },

    { status: 4, r: 0, c: "r", to: 5 },
    { status: 4, r: 1, c: "r", to: 5 },

    { status: 5, r: 0, c: "w1", to: 6 },

    // 左移4次
    { status: 6, r: 0, c: "l", to: 7 },
    { status: 6, r: 1, c: "l", to: 7 },

    { status: 7, r: 0, c: "l", to: 8 },
    { status: 7, r: 1, c: "l", to: 8 },

    { status: 8, r: 0, c: "l", to: 1 },
    { status: 8, r: 1, c: "l", to: 1 },


    
]








let count = 0
const app = document.querySelector("#app")
const divs = app.querySelectorAll("div")

for (let i = 0; i < memory.length; i++) {
    divs[i].innerText = memory[i]
}


divs[head].style.backgroundColor = "orange"



// 图灵机模拟主函数
function main() {
    const time = setInterval(() => {

        for (let i = 0; i < codes.length; i++) {

            if (tulingStatus === "s") {
                clearInterval(time)
            }
            else if (codes[i].r == memory[head] && tulingStatus == codes[i].status) {
                // 开始执行
                if (codes[i].c === 'w1') {
                    memory[head] = 1
                    divs[head].innerText = 1

                    tulingStatus = codes[i].to
                }
                else if (codes[i].c === 'w0') {
                    memory[head] = 0
                    divs[head].innerText = 0

                    tulingStatus = codes[i].to
                }
                else if (codes[i].c === 'l') {
                    divs[head].style.backgroundColor = "white"
                    head--
                    divs[head].style.backgroundColor = "orange"

                    tulingStatus = codes[i].to
                }
                else if (codes[i].c === 'r') {
                    divs[head].style.backgroundColor = "white"
                    head++
                    divs[head].style.backgroundColor = "orange"

                    tulingStatus = codes[i].to
                }
                else if (codes[i].c === 'h') {
                    tulingStatus = codes[i].to
                }
                count++
                break
            }
        }
    }, 300)
}
main()