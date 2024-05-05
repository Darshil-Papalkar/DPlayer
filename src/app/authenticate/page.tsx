
import Head from "next/head";
import FormContainer from "../ui/login/FormContainer";
import ImageSlices from "../ui/login/ImageSlices";

import "./authenticate.css";

const Authenticate = () => {
  return (
    <main>
        <Head>
            <link rel="icon" href="/favicon512.ico" sizes="512x512" />
        </Head>
      <ImageSlices />
      <FormContainer />
    </main>
  );
};

export default Authenticate;
