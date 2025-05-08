import Content from "./components/content/Content";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="px-14 max-md:px-6 max-[30rem]:px-2.5  py-8 space-y-8 overflow-x-hidden ">
      <Header />
      <Content />
    </div>
  );
}

export default App;
