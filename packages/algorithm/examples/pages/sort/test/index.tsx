import { defineComponent } from "vue";

import {
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

        const arr = generateRandomArray();
    
        console.log('arr', arr);

        // const sortedArr = selectSort(arr);
        // const sortedArr = insertSort(arr)
        // const sortedArr = shellSort(arr)
        // const sortedArr = mergeSort(arr)
        const sortedArr = quickSort(arr)
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