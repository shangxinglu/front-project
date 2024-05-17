import {  defineComponent, onMounted, ref } from "vue";


export default defineComponent({
    emits:['init'],
    setup(props,{emit}) {

        const domRef = ref<HTMLCanvasElement | null>(null)

        let ctx:CanvasRenderingContext2D | null = null

        onMounted(() => {
                ctx = domRef.value?.getContext('2d') || null
                if(!ctx) return
                const {width,height} = domRef.value?.getBoundingClientRect() || {width:0,height:0}
                ctx.canvas.width = width
                ctx.canvas.height = height
                emit('init',ctx)
        })

        return () => (
            <canvas class="w-full" ref={domRef}></canvas>
        )
    }
});