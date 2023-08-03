import "../StylesPages/Productos.css";
import whatsapp from "../assets/whatsapp-essen.jpeg";
import essen1 from "../assets/essen1.jpeg";
import essen2 from "../assets/essen2.jpeg";
import essen3 from "../assets/essen3.jpeg";
import userImage from "../assets/profile.png";
import { useCart } from "../CartContext";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

export default function ProductCarousel() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

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
          title: "Baterias",
          images: [essen2, essen2, essen2, essen2],
          specifications: [
            { description: "" },
            { description: "" },
            { description: "" },
            { description: "" },
          ],
        },
        {
          title: "Sartenes",
          images: [essen3, essen3, essen3, essen3],
          specifications: [
            { description: "" },
            { description: "" },
            { description: "" },
            { description: "" },
          ],
        },
        // ... otros productos iniciales
      ]);
    }
    setIsLoading(false);
  }, []);

  const openModal = (product, imageIndex) => {
    setSelectedProduct(product);
    setSelectedImageIndex(imageIndex);
    setModalIsOpen(true);
    console.log(imageIndex + " producto seleccionado");
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedImageIndex(0);
    setModalIsOpen(false);
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

  const handleDescriptionChange = (event) => {
    if (selectedProduct) {
      const productsCopy = [...products];
      productsCopy[selectedImageIndex].specifications[
        selectedImageIndex
      ].description = event.target.value;
      setProducts(productsCopy);
      localStorage.setItem("products", JSON.stringify(productsCopy));
      console.log(
        JSON.stringify(productsCopy) + "que trae JSON.stringify(productsCopy)"
      );
    }
  };

  const handleAddToCart = (product, imageIndex) => {
    Swal.fire({
      title: `¿Desea agregar a carrito el producto "${product.title}"?`,
      text: product.specifications[imageIndex]?.description || "", // Usar la descripción del índice de imagen seleccionado
      imageUrl: product.images[imageIndex], // Usar la imagen del índice de imagen seleccionado
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Agregar al carrito",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario hizo clic en "Agregar al carrito"
        addToCart({
          title: product.title,
          image: product.images[imageIndex], // Usar la imagen del índice de imagen seleccionado
          description: product.specifications[imageIndex]?.description || "", // Usar la descripción del índice de imagen seleccionado
        });
        const precompras = JSON.parse(localStorage.getItem("precompras")) || [];
        precompras.push({
          title: product.title,
          image: product.images[imageIndex], // Usar la imagen del índice de imagen seleccionado
          description: product.specifications[imageIndex]?.description || "", // Usar la descripción del índice de imagen seleccionado
        });
        localStorage.setItem("precompras", JSON.stringify(precompras));

        Swal.fire({
          title: "Producto agregado al carrito",
          text: `El producto "${product.title}" ha sido agregado al carrito.`,
          imageUrl: product.images[imageIndex], // Usar la imagen del índice de imagen seleccionado
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
  };

  const handleAddToMessage = (product) => {
    const precompras = JSON.parse(localStorage.getItem("precompras")) || [];
    precompras.push(product);
    localStorage.setItem("precompras", JSON.stringify(precompras));

    Swal.fire({
      title: `Quiero la ${product.title}`,
      input: "text",
      inputPlaceholder: "¿Cuál es tu nombre?",
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      text: "* nombre NO obligatorio",

      preConfirm: (name) => {
        if (name) {
          const message = `Hola soy ${name}, quiero saber más de este producto.`;
          const isMobileDevice =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            );
          const whatsappURL = isMobileDevice
            ? `whatsapp://send?text=${encodeURIComponent(message)}`
            : `https://web.whatsapp.com/send?text=${encodeURIComponent(
                message
              )}`;
          window.open(whatsappURL, "_blank");
          return;
        }

        const message = "Hola , quiero saber más de este producto.";
        const isMobileDevice =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          );
        const whatsappURL = isMobileDevice
          ? `whatsapp://send?text=${encodeURIComponent(message)}`
          : `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
      },
    });
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className="container">
        {products.map((product, index) => (
          <div key={index} className="conteiner-foreach">
            <h3 className="product-title">{product.title}</h3>
            <div className="producto-img">
              {product.images.map((image, imageIndex) => (
                <div key={imageIndex} className="image-container">
                  <img
                    className="img-muestra-pequeña"
                    src={image}
                    alt={`Imagen ${index + 1}-${imageIndex + 1}`}
                    onClick={() => openModal(product, imageIndex)}
                  />
                  <div className="comprar-conteiner">
                    <button
                      className="comprar-btn"
                      onClick={() => handleAddToMessage(product)}
                    >
                      <p>La necesito</p>
                    </button>

                    <button
                      className="comprar-btn"
                      onClick={() =>
                        handleAddToCart(product, selectedImageIndex)
                      } // Pasar el índice de imagen seleccionado aquí
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
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
          {selectedProduct && selectedImageIndex !== null && (
            <>
              <div className="image-container">
                {selectedProduct.images[selectedImageIndex] ? (
                  <img
                    src={selectedProduct.images[selectedImageIndex]}
                    alt={`Imagen ${selectedProduct.title}-${
                      selectedImageIndex + 1
                    }`}
                  />
                ) : (
                  <p>Imagen no encontrada</p>
                )}
                {selectedProduct.images[selectedImageIndex] &&
                products.find(
                  (product) => product.title === selectedProduct.title
                ) &&
                products.find(
                  (product) => product.title === selectedProduct.title
                ).specifications[selectedImageIndex]?.description ? (
                  <p className="description">
                    {
                      products.find(
                        (product) => product.title === selectedProduct.title
                      ).specifications[selectedImageIndex].description
                    }
                  </p>
                ) : (
                  <p className="description">No hay descripción disponible</p>
                )}
              </div>
              <button onClick={closeModal}>Cerrar</button>
            </>
          )}
        </Modal>
      </div>
    </>
  );
}
