import React, { useEffect, useState } from 'react';
import './ListItems.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListItems = ({theme}) => {
  const [list, setList] = useState([]);
  const listNum = list.length
  console.log(listNum)
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get('https://food-ordering-app-qi5n.onrender.com/api/food/list');
      if (response.data.success) {
        setList(response.data.data);
        console.log(response.data.data)
      } else {
        toast.error("Failed to fetch the list");
      }
    } catch (error) {
      // toast.error("An error occurred while fetching the list");
      console.error('Error fetching list:', error);
    }finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
      const response = await axios.post('https://food-ordering-app-qi5n.onrender.com/api/food/remove',{id:foodId});
      await fetchList();
      if(response.data.success) {
        toast.success("Food Removed")
      }else{
        toast.error('Error')
      }
  }

  return (
    <div className="list">
    <div className='list add flex-col'>
        <h3 className='text-header'>All Foods List</h3>
        <div className="list-table">

          {loading?(
            <p>Loading ...</p>
          ) : listNum!==0?(
            <>
            <div className="list-table-format title">
                <b>Image</b>
                <b>Name</b>
                <b>Price</b>
                <b>Action</b>
            </div>

            {list.map((item, index) =>{
            return(
            <div className="list-table-format">
            <img src={"https://food-ordering-app-qi5n.onrender.com/uploads/"+item.imgurl} alt="" />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p className='X' onClick={()=>removeFood(item._id)}>X</p>
            </div>

            )}
          )}
        </>
        )
        : (
          <p>No Food Added</p>
        )
          }
        </div>
    </div>
    </div>
  );
};

export default ListItems;
