import CommentApp from './page/comments/commentApp';
import Game from './page/game/game';
import Index from './page/theme/Index';

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
    }
];


export default routesconfig;