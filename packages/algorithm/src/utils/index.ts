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
export const swap = (arr: number[], i: number, j: number): void => {
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
