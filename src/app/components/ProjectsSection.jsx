"use client"
import React from 'react'
import ProjectCard from './ProjectCard'


const projects = [
    {
        id: 1,
        title: "Hermes",
        description: "This is a project",
        imgUrl: "/images/projects/hermes.png",
        tag: ["All", "Web","Mobile"]
    },
    {

        id: 2,
        title: "eva (Edmonton Virtual Assistant)",
        description: "This is a project",
        imgUrl: "/images/projects/eva.png",
        tag: ["All", "Web","Mobile"]
    },
    {

        id: 3,
        title: "Bon Voyage",
        description: "Android Ride Sharing App with a payment system",
        imgUrl: "/images/projects/bonvoyage.png",
        tag: ["All", "Mobile"]
    },
]
const ProjectsSection = () => {
    return (
        <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      {/* <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
       
      </div> */}
      <ul className="grid md:grid-cols-3 gap-8 md:gap-12">
        {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.imgUrl}
            />
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection