import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import AddLead from "./pages/AddLead";

function App() {
  const token = localStorage.getItem("token");
  const path = window.location.pathname;

  if (!token) return <Login />;
  if (path === "/leads") return <Leads />;
  if (path === "/add-lead") return <AddLead />;
  return <Dashboard />;
}

export default App;
