import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Start from '../views/Start.vue'
import Quiz from '../views/Quiz.vue'
import 'semantic-ui-css/semantic.min.css';

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: 'start',
                    name: 'Start',
                    component: Start,
                },
                {
                    path: 'quiz',
                    name: 'Quiz',
                    component: Quiz,
                    props: true,
                }
            ]
        },
    ]
})

export default router
