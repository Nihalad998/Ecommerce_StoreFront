export function createPaymentGateway() {

  let transactionCount = 0;

  return {

    pay(amount: number): Promise<string> {

      transactionCount++;

      return new Promise( (resolve, reject) => {
        setTimeout(() => {
          // 80% success & 20% failure
          // const success = Math.random() > 0.2;
          
          // Success everytime
          const success = true;

          if (success) {
            resolve(`TXN-${Date.now()}-${transactionCount}`);
          } else {
            reject('Payment Failed');

          }
          }, 2500);
        }
      );
    },

    getTransactionCount() {
      return transactionCount;
    }
  };
}