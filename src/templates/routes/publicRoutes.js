import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";



const HomePage = Loadable({
  loader: () => import("../../pages/public/HomePage"),
  loading: MyLoadingComponent
});

const CategoryPage = Loadable({
  loader: () => import("../../pages/public/CategoryPage"),
  loading: MyLoadingComponent
});

const DetailPage = Loadable({
  loader: () => import("../../pages/public/DetailPage"),
  loading: MyLoadingComponent
});
const CartPage = Loadable({
  loader: () => import("../../pages/public/CartPage"),
  loading: MyLoadingComponent
});
const CheckOutPage = Loadable({
  loader: () => import("../../pages/public/CheckOutPage"),
  loading: MyLoadingComponent
});
const SignUpPage = Loadable({
  loader: () => import("../../pages/public/SignUpPage"),
  loading: MyLoadingComponent
});
const SignInPage = Loadable({
  loader: () => import("../../pages/public/SignInPage"),
  loading: MyLoadingComponent
});
const AccountPage = Loadable({
  loader: () => import("../../pages/public/Account"),
  loading: MyLoadingComponent
});


const routes = {
  HomePage: {
    path: '/',
    exact: true,
    component: HomePage,
    private: true,
    layout: 'HomeLayout'
  },
  CategoryPage: {
    path: '/category/:category',
    exact: true,
    component: CategoryPage,
    private: true,
    layout: 'PublicLayout'
  },
  TypePage: {
    path: '/type/:type',
    exact: true,
    component: CategoryPage,
    private: true,
    layout: 'PublicLayout'
  },
  SearchPage: {
    path: '/search/:keyword',
    exact: true,
    component: CategoryPage,
    private: true,
    layout: 'PublicLayout'
  },
  NewPage: {
    path: '/new',
    exact: true,
    component: CategoryPage,
    private: true,
    layout: 'PublicLayout'
  },
  SalePage: {
    path: '/sale',
    exact: true,
    component: CategoryPage,
    private: true,
    layout: 'PublicLayout'
  },
  DetailPage: {
    path: '/products/:id',
    exact: true,
    component: DetailPage,
    private: true,
    layout: 'PublicLayout'
  },
  CartPage: {
    path: '/cart',
    exact: true,
    component: CartPage,
    private: true,
    layout: 'PublicLayout'
  },
  CheckOutPage: {
    path: '/checkout',
    exact: true,
    component: CheckOutPage,
    private: true,
    layout: 'PublicLayout'
  },
  AccountPage: {
    path: '/acc',
    exact: true,
    component: AccountPage,
    private: true,
    layout: 'PublicLayout'
  },
  SignUpPage: {
    path: '/signup',
    exact: true,
    component: SignUpPage,
    private: true,
    layout: 'PublicLayout'
  },
  SignInPage: {
    path: '/signin',
    exact: true,
    component: SignInPage,
    private: true,
    layout: 'PublicLayout'
  },
};

export default routes;