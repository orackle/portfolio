"use client"
import React, {useState} from 'react';
import github from '../../../public/github.svg';
import linkedin from '../../../public/linkedin.svg';
import gmail from '../../../public/gmail.svg';
import Link from 'next/link';
import Image from 'next/image';
const EmailSection = () => {
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          email: e.target.email.value,
          subject: e.target.subject.value,
          message: e.target.message.value,
        };
        const JSONdata = JSON.stringify(data);
        const endpoint = "/api/send";
      
        // Form the request for sending data to the server.
        const options = {
          // The method is POST because we are sending data.
          method: "POST",
          // Tell the server we're sending JSON.
          headers: {
            "Content-Type": "application/json",
          },
          // Body of the request is the JSON data we created above.
          body: JSONdata,
        };
      
        try {
          const response = await fetch(endpoint, options);
      
          // Check if the response is empty.
          if (!response.ok) {
            throw new Error("There was an error. Please try again.");
          }
      
          // Parse the response as JSON.
          const resData = await response.json();
      
          // Check if the JSON response contains any data.
          if (Object.keys(resData).length === 0 && resData.constructor === Object) {
            console.log("Empty response received.");
            return;
          }
      
          // Handle the response data.
          if (response.status === 200) {
            console.log("Message sent.");
            setEmailSubmitted(true);
          }
        } catch (error) {
          console.error(error.message);
        }
      };
      

        return (
        <section className="email-section grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative">
            <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="z-10">
                <h5 className='text-xl font-bold text-white my-2'>Let's Connect!</h5>

                <p className='text-[#ADB7BE]mb-4 max-w-md'>
                    {""}
                    I'm currently looking for new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    
                </p>
            <div className="socials flex flex-row gap-3 mt-10">
                <Link href="https://github.com/orackle"> 
                <Image src={github} alt="github" width={50} height={50} />
                </Link>

                <Link href="https://linkedin.com/in/ghosh-debangana"><Image src={linkedin} width={50} height={50} ></Image></Link>

                <Link href="mailto:dghosh2@binghamton.edu"><Image src={gmail} width={50} height={50}></Image></Link>
                </div>
                </div>
            <div>

                <form className="flex flex-col " onSubmit= {handleSubmit}>
                <div className='mb-6'>
                    <label htmlFor="email"  className="text-white block text-sm font-medium mb-2">Your Email</label>
                    
                    <input type="email" id="email" name="email" required placeholder="jacob@google.com" className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5" />
                </div>

<div className='mb-6'>
    <label htmlFor="subject"  className="text-white block text-sm font-medium mb-2">Subject</label>
    
    <input type="text" id="subject" name="subject" required placeholder="Let's Connect" className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5" />
</div>

<div className='mb-6'>

    <label htmlFor="message"  className="text-white block text-sm font-medium mb-2">Your Message</label>

    <textarea id="message" name="message" required placeholder="Your message here" className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5" />
</div>

<button type="submit" className="bg-gradient-to-r from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-200 text-white py-3 rounded-lg">Send</button>
                </form>
            </div>
            </section>

    );
}

export default EmailSection;