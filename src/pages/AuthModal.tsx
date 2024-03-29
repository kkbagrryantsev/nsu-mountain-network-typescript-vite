import {Modal} from "~/components/modal/Modal.tsx";
import {useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import useBoundStore from "~/store/useBoundStore.ts";
import {useState} from "react";

export const AuthModal = () => {
    return <Modal id={'authModal'}>
        <div className={"bg-white w-80 p-6 rounded-xl"}>
            <AuthForm/>
        </div>
    </Modal>
}

type AuthFormData = {
    login: string,
    password: string
}

const authSchema = yup
    .object({
        login: yup.string().required(),
        password: yup.string().required()
    })
    .required()

const AuthForm = () => {
    const {
        register,
        handleSubmit,
    } = useForm<AuthFormData>(
        {
            defaultValues: {
                login: "",
                password: "",
            },
            resolver: yupResolver(authSchema)
        }
    )

    const [responseStatus, setResponseStatus] = useState<number>()

    const signIn = useBoundStore(state => state.signIn)

    const convertStatusToReadableResponse = (status: any) => {
        switch (status) {
            case 401:
                return "Неверный логин или пароль"
            case 500:
                return "На сервере ошибка"
        }
    }

    const onSubmit = (data: any) => {
        signIn(data).then(
            responseStatus => setResponseStatus(responseStatus)
        )
    }

    const closeModal = useBoundStore(state => state.closeModal)
    const openModal = useBoundStore(state => state.openModal)
    const onRegisterButtonClick = () => {
        closeModal('authModal')
        openModal('registerModal')
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex flex-col gap-10"}>
            <div className={"flex flex-col gap-2"}>
                <input
                    placeholder={"Логин"}
                    className={"border-2 rounded-md w-full text-lg p-2 bg-gray-50 border-gray-200 focus:outline-blue-400"} {...register('login')}/>
                {/*TODO Add visibility toggle*/}
                <input placeholder={"Пароль"} type={"password"}
                       className={"border-2 rounded-md w-full text-lg p-2 bg-gray-50 border-gray-200 focus:outline-blue-400"} {...register('password')}/>
            </div>
            <div className={"flex flex-col gap-1 items-center"}>
                <p className={"text-red-800"} hidden={!responseStatus}>
                    {convertStatusToReadableResponse(responseStatus)}
                </p>
                <button className={"w-full"}>Войти</button>
                <button onClick={onRegisterButtonClick} type={"button"}
                        className={"text-gray-500 underline underline-offset-2 decoration-dashed text-sm hover:text-blue-700"}>
                    Зарегистрироваться
                </button>
            </div>

        </div>

    </form>
}