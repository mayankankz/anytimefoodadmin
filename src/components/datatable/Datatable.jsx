import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../Loader";
import { toast } from "react-toastify";
import { BASEPATH } from "../../config";
import axios from "axios";

const Datatable = () => {
  const [data, setData] = useState(userRows);
  const [loading,setLoading] = useState(false);


  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View Deatis</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];


  useEffect(()=>{
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASEPATH}/admin/getallusers`);
       setData(response.data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[])
  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Users
        
      </div>
      {loading ? <Loader /> :<DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        pgeSize={9}
        rowsPerPageOptions={[9]}
      />}


    </div>
  );
};

export default Datatable;
