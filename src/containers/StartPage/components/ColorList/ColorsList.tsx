import Color from "../Color/Color";
import { propsType } from "../../types";

 
const ColorList: React.FC<propsType> = ({
    colors,
    deleteColor
  }: propsType) => {
    return ( 
        <>
            {colors.map(color => <Color colorHEX={color.color} isAdded={color.isAdded} deleteColor={deleteColor}/>)}
        </>
     );
}
 
export default ColorList;