import React, { useState,useCallback, useEffect } from 'react';
import icons from '../../utils/icons'
import SearchItem from './SearchItem'
import Modal from '../Modal/Modal';
import { useAppSelector } from '../../store/hook'
import { RootState } from '../../store/redux';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
interface IQueries{
    category?:string,
    province?:string,
    price?:string,
    area?:string,
    provinceCode?:string,
    categoryCode?:string
    areaNumber?:[],
    priceNumber?:[],

}
const { BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons
const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {categories,prices,provinces,areas}  = useAppSelector((state:RootState) => state.app)
    const [isShowModal, setIsShowModal] = useState(false)
    const [content, setContent] = useState<any[]>([])
    const [name, setName] = useState('')
    const [defaultText, setDefaultText] = useState('')
    const [title, setTitle] = useState('')
    const [queries, setQueries] = useState<IQueries>({})
    const [arrMinMax, setArrMinMax] = useState({})

    const handleShowModal = (content:any[] , name:string, defaultText:string,title:string) => {
        setContent(content)
        setName(name)
        setDefaultText(defaultText)
        setIsShowModal(true)
        setTitle(title)
    }
    const handleSubmit = useCallback((e?:React.MouseEvent<HTMLSpanElement, MouseEvent>, query?:any, arrMaxMin?:object) => {
        e && e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
        arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
    }, [isShowModal, queries])

    const handleSearch =  ()  => {
        const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
        let queryCodesObj:any = {}
        queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
        const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
        let queryTextObj:any = {}
        queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
        let titleSearch = `${queryTextObj.category
            ? queryTextObj.category
            : 'Cho thu?? t???t c???'} ${queryTextObj.province
                ? `t???nh ${queryTextObj.province}`
                : ''} ${queryTextObj.price
                    ? `Gi?? ${queryTextObj.price}`
                    : ''} ${queryTextObj.area
                        ? `di???n t??ch ${queryTextObj.area}` : ''} `
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(queryCodesObj).toString(),
        }, { state: { titleSearch } })
    }

    // useEffect(() => {
    //     if (!location?.pathname.includes(path.SEARCH)) {
    //         setArrMinMax({})
    //         setQueries({})
    //     }
    // }, [location])

    return (
        <div className='p-[10px] w-1100 my-3 mx-auto bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
                <span className='cursor-pointer flex-1' onClick={() => categories && handleShowModal(categories, 'category', 'T??m t???t c???','Ch???n lo???i b???t ?????ng s???n')}>
                    <SearchItem IconBefore={<MdOutlineHouseSiding />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.category} defaultText={'T??m t???t c???'} />
                </span>
                <span className='cursor-pointer flex-1' onClick={() =>provinces && handleShowModal(provinces, 'province', 'To??n qu???c','Ch???n t???nh th??nh')}>
                    <SearchItem IconBefore={<HiOutlineLocationMarker />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.province} defaultText={'To??n qu???c'} />
                </span>
                <span className='cursor-pointer flex-1' onClick={() =>prices && handleShowModal(prices, 'price', 'Ch???n gi??','Ch???n gi??')}>
                    <SearchItem IconBefore={<TbReportMoney />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.price} defaultText={'Ch???n gi??'} />
                </span>
                <span className='cursor-pointer flex-1' onClick={() =>areas&& handleShowModal(areas, 'area', 'Ch???n di???n t??ch','Ch???n di???n t??ch')}>
                    <SearchItem IconBefore={<RiCrop2Line />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.area} defaultText={'Ch???n di???n t??ch'} />
                </span>
            <button
                    type='button' 
                    onClick={handleSearch}
                    className='outline-none py-2 px-4 flex-1 bg-secondary text-[13.3px] flex items-center justify-center gap-2 text-white font-medium rounded-md'
                >
                    <FiSearch />
                    T??m ki???m
            </button>
            {isShowModal && 
            <Modal
                handleSubmit = {handleSubmit}
                setIsShowModal={setIsShowModal}
                content={content}
                name={name}
                defaultText={defaultText}
                title = {title}
                queries = {queries}
                arrMinMax={arrMinMax}
            />}
        </div>
    );
};

export default Search;