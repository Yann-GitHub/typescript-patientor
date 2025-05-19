import diagnoseService from "../services/diagnoseService";
import express from "express";

const Router = express.Router();

Router.get("/", (_req, res) => {
  res.send(diagnoseService.getAllDiagnoses());
});

export default Router;
