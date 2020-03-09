import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";



const HomePage = Loadable({
  loader: () => import("../../pages/admin/HomePage"),
  loading: MyLoadingComponent
});

const routes = {
  HomePage: {
    path: '/',
    exact: true,
    component: HomePage,
    private: true,
    layout: 'PartnerLayout'
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