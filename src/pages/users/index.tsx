import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import { INIT_STATE } from '../../features/shared/constants';
import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
import useQuery from '../../features/shared/hooks/useQuery';
import UserList from '../../features/user/templates/UserList';
import { UserApi, UserListResponse } from '../../features/user/interfaces';
import UserRepository from '../../features/user/repositories/UserRepository';
import PrivateLayout from '../../features/shared/layout/PrivateLayout';
import usePermission from '../../features/shared/hooks/usePermission';
import { removeUserAction } from './delete/handlers';
import createAlert from '../../features/shared/hooks/createAlert';
import AlertErrors from '../../features/shared/molecules/AlertErrors/AlertErrors';

const IndexPage: Component = () =>
{
    const errorAlert = createAlert();
    const [ user ]: any = useApplicationContext();
    const userRepository = new UserRepository( user() );

    const { goToPage, uriParams } = useQuery( INIT_STATE.nextQueryParamsPagination );

    const [ users, { refetch } ] = createResource( uriParams, userRepository.getUsers() );
    const { resourceList: userList, setViewMore, paginationData } = usePaginatedState<UserApi, UserListResponse>( users );

    usePermission( user, [ users ] );

    const viewMoreAction = () => () =>
    {
        goToPage( users()?.pagination?.nextUrl );
        setViewMore();
    };

    return (
        <PrivateLayout>
            <AlertErrors errorData={errorAlert.errorData()} title="err_save" description="err_process_user"/>
            <UserList
                userList={userList()}
                removeAction={removeUserAction( { userRepository, errorAlert, refetch } )}
                loading={users.loading}
                viewMoreAction={viewMoreAction}
                nextPage={paginationData()?.nextUrl}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
