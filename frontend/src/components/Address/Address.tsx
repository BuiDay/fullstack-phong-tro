import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { apiGetPublicDistrict, apiGetPublicProvinces } from '../../store/features/app/appService';
import Select from '../Select/Select';
import InputReadOnly from './InputReadOnly';
import { IPayload } from '../../pages/system/CreatePost';


interface IProps{
    payload?:any,
    setPayload:Dispatch<SetStateAction<IPayload>>
}


interface IProvince{
    province_id:string,
    province_name:string
}

interface IDistrict{
    district_id:string,
    district_name:string
}


const Address:React.FC<IProps> = ({payload,setPayload}) => {
    const [province, setProvince] = useState<string>('')
    const [provinces, setProvinces] = useState<IProvince[]>([])

    const [districts, setDistricts] = useState<IDistrict[]>([])
    const [district, setDistrict] = useState<string>('')
    const [reset, setReset] = useState(false)

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response:any = await apiGetPublicProvinces()
            if (response.status === 200) {
                setProvinces(response?.data.results)
            }
        }
        fetchPublicProvince()
    }, [])

    useEffect(() => {
        setDistrict("")
        const fetchPublicDistrict = async () => {
            const response:any = await apiGetPublicDistrict(province)
            if (response.status === 200) {
                setDistricts(response.data?.results)
            }
        }
        province && fetchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])

    useEffect(() => {
        setPayload((prev:any) => ({
            ...prev,
            address: `${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
            province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
        }))

    }, [province, district])
    
    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>?????a ch??? cho thu??</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select type='province' value={province} setValue={setProvince} options={provinces} label='T???nh/Th??nh ph???' />
                    <Select reset={reset} type='district' value={district} setValue={setDistrict} options={districts} label='Qu???n/Huy???n' />
                </div>
                <InputReadOnly
                    label='?????a ch??? ch??nh x??c'
                    value={`${district ? `${ districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`}
                />
            </div>
        </div>
    );
};

export default Address;