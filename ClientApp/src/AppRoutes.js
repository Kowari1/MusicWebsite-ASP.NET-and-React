import { Counter } from "./components/Counter";
import FetchData from "./components/FetchData";
import { Home } from "./components/Home";

const AppRoutes = [
    { path: '/', element: <Home /> },
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