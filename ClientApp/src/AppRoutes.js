import { Counter } from "./components/Counter";
import FetchData from "./components/FetchData";

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
