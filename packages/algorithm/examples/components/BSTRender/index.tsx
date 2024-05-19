import { PropType, defineComponent, watch } from "vue";
import Canvas from "../Canvas";

const BSTRenderProps = {
    tree: {
        type: Object as PropType<BSTreeNode<number>>,
        required: true
    }
}

export default defineComponent({
    props: BSTRenderProps,
    name: 'BSTRender',
    setup(props,{expose}) {
        let ctx: CanvasRenderingContext2D;

        watch(()=>props.tree,(newVal)=>{
            draw()
        },{
            deep:true
        })


        const drawData = {
            r: 20,
          };
      
          // 绘制节点
          const drawNode = (node:BSTreeNode<number>, coordinate = [0, 0]) => {
            const [x, y] = coordinate;
            const { r } = drawData;
            const {value,nodeSize} = node
            ctx.beginPath();
            ctx.arc(x + r, y + r, r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeText(`${nodeSize}-${value}`, x + r, y + r);
          };
      
          // 绘制连线
          const drawLine = (start: Coordinate, end: Coordinate) => {
            ctx.beginPath();
            ctx.moveTo(...start);
            ctx.lineTo(...end);
            ctx.stroke();
          };
      
          const clear = () => {
            const { width, height } = ctx.canvas;
            ctx.clearRect(0, 0, width, height);
          };
      

        const handleInit = (canvasCtx: CanvasRenderingContext2D) => {
            ctx = canvasCtx;
      
            draw();
          };

          const draw = () => {
            let current = props.tree;
            if(!current) return;
            const {width,height} = ctx.canvas;
            const drawSingle  = (node:BSTreeNode<number>,options:{
                startX:number,
                startY:number,
                endX:number,
            }) => {
                const { startX, startY, endX } = options;
                const { r } = drawData;
                const {value} = node
                const drawX = (startX + endX) / 2;
                drawNode(node, [drawX, startY]);

                if(node.left) {
                    drawLine([drawX + r, startY + 2*r], [(startX+drawX)/2+r, startY + 4 * r]);
                    drawSingle(node.left,{
                        startX,
                        startY:startY + 4 * r,
                        endX:(startX + endX) / 2
                    })
                }

                if(node.right) {
                    drawLine([drawX + r, startY + 2*r], [(drawX+endX)/2+r, startY + 4 * r]);
                    drawSingle(node.right,{
                        startX:(startX + endX) / 2,
                        startY:startY + 4 * r,
                        endX
                    })
                }

            }

            drawSingle(current,{
                startX:0,
                startY:0,
                endX:width
            })
          }

          const update = () => {
            clear()
                draw()
            }

            expose({
                update
            })


        return () => <Canvas onInit={handleInit} />;
    }
});