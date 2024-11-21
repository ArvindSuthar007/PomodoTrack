import Navbar from "./Components/Navbar";
import Timer from "./Components/Timer";
import List_item_container from "./Components/List_item_container";
import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "./Components/globalContext";

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start">
      <Navbar />

      <GlobalProvider>
        <Timer />
        <List_item_container />
      </GlobalProvider>

      <Toaster />
    </div>
  );
}

export default App;
