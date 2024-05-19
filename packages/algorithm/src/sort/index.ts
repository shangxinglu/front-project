import { getFirst, getLast, isEqual, isPriorityQueueSorted, less, swap } from "@src/utils";
import { sink } from "./queue";


const defalutSortCompare= {
  less: less,
  isEqual: isEqual,
}

/**
 * @description 选择排序
 */
export const selectSort = <T>(arr: T[],compare:SortCompare=defalutSortCompare): T[] => {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (!compare.less(arr[minIndex],arr[j])) {
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
export const insertSort = <T>(arr: T[],compare:SortCompare=defalutSortCompare) => {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (compare.less(arr[j - 1],arr[j])) break;

      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
    }
  }

  return arr;
};

/**
 * @description 希尔排序
 */
export const shellSort = <T>(arr: T[],compare:SortCompare=defalutSortCompare) => {
  const len = arr.length;
  let h = 1;
  while (h < len / 3) {
    h = 3 * h + 1;
  }

  while (h >= 1) {
    for (let i = h; i < len; i++) {
      for (let j = i; j >= h; j -= h) {
        if (compare.less(arr[j - h],arr[j] )) continue;

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
export const inPlaceMergeSort = <T>(arr: T[],compare:SortCompare=defalutSortCompare):T[] => {
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
        if(compare.less(leftMax, rightMin)) return

        const leftLen = leftMaxIndex - leftMinIndex + 1
        const rightLen = rightMaxIndex - rightMinIndex + 1
      
        if(compare.less(rightMax,leftMin)) {
      
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
              if(!compare.less(arr[leftMinIndex+i],arr[rightMinIndex+i])) {
                swap(arr,leftMinIndex+i,rightMinIndex+i)
              }
            }


            function leftSort(){
              let isSorted = true
              let rightFirst = arr[rightMinIndex]
              for(let i=0;i<leftLen;i++){
                const currentLeft = arr[leftMinIndex+i]
                  if(!compare.less(currentLeft,rightFirst)){
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
                if(!compare.less(current,next)) {
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


/**
 * @description 归并排序
 */
export const mergeSort = (arr: number[],compare:SortCompare=defalutSortCompare,options:{
  start:number,
  end:number
} ={
  start:0,end:arr.length-1
}):number[] => {
  const {start,end} = options
    
      if(end-start <= 1) {
        return [arr[start]]
      }

      const middle = Math.floor((start+end)/2)
      const left = mergeSort(arr,compare,{start,end:middle})
      const right = mergeSort(arr,compare,{start:middle,end})
      const result:number[] =[]
      let leftIndex = 0;
      let rightIndex = 0;
      while(leftIndex < left.length || rightIndex < right.length ) {
        const currentLeft = left[leftIndex]
        const currentRight = right[rightIndex]

        if(leftIndex >= left.length) {
          result.push(currentRight)
          rightIndex++
          continue
        } else if(rightIndex >= right.length) {
          result.push(currentLeft)
          leftIndex++
          continue
        }

        if(!compare.less(currentRight,currentLeft) ) {
          result.push(currentLeft)
          leftIndex++
        } else {
          result.push(currentRight)
          rightIndex++
        }
      }


      return result

}

/**
 * @description 快速排序
 */
export const quickSort = <T>(arr: T[],compare:SortCompare=defalutSortCompare,options:{
  startIndex:number,
  endIndex:number
} = {
  startIndex:0,
  endIndex:arr.length-1}
): T[] => {
  const {startIndex,endIndex} = options
    const len = endIndex-startIndex + 1;
    if(len <1 || startIndex<0 || endIndex>=arr.length || endIndex<0 ) return arr

    // 1.记录基准值下标
    let baseIndex = startIndex;

    // 2.找到基准值
    const baseValue = arr[baseIndex]
    // 优化算法 记录与基准值相同数组
    let sameArr:T[] = [baseValue]
    const leftArr:T[] = []
    const rightArr:T[] = []

    // 3.循环将小于基准值的项放入左数组，大于基准值的项放入右数组
    for(let i=baseIndex+1;i<=endIndex;i++){
      if(compare.less(arr[i],baseValue)){
        
        if(compare.isEqual!(baseValue, arr[i])){
          sameArr.push(arr[i])
        } else {
          leftArr.push(arr[i])
        }
      } else {
        rightArr.push(arr[i])
      }
    }

    // 4.以基准值为划分点 对左右两个数组递归排序
    const left = quickSort(leftArr,compare,{startIndex:0,endIndex:leftArr.length-1})
    const right = quickSort(rightArr,compare,{startIndex:0,endIndex:rightArr.length-1})
    
    return left.concat(sameArr,right)

    

    
}


/**
 * @description 原地快速排序
 */
export const inPlaceQuickSort = <T>(arr: T[],compare:SortCompare=defalutSortCompare,options:{
  startIndex:number,
  endIndex:number
} = {
  startIndex:0,
  endIndex:arr.length-1}
): T[] => {
  const {startIndex,endIndex} = options
    const len = endIndex-startIndex + 1;
    if(len <1 || startIndex<0 || endIndex>=arr.length || endIndex<0 ) return arr

    // 1.记录基准值下标和下次基准值交换位置 
    let baseIndex = startIndex;
    let nextBaseIndex = baseIndex
    // 优化算法 记录与基准值相同的下标
    const sameIndex:number[]= []

    // 2.找到基准值
    const baseValue = arr[baseIndex]


    // 3.循环将小于基准值的项与基准值位置互换，基准值向右移动
    for(let i=nextBaseIndex+1;i<=endIndex;i++){
      if(compare.less(arr[i],baseValue)){
        if(compare.isEqual!(baseValue,arr[i])){
          sameIndex.push(nextBaseIndex)
        }
        if(nextBaseIndex===baseIndex) {
          baseIndex = i;
        }
        swap(arr,nextBaseIndex,i)
        
        nextBaseIndex++;
      } 
    }


    // 4.将基准值换到最终基准下标位置
    if(nextBaseIndex < baseIndex){
      swap(arr,nextBaseIndex,baseIndex)

    }
    // 将相同值位置进行交换
    for(let i=sameIndex.length-1;i>=0;i--){
      nextBaseIndex--
      const index = sameIndex[i]
      swap(arr,nextBaseIndex,index)

    }

    // 5.以基准值为划分点 对左右两个数组递归排序
    inPlaceQuickSort(arr,compare,{startIndex,endIndex:nextBaseIndex-1})
    inPlaceQuickSort(arr,compare,{startIndex:nextBaseIndex+sameIndex.length+1,endIndex})

    return arr


}




/**
 * @description 堆排序
 */
export const heapSort = <T>(arr: T[],compare:SortCompare=defalutSortCompare): T[] => {
  const len = arr.length;
  let currentIndex = Math.floor(len/2)-1

   // 1.构建最大堆
   while(currentIndex>=0){
    sink(arr,compare,{currentIndex});
    currentIndex--
   }

  // 2.进行下沉排序
  
  // 剩余长度
   let  remainLen = len;
   while(remainLen>0){
      // 重新下沉
      sink(arr,compare,{currentIndex:0,len:remainLen})

      // 交换最大值到最后一位
      swap(arr,0,remainLen-1)

      remainLen--
   }

   return arr
}
