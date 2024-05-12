import { defineComponent } from "vue";

import {
    insertSort,
    mergeSort,
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
        const sortedArr = mergeSort(arr)
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