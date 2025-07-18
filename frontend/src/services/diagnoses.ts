import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  console.log(data);
  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnosis/${id}`);

  console.log(data);
  return data;
};

export default {
  getAll,
  getById,
};
