import { useEffect, useState } from "react";
import axios from "axios";
const useFetch = (url, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      console.log(loading);
      try {
        const response = await axios.get(url, { signal: controller.signal });
        console.log("Data received: ", response.data);
        setData(response.data);
        setError(null);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled");
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };
    fetchData();

    return () => controller.abort();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
