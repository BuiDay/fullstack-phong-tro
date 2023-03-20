import React from 'react'
import { getCombinedNodeFlags } from 'typescript'

interface IProps{
    label?:string,
    value?:string,
}

const InputReadOnly:React.FC<IProps> = ({ label, value }) => {
    return (
        <div className='flex flex-col gap-2'>
            <label className='font-medium' htmlFor="exactly-address">{label}</label>
            <input
                type='text'
                id='exactly-address'
                readOnly
                className='border border-gray-200 outline-none rounded-md bg-gray-100 p-2 w-full'
                value={value || ''}
            />
        </div>
    )
}

export default InputReadOnly