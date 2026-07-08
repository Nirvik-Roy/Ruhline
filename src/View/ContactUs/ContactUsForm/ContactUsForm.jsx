import React, { useEffect, useState } from "react";
import "./ContactUsForm.css";
import ContactFormContent from "../ContactFormContent/ContactFormContent";
import img from "../../../assets/Images/Rectangle 453.png";
import FAQ from "../FAQ/FAQ";
import { getAllCmsData } from "../../../utils/cms";
import { useOutletContext } from "react-router-dom";
const ContactUsForm = () => {
  const [contactData, setcontactData] = useState({});
  const { sitesettingsData } = useOutletContext();
  const getContactData = async () => {
    const response = await getAllCmsData("/contact-page");
    if (response?.success) {
      setcontactData(response?.data || {});
    }
  };
  useEffect(() => {
    getContactData();
  }, []);

  console.log(contactData);
  return (
    <>
      <div className="contact_us_wrapper">
        <div className="all_Container contact_us_content_wrapper">
          <div className="contact_us_img">
            <img src={contactData?.side_image || img} />
          </div>
          <ContactFormContent contactData={contactData} />
        </div>
        <FAQ />
      </div>
    </>
  );
};

export default ContactUsForm;
