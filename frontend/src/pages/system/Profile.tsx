import React from 'react';
import InputReadOnly from '../../components/Address/InputReadOnly';
import InputFormV2 from '../../components/InputFormV2/InputFormV2';

const Profile = () => {
    return (
        <div className='px-6'>
            <div className='border-b border-gray-200 flex items-center justify-between'>
                <h1 className='text-3xl font-medium py-4'>Thông tin cá nhân</h1>
            </div>
            <div className='w-3/5 py-6 flex flex-col gap-4 m-auto'>
                <InputReadOnly label="Mã thành viên"/>
                <InputReadOnly label="Số điện thoại"/>
                <InputFormV2 label='Tên hiển thị'/>
                <InputFormV2 label='Email'/>
                <InputFormV2 label='Zalo'/>
                <InputFormV2 label='Facebook'/>
            </div>
        </div>
    );
};

export default Profile;