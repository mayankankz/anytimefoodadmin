import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const List = ({rows}) => {
  console.log('====================================');
  console.log(rows);
  console.log('====================================');

  const getStatusName = (status) => {
    switch (status) {
      case 'order_placed':
        return 'Placed';
      case 'order_confirmed':
        return 'Confirmed';
      case 'order_preparing':
        return 'Preparing';
      case 'order_OFD':
        return 'On the Way';
      case 'order_delivered':
        return 'Delivered';
      default:
        return '';
    }
  };
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Order ID</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Address</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Order At</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.OrderId}</TableCell>
              
              <TableCell className="tableCell">{row.Name}</TableCell>
              <TableCell className="tableCell">{row.address}</TableCell>
              <TableCell className="tableCell"><CurrencyRupeeIcon fontSize="inherit" />{row.orderValue}</TableCell>
              <TableCell className="tableCell">{row.paymentType}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status == 'order_delivered'  ? 'Approved' : 'Pending' }`}>{getStatusName(row.status)}</span>
              </TableCell>
              <TableCell className="tableCell">{moment(row.createdAt).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
