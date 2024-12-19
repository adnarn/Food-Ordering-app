import React, {useState, useEffect} from 'react'
import './Trash.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaUndo } from 'react-icons/fa';

const Trash = () => {
    const [list, setList] = useState([]);
    const listNum = list.length
    console.log(listNum)
  
    const fetchList = async () => {
      try {
        const response = await axios.get('https://food-ordering-app-qi5n.onrender.com/api/food/listTrashedFood');
        if (response.data.success) {
          setList(response.data.data);
          console.log(response.data.data)
        } else {
          toast.error("Failed to fetch the list");
        }
      } catch (error) {
        // toast.error("An error occurred while fetching the list");
        console.error('Error fetching list:', error);
      }
    };
  
    useEffect(() => {
      fetchList();
    }, []);
  
    const restoreFood = async (foodId) => {
        const response = await axios.post('https://food-ordering-app-qi5n.onrender.com/api/food/restore',{id:foodId});
        await fetchList();
        if(response.data.success) {
          toast.success("Food Restored")
        }else{
          toast.error('Error')
        }
    }
  
    const deleteFood = async (foodId) => {
        const response = await axios.post('https://food-ordering-app-qi5n.onrender.com/api/food/delete',{id:foodId});
        await fetchList();
        if(response.data.success) {
          toast.success("Food Deleted")
        }else{
          toast.error('Error')
        }
    }
  
    return (
      <div className="list">
      <div className='list add flex-col'>
          <h3 className='text-header'>All Foods List</h3>
          <div className="list-table">
  
            { listNum!==0?(
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
              <img src={"http://localhost:8000/uploads/"+item.imgurl} alt="" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <div className="delete-icons">
              <p className='X' onClick={()=>restoreFood(item._id)}><FaUndo /></p>
              <p className='X' onClick={()=>deleteFood(item._id)}><FaTrash /></p>                
              </div>
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
}

export default Trash