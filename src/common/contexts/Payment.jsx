import { createContext, useContext, useState } from "react";

const PaymentContext = createContext();
PaymentContext.displayName = "Payment";

export default function PaymentProvider({ children }) {
  const typesPayment = [
    {
      name: "Ticket",
      fees: 1,
      id: 1,
    },
    {
      name: "Credit Card",
      fees: 1.3,
      id: 2,
    },
    {
      name: "PIX",
      fees: 1,
      id: 3,
    },
    {
      name: "Credit",
      fees: 1.5,
      id: 4,
    },
  ];
  const [paymentMethod, setPaymentMethod] = useState(typesPayment[0]);

  return (
    <PaymentContext.Provider
      value={{
        paymentMethod,
        setPaymentMethod,
        typesPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const { paymentMethod, setPaymentMethod, typesPayment } = useContext(
    PaymentContext
  );

  function changePaymentMethod(id) {
    const newMethod = typesPayment.find((payment) => payment.id === id);
    setPaymentMethod(newMethod);
  }

  return {
    paymentMethod,
    changePaymentMethod,
    typesPayment,
  };
}
