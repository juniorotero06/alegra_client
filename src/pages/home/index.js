import React from "react";
import Layout from "../../containers/layout/index";

function Home() {
  return (
    <Layout title="Home">
      <div style={{ justifyContent: "center", textAlign: "center" }}>
        <h1>Prueba Tecnica Alegra</h1>
        <p>
          <strong>Desarrollador: </strong>Edgar Junior Otero Rada
        </p>
        <img
          src="https://cdn2.alegra.com/website/Logos_Alegra/Logotipo-Alegra.png"
          alt="preview"
          width="40%"
        />
      </div>
    </Layout>
  );
}

export default Home;
