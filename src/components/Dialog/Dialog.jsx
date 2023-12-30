import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEPATH } from "../../config";
import { toast } from "react-toastify";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
export default function FormDialog({ open, setOpen,formdata }) {
   
    const handleClose = () => {
        setOpen(false);
    };
    const [categorys, setCategorys] = useState([]);
    const [ItemsDetails, setItemDetails] = useState({
        title: formdata.title,
        description: formdata.description,
        inStock: formdata.inStock ? 'In Stock' : 'Out Of Stock',
        price: formdata.price,
        category: formdata.category,
       
    });

    function handleChange(e) {
        setItemDetails((prev) => {
          return { ...prev, [e.target.name]: e.target.value }
        })
      }
    

      async function handleSubmit(e) {
        e.preventDefault()
        console.log({ ...ItemsDetails});
        
        try {
          const updatedItems = await axios.post(`${BASEPATH}/admin/updateitem/${formdata.id}`, {...ItemsDetails});
          console.log(updatedItems);
          
          setItemDetails({ title: '', description: '', Stock: '', price: '', category: '' });
          
          toast.success(`Item updated successfully.`);
        } catch (error) {
          console.log(error);
          toast.error(`Somthing Went Wronge.`);
        } finally {
            setOpen(false);
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
        <React.Fragment>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <FormControl style={{ marginTop: '10px' }} onChange={handleChange} variant="filled" ><TextField id="outlined-basic" name='title' label="Title" variant="outlined" value={ItemsDetails.title} /></FormControl>
                    <FormControl ><TextField id="outlined-basic" onChange={handleChange} label="description" variant="outlined" name='description' value={ItemsDetails.description} /></FormControl>
                    <FormControl ><TextField id="outlined-basic" onChange={handleChange} label="price" variant="outlined" name='price' value={ItemsDetails.price} /></FormControl>
                    
                    <FormControl >
                        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={ItemsDetails.category}
                            onChange={handleChange}
                            label="Category"
                            name='category'
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categorys.map((cat, i) => (
                                <MenuItem key={i} value={cat}>{cat}</MenuItem>
                            ))}


                        </Select>
                    </FormControl>

                    <FormControl >
                        <InputLabel id="demo-simple-select-standard-label">Availability</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={ItemsDetails.inStock}
                            onChange={handleChange}
                            label="Availability"
                            name='inStock'
                        >
                            <MenuItem value={"In Stock"}>In Stock</MenuItem>
                            <MenuItem value={"Out Of Stock"}>Out Of Stock</MenuItem>
                        </Select>
                    </FormControl>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}