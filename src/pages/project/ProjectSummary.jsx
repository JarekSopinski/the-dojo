import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';
import Avatar from '../../components/avatar/Avatar';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function ProjectSummary({
    project
}) {

    const history = useHistory();
    const { deleteDocument } = useFirestore('projects');
    const { user } = useAuthContext();
    const { id, name, dueDate, details, assignedUsersList, createdBy } = project;

    const handleDelete = e => {
        deleteDocument(id);
        history.push('/');
    };

    return (
        <div>
            <div className='project-summary'>
                <h2 className='page-title'>{name}</h2>
                <p>By {createdBy.displayName}</p>
                <p className='due-date'>
                    Project due by {dueDate.toDate().toDateString()}
                </p>
                <p className='details'>
                    {details}
                </p>
                <h4>Project is assigned to:</h4>
                {assignedUsersList &&
                    <ul className='assigned-users'>
                        {assignedUsersList.map(({
                            id, photoURL
                        }) => (
                            <li key={id} >
                                <Avatar src={photoURL} />
                            </li>
                        ))}
                    </ul>
                }
            </div>
            {user.uid === createdBy.id && (
                <button
                    className='btn'
                    onClick={handleDelete}
                >Mark as Complete</button>
            )}
        </div>
    );
};