import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Le titre est requis."),
  description: Yup.string().required("La description est requise."),
  price: Yup.number().positive("Le prix doit être positif.").required("Le prix est requis."),
  quantity: Yup.number().min(0, "Le stock ne peut pas être négatif.").required("Le stock est requis."),
});

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/product/${id}`,{
      headers : {'Authorization': `Bearer ${token}`}
    })
      .then((response) => {
        setInitialValues(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du produit:", error);
        toast.error("Produit non trouvé");
      });
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/product/${id}`, values, {
        headers : {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200){
        toast.success("Produit mis à jour !");
      }
      setTimeout(() => navigate("/display"), 1000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error.response?.data);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <motion.div className="flex justify-center items-center min-h-screen bg-gray-800 p-6 mt-20">
      <Toaster position="top-center" />
      <motion.div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">Modifier le Produit</h2>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label className="text-gray-300">Name</label>
                <Field name="name" className="w-full p-2 bg-gray-700 text-white rounded-lg" />
                {errors.name && touched.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="text-gray-300">Description</label>
                <Field as="textarea" name="description" className="w-full p-2 bg-gray-700 text-white rounded-lg" />
                {errors.description && touched.description && <p className="text-red-500">{errors.description}</p>}
              </div>
              <div>
                <label className="text-gray-300">Price</label>
                <Field type="number" name="price" className="w-full p-2 bg-gray-700 text-white rounded-lg" />
                {errors.price && touched.price && <p className="text-red-500">{errors.price}</p>}
              </div>
              <div>
                <label className="text-gray-300">Quantity</label>
                <Field type="number" name="quantity" className="w-full p-2 bg-gray-700 text-white rounded-lg" />
                {errors.quantity && touched.quantity && <p className="text-red-500">{errors.quantity}</p>}
              </div>
              <motion.button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                Enregistrer
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  );
};

export default EditProduct;
