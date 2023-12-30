import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEPATH } from "../../config";
import { Loader } from "../Loader";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FormDialog from "../Dialog/Dialog";
import AlertDialog from "../ConfirmBox/ConfirmBox";
import { toast } from "react-toastify";
const ProductsDatatable = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [open,setOpen] = useState(false);
  const [formdata,setFormData] = useState()
  const [openBox,setOpenBox] = useState(false)
  const [deleteID,setDeleteID] = useState(false)

  const handleDelete = async (id) => {
    setDeleteID(id)
    setOpenBox(true)   
  };

  async function confirmDeleteItem(){
    if(!deleteID){
      toast.error(`Please select an item to delete`);
      return;
    }
    try {
          const deletedItem = await axios.post(`${BASEPATH}/admin/deleteitem/${deleteID}`);
          
          toast.success(`Item deleted successfully.`);
        } catch (error) {
          console.log(error);
          toast.error(`Somthing Went Wronge.`);
        } finally {
            setOpen(false);
        }
  }

  const handleEdit = (formdata) =>{
    debugger
    setFormData(formdata);
    setOpen(true);
  }
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASEPATH}/admin/getallitems`);
       setData(response.data.Items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[])

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
              
            <div
              className="editButton"
              onClick={() => handleEdit(params.row)}
            >
              <ModeEditOutlineOutlinedIcon />
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteOutlineOutlinedIcon />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Menu Items
        <Link to="/products/addproduct" className="link">
          Add New
        </Link>
      </div>
      {loading ? <Loader /> :<DataGrid
        className="datagrid"
        rows={data}
        columns={productColumns.concat(actionColumn)}
        pgeSize={9}
        rowsPerPageOptions={[9]}
      />}
      {open && <FormDialog open={open} setOpen={setOpen} formdata={formdata} />}
      {openBox && <AlertDialog openBox={openBox} setOpenBox={setOpenBox} onSubmit={confirmDeleteItem}/>}
    </div>
  );
};

export default ProductsDatatable;
