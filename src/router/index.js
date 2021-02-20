import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Menu from '../views/Menu.vue'
import Start from '../views/Start.vue'
import Quiz from '../views/Quiz.vue'
import Results from '../views/Results.vue'
import 'semantic-ui-css/semantic.min.css';

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Menu',
            component: Menu,
            children: [
                {
                    path: 'start',
                    name: 'Start',
                    component: Start,
                },
                {
                    path: 'home',
                    name: 'Home',
                    component: Home,
                },
                {
                    path: 'quiz',
                    name: 'Quiz',
                    component: Quiz,
                    props: true,
                },
                {
                    path: 'results',
                    name: 'Results',
                    component: Results,
                    props: true,
                }
            ]
        },
    ]
})

router.replace('/home')
export default router
