import type { AppProps } from "next/app";
import { useState } from "react";

// Styles
import "@/styles/reset.scss";

// Components
import Header from "@/components/Header";
import NewTransactionModal from "@/components/NewTransactionModal";
import { TransactionsProvider } from "@/hooks/useTransactions";

function App({ Component, pageProps }: AppProps) {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const openNewTransactionModal = () => setIsNewTransactionModalOpen(true);
  const closeNewTransactionModal = () => setIsNewTransactionModalOpen(false);

  return (
    <TransactionsProvider>
      {/* <GlobalStyle /> */}

      <Header openNewTransactionModal={openNewTransactionModal} />

      <Component {...pageProps} />

      <NewTransactionModal
        closeNewTransactionModal={closeNewTransactionModal}
        isNewTransactionModalOpen={isNewTransactionModalOpen}
      />
    </TransactionsProvider>
  );
}

export default App;
