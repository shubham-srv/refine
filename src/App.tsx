import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
import {} from "@pankod/refine-kbar";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import "styles/antd.less";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "components/layout";

import authProvider from "./auth-provider";
import Dashboard from "pages/dashboard/dashboard";
import { Login } from "pages/login";

const newRouterProvider = "";

function App() {
  return (
    <RefineKbarProvider>
      <Refine
        LoginPage={Login}
        DashboardPage={Dashboard}
        authProvider={authProvider}
        notificationProvider={notificationProvider}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "posts",
            list: PostList,
            create: PostCreate,
            edit: PostEdit,
            show: PostShow,
          },
        ]}
        Title={Title}
        Header={Header}
        Sider={Sider}
        Footer={Footer}
        Layout={Layout}
        OffLayoutArea={OffLayoutArea}
      />
    </RefineKbarProvider>
  );
}

export default App;
