import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Layout from "../../containers/layout/index";
import CircularIndeterminate from "../../components/spinner/spinner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./recipes.css";

const Recipes = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl =
    "https://recipes-node-allegra-dev-amqn.3.us-1.fl0.io/api/recipes";

  useEffect(() => {
    const getRecipesData = () => {
      setIsLoading(true);
      axios
        .get(`${apiUrl}/index`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar las recetas", error);
          toast.error("Error al cargar las recetas", {
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
    getRecipesData();
  }, [apiUrl]);

  return (
    <Layout title="Recetas">
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
                  <th>Ingredientes</th>
                  <th>Categoria</th>
                  <th>Autor</th>
                  <th>Imagen</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.name} style={{ textAlign: "center" }}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <ul>
                        {item.ingredients.map((ingredient) => (
                          <li key={ingredient.name}>
                            {ingredient.name}: {ingredient.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{item.category}</td>
                    <td>{item.author}</td>
                    <td>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="img-fluid custom-img"
                      />
                    </td>
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

export default Recipes;
