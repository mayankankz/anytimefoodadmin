import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import axios from "axios";
import { BASEPATH } from "../../config";
import { toast } from "react-toastify";

const Home = () => {
  const [dashboard, setDashboard] = useState(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const adminData = await axios.get(`${BASEPATH}/admin/dashboard`)
        console.log('====================================');
        console.log(adminData.data.admindata);
        console.log('====================================');
        setDashboard(adminData.data.admindata)

      } catch (error) {
        toast.error(`Somthing went wrong.`)
      }
    }

    fetchData();
  }, [])
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {dashboard ? <><div className="widgets">
          <Widget type="user" total={dashboard.totalUsers} />
          <Widget type="order" total={dashboard.totalOrders} />
          
          <Widget type="products" total={dashboard.totalItems} />
          <Widget type="earning" total={dashboard.totalsales}  />


        </div>
          <div className="charts">
            <Featured sales={dashboard.todaysSales} />
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} data={dashboard.monthlyRevenue} />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table rows={dashboard.lastestorders} />
          </div></> : <Loader />}
      </div>
    </div>
  );
};

export default Home;
