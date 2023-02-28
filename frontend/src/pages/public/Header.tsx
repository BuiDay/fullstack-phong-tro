import React from 'react';
import { Link } from 'react-router-dom';
import {path} from '../../utils/constant'
import Button from '../../components/Button/Button';
import {useDispatch,useSelector} from 'react-redux'
import {AiOutlinePlusCircle} from 'react-icons/ai'

const Header= () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=>state);
    
    return (
        <div className='w-1100 m-auto flex items-center justify-between'>
            <div>
                <Link to="/"> 
                    <img src={require('../../asset/images/logo-removebg-preview.png')} alt="logo" className='w-[240px] h-[70px] object-contain'/>
                </Link>
            </div>
            {
                // isLoggedIn ? (
                //     <div className='flex items-center gap-2'>
                //         <small>Xin chào, Nhat Bui</small>
                //         <Button text="Đăng xuất" textColor="text-white" bgColor = "bg-secondary2" />
                //         <Button text="Đăng tin mới" textColor="text-white" bgColor = "bg-secondary2" icon={<AiOutlinePlusCircle/>}/>
                //     </div>
                // ):(
                    <div className='flex items-center gap-2'>
                        <small></small>
                        <Button text="Đăng nhập" textColor="text-white" bgColor = "bg-[#3961fb]" link={path.LOGIN}/>
                        <Button text="Đăng ký" textColor="text-white" bgColor = "bg-[#3961fb]" link={path.REGISTER}/>
                        <Button text="Đăng tin mới" textColor="text-white" bgColor = "bg-secondary2" icon={<AiOutlinePlusCircle/>}/>
                    </div>
                // )
            }

        </div>
    );
};

export default Header;