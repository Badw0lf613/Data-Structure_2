// 邻接矩阵
function GraphMat(v) {
    // 这个类会记录一个图的邻接矩阵，用于存放各边的权值
    // 并使用一个长度与图的顶点数相同的数组来记录顶点的数量。
    // 通过 for循环为数组中的每个元素添加一个子数组来存储所有的相邻顶点，
    MAX = 150
    this.vertices = v;//点数
    this.edges = 0;//边数
    this.data = new Array(v);//邻接矩阵
    this.linjiejuzhen = []
    this.path = []
    this.sidepath = []
    this.pathweight = []
    console.log("v")
    console.log(v)
    this.edgeTo = []; // 用一个数组来保存从一个顶点到下一个顶点的所有边。
    // 邻接矩阵
    for (var i = 1; i <= v; i++) {
        this.data[i] = new Array(v);
        for (var j = 1; j <= v; j++) {
          this.data[i][j] = "∞";
          if(i==j){
            this.data[i][j] = 0;
          }
        }
    }
    // 邻接矩阵
    // 加边
    this.addEdge = addEdge;
    // this.linjiebiao = [];
    this.showGraph = showGraph;
    this.showLjBiao = showLjBiao;

    // 寻找两点间所有路径
    this.findAllPaths = findAllPaths;
    // 找到每条路径的最小值
    this.findMinPath = findMinPath;
    // this.pathTo = pathTo;
    // this.hasPathTo = hashPathTo;
    // 将所有元素初始化为空字符串。
    // this.toString = toString;
}

function addEdge(v1, v2, w) {
    // 当调用这个函数并传入顶点 A 和 B 以及权值时，
    // 函数会将this.data的(a,b)和(b,a)的值均设为w，最后将边数加 1
    this.data[v1][v2] = w;
    this.data[v2][v1] = w;
    this.edges++;
}

function Stack() {
    // 定义Stack类
    this.dataStore = [];//数组 dataStore 保存栈内元素，构造函数将其初始化为一个空数组
    this.top = 0;//变量 top 记录栈顶位置，被构造函数初始化为 0，表示栈顶对应数组的起始位置 0
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
}
function push(element) {
    //当向栈中压入一个新元素时，需要将其保存在数组中变量 top 所对应的位置，
    //然后将 top 值加 1，让其指向数组中下一个空位置。
    this.dataStore[this.top++] = element;
}
function peek() {
    //peek() 方法返回数组的第 top-1 个位置的元素，即栈顶元素
    return this.dataStore[this.top-1];
}
function pop() {
    //pop() 方法恰好与 push() 方法相反——它返回栈顶元素，同时将变量 top 的值减 1
    return this.dataStore[--this.top];
}
function clear() {
    //可以将变量 top 的值设为 0，清空一个栈
    this.top = 0;
}
function length() {
    //length() 方法通过返回变量 top 值的方式返回栈内的元素个数
    return this.top;
}

function showLjBiao(v){
    //显示邻接表
    for (var i = 1; i <= this.vertices; ++i) {
        this.linjiejuzhen[i] = new Array();
        for (var j = 1; j <= this.vertices; ++j ) {
                if (j <= this.vertices){
                    if (this.data[i][j] != "∞" && this.data[i][j] != 0){
                        this.linjiejuzhen[i].push(j);
                    }
                }
        }    
    }
    return this.linjiejuzhen[v];
}

function findAllPaths(start1, end1){
    //寻找两点之间所有路径
    this.path=[]
    start = Number(start1)//此函数将对象的值转换为数字
    end = Number(end1)
    //初始化主栈
    var main_stack = new Stack()
    main_stack.push(start);
    //初始化副栈
    var side_stack = new Stack()
    side_stack.push(this.showLjBiao(start));
    var side_top//副栈栈顶元素
    var turn = 0//用于记录路径的条数（path二维数组的维数）
    while (main_stack.length() > 0){
        //主栈不为空
        side_top = side_stack.pop()
        if (side_top.length > 0){
            //栈顶的邻接表不为空
            var main_top = side_top[0]//获取邻接表首个元素，作主栈栈顶
            main_stack.push(main_top)//将该元素压入主栈
            side_top.shift()// 移除数组首个元素
            // console.log("此时副栈栈顶为非空列表")
            side_stack.push(side_top)//剩下列表压入副栈
            if(this.showLjBiao(main_top).length > 0){
                // 如果存在下一节点
                side_top = []
                for (var i = 0; i < this.showLjBiao(main_top).length; i++){
                    var flag = 0//利用flag标记，用于记录邻接表中是否有元素在主栈中
                    for (var j = 0; j < main_stack.length(); j++){
                        if (this.showLjBiao(main_top)[i] === main_stack.dataStore[j]){
                            //判断是否已经有元素在主栈中
                            flag = 1
                        }
                    }
                    if (flag === 0){
                        //邻接表中没有元素在主栈中
                        side_top.push(this.showLjBiao(main_top)[i])
                    }
                }
                //剩下列表压入副栈
                side_stack.push(side_top)
            }
        }
        else{
            //栈顶的邻接表为空
            main_stack.pop()//主栈做一次出栈
        }
        var peekNode = main_stack.peek()//主栈栈顶元素
        if (main_stack.length() > 0 && peekNode === end){
            //主栈栈顶元素===目标节点
            this.path[turn] = new Array()//主栈从下至上的元素即路径
            this.sidepath[turn] = new Array()//副栈从下至上的元素
            //查看主栈
            for (var i = 0; i < main_stack.length(); i++){
                this.path[turn][i] = main_stack.dataStore[i];
            }
            // 查看副栈
            for (var i = 0; i < side_stack.length(); i++){
                this.sidepath[turn][i] = side_stack.dataStore[i];
            }
            //主栈做一次出栈
            main_stack.pop()
            if (side_stack.length() > 0){
                //副栈做一次出栈
                side_stack.pop()
            }
            turn++//路径条数加一
        }
    }
    if (turn === 0){
        console.log("no path")
        return null
    }
    else{
        return this.path
    }
}


function findMinPath(p,q){
    // 寻找安全道路
    // 根据p——路径，q——权值，建立新的数组存放着一条路径上的各条边
    // 最后结果得到每条路径上的所有边的权值
    for (var i = 0; i < p.length; i++){
        this.pathweight[i] = new Array()
        for (var j = 0; j < p[i].length - 1; j++){
            // -1的原因：例如5个点之间有4条路
            var pfrom = p[i][j]
            // console.log(pfrom)
            var pto = p[i][j+1]
            // console.log(pto)
            this.pathweight[i][j] = q[pfrom][pto]
        }
    }
    // console.log(this.pathweight)
    // 对刚才得到的路径权值矩阵进行找最小值操作
    var minweight = []
    for (var i = 0; i < this.pathweight.length; i++){
        minweight[i] = MAX
        // 使用 Math 中的 max方法
        // 使用apply来实现，apply传入的是一个数组
        minweight[i] = Math.min.apply(null, this.pathweight[i]);
    }
    // 接下来通过minweight数组的值来确定最终选取的路径
    // 规则：
    // 1、是否有路径-----通过path数组是否为空来判断
    // 2、有路径，则80：2 4 6 7；无路径，则no path
    // 3、minweight的最大值不止一个时，输出其中路径上道路条数最少的一条。
    // 4、道路条数也一样，则输出终点的前驱结点序号相对小的路径
    maxMW = Math.max.apply(null, minweight);
    var index = [] //记录最大值元素的下标
    for (i = 0; i < minweight.length; i++){
        if (minweight[i] === maxMW){
            // console.log(i)
            index.push(i)
        }
    }
    if (index.length === 1){
        //利用此方法将输出规整化
        let result = `${minweight[index]}: `
        result +=`${p[index].join(' ')} `;
        console.log("情况1 最小安全值的最大值只有一个")
        console.log(result)
    }
    else if(index.length > 1){
        // minweight不只一个时
        var pathlength = []
        for (var i = 0; i < index.length; i++){
            pathlength[i] = p[index[i]].length
        }
        minPL = Math.min.apply(null, pathlength);
        var pathindex = [] //记录最大值元素的下标
        for (i = 0; i < pathlength.length; i++){
            if (pathlength[i] === minPL){
                // console.log(i)
                pathindex.push(i)
            }
        }
        if (pathindex.length === 1){
            // minweight不只一个，按长度再分只有一条路径
            // 先找到pathindex对应的pathlength
            // pathindex对应index[pathindex]
            //利用此方法将输出规整化
            let result1 = `${minweight[index[pathindex]]}: `
            result1 +=`${p[index[pathindex]].join(' ')} `;
            console.log("情况2 最小安全值的最大值不只一个，按长度再分只有一条")
            console.log(result1)
        }
        else if (pathindex.length > 1){
            var lastprenode =[]
            // 记录终点的前驱结点
            // pathindex对应index[pathindex]
            for (var i = 0; i < pathindex.length; i++){
                // lastprenode[i] = new Array()
                var len1 = p[index[i]].length
                // 倒数第二个点需-2
                console.log("len1"+":"+i)
                console.log(len1)
                lastprenode[i] = p[index[i]][len1-2]
            }
            // console.log("lastprenode")
            // console.log(lastprenode)
            minLPN = Math.min.apply(null, lastprenode);// 输出相对小的前驱节点，必定唯一
            var minLPN_node
            for (i = 0; i < lastprenode.length; i++){
                if (lastprenode[i] === minLPN){
                    // console.log(i)
                    minLPN_node = i
                }
            }
            // minLPN_node即对应index[minLPN_node]
            //利用此方法将输出规整化
            let result2 = `${minweight[index[minLPN_node]]}: `
            result2 +=`${p[index[minLPN_node]].join(' ')} `;
            console.log("情况3 最小安全值的最大值不只一个，按长度再分不只一条，输出前驱结点序号较小的")
            console.log(result2)
        }
    }
    return minweight
}

function showGraph() {
    //输出邻接矩阵
    for (var i = 1; i <= this.vertices; ++i) {
        this.linjiejuzhen[i] = new Array();
        this.linjiejuzhen[i].push(i + ":");
        for (var j = 1; j <= this.vertices; ++j ) {
            if (j <= this.vertices){
                this.linjiejuzhen[i].push(this.data[i][j] + ' ');
            }
            if (j === this.vertices){
                this.linjiejuzhen[i].push('; ');
            }
        }
    }
    return this.linjiejuzhen
}