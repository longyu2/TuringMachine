

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
memory[4] = 1
memory[5] = 1
memory[6] = 1


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
5 若0继续左，F
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

let codes = []

// 加法
// let codes = [
//     { status: 1, r: 1, c: "r", to: 1 },
//     { status: 1, r: 0, c: "r", to: 2 },
//     { status: 2, r: 1, c: "w0", to: 3 },
//     { status: 2, r: 0, c: "w0", to: 999 },


//     { status: 3, r: 0, c: "l", to: 3 },
//     { status: 3, r: 1, c: "r", to: 4 },
//     { status: 4, r: 0, c: "w1", to: 1 },
//     { status: 999, },
// ]


// 为图灵机指令进行编码 状态用1000种,前三位表示编号，第四位表示读到的数据，第五位表示操作，01234 分别表示 停左右 写1 写0 后三位表示to

// 将指令转化为图灵机代码格式
const strTocode =()=>{
    let codeStr =
    `
00112001
00102002
00214003
00204999
00301003
00312004
00403001
`
let codeArr = codeStr.split("\n")


for (let i = 0; i < codeArr.length; i++) {
    console.log(codeArr[i]);
    
    if (codeArr[i].length < 5) {
        continue
    }
    // 取出前三位，转化为编码
    let codeId = parseInt(codeArr[i].substring(0, 3))
    let codeRead = parseInt(codeArr[i].substring(3, 4))
    let codeOperate = parseInt(codeArr[i].substring(4, 5))

    let Operate

    switch (codeOperate) {
        case 0:
            Operate = 'h'
            break;
        case 1:
            Operate = 'l'
            break;
        case 2:
            Operate = 'r'
            break;
        case 3:
            Operate = 'w1'
            break;
        case 4:
            Operate = 'w0'
            break;
        default:
            break;
    }


    let toId = parseInt(codeArr[i].substring(5, 8))
  

    let obj = {
        status: codeId,
        r: codeRead,
        c: Operate,
        to: toId
    }

    codes.push(obj)
    
}
}


// strTocode()



// 复制功能
// let codes = [
//     { status: 1, r: 1, c: "r", to: 2 },
//     { status: 1, r: 0, c: "r", to: 's' },

//     { status: 2, r: 0, c: "r", to: 3 },
//     { status: 2, r: 1, c: "r", to: 3 },

//     { status: 3, r: 0, c: "r", to: 4 },
//     { status: 3, r: 1, c: "r", to: 4 },

//     { status: 4, r: 0, c: "r", to: 5 },
//     { status: 4, r: 1, c: "r", to: 5 },

//     { status: 5, r: 0, c: "w1", to: 6 },

//     // 左移4次
//     { status: 6, r: 0, c: "l", to: 7 },
//     { status: 6, r: 1, c: "l", to: 7 },

//     { status: 7, r: 0, c: "l", to: 8 },
//     { status: 7, r: 1, c: "l", to: 8 },

//     { status: 8, r: 0, c: "l", to: 1 },
//     { status: 8, r: 1, c: "l", to: 1 },

// ]









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

            if (tulingStatus === 999) {
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