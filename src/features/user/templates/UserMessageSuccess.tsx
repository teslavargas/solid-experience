import { useNavigate } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import Title from '../../../atoms/Title';
interface messageSuccessProps{
    title: string;
    description: string;
}
const UserMessageSuccess: Component<messageSuccessProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;
    const navigate = useNavigate();
    const handleOnclick = () =>
    {
        navigate( '/login', { replace: true } );
    };

    return (
        <section class="dg-main-bg h-screen">
            <div class="dg-full-center-flex">
                <div class="dg-rounded-small-box-gray py-5 ">
                    <div class="text-gray-500 body-font  w-full  mx-auto px-3 pt-2 md:pt-10">
                        <div class="mb-2 ">
                            <Title class="text-3xl font-bold sm:px-0 text-center pb-16" titleType="h1">
                                <Text message={props.title}/>
                            </Title>
                        </div>
                        <div>
                            <div class="flex flex-wrap text-center text-sm pb-10">
                                <div class="w-full mb-1 pr-3 pl-2">
                                    <span class="w-full text-xl text-bold  ">{t( props.description )}</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-center pt-10 pb-5">
                                <button onClick={handleOnclick} class="inline-block align-baseline font-bold text-base ">
                                    <Text message="au_go_to_login" class="underline" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserMessageSuccess;
