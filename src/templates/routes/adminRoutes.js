import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";

const HomePage = Loadable({
  loader: () => import("../../pages/admin/HomePage"),
  loading: MyLoadingComponent
});

const ProductPage = Loadable({
  loader: () => import("../../pages/admin/Product"),
  loading: MyLoadingComponent
});

const EmployeePage = Loadable({
  loader: () => import("../../pages/admin/Employee"),
  loading: MyLoadingComponent
});

const LoginPage = Loadable({
  loader: () => import("../../pages/admin/SignIn"),
  loading: MyLoadingComponent
});
const PromotionPage = Loadable({
  loader: () => import("../../pages/admin/Promotion"),
  loading: MyLoadingComponent
});

const AccountPage = Loadable({
  loader: () => import("../../pages/admin/Account"),
  loading: MyLoadingComponent
});

const routes = {
  HomePage: {
    path: '/admin',
    exact: true,
    component: HomePage,
    private: true
  },
  ProductPage: {
    path: '/admin/product',
    exact: true,
    component: ProductPage,
    private: true
  },
  AccountPage: {
    path: '/admin/account',
    exact: true,
    component: AccountPage,
    private: true
  },
  EmployeePage: {
    path: '/admin/employee',
    exact: true,
    component: EmployeePage,
    private: true
  },
  PromotionPage: {
    path: '/admin/promotion',
    exact: true,
    component: PromotionPage,
    private: true,
  },
  LoginPage: {
    path: '/admin/login',
    exact: true,
    component:
      (localStorage.getItem("sessionadmin") && ((new Date(JSON.parse(localStorage.getItem("sessionadmin")).token.expires) - new Date()) >= 0)
        ? HomePage
        : LoginPage
      ),
    private: false
  }
};

export default routes;