"use client"
import React, {useState }from 'react'
import ProjectCard from './ProjectCard'
import ProjectTag from './ProjectTag'

const projects = [
    {
        id: 1,
        title: "Hermes",
        description: "This is a project",
        imgUrl: "/images/projects/hermes.png",
        tag: ["All", "Web","Mobile"],
        gitUrl: "https://github.com/orackle/Hermes",
        previewUrl: "https://github.com/orackle/Hermes/wiki"
    },
    {

        id: 2,
        title: "eva (Edmonton Virtual Assistant)",
        description: "This is a project",
        imgUrl: "/images/projects/eva.png",
        tag: ["All", "Web","Mobile"],
        gitUrl: "/",
        previewUrl: "/"
    },
    {

      id: 3,
      title: "Bon Voyage",
      description: "Android Ride Sharing App with a payment system",
      imgUrl: "/images/projects/bonvoyage.png",
      tag: ["All", "Mobile"],
      gitUrl: "https://github.com/orackle/bonvoyage",
      previewUrl: "https://github.com/orackle/bonvoyage/wiki"
  },
  {

    id: 4,
    title: "Ada's Team Website",
    description: "Website for Ada's Team - connecting university students with industry professionals",
    imgUrl: "/images/projects/adas.png",
    tag: ["All", "Web","Mobile"],
    gitUrl: "https://github.com/adasdevelopers/adas-team-website",
    previewUrl: "https://adasdevelopers.github.io/adas-team-website/"
},
{

  id: 5,
  title: "Edmonton Crime Report",
  description: "Website for Ada's Team - connecting university students with industry professionals",
  imgUrl: "/images/projects/epcd.png",
  tag: ["All", "Web"],
  gitUrl: "https://github.com/jha8/opendataproject",
  previewUrl: "/"
},
]
const ProjectsSection = () => {
    const [tag, setTag] = useState('All')
    // function to filter out a project on tag

    const handleTagChange = (newTag) =>{
        setTag(newTag);
    }
    const filteredProjects = projects.filter((project) => project.tag.includes(tag));
    return (
        <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
       <ProjectTag tag="All" isSelected={tag === "All"} onClick={handleTagChange} />

       <ProjectTag tag="Web" isSelected={tag === "Web"} onClick={handleTagChange} />

         <ProjectTag tag="Mobile" isSelected={tag === "Mobile"} onClick={handleTagChange} />    
      </div>
      <ul className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.imgUrl}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
            />
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection