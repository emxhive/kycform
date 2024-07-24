import React from "react";
import KYCF from "./KYCF.tsx";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";

function App() {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: Tailwind,
        ptOptions: { mergeSections: true },
      }}
    >
      <div className="App" style={{ height: "100vh" }}>
        <KYCF
          header={headerinfo.header}
          info={headerinfo.info}
          fields={categories}
        />
      </div>
    </PrimeReactProvider>
  );
}

export default App;

const headerinfo = {
  header: "KYC VERIFICATION",
  info: "  ",
};

const categories: KYCCategory = {
  personal: {
    title: "Personal Details",
    info: "Your basic personal information required for identification",
    fields: [
      "First Name",
      "Last Name",
      "Email Address",
      "Phone Number",
      "Date of Birth",
      "Telegram Username",
    ],
    optional: 5,
  },

  address: {
    title: "Home Address",
    info: "Your basic address required for identity verification",
    fields: [
      "Address Line 1",
      "Address Line 2",
      "City",
      "State",
      "Country",
      "Zip Code",
    ],
    optional: 1,
  },

  document: {
    title: "Document Upload",
    info: "Unclear images & Expired documents & Images with glare will all be rejected",
    fields: ["Passport", "National ID ", "Driver License"],
  },
};
