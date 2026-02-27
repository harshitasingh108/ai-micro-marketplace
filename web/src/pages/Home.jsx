import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/products?search=${search}&page=${page}&limit=5`
      );
      const data = await res.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (err) {
      console.log("Error fetching products");
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const addFavorite = async (productId) => {
    try {
      await fetch("http://localhost:3000/favorites/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });

      alert("Added to favorites");
    } catch (err) {
      alert("Error adding favorite");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Products</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        style={{
          padding: "8px",
          width: "200px",
          marginBottom: "20px",
        }}
      />

      {products.length === 0 && <p>No products found</p>}

      {products.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{p.title}</h3>
          <p>₹ {p.price}</p>
          <p>{p.description}</p>

          <button
            onClick={() => addFavorite(p._id)}
            style={{
              padding: "6px 12px",
              backgroundColor: "pink",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            ❤️ Favorite
          </button>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          style={{ marginRight: "10px" }}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}