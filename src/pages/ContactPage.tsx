import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl mb-4 text-center">Contact Us</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            We're here to help! Get in touch with us for any queries or support
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl mb-8">Get in Touch</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1">Phone</h3>
                  <p className="text-gray-600">+91 7350001266 / 9323684301</p>
                  <p className="text-sm text-gray-500">Available for calls and WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="mb-1">Email</h3>
                  <p className="text-gray-600">sanjariprint@gmail.com</p>
                  <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="mb-1">Business Hours</h3>
                  <p className="text-gray-600">Monday - Saturday</p>
                  <p className="text-gray-600">11:00 AM - 8:00 PM</p>
                  <p className="text-sm text-gray-500">Closed on Sundays</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="mb-1">Address</h3>
                  <p className="text-gray-600">
                    <strong>Flat/Door/Block No.: 31</strong><br />
                    <strong>Name of Premises/Building: c/o Shabbir Kirana Store</strong><br />
                    <strong>Village/Town: Chouhan Colony</strong><br />
                    <strong>Block/Landmark: Opp. ST Stand</strong><br />
                    <strong>Road/Street/Lane: Near Bage Madina Masjid</strong><br />
                    <strong>City: Bhiwandi</strong><br />
                    <strong>District: Thane</strong><br />
                    <strong>State: Maharashtra</strong><br />
                    <strong>PIN: 421302</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
<div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="mb-1">WhatsApp</h3>
                  <p className="text-gray-600">Chat with us on WhatsApp</p>
                  <a href="https://wa.me/917350001266" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Start Chat (+91 7350001266)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-3xl mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Your Name</label>
                  <Input placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email Address</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Phone Number</label>
                  <Input type="tel" placeholder="Enter your phone number" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Subject</label>
                  <Input placeholder="What is this regarding?" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Message</label>
                  <Textarea placeholder="Tell us how we can help you..." rows={5} />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
