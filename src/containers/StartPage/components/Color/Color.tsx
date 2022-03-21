import { colorProps } from "../../types";
import styles from './Color.module.scss';

const Color: React.FC<colorProps> = ({
    colorHEX,
    isAdded,
    deleteColor
  }: colorProps)  => {
    return ( 
        <div className={styles.colorItem}>
            <p className={styles.colorName}>{colorHEX.toUpperCase()}</p>
            <div className={styles.color} style={{backgroundColor: colorHEX}}></div>
            {isAdded ? <button className={styles.colorDelete} onClick={() => deleteColor(colorHEX)}>Delete</button> : ''}
        </div>
     );
}
 
export default Color;