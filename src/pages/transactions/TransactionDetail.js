import React, { useRef } from "react";
import styles from "./transaction.module.css";
import { useReactToPrint } from "react-to-print";
import { TransactionToPrint } from "./TransactionToPrint";
import { useSelector } from "react-redux";

function TransactionDetail() {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { isLoadingTransaction } = useSelector((state) => state.transaction);

  return (
    <>
      {isLoadingTransaction ? (
        <div
          className={`${styles["detail-container"]} ${styles["stocklist-loader"]}`}>
          {" "}
          <img src={require("../../assests/logo/loader.gif")} alt="" />
        </div>
      ) : (
        <div className={styles["detail-container"]}>
          <TransactionToPrint ref={componentRef} />
          <div className={styles["print-button"]}>
            <button onClick={handlePrint}>PRINT RECEIPT</button>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionDetail;
