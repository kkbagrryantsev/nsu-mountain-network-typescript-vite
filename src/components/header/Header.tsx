import logo from '~/assets/png/logo.png'
import {relativePaths} from "~/relativePaths.ts";
import {Protected} from "~/components/protected/Protected.tsx";

export const Header = () => {
    return <div className={'flex flex-row items-center justify-between p-4 shadow w-full'}>
        <div className={'flex flex-row gap-4 items-center'}>
            <a href={relativePaths.INDEX}>
                <img src={logo} alt={'Логотип клуба горного туризма НГУ'}/>
            </a>
            <Protected isAuthenticated={false}>
                <a href={relativePaths.EQUIPMENT}>Снаряжение</a>
            </Protected>
        </div>
        {/*TODO Add modal*/}
        <Protected isAuthenticated={false}>
            <button>Войти</button>
        </Protected>
    </div>
}