import Navbar from "./Components/Navbar";
import Timer from "./Components/Timer";
import ListItemContainer from "./Components/ListItemContainer";
import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "./Components/globalContext";
import { DefaultValueContextProvider } from "./Components/defaultValueContext";

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start">
      <DefaultValueContextProvider>
        <Navbar />

        <GlobalProvider>
          <Timer />
          <ListItemContainer />
        </GlobalProvider>
      </DefaultValueContextProvider>
      <Toaster />
    </div>
  );
}

export default App;
