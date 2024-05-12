import { defineComponent, reactive, ref } from "vue";
import { Button, Input, Table, Textarea } from "ant-design-vue";
import { generateRandomArray, getRunTime } from "@src/utils";
import {
    inPlaceMergeSort,
  inPlaceQuickSort,
  insertSort,
  mergeSort,
  quickSort,
  selectSort,
  shellSort,
} from "@src/sort";

export default defineComponent({
  setup(props) {
    const formData = reactive({
        // 最大值
        max: 1e5,
        // 数组长度
      len: 1e3,
      // 测试组数
      testCount: 1e2,
      // 随机数据
      randomData: [] as number[],
      
    });

    const tableData = ref<SortTableItem[]>([]);

    const handleClickGenerate = () => {
      

      generateTableData();
    };

    const sortMethods = [
      {
        name: "选择排序",
        fn: selectSort,
      },
      {
        name: "插入排序",
        fn: insertSort,
      },
      
      {
        name: "归并排序",
        fn: mergeSort,
      },
      {
        name:'原地归并排序',
        fn:inPlaceMergeSort
      },
      {
        name: "快速排序",
        fn: quickSort,
      },
      {
        name:"原地快速排序",
        fn:inPlaceQuickSort
      },
      {
        name: "希尔排序",
        fn: shellSort,
      },
    ];

    // 生成排序表格数据
    const generateTableData = () => {

        const testData:number[][] = []
        for(let i=0;i<Number(formData.testCount);i++) {
            testData.push(generateRandomArray(formData.len,Number(formData.max)));
        }


        const data = sortMethods.map((item) => {
  

        const timeArr = testData.map((data) => {
            const runtime = getRunTime(item.fn, [...data]);
            return runtime;
        })
      
        return {
          name: item.name,
          runtime: getAverageTime(timeArr),
        };
      });

      tableData.value = data.sort((a, b) => a.runtime - b.runtime);
    };

    // 获取平均时间
    const getAverageTime = (arr: number[]) => {
      return arr.reduce((prev, next) => prev + next, 0) / arr.length;
    };

    const renderForm = () => {
      return (
        <div class="pt-[15px]">
          <div class="flex items-center">
          <div class="w-[100px] text-right">数组长度：</div>
            <Input v-model:value={formData.len} placeholder="请输入数组长度" />
          </div>
            <div class="flex items-center mt-[15px]">
                <div class="w-[100px] text-right">最大值：</div>
                <Input v-model:value={formData.max} placeholder="请输入最大值" />
            </div>
          <div class="flex items-center mt-[15px]">
            <div class="w-[100px] text-right">测试组数：</div>
            <Input
              v-model:value={formData.testCount}
              type="number"
              placeholder="请输入测试组数"
            />
          </div>
          <div class="mt-[15px]">
            <Button onClick={handleClickGenerate} type="primary">
              测试
            </Button>
          </div>

          {/* <div class="mt-[15px]">
            <Textarea rows={7} value={formData.randomData.join(",")} />
          </div> */}
        </div>
      );
    };

    const columns = [
      {
        title: "排序名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "排序时间",
        dataIndex: "runtime",
        key: "runtime",
      },
    ];

    const renderTable = () => {
      return (
        <div class="mt-[25px]">
          <Table columns={columns} dataSource={tableData.value} />
        </div>
      );
    };

    return () => (
      <div class="h-full px-[30px]">
        {renderForm()}
        {renderTable()}
      </div>
    );
  },
});
