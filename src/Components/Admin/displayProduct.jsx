import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/product",{
        headers : {'Authorization': `Bearer ${token}`}
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      toast.error("Erreur lors du chargement des produits");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/product/${id}`,{
        headers : {'Authorization': `Bearer ${token}`}
      });
      if (response.status === 200){
        fetchProducts();
        toast.success("Produit supprimé avec succès!");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression du produit");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <motion.div 
      className="flex-1 min-h-screen bg-gradient-to-br from-gray-800 via-gray-600 to-gray-800 p-6 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Toaster position="top-center" />
      <motion.h2 
        className="text-3xl font-bold mb-6 text-blue-400 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Liste des Produits
      </motion.h2>

      <div className="overflow-x-auto rounded-lg">
        {products.length > 0 ? (
          <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {products.map((product, index) => (
                <motion.tr 
                  key={product.id}
                  className="hover:bg-gray-750 transition duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                >
                  <td className="px-4 py-4 text-sm">{product.name}</td>
                  <td className="px-4 py-4 text-sm">{product.description}</td>
                  <td className="px-4 py-4 text-sm">{product.price} $</td>
                  <td className="px-4 py-4 text-sm">{product.quantity}</td>
                  <td className="px-4 py-4">
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button 
                        onClick={() => handleEdit(product.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm"
                      >
                        Supprimer
                      </button>
                    </motion.div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-white py-4">Aucun produit trouvé.</div>
        )}
      </div>
    </motion.div>
  );
};

export default DisplayProducts;
