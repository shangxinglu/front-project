import { defineComponent } from "vue";

import {
    selectSort
} from "@src/index"
import {
    generateRandomArray,
    isSorted
} from "@src/utils"

export default defineComponent({
    setup(props) {

        const arr = generateRandomArray();
        console.log('arr', arr);

        const sortedArr = selectSort(arr);
        if(isSorted(sortedArr)) {
            console.log('排序成功', sortedArr);

        } else {
            console.log('排序失败', sortedArr);
        
        }



        return () => (
            <div></div>
        )
    }
});