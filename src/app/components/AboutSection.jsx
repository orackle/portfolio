"use client"
import React, {useTransition, useState} from 'react';
import TabButton from './TabButton';    
import Image from 'next/image';

import {motion} from 'framer-motion';
const TAB_DATA = [
    {
        title: 'Skills',
        id: 'skills',
        content: (
            <ul className='list-disc pl-2'>
                <li>Python (Django, Flask)</li>
                <li> Java</li>
                <li>PostgreSQL, Oracle, Firebase, MongoDB</li>
                <li>Node.js</li>
                <li>C/C++</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Adobe XD</li>
            </ul>
        )
    },
    {
        title: 'Education',
        id: 'education',
        content: (
            <ul className='list-disc pl-2'>
                <li>Binghamton University - State University of New York (2024)</li>
                <li>University of Alberta - Bachelor of Science: Specialization in Computer Science (2021)</li>
                <li>Aptech Institute - Web Development Course (2017)</li>
            </ul>
        )
    },
    {
        title: 'Certifications',
        id: 'certifications',
        content: (
            <ul className='list-disc pl-2'>
                <li>Oracle Certified Associate, Java SE 6 Programmer</li>
                <li>Technology Alberta: Technology SME Professional Development Series</li>
            </ul>
        )
    }
];
const AboutSection = () => {

    const [tab, setTab] = useState('skills');
    const [isPending, startTransition] = useTransition();
    const handleTabChange = (id) => {
        startTransition(() => {
          setTab(id);
        });
      };
    
    return <section className='text-white' id="about">
        <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
            <Image src="/images/about-image.png" width={500} height={500} alt="About Image" className='rounded-lg'/>
            <motion.div initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }} className='mt-4 md:mt-0 text-left flex flex-col h-full '>
                <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
                <p className='text-base lg:text-lg '> Hi there! I'm a caffeine enthusiast, enjoy reading manga and fiction, and had a love for solving puzzles as young as I could remember. I have experience working with Python (Django, Flask), PostgreSQL, Oracle, HTML, CSS (Tailwind, Bootstrap), JavaScript (React, Node.js), and Git. 

                <br/> <br></br>My mantra is to prioritize user experience, always find a way to learn from every experience and inject fun into everything I do.  

                <br/> <br></br> It's exactly why I have endeavoured to work in all the roles a project or time can let me, be it system design, database design, backend bugs, frontend design. I'd love to work in a full-stack role or become a product manager in the future.
                
                <br/> <br></br>Let's grab a cup of coffee and tackle some coding challenges together!</p>

                <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div> 
          <div className='mt-8'>{TAB_DATA.find((data) => data.id === tab).content}</div>
          </motion.div> 
          </div>    
    </section>

}

export default AboutSection;


