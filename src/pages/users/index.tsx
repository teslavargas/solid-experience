import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import { INIT_STATE } from '../../features/shared/constants';
import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
import useQuery from '../../features/shared/hooks/useQuery';
import { IUserApi, UserListResponse } from '../../interfaces/user';
import UserRepository from '../../repositories/UserRepository';
import PrivateLayout from '../../templates/layout/PrivateLayout';
import UserList from '../../templates/users/UserList';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const userRepository = new UserRepository( user() );

    const { goToPage, uriParams } = useQuery( INIT_STATE.nextQueryParamsPagination );

    const [ users, { refetch } ] = createResource( uriParams, userRepository.getUsers() );
    const { resourceList: userList, setViewMore } = usePaginatedState<IUserApi, UserListResponse>( users );

    const viewMoreAction = () => () =>
    {
        goToPage( users()?.pagination?.nextUrl );
        setViewMore();
    };

    const removeAction = async ( id: string  ) =>
    {
        const remove = userRepository.removeUser( id );
        void await remove();
        refetch();
    };

    return (
        <PrivateLayout>
            <UserList
                userList={userList()}
                removeAction={removeAction}
                loading={users.loading}
                viewMoreAction={viewMoreAction}
                nextPage={users()?.pagination?.nextUrl}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
