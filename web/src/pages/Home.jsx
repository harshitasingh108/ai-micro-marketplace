import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchProducts = async () => {
    const res = await fetch(
      `http://localhost:3000/products?search=${search}&page=${page}&limit=5`
    );
    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const addFavorite = async (productId) => {
    await fetch("http://localhost:3000/favorites/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });

    alert("Added to favorites");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1e1e2f, #2c2c3e)",
        padding: "40px",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "28px" }}>🛍 Products</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#ff4d4d",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        style={{
          padding: "12px",
          width: "300px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "30px",
        }}
      />

      {products.length === 0 && (
        <p style={{ opacity: 0.7 }}>No products found 😔</p>
      )}

      <div style={{ display: "grid", gap: "20px" }}>
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              backgroundColor: "#2f2f44",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            <h3>{p.title}</h3>
            <p style={{ fontWeight: "bold" }}>₹ {p.price}</p>
            <p style={{ opacity: 0.8 }}>{p.description}</p>

            <button
              onClick={() => addFavorite(p._id)}
              style={{
                marginTop: "10px",
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#ff66b2",
                color: "white",
                cursor: "pointer",
              }}
            >
              ❤️ Add to Favorite
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          style={{
            padding: "8px 14px",
            marginRight: "10px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{
            padding: "8px 14px",
            marginLeft: "10px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}