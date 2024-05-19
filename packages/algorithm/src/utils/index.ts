/**
 * @description 比较数字大小
 */
export const less = (a: number, b: number): boolean => {
    return a <= b;
}

/**
 * @description 比较两个数字是否相等
 */
export const isEqual = (a: number, b: number): boolean => {
    return a === b;
}


/**
 * @description 数字类型比较
 */
export const numberCompare = {
    less,
    isEqual,
}

/**
 * @description 检查数组是否有序
 */
export const isSorted = (arr: number[]): boolean => {
    const len = arr.length;

    for(let i=0;i<len-1;i++) {
        if(arr[i] > arr[i+1]) {
            return false;
        }
    }

    return true;
}


/**
 * @description 生成一个随机数组, 可以指定数组长度和最大值
 */
export const generateRandomArray = (n: number|string=20, max: number=1e3): number[] => {
    if(typeof n === 'string') {
        n = parseInt(n);
    }
    const arr = [];
    for(let i=0;i<n;i++) {
        arr.push(Math.floor(Math.random() * max));
    }

    return arr;
}

/**
 * @description 获取数组最后一个元素
 */
export const getLast = (arr: number[]): number => {
    return arr[arr.length - 1];
}

/**
 * @description 获取数组第一个元素
 */
export const getFirst = (arr: number[]): number => {
    return arr[0];
}

/**
 * @description 交换数组中两个元素的位置
 */
export const swap = <T>(arr: T[], i: number, j: number): void => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * @description 获取函数执行时间
 */
export const getRunTime = (fn: Function, ...args: any[]): number => {
    const start = performance.now();
    fn(...args);
  
    const end = performance.now();
    return end - start;
}

/**
 * @description 是否是undefined
 */
export const isUndefined = (val: any): boolean => {
    return typeof val === 'undefined';
}

/**
 * @description 判断是否是偶数
 */
export const isEven = (num: number): boolean => {
    return num % 2 === 0;
}


/**
 * @description 检验优先队列树是否有序
 */
export const isPriorityQueueSorted = (queue: number[]): boolean => {
    const len = queue.length;
    let currnetIndex = 0;
    while(currnetIndex<len) {
        const leftIndex = 2*currnetIndex+1;
        const rightIndex = 2*currnetIndex+2;

        // 检测父子节点
        if(leftIndex<len && queue[leftIndex]>queue[currnetIndex]) {
            console.error('currnetIndex',currnetIndex,queue[currnetIndex])
            return false;
        }

        if(rightIndex<len && queue[rightIndex]>queue[currnetIndex]) {
            console.error('currnetIndex',currnetIndex,queue[currnetIndex])
            return false;
        }


       
        currnetIndex++;

    }

    return true;
}


/**
 * @description 检测二叉树是否有序
 */
export const isBSTreeSorted = <T>(node: BSTreeNode<T>|null,compare:SortCompare=numberCompare): boolean => {
    
    if(!node) {
        return true;
    }

    if(node.left && !compare.less(node.left.value,node.value)) {
        return false;
    }

    if(node.right && !compare.less(node.value,node.right.value)) {
        return false;
    }

    return isBSTreeSorted(node.left,compare) && isBSTreeSorted(node.right,compare);
}