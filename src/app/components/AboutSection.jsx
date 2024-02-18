import React from 'react';
import Image from 'next/image';
const AboutSection = () => {
    return <section className='text-white'>
        <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
            <Image src="/images/about-image.png" width={500} height={500} alt="About Image" className='rounded-lg'/>
            <div>
                <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
                <p className='text-base md:text-lg '> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et aliquam repellendus sequi vitae consequatur? Assumenda placeat reiciendis ducimus ad dignissimos temporibus amet reprehenderit tenetur, quisquam nostrum dolor enim similique distinctio!</p>
                </div>
        </div>
    </section>

}

export default AboutSection;