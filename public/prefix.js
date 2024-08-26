const inputOfPrefix = document.getElementById('inputOfPrefix');
inputOfPrefix.addEventListener('input', function(event) {
    const currentValue = event.target.value;

 
    const validOptions = ['/', '.', '!', '@', '#', '$', '%', '^', '*', '@', '_', '&', '-', '+', '•', '√', '×', '='];
    if (!validOptions.includes(currentValue)) {

        event.target.value = '';
    }
});'));