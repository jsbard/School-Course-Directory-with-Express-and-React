import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
export default async ({context}) => {
    // component calls signOut and updates state after render
    await useEffect(() =>  context.actions.deleteCourse(id, user));

    return (
        <Redirect to="/" />
    );
}
