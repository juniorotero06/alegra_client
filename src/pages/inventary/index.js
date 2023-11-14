import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Layout from "../../containers/layout/index";
import CircularIndeterminate from "../../components/spinner/spinner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./inventary.css";

const Inventary = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = "https://kitchen-service-dev-shfa.3.us-1.fl0.io/api/kitchen";

  useEffect(() => {
    const getStoreData = () => {
      setIsLoading(true);
      axios
        .get(`${apiUrl}/ingredients`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar el Inventario", error);
          toast.error("Error al cargar el Inventario", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getStoreData();
  }, [apiUrl]);

  return (
    <Layout title="Inventario">
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        <ToastContainer />
        {isLoading ? (
          <CircularIndeterminate />
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Categoria</th>
                  <th>Origen</th>
                  <th>Cantidad</th>
                  <th>Fecha de adquisicion</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.name} style={{ textAlign: "center" }}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>{item.origin}</td>
                    <td>{item.quantity}</td>
                    <td>{item.acquisition_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Paper>
    </Layout>
  );
};

export default Inventary;
