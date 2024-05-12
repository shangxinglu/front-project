import { getFirst, getLast, swap } from "@src/utils";
import { get } from "http";

/**
 * @description 选择排序
 */
export const selectSort = (arr: number[]): number[] => {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  return arr;
};

/**
 * @description 插入排序
 */
export const insertSort = (arr: number[]) => {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] >= arr[j - 1]) break;

      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
    }
  }

  return arr;
};

/**
 * @description 希尔排序
 */
export const shellSort = (arr: number[]) => {
  const len = arr.length;
  let h = 1;
  while (h < len / 3) {
    h = 3 * h + 1;
  }

  while (h >= 1) {
    for (let i = h; i < len; i++) {
      for (let j = i; j >= h; j -= h) {
        if (arr[j] >= arr[j - h]) continue;

        [arr[j], arr[j - h]] = [arr[j - h], arr[j]];
      }

    }
    h = Math.floor(h / 3);

  }

  return arr;
};


/**
 * @description 原地归并排序
 */
export const mergeSort = (arr: number[]):number[] => {
    const partitionArr = (start:number,end:number)=>{
        if(end-start <1) {

          return  [start];
        }


        const middle =  Math.floor((start+end)/2)
        
        merge(partitionArr(start,middle),partitionArr(middle+1,end))
        return [start,end]
    }

    const merge = (l:number[],r:number[]) =>{
        const leftMinIndex = getFirst(l)
        const leftMaxIndex = getLast(l)
        const leftMax = arr[leftMaxIndex]
        const leftMin = arr[leftMinIndex]

        const rightMinIndex = getFirst(r)
        const rightMaxIndex = getLast(r)
        const rightMin = arr[rightMinIndex]
        const rightMax = arr[rightMaxIndex]
        if(leftMax <= rightMin) return

        const leftLen = leftMaxIndex - leftMinIndex + 1
        const rightLen = rightMaxIndex - rightMinIndex + 1
      
        if(leftMin >= rightMax) {
      
          // 当左边长度大于右边长度时，保存左边的最大值
          if(leftLen > rightLen) {
            for(let i=0;i<rightLen;i++){
              const tmp = arr[leftMinIndex+i] 
              arr[leftMinIndex+i] = arr[rightMinIndex+i]
              if(i===0) {
                arr[leftMaxIndex] = tmp 
              } else {
                arr[rightMinIndex+i-1] = tmp
              }
            }

            arr[rightMaxIndex] = leftMax
          } 
          // 当右边长度大于左边长度时，保存右边下一位数值
          else if (leftLen < rightLen) {
            for(let i=0;i<leftLen;i++){
              const tmp = arr[leftMinIndex+i];
              const next = arr[rightMinIndex+i+1];
              arr[leftMinIndex+i] = i===0 ? arr[rightMinIndex+i] : next
              arr[rightMinIndex+i+1] =  tmp
            }
          } else {
            for(let i=0;i<leftLen;i++){
              const tmp = arr[leftMinIndex+i]
              arr[leftMinIndex+i] = arr[rightMinIndex+i]
              arr[rightMinIndex+i] = tmp
            }
          }
        } else {
          const minLen = Math.min(leftLen,rightLen);
            // 1.左右数组相同下标位置对比互换
            for(let i=0;i<minLen;i++) {
              if(arr[leftMinIndex+i] > arr[rightMinIndex+i]) {
                swap(arr,leftMinIndex+i,rightMinIndex+i)
              }
            }


            function leftSort(){
              let isSorted = true
              let rightFirst = arr[rightMinIndex]
              for(let i=0;i<leftLen;i++){
                const currentLeft = arr[leftMinIndex+i]
                  if(currentLeft>rightFirst){
                    swap(arr,rightMinIndex,leftMinIndex+i);
                    rightFirst = currentLeft
                    isSorted = false
                  }
              }

           

              return isSorted
            }

            function rightSort(){
              let isSorted = true
              for(let i=1;i<rightLen;i++){
                const current = arr[rightMinIndex+i-1];
                const next = arr[rightMinIndex+i];
                if(current>next) {
                  swap(arr,rightMinIndex+i,rightMinIndex+i-1)
                  isSorted= false
                }
              }

              return isSorted
            }

            while(true){
              // 2.从右边第一项开始查找比当前值大的数值进行交换 如果不存在则直接结束
              if(leftSort()) break


              // 3.交换完成重新步骤2 直到在左边不存在比当前值大的数值
              rightSort()

              
            }
            
            
           
        }
    }

    partitionArr(0,arr.length-1)
    return arr
}



