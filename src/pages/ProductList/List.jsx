import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import ProductsDatatable from "../../components/productsdata/Datatable"

const ProductList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProductsDatatable/>
      </div>
    </div>
  )
}

export default ProductList