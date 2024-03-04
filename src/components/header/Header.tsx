import logo from '~/assets/png/logo.png'
import {relativePaths} from "~/relativePaths.ts";
import {Protected} from "~/components/protected/Protected.tsx";
import useBoundStore from "~/store/useBoundStore.ts";
import {AuthModal} from "~/pages/AuthModal.tsx";
import {RegisterModal} from "~/pages/RegisterModal.tsx";

export const Header = () => {
    const openModal = useBoundStore(state => state.openModal)

    return <div className={'flex flex-row items-center justify-between p-4 shadow w-full'}>
        <div className={'flex flex-row gap-4 items-center'}>
            <a href={relativePaths.INDEX}>
                <img src={logo} alt={'Логотип клуба горного туризма НГУ'}/>
            </a>
            <Protected isAuthenticated={true}>
                <a href={relativePaths.EQUIPMENT}>Снаряжение</a>
            </Protected>
        </div>
        <Protected isAuthenticated={false}>
            <button onClick={() => openModal('authModal')}>Войти</button>
            <AuthModal/>
            <RegisterModal/>
        </Protected>
    </div>
}