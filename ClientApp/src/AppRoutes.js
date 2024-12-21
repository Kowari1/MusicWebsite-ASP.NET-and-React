import { Counter } from "./components/Counter";
import FetchData from "./components/FetchData";
import { Home } from "./components/Home";
import TrackList from './components/TrackList';
import Player from './components/Player';

const AppRoutes = [
    {
        index: true,
        element: <FetchData />
    },
    {
        path: '/tracks',
        element: <FetchData />
    },
    {
        path: '/counter',
        element: <Counter />
    },
];

export default AppRoutes;
