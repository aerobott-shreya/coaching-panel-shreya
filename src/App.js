import './App.css';
import AppRouter from './Router/AppRouter';
import UserCredsContextProvider from "./ContextApi/UserCredsContext/UserCredsContext";

function App() {
  return (
    <div className="App">
      <UserCredsContextProvider>
        <AppRouter />
      </UserCredsContextProvider>
    </div>
  );
}

export default App;