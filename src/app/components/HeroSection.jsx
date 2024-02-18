"use client"

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <section className="hero-section grid grid-cols-1 lg:grid-cols-12">
            <div className="col-span-12 lg:col-span-7 place-self-center text-center sm:text-left">
                <h1 className="hero-section__title mt-5 mb-4 text-4xl lg:text-6xl sm:text-5xl font-extrabold">
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>Hello, I'm {" "}</span>
                    <br />
                    <span className="block lg:inline-block lg:min-w-[680px]"> {/* Adjust the width as needed */}
                        <TypeAnimation
                            sequence={[
                                'Debbie',
                                1000,
                                'Frontend Developer',
                                1000,
                                'Backend Developer',
                                1000,
                                'UX/UI Designer',
                                1000,
                            ]}
                            wrapper="span"
                            speed={20}
                            style={{ display: 'inline-block' }}
                            repeat={Infinity}
                        />
                    </span>
                </h1>
                <p className="hero-section__description text-base sm:text-lg text-[#ADB7BE] text-lg mb-10 lg:text-xl">I am searching for full-time Software Developer Roles</p>
                <button className='px-6 py-3 mr-4 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-200 text-white w-full sm:w-fit' >Hire Me</button>
                <button className='px-6 py-3 mr-4 mt-3 rounded-full bg-transparent hover:bg-slate-800 text-white border border-white w-full sm:w-fit'> Download CV</button>
            </div>

            <div className="col-span-12 lg:col-span-5 place-self-center mt-8 lg:mt-0">
                <div className="rounded-full overflow-hidden w-[200px] h-[200px] relative mx-auto lg:mx-0">
                    <Image
                        src="/images/self3.jpg"
                        alt="hero image"
                        width={300}
                        height={400}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 hover:scale-110 transition duration-500 ease-in-out z-10 object-cover object-center"
                        layout="responsive"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;