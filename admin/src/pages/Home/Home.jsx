import React, { useEffect, useState } from "react";
import "./Home.css";
import { FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { toast } from "react-toastify";
import axios from "axios";


const Home = ({ theme }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const chartData = {
    labels: ['Placed Orders', 'Processing', 'Shipped', 'Delivered'],
    datasets: [
      {
        label: 'Order count',
        data: [3, 1, 2, 3], // Sample data; adjust as needed
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/food/list');  
        const result = await response.json();
        
        if (result.success) {
          setProducts(result.data); // Assuming result.data is an array of products
          console.log("Fetched products:", result.data);
        } else {
          console.error("Error fetching products:", result.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts(); // Call fetch on component mount
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/orders/admin-order"
      );
      if (response.data.success) {
        // Sort orders by date (newest first)
        const sortedOrders = response.data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders); // Update state with sorted orders
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders.");
    } 
  };

  useEffect(() => {
    fetchAllOrders();
    console.log(orders)
  }, []);

  return (
    <div className="home">
      <div className="card-container">
        <div className="card earnings">
          <p>Earnings</p>
          <div className='card-contents'>
            <p>$7645</p>
            <FaDollarSign className="icons" />
          </div>
        </div>
        <div className="card products">
          <p>Products</p>
          <div className='card-contents'>
            <p>{products.length}</p> {/* Display the number of products */}
            <MdOutlineInventory2 className="icons" />
          </div>
        </div>
        <div className="card orders">
          <p>Orders</p>
          <div className='card-contents'> 
            <p>{orders.length}</p>
            <FaShoppingCart className="icons" />
          </div>
        </div>
      </div>
      <div className="chart-container">
        <h3>Order Status Chart</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Home;
