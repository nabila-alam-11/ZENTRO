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
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get(url, { signal: controller.signal });
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
      }
    };
    fetchData();

    return () => controller.abort();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
