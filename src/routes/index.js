import { createRouter } from "../core/JStestCore";
import Home from "./Home";
import Data from "./Data";
import DataEdit from "./DataEdit";
import About from "./About";
import NotFound from "./NotFound";

export default createRouter([
  { path: '#/', component: Home },
  { path: '#/data', component: Data},
  { path: '#/data/edit', component: DataEdit},
  { path: '#/about', component: About},
  { path: '.*', component: NotFound}
])