import {ItemSearchBar} from "~/pages/ware-page/components/ItemSearchBar.tsx";
import {ItemsList} from "~/pages/ware-page/components/ItemsList.tsx";

export const WarePageContent = () => {
    return <div className={"p-6"}>
        <div className={"flex flex-row justify-center gap-4"}>
            <div className={"flex flex-col"}>
                Фильтры
            </div>
            <div className={"flex flex-col gap-4"}>
                <ItemSearchBar/>
                <ItemsList/>
            </div>
        </div>
    </div>

}