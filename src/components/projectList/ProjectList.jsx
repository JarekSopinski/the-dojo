import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
import './ProjectList.css';

export default function ProjectList({
    projects
}) {
  return (
    <div className='project-list'>
        {projects.length === 0 && <p>No projects yet!</p>}
        {projects.map(({
          id, name, dueDate, assignedUsersList
        }) => (
            <Link 
            to={`/projects/${id}`} 
            key={id}>
              <h4>{name}</h4>
              <p>Due by {dueDate.toDate().toDateString()}</p>
              <div className='assigned-to'>
                <ul>
                {assignedUsersList && assignedUsersList.map(({
                  photoURL
                }) => (
                  <li key={photoURL}>
                    <Avatar src={photoURL} />
                  </li>
                ))}
                </ul>
              </div>
            </Link>
        ))}
    </div>
  );
};