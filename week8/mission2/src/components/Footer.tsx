import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black dark:bg-gray-100 py-6 mt-12">
      <div className="container mx-auto text-center text-pink-600 dark:text-black">
        <p>
          &copy; {new Date().getFullYear()} SpinningSpinning Dolimpan.All rights
          reserved.
        </p>
        <div className={"flex justify-center space-x-4 mt-4"}>
          <Link to={"#"}>Privacy Policy</Link>
          <Link to={"#"}>Terms of service</Link>
          <Link to={"#"}>Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
