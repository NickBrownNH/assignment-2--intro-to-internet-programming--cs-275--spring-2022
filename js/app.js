window.onload = () => {
    let leftButton = document.getElementById(`left-button`),
        rightButton = document.getElementById(`right-button`),
        textBox = document.getElementById(`text-box`),
        errorStyles = 
        `background-color: red;
        padding: 2px;
        color: white;
        font-family: monospace;
        border-radius: 4px;`,
        resetStyles = `background-color: inherit;
        padding: inherit;
        font-family: inherit;
        border-radius: none`;

    function showWhiteRecipe () {
        textBox.innerHTML = 
        `Step 1: Combine 1 cup of rice with 2 cups of water and
        1 Tbsp olive oil. <br> Step 2: Bring to a boil,
        then reduce heat to the lowest setting. <br> 
        Step 3: Cook for about 18 minutes.`;
    }

    function showCaliRecipe () {
        textBox.innerHTML = 
        `For slightly al dente rice:<br>
        Step 1: Combine 1 1/4 cups of rice with 2 cups of water or 
        broth and 1 Tbsp olive oil. <br> 
        Step 2: Bring to a boil and stir once to mix. <br>
        Step 3: Reduce heat to low, cover with a tight-fitting lid 
        and cook for 25 minutes. <br>
        Step 4: Remove from heat and let stand for 5 minutes. <br> 
        Step 5: Fluff with a fork and serve. <br><br>
        
        For softer rice: <br>
        Increase liquid by 1/2 cup and cook time by 5 minutes.`;    
    }

    if (null !== leftButton) {
        leftButton.addEventListener(`click`, showWhiteRecipe);
  
    } else {
        console.error(
            `A reference to ID %c left-button %c could not be established`, 
            errorStyles, 
            resetStyles
        );
    }

    if (null !== rightButton) {
        rightButton.addEventListener(`click`, showCaliRecipe);
    } else {
        console.error(
            `A reference to ID %c right-button %c could not be established`, 
            errorStyles, 
            resetStyles
        );
    }

};
