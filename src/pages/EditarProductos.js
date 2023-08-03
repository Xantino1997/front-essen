import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "../StylesPages/Productos.css";
import whatsapp from "../assets/whatsapp-essen.jpeg";
import essen1 from "../assets/essen1.jpeg";
import essen2 from "../assets/essen2.jpeg";
import essen3 from "../assets/essen3.jpeg";
import userImage from "../assets/profile.png";

import "../StylesPages/Productos.css";

const EditarProductos = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    specifications: [
      { description: "Especificaciones de la olla..." },
      { description: "img 2..." },
      { description: "loto" },
      { description: "Especificaciones de las mejores cosas por venir..." },
    ],
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductUpdated, setIsProductUpdated] = useState(false);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts && Array.isArray(storedProducts)) {
      setProducts(storedProducts);
    } else {
      setProducts([
        {
          title: "Olla",
          images: [essen1, essen1, essen1, essen1],
          specifications: [
            { description: "" },
            { description: "" },
            { description: "" },
            { description: "" },
          ],
        },
        {
          title: "Sartenes",
          images: [essen2, essen2, essen2, essen2],
          specifications: [
            { description: "" },
            { description: "" },
            { description: "" },
            { description: "" },
          ],
        },
        {
          title: "Recetas",
          images: [essen3, essen3, essen3, essen3],
          specifications: [
            { description: "" },
            { description: "" },
            { description: "" },
            { description: "" },
          ],
        },
        {
          title: "Baterías",
          images: [essen2, essen2, essen2, essen2],
          specifications: [
            { description: "" },
            { description: "" },
            { description: "" },
            { description: "" },
          ],
        },
      ]);
    }
    setIsLoading(false);
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const editedProductCopy = { ...editedProduct };
      editedProductCopy.images[selectedProduct.currentImageIndex] =
        reader.result;
      setEditedProduct(editedProductCopy);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    setIsProductUpdated(true); // Marcar como actualizado al cambiar la imagen
  };

  const handleDescriptionChange = (event) => {
    const editedProductCopy = { ...editedProduct };
    editedProductCopy.specifications[
      selectedProduct.currentImageIndex
    ].description = event.target.value;
    setEditedProduct(editedProductCopy);
    setIsProductUpdated(true); // Marcar como actualizado al cambiar la descripción
  };

  const handleSaveChanges = () => {
    const updatedProducts = products.map((product) =>
      product.title === selectedProduct.title ? editedProduct : product
    );

    // Si no se ha ingresado una descripción, se guarda una descripción vacía por defecto
    if (!editedProduct.specifications[selectedProduct.currentImageIndex].description) {
      const editedProductCopy = { ...editedProduct };
      editedProductCopy.specifications[selectedProduct.currentImageIndex].description = "";
      setEditedProduct(editedProductCopy);
    }

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setIsProductUpdated(false); // Marcar como no actualizado después de guardar los cambios
    closeModal();
    Swal.fire({
      title: "Información actualizada",
      icon: "success",
    });
  };

  useEffect(() => {
    const handleImageClick = () => {
      if (modalIsOpen) {
        closeModal();
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const images = document.querySelectorAll(".producto-img img");
    images.forEach((img) => img.addEventListener("click", handleImageClick));

    return () => {
      images.forEach((img) =>
        img.removeEventListener("click", handleImageClick)
      );
    };
  }, [modalIsOpen]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className="container">
        {products.map((product, index) => (
          <div key={index} className="carousel">
            <h3 className="product-title">{product.title}</h3>
            <div className="producto-img">
              {product.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  alt={`Imagen ${index + 1}-${imageIndex + 1}`}
                  onClick={() =>
                    openModal({ ...product, currentImageIndex: imageIndex })
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="modal-content">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="modal-overlay"
          ariaHideApp={false}
        >
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.images[selectedProduct.currentImageIndex]}
                alt={selectedProduct.title}
              />
              <input
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={handleImageChange}
              />
              <textarea
                value={
                  editedProduct.specifications[
                    selectedProduct.currentImageIndex
                  ].description || ""
                }
                onChange={handleDescriptionChange}
              />
              <button onClick={handleSaveChanges}>Guardar Cambios</button>
              <button onClick={closeModal}>Cancelar</button>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default EditarProductos;
