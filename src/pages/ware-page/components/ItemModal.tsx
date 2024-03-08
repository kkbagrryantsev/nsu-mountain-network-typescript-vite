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
import {UseRecordState} from "~/enums/UseRecordState.ts";
import {useGetUsername} from "~/hooks/useGetUsername.ts";
import {LoadingState} from "~/enums/LoadingState.ts";
import {FaPlus} from "react-icons/fa6";

export const ItemModal = () => {
    const currentModal = useBoundStore(state => state.modals['itemModal'])

    const itemUseRecordsLoader = useBoundStore(state => state.useData)
    const itemLoader = useBoundStore(state => state.item)
    const getItem = useBoundStore(state => state.getItem)
    const openModal = useBoundStore(state => state.openModal)
    const closeModal = useBoundStore(state => state.closeModal)

    useEffect(() => {
        if (currentModal === undefined) {
            return
        }
        const {itemId} = currentModal
        void getItem(itemId)
    }, [currentModal, getItem]);

    const onGiveItemClick = () => {
        const {itemId} = currentModal
        openModal('itemGiveModal', {itemId})
        closeModal('itemModal')
    }

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
                                    <div
                                        className={`${itemLoader.data?.description === "" && "text-gray-400"} text-sm font-mono`}>
                                        <ComponentWithLoader onLoading={<></>} onError={<></>}
                                                             loading={itemLoader.loading}>
                                            {itemLoader.data?.description || "Без описания"}
                                        </ComponentWithLoader>
                                    </div>
                                    <div className={"text-sm text-gray-500"}>
                                        <ComponentWithLoader onLoading={<></>} onError={<></>}
                                                             loading={itemLoader.loading}>
                                            Категория: #{itemLoader.data?.categoryId}
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
                            <div onClick={onGiveItemClick} className={"flex flex-col justify-center items-center border-2 border-blue-200 hover:border-blue-400 hover:cursor-pointer border-dashed rounded-xl"}>
                                <FaPlus fill={"skyBlue"} size={40}/>
                                <div className={"text-sm font-medium text-sky-400"}>
                                    Выдать
                                </div>
                            </div>
                            {itemUseRecordsLoader.data.sort((a: UseRecord, b: UseRecord) => {
                                return a.isConfirmed < b.isConfirmed
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
    const {id, endDate, startDate, userId, description, quantity, isConfirmed} = useRecord

    const dateFormat: Intl.DateTimeFormatOptions = {
        dateStyle: "short"
    }

    let useRecordState = "???"
    switch (isConfirmed) {
        case UseRecordState.REQUESTED:
            useRecordState = "Заявка на бронь"
            break
        case UseRecordState.BOOKED:
            useRecordState = "Бронь"
            break
        case UseRecordState.GIVEN:
            useRecordState = "Выдано"
            break
        case UseRecordState.RETURNED:
            useRecordState = "Возвращено"
            break
    }

    const approveItemBookingRequest = useBoundStore(state => state.approveItemBookingRequest)
    const rejectItemBookingRequest = useBoundStore(state => state.rejectItemBookingRequest)
    const giveItemByBookingRequest = useBoundStore(state => state.giveItemByBookingRequest)
    const returnItem = useBoundStore(state => state.returnItem)

    const usernameLoader = useGetUsername(userId)

    return <div
        className={`${isConfirmed === UseRecordState.RETURNED && "opacity-60"} flex flex-col bg-gray-100 p-3 rounded-xl gap-1.5 max-w-72`}>
        <div className={"flex flex-row justify-between"}>
            <div className={"text-xs font-medium text-gray-400"}>
                {useRecordState} #{id}
            </div>
            <div className={"pt-0.5"}>
                {isConfirmed !== UseRecordState.RETURNED && <Dropdown>
                    <DropdownToggle>
                        <SlOptionsVertical fill={"gray"}/>
                    </DropdownToggle>
                    <DropdownMenu>
                        {isConfirmed === UseRecordState.GIVEN && <DropdownItem>
                            <div
                                role={"button"}
                                onClick={() => returnItem(id, quantity)}
                                className={"text-sm font-medium"}>
                                Подтвердить полный возврат
                            </div>
                        </DropdownItem>}
                        {isConfirmed === UseRecordState.BOOKED && <DropdownItem>
                            <div
                                role={"button"}
                                onClick={() => giveItemByBookingRequest(id)}
                                className={"text-sm font-medium"}>
                                Выдать снаряжение
                            </div>
                        </DropdownItem>}
                        {isConfirmed === UseRecordState.REQUESTED && <DropdownItem>
                            <div
                                role={"button"}
                                onClick={() => approveItemBookingRequest(id)}
                                className={"text-sm font-medium"}>
                                Одобрить заявку
                            </div>
                        </DropdownItem>}
                        {isConfirmed === UseRecordState.REQUESTED && <DropdownItem>
                            <div role={"button"} onClick={() => rejectItemBookingRequest(id)}
                                 className={"text-sm font-medium"}>Отклонить заявку
                            </div>
                        </DropdownItem>}
                    </DropdownMenu>
                </Dropdown>}
            </div>
        </div>

        <div className={"flex flex-row justify-between gap-2"}>
            <div className={"flex flex-row gap-1"}>
                <div className={"rounded-full bg-red-300 w-10 h-10"}/>
                <div className={"font-semibold text-nowrap"}>
                    {usernameLoader.loading === LoadingState.LOADED ? usernameLoader.data : `Пользователь #${userId}`}
                </div>
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
                className={`flex flex-row justify-center items-center min-h-10 min-w-10 ${isConfirmed === UseRecordState.GIVEN ? "bg-green-300" : "bg-gray-300"} rounded-md font-bold text-lg`}>
                {isConfirmed !== UseRecordState.RETURNED ? quantity : "#"}
            </div>
        </div>
    </div>
}