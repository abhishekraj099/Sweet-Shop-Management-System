// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "./api";
// import "./App.css";

// interface User {
//   email: string;
//   role: "user" | "admin";
// }

// interface Sweet {
//   _id: string;
//   name: string;
//   category: string;
//   price: number;
//   quantity: number;
// }

// function App() {
//   const [token, setToken] = useState<string | null>(
//     localStorage.getItem("token")
//   );
//   const [user, setUser] = useState<User | null>(
//     localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user") as string)
//       : null
//   );
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [sweets, setSweets] = useState<Sweet[]>([]);
//   const [search, setSearch] = useState("");

//   // admin sweet form state
//   const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [sweetForm, setSweetForm] = useState({
//     name: "",
//     category: "",
//     price: 0,
//     quantity: 0
//   });

//   const api = axios.create({
//     baseURL: API_BASE_URL,
//     headers: token ? { Authorization: `Bearer ${token}` } : {}
//   });

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
//         email,
//         password
//       });
//       setToken(res.data.token);
//       setUser(res.data.user);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       await loadSweets();
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setSweets([]);
//   };

//   const loadSweets = async () => {
//     if (!token) return;
//     const res = await api.get<Sweet[]>("/api/sweets");
//     setSweets(res.data);
//   };

//   const handlePurchase = async (id: string) => {
//     try {
//       await api.post(`/api/sweets/${id}/purchase`, { quantity: 1 });
//       await loadSweets();
//     } catch (err) {
//       console.error(err);
//       alert("Purchase failed");
//     }
//   };

//   const handleSearch = async () => {
//     if (!token) return;
//     const res = await api.get<Sweet[]>("/api/sweets/search", {
//       params: { name: search }
//     });
//     setSweets(res.data);
//   };

//   // ---- admin: open forms ----
//   const openCreateForm = () => {
//     setEditingSweet(null);
//     setSweetForm({ name: "", category: "", price: 0, quantity: 0 });
//     setShowForm(true);
//   };

//   const openEditForm = (sweet: Sweet) => {
//     setEditingSweet(sweet);
//     setSweetForm({
//       name: sweet.name,
//       category: sweet.category,
//       price: sweet.price,
//       quantity: sweet.quantity
//     });
//     setShowForm(true);
//   };

//   const handleSaveSweet = async () => {
//     if (!token) return;
//     try {
//       if (editingSweet) {
//         await api.put(`/api/sweets/${editingSweet._id}`, sweetForm);
//       } else {
//         await api.post("/api/sweets", sweetForm);
//       }
//       setShowForm(false);
//       setEditingSweet(null);
//       await loadSweets();
//     } catch (err) {
//       console.error(err);
//       alert("Saving sweet failed");
//     }
//   };

//   const handleDeleteSweet = async (id: string) => {
//     if (!token) return;
//     if (!window.confirm("Delete this sweet?")) return;
//     try {
//       await api.delete(`/api/sweets/${id}`);
//       await loadSweets();
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       loadSweets();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   // ---------- LOGIN VIEW ----------
//   if (!token || !user) {
//     return (
//       <div className="app-root">
//         <div className="login-card">
//           <div className="login-header">
//             <h1>Sweet Shop</h1>
//             <p>Sign in to manage sweets, inventory and purchases.</p>
//           </div>

//           <div className="field">
//             <label className="field-label">Email</label>
//             <input
//               className="input"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="abhisraj099@gmail.com"
//             />
//           </div>

//           <div className="field">
//             <label className="field-label">Password</label>
//             <input
//               className="input"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Admin123!"
//             />
//           </div>

//           <button className="btn btn-primary" onClick={handleLogin}>
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ---------- DASHBOARD VIEW ----------
//   const totalSweets = sweets.length;
//   const lowStock = sweets.filter((s) => s.quantity < 5).length;

//   return (
//     <div className="app-root">
//       <div className="dashboard-card">
//         <header className="header">
//           <div className="header-main">
//             <h2>Sweet Shop Dashboard</h2>
//             <span>Track stock, prices and purchases in real time.</span>
//             <div className="user-pill">
//               Logged in as <strong>{user.email}</strong> ({user.role})
//             </div>
//           </div>
//           <button className="btn btn-ghost" onClick={handleLogout}>
//             Logout
//           </button>
//         </header>

//         <div className="stats">
//           <span>Total sweets: {totalSweets}</span>
//           <span>• Low stock (&lt; 5): {lowStock}</span>
//         </div>

//         <div className="toolbar">
//           <input
//             className="input search-input"
//             placeholder="Search sweets by name..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button className="btn btn-primary" onClick={handleSearch}>
//             Search
//           </button>
//           <button className="btn btn-ghost" onClick={loadSweets}>
//             Clear
//           </button>
//         </div>

//         {/* ---- ADMIN INVENTORY FORM ---- */}
//         {user.role === "admin" && (
//           <div style={{ marginBottom: 16 }}>
//             {!showForm && (
//               <button className="btn btn-ghost" onClick={openCreateForm}>
//                 + Add sweet
//               </button>
//             )}

//             {showForm && (
//               <div
//                 style={{
//                   marginTop: 8,
//                   marginBottom: 8,
//                   padding: 12,
//                   borderRadius: 16,
//                   border: "1px solid rgba(31,41,55,0.9)",
//                   background:
//                     "radial-gradient(circle at top, #020617, #020617)"
//                 }}
//               >
//                 <div className="field">
//                   <label className="field-label">Name</label>
//                   <input
//                     className="input"
//                     value={sweetForm.name}
//                     onChange={(e) =>
//                       setSweetForm({ ...sweetForm, name: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="field">
//                   <label className="field-label">Category</label>
//                   <input
//                     className="input"
//                     value={sweetForm.category}
//                     onChange={(e) =>
//                       setSweetForm({ ...sweetForm, category: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="field">
//                   <label className="field-label">Price (₹)</label>
//                   <input
//                     className="input"
//                     type="number"
//                     value={sweetForm.price}
//                     onChange={(e) =>
//                       setSweetForm({
//                         ...sweetForm,
//                         price: Number(e.target.value)
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="field">
//                   <label className="field-label">Quantity</label>
//                   <input
//                     className="input"
//                     type="number"
//                     value={sweetForm.quantity}
//                     onChange={(e) =>
//                       setSweetForm({
//                         ...sweetForm,
//                         quantity: Number(e.target.value)
//                       })
//                     }
//                   />
//                 </div>

//                 <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
//                   <button className="btn btn-primary" onClick={handleSaveSweet}>
//                     {editingSweet ? "Update sweet" : "Create sweet"}
//                   </button>
//                   <button
//                     className="btn btn-ghost"
//                     onClick={() => {
//                       setShowForm(false);
//                       setEditingSweet(null);
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         <div className="table-wrapper">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Price (₹)</th>
//                 <th>Quantity</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sweets.map((sweet) => {
//                 const disabled = sweet.quantity === 0;
//                 return (
//                   <tr key={sweet._id}>
//                     <td>{sweet.name}</td>
//                     <td>{sweet.category}</td>
//                     <td>{sweet.price}</td>
//                     <td>{sweet.quantity}</td>
//                     <td>
//                       <div
//                         style={{
//                           display: "flex",
//                           gap: 8,
//                           justifyContent: "center"
//                         }}
//                       >
//                         <button
//                           className={`btn btn-primary btn-purchase ${
//                             disabled ? "disabled" : ""
//                           }`}
//                           onClick={() => handlePurchase(sweet._id)}
//                           disabled={disabled}
//                         >
//                           {disabled ? "Out of stock" : "Purchase"}
//                         </button>
//                         {user.role === "admin" && (
//                           <>
//                             <button
//                               className="btn btn-ghost"
//                               onClick={() => openEditForm(sweet)}
//                             >
//                               Edit
//                             </button>
//                             <button
//                               className="btn btn-ghost"
//                               onClick={() => handleDeleteSweet(sweet._id)}
//                             >
//                               Delete
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//               {sweets.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="empty-row">
//                     No sweets found. Try searching with a different name.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api";
import "./App.css";

interface User {
  email: string;
  role: "user" | "admin";
}

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [search, setSearch] = useState("");

  // extra filters for assignment
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // admin sweet form state
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sweetForm, setSweetForm] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
  });

  // axios instance pointing at ".../api"
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      await loadSweets();
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSweets([]);
  };

  const loadSweets = async () => {
    if (!token) return;
    const res = await api.get<Sweet[]>("/sweets");
    setSweets(res.data);
  };

  const handlePurchase = async (id: string) => {
    try {
      await api.post(`/sweets/${id}/purchase`, { quantity: 1 });
      await loadSweets();
    } catch (err) {
      console.error(err);
      alert("Purchase failed");
    }
  };

  const handleSearch = async () => {
    if (!token) return;

    const params: any = {};
    if (search.trim()) params.name = search.trim();
    if (categoryFilter.trim()) params.category = categoryFilter.trim();
    if (minPrice.trim()) params.minPrice = Number(minPrice);
    if (maxPrice.trim()) params.maxPrice = Number(maxPrice);

    const res = await api.get<Sweet[]>("/sweets/search", { params });
    setSweets(res.data);
  };

  // ---- admin: open forms ----
  const openCreateForm = () => {
    setEditingSweet(null);
    setSweetForm({ name: "", category: "", price: 0, quantity: 0 });
    setShowForm(true);
  };

  const openEditForm = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setSweetForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
    setShowForm(true);
  };

  const handleSaveSweet = async () => {
    if (!token) return;
    try {
      if (editingSweet) {
        await api.put(`/sweets/${editingSweet._id}`, sweetForm);
      } else {
        await api.post("/sweets", sweetForm);
      }
      setShowForm(false);
      setEditingSweet(null);
      await loadSweets();
    } catch (err) {
      console.error(err);
      alert("Saving sweet failed");
    }
  };

  const handleDeleteSweet = async (id: string) => {
    if (!token) return;
    if (!window.confirm("Delete this sweet?")) return;
    try {
      await api.delete(`/sweets/${id}`);
      await loadSweets();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    if (token) {
      loadSweets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ---------- LOGIN VIEW ----------
  if (!token || !user) {
    return (
      <div className="app-root">
        <div className="login-card">
          <div className="login-header">
            <h1>Sweet Shop</h1>
            <p>Sign in to manage sweets, inventory and purchases.</p>
          </div>

          <div className="field">
            <label className="field-label">Email</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abhisraj099@gmail.com"
            />
          </div>

          <div className="field">
            <label className="field-label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin123!"
            />
          </div>

          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    );
  }

  // ---------- DASHBOARD VIEW ----------
  const totalSweets = sweets.length;
  const lowStock = sweets.filter((s) => s.quantity < 5).length;

  return (
    <div className="app-root">
      <div className="dashboard-card">
        <header className="header">
          <div className="header-main">
            <h2>Sweet Shop Dashboard</h2>
            <span>Track stock, prices and purchases in real time.</span>
            <div className="user-pill">
              Logged in as <strong>{user.email}</strong> ({user.role})
            </div>
          </div>
          <button className="btn btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <div className="stats">
          <span>Total sweets: {totalSweets}</span>
          <span>• Low stock (&lt; 5): {lowStock}</span>
        </div>

        <div className="toolbar">
          <input
            className="input search-input"
            placeholder="Search sweets by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            className="input"
            style={{ maxWidth: 140 }}
            placeholder="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />

          <input
            className="input"
            type="number"
            style={{ maxWidth: 110 }}
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            className="input"
            type="number"
            style={{ maxWidth: 110 }}
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setSearch("");
              setCategoryFilter("");
              setMinPrice("");
              setMaxPrice("");
              loadSweets();
            }}
          >
            Clear
          </button>
        </div>

        {/* ---- ADMIN INVENTORY FORM ---- */}
        {user.role === "admin" && (
          <div style={{ marginBottom: 16 }}>
            {!showForm && (
              <button className="btn btn-ghost" onClick={openCreateForm}>
                + Add sweet
              </button>
            )}

            {showForm && (
              <div
                style={{
                  marginTop: 8,
                  marginBottom: 8,
                  padding: 12,
                  borderRadius: 16,
                  border: "1px solid rgba(31,41,55,0.9)",
                  background:
                    "radial-gradient(circle at top, #020617, #020617)",
                }}
              >
                <div className="field">
                  <label className="field-label">Name</label>
                  <input
                    className="input"
                    value={sweetForm.name}
                    onChange={(e) =>
                      setSweetForm({ ...sweetForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="field">
                  <label className="field-label">Category</label>
                  <input
                    className="input"
                    value={sweetForm.category}
                    onChange={(e) =>
                      setSweetForm({
                        ...sweetForm,
                        category: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label className="field-label">Price (₹)</label>
                  <input
                    className="input"
                    type="number"
                    value={sweetForm.price}
                    onChange={(e) =>
                      setSweetForm({
                        ...sweetForm,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label className="field-label">Quantity</label>
                  <input
                    className="input"
                    type="number"
                    value={sweetForm.quantity}
                    onChange={(e) =>
                      setSweetForm({
                        ...sweetForm,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button className="btn btn-primary" onClick={handleSaveSweet}>
                    {editingSweet ? "Update sweet" : "Create sweet"}
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      setShowForm(false);
                      setEditingSweet(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sweets.map((sweet) => {
                const disabled = sweet.quantity === 0;
                return (
                  <tr key={sweet._id}>
                    <td>{sweet.name}</td>
                    <td>{sweet.category}</td>
                    <td>{sweet.price}</td>
                    <td>{sweet.quantity}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          justifyContent: "center",
                        }}
                      >
                        <button
                          className={`btn btn-primary btn-purchase ${
                            disabled ? "disabled" : ""
                          }`}
                          onClick={() => handlePurchase(sweet._id)}
                          disabled={disabled}
                        >
                          {disabled ? "Out of stock" : "Purchase"}
                        </button>
                        {user.role === "admin" && (
                          <>
                            <button
                              className="btn btn-ghost"
                              onClick={() => openEditForm(sweet)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-ghost"
                              onClick={() =>
                                handleDeleteSweet(sweet._id)
                              }
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {sweets.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-row">
                    No sweets found. Try searching with different filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
