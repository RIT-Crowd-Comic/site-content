'use client';
import styles from '@/styles/create.module.css';

interface Props {
    imgSrc_1:string, // active state image/icon
    imgSrc_2:string, // inactive state image/icon
    selectedValue:string, // current selected value of user
    value:string, // value that this button holds
    onChange:Function, // change function that updates selected value for all radio buttons
    style_id:string // id for css styling
}

const IconRadioButton = ({
    imgSrc_1, imgSrc_2, value, selectedValue, onChange, style_id
}: Props) => {
    const handleClick = () => {
        onChange(value);
    };

    return (
        <div onClick={handleClick} id={`${styles[style_id]}`}>
            <img src={selectedValue === value ? imgSrc_1 : imgSrc_2} alt={value} id={`${styles[style_id]}`} />
        </div>
    );
};

export default IconRadioButton;


//  insert code below into parent component so that buttons can talk to and update one another

//   const [selectedOption, setSelectedOption] = useState('');

//   const handleOptionChange = (value:any) => {
//      setSelectedOption(value);
//    };
