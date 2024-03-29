 export const combineIngredients = (list) => {
    const combinedList = [];
    list.forEach(item => {
        const existingItemIndex = combinedList.findIndex(elem => elem.ingredient === item.ingredient);
        if (existingItemIndex !== -1) {
            combinedList[existingItemIndex].amount = Number(combinedList[existingItemIndex].amount) + Number(convertToBaseUnit(item.amount, item.unit))
            combinedList[existingItemIndex].unit = convertUnit(combinedList[existingItemIndex].unit)
        } else {
            combinedList.push({...item});
        }
    });
    return combinedList;
};

const convertToBaseUnit = (amount, unit) => {
    switch (unit) {
        case 'tbsp':
            return amount * 15; 
        case 'tsp':
            return amount * 5; 
        case 'kg':
            return amount * 1000; 
        case 'l':
            return amount * 1000; 
        case 'dl':
            return amount * 100; 
        case 'cup':
            return amount * 240;
        case 'pcs':
        case '':
            return amount; 
        default:
            return amount; 
    }
};

const convertUnit = (unit) => {
    switch (unit) {
        case 'tbsp':
            return 'g'; 
        case 'tsp':
            return 'g'; 
        case 'kg':
            return 'g'; 
        case 'l':
            return 'ml'; 
        case 'dl':
            return 'ml'; 
        case 'cup':
            return 'ml';
        case 'g':
            return 'g';
        case 'ml':
            return 'ml';
        case 'pcs':
        case '':
            return ''; 
        default:
            return ''; 
    }
}