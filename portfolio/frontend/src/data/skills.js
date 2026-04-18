import {
  FiDatabase,
  FiGitBranch,
} from 'react-icons/fi'
import {
  SiSpringboot,
  SiReact,
  SiAngular,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiMysql,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

export const skills = [
  {
    category: 'Backend',
    items: [
      { name: 'Java', icon: FaJava },
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'Node.js', icon: SiNodedotjs },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: SiReact },
      { name: 'Angular', icon: SiAngular },
    ],
  },
  {
    category: 'Data & Infrastructure',
    items: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'SQL', icon: FiDatabase },
      { name: 'Docker', icon: SiDocker },
    ],
  },
  {
    category: 'Tools & Practices',
    items: [
      { name: 'Git', icon: FiGitBranch },
      { name: 'Python', icon: SiPython },
    ],
  },
]
