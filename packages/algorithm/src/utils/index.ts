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