import { useNavigate } from 'solid-app-router';
import { useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import Button from '../../../../atoms/Button';
import Input from '../../../../atoms/Input';
import Title from '../../../../atoms/Title';
import { ChangeForgotPasswordPayload } from '../../interfaces/forgotPassword';
import ChangeForgotPasswordSchema from '../../validations/schemas/ChangeForgotPasswordSchema';

interface UserChangePasswordTemplateProps
{
    changeForgotPasswordAction: ( data: ChangeForgotPasswordPayload ) => void;
    confirmationToken: string;
}

const ChangeForgotPassword: Component<UserChangePasswordTemplateProps> = ( props ) =>
{
    const navigate = useNavigate();
    const onClose = () =>
    {
        navigate( '/login' );
    };
    const i18n = useI18n();
    const { t } = i18n;
    return (
        <section class="dg-main-bg h-screen">
            <div class="dg-full-center-flex">
                <div class="dg-rounded-small-box-gray py-5 ">
                    <div class="text-gray-500 body-font  w-full  mx-auto px-3 pt-2 md:pt-10">
                        <div class="mb-2 ">
                            <Title class="text-3xl font-bold sm:px-0 md:px-18 lg:px-14" titleType="h1">
                                Change Password
                            </Title>
                        </div>

                        <Form
                            initialValues={{
                                confirmationToken: props.confirmationToken,
                                password: '',
                                passwordConfirmation: '',
                            }}
                            validation={ChangeForgotPasswordSchema( t )}
                            onSubmit={async ( form ) =>
                            {
                                props.changeForgotPasswordAction( form.values );
                            }}

                        >

                            <div class="sm:px-0 md:px-16 lg:px-14 flex flex-wrap mb-6 text-sm">
                                <div class="w-full px-2 mb-5">

                                    <Input
                                        name="password"
                                        type="password"
                                        id="password"
                                        class="dg-form-field-full font-extrabold pl-5  focus:border-indigo-500 text-base hover:border-grey "
                                        placeholder="Enter Password"
                                        labelClass="dg-form-label"
                                        labelName="Password"
                                        errorClass="ml-1"
                                    />
                                </div>
                                <div class="w-full px-2 mb-5">

                                    <Input
                                        name="passwordConfirmation"
                                        type="password"
                                        id="passwordConfirmation"
                                        class="dg-form-field-full font-extrabold pl-5  focus:border-indigo-500 text-base hover:border-grey "
                                        placeholder="Repeat Password"
                                        labelClass="dg-form-label"
                                        labelName="Confirm Password"
                                        errorClass="ml-1"
                                    />
                                </div>
                                <div class="w-full  flex flex-row-reverse ">
                                    <Button class="dg-main-button" type="submit">
                                        Save
                                    </Button>
                                    <Button class="dg-secondary-button mr-1" onClick={onClose}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </Form>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default ChangeForgotPassword;
