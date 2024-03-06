import {Modal} from "~/components/modal/Modal.tsx"
import useBoundStore from "~/store/useBoundStore.ts";
import {useEffect} from "react";
import {ComponentWithLoader} from "~/components/component-with-loader/ComponentWithLoader.tsx";
import {CostFormatter} from "~/utils/CostFormatter.ts";
import {SlOptionsVertical} from "react-icons/sl";
import {UseRecord} from "~/model/UseRecord.ts";
import Dropdown from "~/components/dropdown/Dropdown.tsx";
import DropdownToggle from "~/components/dropdown/DropdownToggle.tsx";
import DropdownMenu from "~/components/dropdown/DropdownMenu.tsx";
import DropdownItem from "~/components/dropdown/DropdownItem.tsx";

interface ItemModalProps {
    itemId?: string
}

export const ItemModal = (props: ItemModalProps) => {
    const {itemId} = props

    if (itemId == null) {
        return
    }

    const itemLoader = useBoundStore(state => state.item)
    const itemUseHistoryLoader = useBoundStore(state => state.useData)
    const getItem = useBoundStore(state => state.getItem)

    useEffect(() => {
        void getItem(itemId)
    }, [itemId, getItem]);

    return <Modal id={'itemModal'}>
        <div className={"bg-white md:w-screen max-w-[50rem] p-4 rounded-xl"}>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex flex-row justify-between"}>
                    <div className={"flex flex-row gap-2"}>
                        <div className={"bg-gray-200 w-[7rem] h-[7rem] aspect-square"}>Картинка</div>
                        <div className={"flex flex-col justify-between"}>
                            <div className={"flex flex-col"}>
                                <div className={"flex flex-col"}>
                                    <div className={"text-lg font-semibold"}>
                                        <ComponentWithLoader onLoading={<></>} onError={<></>}
                                                             loading={itemLoader.loading}>
                                            {itemLoader.data?.name}
                                        </ComponentWithLoader>
                                    </div>
                                    <div className={"text-sm text-gray-500"}>
                                        <ComponentWithLoader onLoading={<></>} onError={<></>}
                                                             loading={itemLoader.loading}>
                                            ID категории: {itemLoader.data?.categoryId}
                                        </ComponentWithLoader>
                                    </div>
                                    <div className={"text-sm text-gray-500"}>
                                        <ComponentWithLoader onLoading={<></>} onError={<></>}
                                                             loading={itemLoader.loading}>
                                            Цена: {CostFormatter.format(itemLoader.data?.cost!)}
                                        </ComponentWithLoader>
                                    </div>
                                    <div className={"text-sm text-gray-500"}>
                                        <ComponentWithLoader onLoading={<></>} onError={<></>}
                                                             loading={itemLoader.loading}>
                                            Вес: {itemLoader.data?.weight} кг
                                        </ComponentWithLoader>
                                    </div>
                                </div>
                                <div>
                                    <ComponentWithLoader onLoading={<></>} onError={<></>} loading={itemLoader.loading}>
                                        {itemLoader.data?.description}
                                    </ComponentWithLoader>
                                </div>
                            </div>
                            {/*<div className={"flex flex-row gap-2"}>*/}
                            {/*    <div className={"text-sm text-gray-500"}>*/}
                            {/*        <ComponentWithLoader onLoading={<></>} onError={<></>} loading={itemLoader.loading}>*/}
                            {/*            Цена: {CostFormatter.format(itemLoader.data?.cost!)}*/}
                            {/*        </ComponentWithLoader>*/}
                            {/*    </div>*/}
                            {/*    <div className={"text-sm text-gray-500"}>*/}
                            {/*        <ComponentWithLoader onLoading={<></>} onError={<></>} loading={itemLoader.loading}>*/}
                            {/*            Вес: {itemLoader.data?.weight} кг*/}
                            {/*        </ComponentWithLoader>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className={"flex flex-col p-1.5"}>
                        <SlOptionsVertical/>
                    </div>
                </div>
                <div className={"flex flex-col gap-1"}>
                    <div className={"text-lg font-semibold"}>История выдачи</div>
                    <div className={"grid sm:grid-cols-1 md:grid-cols-3 gap-2"}>
                        <ComponentWithLoader onLoading={<></>} onError={<></>} loading={itemLoader.loading}>
                            {itemUseHistoryLoader.data.sort((a: UseRecord, b: UseRecord) => {
                                return a.isConfirmed > b.isConfirmed
                            }).map((useRecord: UseRecord) => <ItemUseRecord
                                useRecord={useRecord} key={useRecord.id}/>)}
                        </ComponentWithLoader>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}

interface ItemUseRecordProps {
    useRecord: UseRecord
}

const ItemUseRecord = (props: ItemUseRecordProps) => {
    const {useRecord} = props
    const {endDate, startDate, userId, description, quantity, isConfirmed} = useRecord

    const dateFormat: Intl.DateTimeFormatOptions = {
        dateStyle: "short"
    }

    return <div className={"flex flex-col bg-gray-100 p-3 rounded-xl gap-1.5 max-w-72"}>
        <div className={"flex flex-row justify-between gap-2"}>
            <div className={"flex flex-row gap-1"}>
                <div className={"rounded-full bg-red-300 w-10 h-10"}/>
                {/*TODO Ask backend to make a user request by id*/}
                <div className={"font-semibold text-nowrap"}>
                    ID пользов.: {userId}
                </div>
            </div>
            <div className={"pt-0.5"}>
                <Dropdown>
                    <DropdownToggle>
                        <SlOptionsVertical/>
                    </DropdownToggle>
                    <DropdownMenu>
                        {!isConfirmed ? <DropdownItem>
                            <div className={"text-sm font-medium"}>Подтвердить бронь</div>
                        </DropdownItem> : null}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div className={"flex flex-row justify-between items-end gap-2"}>
            <div className={"flex flex-col gap-1"}>
                <div
                    className={`border-s-2 max-w-40 text-wrap border-gray-400 overflow-clip ps-1 font-mono text-sm ${description ? "" : "text-gray-400"}`}>
                    {description || "Без описания"}
                </div>
                <div className={"text-xs text-gray-500 text-nowrap"}>
                    {startDate.toLocaleString('ru-RU', dateFormat)} - {endDate.toLocaleString('ru-RU', dateFormat)}
                </div>
            </div>
            <div
                className={`flex flex-row justify-center items-center min-h-10 min-w-10 ${isConfirmed ? "bg-green-300" : "bg-gray-300"} rounded-md font-bold text-lg`}>
                {quantity}
            </div>
        </div>
    </div>
}