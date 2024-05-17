import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/sort',
            component: () => import('@/pages/sort/index')
        },
        {
            path:'/sort/priorityQueue',
            component:()=>import('@/pages/sort/priorityQueue')
        },
        {
            path: '/sort/test',
            component: () => import('@/pages/sort/test/index')
        }
    ]
})

export default router