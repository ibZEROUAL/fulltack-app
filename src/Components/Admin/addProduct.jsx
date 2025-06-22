import { toast, Toaster } from "react-hot-toast";
import {motion} from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddProduct = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Le titre est requis."),
    description: Yup.string().min(10).trim().required("La description est requise."),
    price: Yup.number().positive("Le prix doit être positif.").required("Le prix est requis."),
    quantity: Yup.number().min(0, "Le stock ne peut pas être négatif.").required("Le stock est requis."),
  });


  const handleSubmit = async (values, { resetForm }) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("quantity", values.quantity);

    try {
      const token = localStorage.getItem("jwtToken");

      const response = await axios.post("http://localhost:8080/api/product", data, {
        headers : {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        toast.success("Produit ajouté avec succès!");
        setTimeout(() => navigate("/display"), 1000);
        resetForm();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      toast.error("Erreur lors de l'ajout du produit");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 mt-20">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-3xl text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Ajouter un Produit</h2>
        
        <Formik
          initialValues={{ name: "", description: "", price: 0.0, quantity: 0 }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4 w-full max-w-2xl mx-auto">

              <Field type="name" name="name" placeholder="Name" className="w-full p-2 text-base rounded bg-gray-700 text-white focus:ring-blue-500" />
              <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />

              <Field as="textarea" name="description" placeholder="Description" className="w-full p-2 text-base rounded bg-gray-700 text-white focus:ring-blue-500 h-24" />
              <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />

              <Field type="number" name="price" placeholder="Price" className="w-full p-2 text-base rounded bg-gray-700 text-white focus:ring-blue-500" />
              <ErrorMessage name="price" component="p" className="text-red-500 text-sm" />

              <Field type="number" name="quantity" placeholder="Quantity" className="w-full p-2 text-base rounded bg-gray-700 text-white focus:ring-blue-500" />
              <ErrorMessage name="quantity" component="p" className="text-red-500 text-sm" />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 text-lg rounded font-semibold shadow-md"
              >
                Ajouter
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default AddProduct;