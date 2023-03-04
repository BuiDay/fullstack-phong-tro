import React, { useState } from 'react';
import icons from '../../utils/icons'
import SearchItem from './SearchItem'
import Modal from '../Modal/Modal';
import { useAppSelector } from '../../store/hook'
import { RootState } from '../../store/redux';

const { BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons
const Search = () => {
    
    const [isShowModal, setIsShowModal] = useState(false)
    const [content, setContent] = useState<any[]>([])
    const [name, setName] = useState('')
    const [defaultText, setDefaultText] = useState('')
    const [title, setTitle] = useState('')
    const {categories,prices}  = useAppSelector((state:RootState) => state.app)
    const handleShowModal = (content:any[] , name:string, defaultText:string,title:string) => {
        setContent(content)
        setName(name)
        setDefaultText(defaultText)
        setIsShowModal(true)
        setTitle(title)
    }
    return (
        <div className='p-[10px] w-1100 my-3 mx-auto bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
                <span className='cursor-pointer flex-1' onClick={() => categories && handleShowModal(categories, 'category', 'Tìm tất cả','Chọn loại bất động sản')}>
                    <SearchItem IconBefore={<MdOutlineHouseSiding />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={'Nhà trọ, phòng trọ'} defaultText={'Tìm tất cả'} />
                </span>
                <span className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<HiOutlineLocationMarker />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={'Toàn quốc'} defaultText={'Toàn quốc'} />
                </span>
                <span className='cursor-pointer flex-1' onClick={() => handleShowModal(prices, 'price', 'Chọn giá','Chọn giá')}>
                    <SearchItem IconBefore={<TbReportMoney />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={'Chọn giá'} defaultText={'Chọn giá'} />
                </span>
                <span className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<RiCrop2Line />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={'Chọn diện tích'} defaultText={'Chọn diện tích'} />
                </span>
            <button
                    type='button' 
                    className='outline-none py-2 px-4 flex-1 bg-secondary text-[13.3px] flex items-center justify-center gap-2 text-white font-medium rounded-md'
                >
                    <FiSearch />
                    Tìm kiếm
            </button>
            {isShowModal && 
            <Modal
                setIsShowModal={setIsShowModal}
                content={content}
                name={name}
                defaultText={defaultText}
                title = {title}
            />}
        </div>
    );
};

export default Search;