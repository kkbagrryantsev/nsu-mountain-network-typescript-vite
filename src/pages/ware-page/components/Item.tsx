import {Item} from "~/model/Item.ts";

interface ItemComponentProps {
    item: Item
}

export const ItemComponent = (props: ItemComponentProps) => {
    const costFormatter = new Intl.NumberFormat('ru-RU', {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })

    const {item} = props
    const {name, categoryId, totalQuantity, availableQuantity, cost, weight} = item
    return <div className={"flex flex-col gap-2 p-4 bg-gray-100 border border-gray-300 rounded-xl"}>
        <div className={"flex flex-row justify-between"}>
            <div className={"flex flex-col"}>
                <div className={"text-lg font-semibold"}>
                    {name}
                </div>
                <div className={"text-sm"}>
                    {categoryId}
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
                    {costFormatter.format(cost)}
                </div>
                /
                <div className={"font-semibold"}>
                    {weight} кг
                </div>
            </div>
            <div className={"flex flex-row text-sm gap-3"}>
                <button className={"p-0.5 ps-3 pe-3 rounded-md bg-blue-200"}>
                    Выдать
                </button>
            </div>
        </div>
    </div>
}