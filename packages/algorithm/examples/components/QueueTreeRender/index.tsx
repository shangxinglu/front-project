import { PropType, defineComponent, ref, watch } from "vue";
import Canvas from "../Canvas";

const QueueTreeRenderProps = {
  queue: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
};

export default defineComponent({
  props: QueueTreeRenderProps,
  setup(props) {
    let ctx: CanvasRenderingContext2D;
    const queueArr = ref<number[]>([]);

    watch(
      () => props.queue,
      (newVal) => {
        queueArr.value = [...newVal];
      },{
        deep: true,
      }
    );

    watch(
      () => queueArr.value,
      (newVal) => {
        clear();
        draw();
      }
    );

    const handleInit = (canvasCtx: CanvasRenderingContext2D) => {
      ctx = canvasCtx;

      draw();
    };

    const drawData = {
      r: 20,
    };

    // 绘制节点
    const drawNode = (value = "", coordinate = [0, 0]) => {
      const [x, y] = coordinate;
      const { r } = drawData;
      ctx.beginPath();
      ctx.arc(x + r, y + r, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeText(value, x + r, y + r);
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

    const draw = () => {
      const { r } = drawData;

      const drawSingle = (
        arr: number[],
        options: {
          startX: number;
          endX: number;
          startY: number;
          startIndex: number;
        }
      ) => {
        const { startX, endX, startY, startIndex } = options;
        if (startIndex >= arr.length) return;
        const x = (startX + endX) / 2;
        const item = arr[startIndex];

        drawNode(item + "", [x, startY]);

        const lineStart: Coordinate = [x + r, startY + r * 2];
        const nextLeftNodeIndex = startIndex * 2 + 1;
        const nextRightNodeIndex = startIndex * 2 + 2;

        if (nextLeftNodeIndex < arr.length) {
          const nextLeftStartX = startX;
          const nextLeftEndX = x;
          drawLine(lineStart, [
            (nextLeftStartX + nextLeftEndX) / 2+r,
            startY + 4 * r,
          ]);
          drawSingle(arr, {
            startX,
            endX: x,
            startY: startY + r * 4,
            startIndex: startIndex * 2 + 1,
          });
        }

        if (nextRightNodeIndex < arr.length) {
          const nextRightStartX = x;
          const nextRightEndX = endX;
          drawLine(lineStart, [
            (nextRightStartX + nextRightEndX) / 2+r,
            startY + 4 * r,
          ]);
          drawSingle(arr, {
            startX: x,
            endX: endX,
            startY: startY + r * 4,
            startIndex: startIndex * 2 + 2,
          });
        }
      };

      drawSingle(queueArr.value, {
        startX: 0,
        endX: ctx.canvas.width,
        startY: r,
        startIndex: 0,
      });
    };

    return () => <Canvas onInit={handleInit} />;
  },
});
