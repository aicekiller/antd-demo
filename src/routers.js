import CommentApp from './page/comments/commentApp';
import Game from './page/game/game';

const routesconfig = [
    {
        path:"/comments",
        component:CommentApp
    },
    {   path:"/game",
        component:Game
    }
];


export default routesconfig;