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
  // LoginPage: {
  //   path: '/partner/login',
  //   exact: true,
  //   component:
  //     (localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("session")).expires) - new Date()) >= 0)
  //       ? HomePage
  //       : LoginPage
  //     ),
  //   private: false,
  //   layout: 'LoginLayout'
  // },
  // SignUpPage: {
  //   path: '/partner/sign-up',
  //   exact: true,
  //   component:
  //     (localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("session")).expires) - new Date()) >= 0)
  //       ? HomePage
  //       : SignUpPage
  //     ),
  //   private: false,
  //   layout: 'LoginLayout'
  // }
};

export default routes;