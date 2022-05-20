import Admin from "./pages/Admin";
import {
  ADMIN_ROUTE,
  PROFILE_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  ALLGAME_ROUTE,
  CATEGORY_ROUTE,
} from "./utils/consts";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Profile from "./pages/Profile";
import GamePage from "./pages/GamePage"
import Category from "./pages/Category";


export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + "/:id",
    Component: DevicePage,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: ALLGAME_ROUTE,
    Component: GamePage,
  },
  {
    path: CATEGORY_ROUTE,
    Component: Category,
  },
];
