export type addColorsType = {
    colors: { color: string,
            isAdded: boolean }[],
    newColor: string,
    colorError: string
};

export type propsType = { 
   colors: { color: string,
    isAdded: boolean }[],
    deleteColor: (color: string) => void
};

export interface filtersType { 
    filters: {
    name: string,
    value: string
    }[]
}

export interface colorProps {
    colorHEX: string,
    isAdded: boolean,
    deleteColor: (color: string) => void
}