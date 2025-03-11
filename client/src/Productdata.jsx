import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Productdata = () => {
  const [data, setData] = useState([]);

  const getDataFromAPI = () => {
    axios
      .get("http://localhost:8080/product")
      .then((res) => setData(res.data.products))
      .catch((err) => console.log(err));
  };

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:8080/deleteproduct/${id}`)
      .then(() => setData(data.filter((item) => item.id !== id)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>
        Product List
      </h1>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        justifyContent: "center"
      }}>
        {data.length > 0 &&
          data.map((el) => (
            <div key={el.id} style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
            }}>
              <Link to={`/discription/${el.id}`}>
                <img 
                  src={el.image} 
                  alt={el.title} 
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} 
                />
              </Link>
              
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: "10px 0" }}>
                {el.title}
              </h2>
              
              <h3 style={{ fontSize: "16px", color: "#007bff", marginBottom: "10px" }}>
                ${el.price}
              </h3>

              <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.4", marginBottom: "15px" }}>
                {el.description.length > 100 ? `${el.description.substring(0, 100)}...` : el.description}
              </p>

              <button 
                onClick={() => deleteProduct(el.id)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px"
                }}
              >
                Delete
              </button>

              <Link to={`/update/${el.id}`}>
                <button 
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Productdata;
