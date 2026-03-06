import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import AddLead from "./pages/AddLead";
import LeadDetails from "./pages/LeadDetails";
import ImportLeads from "./pages/ImportLeads";

function App() {
  const token = localStorage.getItem("token");
  const path = window.location.pathname;

  if (!token) return <Login />;
  if (path === "/leads") return <Leads />;
  if (path === "/add-lead") return <AddLead />;
  if (path === "/create-user") return <CreateUser />;
  if (path === "/lead") return <LeadDetails />;
  if (path === "/import-leads") return <ImportLeads />;

  return <Dashboard />;
}

export default App;