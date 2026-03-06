import { useState } from "react";
import api from "../api/axios";

export default function ImportLeads(){

  const [file,setFile] = useState(null);

  const upload = async () => {

    const formData = new FormData();
    formData.append("file",file);

    await api.post("/leads/import",formData);

    alert("Leads imported successfully");
  }

  return (
    <div style={{padding:30}}>

      <h2>Import Leads from Excel</h2>

      <input
        type="file"
        accept=".xlsx"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <br/><br/>

      <button onClick={upload}>
        Upload
      </button>

    </div>
  )
}