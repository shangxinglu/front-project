import { defineComponent } from "vue";

import {
    heapSort,
    inPlaceMergeSort,
    inPlaceQuickSort,
    insertSort,
    mergeSort,
    quickSort,
    selectSort,
    shellSort
} from "@src/index"
import {
    generateRandomArray,
    isSorted
} from "@src/utils"

export default defineComponent({
    setup(props) {

        const arr = generateRandomArray(1000);
     

        // const sortedArr = selectSort(arr);
        // const sortedArr = insertSort(arr)
        // const sortedArr = shellSort(arr) 
        // const sortedArr = inPlaceMergeSort(arr)
        // const sortedArr = mergeSort(arr)
        // const sortedArr = quickSort(arr)
        // const sortedArr = inPlaceQuickSort(arr)
        const sortedArr = heapSort(arr)    
        if(isSorted(sortedArr)) {
            console.log('排序成功', sortedArr);

        } else {
            console.error('排序失败', sortedArr);
        
        }



        return () => (
            <div></div>
        )
    }
});