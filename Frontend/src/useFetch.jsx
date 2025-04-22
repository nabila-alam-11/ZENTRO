import { useEffect, useState } from "react";
import axios from "axios";
const useFetch = (url, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, { signal: controller.signal });
        setData(response.data);
        setError(null);
      } catch (error) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled");
        } else {
          setError(err.message);
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
