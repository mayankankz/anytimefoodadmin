import axios from "axios";
import { BASEPATH } from "./config";
import { toast } from "react-toastify";
import moment from "moment";

export const userColumns = [
  { field: "id", headerName: "ID", width: 150,},
  {
    field: "user",
    headerName: "User Name",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1
  },{
    field: "mobilenumber",
    headerName: "Mobile",
    flex: 1
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status ? 'active' : 'passive'}`}>
          Active
        </div>
      );
    },
  },
  {
    field: "isAdmin",
    headerName: "Role",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.isAdmin ? 'active': 'pending'}`}>
          {params.row.isAdmin ? 'Admin' : 'User'}
        </div>
      );
    },
  },
];

async function handleChange(val,id) {
  
  console.log(val,id);
    try {
      const response = await axios.post(`${BASEPATH}/admin/updateorderstatus`,{status: val,id: id});   
      toast.success(response.data.message,{autoClose: 1000})
    } catch (error) {
      console.log(error);
      toast.error('Somthing Went Wrong.',{autoClose: 1000})
    } 
}
export const ordersColumns = [
  { field: "OrderId", headerName: "OrderId",flex:1,},
  {
    field: "items",
    headerName: "Items",
    flex:1,
    renderCell: (params) => {
      let items = JSON.parse(params.row.items);
      return (
        <div className="">
          {items.map((item) =>{
            return <div>{item.title} - x{item.quantity},</div>
          })}
        </div>
      );
    },
  },{
    field: "phone",
    headerName: "Mobile",
    flex: 1
  },
  {
    field: "address",
    headerName: "Address",
  flex:1
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="Status_Order">
          <select name="status" id="status" onChange={(e)=> handleChange(e.target.value,params.row.OrderId)}>
            <option selected={params.row.status == 'order_placed' ? true : false} value="order_placed">Placed</option>
            <option selected={params.row.status == 'order_confirmed' ? true : false} value="order_confirmed">Confirmed</option>
            <option selected={params.row.status == 'order_preparing' ? true : false} value="order_preparing">Preparing</option>
            <option selected={params.row.status == 'order_OFD' ? true : false} value="order_OFD">Out for delevery</option>
            <option selected={params.row.status == 'order_delivered' ? true : false} value="order_delivered">Completed</option>

          </select>
        </div>
      );
    },
  },
  {
    field: "paymentType",
    headerName: "Payment Type",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.paymentType != 'COD' ? 'active' : 'passive'}`}>
          {params.row.paymentType}
        </div>
      );
    },
  },
  
  {
    field: "createdAt",
    headerName: "Ordered At",
    flex:1,
    renderCell: (params)=>{
      return <div className="">{moment(params.row.createdAt).format('DD-MM-YYYY HH:mm:ss')}</div>
    }
  },
];
export const productColumns =[
  { field: "id", headerName: "ID", width: 50,},
  {
    field: "title",
    headerName: "Title",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={`${BASEPATH}/${JSON.parse(params.row.Imgs)[0]?.split('uploads')[1]}`} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1
  },{
    field: "category",
    headerName: "Category",
    flex: 1
  },
  {
    field: "price",
    headerName: "Price",
  
  },
  {
    field: "inStock",
    headerName: "inStock",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.inStock ? 'active' : 'passive'}`}>
          {params.row.inStock ? 'In Stock' : 'Out Of Stock'}
        </div>
      );
    },
  }
];

export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
    isAdmin: true
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
