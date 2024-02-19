import React from 'react';
import Image from 'next/image';
const AboutSection = () => {
    return <section className='text-white'>
        <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
            <Image src="/images/about-image.png" width={500} height={500} alt="About Image" className='rounded-lg'/>
            <div>
                <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
                <p className='text-base md:text-lg '> Hi there! I'm a caffeine enthusiast, enjoy reading manga and fiction, and had a love for solving puzzles as young as I could remember. When it comes to coding and software (or learning how to do something new, like knit my mother a blanket), I bring that same curiosity, energy and big-picture thinking to devise new solutions. 
                <br/> <br></br>I enjoy the feeling of breaking new ground! It's exactly why I have endeavoured to work in all the roles a project or time can let me, be it system design, database design, backend bugs, frontend design. I'd love to work in a full-stack role or become a product manager in the future.
                
                <br/> <br></br>My mantra is to prioritize user experience and inject fun into everything I do.  
                
                <br/> <br></br>Let's grab a cup of coffee and tackle some coding challenges together!</p>
                </div>
        </div>
    </section>

}

export default AboutSection;


