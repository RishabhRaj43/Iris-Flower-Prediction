import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import setosa from "../public/setosa.jpg";

function App() {
  const [form, setForm] = useState({});
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(form);

      const res = await axios.post("http://localhost:5000/api/predict", form);
      console.log(res);
      if (res.status > 200) {
        toast.error(res.data.message);
        return;
      }
      setValue(res.data.prediction);
      setLoading(true);
      toast.success("Predicted");
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h1 className="text-7xl font-bold text-accent mb-6">
        Predict Iris Flower
      </h1>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="form-control"
      >
        <div className="flex space-x-3  mb-5">
          <input
            type="Number"
            name="sepal_length"
            step="any"
            min={0.1}
            max={7.9}
            placeholder="Sepal Length"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="Number"
            name="sepal_width"
            placeholder="Sepal Width"
            step="any"
            min={0.1}
            max={4.4}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="Number"
            name="petal_length"
            placeholder="Petal Length"
            step="any"
            min={0.1}
            max={6.9}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="Number"
            name="petal_width"
            placeholder="Petal Width"
            step="any"
            min={0.1}
            max={2.5}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button className="btn btn-accent">Submit</button>
      </form>
      <div className="flex flex-row items-center">
        <h1 className="text-5xl font-bold text-secondary mt-8">
          Predicted Iris Flower
        </h1>
      </div>
      {loading &&

        <div className="flex justify-center mt-5 gap-3 items-center">
          <h1 className="text-5xl font-bold text-primary mt-8">{value} :- </h1>
          <img src={`public/${value}.jpg`} alt="" height={300} width={300} />
        </div>
        }
    </>
  );
}

export default App;
