import React, { useState } from 'react';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { app } from './Firebase';

const database = getDatabase(app);

const Database = () => {


    const [post, setPost] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');

    function sendData() {


        set(ref(database, 'users/username'), {
            username: "Nayan",
            email: "nayan123@gmail.com"
        }).then(() => {
            console.log("Data sent!");
        }).catch((err) => {
            console.log("Error: ", err);
        });


    }

    function getdata() {


        const starCountRef = ref(database, 'users/username');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setPost(data || {}); 
        });
    }

    function deletetodo() {


        const starCountRef = ref(database, 'users/username');

        remove(starCountRef)
            .then(() => {
                console.log("Data deleted!");
                setPost({}); 
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    }

    function handleEdit() {

        setIsEditing(true);

        setNewUsername(post.username);
        setNewEmail(post.email);
    }

    function updateData() {
        set(ref(database, 'users/username'), {

            username: newUsername,
            email: newEmail

        }).then(() => {


            console.log("Data updated successfully!");
            setIsEditing(false); 

        }).catch((err) => {

            console.log("Error updating data: ", err);


        });
    }

    function cancelEdit() {

        setIsEditing(false);


    }

    return (
        <div>
            <button onClick={sendData}>Send</button>
            <button onClick={getdata}>Get</button>

            {post.username && !isEditing && (
                <div>

                    <h1>{post.username}</h1>
                    <h1>{post.email}</h1>

                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={deletetodo}>Delete</button>

                    
                </div>
            )}

            {isEditing && (
                <div>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Edit username"
                    />
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Edit email"
                    />
                    <button onClick={updateData}>Update</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Database;