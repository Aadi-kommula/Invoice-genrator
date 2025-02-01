// src/App.jsx
import React, { useState } from "react";
import html2pdf from "html2pdf.js";

const App = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(250);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productImage, setProductImage] = useState(null);
  const [errors, setErrors] = useState({});

  const businessDetails = {
    name: "Express Gifts",
    businessNumber: "8985844558",
    address: "Amalapuram, Andhra Pradesh, 533201",
    phone: "8985844558",
    instagram: "https://www.instagram.com/express_gifts/",
    email: "expressgifts.contact@gmail.com",
    storeLink: "https://tinyurl.com/Express-Gifts-Store",
    logo: "/logo.png", // Business logo
  };

  // Generate a dynamic invoice number
  const generateInvoiceNumber = () => {
    const prefix = customerName.slice(0, 3).toUpperCase();
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    return `${prefix}${randomDigits}`;
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!customerName) newErrors.customerName = "Customer Name is required";
    if (!customerAddress) newErrors.customerAddress = "Customer Address is required";
    if (!customerEmail) newErrors.customerEmail = "Customer Email is required";
    if (!customerPhone) newErrors.customerPhone = "Customer Phone is required";
    if (!productName) newErrors.productName = "Product Name is required";
    if (!productPrice) newErrors.productPrice = "Product Price is required";
    if (!productQuantity) newErrors.productQuantity = "Quantity is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate PDF
  const generatePDF = () => {
    if (!validateForm()) {
      alert("Please fill all the fields before generating the invoice.");
      return;
    }

    const element = document.getElementById("invoice");
    const opt = {
      margin: 10,
      filename: `invoice_${customerName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  // Handle password submission
  const handlePasswordSubmit = () => {
    if (password === "4455") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const totalAmount = productPrice * productQuantity;

  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Invoice Generator</h1>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Enter Password</h5>
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-primary w-100"
                  onClick={handlePasswordSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Invoice Generator</h1>
      <div className="row">
        <div className="col-md-6">
          <form>
            <h2>Customer Details</h2>
            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                className={`form-control ${errors.customerName ? "is-invalid" : ""}`}
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              {errors.customerName && (
                <div className="invalid-feedback">{errors.customerName}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Customer Address</label>
              <input
                type="text"
                className={`form-control ${errors.customerAddress ? "is-invalid" : ""}`}
                placeholder="Customer Address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
              {errors.customerAddress && (
                <div className="invalid-feedback">{errors.customerAddress}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Customer Email</label>
              <input
                type="email"
                className={`form-control ${errors.customerEmail ? "is-invalid" : ""}`}
                placeholder="Customer Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
              {errors.customerEmail && (
                <div className="invalid-feedback">{errors.customerEmail}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Customer Phone</label>
              <input
                type="tel"
                className={`form-control ${errors.customerPhone ? "is-invalid" : ""}`}
                placeholder="Customer Phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
              {errors.customerPhone && (
                <div className="invalid-feedback">{errors.customerPhone}</div>
              )}
            </div>

            <h2>Product Details</h2>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className={`form-control ${errors.productName ? "is-invalid" : ""}`}
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              {errors.productName && (
                <div className="invalid-feedback">{errors.productName}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Product Price</label>
              <input
                type="number"
                className={`form-control ${errors.productPrice ? "is-invalid" : ""}`}
                placeholder="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              {errors.productPrice && (
                <div className="invalid-feedback">{errors.productPrice}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className={`form-control ${errors.productQuantity ? "is-invalid" : ""}`}
                placeholder="Quantity"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
              {errors.productQuantity && (
                <div className="invalid-feedback">{errors.productQuantity}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Product Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setProductImage(e.target.files[0])}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={generatePDF}
            >
              Generate Invoice
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <div id="invoice" className="p-4 border">
            {/* Header */}
            <div className="mb-4">
              <img
                src={businessDetails.logo}
                alt="Business Logo"
                style={{ width: "100px", height: "auto" }}
              />
              <h2>{businessDetails.name}</h2>
              <p className="mb-1">
                <strong>Business Number:</strong> {businessDetails.businessNumber}
              </p>
              <p className="mb-1">
                <strong>Address:</strong> {businessDetails.address}
              </p>
              <p className="mb-1">
                <strong>Phone:</strong> {businessDetails.phone}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {businessDetails.email}
              </p>
              <p className="mb-1">
                <strong>Store Link:</strong>{" "}
                <a href={businessDetails.storeLink} target="_blank" rel="noopener noreferrer">
                  {businessDetails.storeLink}
                </a>
              </p>
            </div>

            <hr />

            {/* Invoice Details */}
            <div className="d-flex justify-content-between mb-4">
              <div>
                <h4>Bill To</h4>
                <p>{customerName}</p>
                <p>{customerAddress}</p>
                <p>{customerEmail}</p>
                <p>{customerPhone}</p>
              </div>
              <div>
                <h4>Invoice Details</h4>
                <p>
                  <strong>Invoice Number:</strong> {generateInvoiceNumber()}
                </p>
                <p>
                  <strong>Date:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Product Table */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>DESCRIPTION</th>
                  <th>RATE</th>
                  <th>QTY</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{productName}</td>
                  <td>₹{productPrice}</td>
                  <td>{productQuantity}</td>
                  <td>₹{totalAmount}</td>
                </tr>
              </tbody>
            </table>

            {/* Total Section */}
            <div className="text-end">
              <h4>
                <strong>TOTAL:</strong> ₹{totalAmount}
              </h4>
            </div>

            {/* Product Image */}
            {productImage && (
              <div className="mt-4 text-center">
                <h5>Product Image</h5>
                <img
                  src={URL.createObjectURL(productImage)}
                  alt="Product"
                  className="img-fluid"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;