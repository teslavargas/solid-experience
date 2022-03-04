
import { useLocation } from 'solid-app-router';
import { Component, createSignal, For, JSX, Show } from 'solid-js';
import HasPermission from '../../../atoms/HasPermission';
import { dashRoutes } from '../../../config/dashRoutes';
import { useApplicationContext } from '../../../context/context';
import SideBarItem from '../../../molecules/SideBarItem';
import SideBarSubItem from '../../../molecules/SideBarSubItem';
import Footer from '../../footer/organisms/Footer';
import NavBar from '../../navBar/organisms/NavBar';
import SideBar from '../../sideBar/organisms/SideBar';

interface privateTemplateProps {
    children: JSX.Element | JSX.Element[];
}

const isEqualPath = ( { locationPath, itemPath }: {locationPath: string; itemPath: string} ) =>
{
    return locationPath.replace( /\//g, '' ) === itemPath.replace( /\//g, '' );
};

const PrivateLayout: Component<privateTemplateProps> = ( props ) =>
{
    const [ showSidebar, setShowSideBar ] = createSignal( false );
    const [ getShowSubitems, setShowSubitems ] = createSignal( false );
    const [ sectionSelected, setSectionSelected ] = createSignal( '' );
    // const { user, userPermissions } = useSelector((state : any) => state.Auth);
    const [ user ]: any = useApplicationContext();
    const location = useLocation();

    const onToggled = ( path: string ) =>
    {
        setShowSubitems( true );
        setSectionSelected( path );
    };
    const onClick = () =>
    {
        setShowSideBar( !showSidebar() );
    };

    const getDashItems = () =>

        <For each={dashRoutes} fallback={<div>Loading...</div>}>
            {( item ) =>
                <HasPermission
                    permission={item.permission}
                    user={user()}
                    userPermissions={user().user.permissions}
                >
                    <SideBarItem
                        name={item.name}
                        icon={item.icon}
                        isLoading={true}
                        onClick={() => ( onToggled( item.path ) )}
                        getShowSubitems={getShowSubitems()}
                        routes={item}
                        showItem={item.showItem}
                        isLink={!item.children}
                        path={ item.path }
                    >
                        <Show when={getShowSubitems() && sectionSelected() === item.path}>
                            <div class=" flex flex-row">
                                <a class=" ">
                                    <For each={item.children}>
                                        {( item ) =>
                                            <HasPermission
                                                permission={item.permission}
                                                user={user()}
                                                userPermissions={user().user.permissions}
                                            >
                                                <SideBarSubItem
                                                    name={item.name}
                                                    path={sectionSelected().concat( item.path )}
                                                    icon={item.icon}
                                                    isToggled={true}
                                                    showItem={item.showItem}
                                                    equalPath={isEqualPath( {
                                                        locationPath: location.pathname,
                                                        itemPath: sectionSelected().concat( item.path ),
                                                    } )}
                                                />
                                            </HasPermission>
                                        }
                                    </For>

                                </a>
                            </div>
                        </Show>
                    </SideBarItem>
                </HasPermission>
            }

        </For>;


    return (
        <div class="grid grid-areas-mobile-layout md:grid-areas-tablet-layout lg:grid-areas-desktop-layout grid-cols-desktop-layout
        h-full dg-main-bg">
            <header class="grid-in-header dg-element-bg">
                <NavBar showSidebar={showSidebar()} onClick={onClick} email={'example@emai.com'} />
            </header>
            <div class="hidden md:block mt-6 ml-4 z-10 w-max grid-in-sidebar text-white">
                <SideBar class="dg-rounded ml-1 h-89 py-5">
                    {getDashItems()}

                </SideBar>
            </div>
            {showSidebar() && (
                <div class="absolute md:hidden mt-20 md:m-4 z-50 ">
                    <SideBar class="relative ml-5 dg-rounded min-h-80vh  py-5 w-48 pb-20">
                        {getDashItems()}

                    </SideBar>
                </div>
            )}
            <main class="grid-in-main min-h-screen w-full">
                {/* <Breadcrumb class="pt-5 text-gray-500 lg:text-base ml-2 md:ml-4" /> */}
                {props.children}
            </main>
            <Footer class="flex grid-in-footer border m-4 w-auto p-4 text-sm text-gray-200 rounded justify-center">
                2021 © DigiChanges
            </Footer>

        </div>
    );
};

export default PrivateLayout;
