import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminProfile from '../AdminProfile/AdminProfile';
import Profile from '../Profile/Profile';

function AccountManagement({ readAccess, updateAccess, writeAccess, deleteAccess }) {

    console.log(readAccess, updateAccess, writeAccess, deleteAccess, "Delete access")
    return (
        <div>
            <Routes>
                <Route exact strict path="school" element={<AdminProfile />} />
                <Route exact strict path="teacher" element={<Profile readAccess={readAccess} updateAccess={updateAccess} writeAccess={writeAccess} deleteAccess={deleteAccess} />} />
                <Route exact strict path="parents" element={<Profile readAccess={readAccess} updateAccess={updateAccess} writeAccess={writeAccess} deleteAccess={deleteAccess} />} />
                <Route exact strict path="student" element={<Profile readAccess={readAccess} updateAccess={updateAccess} writeAccess={writeAccess} deleteAccess={deleteAccess} />} />
            </Routes>
        </div>
    )
}

export default AccountManagement;