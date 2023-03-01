import React from 'react';
import { text } from '../../utils/constant'
import { Search,Province,List} from '../../components/index'
import { useSelector } from 'react-redux'

const HomePage = () => {
    // const {categories,areas,prices} = useSelector(state => state.app)
    return (
        <div className='w-full flex flex-col gap-3'>
            <Search />
            <div>
                <h1 className='text-[28px] font-bold' >{text.HOME_TITLE}</h1>
                <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className='w-full flex gap-4'>
                <div className='w-[70%] border border-[#dedede] rounded-xl overflow-hidden'>
                    < List/>
                    {/* <Pagination /> */}
                </div>
                <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
                    {/* <ItemSidebar content={categories} title='Danh sách cho thuê' />
                    <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
                    <ItemSidebar isDouble={true} type='areaCode' content={areas} title='Xem theo diện tích' /> */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;