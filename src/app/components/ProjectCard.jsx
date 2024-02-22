import React from 'react';
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import { motion } from 'framer-motion';

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
    return (
        <div>
            <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }} className="h-52 md:h-72 rounded-t-xl relative group overflow-hidden" style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}>
                <div
                    className="items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500"
                >
                    <Link className='h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link mr-2' href={gitUrl}>
                        <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] cursor-pointer hover:white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white" />
                    </Link>
                    <Link className='h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link' href={previewUrl}>
                        <EyeIcon className="h-10 w-10 text-[#ADB7BE] cursor-pointer hover:white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white" />
                    </Link>
                </div>
            </motion.div>
            <div className="text-white rounded-b-xl bg-[#181818] py-6 px-4">
                <h5 className='font-xl font-semibold mb-2'>{title}</h5>
                <p className='text-[#ADB7BE] '>{description}</p>
            </div>
        </div>
    );
};

export default ProjectCard;
