
/**
 * @description 选择排序
 */
export const selectSort = (arr: number[]): number[] => {
    const len = arr.length;

    for(let i=0;i<len;i++) {
        let minIndex = i;
        for(let j=i+1;j<len;j++) {
            if(arr[i] >  arr[j]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    return arr;
}