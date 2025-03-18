import Link from "next/link";
import Footer from "./Footer";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <div className="bg-green-950/60">
      <div className="max-w-[1100px] mx-auto flex flex-col py-12 px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <h4 className="uppercase font-Jersey10 text-3xl">Contact Us</h4>
            <p>
              We&apos;d love to hear from you. Fill out the form below and
              we&apos;ll get back to you as soon as possible.
            </p>
            <ContactForm />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="flex flex-col gap-4">
              <h4 className="uppercase font-Jersey10 text-3xl">
                Stay in touch
              </h4>
              <div className="text-gray-200 flex flex-col gap-1 text-lg">
                <Link
                  href="#"
                  className="transition-all ease-in-out hover:text-[#0FA711]"
                >
                  Newsletter
                </Link>
                <Link
                  href="https://lu.ma/descinyc"
                  target="_blank"
                  className="transition-all ease-in-out hover:text-[#0FA711]"
                >
                  Calendar
                </Link>
                <Link
                  href="https://t.me/+uAS2PtxCoco0MWUx"
                  target="_blank"
                  className="transition-all ease-in-out hover:text-[#0FA711]"
                >
                  Telegram
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="uppercase font-Jersey10 text-3xl">Support us</h4>
              <div className="text-gray-200 flex flex-col gap-1 text-lg">
                <Link
                  href="https://forms.gle/pSxQ5hoQybe2r7bDA"
                  target="_blank"
                  className="transition-all ease-in-out hover:text-[#0FA711]"
                >
                  Volunteer
                </Link>
                <Link
                  href="https://forms.gle/DkHwhR9jvKbPVrNQA"
                  target="_blank"
                  className="transition-all ease-in-out hover:text-[#0FA711]"
                >
                  Sponsor
                </Link>
                <Link
                  href="https://shop.descinyc.com"
                  target="_blank"
                  className="transition-all ease-in-out hover:text-[#0FA711]"
                >
                  Shop
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="uppercase font-Jersey10 text-3xl">
                Stay in touch
              </h4>
              <div className="text-gray-200 flex flex-col gap-1 text-lg">
                <Link
                  href="https://twitter.com/descinyc_"
                  target="_blank"
                  className="transition-all ease-in-out hover:text-[#0FA711]"
                >
                  X
                </Link>
                <Link
                  href="https://www.instagram.com/descinyc/"
                  target="_blank"
                  className="transition-all ease-in-out hover:text-[#0FA711]"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.tiktok.com/@descinyc"
                  target="_blank"
                  className="transition-all ease-in-out hover:text-[#0FA711]"
                >
                  TikTok
                </Link>
                <Link
                  href="https://www.linkedin.com/company/descinyc/"
                  target="_blank"
                  className="transition-all ease-in-out hover:text-[#0FA711]"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
