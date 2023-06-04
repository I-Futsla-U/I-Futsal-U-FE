import Layout from "../layout";
import PaymentsItem from "./PaymentsItem";

function Payments() {
  return (
    <Layout title="결제 내역" href="/userInfo/paymentsDetail">
      <PaymentsItem />
    </Layout>
  );
}

export default Payments;