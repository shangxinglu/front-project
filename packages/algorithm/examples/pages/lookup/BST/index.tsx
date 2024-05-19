import BSTRender from "@/components/BSTRender";
import { BSTree } from "@src/lookup/tree";
import { isBSTreeSorted, numberCompare } from "@src/utils";
import { Button, Input, Textarea } from "ant-design-vue";
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  setup(props) {
    const treeData = ref<BSTreeNode<number>>();
    const BSTRef = ref<BSTRenderExpose>();
    const record: number[] = [];

    const formData = reactive({
        addValue: 0,
        updateKey: '',
        updateValue: 0,
        importData: "",
    });

    const bst = new BSTree<number>();

    const handleAddRandom = () => {
      const num = Math.floor(Math.random() * 10000);
        addItem(num+'',num);
    };

    const addItem = (key:number|string,num: number) => {
        bst.put(key,num);
        verifyTree();
        record.push(num);
        if (!treeData.value) {
          treeData.value = bst.root!;
        }
        updateTree();
    }

   

    // 检验二叉树排序
    const verifyTree = () => {
        isBSTreeSorted<number>(treeData.value!)
    }

    const handleAddItem = () => {
        addItem(formData.addValue,Number(formData.addValue))
    }

    const handleUpdateItem = () => {
        if(!formData.updateKey) return
        addItem(formData.updateKey,Number(formData.updateValue))
  
    }
   

    const updateTree = () => {
        BSTRef.value?.update()
    }

    const handleDelMin = () => {
        bst.delMin();
        updateTree();
    }

    const handleDelMax = () => {
        bst.delMax();
        updateTree();
    }

    const handleImportData = () => {
        try {
           const data:number[] = JSON.parse(formData.importData)||[]
        data.forEach((item) => {
          addItem(item+'',Number(item));
        });
    } catch (e) {
        console.error(e);
    }
    };

    const handleExport = () => {
        console.log('导出数据',record)
    }


    const renderForm = () => {
      return (
        <div>
            <div class="mt-[15px] px-[15px]  flex items-center">
            <div class="w-[150px] text-right">添加选项：</div>
            <Input v-model:value={formData.addValue} type="number" />
            <Button type="primary" class="ml-[15px] w-[100px]" onClick={handleAddItem}>
              添加
            </Button>
          </div>
          <div class="mt-[15px] px-[15px]  flex items-center">
            <div class="w-[150px] text-right">更新选项：</div>
            <Input class="w-[200px]" placeholder="请输入更新key" v-model:value={formData.updateKey} type="text" />
            <Input class="ml-[15px]" placeholder="请输入更新值" v-model:value={formData.updateValue} type="number" />
            <Button type="primary" class="ml-[15px] w-[100px]" onClick={handleUpdateItem}>
              更新
            </Button>
          </div>
          <div class="mt-[15px]">
            <Button class="" type="primary" onClick={handleAddRandom}>
              添加随机数
            </Button>
            <Button class="ml-[15px]" type="primary" danger onClick={handleDelMin}>
                删除最小值
                </Button>
            <Button class="ml-[15px]" type="primary"  danger onClick={handleDelMax}>
                删除最大值
                </Button>

                <Button class="ml-[15px]" type="primary" onClick={handleExport}>
                    导出数据
                </Button>


                
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
        <BSTRender class="h-[800px]" ref={BSTRef} tree={treeData.value} />
      </div>
    );
  },
});
