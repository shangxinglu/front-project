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
export const generateRandomArray = (n: number=20, max: number=1e3): number[] => {
    const arr = [];
    for(let i=0;i<n;i++) {
        arr.push(Math.floor(Math.random() * max));
    }

    return arr;
}