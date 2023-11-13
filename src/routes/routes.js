import Home from "../pages/home";
import OrdersComponent from "../pages/orders-component";
import Recipes from "../pages/recipes";
import PurchaseHistory from "../pages/purchase-history";
import Inventary from "../pages/inventary";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/pedidos",
    exact: true,
    component: OrdersComponent,
  },
  {
    path: "/recetas",
    exact: true,
    component: Recipes,
  },
  {
    path: "/inventario",
    exact: true,
    component: Inventary,
  },
  {
    path: "/historial-compras",
    exact: true,
    component: PurchaseHistory,
  },
];

export default routes;
