 export const combineIngredients = (list) => {
    const combinedList = [];
    list.forEach(item => {
        const existingItemIndex = combinedList.findIndex(elem => elem.ingredient === item.ingredient);
        if (existingItemIndex !== -1) {
            if (combinedList[existingItemIndex].unit === item.unit) {
                combinedList[existingItemIndex].amount = Number(combinedList[existingItemIndex].amount) + Number(item.amount);
            } else {
                combinedList[existingItemIndex].amount = Number(convertToBaseUnit(combinedList[existingItemIndex].amount, combinedList[existingItemIndex].unit)) + Number(convertToBaseUnit(item.amount, item.unit))
                combinedList[existingItemIndex].unit = convertUnit(combinedList[existingItemIndex].unit);
            }
            if (combinedList[existingItemIndex].unit === 'g' && combinedList[existingItemIndex].amount >= 1000) {
                combinedList[existingItemIndex].unit = 'kg';
                combinedList[existingItemIndex].amount = combinedList[existingItemIndex].amount / 1000;
            }
            if (combinedList[existingItemIndex].unit === 'ml' && combinedList[existingItemIndex].amount >= 1000) {
                combinedList[existingItemIndex].unit = 'l';
                combinedList[existingItemIndex].amount = combinedList[existingItemIndex].amount / 1000;
            }
            if (combinedList[existingItemIndex].unit === 'dl' && combinedList[existingItemIndex].amount >= 10) {
                combinedList[existingItemIndex].unit = 'l';
                combinedList[existingItemIndex].amount = combinedList[existingItemIndex].amount / 10;
            }
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