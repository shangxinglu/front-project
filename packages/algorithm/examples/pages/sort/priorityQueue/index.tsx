import QueueTreeRender from "@/components/QueueTreeRender";
import { priorityQueue } from "@src/sort/queue";
import { generateRandomArray, isPriorityQueueSorted } from "@src/utils";
import { Button, Input, Textarea } from "ant-design-vue";
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
export default defineComponent({
  setup(props) {
    const queueArr = ref<number[]>([]);
    const formData = reactive({
      queueLength: 31,
      addValue: 0,
      // 导入数据
      importData: "",
    });

    const record:number[] = []

   




    const operate = priorityQueue(queueArr.value)

    // 验证是否为优先队列
    const verifyQueue = ()=>{
      const result = isPriorityQueueSorted(queueArr.value)
      if(!result){
        console.error('不是优先队列')
      } 
    }

    const generateQueue = () => {
        queueArr.value.length = 0 
        for(let i=0;i<formData.queueLength;i++){
          handleAddRandom()
        }
    };


    const handleAddItem = ()=>{
      addItem(formData.addValue)
    }

    const addItem = (num:number) => {
      operate.insert(num);
      record.push(num)
      verifyQueue()
    };

  

  

    const handleAddRandom = () => {
      const num =Math.floor(Math.random() * 10000)
      addItem(num)
    }

    const handleDelMax  = ()=>{
        operate.delMax()
        verifyQueue()
    }

    const handleExportQueue = ()=>{
        console.log('排序后优先队列',queueArr.value)
    }

    const handleExportRecord = ()=>{
        console.log('添加记录',record)
    }
    const handleDelAll = ()=>{
      while(queueArr.value.length){
        handleDelMax()
      }
    }

    const handleImportData = () => {
      try {
        const data = JSON.parse(formData.importData);
        queueArr.value.length = 0;
        data.forEach((item: number) => {
          addItem(item);
        })
      } catch (e) {
        console.error(e);
      }
    }

    const renderForm = () => {
      return (
        <div class="px-[15px]">
          <div class="mt-[15px] px-[15px] flex items-center">
            <div class="w-[150px] text-right">生成数组长度：</div>
            <Input v-model:value={formData.queueLength} type="number" />
            <Button type="primary" class="ml-[15px] w-[100px]" onClick={generateQueue}>
              生成数组
            </Button>
          </div>
          <div class="mt-[15px] px-[15px]  flex items-center">
            <div class="w-[150px] text-right">添加选项：</div>
            <Input v-model:value={formData.addValue} type="number" />
            <Button type="primary" class="ml-[15px] w-[100px]" onClick={handleAddItem}>
              添加
            </Button>
          </div>
          <div class="mt-[15px]">
              <Button class="" type="primary" onClick={handleAddRandom}>添加随机数</Button>
              <Button class="ml-[15px]" type="primary" onClick={handleDelMax}>删除最大值</Button>
              <Button class="ml-[15px]" type="primary" onClick={handleExportQueue}>导出数据</Button>
              <Button class="ml-[15px]" type="primary" onClick={handleExportRecord}>导出记录</Button>
              <Button class="ml-[15px]" type="primary" danger onClick={handleDelAll}>删除全部</Button>
            </div>
          <div class="mt-[15px] flex items-center">
            <div class="w-[150px] text-right">导入数据：</div>
            <Textarea rows={10} v-model:value={formData.importData} />
            <Button type="primary" onClick={handleImportData} class="ml-[15px] w-[100px]">
              导入
              </Button>
          </div>
        </div>
      );
    };

    return () => (
      <div class="h-full px-[15px]">
        {renderForm()}
        <QueueTreeRender class="mt-[15px] h-[1000px] " queue={queueArr.value} />
      </div>
    );
  },
});
