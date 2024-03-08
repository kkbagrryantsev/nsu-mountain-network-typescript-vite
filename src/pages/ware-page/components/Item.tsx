import {Item} from "~/model/Item.ts";
import {FaChevronRight} from "react-icons/fa";
import {Protected} from "~/components/protected/Protected.tsx";
import useBoundStore from "~/store/useBoundStore.ts";
import {CostFormatter} from "~/utils/CostFormatter.ts";

interface ItemComponentProps {
    item: Item
}

export const ItemComponent = (props: ItemComponentProps) => {
    const openModal = useBoundStore(state => state.openModal)

    const {item} = props
    const {id, name, categoryId, totalQuantity, availableQuantity, cost, weight} = item

    return <div className={"flex flex-col gap-2 p-4 bg-gray-100 border border-gray-300 rounded-xl"}>
        <div className={"flex flex-row justify-between"}>
            <div className={"flex flex-col"}>
                <div className={"text-lg font-semibold"}>
                    {name}
                </div>
                <div className={"text-sm"}>
                    ID категории: {categoryId}
                </div>
            </div>
            <div className={"flex flex-col text-right"}>
                <div className={"text-lg font-semibold text-gray-500"}>
                    {availableQuantity}/{totalQuantity}
                </div>
                <div className={"text-sm text-gray-500"}>
                    на складе
                </div>
            </div>
        </div>
        <div className={"flex flex-row justify-between items-center"}>
            <div className={"flex flex-row text-sm gap-3"}>
                <div className={"font-semibold"}>
                    {CostFormatter.format(cost)}
                </div>
                /
                <div className={"font-semibold"}>
                    {weight} кг
                </div>
            </div>
            <div className={"flex flex-row text-sm gap-3"}>
                <Protected>
                    <button onClick={() => {
                        openModal('itemModal', {itemId: id})
                    }} className={"p-1.5 rounded-md bg-blue-200"}>
                        <FaChevronRight/>
                    </button>
                </Protected>
            </div>
        </div>
    </div>
}