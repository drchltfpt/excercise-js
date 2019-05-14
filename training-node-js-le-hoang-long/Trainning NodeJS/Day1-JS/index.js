document.querySelector('#button').addEventListener('click', function(){
    const name = document.getElementById('name').value;
    const math = document.getElementById('math').value;
    const physics = document.getElementById('physics').value;
    const chemistry = document.getElementById('chemistry').value;
    
    const rank = ['Weak', 'Normal', 'Good'];
    const value = {
        math: Number(math),
        physics: Number(physics),
        chemistry: Number(chemistry),
    };
    const average = (value.math + value.physics + value.chemistry)/3;
    class Validate{

        checkEmpty() {
            if (name === '' || math === '' || physics === '' || chemistry === ''){
                alert('Please insert content');
                return;
            } else return 1;
        }

        validateNumberType(){
            if ((value.math) && (value.physics) && (value.chemistry)){
                return 1;
            }  else if ((value.math)===0 || (value.physics)===0 || (value.chemistry)===0){
                return 1;
            } else {
                alert('Marks must be numeric');
                return 0;
        } 

        
    }

        validateInput(){
            if (value.math < 0 || value.physics < 0 || value.chemistry <0){
                alert('Mark can not be smaller than 0');
                return;
            } else if (value.math > 10 || value.physics > 10 || value.chemistry > 10){
                alert('Mark can not be greater than 10');
                return;
            }
            return 1;
        }

        validateInputForName(){
            let regex = /^[A-Za-z]+$/;
            if (!(regex.test(name))){
                alert('Name can not contain number or special characters');
                return 0;
            } else return 1;
        }

    }

    const validate = new Validate();
    const empty = validate.checkEmpty();
    const numType = validate.validateNumberType();
    const input = validate.validateInput();
    const nameInput = validate.validateInputForName();

    let rankInTable = null;

    if (average < 5){
        rankInTable = rank[0];
    } else if (average >=5 && average <8){
        rankInTable = rank[1];
    } else {
        rankInTable = rank[2];
    }

    if (empty && numType && input && nameInput){
        const tbody = document.querySelector('#body');
        const tr = document.createElement('tr');
        console.log(name);
        tr.innerHTML = `
            <td>${name}</td>
            <td>${math}</td>
            <td>${physics}</td>
            <td>${chemistry}</td>
            <td>${average}</td>
            <td>${rankInTable}</td>
        `;
        tbody.appendChild(tr);

    }

    document.querySelector('#name').value = '';
    document.querySelector('#math').value = '';
    document.querySelector('#physics').value = '';
    document.querySelector('#chemistry').value = '';
});
