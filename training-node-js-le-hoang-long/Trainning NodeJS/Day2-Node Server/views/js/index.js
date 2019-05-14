const rank = ['Weak', 'Normal', 'Good'];

let average = null;

    function setRank(){
        let rankInTable = null;

        if (average < 5){
            rankInTable = rank[0];
        } else if (average >=5 && average <8){
            rankInTable = rank[1];
        } else {
            rankInTable = rank[2];
        }

        return rankInTable
    }

    

document.querySelector('#button').addEventListener('click', function(){
    const name = document.getElementById('name').value;
    const math = document.getElementById('math').value;
    const physics = document.getElementById('physics').value;
    const chemistry = document.getElementById('chemistry').value;
    
    
    const value = {
        math: Number(math),
        physics: Number(physics),
        chemistry: Number(chemistry),
    };
    average = ((value.math + value.physics + value.chemistry)/3).toFixed(2);
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


    let rankInTable = setRank();
    

    if (empty && numType && input && nameInput){
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
        document.querySelector('.student-table>tbody').appendChild(tr);

    }

    document.querySelector('#name').value = '';
    document.querySelector('#math').value = '';
    document.querySelector('#physics').value = '';
    document.querySelector('#chemistry').value = '';
});

document.querySelector('#custom-file-input').addEventListener('change', function(e){
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    let excelFile = e.target.files[0];       
    formData.append("excel", excelFile);
    
    xhr.open("POST", '/upload');    
    xhr.send(formData);
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4 && xhr.status == 200){
            let studentArr = JSON.parse("[" + xhr.responseText + "]");
            if (studentArr.length > 0) {
                for (let i = 1; i < studentArr[0].length; i++) {
                    let sv = studentArr[0][i];
                    let avg = ((sv[1] + sv[2] + sv[3]) / 3).toFixed(2);
                    const ranks = ['Weak', 'Normal', 'Good'];
                    let rank = setRank();
                    
                    sv.push(avg);
                    sv.push(rank);
                    let tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${sv[0]}</td>
                        <td>${sv[1]}</td>
                        <td>${sv[2]}</td>
                        <td>${sv[3]}</td>
                        <td>${sv[4]}</td>
                        <td>${sv[5]}</td>
                    `;
                    document.querySelector('.student-table>tbody').appendChild(tr);
                }
            }
        }
       
    }
});
