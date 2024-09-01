const submitBtn = document.querySelector('.calculate');
const inputs = [document.querySelector('.mortgage-account input'), document.querySelector('.mortgage-term input'), document.querySelector('.interest-rate input')];
const radioLabels = document.querySelectorAll('.radio-list label');
const error = document.querySelectorAll('.error');
const elements = [document.querySelector('.euro-label'), document.querySelector('.years'), document.querySelector('.percentage')]
const mortgagePayment = document.querySelectorAll('input[name="payment-type"]');


inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
       clearError(index);
    });
})

const clearError = (index) => {
    error[index].innerHTML = '';
    error[index].style.display = 'none';
    inputs[index].style.borderColor = ''; 
    elements[index].style.backgroundColor = ''; 
}

mortgagePayment.forEach((radio) => {
    radio.addEventListener('change', () => {
        const radioGroupError = document.querySelector('.mortgage-type .error');
        
        if (radioGroupError) {
            if (radio.checked) {
                radioGroupError.innerHTML = '';
                radioGroupError.style.display = 'none';
            }
        } else {
            radioGroupError.style.display = 'block';
        }
    });
});

//Alternative
// radioLabels.forEach((label) => {
//     label.addEventListener('click', () => {
//         console.log('Radio label clicked');
//         const errorMsg = document.querySelector('.mortgage-type .error');
//         if (errorMsg) {
//             errorMsg.innerHTML = '';
//             errorMsg.style.display = 'none';
//         }
//     });
// });



const submitButton = (monthlyRepayment, yearlyRepayment,interestOnly) => {
    submitBtn.addEventListener('click', (e) => { 
        e.preventDefault();
        let isValid = true;
        
        inputs.forEach((input, index) => {
            if(input.value === '' ||  isNaN(input.value) ){
                isValid = false
                error[index].innerHTML = `<p>This field is required</p>`;
                error[index].style.display = 'block';
                input.style.borderColor = 'red';
                elements[index].style.backgroundColor = 'red';
            }
            else{
                clearError(index);
            }
        });
        const paymentSelected = Array.from(mortgagePayment).some(radio => radio.checked)
        if(!paymentSelected){
            isValid = false;
            error[3].innerHTML = `<p>Please select a payment type</p>`;
            error[3].style.display = 'block';
        }
        else{
            error[3].innerHTML = '';
            error[3].style.display = '';
        }

        if(isValid){
            console.log(isValid);
            mortgageRepayment(monthlyRepayment, yearlyRepayment, interestOnly);
        }
    });
}


const monthlyRepayment = () => {
    const mortgageAccount = parseFloat(document.querySelector('.mortgage-account input').value);
    const term = parseFloat(document.querySelector('.mortgage-term input').value);
    const rate = parseFloat(document.querySelector('.interest-rate input').value);

    const mortgageRate = rate / (100 * 12);
    const mortgageTerm = term * 12;

//denominator
 const denominatorCal = ((1 + mortgageRate)**mortgageTerm) - 1;
 console.log(denominatorCal);
 const numeratorCal = (mortgageAccount * (mortgageRate * (1 + mortgageRate)**mortgageTerm))

 const monthlyRepayment = parseFloat((numeratorCal / denominatorCal).toFixed(2));
 return monthlyRepayment
}


 const yearlyRepayment = () => {
    const term = parseFloat(document.querySelector('.mortgage-term input').value);
    const mortgageTerm = term * 12;
    const yearlyRepayment = parseFloat((monthlyRepayment() * mortgageTerm).toFixed(2));
     return yearlyRepayment.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
 }

 const interestOnly = () => {
    const mortgageAccount = Number(document.querySelector('.mortgage-account input').value);
    const rate = parseFloat(document.querySelector('.interest-rate input').value);
    const mortgageRate = rate / (100 * 12);
    const interest =  mortgageAccount * mortgageRate
    return interest.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})
}

 const mortgageAccount = Number(document.querySelector('.mortgage-account input').value);

 const mortgageRepayment = (monthlyRepayment, yearlyRepayment, interestOnly) => {
    const paymentType = document.querySelectorAll('.radio-list input');
    paymentType.forEach(payment => {
        if(payment.checked){
            if(payment.value.toLowerCase() === 'repayment'){
                const resultPage = document.querySelector('.result-page');
                const resultPlaceholder = document.querySelector('.result-placeholder')
                resultPage.style.display = 'block';
                resultPlaceholder.style.display = 'none';
                resultPage.innerHTML = `
                <h3 class="result-title">Your results</h3>
                <p class="result-description">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
                <div class="result-summary">
                    <p class="result-label">Your monthly repayments</p>
                    <h2 class="result-amount">&euro;${monthlyRepayment()}</h2>
                    <hr>
                    <p class="result-label over-term">Total you'll repay over the term</p>
                    <h3 class="total-amount">&euro;${yearlyRepayment()}</h3>
                </div>
                `
                console.log(monthlyRepayment());
                console.log(yearlyRepayment());
            }
            else if(payment.value.toLowerCase() === 'interest'){
                const resultPage = document.querySelector('.result-page');
                const resultPlaceholder = document.querySelector('.result-placeholder')
                resultPage.style.display = 'block';
                resultPlaceholder.style.display = 'none';
                resultPage.innerHTML = `
                <h3 class="result-title">Your results</h3>
                <p class="result-description">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
                <div class="result-summary">
                    <p class="result-label">Your Interest Only</p>
                    <h2 class="result-amount">&euro;${interestOnly()}</h2>
                    <hr>
                    <p class="result-label over-term">Total you'll repay over the term</p>
                    <h3 class="total-amount">&euro;${yearlyRepayment()}</h3>
                </div>
                `
                console.log('Hello');
            }
        }
    })
 }

 submitButton(monthlyRepayment,yearlyRepayment, interestOnly);