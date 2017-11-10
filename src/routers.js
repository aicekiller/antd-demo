import CommentApp from './page/comments/commentApp';
import Game from './page/game/game';
import Index from './page/theme/Index';
import TodoList from './page/todoList/todoList';

const routesconfig = [
    {
        path: "/comments",
        component: CommentApp
    },
    {
        path: "/game",
        component: Game
    },
    {
        path: "/theme",
        component: Index
    },
    {
        path: "/TodoList",
        component: TodoList
    }
];


export default routesconfig;