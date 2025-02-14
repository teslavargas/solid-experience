import { Component } from 'solid-js';
import GeneralLayout from '../../../features/shared/layout/GeneralLayout';
import UserMessageSuccess from '../../../features/user/templates/UserMessageSuccess';


const IndexPage: Component = () =>
{
    return ( <GeneralLayout>
        <UserMessageSuccess title={'au_email_sent_successfully'} description={'au_check_your_email_change_password'}/>
    </GeneralLayout>
    );
};

export default IndexPage;
