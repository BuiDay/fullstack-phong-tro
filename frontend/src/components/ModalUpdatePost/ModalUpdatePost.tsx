import React from 'react';
import CreatePost from '../../pages/system/CreatePost';

interface IProps{
    setIsShowModal?:any
}

const ModalUpdatePost:React.FC<IProps> = ({setIsShowModal}) => {
    return (
        <div onClick={() => { setIsShowModal(false) }} className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center p-10 overflow-scroll'>
            <div  onClick={(e) => {
                e.stopPropagation()
                setIsShowModal(true)
            }}
            className='w-2/5 bg-white rounded-md relative m-auto '>
                <CreatePost />
            </div>
        </div>
    );
};

export default ModalUpdatePost;