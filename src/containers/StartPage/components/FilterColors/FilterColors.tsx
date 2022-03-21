import React, { useEffect, useState } from 'react';
import { filtersType, propsType } from '../../types';
import styles from './FilterColors.module.scss';
import ColorsList from '../ColorList/ColorsList';

const FilterColors: React.FC<propsType> = ({
  colors, 
  deleteColor
}: propsType) => {
  const filterList: filtersType = { filters: [
        {
          name: "Red",
          value: "red"
        },
        {
          name: "Green",
          value: "green"
        },
        {
          name: "Blue",
          value: "blue"
        },
        {
          name: "Saturation",
          value: "saturation"
        }
      ]}

    const [activeFilter, setActiveFilter] = useState([''])
    const [filteredList, setFilteredList] = useState([{ color: '',
    isAdded: false }])

    const onFilterChange = (filter: string) => {
          if (activeFilter.includes(filter)) {
            const filterIndex = activeFilter.indexOf(filter);
            const newFilter = [...activeFilter];
            newFilter.splice(filterIndex, 1);
            setActiveFilter(newFilter);
          } else {
            setActiveFilter([...activeFilter, filter]);
          }
      }

      const getSaturation = (hex: string) => {
        let c = hex.substring(1);    
        let rgb = parseInt(c, 16);   
        let r = (rgb >> 16) & 0xff;  
        let g = (rgb >>  8) & 0xff;  
        let b = (rgb >>  0) & 0xff;  
        r /= 255
        g /= 255
        b /= 255;
          const max = Math.max(r, g, b), min = Math.min(r, g, b);
          let h, s, l = (max + min) / 2;
          if(max === min){
            h = s = 0; 
          }else{
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
            }
          }
        return s*100;
      }

useEffect(() => {
  if (
    activeFilter.length === 1 ||
    activeFilter.length === filterList.filters.length + 1
  ) {
    setFilteredList(colors);
  }
  else {
    setFilteredList([{color: '',
    isAdded: false }])
    let filtr: {color:string, isAdded: boolean}[] = []
    let list = colors.forEach(item => {
      let c = item.color.substring(1); 
      let rgb = parseInt(c, 16);   
      let r = (rgb >> 16) & 0xff;  
      let g = (rgb >>  8) & 0xff;  
      let b = (rgb >>  0) & 0xff;  
      if (activeFilter.includes('red') && r > 127) {
        filtr.push(item)
      } else if (activeFilter.includes('green') && g > 127) {
        filtr.push(item)
      } else if (activeFilter.includes('blue') && b > 127) {
        filtr.push(item)
      } else if (activeFilter.includes('saturation') && getSaturation(item.color) > 50) {
        filtr.push(item)
      }
      setFilteredList(filtr)
      
    }
  );
  }
}, [activeFilter])
    
    
      return (
          <div>
            {filterList.filters.map(filter => (
            <React.Fragment>
              <label htmlFor={filter.value} className={styles.filterName}>{filter.name}</label>
              <input
                className={styles.filterCheckbox}
                id={filter.value}
                type="checkbox"
                checked={activeFilter.includes(filter.value)}
                onClick={() => onFilterChange(filter.value)}
              />
            </React.Fragment>
          ))}
          <ColorsList colors={filteredList} deleteColor={deleteColor}/>
          </div>
      )
  }

export default FilterColors;