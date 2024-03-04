import {Modal} from "~/components/modal/Modal.tsx";
import {useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import useBoundStore from "~/store/useBoundStore.ts";
import {useState} from "react";

export const RegisterModal = () => {
    return <Modal id={'registerModal'}>
        <div className={"bg-white w-80 p-6 rounded-xl"}>
            <RegisterForm/>
        </div>
    </Modal>
}

type RegisterFormData = {
    name: string,
    email: string,
    phone: string,
    login: string,
    password: string
}

const registerSchema = yup
    .object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().required().max(20).required(),
        login: yup.string().required(),
        password: yup.string().required()
    })
    .required()

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
    } = useForm<RegisterFormData>(
        {
            defaultValues: {
                name: "",
                phone: "+7",
                email: "",
                login: "",
                password: ""
            },
            resolver: yupResolver(registerSchema)
        }
    )

    const [responseStatus, setResponseStatus] = useState<number>()

    const signUp = useBoundStore(state => state.signUp)

    const convertStatusToReadableResponse = (status: any) => {
        switch (status) {
            case 403:
                return "Пользователь с такими данными уже существует"
            case 200:
                return "Проверьте почту для подтверждения регистрации"
            case 500:
                return "На сервере ошибка"
        }
    }

    const onSubmit = (data: any) => {
        signUp(data).then(
            responseStatus => setResponseStatus(responseStatus)
        )
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex flex-col gap-10"}>
            <div className={"flex flex-col gap-2"}>
                <input
                    placeholder={"Имя"}
                    className={"border-2 rounded-md w-full text-lg p-2 bg-gray-50 border-gray-200 focus:outline-blue-400"} {...register('name')}/>
                <input
                    placeholder={"Электропочта"}
                    type={"email"}
                    className={"border-2 rounded-md w-full text-lg p-2 bg-gray-50 border-gray-200 focus:outline-blue-400"} {...register('email')}/>
                <input
                    type={"tel"}
                    placeholder={"Номер телефона"}
                    className={"border-2 rounded-md w-full text-lg p-2 bg-gray-50 border-gray-200 focus:outline-blue-400"} {...register('phone')}/>
                <input
                    placeholder={"Логин"}
                    className={"border-2 rounded-md w-full text-lg p-2 bg-gray-50 border-gray-200 focus:outline-blue-400"} {...register('login')}/>
                {/*TODO Add visibility toggle*/}
                <input placeholder={"Пароль"} type={"password"}
                       className={"border-2 rounded-md w-full text-lg p-2 bg-gray-50 border-gray-200 focus:outline-blue-400"} {...register('password')}/>
            </div>
            <div className={"flex flex-col gap-1 items-center"}>
                <p className={responseStatus !== 200 ? "text-red-800" : "text-green-600"} hidden={!responseStatus}>
                    {convertStatusToReadableResponse(responseStatus)}
                </p>
                <button className={"w-full"}>Зарегистрироваться</button>
            </div>
        </div>
    </form>
}