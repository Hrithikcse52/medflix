import React from 'react';
import { useParams } from 'react-router';

const PatientProfile = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <>
            <div>Hello</div>
        </>
    );
};

export default PatientProfile;
