import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Discription = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const getDataFromServer = () => {
    axios
      .get(`http://localhost:8080/discription/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  return (
    <div style={{ 
      maxWidth: "600px", 
      margin: "40px auto", 
      padding: "20px", 
      border: "1px solid #ddd", 
      borderRadius: "10px", 
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      backgroundColor: "#fff"
    }}>
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
      )}
      
      <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
        {data.title}
      </h1>
      
      <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#007bff", marginBottom: "10px" }}>
        ${data.price}
      </h2>
      
      <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#555", marginBottom: "15px" }}>
        Category: {data.category}
      </h3>

      <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>
        {data.description}
      </p>
    </div>
  );
};

export default Discription;
