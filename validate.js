class Validator {
    static validateName(name) {
        if (!name) {
            const error = new Error('Enter a name');
            error.type = 'Empty';
            throw error;
        }

        if (name === 'Hoang') {
            const error = new Error('Hoang is N/A');
            error.type = 'Duplicated';
            throw error;
        }
    }
}

try {
    const name = '';

    Validator.validateName(name);

    console.log(`Name's cool...!`);
} catch (error) {
    switch (error.type) {
        case 'Empty':
            console.log('Type #1: ' + error.message); 
            break;
        case 'Duplicated':
            console.log('Type #2: ' + error.message); 
            break;
    }   
}