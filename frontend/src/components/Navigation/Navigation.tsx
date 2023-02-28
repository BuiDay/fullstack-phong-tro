import React, { useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom'
import { formatVietnameseToString } from '../../utils\/formatVietnameseToString'
import { useAppSelector, useAppDispatch } from '../../store/hook'
import { getCategories } from '../../store/features/app/appSilce'
import { RootState } from "../../store/redux";

interface Icate{
    code?:string,
    header?:string,
    id?:string,
    subheader?:string,
    value?:string,
}

const Navigation = () => {
    const dispatch = useAppDispatch();
    const categories  = useAppSelector((state:RootState) => state.app.categories)
    useEffect(() => {
        dispatch(getCategories())
    }, [])

    return (
        <div className='w-full h-[40px] bg-secondary flex items-center text-white'>
            <div className='w-1100 h-full m-auto items-center flex text-sm font-medium'>
                    <div className='h-full'>
                        <NavLink
                            style={{display:"block", height:"100%",padding:"0 12px",lineHeight:"40px"}}
                            to="/"
                            className={({isActive})=>isActive ? "bg-secondary2" : "hover:bg-secondary2"}
                        >
                            Trang chủ
                        </NavLink>
                     </div>
                    {
                    categories && categories?.length > 0 && categories.map((item:Icate, index:number)=>{
                       return(
                            <div key={index} className='h-full'>
                                <NavLink
                                    style={{display:"block", height:"100%",padding:"0 12px",lineHeight:"40px"}}
                                    to={`/${formatVietnameseToString(item.value || " ")}`}
                                    className={({isActive})=>isActive ? "bg-secondary2" : "hover:bg-secondary2"}
                                >
                                    {item.value}
                                </NavLink>
                            </div>
                       )
                    })
                }
            </div>
        </div>
    );
};

export default Navigation;