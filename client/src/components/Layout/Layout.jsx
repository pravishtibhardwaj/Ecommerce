import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet"; //for SEO
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
const Layout = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main
        style={{
          minHeight: "85vh",
          width: "100%",
          backgroundColor: "rgba(204, 204, 204,0.3)",
        }}
      >
        {props.children}
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

//SEO
Layout.defaultProps = {
  title: "Ecommerce app",
  description: "mern stack project",
  keywords:
    "mern , react,nodejs,reactjs,web development,full stack mern project,ecommerce app ,mongodb",
  author: "PravishtiBhardwaj",
};
export default Layout;
