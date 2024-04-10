import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Layout from "../../containers/layout/index";
import CircularIndeterminate from "../../components/spinner/spinner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./purchase.css";

const PurchaseHistory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = "https://kitchen-node-dev-apcb.3.us-1.fl0.io/api/kitchen";

  useEffect(() => {
    const getPurchaseHistoryData = () => {
      setIsLoading(true);
      axios
        .get(`${apiUrl}/purchase-history`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar el historial de compras", error);
          toast.error("Error al cargar el historial de compras", {
            position: "top-right",
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

    getPurchaseHistoryData();
  }, [apiUrl]);

  return (
    <Layout title="Historial de Compras">
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        <ToastContainer />
        {isLoading ? (
          <CircularIndeterminate />
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Factura</th>
                  <th>Ingrediente</th>
                  <th>Cantidad comprada</th>
                  <th>Fecha de compra</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.name} style={{ textAlign: "center" }}>
                    <td>{item.invoice_number}</td>
                    <td>{item.ingredient}</td>
                    <td>{item.quantity}</td>
                    <td>{item.purchase_date}</td>
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

export default PurchaseHistory;
