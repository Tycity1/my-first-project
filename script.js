// Add subtle random movement to the floating i
document.addEventListener('DOMContentLoaded', () => {
    const floatingI = document.querySelector('.floating-i');
    
    function addRandomMovement() {
        const randomX = (Math.random() - 0.5) * 10;
        floatingI.style.transform = `rotate(180deg) translateX(${randomX}px)`;
        
        setTimeout(addRandomMovement, 2000);
    }
    
    addRandomMovement();
});