import React, { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import Avatar from '../../components/avatar/Avatar';

export default function ProjectComments({
    project
}) {
    const { updateDocument, response } = useFirestore('projects');
    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        };

        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        });

        if (!response.error) {
            setNewComment('');
        }
    };

    return (
        <div className='project-comments'>
            <h4>Project Comments</h4>

            {project.comments && project.comments.length > 0 &&
                <ul>
                    {project.comments.map(({
                        id, displayName, photoURL, content, createdAt
                    }) => (
                        <li key={id}>
                            <div className='comment-author'>
                                <Avatar src={photoURL} />
                                <p>{displayName}</p>
                            </div>
                            <div className='comment-date'>
                                <p>{formatDistanceToNow(createdAt.toDate(), { addSuffix: true })}</p>
                            </div>
                            <div className='comment-content'>
                                <p>{content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            }

            <form className='add-comment' onSubmit={handleSubmit}>

                <label>
                    <span>Add new comment:</span>
                    <textarea
                        required
                        onChange={e => setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>

                <button className='btn'>Add Comment</button>

            </form>

        </div>
    );
};