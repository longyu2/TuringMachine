

// 内存初始化
let memory = []
for (let i = 0; i < 50; i++) {
    memory.push(0)
}

// 这是减法图灵机实现

// 定义初始数据，两段连续的1的个数表示减数和被减数
memory[0] = 1
memory[1] = 1
memory[2] = 1
memory[3] = 1
memory[4] = 1
// memory[5] = 1
// memory[6] = 1


// memory[8] = 1
// memory[9] = 1
// memory[10] = 1

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

let codes = [

    // 当所有都完成后，无法停机，所以最开始要给初始数据做些修改

    { status: 1, r: 1, c: "h", to: 15 },
    { status: 1, r: 0, c: "h", to: 14 },

    { status: 14, r: 0, c: "w1", to: 14 }, // 把第一个1删除,多写一个1，
    { status: 14, r: 1, c: "r", to:  2},    

    { status: 15, r: 1, c: "w0", to: 15 },
    { status: 15, r: 0, c: "r", to: 16 },

    { status: 16, r: 1, c: "r", to: 16 },
    { status: 16, r: 0, c: "h", to: 14 },

    { status: 2, r: 0, c: "r", to: 3 },
    { status: 3, r: 0, c: "r", to: 4 },
    { status: 4, r: 0, c: "r", to: 5 },
    { status: 5, r: 0, c: "r", to: 6 },
    { status: 6, r: 0, c: "r", to: 7 }, // 向右移动五次



    { status: 7, r: 0, c: "w1", to:7  }, 
    { status: 7, r: 1, c: "r", to:8  },  // 开始写1

    { status: 8, r: 0, c: "w1", to:8  },
    { status: 8, r: 1, c: "r", to:9  },    // 在空白写两个1
  

    { status: 9, r: 0, c: "l", to:10  },    // 若第一次写，则左转

    { status: 10, r: 1, c: "l", to:10  },
    { status: 10, r: 0, c: "l", to:11  },   // 迈过字符区

    { status: 11, r: 0, c: "l", to:11  },   // 开始寻找初始1串
    { status: 11, r: 1, c: "w0", to:17  },   // 找到初始串

    // 找到初始串后，判断1的左边是否为0，如为0，则说明这是最后一个1
    { status: 17, r: 0, c: "l", to:18  },
    { status: 18, r: 0, c: "r", to:19  },  // 如果是最后一次，进入19 终局流程

    { status: 18, r: 1, c: "r", to:12  },// 如果不是最后一次，则进入12，常规处理流程 
   
    { status: 19, r: 0, c: "r", to:19  }, // 19读到1表示读到了输出区，进入20
    { status: 19, r: 1, c: "r", to:20  },  
   
    
     
     { status: 20, r: 1, c: "r", to:20  },  // 遍历输出区 
     { status: 20, r: 0, c: "w1", to:21  },  
     { status: 21, r: 1, c: "r", to:21  },  
     { status: 21, r: 0, c: "w1", to:'s' },  
    

    // 找到初始串后向右进行第二次循环，第二次不与第一次相同，第一次固定右移5位，第二次右移到前面所写1的最右
    { status: 12, r: 0, c: "r", to:12  },  
    { status: 12, r: 1, c: "r", to:13  }, // 12读到1表示读到了输出区
    
    { status: 13, r: 1, c: "r", to:13  },  // 遍历输出区 
    { status: 13, r: 0, c: "h", to:7  },  // 输出区走到了尽头，开始第二轮 
    
    // 当所有都完成后，无法停机，所以最开始要给初始数据做些修改

    { status: 's', },
]

let count = 0
const app = document.querySelector("#app")
const divs = app.querySelectorAll("div")

for (let i = 0; i < memory.length; i++) {
    divs[i].innerText = memory[i]
}


divs[head].style.backgroundColor = "orange"

let time



// 计算用函数
const compute = ()=>{
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
    
            console.log(codes[i],memory[head],`head:${head}`)
    
    
            if(count>40){
                console.log(count)
            }
            count++
            break
        }
    }
}

// 图灵机模拟主函数
function main() {
    time = setInterval( compute,40)
}
main()
