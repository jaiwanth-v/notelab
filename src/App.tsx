import { Provider } from "react-redux";
import "./App.scss";
import Editor from "./Containers/Note/Note";
import Notebooks from "./Containers/Notebooks/Notebooks";
import Notes from "./Containers/Notes/Notes";
import { store } from "./Redux/store";
interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Notebooks />
        <Notes />
        <Editor />
      </Provider>
    </div>
  );
};

export default App;
