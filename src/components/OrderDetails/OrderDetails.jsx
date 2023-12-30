import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useRef, useState } from 'react'
import './Deatils.scss'
import { useReactToPrint } from 'react-to-print';
export const OrderDetails = ({open,setOpen,OrderDetails}) => {
    const items = JSON.parse(OrderDetails.items);
    console.log('====================================');
    console.log(OrderDetails);
    console.log('====================================');
    const printRef = useRef()
    function handleClose(params) {
        setOpen(false)
    }

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
      });
    return <>
        <Dialog  open={open} onClose={handleClose}>
           
            <DialogContent ref={printRef}>

            <div id="invoice-POS">
    
            <center id="top">
              <div class="logo"></div>
              <div class="info"> 
                <h2>Any Time Food</h2>
              </div>
            </center>
            
            <div id="mid">
              <div class="info">
                <h2>Contact Info</h2>
                <p>{OrderDetails.Name}</p>
               <address style={{fontSize: '10px'}}>{OrderDetails.address}</address>
               <p>{OrderDetails.phone}</p>
              </div>
            </div>
            
            <div id="bot">
        
                            <div id="table">
                                <table>
                                    <tr class="tabletitle">
                                        <td class="item"><h2>Item</h2></td>
                                        <td class="Hours"><h2>Qty</h2></td>
                                        <td class="Rate"><h2>Sub Total</h2></td>
                                    </tr>
        
                                    {items.map((item,i)=>{
                                        return <tr class="service">
                                        <td class="tableitem"><p class="itemtext">{item.title}</p></td>
                                        <td class="tableitem"><p class="itemtext">{item.quantity}</p></td>
                                        <td class="tableitem"><p class="itemtext">₹{item.price}</p></td>
                                    </tr>
                                    })}
        
                                    <tr class="tabletitle">
                                        <td></td>
                                        <td class="Rate"><h2>fee and charges</h2></td>
                                        <td class="payment"><h2>₹10</h2></td>
                                    </tr>
        
                                    <tr class="tabletitle">
                                        <td></td>
                                        <td class="Rate"><h2>Total</h2></td>
                                        <td class="payment"><h2>₹{items.reduce((acc,curr)=>{
                                            return parseInt(curr.price)+acc
                                        },0)+10}</h2></td>
                                    </tr>
        
                                </table>
                            </div>
        
                            
        
                        </div>
          </div>
        



            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{handleClose()}}>Cancel</Button>
                <Button onClick={()=>{handlePrint()}}>Print</Button>
            </DialogActions>
        </Dialog></>
}
