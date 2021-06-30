import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import Notelia from "./Containers/Notelia";
import NoteliaLive from "./Containers/NoteliaLive";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={Notelia} />
            <Route exact path="/live/:roomId" component={NoteliaLive} />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
