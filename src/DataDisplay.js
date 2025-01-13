// src/components/DataDisplay.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetchedData, error } = await supabase
        .from('movies')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(fetchedData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Data from Supabase</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.column_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;