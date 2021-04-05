import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import Joplin from "./Containers/Joplin";
import JoplinLive from "./Containers/JoplinLive";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={Joplin} />
            <Route exact path="/live/:roomId" component={JoplinLive} />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
