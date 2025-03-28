import { useState, useEffect } from "react";
import axios from "axios";

export function useCrudApi(url) {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      let dataArray = [];
      if (Array.isArray(response.data)) {
        dataArray = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        dataArray = response.data.data;
      }
      setList(dataArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const create = async (newItem) => {
    try {
      const response = await axios.post(url, newItem, {
        headers: { "Content-Type": "application/json" },
      });
      const createdItem = response.data;
      setList((prev) => (Array.isArray(prev) ? [...prev, createdItem] : [createdItem]));
      return createdItem; // Retornamos el usuario creado
    } catch (error) {
      console.error("Error creating item:", error.response?.data || error.message);
    }
  };

  const update = async (id, updatedItem) => {
    try {
      const response = await axios.put(`${url}${id}`, updatedItem, {
        headers: { "Content-Type": "application/json" },
      });
      setList((prev) =>
        Array.isArray(prev)
          ? prev.map((item) => (item.id === id ? response.data : item))
          : [response.data]
      );
      return response.data; // IMPORTANTE: retornamos el objeto actualizado
    } catch (error) {
      console.error("Error updating item:", error.response?.data || error.message);
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`${url}${id}`);
      setList((prev) => (Array.isArray(prev) ? prev.filter((item) => item.id !== id) : []));
    } catch (error) {
      console.error("Error deleting item:", error.response?.data || error.message);
    }
  };

  return [list, { create, update, remove }];
}
