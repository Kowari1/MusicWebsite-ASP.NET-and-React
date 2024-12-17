import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import TrackList from './components/TrackList';

const AppRoutes = [
  {
    index: true,
    element: <TrackList />
  },
  {
    path: '/tracks',
    element: <TrackList />,
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    index: true,
    element: <TrackList />,
  }
];

export default AppRoutes;
