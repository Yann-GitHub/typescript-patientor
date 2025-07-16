import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Divider, Container } from "@mui/material";
import { apiBaseUrl } from "./constants";
import { Patient } from "./types";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetailsPage from "./components/PatientDetailsPage";
import SharedLayout from "./components/SharedLayout";
import PageNotFound from "./components/404";
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";
// import Header from "./components/Header";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        {/* <Header />
        <Divider hidden /> */}
        {/* <Container> */}
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route
              path="/patients"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route path="/patients/:id" element={<PatientDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
