import React, { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import ProjectList from '../../components/projectList/ProjectList';
import ProjectFilter from './ProjectFilter';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');

  const changeFilter = newFilter => {
    setCurrentFilter(newFilter);
  };

  const filteredProjects = documents ? documents.filter(({
    assignedUsersList, category
  }) => {
    switch (currentFilter) {
      case 'all':
        return true;
      case 'mine':
        let assignedToMe = false;
        assignedUsersList && assignedUsersList.forEach(u => {
          user.uid === u.id && (assignedToMe = true);
        });
        return assignedToMe;
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        return category === currentFilter;
      default:
        return true;
    }
  }) : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents &&
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />}
      {filteredProjects &&
        <ProjectList projects={filteredProjects} />
      }
    </div>
  );
};