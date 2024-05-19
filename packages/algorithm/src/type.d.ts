declare interface PriorityQueueObject {
    delMax: () => void;
    insert: (val: number) => void;
}

/**
 * @description 排序比较接口
 */
declare interface SortCompare {
    /**
     * @description 判断 前一个元素 是否小于等于 后一个元素
     * @param a 前一个元素
     * @param b 后一个元素
     * @returns {boolean} 
     */
    // 比较两个元素大小 a: b: 
    less: (a: any, b: any) => boolean;
    /**
     * @description 判断 两个元素是否相等
     * @param a 前一个元素
     * @param b 后一个元素
     * @returns {boolean} 
     */
    isEqual?: (a: any, b: any) => boolean;

     
}


/**
 * @description 二叉查找树节点
 */
declare interface BSTreeNode<T> {
    key: number|string;
    value: T;
    parent: BSTreeNode<T> | null;
    left: BSTreeNode<T> | null;
    right: BSTreeNode<T> | null;
    nodeSize: number;

}