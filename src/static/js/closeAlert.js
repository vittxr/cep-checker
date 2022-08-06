export function closeAlertAfterTimer(alert) {
    setTimeout(() => {
        alert.classList.replace("alert--visible", "alert--hidden") 
    }, 5000)
}