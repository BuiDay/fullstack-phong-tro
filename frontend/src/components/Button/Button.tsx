import React,{memo} from 'react';
import { Link } from 'react-router-dom';

interface IPropsButton{
    text?:string, 
    bgColor?:string, 
    textColor?:string,
    icon?:any,
    onClick?:any,
    fullWidth?:any,
    link?:any,
    py?:string
    px?:string
}

const Button:React.FC<IPropsButton> = ({text, bgColor, textColor,icon,onClick,fullWidth,link,py,px}) => {

    return (
        <button type="button" 
            className={`${py? py :"py-2"} ${px ? px :"px-4"} ${bgColor} ${fullWidth && "w-full"} ${textColor} outline-none rounded-md hover:underline justify-center flex items-center gap-1`} 
            onClick={onClick}   
            >
            <Link to={link}>{text}</Link> 
            {
                icon ?  <span className='mt-0.5'>{icon}</span> :""
            }
        </button>
    );
};
export default memo(Button);