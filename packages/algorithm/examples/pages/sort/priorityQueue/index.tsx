import QueueTreeRender from "@/components/QueueTreeRender";
import { generateRandomArray } from "@src/utils";
import { Button, Input } from "ant-design-vue";
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  setup(props) {
    const queueArr = ref<number[]>([]);
    const formData = reactive({
      queueLength: 20,
      addValue: 0,
    });

    const generateQueue = () => {
      const queue = generateRandomArray(formData.queueLength);
      queueArr.value = queue;
    };

    const addItem = () => {
      queueArr.value.push(formData.addValue);
    };

    const renderForm = () => {
      return (
        <div>
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
            <Button type="primary" class="ml-[15px] w-[100px]" onClick={addItem}>
              添加
            </Button>
          </div>
        </div>
      );
    };

    return () => (
      <div class="h-full px-15">
        {renderForm()}
        <QueueTreeRender class="mt-[15px] h-[1000px] " queue={queueArr.value} />
      </div>
    );
  },
});
