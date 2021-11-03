import { Component } from 'solid-js';
import RoleCreate from '../../../templates/roles/RoleCreate';
import PublicLayout from '../../../templates/layout/PublicLayout';

const IndexPage: Component = ( props ) =>
{

    return <PublicLayout>
        <RoleCreate
        // permissionsList={Auth.permissionsList}
        // createAction={createAction}
        />
    </PublicLayout>;


};

export default IndexPage;
