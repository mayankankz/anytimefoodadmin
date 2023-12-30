import "../datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ordersColumns, productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEPATH } from "../../config";
import { Loader } from "../Loader";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { OrderDetails } from "../OrderDetails/OrderDetails";

const OrdersList = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [open ,setOpen] = useState(false);
  const socket = io('http://localhost:7000'); 
  const [orderDetails,setOrderDetails] = useState(null);

  const handleOrderClick = (data) => {
    setOpen(true)
    setOrderDetails(data)
  };

  useEffect(()=>{
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASEPATH}/admin/getallorders`);
       setData(response.data.Items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[])


  useEffect(() => {

    
    socket.emit('adminConnect');

    
    
    return () => {
      socket.disconnect(); 
    };
  }, []);

  socket.on('newOrderArrived', (data) => {
    console.log('newOrderArrived',data);
    
    toast.success(`New Order Received.`)
    setData((prevOrders) => [data,...prevOrders]);
    
  //playNotificationSound();
});

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">        
              <div className="viewButton" onClick={() => handleOrderClick(params.row)}>Order Details</div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Orders
       
      </div>
      {loading ? <Loader /> :<DataGrid
        className="datagrid"
        rows={data}
        columns={ordersColumns.concat(actionColumn)}
        pgeSize={9}
        rowsPerPageOptions={[9]}
      />}
      {open && <OrderDetails open={open} setOpen={setOpen} OrderDetails={orderDetails}/>}
    </div>
  );
};

export default OrdersList;
