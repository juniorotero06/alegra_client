import React, { useState } from "react";
import Layout from "../../containers/layout/index";
import Paper from "@mui/material/Paper";
import CircularIndeterminate from "../../components/spinner/spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function OrdersComponent() {
  const [ordersQuantity, setOrdersQuantity] = useState("");
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [placeHolderData, setPlaceHolderData] = useState([]);

  const apiUrl = "https://recipes-service-dev-tfat.4.us-1.fl0.io/api/recipes";

  const toastProps = {
    autoClose: 4000,
    hideProgressBar: false,
    position: "top-right",
    pauseOnHover: true,
    icon: "🚀",
  };

  const toastPropsSuccess = {
    ...toastProps,
    position: "top-center",
  };

  const toastPropsError = {
    ...toastProps,
    position: "bottom-right",
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmitButtonDisabled(true);
    try {
      const response = await axios.post(`${apiUrl}/order/${ordersQuantity}`);
      console.log(response.data);
      setPlaceHolderData(response.data.data);
      setData((prevData) => [...response.data.data, ...prevData]);
      toast.info("Cocinando!", toastProps);
      setTimeout(() => {
        setIsSubmitButtonDisabled(false);
        toast.success("Ordenes recibidas", toastPropsSuccess);
        setPlaceHolderData([]);
      }, 4000);
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "No se pudo obtener las ordenes de la cocina",
        toastPropsError
      );
    }
  };

  return (
    <Layout title="Pedidos">
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        <ToastContainer />
        <div>
          <div>
            <h2>Ordenes</h2>
            <form
              onSubmit={(event) => submitForm(event)}
              className="form-container"
            >
              <div className="form-group">
                <label htmlFor="ordersQuantity">
                  Cantidad de pedidos a solicitar:
                </label>
                <input
                  type="number"
                  id="ordersQuantity"
                  value={ordersQuantity || ""}
                  onChange={(e) => setOrdersQuantity(e.target.value)}
                  min="1"
                  required
                />
              </div>
              <button type="submit" disabled={isSubmitButtonDisabled}>
                {isSubmitButtonDisabled ? (
                  <CircularIndeterminate />
                ) : (
                  <span>Enviar</span>
                )}
              </button>
            </form>
          </div>

          {/* Ordenes en proceso */}
          {placeHolderData.length > 0 && isSubmitButtonDisabled && (
            <div className="container mb-4">
              <div className="row">
                <h3 className="text-center mt-4 mb-4">Ordenes en proceso</h3>
                {placeHolderData.map((item) => (
                  <div key={item.name} className="col-md-4 col-sm-6 mb-4">
                    <div className="card mb-4">
                      <div className="card-header">
                        <h4 className="card-title">{item.name}</h4>
                      </div>
                      <div className="card-body">
                        <div className="text-center mb-4">
                          <img
                            src="https://11cosasque.files.wordpress.com/2016/04/giphy-7.gif"
                            alt={item.name}
                            className="img-fluid custom-img"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ordenes terminadas */}
          {data.length > 0 && placeHolderData.length === 0 && (
            <div className="container">
              <div className="row">
                <h3 className="text-center mt-4 mb-4">
                  Ordenes terminadas {data.length}
                </h3>
                {data.map((item) => (
                  <div key={item.name} className="col-md-4 col-sm-6 mb-4">
                    <div className="card mb-4">
                      <div className="card-header">
                        <h4 className="card-title">{item.name}</h4>
                      </div>
                      <div className="card-body">
                        <div className="text-center mb-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="img-fluid custom-img"
                          />
                        </div>
                        <p className="card-text">
                          <strong>Descripcion:</strong> {item.description}
                        </p>
                        <p className="card-text">
                          <strong>Autor:</strong> {item.author}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Paper>
    </Layout>
  );
}

export default OrdersComponent;
