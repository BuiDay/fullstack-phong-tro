import React from 'react';
import icons from '../../utils/icons'
const { GrLinkPrevious } = icons

interface IProps{
    setIsShowModal?:any,
    content?:any[],
    name?:string,
    defaultText?:string,
    title?:string,
    handleSubmit?:any,
    queries?:any
}

const Modal:React.FC<IProps> = ({setIsShowModal,content,name,defaultText,title,handleSubmit,queries}) => {
    const handleActive = (code?:string, value?:string) => {
        console.log(code,value)
    }
    return (
        <div 
        className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center'
        onClick={() => { setIsShowModal(false) }}
        >
        <div
            onClick={(e) => {
                e.stopPropagation()
                setIsShowModal(true)
            }}
            className='w-2/5 h-[500px] bg-white rounded-md relative'
        >
            <div className='h-[45px] px-4 flex items-center border-b border-gray-200'>
                <span className='cursor-pointer'
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsShowModal(false)}}
                >
                    <GrLinkPrevious size={24} />
                </span>
                <div className='w-full text-center'>
                    <span className='text-xl font-medium'>{title && title}</span>
                </div>
            </div>
            {(name === 'category' || name === 'province') && 
                <div className='p-4 flex flex-col'>
                    <span className='py-2 flex gap-2 items-center border-b border-gray-200'>
                        <input
                            type="radio"
                            name={name}
                            value={defaultText || ''}
                            id='default'
                            checked={!queries[`${name}Code`] ? true : false}
                            onChange={(e) => handleSubmit(e, { [name]: defaultText, [`${name}Code`]: null })}
                        />
                        <label htmlFor='default'>{defaultText}</label>
                    </span>
                    {content?.map(item => {
                        return (
                            <span key={item.code} className='py-2 flex gap-2 items-center border-b border-gray-200'>
                                <input
                                    type="radio"
                                    name={name}
                                    id={item.code}
                                    value={item.code}
                                    checked={item.code === queries[`${name}Code`] ? true : false}
                                    onChange={(e) => handleSubmit(e, { [name]: item.value, [`${name}Code`]: item.code })}
                                />
                                <label htmlFor={item.code}>{item.value}</label>
                            </span>
                        )
                    })}
                </div>
                }
           
           {(name === 'price' || name === 'area') && <div className='p-12 py-20 '>
                    <div className='flex flex-col items-center justify-center relative'>
                        <div className='z-30 absolute top-[-48px] font-bold text-xl text-orange-600'>
                            {/* {(persent1 === 100 && persent2 === 100)
                                ? `Trên ${convert100toTarget(persent1)} ${name === 'price' ? 'triệu' : 'm2'} +`
                                : `Từ ${persent1 <= persent2
                                    ? convert100toTarget(persent1)
                                    : convert100toTarget(persent2)} - ${persent2 >= persent1
                                        ? convert100toTarget(persent2)
                                        : convert100toTarget(persent1)} ${name === 'price'
                                            ? 'triệu'
                                            : 'm2'}`} */}
                        </div>
                        <div  id='track' className='slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full'></div>
                        <div id='track-active' className='slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-600 rounded-full'></div>
                        <input
                            max='100'
                            min='0'
                            step='1'
                            type="range"
                            // value={persent1}
                            className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                            // onChange={(e) => {
                            //     setPersent1(+e.target.value)
                            //     activedEl && setActivedEl('')
                            // }}
                        />
                        <input
                            max='100'
                            min='0'
                            step='1'
                            type="range"
                            // value={persent2}
                            className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                            // onChange={(e) => {
                            //     setPersent2(+e.target.value)
                            //     activedEl && setActivedEl('')
                            // }}
                        />
                        <div className='absolute z-30 top-6 left-0 right-0 flex justify-between items-center'>
                            <span
                                className='cursor-pointer'
                                // onClick={(e) => {
                                //     e.stopPropagation()
                                //     handleClickTrack(e, 0)
                                // }}
                            >
                                0
                            </span>
                            <span
                                className='mr-[-12px] cursor-pointer'
                                // onClick={(e) => {
                                //     e.stopPropagation()
                                //     handleClickTrack(e, 100)
                                // }}
                            >
                                {name === 'price' ? '15 triệu +' : name === 'area' ? `Trên 90m\xb2 `: ''}
                            </span>
                        </div>
                    </div>
                    <div className='mt-24'>
                        <h4 className='font-medium mb-4'>Chọn nhanh:</h4>
                        <div className='flex gap-2 items-center flex-wrap w-full'>
                            {content?.map(item => {
                                return (
                                    <button
                                        key={item.code}
                                        onClick={() => handleActive(item.code, item.value)}
                                        // className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${item.code === activedEl ? 'bg-blue-500 text-white' : ''}`}
                                    >
                                        {name === 'area' ? item.value + "\xb2" :item.value}
                                    </button>
                                )
                            })}
                        </div>

                    </div>
                </div>}
                {(name === 'price' || name === 'area') && <button
                    type='button'
                    className='w-full absolute bottom-0 bg-[#FFA500] py-2 font-medium rounded-bl-md rounded-br-md'
                    // onClick={handleBeforeSubmit}
                >
                    ÁP DỤNG
                </button>}
        </div>
    </div>
    );
};

export default Modal;