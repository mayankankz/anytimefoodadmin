import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEPATH } from "../../config";
import { toast } from "react-toastify";

const New = ({ inputs, title }) => {
  const [files, setFiles] = useState([]);
  const [categorys, setCategorys] = useState([]);

  const [category, setCategory] = useState('')

  const [ItemsDetails, setItemDetails] = useState({
    title: '',
    description: '',
    Stock: 'In Stock',
    price: '',
    category: '',
    Imgs: ''
  });

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const fileArray = Array.from(selectedFiles).slice(0, 3); // Allow up to 3 files
    setFiles(fileArray);
  };

  function handleChange(e) {
    setItemDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log({ ...ItemsDetails, imgs: files });
    let formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      formData.append('imgs', file)
    }
    formData.append('ItemsDetails', JSON.stringify(ItemsDetails))
    try {
      const addeditem = await axios.post(`${BASEPATH}/admin/additem`, formData);
      console.log(addeditem);
      setFiles([]);
      setItemDetails({ title: '', description: '', Stock: '', price: '', category: '', Imgs: '' });
      
      toast.success(`Item added successfully`);
    } catch (error) {
      console.log(error);
      toast.error(`Somthing Went Wronge.`);
    }

  }

  async function handleCategorySubmit(e) {
    e.preventDefault()
    if (!category) {
      toast.error(`Please enter category name`);
      return
    }
    try {
      const res = await axios.post(`${BASEPATH}/admin/addcategory`, { name: category });
      console.log(res.data.allCategory);
      toast.success(res.data.message);
      setCategory('')
      setCategorys(res.data.allCategory.sort())
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

  }


  useEffect(() => {
    async function fetchCategorys() {
      const categorys = await axios.get(`${BASEPATH}/admin/getallcategory`)
      console.log(categorys.data.categorys);
      setCategorys(categorys.data.categorys.sort())
    }
    fetchCategorys();
  }, [])

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />

        <div className="upper">
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="left">
              {files.length > 0 ? files.map((file, index) => (
                <img
                  key={index}
                  name="imgs"
                  src={URL.createObjectURL(file)}
                  alt={`item`}
                  style={{ width: "100px", height: "100px", marginRight: "10px" }}
                />
              )) : <div>No Images</div>}
            </div>
            <div className="right">
              <form onSubmit={handleSubmit}>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                  />
                </div>

                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input type={input.type} value={ItemsDetails[input.label.toLowerCase()] || ''} placeholder={input.placeholder} name={input.label.toLowerCase()} onChange={handleChange} />

                  </div>
                ))}
                <div className="formInput">
                  <label>Category</label>
                  <select name="category" onChange={handleChange}>
                  <option value="">Select Category</option>
                    {categorys.map((cat, i) => (
                      <option className="dropdown-item" key={i} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="formInput" >
                  <label>Availability</label>
                  <select name="Stock" id="" onChange={handleChange}>
                    <option default value="In Stock">In Stock</option>
                    <option value="Out Of Stock">Out Of Stock</option>
                  </select>
                </div>

                <button>Add Item</button>
              </form>
            </div>
          </div>
        </div>



        <div className="lower" style={{ marginTop: '80px' }}>
          <div className="top">
            <h1>Add New Category</h1>
          </div>
          <div className="bottom">

            <div className="right">
              <form onSubmit={handleCategorySubmit} style={{ justifyContent: 'flex-start' }}>


                <div className="formInput" style={{ display: 'block' }}>
                  <label>Category</label>
                  <input type="text" value={category} placeholder="Enter Category Name" onChange={(e) => setCategory(e.target.value)} />
                </div>

                <button>Add Category</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
