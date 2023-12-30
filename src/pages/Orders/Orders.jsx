import "../ProductList/list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import ProductsDatatable from "../../components/productsdata/Datatable"
import OrdersList from "../../components/ordersData/OrdersDatatable"

const Orders = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <OrdersList />
      </div>
    </div>
  )
}

export default Orders