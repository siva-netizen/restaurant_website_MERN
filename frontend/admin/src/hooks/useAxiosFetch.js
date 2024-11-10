// useAxiosFetch.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading as true

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // Check if it's a 404 error for "no products found"
            if (err.response.status === 404 && err.response.data.message === "No products found for this category") {
              setFetchError(null); // Do not set a fetch error, just indicate no products
              setData([]); // Set data to empty array
            } else {
              setFetchError(err.message); // Other errors
              setData([]);
            }
          } else {
            setFetchError("Network Error"); // Handle network errors
            setData([]);
          }
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(dataUrl); // Calling the function

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
