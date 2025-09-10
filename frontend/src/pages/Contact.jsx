import React from 'react';
import Title from '../components/Title';

const Contact = () => {
  return (
    <div className="border-t pt-16 px-4 sm:px-8 lg:px-16">
      {/* Page Title */}
      <div className="text-2xl mb-6">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Info */}
      <div className="max-w-4xl mx-auto text-gray-700 space-y-8">
        <p className="leading-relaxed">
          Have questions, feedback, or need assistance? We’d love to hear from you!  
          Our team is here to help you 24/7. Just fill out the form below or use the details provided.
        </p>

        {/* Contact Details */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Our Office</h2>
            <p>123 Fashion Street, Hyderabad, India</p>
            <p>Email: <a href="mailto:support@ourstore.com" className="text-blue-500">support@ourstore.com</a></p>
            <p>Phone: +91 98765 43210</p>
          </div>

          {/* Contact Form */}
          <div className="border rounded-lg p-6 shadow-sm">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  placeholder="Your Message"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section (Optional) */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Find Us</h2>
          <iframe
            title="Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.535347833377!2d78.44827831515465!3d17.41549760609362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb973b07e06f41%3A0x63f7ab6e0c938c53!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1691487741234!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
