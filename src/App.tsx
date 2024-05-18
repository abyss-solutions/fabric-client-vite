import LoginButton from "./components/LoginButton";
import { PlatformList } from "./components/PlatformList";
import { AnalysisNavbar } from "./components/shared/AnalysisNavbar";

function App() {
  return (
    <>
      <AnalysisNavbar />
      <main>
        <h1>Fabric Client Vite</h1>
        <LoginButton />
        <PlatformList />
      </main>
    </>
  );
}

export default App;
